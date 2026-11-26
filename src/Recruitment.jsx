import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight, ArrowUpRight, ChevronRight, Landmark, HeartPulse, Zap, ShoppingBag, Factory,
    Building2, UserRound, Mail, Copy, Check, Briefcase, Clock, Repeat, Crown, ShieldCheck, ClipboardCheck,
    Users, Layers, TrendingUp, Target, FileText, MessagesSquare, RotateCw,
} from 'lucide-react';
import GetInTouchModal from './GetInTouchModal.jsx';
import { LINKEDIN_URL, CAREERS_URL, EMAIL as RESUME_EMAIL } from './siteInfo.js';

// IT Recruitment page, laid out like a specialist recruiter's expertise page:
// audience switch -> full-bleed photo hero -> flip service cards -> industry expertise ->
// figures band -> photo-led process -> split connect band.
// The "I'm an Employer / I'm a Candidate" switch swaps all copy, imagery and calls to action
// (remembered in the URL as ?for=candidate so it can be linked to).
// Calls to action open the "Get in touch" dialog (GetInTouchModal.jsx) on the matching enquiry type.

const NAVY = '#0F1B2D';
const photo = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

// ─── Employer content ───
const EMPLOYER_GROUPS = [
    {
        heading: 'Recruitment services',
        intro: 'Whether you need someone for the long term or for the next project, we find IT professionals who fit the role and your team.',
        cards: [
            { icon: Briefcase, image: photo('1600880292203-757bb62b4baf'), title: 'Permanent recruitment', text: 'Full-time hires sourced and screened for technical depth, certifications and the way your organization works.' },
            { icon: Clock, image: photo('1556761175-b413da4baf72'), title: 'Contract staffing', text: 'Skilled consultants for a project, an audit cycle or a peak in demand, available at short notice.' },
            { icon: Repeat, image: photo('1600880292089-90a7e086ee0c'), title: 'Contract-to-hire', text: 'Work with a professional on contract first, then bring them on permanently once you know they are the right fit.' },
        ],
    },
    {
        heading: 'Specialist and leadership search',
        intro: 'For senior and hard-to-fill roles, our practitioners run a focused search and assess every candidate on real ability.',
        cards: [
            { icon: Crown, image: photo('1507679799987-c73779587ccf'), title: 'Security leadership search', text: 'CISOs, heads of IT risk, IT audit directors and other leaders who shape your security and compliance programs.' },
            { icon: ShieldCheck, image: photo('1542744173-8e7e53415bb0'), title: 'Interim leadership', text: 'Experienced interim and fractional leaders, including vCISO support, to cover a gap or lead a change program.' },
            { icon: ClipboardCheck, image: photo('1531482615713-2afd69097998'), title: 'Technical assessment', text: 'Candidates evaluated by certified IT risk and security professionals before they reach your shortlist.' },
        ],
    },
    {
        heading: 'Workforce solutions',
        intro: 'When hiring needs go beyond a single role, we build and manage the team around your program.',
        cards: [
            { icon: Users, image: photo('1573164713988-8665fc963095'), title: 'Staff augmentation', text: 'Certified resources who extend your team for security operations, audits and compliance work.' },
            { icon: Layers, image: photo('1552664730-d307ca884978'), title: 'Project teams', text: 'Ready-made teams for GRC platform rollouts, ERP security, IAM and other implementation projects.' },
            { icon: TrendingUp, image: photo('1521737604893-d14cc237f11d'), title: 'Scaled hiring', text: 'Multiple hires across locations or functions, delivered through one point of contact.' },
        ],
    },
];

const EMPLOYER_STEPS = [
    { image: photo('1551836022-d5d88e9218df', 700), title: 'Understand your needs', text: 'We learn the skills, certifications and team context the role requires.' },
    { image: photo('1522071820081-009f0129c71c', 700), title: 'Source and screen', text: 'Our IT risk and security practitioners assess candidates on real technical ability.' },
    { image: photo('1517245386807-bb43f82c33c4', 700), title: 'Present a shortlist', text: 'You meet a small set of qualified candidates instead of a pile of resumes.' },
    { image: photo('1573496359142-b8d87734a5a2', 700), title: 'Place and follow up', text: 'We support onboarding and check in to make sure the placement works for both sides.' },
];

