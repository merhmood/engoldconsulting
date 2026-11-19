import PageHero from './PageHero.jsx';
import { ArrowRight } from 'lucide-react';
import { CoreServices, ClosingBand } from './HomeSections.jsx';

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`;
const CALL_BACK = { label: 'Request A Call Back', page: 'contact-us' };
const YEARS = { value: '20+', label: 'Years of experience' };

const SERVICE_SIBLINGS = [
    { key: 'solutions', label: 'All Services' },
    { key: 'advisory', label: 'Advisory' },
    { key: 'risk-consulting', label: 'Risk Consulting' },
    { key: 'it-risk', label: 'IT Risk Management' },
    { key: 'compliance', label: 'Compliance Management' },
    { key: 'vendor-risk', label: '3rd Party & Vendor Risk' },
    { key: 'data-privacy', label: 'Data Privacy' },
    { key: 'cyber-data', label: 'Cyber & Data' },
    { key: 'managed-services', label: 'Managed Services' },
    { key: 'ai-consulting', label: 'AI Consulting' },
];

// Content for every Services route. All copy, service lists and figures come from
// the original engoldconsultingllc.com pages so the new site stays aligned with them.
// `groups` are the lists shown on the page; an item is a string, or { label, sub } / { label, page }.
const SERVICE_PAGES = {
    solutions: {
        eyebrow: 'Our Core Services',
        title: 'Delivering solutions',
        highlight: 'that count.',
        description:
            'Engold Consulting helps businesses to improve and operate more efficiently while minimizing risks associated with Business and IT process changes.',
        image: '/images/web/global-transformation.jpg',
        stats: [
            YEARS,
            { value: '5', label: 'Core service areas' },
            { value: '14', label: 'Compliance frameworks & regulations' },
            { value: '6', label: 'ERP platforms' },
        ],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'About Us', page: 'about' },
        sections: ['cyber', 'compliance', 'erp'],
    },
    advisory: {
        eyebrow: 'Advisory',
        title: 'Advisory',
        highlight: '',
        description:
            'At Engold Consulting, we understand that technology solutions are not the same when implemented across different businesses.',
        image: '/images/web/hero6.jpg',
        stats: [YEARS, { value: '6', label: 'ERP platforms' }],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'Risk Consulting', page: 'risk-consulting' },
        intro: [
            'The good news is that our advisory services understand both. We believe that solutions and implementation should not interfere with the business but should enhance your business as well as your results.',
            'Our consultants have a reputation for digging into complex problems and data to uncover core issues.',
            'We offer process analysis and design, agile and lean implementation, requirements management, and advisory services to help deliver solutions that work for your business by leveraging and integrating the foundation pillars of the people, process, and technology.',
        ],
        groups: [
            {
                heading: 'Our advisory offerings',
                text: 'Our advisory practice niche ensures a fully blended integration of security and controls integrated into your transformation journey and our offerings include but are not limited to the following areas:',
                items: [
                    { label: 'ERP Transformation Services', sub: ['Oracle', 'SAP', 'NetSuite', 'Workday', 'Salesforce', 'SuccessFactors'] },
                    { label: 'Cyber Security', sub: ['PAM implementation', 'Identity and Access Management Implementation', 'SIEM Solutions'] },
                    'Application Security',
                    'Process Controls Integration',
                    'Segregation of Duties/Sensitive Access and Cross-Platform SOD',
                    'Change Management',
                    'Infrastructure Service',
                    'Project and Program Management',
                ],
            },
        ],
        sections: [],
    },
    'risk-consulting': {
        eyebrow: 'Risk Consulting',
        title: 'Risk',
        highlight: 'Consulting',
        description: 'Clients count on us to identify, prioritize, and mitigate risks and seize opportunities.',
        image: unsplash('1460925895917-afdab827c52f'),
        stats: [YEARS, { value: '4', label: 'Risk consulting practices' }],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'IT Risk Management', page: 'it-risk' },
        intro: [
            'Clients value our ideas and tailored methodologies grounded in leading best practices to help them address risks associated with their processes, technologies, and people within their IT organization by connecting seemingly disparate risks and opportunities in operations, technology, and compliance.',
            'Our approach is to help our clients prioritize their risk mitigation steps, based on the needs of their business, regulatory requirements, compliance requirements, and industry-specific requirements.',
        ],
        groups: [
            {
                heading: 'Risk consulting services',
                items: [
                    { label: 'IT Risk Management', page: 'it-risk' },
                    { label: 'Compliance Management', page: 'compliance' },
                    { label: '3rd Party & Vendor Risk Management', page: 'vendor-risk' },
                    { label: 'Data Privacy', page: 'data-privacy' },
                ],
            },
        ],
        sections: [],
    },
    'it-risk': {
        eyebrow: 'IT Risk Management',
        title: 'IT Risk',
        highlight: 'Management',
        description:
            'At Engold Consulting, our experts have deep knowledge, experience, and expertise to deliver a comprehensive IT risk intelligence and strategy to your organization, including implementing ERM solutions across multiple industries and developing matured IT risk management programs.',
        image: unsplash('1558494949-ef010cbdcc31'),
        stats: [YEARS, { value: '6', label: 'Enterprise GRC platforms' }],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'Compliance Management', page: 'compliance' },
        intro: [
            'Clients count on us to identify, prioritize, and mitigate risks and seize opportunities.',
            'Clients value our ideas and tailored methodologies grounded in leading best practices to help them address risks associated with their processes, technologies, and people within their IT organization by connecting seemingly disparate risks and opportunities in operations, technology, and compliance.',
            'Our approach is to help our clients prioritize their risk mitigation steps, based on the needs of their business, regulatory requirements, compliance requirements, and industry-specific requirements.',
        ],
        groups: [
            {
                heading: 'Enterprise GRC',
                text: 'Based on our years of experience in IT risk management support, we have seen that organizations that employ an enterprise GRC solution to manage risks generated from their various risk identification methods do tend to make better-informed decisions in managing their risks and aligning such risks to their risk tolerance and appetite. Engold Consulting services offering in managing your risk program will include:',
                items: [
                    'Identification and management of enterprise risk',
                    'Internal control design and testing',
                    'Alignment of risk appetite, risk tolerance, and strategy',
                    'Risk readiness assessment',
                    'Enterprise GRC programs design, development, and implementation',
                    'Continuous monitoring program',
                    'Compliance program assessment and development',
                ],
            },
            {
                heading: 'Enterprise GRC solutions we implement',
                text: 'Engold Consulting can assist your organization in the implementation of the following Enterprise GRC solutions:',
                items: ['ServiceNow GRC', 'Archer GRC', 'Paisley', 'Oracle GRC', 'Lockpath Keylight GRC', 'BWise'],
            },
            {
                heading: 'IT Audit',
                text: 'An IT audit requires a deep understanding of your Business, Technology, and Industry best practices, by assessing key areas such as organizational IT governance, risk, control, efficiency, and effectiveness. The audit process can lead to new business systems, improved performance, and corrective actions to address issues and risks. Engold Consulting IT audit consultants work with clients to identify technology that meets their business needs. We perform a wide range of IT services, including:',
                items: [
                    'Internal Audit',
                    'IT controls assessment',
                    'Business process controls assessment',
                    'Sarbanes-Oxley guidance',
                    'SOC 1, 2, reading assessment',
                    'Regulatory compliance',
                    'Security and vulnerability assessments',
                    'Controls optimization',
                ],
            },
            {
                heading: 'Our IT audit support methodology',
                items: ['Real-Time Assessments', 'Pre and Post Implementation Reviews'],
            },
            {
                heading: 'Our professionals include',
                text: 'Our multidisciplinary teams draw on experience across a wide variety of backgrounds and are certified by leading internationally recognized organizations.',
                items: [
                    'Certified Information Systems Auditors (CISA)',
                    'Certified Information Systems Security Professionals (CISSP)',
                    'Certified Data Privacy Solutions Engineers (CDPSE), and others',
                ],
            },
        ],
        sections: [],
    },
    compliance: {
        eyebrow: 'Compliance Management',
        title: 'Compliance',
        highlight: 'Management',
        description:
            'Due to the rapid changes in technology and how organizations perform their businesses, the cost of compliance requirements and expectations have become more and more difficult and complicated.',
        image: unsplash('1504384308090-c894fdcc538d'),
        stats: [YEARS, { value: '14', label: 'Frameworks & regulations' }],
        primaryCta: CALL_BACK,
        secondaryCta: { label: '3rd Party & Vendor Risk', page: 'vendor-risk' },
        intro: [
            'The consequences for non-compliance have become more enormous for organizations which include hefty fines, levies, loss of revenue, and most importantly loss of brand reputation.',
            'Engold Consulting can assist to perform compliance assessments of your IT environment to support your other governance, and risk management activities that would provide more clarity to your senior management, regarding how to meet compliance requirements.',
        ],
        groups: [
            {
                heading: 'Frameworks & regulations',
                text: 'At Engold Consulting, we have in-depth experience across various security frameworks, Government, and Industry compliance regulations. These include the following:',
                items: [
                    'Sarbanes-Oxley Act (SOX)',
                    'General Data Protection Regulation (GDPR)',
                    'Gramm-Leach-Bliley Act (GLBA)',
                    'Payment Card Industry Data Security Standards (PCI DSS)',
                    'Health Insurance Portability and Accountability Act (HIPAA)',
                    'HITRUST Common Security Framework (HITRUST CSF)',
                    'California Consumer Privacy Act (CCPA)',
                    'NIST Cybersecurity Framework',
                    'Federal Financial Institutions Examination Council (FFIEC) IT Security Handbook',
                    'Red Flags Rule',
                    'Federal Information Security Management Act (FISMA)',
                    'National Institute of Standards and Technology (NIST) Special Publications 800 Series',
                    'Control Objectives for Information Technology (COBIT)',
                    'International Standards Organization (ISO) 27000 Series',
                ],
            },
        ],
        outro: [
            'Engold Consulting is continuously researching and identifying global compliance requirements and integrating those newly identified compliance requirements into our business frameworks.',
        ],
        sections: [],
    },
    'vendor-risk': {
        eyebrow: '3rd Party & Vendor Risk',
        title: '3rd Party and Vendor',
        highlight: 'Risk Management',
        description:
            'At Engold Consulting, we understand that most modern organizations increasingly rely on third parties or vendors to provide key services as part of their business process traditionally managed internally.',
        image: unsplash('1511512578047-dfb367046420'),
        stats: [YEARS],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'Data Privacy', page: 'data-privacy' },
        intro: [
            'The advantage of this approach is to help them focus on their key capabilities and strengths and to reduce the operational costs and increase revenue.',
            'However, third parties often do not have the right security maturity and competence to adequately secure the organization’s data and assets, which could result in data security risks and compliance risks depending on the data in scope.',
            'As recent studies have shown, the lack of security results in significant risk exposure for third parties as well as the companies they do business with. Malicious hackers have developed a common strategy of compromising “soft” targets, such as small or unsophisticated third parties, and then use the third party’s access to other systems or data as a steppingstone to attack the vendor’s large clients.',
            'Engold Consulting works with various clients to assess the security capabilities of their vendors/third parties to provide them a deeper insight into the level of additional risk they pose to their organization.',
            'Our conclusions allow our clients to make informed decisions regarding their use of third-party products and services, including the mitigating controls that would need to be put in place prior to initiating the business engagement and the information they require to manage the vendor relationship.',
        ],
        groups: [
            {
                heading: 'Our TPRM service offering',
                items: [
                    'Third-Party Risk Management: Design Overview',
                    'Third-Party Risk Management: Program review and assessment',
                    {
                        label: 'Third-Party Risk Management: Assessment and Support',
                        sub: [
                            'Process management',
                            'Third-Party Engagement Profile Development and Maturity',
                            'Scope Design and Development',
                            'Third-Party Initial Risk Survey Development',
                            'Third-Party Customized and Tailored Questionnaire development',
                            'Onsite and Remote assessment coordination',
                            'Standardized Risk Assessment Report development',
                            'Corrective Action Plan Monitoring and Tracking',
                        ],
                    },
                    'Third-Party Risk Management: Continuous Monitoring',
                ],
            },
        ],
        outro: [
            'Engold Consulting has the ability to manage your TPRM program as a managed service (Vendor Risk as a Service, VRaaS), and we also handle your responses to your client’s questionnaires on your behalf.',
        ],
        sections: [],
    },
    'data-privacy': {
        eyebrow: 'Data Privacy',
        title: 'Data',
        highlight: 'Privacy',
        description:
            'Engold Consulting helps our clients assess and reduce their privacy and security risks and comply with applicable laws.',
        image: unsplash('1618005182384-a83a8bd57fbe'),
        stats: [YEARS],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'Cyber & Data', page: 'cyber-data' },
        intro: [
            'We assist several clients by advising on privacy and security issues to maximize the effectiveness of their offerings and avoid legal and regulatory pitfalls.',
            'We advise our clients on various complex issues associated with both personal and sensitive business data, including its collection, use, storage, disclosure, transfer, and destruction.',
        ],
        groups: [
            {
                heading: 'Our services include',
                text: 'Engold Consulting’s data privacy team has expertise with privacy, policy, processes, and technology and can help to design, develop, monitor, and enhance clients’ data privacy programs.',
                items: [
                    'Data Privacy program development',
                    'Data Privacy Compliance assessment',
                    'Privacy Risk assessment',
                    'Data Privacy Impact assessment',
                    'CCPA compliance readiness assessment',
                    'GDPR compliance readiness assessment',
                ],
            },
        ],
        sections: [],
    },
    'cyber-data': {
        eyebrow: 'Cyber & Data',
        title: 'Cyber',
        highlight: 'Security',
        description:
            'At Engold Consulting, our Cybersecurity Team delivers External & Internal, Wi-Fi, & Web Application IT security assessments, penetration testing, vulnerability scanning, and Firewall & Router rule base/configuration and/or architecture assessments.',
        image: unsplash('1550751827-4bd374c3f58b'),
        stats: [YEARS, { value: '100+', label: 'Years of collective penetration testing experience' }],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'Managed Services', page: 'managed-services' },
        intro: [
            'These services enable us to assess the baseline security comportment of your organization.',
            'As a leading cybersecurity service provider, our consultants can assist your organization to build a security road map that will allow for an increase in your overall security readiness and reduce overall security risk.',
        ],
        groups: [
            {
                heading: 'Benefits',
                items: [
                    'Network security assessments enable optimization of your critical security infrastructure',
                    'Penetration testing security road map enables you to plan your security spend more effectively & efficiently by integrating and optimizing your controls',
                    'Our IT security assessment solutions give your organization a clear view of your risk exposure and visibility of your current cybersecurity status',
                    'Our analysis of the penetration testing and security assessment results will highlight security risks that may require urgent action to remediate and best practice mitigating controls',
                ],
            },
            {
                heading: 'Penetration Testing Services',
                text: 'Our Web Application Security and Penetration Testing Services provide high-quality security testing by certified ethical hacking professionals with over 100 years of collective experience. Their testing methods are the same methods hackers use to attempt to compromise the integrity of your systems, and our detailed reports and remediation recommendations give you advanced warning of your current vulnerabilities and how they could be exploited.',
                items: [
                    { label: 'Penetration Testing', sub: ['Assessment and discovery of critical vulnerabilities in your network and how they may be exploited by hackers'] },
                    { label: 'Identify', sub: ['Prioritize actions to undertake based on assessment results'] },
                    { label: 'Execute', sub: ['Remediation and mitigation of security vulnerabilities to improve your organization’s security posture'] },
                ],
            },
            {
                heading: 'Key benefits',
                items: [
                    { label: 'Improved compliance', sub: ['Reduce the burden of compliance violations and the risk of failing an audit'] },
                    { label: 'Competitive advantage', sub: ['Superior cybersecurity practice can assist companies to acquire key clients'] },
                    { label: 'Reduced losses', sub: ['Reduce the risk of financial misstatement and the reputational impact that a security breach generates'] },
                    { label: 'Improved operations', sub: ['Improve your security service to help mature and strengthen your business'] },
                ],
            },
            {
                heading: 'Infrastructure Security',
                text: 'Our Infrastructure Security professionals also provide a range of other services, including but not limited to security assessments against external and internal networks, and often discover critical vulnerabilities in key IT systems. Our infrastructure security services include:',
                items: [
                    'Cyber Security Review',
                    'External and internal penetration testing',
                    'Wireless penetration testing',
                    'Vulnerability assessments',
                    'Password auditing',
                    'Secure Wi-Fi installation and configuration using Meraki Cloud Managed Network solutions',
                ],
            },
            {
                heading: 'Application Security',
                items: ['Web application penetration testing', 'Thick application penetration testing', 'Application architecture security review'],
            },
            {
                heading: 'Additional services',
                items: ['Trusted Security Advisor', 'CISO as a Service'],
            },
        ],
        sections: [],
    },
    'managed-services': {
        eyebrow: 'Managed Services',
        title: 'Managed',
        highlight: 'Services',
        description:
            'Engold Consulting’s Managed Security Operations goal is for organizations to reduce compliance costs and stay ahead of threats while improving productivity.',
        image: '/images/web/global-finance.jpg',
        stats: [YEARS, { value: '3', label: 'Managed service tiers' }],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'Advisory', page: 'advisory' },
        intro: [
            'Organizations’ expensive information security products and the myriad of logs they generate are not enough to protect them from compromise unless complemented by expert management from dedicated and certified resources.',
            'Engold Consulting’s Managed Security Operations offer a comprehensive vision coupled with the availability of highly dedicated, certified, and experienced resources. This enables you to execute against your security strategy or offload the burden of managing complex security tools and services.',
            'We can provide tactical support that allows you to outsource certain areas of your security operations and other services in a cost-effective manner.',
            'Engold Consulting brings to the table years of experience across high-profile accounts and the means to integrate these capabilities into different environments. We can ensure a smooth and well-documented management changeover that safeguards the continuity of your security operations.',
        ],
        groups: [
            {
                heading: 'Managed service tiers',
                text: 'Engold Consulting’s Managed Security Services are geared toward key business challenges. We offer the following tiered approach to our managed service operations:',
                items: ['Staff Augmentation', 'vCISO', 'CAAS – Compliance as a Service'],
            },
        ],
        sections: [],
    },
    // AI Consulting is a new service line (not on the original site), added at the client's request.
    'ai-consulting': {
        eyebrow: 'AI Consulting',
        title: 'AI',
        highlight: 'Consulting',
        description:
            'Engold Consulting helps organizations adopt artificial intelligence securely and responsibly, applying the same risk, controls and compliance discipline we bring to every technology transformation.',
        image: '/images/web/artificial-intelligence-hub.jpg',
        imageCaption: { title: 'Secure, compliant AI adoption', text: 'Governance, security and privacy controls' },
        stats: [YEARS],
        primaryCta: CALL_BACK,
        secondaryCta: { label: 'Data Privacy', page: 'data-privacy' },
        intro: [
            'AI brings new opportunities and new risks: sensitive data flowing into models, decisions that need to be explained to auditors and regulators, and AI tools connected to core business systems.',
            'Our consultants combine IT risk, cybersecurity, data privacy and ERP controls experience to help you put AI to work with the right governance, security and controls in place from the start.',
        ],
        groups: [
            {
                heading: 'AI governance & risk management',
                items: [
                    'AI governance framework design',
                    'AI risk assessment',
                    'AI policies and acceptable-use standards',
                    'Alignment with the NIST AI Risk Management Framework and ISO/IEC 42001',
                ],
            },
            {
                heading: 'Secure AI adoption',
                items: [
                    'AI readiness assessment',
                    'AI use-case prioritization and roadmap',
                    'Security review of AI applications and integrations',
                    'Identity and access controls for AI tools and data',
                ],
            },
            {
                heading: 'AI, data privacy & compliance',
                items: [
                    'Privacy impact assessments for AI use cases',
                    'Data governance for AI inputs and training data',
                    'Integration of AI controls into SOX and IT audit programs',
                    'Third-party AI vendor risk assessment',
                ],
            },
            {
                heading: 'AI insights',
                items: [
                    { label: 'AI Enablement: From First Model Training to Autonomous Agentic Execution', article: 'ai-enablement' },
                    { label: 'Engold Launches Advanced Risk AI to Elevate Client Research & Audit Delivery', article: 'risk-ai' },
                ],
            },
        ],
        sections: [],
    },
};

// One row of a service ledger: orange square marker, label (or link), optional sub-items
const LedgerRow = ({ item, onNavigate, onOpenArticle }) => {
    // Strings have a built-in .sub() method, so only read fields from object items
    const isObject = typeof item === 'object';
    const label = isObject ? item.label : item;
    const sub = isObject ? item.sub : null;
    const target = isObject && (item.page || item.article);

    return (
        <li className="flex items-start gap-3.5 px-6 sm:px-7 py-5">
            <span className="mt-[9px] w-2 h-2 rounded-[2px] bg-orange-500 shrink-0" aria-hidden="true" />
            <div className="min-w-0 space-y-2">
                {target ? (
                    <button
                        onClick={() => (item.article ? onOpenArticle(item.article) : onNavigate(item.page))}
                        className="group text-left text-base font-bold text-[#0F1B2D] hover:text-orange-600 underline decoration-slate-300 underline-offset-4 hover:decoration-orange-500 transition-colors"
                    >
                        {label}
                        <ArrowRight className="inline w-4 h-4 ml-1.5 -mt-0.5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <span className="block text-base font-bold text-[#0F1B2D] leading-snug">{label}</span>
                )}
                {sub && (
                    <ul className="space-y-1.5">
                        {sub.map((s) => (
                            <li key={s} className="text-[15px] text-slate-600 leading-relaxed">{s}</li>
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );
};

const SectionHeading = ({ label, title, text }) => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 lg:items-end">
        <div className="lg:col-span-6 space-y-3">
            {label && <p className="text-base font-semibold text-orange-600">{label}</p>}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-[#0F1B2D]">{title}</h2>
        </div>
        {text && <p className="lg:col-span-6 text-base sm:text-lg text-slate-600 leading-relaxed">{text}</p>}
    </div>
);

export default function Solutions({ pageKey = 'solutions', onNavigate, onOpenArticle }) {
    const page = SERVICE_PAGES[pageKey] || SERVICE_PAGES.solutions;
    const isOverview = !SERVICE_PAGES[pageKey] || pageKey === 'solutions';

    const erpPlatforms = ['Oracle', 'SAP', 'NetSuite', 'Workday', 'Salesforce', 'SuccessFactors'];

    const frameworks = [
        ['Sarbanes-Oxley Act (SOX)', 'Regulation'],
        ['General Data Protection Regulation (GDPR)', 'Regulation'],
        ['Gramm-Leach-Bliley Act (GLBA)', 'Regulation'],
        ['PCI DSS', 'Standard'],
        ['HIPAA', 'Regulation'],
        ['HITRUST CSF', 'Framework'],
        ['California Consumer Privacy Act (CCPA)', 'Regulation'],
        ['NIST Cybersecurity Framework', 'Framework'],
        ['FFIEC IT Security Handbook', 'Guidance'],
        ['Red Flags Rule', 'Regulation'],
        ['FISMA', 'Regulation'],
        ['NIST SP 800 Series', 'Standard'],
        ['COBIT', 'Framework'],
        ['ISO 27000 Series', 'Standard'],
    ];

    return (
        <main className="bg-white min-h-screen text-gray-900">

            <PageHero
                pageKey={isOverview ? 'solutions' : pageKey}
                onNavigate={onNavigate}
                breadcrumb={[
                    { label: 'Home', page: 'home' },
                    ...(isOverview ? [] : [{ label: 'Services', page: 'solutions' }]),
                    { label: SERVICE_SIBLINGS.find((s) => s.key === pageKey)?.label || 'Services' },
                ]}
                siblings={SERVICE_SIBLINGS}
                siblingsLabel="Services"
                {...page}
            />

            {isOverview ? (
                <>
                    {/* OVERVIEW: the same core services ledger as the Home page */}
                    <CoreServices onNavigate={onNavigate} showAllLink={false} />

                    {/* AI CONSULTING (new service line) */}
                    <section className="px-4 sm:px-6 pb-16 sm:pb-20">
                        <div className="max-w-7xl mx-auto rounded-2xl border border-slate-200 bg-[#F3F5F8] p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2 max-w-2xl">
                                <p className="text-base font-semibold text-orange-600">Also available</p>
                                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1B2D]">AI Consulting</h2>
                                <p className="text-base text-slate-600 leading-relaxed">AI governance and risk, secure AI adoption, and AI privacy and compliance.</p>
                            </div>
                            <button
                                onClick={() => onNavigate('ai-consulting')}
                                className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#0F1B2D] text-[#0F1B2D] text-sm font-bold hover:bg-[#0F1B2D] hover:text-white transition-colors"
                            >
                                View AI Consulting
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </section>

                    {/* FRAMEWORKS */}
                    <section className="bg-[#F3F5F8] border-y border-slate-200 py-16 sm:py-20 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto space-y-10">
                            <SectionHeading
                                label="Compliance Management"
                                title="Security frameworks and compliance regulations"
                                text="In-depth experience across security frameworks, government and industry compliance regulations."
                            />
                            <ul className="flex flex-wrap gap-2.5">
                                {frameworks.map(([name, kind]) => (
                                    <li key={name} className="inline-flex items-baseline gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white">
                                        <span className="text-sm font-bold text-[#0F1B2D]">{name}</span>
                                        <span className="text-xs text-slate-500">{kind}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* ERP */}
                    <section className="py-16 sm:py-20 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto space-y-10">
                            <SectionHeading
                                label="Advisory"
                                title="ERP transformation services"
                                text="Security and controls integrated into your transformation journey."
                            />
                            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
                                {erpPlatforms.map((name) => (
                                    <li key={name} className="bg-white px-6 py-8 text-xl font-extrabold tracking-tight text-[#0F1B2D]">
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </>
            ) : (
                /* DETAIL PAGE: overview copy + service ledgers */
                <div className="py-16 sm:py-20 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
                        {page.intro?.length > 0 && (
                            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16">
                                <div className="lg:col-span-4 space-y-3">
                                    <p className="text-base font-semibold text-orange-600">Overview</p>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-[#0F1B2D]">How we help</h2>
                                </div>
                                <div className="lg:col-span-8 space-y-5">
                                    {page.intro.map((p) => (
                                        <p key={p} className="text-base sm:text-lg text-slate-600 leading-relaxed">{p}</p>
                                    ))}
                                </div>
                            </section>
                        )}

                        {page.groups.map((group) => {
                            const twoCol = group.items.length > 4;
                            return (
                                <section key={`${pageKey}-${group.heading}`} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16">
                                    <div className="lg:col-span-4 space-y-3">
                                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-[#0F1B2D]">{group.heading}</h2>
                                        {group.text && <p className="text-[15px] text-slate-600 leading-relaxed">{group.text}</p>}
                                    </div>
                                    <ul
                                        className={`lg:col-span-8 rounded-2xl border border-slate-200 bg-white divide-y divide-slate-200 self-start ${
                                            twoCol ? 'md:grid md:grid-cols-2 md:divide-y-0 md:[&>li]:border-b md:[&>li]:border-slate-200 md:[&>li:nth-child(odd)]:border-r' : ''
                                        }`}
                                    >
                                        {group.items.map((item) => (
                                            <LedgerRow key={typeof item === 'string' ? item : item.label} item={item} onNavigate={onNavigate} onOpenArticle={onOpenArticle} />
                                        ))}
                                    </ul>
                                </section>
                            );
                        })}

                        {page.outro?.map((p) => (
                            <p key={p} className="lg:ml-[33.333%] lg:pl-16 text-base sm:text-lg text-[#0F1B2D] leading-relaxed border-l-4 border-orange-500 pl-5 max-w-4xl">{p}</p>
                        ))}
                    </div>
                </div>
            )}

            <ClosingBand onNavigate={onNavigate} />
        </main>
    );
}
