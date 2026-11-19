import { ArrowRight, ArrowUpRight, Compass, ShieldAlert, Lock, Server } from 'lucide-react';

const NAVY = '#0F1B2D';

// Navigation link that keeps a real href (for new tabs / SEO) but routes in-app on a normal click
const RouteLink = ({ page, onNavigate, className, children }) => (
    <a
        href={`/${page}`}
        onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            onNavigate(page);
        }}
        className={className}
    >
        {children}
    </a>
);

// PHOTO COLLAGE: three photos in soft rounded-square ("squircle") shapes of different sizes,
// loosely overlapping, floating over two faint larger shapes. The container has a fixed aspect
// ratio, so the percentage positions hold at every screen width.
// `tone` sets the background shapes: 'light' for pale sections, 'dark' for the navy band.
const COLLAGE_SPOTS = [
    'left-[3%] top-[2%] w-[54%] h-[64.8%] z-10',  // large, top-left
    'left-[66%] top-[22%] w-[32%] h-[38.4%] z-20', // medium, right (ends at 98%)
    'left-[40%] top-[60%] w-[30%] h-[36%] z-20',   // small, bottom
];

export const PhotoCollage = ({ images, tone = 'light', className = '' }) => {
    const blob = tone === 'dark' ? 'bg-white/[0.06]' : 'bg-[#E3E9F1]';
    return (
        <div className={`relative w-full aspect-[6/5] ${className}`} aria-hidden="true">
            <span className={`absolute left-0 top-[10%] w-[60%] h-[68%] rounded-[38%] ${blob}`} />
            <span className={`absolute left-[36%] top-[24%] w-[64%] h-[72%] rounded-[38%] ${blob}`} />
            {images.slice(0, 3).map((src, i) => (
                <div
                    key={src}
                    className={`absolute ${COLLAGE_SPOTS[i]} overflow-hidden rounded-[30%] bg-slate-300 shadow-[0_24px_48px_-16px_rgba(15,27,45,0.45)] ${tone === 'dark' ? 'ring-1 ring-white/10' : 'ring-4 ring-white/70'}`}
                >
                    <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                </div>
            ))}
        </div>
    );
};