// ─── Candidate content ───
const CANDIDATE_GROUPS = [
    {
        heading: 'Roles we recruit for',
        intro: 'Whatever stage of your career you are at, we match IT risk, compliance and security professionals with roles that suit their skills and goals.',
        cards: [
            { icon: Briefcase, image: photo('1573497019940-1c28c88b4f3e'), title: 'Permanent roles', text: 'Full-time positions with organizations that value certified IT risk, compliance and security talent.' },
            { icon: Clock, image: photo('1519389950473-47ba0277781c'), title: 'Contract roles', text: 'Project, audit-cycle and interim assignments for professionals who like variety and flexibility.' },
            { icon: Crown, image: photo('1560250097-0b93528c311a'), title: 'Leadership roles', text: 'Senior opportunities such as CISO, head of IT risk and IT audit director for experienced leaders.' },
        ],
    },
    {
        heading: 'How we support you',
        intro: 'Our recruiters are backed by practitioners who do the same work you do, so the advice you get is practical and specific.',
        cards: [
            { icon: Target, image: photo('1551836022-d5d88e9218df'), title: 'Career guidance', text: 'Honest advice on the next step for your career, the certifications that matter and where your skills are in demand.' },
            { icon: FileText, image: photo('1563986768609-322da13575f3'), title: 'Resume feedback', text: 'Practical feedback so your resume shows your audit, risk and security experience clearly.' },
            { icon: MessagesSquare, image: photo('1517245386807-bb43f82c33c4'), title: 'Interview preparation', text: 'Insight into each client and the technical questions to expect, so you walk in prepared.' },
        ],
    },
];

const CANDIDATE_STEPS = [
    { image: photo('1563986768609-322da13575f3', 700), title: 'Email us your resume', text: `Send your resume to ${RESUME_EMAIL} and tell us the kind of role and industry you are looking for.` },
    { image: photo('1551836022-d5d88e9218df', 700), title: 'Talk with a specialist', text: 'A recruiter with IT risk and security knowledge learns about your skills and goals.' },
    { image: photo('1531482615713-2afd69097998', 700), title: 'Get matched to roles', text: 'We introduce you to roles that fit, and only with your agreement.' },
    { image: photo('1573496359142-b8d87734a5a2', 700), title: 'Start with support', text: 'We help with offers and onboarding, and stay in touch once you start.' },
];

// ─── Shared content ───
// Our expertise: the same industries as the Industries page, with the IT talent we place in each.
const INDUSTRIES = [
    {
        icon: Landmark,
        title: 'Financial Services & Banking',
        text: 'IT talent for banks, credit unions, asset managers, insurers and financial technology companies, where SOX, GLBA, PCI DSS and FFIEC expectations shape every role.',
        roles: ['IT Auditors', 'SOX IT Specialists', 'Cybersecurity Analysts', 'Third-Party Risk Analysts', 'IAM Engineers'],
    },
    {
        icon: HeartPulse,
        title: 'Healthcare & Life Sciences',
        text: 'Professionals who protect sensitive patient data for providers, payers and life sciences organizations, with hands-on HIPAA and HITRUST CSF experience.',
        roles: ['Privacy Analysts', 'HIPAA Compliance Managers', 'Security Engineers', 'IT Risk Analysts'],
    },
    {
        icon: Zap,
        title: 'Energy & Infrastructure',
        text: 'Security and risk specialists for energy, utility and infrastructure organizations that run critical systems, aligned with NIST and ISO 27000 frameworks.',
        roles: ['Security Architects', 'SOC & SIEM Analysts', 'Penetration Testers', 'GRC Analysts'],
    },
    {
        icon: ShoppingBag,
        title: 'Retail & Consumer',
        text: 'People who secure payments, customer data and supplier networks for retailers and consumer brands, with PCI DSS, CCPA and GDPR know-how.',
        roles: ['PCI Compliance Specialists', 'Privacy Managers', 'Vendor Risk Analysts', 'Application Security Testers'],
    },
    {
        icon: Factory,
        title: 'Manufacturing & Industrial',
        text: 'ERP security, IT controls and cybersecurity talent for manufacturers and industrial companies running SAP, Oracle and other enterprise platforms.',
        roles: ['ERP Security & SOD Consultants', 'IT Controls Analysts', 'Cybersecurity Engineers', 'GRC Platform Administrators'],
    },
];

