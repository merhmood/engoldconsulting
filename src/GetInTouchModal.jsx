import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, TrendingUp, MessagesSquare, UserRound, Upload, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { EMAIL } from './siteInfo.js';

/**
 * "Get in touch" dialog with three enquiry types, each with its own form.
 *
 * Sending: if VITE_FORM_ENDPOINT is set (a form service or a small mail script on the host),
 * the form is POSTed there as multipart/form-data, attachments included, with `_to` and `_subject`
 * fields saying where it should go. Without it, the visitor's email app opens with every answer
 * filled in (files can't be attached that way, so they are asked to attach them in the email).
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

const NAVY = '#0F1B2D';

const TYPES = {
    hire: {
        icon: TrendingUp,
        label: "I'm hiring and need support",
        heading: 'Tell us about your hiring needs',
        to: EMAIL,
        subject: 'IT Recruitment: hiring enquiry',
        fileLabel: 'Attach your job spec',
    },
    consultant: {
        icon: MessagesSquare,
        label: 'Get in touch with a consultant',
        heading: 'How can our consultants help?',
        to: EMAIL,
        subject: 'Consulting enquiry',
    },
    job: {
        icon: UserRound,
        label: "I'm looking for a job",
        heading: 'Tell us about the role you want',
        to: EMAIL,
        subject: 'IT Recruitment: candidate resume',
        fileLabel: 'Attach your resume',
    },
};

const SERVICES = ['IT Recruitment', 'Advisory', 'Risk Consulting', 'Cyber & Data', 'Managed Services', 'AI Consulting', 'Other'];
const EXPERTISE = [
    'IT Audit', 'IT Risk & GRC', 'Compliance', 'Cybersecurity', 'Identity & Access Management', 'Penetration Testing',
    'Security Operations', 'Third-Party & Vendor Risk', 'Data Privacy', 'ERP Security & SOD', 'AI Governance', 'Other',
];

// Field definitions per enquiry type (rendered in order; `half` fields pair up on wider screens)
const FIELDS = {
    hire: [
        { name: 'firstName', label: 'First name', half: true, required: true, autoComplete: 'given-name' },
        { name: 'lastName', label: 'Last name', half: true, required: true, autoComplete: 'family-name' },
        { name: 'email', label: 'Email', type: 'email', half: true, required: true, autoComplete: 'email' },
        { name: 'phone', label: 'Phone number', type: 'tel', half: true, autoComplete: 'tel' },
        { name: 'company', label: 'Company name', half: true, required: true, autoComplete: 'organization' },
        { name: 'jobTitle', label: 'Job title', half: true, autoComplete: 'organization-title' },
        { name: 'positionType', label: 'Type of position', type: 'radio', options: ['Permanent role', 'Contract role', 'Contract-to-hire'] },
        { name: 'positionTitle', label: 'Position title', half: true, required: true },
        { name: 'positionLocation', label: 'Position location', half: true },
        { name: 'message', label: 'Tell us about the role you are looking to hire', type: 'textarea', required: true },
    ],
    consultant: [
        { name: 'firstName', label: 'First name', half: true, required: true, autoComplete: 'given-name' },
        { name: 'lastName', label: 'Last name', half: true, required: true, autoComplete: 'family-name' },
        { name: 'email', label: 'Email', type: 'email', half: true, required: true, autoComplete: 'email' },
        { name: 'phone', label: 'Phone number', type: 'tel', half: true, autoComplete: 'tel' },
        { name: 'company', label: 'Company name', half: true, autoComplete: 'organization' },
        { name: 'jobTitle', label: 'Job title', half: true, autoComplete: 'organization-title' },
        { name: 'service', label: 'Service you are interested in', type: 'select', options: SERVICES },
        { name: 'message', label: 'How can we help?', type: 'textarea', required: true },
    ],
    job: [
        { name: 'firstName', label: 'First name', half: true, required: true, autoComplete: 'given-name' },
        { name: 'lastName', label: 'Last name', half: true, required: true, autoComplete: 'family-name' },
        { name: 'email', label: 'Email', type: 'email', half: true, required: true, autoComplete: 'email' },
        { name: 'phone', label: 'Phone number', type: 'tel', half: true, autoComplete: 'tel' },
        { name: 'positionType', label: 'Type of position', type: 'radio', options: ['Permanent role', 'Contract role', 'Either'] },
        { name: 'desiredRole', label: 'Role you are looking for', half: true, required: true },
        { name: 'location', label: 'Preferred location', half: true },
        { name: 'expertise', label: 'Area of expertise', type: 'select', options: EXPERTISE },
        { name: 'message', label: 'Tell us about your experience', type: 'textarea' },
    ],
};

const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20';

const Label = ({ htmlFor, children, required }) => (
    <label htmlFor={htmlFor} className="block text-sm font-bold mb-2" style={{ color: NAVY }}>
        {children}
        {required && <span className="text-orange-600" aria-hidden="true"> *</span>}
    </label>
);

const Field = ({ field, value, onChange, idPrefix }) => {
    const id = `${idPrefix}-${field.name}`;
    if (field.type === 'radio') {
        return (
            <fieldset className="sm:col-span-2">
                <legend className="block text-sm font-bold mb-3" style={{ color: NAVY }}>{field.label}</legend>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {field.options.map((opt) => (
                        <label key={opt} className="inline-flex items-center gap-3 cursor-pointer text-[15px] text-slate-700">
                            <input
                                type="radio"
                                name={field.name}
                                value={opt}
                                checked={value === opt}
                                onChange={onChange}
                                className="w-5 h-5 accent-orange-500 cursor-pointer"
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            </fieldset>
        );
    }
    return (
        <div className={field.half ? '' : 'sm:col-span-2'}>
            <Label htmlFor={id} required={field.required}>{field.label}</Label>
            {field.type === 'textarea' ? (
                <textarea id={id} name={field.name} rows={5} required={field.required} value={value} onChange={onChange} placeholder={field.label} className={`${inputClass} resize-y`} />
            ) : field.type === 'select' ? (
                <select id={id} name={field.name} value={value} onChange={onChange} className={inputClass}>
                    <option value="">Select an option</option>
                    {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            ) : (
                <input
                    id={id}
                    name={field.name}
                    type={field.type || 'text'}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    value={value}
                    onChange={onChange}
                    placeholder={field.label}
                    className={inputClass}
                />
            )}
        </div>
    );
};

const FileDrop = ({ label, files, setFiles, idPrefix }) => {
    const [dragging, setDragging] = useState(false);
    const add = (list) => setFiles((prev) => [...prev, ...Array.from(list)].slice(0, 3));
    return (
        <div className="sm:col-span-2">
            <p className="block text-sm font-bold mb-2" style={{ color: NAVY }}>{label}</p>
            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); add(e.dataTransfer.files); }}
                className={`flex flex-wrap items-center gap-3 rounded-lg border-2 border-dashed px-4 py-4 transition-colors ${dragging ? 'border-orange-500 bg-orange-50' : 'border-slate-300'}`}
            >
                <label
                    htmlFor={`${idPrefix}-files`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-[#0F1B2D] text-sm font-bold text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white transition-colors cursor-pointer focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange-500"
                >
                    <Upload className="w-4 h-4" aria-hidden="true" />
                    Upload files
                    <input
                        id={`${idPrefix}-files`}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.rtf,.txt"
                        className="sr-only"
                        onChange={(e) => { add(e.target.files); e.target.value = ''; }}
                    />
                </label>
                <span className="text-sm text-slate-500">or drop files here (PDF or Word, up to 3)</span>
            </div>
            {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                    {files.map((f, i) => (
                        <li key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-lg bg-[#F3F5F8] px-3 py-2 text-sm text-slate-700">
                            <FileText className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                            <span className="flex-1 min-w-0 truncate">{f.name}</span>
                            <button
                                type="button"
                                onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                                aria-label={`Remove ${f.name}`}
                                className="p-1 rounded text-slate-500 hover:text-red-600"
                            >
                                <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const EnquiryForm = ({ type, onDone }) => {
    const config = TYPES[type];
    const fields = FIELDS[type];
    const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ''])));
    const [files, setFiles] = useState([]);
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | sending | error
    const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

    const summary = () =>
        fields
            .map((f) => (values[f.name] ? `${f.label}: ${values[f.name]}` : null))
            .filter(Boolean)
            .join('\n');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = `${values.firstName} ${values.lastName}`.trim();
        const subject = `${config.subject} from ${name}`;

        if (FORM_ENDPOINT) {
            setStatus('sending');
            try {
                const data = new FormData();
                data.append('_to', config.to);
                data.append('_subject', subject);
                data.append('enquiryType', config.label);
                fields.forEach((f) => data.append(f.name, values[f.name] || ''));
                files.forEach((file) => data.append('attachments', file, file.name));
                const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                onDone({ sent: true });
            } catch {
                setStatus('error');
            }
            return;
        }

        // No form service configured yet: open the visitor's email app with everything filled in.
        const attachNote = config.fileLabel ? `\n\n(${config.fileLabel.replace('Attach', 'Please attach')} to this email.)` : '';
        window.location.href = `mailto:${config.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary() + attachNote)}`;
        onDone({ sent: false, needsAttachment: Boolean(config.fileLabel) });
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {fields.map((field) => (
                <Field key={field.name} field={field} value={values[field.name]} onChange={onChange} idPrefix={type} />
            ))}

            {config.fileLabel && (
                FORM_ENDPOINT ? (
                    <FileDrop label={config.fileLabel} files={files} setFiles={setFiles} idPrefix={type} />
                ) : (
                    <div className="sm:col-span-2 flex items-start gap-3 rounded-lg bg-[#F3F5F8] px-4 py-3 text-sm text-slate-600">
                        <FileText className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" aria-hidden="true" />
                        <span>{config.fileLabel}: your email app will open when you submit, so you can attach it there before sending.</span>
                    </div>
                )
            )}

            <label className="sm:col-span-2 flex items-start gap-3 cursor-pointer text-[15px] text-slate-700 leading-relaxed">
                <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-orange-500 shrink-0 cursor-pointer"
                />
                I agree to Engold Consulting using the details I have provided to respond to my enquiry.
            </label>

            {status === 'error' && (
                <p role="alert" className="sm:col-span-2 text-sm font-semibold text-red-600">
                    Something went wrong sending your details. Please try again, or email us at {config.to}.
                </p>
            )}

            <div className="sm:col-span-2 flex justify-center pt-2">
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="min-w-[180px] px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                    {status === 'sending' ? 'Sending…' : 'Submit'}
                </button>
            </div>
        </form>
    );
};

export default function GetInTouchModal({ open, initialType = 'hire', onClose }) {
    // Mounted fresh on every open, so it always starts on the requested enquiry type
    // Rendered straight into <body> so page wrappers (transforms, overflow) can't clip or offset it
    return createPortal(
        <AnimatePresence>
            {open && <Dialog initialType={initialType} onClose={onClose} />}
        </AnimatePresence>,
        document.body,
    );
}

function Dialog({ initialType, onClose }) {
    const [type, setType] = useState(initialType);
    const [done, setDone] = useState(null);
    const panelRef = useRef(null);

    // Lock page scroll, close on Escape, move focus into the dialog and restore it afterwards
    useEffect(() => {
        const returnFocus = document.activeElement;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
            returnFocus?.focus?.();
        };
    }, [onClose]);

    return (
                <motion.div
                    className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-[#0F1B2D]/60 backdrop-blur-sm [-webkit-overflow-scrolling:touch]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <div className="min-h-full flex items-start justify-center p-0 sm:p-6 lg:py-10" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
                        <motion.div
                            ref={panelRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="get-in-touch-title"
                            tabIndex={-1}
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full min-h-screen sm:min-h-0 max-w-4xl bg-[#F3F5F8] sm:rounded-3xl shadow-2xl px-4 sm:px-10 pt-6 pb-10 sm:py-12 focus:outline-none"
                        >
                            {/* Close button stays in view while the form scrolls */}
                            <div className="sticky top-3 z-10 flex justify-end h-0 -mr-1 sm:-mr-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="w-11 h-11 rounded-full flex items-center justify-center bg-white text-[#0F1B2D] shadow-md hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-orange-500"
                                >
                                    <X className="w-6 h-6" aria-hidden="true" />
                                </button>
                            </div>

                            <h2 id="get-in-touch-title" className="pt-12 sm:pt-2 text-center text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: NAVY }}>
                                Get in touch
                            </h2>

                            {/* ENQUIRY TYPE CHOOSER */}
                            <div role="tablist" aria-label="What can we help with?" className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4">
                                {Object.entries(TYPES).map(([key, { icon: Icon, label }]) => {
                                    const active = key === type;
                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            role="tab"
                                            aria-selected={active}
                                            onClick={() => { setType(key); setDone(null); }}
                                            className={`flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border-2 bg-white px-2 sm:px-4 py-4 sm:py-6 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${active ? 'border-orange-500 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
                                        >
                                            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${active ? 'text-orange-500' : 'text-slate-400'}`} strokeWidth={2} aria-hidden="true" />
                                            <span className="text-[13px] sm:text-lg font-extrabold leading-tight" style={{ color: NAVY }}>{label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* FORM PANEL */}
                            <div role="tabpanel" className="mt-4 sm:mt-5 rounded-2xl border-2 border-orange-500 bg-white px-5 sm:px-10 py-8 sm:py-10">
                                {done ? (
                                    <div className="text-center py-8 space-y-4">
                                        <CheckCircle2 className="w-14 h-14 mx-auto text-orange-500" strokeWidth={1.75} aria-hidden="true" />
                                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: NAVY }}>
                                            {done.sent ? 'Thank you, we have your details' : 'Your email is ready to send'}
                                        </h3>
                                        <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                                            {done.sent
                                                ? 'A member of our team will be in touch shortly.'
                                                : `Your email app should have opened with your details filled in.${done.needsAttachment ? ' Attach your file, then press send.' : ' Press send to reach our team.'} If nothing opened, email us at ${TYPES[type].to}.`}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="mt-2 px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-center text-2xl sm:text-4xl font-extrabold tracking-tight mb-8 sm:mb-10" style={{ color: NAVY }}>
                                            {TYPES[type].heading}
                                        </h3>
                                        <EnquiryForm key={type} type={type} onDone={setDone} />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
    );
}
