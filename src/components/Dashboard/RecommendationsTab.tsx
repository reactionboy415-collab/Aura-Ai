import React from 'react';
import { CompleteReportData } from '../../types';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Target,
  Code2,
  HelpCircle,
} from 'lucide-react';

interface RecommendationsTabProps {
  reportData: CompleteReportData;
}

export const RecommendationsTab: React.FC<RecommendationsTabProps> = ({
  reportData,
}) => {
  const brandName = reportData.brand_name || 'Brand';

  const recommendations = [
    {
      id: 'rec-1',
      title: 'Embed FAQ Schema with E-commerce Keywords',
      category: 'Technical SEO',
      impact: 'CRITICAL',
      description: 'AI models rely heavily on structured FAQ microdata when evaluating queries like "Can I sell print designs without setting up a full store?".',
      actionItem: 'Deploy JSON-LD Schema markup featuring common e-commerce questions on your homepage footer.',
    },
    {
      id: 'rec-2',
      title: 'Publish Dedicated Comparison Landing Pages',
      category: 'Competitor Defense',
      impact: 'HIGH',
      description: `Rivals like Beacons and Stan Store are capturing long-tail AI search queries. Build explicit "/vs/beacons" comparison pages.`,
      actionItem: 'Create structured comparison tables highlighting zero-commission digital store features.',
    },
    {
      id: 'rec-3',
      title: 'Optimize AI Search Crawler Access (robots.txt)',
      category: 'Prompt Engineering',
      impact: 'HIGH',
      description: 'Ensure GPTBot, PerplexityBot, and Google-Extended crawlers are explicitly allowed in robots.txt.',
      actionItem: 'Update robots.txt to explicitly whitelist AI user-agents for deep page crawling.',
    },
    {
      id: 'rec-4',
      title: 'Strengthen Music & Creator Niche Authority',
      category: 'Brand Authority',
      impact: 'MEDIUM',
      description: `${brandName} is already #1 for musician merch links; reinforce this by publishing creator tutorials and smart link guides.`,
      actionItem: 'Distribute 3 high-DA articles on Spotify and tour date integrations.',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg">
            AI Generative SEO Action Plan
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Growth Opportunities & Tactical Recommendations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Prioritized engineering action items to boost {brandName}'s citation frequency across LLMs.
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
          <div className="text-xs text-slate-500 font-mono">Potential Score Lift</div>
          <div className="text-lg font-bold text-emerald-400 font-mono">+18 Points</div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {rec.category}
              </span>
              <span
                className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                  rec.impact === 'CRITICAL'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : rec.impact === 'HIGH'
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    : 'bg-indigo-500/10 text-indigo-300'
                }`}
              >
                {rec.impact} IMPACT
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {rec.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                {rec.description}
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold flex items-center gap-1">
                <Target className="w-3 h-3 text-emerald-400" />
                <span>Actionable Step</span>
              </div>
              <p className="text-xs text-slate-200 font-mono">
                {rec.actionItem}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Strengths & Weaknesses Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Key Strengths */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Core Brand Strengths in LLM Searches
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400">1. Top Organic Mention Share</div>
              <p className="text-slate-300">Cited in 80%+ of prompts requesting general bio link tools or band tour/merch consolidation.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400">2. Strong Domain Trust (DA 85+)</div>
              <p className="text-slate-300">High backlink signals from major tech publications force LLMs to recommend the brand as default.</p>
            </div>
          </div>
        </div>

        {/* Identified Weaknesses */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Identified Vulnerabilities & Vulnerabilities
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">1. E-Commerce Commission Messaging</div>
              <p className="text-slate-300">LLMs occasionally note paid transaction fee tiers, causing price-sensitive users to consider alternatives.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">2. Low Schema Density</div>
              <p className="text-slate-300">Missing explicit Product and HowTo JSON-LD markup on feature pages limits structured LLM indexing.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
