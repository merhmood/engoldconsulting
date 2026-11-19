import { Fragment } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

/**
 * Shared header for inner pages (Services, Industries, Contact, Careers).
 * Follows the Home page design: navy band, sentence-case orange label, plain white headline,
 * image in a framed panel, figures as a ruled row. The sibling bar lets visitors hop between
 * related pages without going back to the menu.
 */
export default function PageHero({
  pageKey,
  breadcrumb = [],
  eyebrow,
  title,
  highlight,
  description,
  image,
  stats = [],
  primaryCta,
  secondaryCta,
  siblings = [],
  siblingsLabel = 'Explore',
  imageCaption = { title: 'Over 20 years of experience', text: 'Certified IT risk and security professionals' },
  onNavigate,
}) {
  const renderCta = (cta, variant) => {
    if (!cta) return null;
    const base =
      'group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400';
    const styles =
      variant === 'primary'
        ? `${base} bg-orange-500 hover:bg-orange-600 text-white`
        : `${base} border-2 border-white/70 text-white hover:bg-white hover:text-[#0F1B2D]`;
    const content = (
      <>
        {cta.label}
        {variant === 'primary' && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </>
    );
    if (cta.href) {
      const external = cta.href.startsWith('http');
      return (
        <a href={cta.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={styles}>
          {content}
        </a>
      );
    }
    return (
      <button onClick={() => onNavigate(cta.page)} className={styles}>
        {content}
      </button>
    );
  };

  const heading = [title, highlight].filter(Boolean).join(' ');

  return (
    <>
      <section className="bg-[#0F1B2D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 sm:pb-20">
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400 mb-10 sm:mb-12">
              {breadcrumb.map((crumb, i) => {
                const last = i === breadcrumb.length - 1;
                return (
                  <Fragment key={crumb.label}>
                    {last ? (
                      <span className="text-slate-200" aria-current="page">{crumb.label}</span>
                    ) : (
                      <button onClick={() => onNavigate(crumb.page)} className="hover:text-white transition-colors">
                        {crumb.label}
                      </button>
                    )}
                    {!last && <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />}
                  </Fragment>
                );
              })}
            </nav>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className={`${image ? 'lg:col-span-7' : 'lg:col-span-9'} space-y-6`}>
              {eyebrow && eyebrow.toLowerCase() !== heading.toLowerCase() && (
                <p className="text-base font-semibold text-orange-400">{eyebrow}</p>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">{heading}</h1>
              {description && <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">{description}</p>}

              {(primaryCta || secondaryCta) && (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {renderCta(primaryCta, 'primary')}
                  {renderCta(secondaryCta, 'secondary')}
                </div>
              )}
            </div>

            {image && (
              <figure className="lg:col-span-5 relative p-3 sm:p-4 mb-6 lg:mb-0">
                {/* Inspection-frame corners: the "under review" viewfinder */}
                <span className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-orange-500 rounded-tl-2xl" aria-hidden="true" />
                <span className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-orange-500 rounded-tr-2xl" aria-hidden="true" />
                <span className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-orange-500 rounded-bl-2xl" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-orange-500 rounded-br-2xl" aria-hidden="true" />

                <div className="relative overflow-hidden rounded-xl bg-[#16263d]">
                  <img
                    key={image}
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="w-full aspect-[4/3] object-cover saturate-[.85] contrast-[1.05]"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {/* Navy tint ties every photo to the band colour */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D]/75 via-[#0F1B2D]/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" aria-hidden="true" />
                </div>

                {/* Sign-off badge */}
                <figcaption className="absolute -bottom-6 left-8 sm:left-10 right-8 sm:right-auto flex items-center gap-3 rounded-xl bg-white text-[#0F1B2D] pl-3 pr-5 py-3 shadow-xl shadow-black/25">
                  <svg className="w-8 h-8 shrink-0" viewBox="0 0 28 28" aria-hidden="true">
                    <rect width="28" height="28" rx="7" className="fill-orange-500" />
                    <path d="M8 14.5l4 4 8-9" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-tight">{imageCaption.title}</span>
                    <span className="block text-xs text-slate-500 leading-tight mt-0.5">{imageCaption.text}</span>
                  </span>
                </figcaption>
              </figure>
            )}
          </div>

          {/* Figures as a ruled row */}
          {stats.length > 0 && (
            <dl className="mt-12 sm:mt-14 pt-8 border-t border-white/15 flex flex-wrap gap-x-12 gap-y-6">
              {stats.map((s) => (
                <div key={s.label} className="min-w-[8rem]">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{s.value}</dd>
                  <dd className="mt-1 text-sm text-slate-400">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* Sibling page switcher */}
      {siblings.length > 0 && (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
            <span className="hidden md:block shrink-0 text-sm font-semibold text-slate-400">{siblingsLabel}</span>
            <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
              {siblings.map((s) => {
                const active = s.key === pageKey;
                return (
                  <button
                    key={s.key}
                    onClick={() => !active && onNavigate(s.key)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative shrink-0 px-3.5 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                      active ? 'text-orange-600' : 'text-slate-600 hover:text-[#0F1B2D]'
                    }`}
                  >
                    {s.label}
                    <span
                      className={`absolute left-3 right-3 bottom-0 h-[3px] rounded-full bg-orange-500 transition-transform duration-300 ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
