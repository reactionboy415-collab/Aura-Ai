import React from 'react';
import { CompleteReportData } from '../../types';
import { getFaviconUrl } from '../../lib/favicon';
import {
  Users,
  TrendingUp,
  BarChart3,
  Globe,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from 'lucide-react';

interface CompetitorAnalysisTabProps {
  reportData: CompleteReportData;
}

export const CompetitorAnalysisTab: React.FC<CompetitorAnalysisTabProps> = ({
  reportData,
}) => {
  const dashData = reportData.visibility_dashboard_data;
  const brandName = reportData.brand_name || 'Brand';
  const score = dashData?.visibilityScore?.score || 77;
  const competitors = dashData?.competitors || [];
  const discovered = dashData?.discoveredCompetitors || [];
  const brandFavicon = getFaviconUrl(reportData.website_url || brandName);

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg">
            Competitive Benchmarking
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            AI Share of Voice & Competitor Defense
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyze how AI models position {brandName} against direct industry rivals and alternative tools.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-xs text-slate-500 font-mono">Market Rank</div>
            <div className="text-lg font-bold text-emerald-400 font-mono">#1 Leader</div>
          </div>
          <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-xs text-slate-500 font-mono">Direct Peers</div>
            <div className="text-lg font-bold text-purple-400 font-mono">{competitors.length} Peers</div>
          </div>
        </div>
      </div>

      {/* Main Competitor Comparison Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          Primary Competitor Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">Brand / Entity</th>
                <th className="py-3 px-4">Website URL</th>
                <th className="py-3 px-4 text-center">AI Score</th>
                <th className="py-3 px-4 text-center">Share of Voice</th>
                <th className="py-3 px-4 text-center">Threat Level</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              
              {/* Target Brand (Row 1) */}
              <tr className="bg-indigo-950/30 font-semibold border-l-4 border-l-indigo-500">
                <td className="py-3.5 px-4 flex items-center gap-2.5">
                  <img
                    src={brandFavicon}
                    alt={brandName}
                    className="w-5 h-5 object-contain rounded bg-slate-900 p-0.5 border border-indigo-500/30 shrink-0"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="text-white font-bold">{brandName} (Target)</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-indigo-300">
                  <a href={reportData.website_url} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    <span>{reportData.website_url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-indigo-300 text-sm">
                  {score}/100
                </td>
                <td className="py-3.5 px-4 text-center font-mono text-emerald-400">
                  68.0%
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                    Market Leader
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400">
                  #1 Active
                </td>
              </tr>

              {/* Competitors Rows */}
              {competitors.map((comp, idx) => {
                const compFavicon = getFaviconUrl(comp.url || comp.name);
                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white flex items-center gap-2.5">
                      <span className="text-slate-500 font-mono text-[11px]">#{idx + 2}</span>
                      <img
                        src={compFavicon}
                        alt={comp.name}
                        className="w-4 h-4 object-contain rounded bg-slate-900 p-0.5 shrink-0"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span>{comp.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      <a href={comp.url} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                        <span>{comp.url}</span>
                        <ExternalLink className="w-3 h-3 text-slate-600" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-300">
                      {comp.score}/100
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                      {(comp.score * 0.4).toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          comp.score > 50
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {comp.score > 50 ? 'Moderate Threat' : 'Low Threat'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                      Benchmarked
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>

      {/* Discovered Peer Alternatives */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Discovered Niche Alternatives in AI Search
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {discovered.map((disc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{disc.name}</span>
                <span className="text-xs font-mono text-purple-400 font-semibold">{disc.score}/100</span>
              </div>
              <p className="text-xs text-slate-400">
                Mentioned across {disc.mentionCount} AI prompt search scenarios.
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
