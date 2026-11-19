import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORT PAGE COMPONENTS
import Home from './Home.jsx';
import About from './About.jsx';
import ArticlePage from './ArticlePage.jsx';
import Solutions from './Solutions.jsx';
import Careers from './Careers.jsx';
import Contact from './Contact.jsx';
import Industries from './Industries.jsx';
import { EMAIL, PHONE, PHONE_HREF, HOURS, OFFICES, LINKEDIN_URL } from './siteInfo.js';

// ENGOLD BRAND LOGO (official lockup: dark text for light backgrounds, white text for dark backgrounds)
const EngoldLogo = ({ onClick, className = '', size = 'default', inverted = false }) => {
  const heights = {
    compact: 'h-9',
    default: 'h-10 sm:h-12',
    large: 'h-12 sm:h-14',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="ENGOLD Consulting, go to homepage"
      className={`inline-flex items-center shrink-0 select-none group ${className}`}
    >
      <img
        src={inverted ? '/images/engold-logo-light.png' : '/images/engold-logo-dark.png'}
        alt="ENGOLD Consulting"
        width="3987"
        height="1349"
        className={`${heights[size] || heights.default} w-auto object-contain transition-opacity duration-300 group-hover:opacity-85`}
      />
    </button>
  );
};

// Main office shown in the top bar (all offices are listed in the footer and on the Contact page)
const MAIN_OFFICE = OFFICES[0];

// SVG ICON HELPERS FOR TOP INFO BAR
const MapPinIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MailIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// SVG ICONS
const ChevronDown = ({ className = "w-4 h-4 opacity-80" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// Maps any page to exactly one top-level nav item, so only one link is ever highlighted
const getActiveNav = (page) => {
  if (page === 'home') return 'home';
  if (page === 'about') return 'about';
  if (page === 'careers') return 'careers';
  if (page === 'contact-us') return 'contact';
  if (page === 'industries') return 'industries';
  if (SERVICE_PAGES.includes(page) || page === 'article') return 'services';
  return null;
};

// Animated underline: slides between nav items on the active one, grows in on hover otherwise
const NavIndicator = ({ active }) =>
  active ? (
    <motion.span
      layoutId="nav-underline"
      className="absolute left-3 right-3 -bottom-[3px] h-[3px] rounded-full bg-orange-500"
      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
    />
  ) : (
    <span className="absolute left-3 right-3 -bottom-[3px] h-[3px] rounded-full bg-orange-300 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
  );

const Menu = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── ROUTING: every page gets its own real URL (/about, /careers, /article/<id>) ───
const SERVICE_PAGES = [
  'solutions', 'advisory', 'risk-consulting', 'it-risk', 'compliance', 'vendor-risk', 'data-privacy', 'cyber-data', 'managed-services', 'ai-consulting',
];
const PAGES = new Set(['home', 'about', 'article', ...SERVICE_PAGES, 'industries', 'contact-us', 'careers']);
const ARTICLE_IDS = new Set(['ai-enablement', 'risk-ai']);
const DEFAULT_ARTICLE_ID = 'ai-enablement';

// Old WordPress URLs (still indexed by search engines) mapped to their new pages.
// /advisory/, /data-privacy/, /managed-services/, /contact-us/ and /careers/ already match.
const LEGACY_PATHS = {
  'about-us': 'about',
  'it-risk-management': 'it-risk',
  'compliance-management': 'compliance',
  '3rd-party-and-vendor-risk-management': 'vendor-risk',
  cybersecurity: 'cyber-data',
  contact: 'contact-us',
  'ai-hub': 'ai-consulting',
};

const pathFor = (page, articleId) => {
  if (page === 'home') return '/';
  if (page === 'article') return `/article/${encodeURIComponent(articleId || DEFAULT_ARTICLE_ID)}`;
  return `/${page}`;
};

// Reads the page from the URL. Also upgrades old "/#about" links to "/about".
const parseLocation = () => {
  const legacyHash = window.location.hash.replace(/^#\/?/, '');
  const raw = window.location.pathname === '/' && PAGES.has(legacyHash) ? legacyHash : window.location.pathname;
  const [page, id] = raw.replace(/^\/+|\/+$/g, '').split('/');
  if (page === 'article') {
    const articleId = id ? decodeURIComponent(id) : DEFAULT_ARTICLE_ID;
    return ARTICLE_IDS.has(articleId) ? { page: 'article', articleId } : { page: 'ai-consulting', articleId: null };
  }
  const resolved = LEGACY_PATHS[page] || page;
  return { page: PAGES.has(resolved) ? resolved : 'home', articleId: null };
};

const FOOTER_COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Advisory', page: 'advisory' },
      { label: 'Risk Consulting', page: 'risk-consulting' },
      { label: 'Cyber & Data', page: 'cyber-data' },
      { label: 'Managed Services', page: 'managed-services' },
      { label: 'AI Consulting', page: 'ai-consulting' },
    ],
  },
  {
    title: 'Risk Consulting',
    links: [
      { label: 'IT Risk Management', page: 'it-risk' },
      { label: 'Compliance Management', page: 'compliance' },
      { label: '3rd Party & Vendor Risk', page: 'vendor-risk' },
      { label: 'Data Privacy', page: 'data-privacy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', page: 'about' },
      { label: 'Industries', page: 'industries' },
      { label: 'Contact Us', page: 'contact-us' },
      { label: 'Careers', page: 'careers' },
    ],
  },
];

