import React from 'react';
import { CompleteReportData } from '../../types';
import { Globe, ExternalLink, ShieldCheck, Layers, Sparkles } from 'lucide-react';

interface SourcesTabProps {
  reportData: CompleteReportData;
}

export const SourcesTab: React.FC<SourcesTabProps> = ({ reportData }) => {
  const sources = reportData.ai_sources_data || [
    { url: 'https://routenote.com', title: 'routenote.com', domain: 'routenote.com', category: 'Corporate Website', originalPrompt: 'link consolidation for music bands', domainAuthority: 50 },
    { url: 'https://youtube.com', title: 'youtube.com', domain: 'youtube.com', category: 'Social Media', originalPrompt: 'music merch and tour links', domainAuthority: 88 },
    { url: 'https://feature.fm', title: 'feature.fm', domain: 'feature.fm', category: 'Corporate Website', originalPrompt: 'smart link marketing', domainAuthority: 50 },
    { url: 'https://lnk.bio', title: 'lnk.bio', domain: 'lnk.bio', category: 'Corporate Website', originalPrompt: 'single link tools for artists', domainAuthority: 50 },
    { url: 'https://stan.store', title: 'stan.store', domain: 'stan.store', category: 'Corporate Website', originalPrompt: 'selling digital goods directly', domainAuthority: 50 },
    { url: 'https://stripe.com', title: 'stripe.com', domain: 'stripe.com', category: 'Corporate Website', originalPrompt: 'payment integrations', domainAuthority: 92 },
    { url: 'https://shopify.com', title: 'shopify.com', domain: 'shopify.com', category: 'E-commerce', originalPrompt: 'print design e-commerce', domainAuthority: 85 },
    { url: 'https://techrepublic.com', title: 'techrepublic.com', domain: 'techrepublic.com', category: 'Review Site', originalPrompt: 'freelance portfolio tools', domainAuthority: 75 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg">
            Grounding Citations
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Web Sources & Authority Citations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Top web domains indexed by Gemini and ChatGPT when synthesizing recommendations for {reportData.brand_name}.
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
          <div className="text-xs text-slate-500 font-mono">Total Sources</div>
          <div className="text-lg font-bold text-indigo-400 font-mono">{sources.length} Domains</div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          Citation Source Index
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{src.domain}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-0.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Category: <span className="text-slate-300">{src.category || 'Web Domain'}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate font-mono pt-1">
                  Query: "{src.originalPrompt}"
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded">
                  DA {src.domainAuthority || 50}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
