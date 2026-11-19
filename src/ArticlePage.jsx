import { useState } from 'react';
import { ArrowLeft, Clock, Share2, Check, ArrowRight } from 'lucide-react';

export default function ArticlePage({ storyId, onBack, onOpenArticle }) {
  const [copied, setCopied] = useState(false);

  const articles = {
    'ai-enablement': {
      title: "AI Enablement: From First Model Training to Autonomous Agentic Execution",
      category: "Artificial Intelligence & Automation",
      readTime: "4 min read",
      date: "October 2026",
      author: "Engold AI Practice Group",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      takeaways: [
        "Zero-trust security wrappers around generative AI querying engines and corporate vector databases.",
        "Deployment of autonomous compliance auditing agents handling repetitive SOX control checks.",
        "Workforce training and phased, enterprise-wide adoption with defined guardrails."
      ],
      content: [
        "Organizations frequently encounter adoption barriers when transitioning from basic conversational LLMs to autonomous agentic workflows capable of driving operational business logic.",
        "Without deterministic security controls, granting LLMs access to core database tables or internal APIs introduces serious risks of data exfiltration, hallucinated transactions, and compliance breaches.",
        "Engold developed a modular AI enablement roadmap covering data governance, guardrail integration, agent orchestration, and workforce training. We implemented an intermediary Zero-Trust proxy that inspects every agent query and tool execution against role-based access policies prior to execution.",
        "This architecture allows clients to safely deploy autonomous auditing agents that verify evidence across thousands of ERP ledger entries while maintaining a cryptographic audit trail for external regulators."
      ],
      related: ['risk-ai']
    },
    'risk-ai': {
      title: "Engold Launches Advanced Risk AI to Elevate Client Research & Audit Delivery",
      category: "Product Innovation & Research",
      readTime: "3 min read",
      date: "October 2026",
      author: "Product Strategy Desk",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      takeaways: [
        "Instant contextual synthesis of complex IT governance and security frameworks.",
        "Faster setup of initial enterprise risk assessments.",
        "Proactive automated alerting for emerging IT security vulnerabilities."
      ],
      content: [
        "Engold Consulting officially announced the launch of its proprietary Risk AI intelligence platform, purpose-built to accelerate regulatory audit research and vulnerability mitigation.",
        "The system aggregates global threat feeds, regulatory shifts, and IT compliance standards into actionable client intelligence dashboards, mapping obscure statutory clauses into actionable engineering controls.",
        "Risk AI helps our engagement teams diagnose an enterprise's regulatory vulnerabilities faster.",
        "Clients gain access to an interactive portal where they can simulate regulatory audits, evaluate vendor risk matrices, and receive continuous recommendations as international regulatory bodies update guidance."
      ],
      related: ['ai-enablement']
    }
  };

  const article = articles[storyId] || articles['ai-enablement'];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="bg-white min-h-screen text-slate-900">
      {/* ARTICLE HEADER (navy band, as on the other inner pages) */}
      <header className="bg-[#0F1B2D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-14 sm:pt-14 sm:pb-16 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to AI Consulting
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 text-sm font-semibold text-slate-200 hover:bg-white hover:text-[#0F1B2D] transition-colors"
              aria-live="polite"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Link copied' : 'Copy link'}
            </button>
          </div>

          <div className="space-y-5">
            <p className="text-base font-semibold text-orange-400">{article.category}</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">{article.title}</h1>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-400">
              <span className="font-semibold text-slate-200">{article.author}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
              <span>Published {article.date}</span>
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        <img
          src={article.image}
          alt=""
          className="w-full aspect-[16/9] object-cover rounded-2xl border border-slate-200"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* KEY POINTS */}
        <section aria-labelledby="key-points" className="rounded-2xl border border-slate-200 bg-[#F3F5F8]">
          <h2 id="key-points" className="px-6 sm:px-8 pt-6 text-lg font-bold text-[#0F1B2D]">Key points</h2>
          <ul className="divide-y divide-slate-200">
            {article.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex items-start gap-4 px-6 sm:px-8 py-5">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 28 28" aria-hidden="true">
                  <rect x="1" y="1" width="26" height="26" rx="6" className="fill-white stroke-orange-500" strokeWidth="2" />
                  <path d="M8 14.5l4 4 8-9" fill="none" className="stroke-orange-600" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base text-slate-700 leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* BODY */}
        <article className="max-w-3xl space-y-6 text-lg text-slate-700 leading-[1.75]">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        {/* RELATED */}
        {article.related?.length > 0 && (
          <section aria-labelledby="related-heading" className="pt-10 border-t border-slate-200 space-y-5">
            <h2 id="related-heading" className="text-2xl font-extrabold tracking-tight text-[#0F1B2D]">Further reading</h2>
            <ul className="rounded-2xl border border-slate-200 divide-y divide-slate-200">
              {article.related.map((relId) => {
                const rel = articles[relId];
                if (!rel) return null;
                return (
                  <li key={relId}>
                    <button
                      onClick={() => onOpenArticle && onOpenArticle(relId)}
                      className="group w-full text-left flex items-center gap-5 px-6 sm:px-8 py-6 hover:bg-[#F3F5F8] transition-colors"
                    >
                      <span className="min-w-0 flex-1 space-y-1">
                        <span className="block text-sm font-semibold text-orange-600">{rel.category}</span>
                        <span className="block text-lg font-bold leading-snug text-[#0F1B2D] group-hover:text-orange-600 transition-colors">{rel.title}</span>
                        <span className="block text-sm text-slate-500">{rel.readTime}</span>
                      </span>
                      <ArrowRight className="w-5 h-5 text-orange-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* NEXT STEP */}
        <section className="rounded-2xl bg-[#0F1B2D] text-white p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-base font-semibold text-orange-400">AI Consulting</p>
            <p className="text-xl sm:text-2xl font-extrabold tracking-tight">Put AI to work with the right controls in place.</p>
          </div>
          <button
            onClick={onBack}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors"
          >
            Explore AI Consulting
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </div>
    </main>
  );
}
