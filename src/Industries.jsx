import { Landmark, HeartPulse, Zap, ShoppingBag, Factory } from 'lucide-react';
import PageHero from './PageHero.jsx';
import { ClosingBand } from './HomeSections.jsx';

// Standalone overview of the industries we consult for. Deliberately not linked to the
// service pages or to separate sector pages. Regulations listed are only those named on
// the Compliance Management page of the original engoldconsultingllc.com site.
const INDUSTRIES = [
    {
        icon: <Landmark className="w-6 h-6" />,
        title: 'Financial Services & Banking',
        desc: 'IT risk, compliance and cybersecurity consulting for banks, credit unions, asset managers, insurers and financial technology companies.',
        regulations: ['SOX', 'GLBA', 'PCI DSS', 'FFIEC IT Security Handbook', 'Red Flags Rule'],
    },
    {
        icon: <HeartPulse className="w-6 h-6" />,
        title: 'Healthcare & Life Sciences',
        desc: 'Data privacy, security and compliance consulting for healthcare providers, payers and life sciences organizations handling sensitive patient data.',
        regulations: ['HIPAA', 'HITRUST CSF', 'CCPA', 'GDPR'],
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: 'Energy & Infrastructure',
        desc: 'Cybersecurity and IT risk consulting for energy, utility and infrastructure organizations that operate critical systems.',
        regulations: ['NIST Cybersecurity Framework', 'NIST SP 800 Series', 'ISO 27000 Series'],
    },
    {
        icon: <ShoppingBag className="w-6 h-6" />,
        title: 'Retail & Consumer',
        desc: 'Payment security, data privacy and vendor risk consulting for retailers and consumer brands.',
        regulations: ['PCI DSS', 'CCPA', 'GDPR'],
    },
    {
        icon: <Factory className="w-6 h-6" />,
        title: 'Manufacturing & Industrial',
        desc: 'ERP, IT controls and cybersecurity consulting for manufacturers and industrial companies.',
        regulations: ['SOX', 'NIST Cybersecurity Framework', 'ISO 27000 Series'],
    },
];

export default function Industries({ onNavigate }) {
    return (
        <main className="bg-white min-h-screen text-gray-900">
            <PageHero
                pageKey="industries"
                onNavigate={onNavigate}
                breadcrumb={[{ label: 'Home', page: 'home' }, { label: 'Industries' }]}
                eyebrow="Industries"
                title="Industries We Serve"
                description="Engold Consulting provides IT risk, compliance, cybersecurity and data privacy consulting to organizations across a range of industries."
                image="/images/web/hero1.jpg"
                imageCaption={{ title: "Consulting across industries", text: "IT risk, compliance, security and privacy" }}
            />

            <section aria-labelledby="industries-heading" className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="max-w-3xl space-y-3">
                        <p className="text-base font-semibold text-orange-600">Who we work with</p>
                        <h2 id="industries-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-[#0F1B2D]">
                            Industries we provide consulting for
                        </h2>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
                        {INDUSTRIES.map((ind) => (
                            <li key={ind.title} className="bg-white p-7 sm:p-8 flex flex-col">
                                <span className="text-orange-500" aria-hidden="true">{ind.icon}</span>
                                <h3 className="mt-6 text-xl font-extrabold tracking-tight text-[#0F1B2D]">{ind.title}</h3>
                                <p className="mt-2 text-[15px] text-slate-600 leading-relaxed flex-1">{ind.desc}</p>
                                <div className="mt-6 pt-5 border-t border-slate-200 space-y-2.5">
                                    <span className="block text-sm font-semibold text-slate-500">Key regulations</span>
                                    <ul className="flex flex-wrap gap-1.5">
                                        {ind.regulations.map((r) => (
                                            <li key={r} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F3F5F8] text-[13px] font-semibold text-[#0F1B2D]">{r}</li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                        {/* Sixth cell keeps the 3-column ruled grid even, and invites sectors not listed */}
                        <li className="bg-[#F3F5F8] p-7 sm:p-8 flex flex-col justify-center">
                            <h3 className="text-xl font-extrabold tracking-tight text-[#0F1B2D]">Another industry?</h3>
                            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
                                Our consulting applies wherever IT risk, compliance and security matter. Tell us about your organization.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>

            <ClosingBand onNavigate={onNavigate} />
        </main>
    );
}
