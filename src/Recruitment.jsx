import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight, ArrowUpRight, Briefcase, Clock, Repeat, Crown, ShieldCheck, ClipboardCheck,
    Users, Layers, TrendingUp, Landmark, HeartPulse, Zap, ShoppingBag, Factory,
    Building2, UserRound, FileText, MessagesSquare, Target, Mail, Copy, Check,
} from 'lucide-react';
import PageHero from './PageHero.jsx';
import { LINKEDIN_URL, CAREERS_URL, RECRUITMENT_EMAIL } from './siteInfo.js';

// IT Recruitment page. Section order follows a standard specialist-recruiter layout:
// services overview -> industry expertise -> figures -> process -> connect.
// An "I'm an Employer / I'm a Candidate" switch swaps the copy, services, process and calls to
// action for each audience (remembered in the URL as ?for=candidate so it can be linked to).
// Every call to action opens an email to the recruitment inbox.

const NAVY = '#0F1B2D';

const EMPLOYER_GROUPS = [
    {
        heading: 'Recruitment services',
        intro: 'Whether you need someone for the long term or for the next project, we find IT professionals who fit the role and your team.',
        cards: [
            { icon: Briefcase, title: 'Permanent recruitment', text: 'Full-time hires sourced and screened for technical depth, certifications and the way your organization works.' },
            { icon: Clock, title: 'Contract staffing', text: 'Skilled consultants for a project, an audit cycle or a peak in demand, available at short notice.' },
            { icon: Repeat, title: 'Contract-to-hire', text: 'Work with a professional on contract first, then bring them on permanently once you know they are the right fit.' },
        ],
    },
    {
        heading: 'Specialist and leadership search',
        intro: 'For senior and hard-to-fill roles, our practitioners run a focused search and assess every candidate on real ability.',
        cards: [
            { icon: Crown, title: 'Security leadership search', text: 'CISOs, heads of IT risk, IT audit directors and other leaders who shape your security and compliance programs.' },
            { icon: ShieldCheck, title: 'Interim leadership', text: 'Experienced interim and fractional leaders, including vCISO support, to cover a gap or lead a change program.' },
            { icon: ClipboardCheck, title: 'Technical assessment', text: 'Candidates evaluated by certified IT risk and security professionals before they reach your shortlist.' },
        ],
    },
    {
        heading: 'Workforce solutions',
        intro: 'When hiring needs go beyond a single role, we build and manage the team around your program.',
        cards: [
            { icon: Users, title: 'Staff augmentation', text: 'Certified resources who extend your team for security operations, audits and compliance work.' },
            { icon: Layers, title: 'Project teams', text: 'Ready-made teams for GRC platform rollouts, ERP security, IAM and other implementation projects.' },
            { icon: TrendingUp, title: 'Scaled hiring', text: 'Multiple hires across locations or functions, delivered through one point of contact.' },
        ],
    },
];

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

const EMPLOYER_STEPS = [
    { title: 'Understand your needs', text: 'We learn the skills, certifications and team context the role requires.' },
    { title: 'Source and screen', text: 'Our IT risk and security practitioners assess candidates on real technical ability.' },
    { title: 'Present a shortlist', text: 'You meet a small set of qualified candidates instead of a pile of resumes.' },
    { title: 'Place and follow up', text: 'We support onboarding and check in to make sure the placement works for both sides.' },
];

// Candidate view: what we offer job seekers.
const CANDIDATE_GROUPS = [
    {
        heading: 'Roles we recruit for',
        intro: 'Whatever stage of your career you are at, we match IT risk, compliance and security professionals with roles that suit their skills and goals.',
        cards: [
            { icon: Briefcase, title: 'Permanent roles', text: 'Full-time positions with organizations that value certified IT risk, compliance and security talent.' },
            { icon: Clock, title: 'Contract roles', text: 'Project, audit-cycle and interim assignments for professionals who like variety and flexibility.' },
            { icon: Crown, title: 'Leadership roles', text: 'Senior opportunities such as CISO, head of IT risk and IT audit director for experienced leaders.' },
        ],
    },
    {
        heading: 'How we support you',
        intro: 'Our recruiters are backed by practitioners who do the same work you do, so the advice you get is practical and specific.',
        cards: [
            { icon: Target, title: 'Career guidance', text: 'Honest advice on the next step for your career, the certifications that matter and where your skills are in demand.' },
            { icon: FileText, title: 'Resume feedback', text: 'Practical feedback so your resume shows your audit, risk and security experience clearly.' },
            { icon: MessagesSquare, title: 'Interview preparation', text: 'Insight into each client and the technical questions to expect, so you walk in prepared.' },
        ],
    },
];

