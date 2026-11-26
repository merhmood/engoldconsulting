// ─── SEO / SOCIAL METADATA: single source of truth ───
// Used in the browser (App.jsx updates <head> on navigation) and at build time
// (scripts/prerender-meta.mjs writes one HTML file per route, so link previews on
// LinkedIn, Facebook, WhatsApp etc., which do not run JavaScript, show the right page).
//
// Page names and the "Page – Engold Consulting LLC" title format follow the original
// engoldconsultingllc.com site. Descriptions are drawn from each page's own copy.
// Plain JS only (no JSX, no browser APIs) so Node can import it.

export const SITE_URL = 'https://engoldconsultingllc.com';
export const SITE_NAME = 'Engold Consulting LLC';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_ALT = 'Engold Consulting LLC: Delivering solutions that count';

const HOME_DESCRIPTION =
  'Engold Consulting helps businesses to improve and operate more efficiently while minimizing risks associated with Business and IT process changes.';

// name: shown as "<name> – Engold Consulting LLC" (title: overrides the whole title)
export const PAGE_META = {
  home: {
    title: `${SITE_NAME} – Delivering Solutions That Count`,
    description: HOME_DESCRIPTION,
  },
  about: {
    name: 'About Us',
    description: 'Over 20 years of experience delivering comprehensive IT risk intelligence and strategy, ERM solutions and mature IT risk management programs.',
  },
  solutions: {
    name: 'Services',
    description: 'Advisory, Risk Consulting, Cyber & Data, Managed Services and AI Consulting, backed by over 20 years of IT risk and compliance experience.',
  },
  advisory: {
    name: 'Advisory',
    description: 'Advisory services that integrate security and controls into your transformation: ERP transformation, application security, process controls and SOD.',
  },
  'risk-consulting': {
    name: 'Risk Consulting',
    description: 'Clients count on us to identify, prioritize, and mitigate risks: IT risk management, compliance management, vendor risk and data privacy.',
  },
  'it-risk': {
    name: 'IT Risk Management',
    description: 'Comprehensive IT risk intelligence and strategy: Enterprise GRC programs, GRC platform implementation and IT audit from certified professionals.',
  },
  compliance: {
    name: 'Compliance Management',
    description: 'Compliance assessments of your IT environment across SOX, GDPR, GLBA, PCI DSS, HIPAA, HITRUST, CCPA, NIST, FFIEC, FISMA, COBIT and ISO 27000.',
  },
  'vendor-risk': {
    name: '3rd Party and Vendor Risk Management',
    description: 'Assess the security capabilities of your vendors and third parties: TPRM program design, assessment, continuous monitoring and Vendor Risk as a Service.',
  },
  'data-privacy': {
    name: 'Data Privacy',
    description: 'Engold Consulting helps clients assess and reduce their privacy and security risks and comply with applicable laws, including CCPA and GDPR.',
  },
  'cyber-data': {
    name: 'Cybersecurity',
    description: 'External, internal, Wi-Fi and web application security assessments, penetration testing, vulnerability scanning and CISO as a Service.',
  },
  'managed-services': {
    name: 'Managed Services',
    description: 'Managed Security Operations that help organizations reduce compliance costs and stay ahead of threats: Staff Augmentation, vCISO and CAAS.',
  },
  'ai-consulting': {
    name: 'AI Consulting',
    description: 'AI consulting from Engold Consulting: AI governance and risk management, secure AI adoption, and AI data privacy and compliance.',
  },
  'it-recruitment': {
    name: 'IT Recruitment',
    description: 'IT recruitment from Engold Consulting: contract, contract-to-hire and permanent placement of IT risk, compliance and cybersecurity professionals.',
  },
  industries: {
    name: 'Industries',
    description: 'IT risk, compliance, cybersecurity and data privacy consulting for financial services, healthcare, energy, retail and manufacturing.',
  },
  'contact-us': {
    name: 'Contact Us',
    description: 'Need to reach out to us or leave a message? Contact Engold Consulting in Chicago or Dallas, call +888 252 7899 or email info@engoldconsultingllc.com.',
  },
  careers: {
    name: 'Careers',
    description: "Join Engold Consulting's team of IT risk, compliance and cybersecurity professionals. Our open positions are posted on LinkedIn.",
  },
};

export const ARTICLE_META = {
  'ai-enablement': {
    name: 'AI Enablement: From First Model Training to Autonomous Agentic Execution',
    description: 'How organizations move from basic conversational LLMs to agentic workflows with data governance, guardrails and workforce training.',
  },
  'risk-ai': {
    name: 'Engold Launches Advanced Risk AI to Elevate Client Research & Audit Delivery',
    description: 'Engold Consulting announces Risk AI, built to accelerate regulatory audit research and vulnerability mitigation.',
  },
};

// Old WordPress URLs that should get their own preview file at build time.
export const LEGACY_ROUTES = {
  '/about-us': 'about',
  '/it-risk-management': 'it-risk',
  '/compliance-management': 'compliance',
  '/3rd-party-and-vendor-risk-management': 'vendor-risk',
  '/cybersecurity': 'cyber-data',
  '/contact': 'contact-us',
};

export const pathForPage = (page, articleId) => {
  if (page === 'home') return '/';
  if (page === 'article') return `/article/${encodeURIComponent(articleId)}`;
  return `/${page}`;
};

// { title, description, url } for a page (and article id, for /article/<id>)
export const metaFor = (page, articleId) => {
  const meta = page === 'article' ? ARTICLE_META[articleId] : PAGE_META[page];
  const fallback = PAGE_META.home;
  const entry = meta || fallback;
  return {
    title: entry.title || `${entry.name} – ${SITE_NAME}`,
    description: entry.description || fallback.description,
    url: `${SITE_URL}${meta ? pathForPage(page, articleId) : '/'}`,
  };
};

// Every route that gets its own prerendered HTML file
export const ALL_ROUTES = [
  ...Object.keys(PAGE_META).map((page) => ({ page })),
  ...Object.keys(ARTICLE_META).map((articleId) => ({ page: 'article', articleId })),
];
