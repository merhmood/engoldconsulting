// Continuous motion strip under the Home hero: the platforms, regulations and certifications
// the firm works with. It deliberately does not repeat the service names, which the
// Core services section lists right below it.
// All names come from the original engoldconsultingllc.com service pages.

// Advisory page (ERP) + IT Risk Management page (GRC and risk platforms), shown as names only.
const PLATFORMS = [
    'Oracle', 'SAP', 'ServiceNow GRC', 'Workday', 'RSA Archer', 'Salesforce', 'Lockpath',
    'ProcessUnity', 'Eramba', 'OneTrust', 'CyberGRX', 'ZenGRC', 'Vanta', 'BitSight',
    'SecurityScorecard', 'Drata', 'Black Kite',
];

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
        <section aria-labelledby="platforms-heading" className="bg-white border-b border-slate-200 py-8 sm:py-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-7 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <h2 id="platforms-heading" className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F1B2D]">
                    Platforms and frameworks we work with
                </h2>
                <p className="text-[15px] text-slate-600 md:text-right">
                    Delivered by consultants certified in {CERTIFICATIONS}.
                </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
                {/* ROW 1: PLATFORMS AS LARGE WORDMARKS */}
                <Track duration="120s">
                    {PLATFORMS.map((name) => (
                        <span key={name} className="shrink-0 inline-flex items-center gap-5 sm:gap-8 pr-3 sm:pr-5">
                            <span className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#0F1B2D]/85 whitespace-nowrap leading-none py-1">
                                {name}
                            </span>
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[3px] bg-orange-500 shrink-0" aria-hidden="true" />
                        </span>
                    ))}
                </Track>

                {/* ROW 2: REGULATIONS AND FRAMEWORKS (other direction, quieter) */}
                <Track reverse duration="60s">
                    {FRAMEWORKS.map((name) => (
                        <span
                            key={name}
                            className="shrink-0 px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F3F5F8] text-xs sm:text-[13px] font-semibold text-slate-700 whitespace-nowrap"
                        >
                            {name}
                        </span>
                    ))}
                </Track>
            </div>
        </section>
    );
}