const CANDIDATE_STEPS = [
    { title: 'Email us your resume', text: `Send your resume to ${RECRUITMENT_EMAIL} and tell us the kind of role and industry you are looking for.` },
    { title: 'Talk with a specialist', text: 'A recruiter with IT risk and security knowledge learns about your skills and goals.' },
    { title: 'Get matched to roles', text: 'We introduce you to roles that fit, and only with your agreement.' },
    { title: 'Start with support', text: 'We help with offers and onboarding, and stay in touch once you start.' },
];

const mailto = (subject, body) =>
    `mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
const EMPLOYER_MAILTO = mailto('IT Recruitment enquiry');
// Email links cannot attach files, so the pre-filled message reminds candidates to attach their resume.
const CANDIDATE_MAILTO = mailto(
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
        heroImage: '/images/web/hero4.jpg',
        heroTitle: 'Specialist IT recruitment for',
        heroHighlight: 'every hiring need',
        heroText: 'We help our clients find the right talent: IT risk, compliance and cybersecurity professionals for the industries we know best, screened by people who do the work every day.',
        heroCaption: { title: 'The right hire, first time', text: 'Candidates screened by IT risk and security practitioners' },
        primary: { label: 'Get in touch', href: EMPLOYER_MAILTO },
        servicesEyebrow: 'Our recruitment services',
        servicesTitle: 'Hiring support built around your needs',
        groups: EMPLOYER_GROUPS,
        expertiseTitle: 'IT talent for the industries we know',
        expertiseText: 'We consult in these industries every day, so we know the regulations, systems and skills each one demands.',
        rolesLabel: 'Roles we place',
        processTitle: 'Four steps from brief to placement',
        steps: EMPLOYER_STEPS,
        connectTitle: 'Looking to hire the right IT talent?',
        connectPrimary: { label: 'Looking to hire?', href: EMPLOYER_MAILTO },
        connectSecondary: { label: 'Follow us on LinkedIn', href: LINKEDIN_URL },
    },
    candidate: {
        label: "I'm a Candidate",
        icon: UserRound,
        heroEyebrow: 'IT Recruitment for candidates',
        heroImage: '/images/web/hero2.jpg',
        heroTitle: 'Find your next role in',
        heroHighlight: 'IT risk and security',
        heroText: `We connect IT risk, compliance and cybersecurity professionals with employers across financial services, healthcare, energy, retail and manufacturing. Email your resume to ${RECRUITMENT_EMAIL}.`,
        heroCaption: { title: 'Your next IT career move', text: 'Permanent, contract and leadership opportunities' },
        primary: { label: 'Email your resume', href: CANDIDATE_MAILTO },
        secondary: { label: 'View open roles', href: CAREERS_URL },
        servicesEyebrow: 'For candidates',
        servicesTitle: 'Your career, with specialists on your side',
        groups: CANDIDATE_GROUPS,
        expertiseTitle: 'Industries where we place IT professionals',
        expertiseText: 'Explore the industries we recruit for and the kinds of roles our clients hire for in each.',
        rolesLabel: 'Roles in demand',
        processTitle: 'Four steps to your next role',
        steps: CANDIDATE_STEPS,
        connectTitle: 'Ready for your next IT career move?',
        connectPrimary: { label: 'Email your resume', href: CANDIDATE_MAILTO },
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

const PrimaryButton = ({ href, label }) => (
    <a
        href={href}
        className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
    >
        {label}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
);

const OutlineButton = ({ href, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#0F1B2D] text-sm font-bold text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
    >
        {label}
        <ArrowUpRight className="w-4 h-4" />
    </a>
);

const SectionHeading = ({ id, eyebrow, title, children }) => (
    <div className="max-w-3xl space-y-4">
        {eyebrow && <p className="text-base font-semibold text-orange-600">{eyebrow}</p>}
        <h2 id={id} className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: NAVY }}>{title}</h2>
        {children && <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{children}</p>}
    </div>
);

// Candidate view: how to email a resume, with the address shown in full and a copy button
const ResumePanel = () => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(RECRUITMENT_EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked: the address is still visible to copy by hand
        }
    };
    return (
        <section aria-labelledby="resume-heading" className="px-4 sm:px-6 pt-12 sm:pt-16">
            <div className="max-w-7xl mx-auto rounded-2xl bg-[#0F1B2D] text-white p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 lg:items-center">
                <div className="lg:col-span-7 flex items-start gap-4">
                    <span className="shrink-0 w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-orange-400" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="space-y-2">
                        <h2 id="resume-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight">Email us your resume</h2>
                        <p className="text-[15px] sm:text-base text-slate-300 leading-relaxed">
                            Attach your resume and tell us the role and industry you are looking for. A specialist recruiter will be in touch.
                        </p>
                    </div>
                </div>
                <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 pl-4 pr-1.5 py-1.5">
                        <a href={CANDIDATE_MAILTO} className="flex-1 min-w-0 truncate text-base sm:text-lg font-bold hover:text-orange-300 transition-colors">
                            {RECRUITMENT_EMAIL}
                        </a>
                        <button
                            type="button"
                            onClick={copy}
                            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-orange-400"
                        >
                            {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <a
                        href={CANDIDATE_MAILTO}
                        className="group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                    >
                        Email your resume
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
                </div>
            </div>
        </section>
    );
};

// Segmented "I'm an Employer / I'm a Candidate" switch, pinned under the site header
const AudienceSwitch = ({ audience, onChange }) => (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm font-semibold text-slate-600">
                {audience === 'employer' ? 'Showing hiring services for employers' : 'Showing career support for candidates'}
            </p>
            <div role="tablist" aria-label="Choose who you are" className="grid grid-cols-2 p-1 rounded-full bg-[#F3F5F8] border border-slate-200 w-full sm:w-auto">
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
                            className="relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            {active && (
                                <motion.span
                                    layoutId="audience-pill"
                                    className="absolute inset-0 rounded-full bg-[#0F1B2D] shadow"
                                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                />
                            )}
                            <Icon className={`relative w-4 h-4 ${active ? 'text-orange-400' : 'text-slate-500'}`} strokeWidth={2} aria-hidden="true" />
                            <span className={`relative ${active ? 'text-white' : 'text-slate-700'}`}>{label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    </div>
);

export default function Recruitment({ onNavigate }) {
    const [audience, setAudience] = useState(readAudience);
    const a = AUDIENCES[audience];

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

    return (
        <main className="bg-white min-h-screen text-gray-900">
            {/* Audience switch sits above the hero (and stays pinned under the header while scrolling) */}
            <AudienceSwitch audience={audience} onChange={setAudience} />

            <PageHero
                key={audience}
                pageKey="it-recruitment"
                onNavigate={onNavigate}
                breadcrumb={[{ label: 'Home', page: 'home' }, { label: 'IT Recruitment' }]}
                eyebrow={a.heroEyebrow}
                title={a.heroTitle}
                highlight={a.heroHighlight}
                description={a.heroText}
                primaryCta={a.primary}
                secondaryCta={a.secondary}
                image={a.heroImage}
                imageCaption={a.heroCaption}
            />

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

                    {/* SERVICES OVERVIEW: groups of cards, each with its own call to action */}
                    <section aria-labelledby="recruitment-services-heading" className="py-16 sm:py-24 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
                            <SectionHeading id="recruitment-services-heading" eyebrow={a.servicesEyebrow} title={a.servicesTitle} />
                            {a.groups.map((group) => (
                                <div key={group.heading} className="space-y-8">
                                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
                                        <div className="max-w-2xl space-y-2">
                                            <h3 className="text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>{group.heading}</h3>
                                            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">{group.intro}</p>
                                        </div>
                                        <div className="shrink-0"><PrimaryButton {...a.connectPrimary} label={a.primary.label} /></div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
                                        {group.cards.map(({ icon: Icon, title, text }) => (
                                            <article key={title} className="bg-white hover:bg-[#F3F5F8] transition-colors p-7 sm:p-8">
                                                <Icon className="w-7 h-7 text-orange-500" strokeWidth={1.75} aria-hidden="true" />
                                                <h4 className="mt-6 text-xl font-extrabold tracking-tight" style={{ color: NAVY }}>{title}</h4>
                                                <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{text}</p>
                                            </article>
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
                                <PrimaryButton {...a.connectPrimary} label={a.primary.label} />
                            </div>
                            <ul className="lg:col-span-8 divide-y divide-slate-300 border-y border-slate-300">
                                {INDUSTRIES.map(({ icon: Icon, title, text, roles }) => (
                                    <li key={title} className="py-7 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
                                        <div className="sm:col-span-4 flex items-start gap-3">
                                            <Icon className="w-6 h-6 mt-0.5 text-orange-500 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                                            <h3 className="text-lg font-extrabold tracking-tight leading-snug" style={{ color: NAVY }}>{title}</h3>
                                        </div>
                                        <div className="sm:col-span-8 space-y-4">
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
                                                className="group inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 rounded"
                                            >
                                                Discover more
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* FIGURES BAND */}
                    <section aria-labelledby="figures-heading" className="bg-[#0F1B2D] text-white py-16 sm:py-20 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:items-end">
                            <div className="lg:col-span-5 space-y-4">
                                <p className="text-base font-semibold text-orange-400">Why Engold</p>
                                <h2 id="figures-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                                    Recruiters who know the work
                                </h2>
                                <p className="text-base text-slate-300 leading-relaxed">
                                    Our recruitment is backed by a consulting team of certified IT risk and security practitioners.
                                </p>
                            </div>
                            <dl className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
                                {FIGURES.map(({ value, label }) => (
                                    <div key={label} className="border-t border-white/20 pt-5">
                                        <dt className="sr-only">{label}</dt>
                                        <dd className="text-4xl sm:text-5xl font-extrabold tracking-tight text-orange-400">{value}</dd>
                                        <dd className="mt-2 text-sm text-slate-300 leading-snug">{label}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </section>

                    {/* FOUR-STEP PROCESS */}
                    <section aria-labelledby="process-heading" className="py-16 sm:py-24 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
                            <SectionHeading id="process-heading" eyebrow="How it works" title={a.processTitle} />
                            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {a.steps.map(({ title, text }, i) => (
                                    <li key={title} className="border-t-2 border-orange-500 pt-5">
                                        <span className="text-sm font-bold text-orange-600">Step {i + 1}</span>
                                        <h3 className="mt-2 text-lg font-extrabold tracking-tight" style={{ color: NAVY }}>{title}</h3>
                                        <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{text}</p>
                                    </li>
                                ))}
                            </ol>
                            <PrimaryButton {...a.connectPrimary} label={a.primary.label} />
                        </div>
                    </section>

                    {/* LET'S CONNECT: also offers the other audience a way in */}
                    <section aria-labelledby="connect-heading" className="bg-[#F3F5F8] py-16 sm:py-20 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-3 max-w-2xl">
                                <p className="text-base font-semibold text-orange-600">Let's connect</p>
                                <h2 id="connect-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: NAVY }}>
                                    {a.connectTitle}
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => { setAudience(audience === 'employer' ? 'candidate' : 'employer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 rounded"
                                >
                                    {audience === 'employer' ? 'Looking for a job instead? See candidate support' : 'Hiring instead? See our services for employers'}
                                </button>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                <PrimaryButton {...a.connectPrimary} />
                                <OutlineButton {...a.connectSecondary} />
                            </div>
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>
        </main>
    );
}