const FIGURES = [
    { value: '20+', label: 'Years of experience' },
    { value: '10+', label: 'Professional certifications across our team' },
    { value: '100+', label: 'Years of collective penetration testing experience' },
];

const mailto = (to, subject, body) =>
    `mailto:${to}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
// Resumes go to the main inbox. Email links cannot attach files, so the pre-filled message reminds candidates to attach theirs.
const CANDIDATE_MAILTO = mailto(
    RESUME_EMAIL,
    'Candidate resume',
    [
        'Hello Engold Consulting,',
        '',
        'Please find my resume attached.',
        '',
        'Role I am looking for:',
        'Industry / location preference:',
        'Availability:',
        '',
        'Thank you,',
    ].join('\n'),
);

// Everything that differs between the two audiences
const AUDIENCES = {
    employer: {
        label: "I'm an Employer",
        icon: Building2,
        heroEyebrow: 'IT Recruitment for employers',
        heroImage: photo('1521791136064-7986c2920216', 2000),
        heroTitle: 'Specialist IT recruitment for every hiring need',
        heroText: 'We help our clients find the right talent: IT risk, compliance and cybersecurity professionals for the industries we know best, screened by people who do the work every day.',
        primary: { label: 'Get in touch', intent: 'hire' },
        servicesEyebrow: 'Our recruitment services',
        servicesTitle: 'Hiring support built around your needs',
        groups: EMPLOYER_GROUPS,
        expertiseTitle: 'IT talent for the industries we know',
        expertiseText: 'We consult in these industries every day, so we know the regulations, systems and skills each one demands.',
        rolesLabel: 'Roles we place',
        processTitle: 'Four steps from brief to placement',
        steps: EMPLOYER_STEPS,
        connectImage: photo('1600880292203-757bb62b4baf', 1200),
        connectTitle: 'Looking to hire the right IT talent?',
        connectText: 'Tell us about the role and a specialist recruiter will be in touch.',
        connectPrimary: { label: 'Looking to hire?', intent: 'hire' },
        connectSecondary: { label: 'Follow us on LinkedIn', href: LINKEDIN_URL },
    },
    candidate: {
        label: "I'm a Candidate",
        icon: UserRound,
        heroEyebrow: 'IT Recruitment for candidates',
        heroImage: photo('1590650153855-d9e808231d41', 2000),
        heroTitle: 'Find your next role in IT risk and security',
        heroText: `We connect IT risk, compliance and cybersecurity professionals with employers across financial services, healthcare, energy, retail and manufacturing. Email your resume to ${RESUME_EMAIL}.`,
        primary: { label: 'Send your resume', intent: 'job' },
        secondary: { label: 'View open roles', href: CAREERS_URL },
        servicesEyebrow: 'For candidates',
        servicesTitle: 'Your career, with specialists on your side',
        groups: CANDIDATE_GROUPS,
        expertiseTitle: 'Industries where we place IT professionals',
        expertiseText: 'Explore the industries we recruit for and the kinds of roles our clients hire for in each.',
        rolesLabel: 'Roles in demand',
        processTitle: 'Four steps to your next role',
        steps: CANDIDATE_STEPS,
        connectImage: photo('1573497019940-1c28c88b4f3e', 1200),
        connectTitle: 'Ready for your next IT career move?',
        connectText: `Email your resume to ${RESUME_EMAIL} and tell us what you are looking for.`,
        connectPrimary: { label: 'Send your resume', intent: 'job' },
        connectSecondary: { label: 'View open roles on LinkedIn', href: CAREERS_URL },
    },
};

const readAudience = () => {
    try {
        return new URLSearchParams(window.location.search).get('for') === 'candidate' ? 'candidate' : 'employer';
    } catch {
        return 'employer';
    }
};

// ─── Building blocks ───
// Opens the "Get in touch" dialog on a given enquiry type ('hire' | 'consultant' | 'job')
const EnquiryContext = createContext(() => {});

const PrimaryButton = ({ intent, label, className = '' }) => {
    const openEnquiry = useContext(EnquiryContext);
    return (
    <button
        type="button"
        onClick={() => openEnquiry(intent)}
        className={`group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${className}`}
    >
        {label}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
    );
};

const OutlineButton = ({ href, label, light = false }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${light
            ? 'border-white/80 text-white hover:bg-white hover:text-[#0F1B2D]'
            : 'border-[#0F1B2D] text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white'
            }`}
    >
        {label}
        <ArrowUpRight className="w-4 h-4" />
    </a>
);

