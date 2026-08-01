import React, { useState } from 'react';
import { getFaviconUrl } from '../lib/favicon';
import {
  Sparkles,
  BarChart3,
  Globe2,
  Terminal,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
  FileText,
} from 'lucide-react';

interface NavbarProps {
  onSearchUrl: (url: string) => void;
  onResetToLanding: () => void;
  currentStep: 'landing' | 'loading_fetch' | 'preview_fetched' | 'loading_report' | 'dashboard';
  brandName?: string;
  websiteUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchUrl,
  onResetToLanding,
  currentStep,
  brandName,
  websiteUrl,
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onSearchUrl(inputUrl.trim());
    }
  };

  const faviconUrl = websiteUrl ? getFaviconUrl(websiteUrl) : brandName ? getFaviconUrl(`${brandName}.com`) : '';

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={onResetToLanding}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  AuraAI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v2.5
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                AI Brand Visibility & Geo-SEO SaaS
              </p>
            </div>
          </div>

          {/* Search bar inside navbar if in dashboard or preview */}
          {currentStep === 'dashboard' && (
            <form
              onSubmit={handleSubmit}
              className="hidden md:flex items-center flex-1 max-w-md relative"
            >
              <Globe2 className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Analyze another URL (e.g. openai.com)..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500/50 rounded-lg pl-9 pr-24 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-[11px] font-medium transition-colors"
              >
                Analyze
              </button>
            </form>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowApiModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Reverse API Spec</span>
            </button>

            {currentStep === 'dashboard' && brandName && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-mono">
                {faviconUrl ? (
                  <img
                    src={faviconUrl}
                    alt={brandName}
                    className="w-4 h-4 rounded-sm object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
                <span className="truncate max-w-[120px] font-bold text-slate-200">{brandName}</span>
              </div>
            )}

            <button
              onClick={onResetToLanding}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg shadow-sm shadow-indigo-500/20 transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>New Audit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Reverse API Contract Modal */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Discovered API Contract Specification</h3>
              </div>
              <button
                onClick={() => setShowApiModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Below are the 7 endpoints reverse-engineered from the captured network logs. All request payloads automatically inject the user's input website URL dynamically.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">1. GET /api/scrape-website-info?url=&lt;websiteUrl&gt;</div>
                <div className="text-slate-400 text-[11px]">Extracts brand name, title, meta description & website metadata.</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-indigo-400 font-bold">2. POST /api/competitors/suggest</div>
                <div className="text-slate-400 text-[11px]">Body: &#123; brandName, url, description, industry, strategy: "direct" &#125;</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-indigo-400 font-bold">3. POST /api/prompts/suggest</div>
                <div className="text-slate-400 text-[11px]">Body: &#123; brandName, description, industry, language, strategy: "discovery" &#125;</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold">4. POST /api/reports/create</div>
                <div className="text-slate-400 text-[11px]">Body: &#123; brand_name, website_url, product_description, industry, manual_competitors_input... &#125;</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold">5. POST /api/free-analysis/run</div>
                <div className="text-slate-400 text-[11px]">Body: &#123; brandName, website, industry, description, competitors, prompts... &#125;</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-pink-400 font-bold">6. POST /api/reports/update</div>
                <div className="text-slate-400 text-[11px]">Body: &#123; id, data: &#123; visibility_dashboard_data, prompt_analysis_data... &#125; &#125;</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">7. GET /api/getfreereport?reportId=&lt;id&gt;</div>
                <div className="text-slate-400 text-[11px]">Returns complete report object with all analytics and sources.</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowApiModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
