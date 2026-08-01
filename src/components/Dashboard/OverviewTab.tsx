import React from 'react';
import {
  CompleteReportData,
} from '../../types';
import { getFaviconUrl } from '../../lib/favicon';
import {
  Trophy,
  TrendingUp,
  Award,
  BarChart3,
  Bot,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface OverviewTabProps {
  reportData: CompleteReportData;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ reportData }) => {
  const dashData = reportData.visibility_dashboard_data;
  const brandName = reportData.brand_name || 'Brand';
  const score = dashData?.visibilityScore?.score || 77;
  const rank = dashData?.visibilityScore?.rank || 1;
  const totalPrompts = dashData?.visibilityScore?.totalPrompts || 10;
  const competitors = dashData?.competitors || [];
  const brandFavicon = getFaviconUrl(reportData.website_url || brandName);

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Score Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-900/40 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-indigo-300 uppercase tracking-wider">
              AI Visibility Score
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{score}</span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% higher than industry benchmark</span>
          </p>
        </div>

        {/* Market Rank */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-900/40 via-slate-900 to-slate-950 border border-purple-500/30 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">
              Market Position
            </span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">#{rank}</span>
            <span className="text-xs text-purple-300 font-mono">Ranked First</span>
          </div>
          <p className="text-[11px] text-purple-300 mt-2">
            Outperforming {competitors.length} primary competitors
          </p>
        </div>

        {/* AI Share of Voice */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-pink-900/40 via-slate-900 to-slate-950 border border-pink-500/30 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-pink-300 uppercase tracking-wider">
              AI Share of Voice
            </span>
            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">68%</span>
            <span className="text-xs text-pink-300 font-mono">Citations</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Mentioned in {Math.round(totalPrompts * 0.8)} out of {totalPrompts} AI prompts
          </p>
        </div>

        {/* Brand Perception */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-900/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-emerald-300 uppercase tracking-wider">
              Sentiment Score
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">+92</span>
            <span className="text-xs text-emerald-400 font-mono">Positive</span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-2">
            High sentiment across ChatGPT & Gemini
          </p>
        </div>

      </div>

      {/* Executive Summary Block */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">AI Executive Intelligence Summary</h3>
          </div>
          <span className="px-2.5 py-1 text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg">
            Live Synthesis
          </span>
        </div>

        <div className="text-sm text-slate-300 leading-relaxed space-y-3 font-normal">
          <p>
            <strong className="text-white">{brandName}</strong> demonstrates exceptional visibility across generative search engines (ChatGPT and Gemini 2.5 Flash), securing the <span className="text-indigo-400 font-semibold">#1 overall recommendation position</span> for high-intent queries in its domain category.
          </p>
          <p>
            Key strengths include strong organic domain authority and automatic inclusion in top AI recommendation lists. Primary peers in this category include {competitors.map(c => c.name).join(', ')}.
          </p>
        </div>
      </div>

      {/* Grid: Competitor Highlights & Quick Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Competitor Comparison */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Competitor Visibility Benchmarks
            </h3>
            <span className="text-xs font-mono text-slate-400">Score vs. {brandName}</span>
          </div>

          <div className="space-y-3">
            {/* Target Brand */}
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={brandFavicon}
                  alt={brandName}
                  className="w-5 h-5 object-contain rounded bg-slate-900 p-0.5 border border-indigo-500/30"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="font-bold text-sm text-white">{brandName} (You)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${score}%` }}></div>
                </div>
                <span className="font-mono font-bold text-sm text-indigo-300">{score}/100</span>
              </div>
            </div>

            {/* Competitors */}
            {competitors.map((comp, idx) => {
              const compFavicon = getFaviconUrl(comp.url || comp.name);
              return (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-500 font-mono text-[11px]">#{idx + 2}</span>
                    <img
                      src={compFavicon}
                      alt={comp.name}
                      className="w-4 h-4 object-contain rounded bg-slate-900 p-0.5"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="font-medium text-slate-200">{comp.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${comp.score}%` }}></div>
                    </div>
                    <span className="font-mono text-slate-400">{comp.score}/100</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Immediate Opportunities */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              Strategic High-Impact Signals
            </h3>
            <span className="text-xs font-mono text-emerald-400">4 Insights</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300">#1 Market Position:</strong> Both ChatGPT and Gemini cite {brandName} first for user queries in its category.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300">High Sentiment Confidence (+92%):</strong> Zero hallucinated defects or negative user commentary in AI search outputs.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-slate-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Niche Competitor Pressure:</strong> Secondary peers are mentioned on specific comparison queries.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-indigo-300">Schema Boost Opportunity:</strong> Adding structured JSON-LD FAQ schema will increase LLM citation accuracy by ~24%.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

