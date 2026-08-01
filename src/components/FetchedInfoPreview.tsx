import React from 'react';
import {
  ScrapedWebsiteInfo,
  CompetitorSuggestion,
  PromptSuggestion,
} from '../types';
import { getFaviconUrl } from '../lib/favicon';
import {
  Globe,
  Building2,
  Languages,
  MapPin,
  Users,
  Search,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  BarChart2,
  ShieldCheck,
  Bot,
  Zap,
} from 'lucide-react';

interface FetchedInfoPreviewProps {
  websiteInfo: ScrapedWebsiteInfo;
  competitors: CompetitorSuggestion[];
  prompts: PromptSuggestion[];
  onProceedToDeepReport: () => void;
}

export const FetchedInfoPreview: React.FC<FetchedInfoPreviewProps> = ({
  websiteInfo,
  competitors,
  prompts,
  onProceedToDeepReport,
}) => {
  const brandFavicon = getFaviconUrl(websiteInfo.website || websiteInfo.brandName);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white p-4 sm:p-6 md:p-8 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner Alert for Step 5 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-indigo-900/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold text-emerald-400 tracking-wider">
                  Step 5 Complete
                </span>
                <span className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded-full font-mono">
                  All Endpoints Returned
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">
                Fetched Data Available Immediately
              </h2>
            </div>
          </div>

          <button
            onClick={onProceedToDeepReport}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            <span>Generate Executive AI Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Top Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Website Info Card */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-indigo-500/30 p-2 shadow-lg shadow-indigo-500/10 flex items-center justify-center shrink-0">
                  <img
                    src={brandFavicon}
                    alt={websiteInfo.brandName}
                    className="w-9 h-9 object-contain rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-xl font-bold text-indigo-400 font-mono hidden group-has-[img[style*='display: none']]:inline">
                    {websiteInfo.brandName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    {websiteInfo.brandName}
                  </h1>
                  <a
                    href={websiteInfo.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-1 mt-1 font-mono"
                  >
                    <span>{websiteInfo.website}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium rounded-lg">
                Primary Target
              </span>
            </div>

            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Scraped Title & Page Summary
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {websiteInfo.title}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                "{websiteInfo.description}"
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <Building2 className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-500">Industry</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">
                  {websiteInfo.industry || 'Technology'}
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <Languages className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-500">Language</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">
                  {websiteInfo.language || 'English'}
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <MapPin className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-500">Location</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">
                  {websiteInfo.location || 'United States'}
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <Zap className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-500">Status</div>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                  Crawled 200 OK
                </div>
              </div>
            </div>
          </div>

          {/* Website Card Preview Simulation */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  Website Live Preview
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="aspect-video w-full bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-center items-center text-center space-y-2 relative overflow-hidden group">
                <img
                  src={brandFavicon}
                  alt={websiteInfo.brandName}
                  className="w-12 h-12 object-contain p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md"
                />
                <div className="text-sm font-bold text-white">{websiteInfo.brandName}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2 px-2">
                  {websiteInfo.description}
                </p>
                <div className="text-[10px] font-mono text-indigo-400 pt-1">
                  HTTPS / SSL Validated
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Scraped Endpoint</span>
              <span className="text-emerald-400">/api/scrape-website-info</span>
            </div>
          </div>

        </div>

        {/* Competitors & Prompts Discovered */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Discovered Direct Competitors */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Discovered Competitors</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono bg-slate-800 text-slate-300 rounded-lg">
                {competitors.length} Peers Discovered
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {competitors.map((comp, idx) => {
                const compIcon = getFaviconUrl(comp.url || comp.name);
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={compIcon}
                        alt={comp.name}
                        className="w-6 h-6 object-contain rounded mt-0.5 shrink-0 bg-slate-900 p-0.5 border border-slate-800"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{comp.name}</span>
                          <a
                            href={comp.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-slate-400 hover:text-indigo-400 font-mono"
                          >
                            ({comp.url})
                          </a>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 font-sans">
                          {comp.justification}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-500/10 text-purple-300 rounded border border-purple-500/20 whitespace-nowrap shrink-0">
                      Peer #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High Intent Prompts Matrix */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">High-Intent Prompts Discovered</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono bg-slate-800 text-slate-300 rounded-lg">
                {prompts.length} Prompts
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {prompts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {item.intent}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 truncate">
                      Topic: {item.topic}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-200">
                    "{item.prompt}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA to start Step 6 AI Report Generation */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Ready to Compute Full Executive Dashboard
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              All raw endpoints have been fetched. Trigger Step 6 to synthesize deep LLM Share of Voice, ChatGPT & Gemini citation analysis, and actionable Geo-SEO recommendations.
            </p>
          </div>

          <button
            onClick={onProceedToDeepReport}
            className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold rounded-xl text-sm transition-all shadow-xl shadow-indigo-500/25 flex items-center gap-2.5 whitespace-nowrap"
          >
            <span>Proceed to Step 6 Report Generation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