// ─── PER-PAGE SEO META ───
const SITE_URL = 'https://engoldconsultingllc.com';
const DEFAULT_DESCRIPTION =
  'Engold Consulting helps businesses improve and operate more efficiently while minimizing risk, with advisory, IT risk management, compliance, cybersecurity, data privacy and managed services.';
const PAGE_DESCRIPTIONS = {
  about: 'Over 20 years of experience delivering IT risk intelligence and strategy. Our consultants hold CISA, CISSP, CISM, CEH and CDPSE certifications.',
  solutions: 'Engold Consulting services: Advisory, Risk Consulting (IT risk, compliance, vendor risk, data privacy), Cyber & Data and Managed Services.',
  advisory: 'ERP transformation (Oracle, SAP, NetSuite, Workday, Salesforce, SuccessFactors), cyber security, application security, process controls and SOD advisory.',
  'risk-consulting': 'Risk consulting from Engold Consulting: IT risk management, compliance management, 3rd party and vendor risk management, and data privacy.',
  'it-risk': 'Enterprise GRC programs, GRC platform implementation (ServiceNow, Archer, Oracle GRC and more) and IT audit services from certified professionals.',
  compliance: 'Compliance assessments across SOX, GDPR, GLBA, PCI DSS, HIPAA, HITRUST, CCPA, NIST, FFIEC, FISMA, COBIT and ISO 27000.',
  'vendor-risk': 'Third-party risk management program design, assessment, continuous monitoring and Vendor Risk as a Service (VRaaS).',
  'data-privacy': 'Data privacy program development, compliance, risk and impact assessments, and CCPA and GDPR readiness assessments.',
  'cyber-data': 'Security assessments, penetration testing, vulnerability scanning, infrastructure and application security, and CISO as a Service.',
  'managed-services': 'Managed security operations to reduce compliance costs: Staff Augmentation, vCISO and Compliance as a Service (CAAS).',
  'ai-consulting': 'AI consulting from Engold Consulting: AI governance and risk management, secure AI adoption, and AI data privacy and compliance.',
  industries: 'Engold Consulting provides IT risk, compliance, cybersecurity and data privacy consulting for financial services, healthcare, energy, retail and manufacturing.',
  'contact-us': 'Contact Engold Consulting. Chicago and Dallas offices, +888 252 7899, info@engoldconsultingllc.com, 8am - 6pm EST.',
  careers: 'Careers at Engold Consulting in IT risk, compliance, cybersecurity and data privacy.',
  article: 'AI insights from Engold Consulting.',
};

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

