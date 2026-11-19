// Continuous motion strip under the Home hero: the platforms, regulations and certifications
// the firm works with. It deliberately does not repeat the service names, which the
// Core services section lists right below it.
// All names come from the original engoldconsultingllc.com service pages.

import { Database, ShieldCheck } from 'lucide-react';
import { PLATFORM_LOGOS } from './platformLogos.js';

// Advisory page (ERP) + IT Risk Management page (GRC platforms), one entry per company
// (product lines such as NetSuite, SuccessFactors and Oracle GRC are left out).
// `logo` points to a brand mark in platformLogos.js; platforms without one show a generic icon
// for their type (clearly not a brand logo) so every item keeps the same rhythm.
const PLATFORMS = [
    { name: 'Oracle', type: 'erp', logo: 'oracle' },
    { name: 'SAP', type: 'erp', logo: 'sap' },
    { name: 'ServiceNow GRC', type: 'grc', logo: 'servicenow' },
    { name: 'Workday', type: 'erp', logo: 'workday' },
    { name: 'Archer GRC', type: 'grc', logo: 'archer' },
    { name: 'Salesforce', type: 'erp', logo: 'salesforce' },
    { name: 'Lockpath Keylight', type: 'grc', logo: 'navex' }, // now part of NAVEX
];

const TYPE_ICON = { erp: Database, grc: ShieldCheck };

const PlatformMark = ({ platform }) => {
    const logo = platform.logo && PLATFORM_LOGOS[platform.logo];
    if (logo) {
        return (
            <svg
                viewBox={logo.viewBox}
                className={`${logo.wordmark ? 'h-[0.5em]' : 'h-[0.9em]'} w-auto shrink-0 fill-current`}
                style={logo.height ? { height: logo.height } : undefined}
                aria-hidden="true"
            >
                {logo.paths.map((p) => {
                    const d = typeof p === 'string' ? p : p.d;
                    return <path key={d.slice(0, 32)} d={d} opacity={typeof p === 'string' ? undefined : p.opacity} />;
                })}
            </svg>
        );
    }
    const Icon = TYPE_ICON[platform.type];
    return <Icon className="h-[0.8em] w-[0.8em] shrink-0 text-slate-400" strokeWidth={1.75} aria-hidden="true" />;
};

// Compliance Management page
const FRAMEWORKS = [
    'SOX', 'GDPR', 'GLBA', 'PCI DSS', 'HIPAA', 'HITRUST CSF', 'CCPA', 'NIST Cybersecurity Framework',
    'FFIEC IT Security Handbook', 'Red Flags Rule', 'FISMA', 'NIST SP 800 Series', 'COBIT', 'ISO 27000 Series',
];

const CERTIFICATIONS = 'CISA, CISSP, CISM, CEH and CDPSE';

// Renders its children twice so the track can loop seamlessly; the copy is hidden from assistive tech.
const Track = ({ children, reverse = false, duration }) => (
    <div className="marquee">
        <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`} style={{ '--marquee-duration': duration }}>
            <div className="marquee-set">{children}</div>
            <div className="marquee-set" aria-hidden="true">{children}</div>
        </div>
    </div>
);

export default function CapabilityMarquee() {
    return (
        <section aria-labelledby="platforms-heading" className="bg-white border-b border-slate-200 py-12 sm:py-14 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <h2 id="platforms-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1B2D]">
                    Platforms and frameworks we work with
                </h2>
                <p className="text-[15px] text-slate-600 md:text-right">
                    Delivered by consultants certified in {CERTIFICATIONS}.
                </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
                {/* ROW 1: PLATFORMS AS LARGE WORDMARKS */}
                <Track duration="70s">
                    {PLATFORMS.map((platform) => (
                        <span key={platform.name} className="shrink-0 inline-flex items-center gap-8 sm:gap-12 pr-4 sm:pr-8">
                            <span className="inline-flex items-center gap-3 sm:gap-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F1B2D]/85 whitespace-nowrap leading-none py-1">
                                <PlatformMark platform={platform} />
                                {platform.name}
                            </span>
                            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[3px] bg-orange-500 shrink-0" aria-hidden="true" />
                        </span>
                    ))}
                </Track>

                {/* ROW 2: REGULATIONS AND FRAMEWORKS (other direction, quieter) */}
                <Track reverse duration="80s">
                    {FRAMEWORKS.map((name) => (
                        <span
                            key={name}
                            className="shrink-0 px-4 py-2 rounded-lg border border-slate-200 bg-[#F3F5F8] text-sm font-semibold text-slate-700 whitespace-nowrap"
                        >
                            {name}
                        </span>
                    ))}
                </Track>
            </div>
        </section>
    );
}