// "Signed off" tick used on the commitments worksheet
const SignOff = () => (
    <svg className="w-7 h-7 shrink-0" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="1" y="1" width="26" height="26" rx="6" className="fill-orange-50 stroke-orange-500" strokeWidth="2" />
        <path d="M8 14.5l4 4 8-9" fill="none" className="stroke-orange-600" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ─────────────────────────── WHO WE ARE ───────────────────────────
   Statements are the original homepage intro copy, shown as a sign-off worksheet. */
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

export function WhoWeAre({ onNavigate }) {
    return (
        <section aria-labelledby="who-we-are-heading" className="bg-[#F3F5F8] py-16 sm:py-24 px-4 sm:px-6">
            {/* Row 1: headline left, intro and actions right (same pattern as Core services) */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 lg:items-end">
                <div className="lg:col-span-7 space-y-5">
                    <p className="text-base font-semibold text-orange-600">Who we are</p>
                    <h2 id="who-we-are-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]" style={{ color: NAVY }}>
                        Over 20 years of experience in helping you grow your business.
                    </h2>
                </div>
                <div className="lg:col-span-5 space-y-6">
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                        Our experts deliver comprehensive IT risk intelligence and strategy, including ERM solutions across multiple industries and mature IT risk management programs.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <RouteLink
                            page="about"
                            onNavigate={onNavigate}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            Learn more about us
                        </RouteLink>
                        <RouteLink
                            page="solutions"
                            onNavigate={onNavigate}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#0F1B2D] text-[#0F1B2D] text-sm font-bold transition-colors hover:bg-[#0F1B2D] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            Explore our services
                        </RouteLink>
                    </div>
                </div>
            </div>

            {/* Row 2: photo collage left, commitments worksheet right */}
            <div className="max-w-7xl mx-auto mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <PhotoCollage
                    className="lg:col-span-6 max-w-xl mx-auto lg:max-w-none"
                    images={['/images/web/hero4.jpg', '/images/web/hero7.jpg', '/images/web/hero2.jpg']}
                />

                {/* COMMITMENTS WORKSHEET */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200">
                    <div className="px-6 sm:px-8 py-4 border-b border-slate-200">
                        <span className="text-sm font-bold" style={{ color: NAVY }}>How we work with clients</span>
                    </div>
                    <ul className="divide-y divide-slate-200">
                        {COMMITMENTS.map((c) => (
                            <li key={c.title} className="flex gap-5 px-6 sm:px-8 py-7">
                                <SignOff />
                                <div className="space-y-1.5">
                                    <h3 className="text-lg font-bold" style={{ color: NAVY }}>{c.title}</h3>
                                    <p className="text-[15px] text-slate-600 leading-relaxed">{c.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="px-6 sm:px-8 py-4 border-t border-slate-200 bg-[#F3F5F8]/60 rounded-b-2xl text-sm text-slate-600">
                        Our consultants hold CISA, CISSP, CISM, CEH and CDPSE certifications.
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────── AI CONSULTING ─────────────────────────── */
const AI_GROUPS = [
    {
        title: 'AI governance and risk',
        items: ['Governance framework design', 'AI risk assessment', 'Policies and acceptable-use standards', 'NIST AI RMF and ISO/IEC 42001 alignment'],
    },
    {
        title: 'Secure AI adoption',
        items: ['AI readiness assessment', 'Use-case prioritization and roadmap', 'Security review of AI applications', 'Access controls for AI tools and data'],
    },
    {
        title: 'AI privacy and compliance',
        items: ['Privacy impact assessments for AI', 'Data governance for AI inputs', 'AI controls in SOX and IT audit', 'AI vendor risk assessment'],
    },
];

const AI_ARTICLES = [
    { id: 'ai-enablement', title: 'AI Enablement: From First Model Training to Autonomous Agentic Execution', readTime: '4 min read' },
    { id: 'risk-ai', title: 'Engold Launches Advanced Risk AI to Elevate Client Research & Audit Delivery', readTime: '3 min read' },
];

export function AiConsulting({ onNavigate, onOpenArticle }) {
    return (
        <section aria-labelledby="ai-heading" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#16325C] text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-5 space-y-6">
                    <p className="text-base font-semibold text-orange-400">AI Consulting</p>
                    <h2 id="ai-heading" className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">
                        Put AI to work with the right controls in place.
                    </h2>
                    <p className="text-lg text-slate-200 leading-relaxed">
                        We bring our experience in IT risk, cybersecurity and data privacy to help you adopt AI securely and stay compliant.
                    </p>
                    <RouteLink
                        page="ai-consulting"
                        onNavigate={onNavigate}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                    >
                        Explore AI Consulting
                        <ArrowRight className="w-4 h-4" />
                    </RouteLink>

                    {/* FURTHER READING */}
                    <div className="pt-6 border-t border-white/15 space-y-3">
                        <h3 className="text-sm font-semibold text-slate-300">Further reading</h3>
                        {AI_ARTICLES.map((a) => (
                            <a
                                key={a.id}
                                href={`/article/${a.id}`}
                                onClick={(e) => {
                                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                                    e.preventDefault();
                                    onOpenArticle(a.id);
                                }}
                                className="group flex items-center gap-4 p-2 -mx-2 rounded-xl hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-orange-400 transition-colors"
                            >
                                <span className="min-w-0">
                                    <span className="block text-sm font-bold leading-snug group-hover:text-orange-300 transition-colors">{a.title}</span>
                                    <span className="block text-xs text-slate-300 mt-1">{a.readTime}</span>
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-300 shrink-0 ml-auto" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* SERVICE GROUPS */}
                <div className="lg:col-span-7 lg:pt-12">
                    <ul className="border-t border-white/20">
                        {AI_GROUPS.map((g) => (
                            <li key={g.title} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 py-7 border-b border-white/20">
                                <h3 className="sm:col-span-5 text-xl font-bold leading-snug flex items-start gap-3">
                                    <span className="mt-2 w-2.5 h-2.5 rounded-sm bg-orange-500 shrink-0" aria-hidden="true" />
                                    {g.title}
                                </h3>
                                <ul className="sm:col-span-7 space-y-2 text-[15px] text-slate-200">
                                    {g.items.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────── CORE SERVICES ───────────────────────────
   The four core services and their items exactly as on the original homepage.
   Items with a `page` link straight to that service's page. */
const CORE_SERVICES = [
    {
        icon: Compass,
        title: 'Advisory',
        page: 'advisory',
        summary: 'Security and controls built into your ERP and transformation programs.',
        items: [
            { label: 'ERP Cloud Transformation' },
            { label: 'Application Security' },
            { label: 'Process Control Integration' },
            { label: 'Segregation of Duties, Sensitive Access and Cross-Platform SOD' },
        ],
    },
    {
        icon: ShieldAlert,
        title: 'Risk Consulting',
        page: 'risk-consulting',
        summary: 'Identify, prioritize and mitigate risk across your IT organization.',
        items: [
            { label: 'IT Risk Management', page: 'it-risk' },
            { label: 'Compliance Management', page: 'compliance' },
            { label: '3rd Party & Vendor Risk Management', page: 'vendor-risk' },
            { label: 'Data Privacy', page: 'data-privacy' },
        ],
    },
    {
        icon: Lock,
        title: 'Cyber & Data',
        page: 'cyber-data',
        summary: 'Assess and strengthen your security posture.',
        items: [
            { label: 'IAM: Identity and Access Management' },
            { label: 'Security Information & Event Management (SIEM)' },
            { label: 'Vulnerability Assessment and Scanning' },
        ],
    },
    {
        icon: Server,
        title: 'Managed Services',
        page: 'managed-services',
        summary: 'Dedicated, certified resources for your security operations.',
        items: [
            { label: 'Staff Augmentation' },
            { label: 'vCISO' },
            { label: 'CAAS: Compliance as a Service' },
        ],
    },
];

export function CoreServices({ onNavigate, showAllLink = true }) {
    return (
        <section aria-labelledby="core-services-heading" className="bg-white py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 lg:items-end">
                    <div className="lg:col-span-7 space-y-5">
                        <p className="text-base font-semibold text-orange-600">Our core services</p>
                        <h2 id="core-services-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]" style={{ color: NAVY }}>
                            Connecting risk across operations, technology and compliance.
                        </h2>
                    </div>
                    <div className="lg:col-span-5 space-y-5">
                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                            Clients value our ideas and tailored methodologies grounded in leading best practices to help them address risks associated with their processes, technologies, and people.
                        </p>
                        {showAllLink && (
                            <RouteLink
                                page="solutions"
                                onNavigate={onNavigate}
                                className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 rounded"
                            >
                                View all services
                                <ArrowRight className="w-4 h-4" />
                            </RouteLink>
                        )}
                    </div>
                </div>

                {/* SERVICE LEDGER: one panel, four ruled columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-slate-200 overflow-hidden">
                    {CORE_SERVICES.map(({ icon: Icon, title, page, summary, items }, i) => (
                        <article
                            key={title}
                            className={[
                                'flex flex-col p-7 sm:p-8 bg-white hover:bg-[#F3F5F8] transition-colors border-slate-200',
                                i > 0 ? 'border-t sm:border-t-0' : '',
                                i % 2 === 1 ? 'sm:border-l' : '',
                                i >= 2 ? 'sm:border-t lg:border-t-0' : '',
                                i === 2 ? 'lg:border-l' : '',
                            ].join(' ')}
                        >
                            <Icon className="w-7 h-7 text-orange-500" strokeWidth={1.75} aria-hidden="true" />
                            <h3 className="mt-6 text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>{title}</h3>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{summary}</p>

                            <ul className="mt-6 pt-6 border-t border-slate-200 space-y-3 flex-1">
                                {items.map((item) => (
                                    <li key={item.label} className="flex items-start gap-3 text-[15px] leading-snug text-slate-700">
                                        <span className="mt-[7px] w-1.5 h-1.5 rounded-[2px] bg-orange-500 shrink-0" aria-hidden="true" />
                                        {item.page ? (
                                            <RouteLink
                                                page={item.page}
                                                onNavigate={onNavigate}
                                                className="hover:text-orange-600 underline decoration-slate-300 underline-offset-4 hover:decoration-orange-500 focus-visible:outline-2 focus-visible:outline-orange-600 rounded-sm"
                                            >
                                                {item.label}
                                            </RouteLink>
                                        ) : (
                                            <span>{item.label}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <RouteLink
                                page={page}
                                onNavigate={onNavigate}
                                className="group mt-8 inline-flex items-center gap-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 rounded"
                            >
                                <span className="text-[#0F1B2D] group-hover:text-orange-600 transition-colors">View {title}</span>
                                <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                            </RouteLink>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────── CLOSING BAND ───────────────────────────
   The original site's "Over 20 years of experience / Request A CallBack" block, shared by inner pages. */
export function ClosingBand({ onNavigate }) {
    return (
        <section className="bg-[#0F1B2D] text-white py-16 sm:py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                    <p className="text-base font-semibold text-orange-400">Over 20 years of experience</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">We will ensure you always get the best.</h2>
                    <p className="text-lg text-slate-300">Need to reach out to us or leave us a message?</p>
                </div>
                <RouteLink
                    page="contact-us"
                    onNavigate={onNavigate}
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                >
                    Request A Call Back
                    <ArrowRight className="w-4 h-4" />
                </RouteLink>
            </div>
        </section>
    );
}