const applyPageMeta = (page, title, path) => {
  const description = PAGE_DESCRIPTIONS[page] || DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path}`;
  document.title = title;
  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', url);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  const canonical = document.head.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', url);
};

const titleFor = (page) =>
  page === 'home'
    ? 'ENGOLD Consulting | IT Risk, Compliance & Cybersecurity Consulting'
    : `${page.split('-').map((w) => (w.length <= 2 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1))).join(' ')} | ENGOLD Consulting`;

export default function App() {
  const [initialRoute] = useState(parseLocation);
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [activeArticleId, setActiveArticleId] = useState(initialRoute.articleId || DEFAULT_ARTICLE_ID);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubRisk, setActiveSubRisk] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [openFooterColumn, setOpenFooterColumn] = useState(null);

  const closeMenus = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setMobileExpandedSection(null);
  };

  const navigateTo = (page, articleId = activeArticleId) => {
    const path = pathFor(page, articleId);
    if (window.location.pathname !== path || window.location.hash) {
      window.history.pushState({ page, articleId }, '', path);
    }
    setCurrentPage(page);
    if (page === 'article') setActiveArticleId(articleId);
    closeMenus();
  };

  const handleOpenArticle = (id) => navigateTo('article', id);

  // Normalise the URL on first load (e.g. old "/#about" → "/about") and handle browser back/forward
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const canonical = pathFor(initialRoute.page, initialRoute.articleId);
    if (window.location.pathname !== canonical) window.history.replaceState(null, '', canonical);

    const onPopState = () => {
      const { page, articleId } = parseLocation();
      setCurrentPage(page);
      if (articleId) setActiveArticleId(articleId);
      closeMenus();
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Every new page starts at the top, like a real page load
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    applyPageMeta(currentPage, titleFor(currentPage), pathFor(currentPage, activeArticleId));
  }, [currentPage, activeArticleId]);

  const activeNav = getActiveNav(currentPage);
  const navItemClass = (key) =>
    `group relative px-3 py-2 text-[14px] transition-colors duration-200 ${
      activeNav === key ? 'text-orange-600 font-semibold' : 'text-gray-700 font-semibold hover:text-orange-600'
    }`;

  const toggleMobileAccordion = (section) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 antialiased selection:bg-orange-500 selection:text-white">

      {/* ═══════════════ TOP INFO BAR (BRAND ORANGE) ═══════════════ */}
      <div className="hidden md:block bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-[12px] font-semibold">
          {/* LEFT: ADDRESS + HOURS */}
          <div className="flex items-center divide-x divide-white/30">
            <a
              href={MAIN_OFFICE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 pr-5 hover:text-orange-100 transition-colors"
            >
              <MapPinIcon className="w-4 h-4 text-white" />
              <span><span className="hidden xl:inline">{MAIN_OFFICE.name}: </span>{MAIN_OFFICE.lines.join(', ')}</span>
            </a>
            <div className="hidden lg:flex items-center gap-2 pl-5">
              <ClockIcon className="w-4 h-4 text-white" />
              <span>Business Hours: {HOURS}</span>
            </div>
          </div>

          {/* RIGHT: CONTACT */}
          <div className="flex items-center divide-x divide-white/30">
            <div className="flex items-center gap-2 pr-5">
              <MailIcon className="w-4 h-4 text-white" />
              <a href={`mailto:${EMAIL}`} className="hover:text-orange-100 transition-colors">{EMAIL}</a>
            </div>
            <div className="flex items-center gap-2 pl-5">
              <PhoneIcon className="w-4 h-4 text-white" />
              <a href={PHONE_HREF} className="hover:text-orange-100 transition-colors">{PHONE}</a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN NAVIGATION BAR (WHITE: LOGO + LINKS) ═══════════════ */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 text-gray-900 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">

          {/* LOGO */}
          <EngoldLogo onClick={() => navigateTo('home')} />

          {/* DESKTOP PILL NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1 text-[14px] font-semibold text-gray-700 mx-auto">

            {/* HOME */}
            <button
              onClick={() => navigateTo('home')}
              className={navItemClass('home')}
              aria-current={activeNav === 'home' ? 'page' : undefined}
            >
              Home
              <NavIndicator active={activeNav === 'home'} />
            </button>

            {/* ABOUT US */}
            <button
              onClick={() => navigateTo('about')}
              className={navItemClass('about')}
              aria-current={activeNav === 'about' ? 'page' : undefined}
            >
              About Us
              <NavIndicator active={activeNav === 'about'} />
            </button>

            {/* SERVICES (was Solutions) */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => { setActiveDropdown(null); setActiveSubRisk(false); }}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                className={`${navItemClass('services')} flex items-center gap-1.5 cursor-default`}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                <NavIndicator active={activeNav === 'services'} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-80 bg-white/95 backdrop-blur-2xl border border-gray-100 shadow-2xl rounded-2xl p-2 z-50 space-y-1 text-gray-900"
                  >
                    <button
                      onClick={() => navigateTo('advisory')}
                      onMouseEnter={() => setActiveSubRisk(false)}
                      className="w-full text-left p-3 rounded-xl hover:bg-orange-50/80 transition-colors group block"
                    >
                      <span className="text-xs font-bold text-gray-900 group-hover:text-orange-600 block">Advisory</span>
                      <span className="text-[11px] text-gray-500 block leading-tight">ERP transformation, application security & SOD</span>
                    </button>

                    <div className="relative" onMouseEnter={() => setActiveSubRisk(true)} onMouseLeave={() => setActiveSubRisk(false)}>
                      <button
                        type="button"
                        onClick={() => setActiveSubRisk(!activeSubRisk)}
                        aria-haspopup="true"
                        aria-expanded={activeSubRisk}
                        className={`w-full text-left p-3 rounded-xl transition-colors group flex justify-between items-center cursor-default ${activeSubRisk ? 'bg-orange-50/80' : 'hover:bg-orange-50/80'}`}
                      >
                        <div>
                          <span className="text-xs font-bold text-gray-900 group-hover:text-orange-600 block">Risk Consulting</span>
                          <span className="text-[11px] text-gray-500 block leading-tight">IT risk, compliance, vendor risk & data privacy</span>
                        </div>
                        <ChevronRight />
                      </button>

                      {activeSubRisk && (
                        <div className="absolute top-0 left-full pl-2 w-[18.5rem]">
                        <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 shadow-2xl rounded-2xl p-2 space-y-1">
                          <button onClick={() => navigateTo('it-risk')} className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50 text-xs font-semibold text-gray-800 hover:text-orange-600 block">IT Risk Management</button>
                          <button onClick={() => navigateTo('compliance')} className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50 text-xs font-semibold text-gray-800 hover:text-orange-600 block">Compliance Management</button>
                          <button onClick={() => navigateTo('vendor-risk')} className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50 text-xs font-semibold text-gray-800 hover:text-orange-600 block">3rd Party & Vendor Risk</button>
                          <button onClick={() => navigateTo('data-privacy')} className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50 text-xs font-semibold text-gray-800 hover:text-orange-600 block">Data Privacy</button>
                        </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigateTo('cyber-data')}
                      className="w-full text-left p-3 rounded-xl hover:bg-orange-50/80 transition-colors group block"
                    >
                      <span className="text-xs font-bold text-gray-900 group-hover:text-orange-600 block">Cyber & Data</span>
                      <span className="text-[11px] text-gray-500 block leading-tight">IAM, SIEM, vulnerability assessment & pen testing</span>
                    </button>

                    <button
                      onClick={() => navigateTo('managed-services')}
                      className="w-full text-left p-3 rounded-xl hover:bg-orange-50/80 transition-colors group block"
                    >
                      <span className="text-xs font-bold text-gray-900 group-hover:text-orange-600 block">Managed Services</span>
                      <span className="text-[11px] text-gray-500 block leading-tight">Staff augmentation, vCISO & compliance as a service</span>
                    </button>

                    <button
                      onClick={() => navigateTo('ai-consulting')}
                      className="w-full text-left p-3 rounded-xl hover:bg-orange-50/80 transition-colors group block"
                    >
                      <span className="text-xs font-bold text-gray-900 group-hover:text-orange-600 block">AI Consulting</span>
                      <span className="text-[11px] text-gray-500 block leading-tight">AI governance, secure adoption & compliance</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* INDUSTRIES (standalone page, no sector sub-pages) */}
            <button
              onClick={() => navigateTo('industries')}
              className={navItemClass('industries')}
              aria-current={activeNav === 'industries' ? 'page' : undefined}
            >
              Industries
              <NavIndicator active={activeNav === 'industries'} />
            </button>

            {/* CAREERS */}
            <button
              onClick={() => navigateTo('careers')}
              className={navItemClass('careers')}
              aria-current={activeNav === 'careers' ? 'page' : undefined}
            >
              Careers
              <NavIndicator active={activeNav === 'careers'} />
            </button>
          </nav>

          {/* CONTACT US: button at the end of the navigation */}
          <button
            onClick={() => navigateTo('contact-us')}
            aria-current={activeNav === 'contact' ? 'page' : undefined}
            className={`hidden lg:inline-flex items-center shrink-0 px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[14px] font-bold shadow-md shadow-orange-500/25 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${activeNav === 'contact' ? 'ring-2 ring-orange-200 ring-offset-2' : ''}`}
          >
            Contact Us
          </button>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE DRAWER NAVIGATION OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-gray-200 overflow-hidden shadow-2xl px-6 py-6 space-y-4"
            >
              {/* HOME */}
              <div className="border-b border-gray-100 pb-3">
                <button
                  onClick={() => navigateTo('home')}
                  className="w-full text-left text-base font-bold text-gray-900 py-2 hover:text-orange-600"
                >
                  Home
                </button>
              </div>

              {/* ABOUT US */}
              <div className="border-b border-gray-100 pb-3">
                <button
                  onClick={() => navigateTo('about')}
                  className="w-full text-left text-base font-bold text-gray-900 py-2 hover:text-orange-600 block"
                >
                  About Us
                </button>
              </div>

              {/* ACCORDION: SERVICES */}
              <div className="border-b border-gray-100 pb-3">
                <button
                  onClick={() => toggleMobileAccordion('solutions')}
                  className="w-full flex justify-between items-center text-left text-base font-bold text-gray-900 py-2 hover:text-orange-600"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${mobileExpandedSection === 'solutions' ? 'rotate-180 text-orange-600' : ''}`} />
                </button>
                {mobileExpandedSection === 'solutions' && (
                  <div className="pl-4 pt-2 space-y-2 text-sm text-gray-600">
                    <button onClick={() => navigateTo('advisory')} className="block w-full text-left py-1 hover:text-orange-600">Advisory</button>
                    <span className="block w-full text-left py-1 text-gray-400 font-semibold">Risk Consulting</span>
                    <button onClick={() => navigateTo('it-risk')} className="block w-full text-left py-1 hover:text-orange-600 pl-3 border-l border-gray-200">IT Risk Management</button>
                    <button onClick={() => navigateTo('compliance')} className="block w-full text-left py-1 hover:text-orange-600 pl-3 border-l border-gray-200">Compliance Management</button>
                    <button onClick={() => navigateTo('vendor-risk')} className="block w-full text-left py-1 hover:text-orange-600 pl-3 border-l border-gray-200">3rd Party & Vendor Risk</button>
                    <button onClick={() => navigateTo('data-privacy')} className="block w-full text-left py-1 hover:text-orange-600 pl-3 border-l border-gray-200">Data Privacy</button>
                    <button onClick={() => navigateTo('cyber-data')} className="block w-full text-left py-1 hover:text-orange-600">Cyber & Data</button>
                    <button onClick={() => navigateTo('managed-services')} className="block w-full text-left py-1 hover:text-orange-600">Managed Services</button>
                    <button onClick={() => navigateTo('ai-consulting')} className="block w-full text-left py-1 hover:text-orange-600">AI Consulting</button>
                  </div>
                )}
              </div>

              {/* INDUSTRIES */}
              <div className="border-b border-gray-100 pb-3">
                <button
                  onClick={() => navigateTo('industries')}
                  className="w-full text-left text-base font-bold text-gray-900 py-2 hover:text-orange-600 block"
                >
                  Industries
                </button>
              </div>

              {/* CAREERS */}
              <div className="border-b border-gray-100 pb-3">
                <button
                  onClick={() => navigateTo('careers')}
                  className="w-full text-left text-base font-bold text-gray-900 py-2 hover:text-orange-600 block"
                >
                  Careers
                </button>
              </div>

              {/* MOBILE CONTACT INFO */}
              <div className="pt-2 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-orange-500" />
                  <a href={`mailto:${EMAIL}`} className="hover:text-orange-600">{EMAIL}</a>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-orange-500" />
                  <a href={PHONE_HREF} className="hover:text-orange-600">{PHONE}</a>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-orange-500" />
                  <span>{HOURS}</span>
                </div>
              </div>

              {/* MOBILE CONTACT US BUTTON (end of the menu, matching desktop) */}
              <div className="pt-4">
                <button
                  onClick={() => navigateTo('contact-us')}
                  className="w-full inline-flex items-center justify-center py-3.5 rounded-full bg-orange-500 text-white font-bold text-sm text-center shadow-md hover:bg-orange-600 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DYNAMIC ROUTE RENDERER */}
      {currentPage === 'home' && <Home onNavigate={navigateTo} onOpenArticle={handleOpenArticle} />}
      {currentPage === 'about' && <About onNavigate={navigateTo} />}
      {currentPage === 'article' && <ArticlePage storyId={activeArticleId} onBack={() => navigateTo('ai-consulting')} onOpenArticle={handleOpenArticle} />}

      {SERVICE_PAGES.includes(currentPage) && (
        <Solutions pageKey={currentPage} onNavigate={navigateTo} onOpenArticle={handleOpenArticle} />
      )}

      {currentPage === 'industries' && <Industries onNavigate={navigateTo} />}
      {currentPage === 'contact-us' && <Contact onNavigate={navigateTo} />}
      {currentPage === 'careers' && <Careers onNavigate={navigateTo} />}

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-[#0A1322] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-8">

          {/* TOP: BRAND  |  DIRECT CONTACT */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 pb-12 border-b border-white/10 xl:items-end">
            <div className="xl:col-span-4 space-y-5">
              <EngoldLogo onClick={() => navigateTo('home')} inverted={true} />
              <p className="text-[15px] text-slate-400 max-w-sm leading-relaxed">
                Engold Consulting helps businesses to improve and operate more efficiently while minimizing risks associated with Business and IT process changes.
              </p>
            </div>

            {/* CONTACT STRIP: one ruled row of three cells, aligned with the brand block */}
            <div className="xl:col-span-8 space-y-5">
              <p className="text-lg font-bold">Need to reach out to us or leave us a message?</p>
              <dl className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] rounded-2xl border border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                <div className="p-5 sm:p-6 space-y-1.5">
                  <dt className="flex items-center gap-2 text-sm text-slate-400">
                    <PhoneIcon className="w-4 h-4 text-orange-400" />
                    Call us
                  </dt>
                  <dd>
                    <a href={PHONE_HREF} className="text-xl font-extrabold tracking-tight hover:text-orange-400 transition-colors">
                      {PHONE}
                    </a>
                  </dd>
                </div>
                <div className="p-5 sm:p-6 space-y-1.5 min-w-0">
                  <dt className="flex items-center gap-2 text-sm text-slate-400">
                    <MailIcon className="w-4 h-4 text-orange-400" />
                    Email us
                  </dt>
                  <dd>
                    <a href={`mailto:${EMAIL}`} className="block text-[15px] lg:text-base font-bold [overflow-wrap:anywhere] sm:[overflow-wrap:normal] sm:whitespace-nowrap hover:text-orange-400 transition-colors">
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div className="p-5 sm:p-6 space-y-1.5">
                  <dt className="flex items-center gap-2 text-sm text-slate-400">
                    <ClockIcon className="w-4 h-4 text-orange-400" />
                    Business hours
                  </dt>
                  <dd className="text-xl font-extrabold tracking-tight">{HOURS}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* MIDDLE: LINK COLUMNS (accordions on mobile) + OFFICES */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:gap-8 lg:gap-10 py-4 md:py-12 text-[15px]">
            {FOOTER_COLUMNS.map((col) => {
              const open = openFooterColumn === col.title;
              return (
                <div key={col.title} className="border-b border-white/10 md:border-0">
                  <h2>
                    <button
                      type="button"
                      onClick={() => setOpenFooterColumn(open ? null : col.title)}
                      aria-expanded={open}
                      className="md:pointer-events-none w-full flex items-center justify-between py-4 md:py-0 md:mb-4 text-base font-bold"
                    >
                      {col.title}
                      <ChevronDown className={`md:hidden w-4 h-4 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180 text-orange-400' : ''}`} />
                    </button>
                  </h2>
                  <ul className={`${open ? 'block' : 'hidden'} md:block space-y-3 pb-5 md:pb-0 text-slate-400`}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={pathFor(link.page, link.articleId)}
                          onClick={(e) => {
                            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                            e.preventDefault();
                            navigateTo(link.page, link.articleId);
                          }}
                          className="hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {OFFICES.map((office) => (
              <address key={office.name} className="not-italic pt-6 md:pt-0">
                <h2 className="text-base font-bold mb-4">{office.name}</h2>
                <p className="text-slate-400 leading-relaxed">
                  {office.lines[0]}<br />{office.lines[1]}
                </p>
              </address>
            ))}
          </div>

          {/* BOTTOM: COPYRIGHT + SOCIAL */}
          <div className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-400">
            <span>© {new Date().getFullYear()} Engold Consulting LLC. All rights reserved.</span>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Engold Consulting on LinkedIn"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
