import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import PageHero from './PageHero.jsx';
import { EMAIL, PHONE, PHONE_HREF, HOURS, OFFICES } from './siteInfo.js';

const FIELDS = [
    { name: 'name', placeholder: 'Your Name', type: 'text', autoComplete: 'name', required: true },
    { name: 'email', placeholder: 'Email', type: 'email', autoComplete: 'email', required: true },
    { name: 'phone', placeholder: 'Phone', type: 'tel', autoComplete: 'tel' },
    { name: 'subject', placeholder: 'Subject', type: 'text' },
];

const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-[15px] text-[#0F1B2D] placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition';

// One row of the contact details panel
const InfoCard = ({ icon, title, children }) => (
    <div className="flex items-start gap-4 px-6 sm:px-7 py-6">
        <span className="text-orange-500 mt-0.5 shrink-0" aria-hidden="true">{icon}</span>
        <div className="space-y-1.5 min-w-0">
            <h3 className="text-base font-bold text-[#0F1B2D]">{title}</h3>
            <div className="text-[15px] text-slate-600 leading-relaxed">{children}</div>
        </div>
    </div>
);

export default function Contact({ onNavigate }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [opened, setOpened] = useState(false);

    const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // No server behind this site yet: the message opens, pre-filled, in the visitor's email app.
    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = form.subject || `Website enquiry from ${form.name}`;
        const body = [
            form.message,
            '',
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            form.phone && `Phone: ${form.phone}`,
        ].filter((line) => line !== false && line !== undefined).join('\n');
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setOpened(true);
    };

    return (
        <main className="bg-white min-h-screen text-gray-900 pb-20 sm:pb-24">
            <PageHero
                pageKey="contact"
                onNavigate={onNavigate}
                breadcrumb={[{ label: 'Home', page: 'home' }, { label: 'Contact Us' }]}
                eyebrow="Contact Us"
                title="Contact"
                highlight="Us"
                description="Need to reach out to us or leave messages? Call, email or send us a message and our team will get back to you."
                image="/images/web/hero5.jpg"
                imageCaption={{ title: "Chicago and Dallas offices", text: "Business hours: 8am - 6pm EST" }}
            />

            <section className="pt-16 sm:pt-20 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* CONTACT DETAILS */}
                <div className="lg:col-span-5 self-start rounded-2xl border border-slate-200 bg-white divide-y divide-slate-200">
                    <InfoCard icon={<MapPin className="w-5 h-5" />} title="Address">
                        <div className="space-y-3">
                            {OFFICES.map((office) => (
                                <a
                                    key={office.name}
                                    href={office.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-orange-600 transition-colors"
                                >
                                    <span className="block font-semibold text-gray-900">{office.name}</span>
                                    {office.lines.map((line) => (
                                        <span key={line} className="block">{line}</span>
                                    ))}
                                </a>
                            ))}
                        </div>
                    </InfoCard>

                    <InfoCard icon={<Phone className="w-5 h-5" />} title="Phone">
                        <a href={PHONE_HREF} className="hover:text-orange-600 transition-colors">{PHONE}</a>
                    </InfoCard>

                    <InfoCard icon={<Mail className="w-5 h-5" />} title="Email">
                        <a href={`mailto:${EMAIL}`} className="hover:text-orange-600 transition-colors break-all">{EMAIL}</a>
                    </InfoCard>

                    <InfoCard icon={<Clock className="w-5 h-5" />} title="Business Hours">
                        {HOURS}
                    </InfoCard>
                </div>

                {/* GET IN TOUCH FORM */}
                <div className="lg:col-span-7">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-[#F3F5F8] p-6 sm:p-10 rounded-2xl border border-slate-200 space-y-6"
                    >
                        <div className="space-y-2">
                            <p className="text-base font-semibold text-orange-600">Send us a message</p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F1B2D]">Get In Touch</h2>
                            <p className="text-base text-slate-600">Need to reach out to us or leave messages?</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {FIELDS.map((f) => (
                                <label key={f.name} className="block">
                                    <span className="sr-only">{f.placeholder}</span>
                                    <input
                                        name={f.name}
                                        type={f.type}
                                        placeholder={f.placeholder}
                                        autoComplete={f.autoComplete}
                                        required={f.required}
                                        maxLength={400}
                                        value={form[f.name]}
                                        onChange={update}
                                        className={inputClass}
                                    />
                                </label>
                            ))}
                        </div>

                        <label className="block">
                            <span className="sr-only">Your Message</span>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows={7}
                                maxLength={2000}
                                required
                                value={form.message}
                                onChange={update}
                                className={`${inputClass} resize-y`}
                            />
                        </label>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors"
                            >
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                            {opened && (
                                <p className="text-xs text-gray-500" role="status">
                                    Your email app should open with your message. If it doesn't, email us at {EMAIL}.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
