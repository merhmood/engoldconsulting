import { ArrowUpRight } from 'lucide-react';
import PageHero from './PageHero.jsx';
import { ClosingBand } from './HomeSections.jsx';
import { CAREERS_URL } from './siteInfo.js';

export default function Careers({ onNavigate }) {
  return (
    <main className="bg-white min-h-screen text-gray-900">
      <PageHero
        pageKey="careers"
        onNavigate={onNavigate}
        breadcrumb={[{ label: 'Home', page: 'home' }, { label: 'Careers' }]}
        eyebrow="Careers"
        title="Careers at Engold Consulting"
        description="Interested in joining our team of IT risk, compliance and cybersecurity professionals? Our open positions are posted on LinkedIn."
        primaryCta={{ label: 'View Open Positions', href: CAREERS_URL }}
        image="/images/web/hero7.jpg"
        imageCaption={{ title: "Open roles on LinkedIn", text: "IT risk, compliance and cybersecurity" }}
      />

      <section aria-labelledby="openings-heading" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-base font-semibold text-orange-600">Current openings</p>
            <h2 id="openings-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-[#0F1B2D]">
              Find our open roles on LinkedIn
            </h2>
          </div>
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-[#F3F5F8] p-7 sm:p-10 space-y-6">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We post all of our current job openings on LinkedIn. View the latest roles and apply directly there.
            </p>
            <a
              href={CAREERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              View Open Positions on LinkedIn
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <ClosingBand onNavigate={onNavigate} />
    </main>
  );
}