const SectionHeading = ({ id, eyebrow, title, children, light = false }) => (
    <div className="max-w-3xl space-y-4">
        {eyebrow && <p className={`text-base font-semibold ${light ? 'text-orange-400' : 'text-orange-600'}`}>{eyebrow}</p>}
        <h2 id={id} className={`text-3xl sm:text-[2.6rem] font-extrabold tracking-tight leading-[1.1] ${light ? 'text-white' : ''}`} style={light ? undefined : { color: NAVY }}>
            {title}
        </h2>
        {children && <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-slate-300' : 'text-slate-600'}`}>{children}</p>}
    </div>
);

// Tab strip above the hero ("I'm an Employer | I'm a Candidate"), pinned under the site header
const AudienceSwitch = ({ audience, onChange }) => (
    <div className="sticky top-20 z-40 bg-[#0F1B2D] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-stretch justify-between gap-4">
            <div role="tablist" aria-label="Choose who you are" className="flex items-stretch w-full sm:w-auto">
                {Object.entries(AUDIENCES).map(([key, { label, icon: Icon }]) => {
                    const active = audience === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            aria-controls="recruitment-content"
                            onClick={() => onChange(key)}
                            className={`relative flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-400 ${active ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Icon className={`w-4 h-4 ${active ? 'text-orange-400' : ''}`} strokeWidth={2} aria-hidden="true" />
                            {label}
                            {active && (
                                <motion.span
                                    layoutId="audience-underline"
                                    className="absolute left-0 right-0 bottom-0 h-[3px] bg-orange-500"
                                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
            <p className="hidden md:flex items-center text-[13px] font-semibold text-slate-400">
                {audience === 'employer' ? 'Hiring IT, risk or security talent?' : 'Looking for your next IT role?'}
            </p>
        </div>
    </div>
);

// Full-bleed photo hero with a navy wash on the text side
const Hero = ({ a, onNavigate }) => (
    <section className="relative isolate overflow-hidden bg-[#0F1B2D] text-white">
        <AnimatePresence mode="wait">
            <motion.img
                key={a.heroImage}
                src={a.heroImage}
                alt=""
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 -z-10 w-full h-full object-cover object-center"
            />
        </AnimatePresence>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0F1B2D] via-[#0F1B2D]/85 to-[#0F1B2D]/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0F1B2D]/70 via-transparent to-transparent lg:hidden" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[520px] lg:min-h-[600px] flex flex-col justify-center py-16 sm:py-20">
            <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-300">
                    <li>
                        <button type="button" onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button>
                    </li>
                    <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
                    <li aria-current="page" className="text-white">IT Recruitment</li>
                </ol>
            </nav>
            <AnimatePresence mode="wait">
                <motion.div
                    key={a.heroTitle}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-2xl space-y-6"
                >
                    <p className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-orange-400">
                        <span className="w-6 h-[2px] bg-orange-500" aria-hidden="true" />
                        {a.heroEyebrow}
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">{a.heroTitle}</h1>
                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed">{a.heroText}</p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <PrimaryButton {...a.primary} />
                        {a.secondary && <OutlineButton {...a.secondary} light />}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    </section>
);

// Flip card: photo front (title + icon), navy back (description + call to action).
// Turns over on hover, on keyboard focus, and on tap for touch screens.
const FlipCard = ({ icon: Icon, image, title, text, cta }) => {
    const [flipped, setFlipped] = useState(false);
    const openEnquiry = useContext(EnquiryContext);
    const face = 'absolute inset-0 rounded-2xl overflow-hidden';
    const hidden = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };
    return (
        <article
            className="group relative h-[360px] sm:h-[380px] [perspective:1400px]"
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            onFocus={() => setFlipped(true)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFlipped(false); }}
        >
            <div
                className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* FRONT: photo with title */}
                <button
                    type="button"
                    onClick={() => setFlipped(true)}
                    aria-label={`${title}: show details`}
                    tabIndex={flipped ? -1 : 0}
                    className={`${face} text-left border border-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500`}
                    style={hidden}
                >
                    <img src={image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex items-end justify-between gap-4">
                        <div className="space-y-3">
                            <span className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" strokeWidth={2} aria-hidden="true" />
                            </span>
                            <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">{title}</h4>
                        </div>
                        <span className="shrink-0 w-10 h-10 rounded-full border-2 border-white/70 text-white flex items-center justify-center" aria-hidden="true">
                            <RotateCw className="w-4 h-4" />
                        </span>
                    </div>
                </button>

                {/* BACK: description and call to action */}
                <div
                    className={`${face} bg-[#0F1B2D] text-white p-6 sm:p-8 flex flex-col`}
                    style={{ ...hidden, transform: 'rotateY(180deg)' }}
                    aria-hidden={!flipped}
                >
                    <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-orange-500/15 blur-2xl" aria-hidden="true" />
                    <Icon className="relative w-8 h-8 text-orange-400" strokeWidth={1.75} aria-hidden="true" />
                    <h4 className="relative mt-5 text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">{title}</h4>
                    <p className="relative mt-3 text-[15px] text-slate-300 leading-relaxed">{text}</p>
                    <div className="relative mt-auto pt-6 flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => openEnquiry(cta.intent)}
                            tabIndex={flipped ? 0 : -1}
                            className="group/cta inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 rounded"
                        >
                            {cta.label}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setFlipped(false)}
                            tabIndex={flipped ? 0 : -1}
                            aria-label={`${title}: back to photo`}
                            className="lg:hidden w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 focus-visible:outline-2 focus-visible:outline-orange-400"
                        >
                            <RotateCw className="w-4 h-4 -scale-x-100" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

// Candidate view: how to email a resume, with the address shown in full and a copy button
const ResumePanel = () => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(RESUME_EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked: the address is still visible to copy by hand
        }
    };
    return (
        <section aria-labelledby="resume-heading" className="relative z-10 px-4 sm:px-6 -mt-10 sm:-mt-14">
            <div className="max-w-7xl mx-auto rounded-2xl bg-white shadow-2xl shadow-slate-900/10 border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 lg:items-center">
                <div className="lg:col-span-7 flex items-start gap-4">
                    <span className="shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-orange-500" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="space-y-1.5">
                        <h2 id="resume-heading" className="text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>Email us your resume</h2>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                            Attach your resume and tell us the role and industry you are looking for. A specialist recruiter will be in touch.
                        </p>
                    </div>
                </div>
                <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 min-w-0 flex items-center gap-2 rounded-full bg-[#F3F5F8] border border-slate-200 pl-5 pr-1.5 py-1.5">
                        <a href={CANDIDATE_MAILTO} className="flex-1 min-w-0 truncate text-[15px] font-bold hover:text-orange-600 transition-colors" style={{ color: NAVY }}>
                            {RESUME_EMAIL}
                        </a>
                        <button
                            type="button"
                            onClick={copy}
                            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors focus-visible:outline-2 focus-visible:outline-orange-500"
                        >
                            {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <PrimaryButton intent="job" label="Send resume" className="shrink-0" />
                    <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
                </div>
            </div>
        </section>
    );
};

export default function Recruitment({ onNavigate }) {
    const [audience, setAudience] = useState(readAudience);
    const a = AUDIENCES[audience];
    const [enquiry, setEnquiry] = useState(null); // null = dialog closed, otherwise the enquiry type
    const openEnquiry = useCallback((type) => setEnquiry(type || 'hire'), []);
    const closeEnquiry = useCallback(() => setEnquiry(null), []);

    // Keep the choice in the URL (?for=candidate) without adding history entries
    useEffect(() => {
        try {
            const url = new URL(window.location.href);
            if (audience === 'candidate') url.searchParams.set('for', 'candidate');
            else url.searchParams.delete('for');
            window.history.replaceState(window.history.state, '', url);
        } catch {
            // URL APIs unavailable: the switch still works, it just isn't remembered
        }
    }, [audience]);

    const switchAudience = (next) => {
        setAudience(next);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <EnquiryContext.Provider value={openEnquiry}>
        <main className="bg-white min-h-screen text-gray-900">
            <AudienceSwitch audience={audience} onChange={setAudience} />
            <Hero a={a} onNavigate={onNavigate} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={audience}
                    id="recruitment-content"
                    role="tabpanel"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                >
                    {audience === 'candidate' && <ResumePanel />}

                    {/* SERVICES: groups of photo cards, each with its own call to action */}
                    <section aria-labelledby="recruitment-services-heading" className="py-16 sm:py-24 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
                            <SectionHeading id="recruitment-services-heading" eyebrow={a.servicesEyebrow} title={a.servicesTitle} />
                            {a.groups.map((group) => (
                                <div key={group.heading} className="space-y-8">
                                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 border-b border-slate-300 pb-6">
                                        <div className="max-w-2xl space-y-2">
                                            <h3 className="text-2xl sm:text-[1.75rem] font-extrabold tracking-tight" style={{ color: NAVY }}>{group.heading}</h3>
                                            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">{group.intro}</p>
                                        </div>
                                        <div className="shrink-0"><PrimaryButton {...a.primary} /></div>
                                    </div>
                                    {/* Phones: swipeable row of cards. Tablets and up: grid. */}
                                    <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-px-4 pb-2 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                        {group.cards.map((card) => (
                                            <div key={card.title} className="shrink-0 w-[82%] sm:w-auto snap-start">
                                                <FlipCard {...card} cta={a.primary} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* OUR EXPERTISE: stacked list of the industries we recruit for */}
                    <section aria-labelledby="industries-heading" className="bg-[#F3F5F8] py-16 sm:py-24 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                            <div className="lg:col-span-4 lg:sticky lg:top-44 space-y-6">
                                <SectionHeading id="industries-heading" eyebrow="Our expertise" title={a.expertiseTitle}>
                                    {a.expertiseText}
                                </SectionHeading>
                                <PrimaryButton {...a.primary} />
                            </div>
                            <ul className="lg:col-span-8 border-t border-slate-300">
                                {INDUSTRIES.map(({ icon: Icon, title, text, roles }) => (
                                    <li key={title} className="group border-b border-slate-300 py-8 sm:py-9 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8">
                                        <div className="sm:col-span-5 flex items-start gap-4">
                                            <span className="shrink-0 w-12 h-12 rounded-xl bg-white group-hover:bg-orange-500 flex items-center justify-center transition-colors">
                                                <Icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" strokeWidth={1.75} aria-hidden="true" />
                                            </span>
                                            <h3 className="pt-2.5 text-xl font-extrabold tracking-tight leading-snug" style={{ color: NAVY }}>{title}</h3>
                                        </div>
                                        <div className="sm:col-span-7 space-y-4">
                                            <p className="text-[15px] text-slate-600 leading-relaxed">{text}</p>
                                            <div className="space-y-2">
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{a.rolesLabel}</p>
                                                <ul className="flex flex-wrap gap-2" aria-label={`${a.rolesLabel} in ${title}`}>
                                                    {roles.map((role) => (
                                                        <li key={role} className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-[13px] font-semibold text-slate-700">
                                                            {role}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => onNavigate('industries')}
                                                className="group/link inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 rounded"
                                            >
                                                Discover more
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* FIGURES BAND */}
                    <section aria-labelledby="figures-heading" className="relative isolate overflow-hidden bg-[#0F1B2D] text-white py-16 sm:py-24 px-4 sm:px-6">
                        <div className="absolute -right-32 -top-32 -z-10 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
                        <div className="max-w-7xl mx-auto space-y-12">
                            <div className="text-center max-w-2xl mx-auto space-y-4">
                                <p className="text-base font-semibold text-orange-400">Why Engold</p>
                                <h2 id="figures-heading" className="text-3xl sm:text-[2.6rem] font-extrabold tracking-tight leading-[1.1]">Recruiters who know the work</h2>
                                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                                    Our recruitment is backed by a consulting team of certified IT risk and security practitioners.
                                </p>
                            </div>
                            <dl className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 border-y border-white/15">
                                {FIGURES.map(({ value, label }) => (
                                    <div key={label} className="py-8 sm:py-10 px-6 text-center flex flex-col-reverse gap-2">
                                        <dt className="text-sm sm:text-[15px] text-slate-300 leading-snug">{label}</dt>
                                        <dd className="text-5xl sm:text-6xl font-extrabold tracking-tight text-orange-400">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </section>

                    {/* FOUR-STEP PROCESS: photo-led steps */}
                    <section aria-labelledby="process-heading" className="py-16 sm:py-24 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                                <SectionHeading id="process-heading" eyebrow="How it works" title={a.processTitle} />
                                <div className="shrink-0"><PrimaryButton {...a.primary} /></div>
                            </div>
                            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {a.steps.map(({ image, title, text }, i) => (
                                    <li key={title} className="group">
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                                            <img src={image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            <span className="absolute top-4 left-4 w-11 h-11 rounded-full bg-orange-500 text-white text-lg font-extrabold flex items-center justify-center shadow-lg">
                                                {i + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-5 text-lg font-extrabold tracking-tight" style={{ color: NAVY }}>
                                            <span className="sr-only">Step {i + 1}: </span>{title}
                                        </h3>
                                        <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{text}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    {/* LET'S CONNECT: split photo + call to action, with a way into the other audience */}
                    <section aria-labelledby="connect-heading" className="px-4 sm:px-6 pb-16 sm:pb-24">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden bg-[#0F1B2D] text-white">
                            <div className="relative min-h-[240px] lg:min-h-[420px]">
                                <img src={a.connectImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
                                <p className="text-base font-semibold text-orange-400">Let's connect</p>
                                <h2 id="connect-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{a.connectTitle}</h2>
                                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{a.connectText}</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <PrimaryButton {...a.connectPrimary} />
                                    <OutlineButton {...a.connectSecondary} light />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => switchAudience(audience === 'employer' ? 'candidate' : 'employer')}
                                    className="self-start text-sm font-bold text-orange-400 hover:text-orange-300 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 rounded"
                                >
                                    {audience === 'employer' ? 'Looking for a job instead? See candidate support' : 'Hiring instead? See our services for employers'}
                                </button>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>

            <GetInTouchModal open={enquiry !== null} initialType={enquiry || 'hire'} onClose={closeEnquiry} />
        </main>
        </EnquiryContext.Provider>
    );
}
