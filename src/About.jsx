import PageHero from './PageHero.jsx';
import { ClosingBand } from './HomeSections.jsx';

// All copy and figures come from the original engoldconsultingllc.com About and Home pages.
const CERTIFICATIONS = [
    { title: 'CISA', full: 'Certified Information Systems Auditor', issuer: 'ISACA' },
    { title: 'CISSP', full: 'Certified Information Systems Security Professional', issuer: '(ISC)²' },
    { title: 'CISM', full: 'Certified Information Security Manager', issuer: 'ISACA' },
    { title: 'CEH', full: 'Certified Ethical Hacker', issuer: 'EC-Council' },
    { title: 'CDPSE', full: 'Certified Data Privacy Solutions Engineer', issuer: 'ISACA' },
];

const STATS = [
    { value: '20+', label: 'Years of experience' },
    { value: '100+', label: 'Years of collective penetration testing experience' },
    { value: '5', label: 'Professional certifications' },
    { value: '5', label: 'Core service areas' },
];

const COMMITMENTS = [
    {
        title: 'Operate more efficiently',
        text: 'Engold Consulting helps businesses to improve and operate more efficiently while minimizing risks associated with Business and IT process changes.',
    },
    {
        title: 'Technology that fits your business',
        text: 'Our IT audit consultants work with clients to identify technology that meets their business needs.',
    },
    {
        title: 'Certified, multidisciplinary teams',
        text: 'Our multidisciplinary teams draw on experience across a wide variety of backgrounds and are certified by leading internationally recognized organizations.',
    },
];

const SignOff = () => (
    <svg className="w-7 h-7 shrink-0" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="1" y="1" width="26" height="26" rx="6" className="fill-orange-50 stroke-orange-500" strokeWidth="2" />
        <path d="M8 14.5l4 4 8-9" fill="none" className="stroke-orange-600" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function About({ onNavigate }) {
    return (
        <main className="bg-white min-h-screen text-gray-900">
            <PageHero
                pageKey="about"
                onNavigate={onNavigate}
                breadcrumb={[{ label: 'Home', page: 'home' }, { label: 'About Us' }]}
                eyebrow="About us"
                title="Over 20 Years of Experience in Helping You Grow Your Business"
                description="At Engold Consulting, our experts have deep knowledge, with over 20 years of experience and expertise to deliver a comprehensive IT risk intelligence and strategy to your organization, including implementing ERM solutions across multiple industries and developing matured IT risk management programs."
                image="/images/web/hero3.jpg"
                stats={STATS}
                primaryCta={{ label: 'Explore our services', page: 'solutions' }}
                secondaryCta={{ label: 'Contact Us', page: 'contact-us' }}
            />

            {/* HOW WE WORK */}
            <section aria-labelledby="how-heading" className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="max-w-3xl space-y-3">
                        <p className="text-base font-semibold text-orange-600">How we work with clients</p>
                        <h2 id="how-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-[#0F1B2D]">
                            Delivering solutions that count.
                        </h2>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
                        {COMMITMENTS.map((c) => (
                            <li key={c.title} className="bg-white p-7 sm:p-8 space-y-4">
                                <SignOff />
                                <h3 className="text-xl font-bold text-[#0F1B2D]">{c.title}</h3>
                                <p className="text-[15px] text-slate-600 leading-relaxed">{c.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CERTIFICATIONS LEDGER */}
            <section aria-labelledby="certs-heading" className="bg-[#F3F5F8] border-y border-slate-200 py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    <div className="lg:col-span-4 space-y-3">
                        <p className="text-base font-semibold text-orange-600">Certified professionals</p>
                        <h2 id="certs-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-[#0F1B2D]">
                            Industry-recognized certifications
                        </h2>
                        <p className="text-base text-slate-600 leading-relaxed">
                            Engold Consulting consultants maintain professional certifications, such as:
                        </p>
                    </div>
                    <ul className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white divide-y divide-slate-200">
                        {CERTIFICATIONS.map((c) => (
                            <li key={c.title} className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr_auto] items-baseline gap-x-4 gap-y-1 px-6 sm:px-8 py-5">
                                <span className="text-xl font-extrabold tracking-tight text-[#0F1B2D]">{c.title}</span>
                                <span className="text-[15px] text-slate-700">{c.full}</span>
                                <span className="col-start-2 sm:col-start-auto text-sm text-slate-500">{c.issuer}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <ClosingBand onNavigate={onNavigate} />
        </main>
    );
}
