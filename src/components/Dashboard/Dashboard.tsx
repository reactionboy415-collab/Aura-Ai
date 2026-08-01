import React, { useState } from 'react';
import { CompleteReportData } from '../../types';
import { getFaviconUrl } from '../../lib/favicon';
import { OverviewTab } from './OverviewTab';
import { AiSummaryTab } from './AiSummaryTab';
import { CompetitorAnalysisTab } from './CompetitorAnalysisTab';
import { PromptAnalysisTab } from './PromptAnalysisTab';
import { ChartsTab } from './ChartsTab';
import { RecommendationsTab } from './RecommendationsTab';
import { SourcesTab } from './SourcesTab';
import { SeoTab } from './SeoTab';
import {
  Trophy,
  BarChart3,
  Bot,
  Users,
  Search,
  Sparkles,
  Globe,
  Code2,
  Download,
  Share2,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface DashboardProps {
  reportData: CompleteReportData;
  onNewAudit: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  reportData,
  onNewAudit,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'ai_summary' | 'competitors' | 'prompts' | 'charts' | 'recommendations' | 'sources' | 'seo'
  >('overview');

  const brandName = reportData.brand_name || 'Brand';
  const score = reportData.visibility_dashboard_data?.visibilityScore?.score || 77;
  const brandFavicon = getFaviconUrl(reportData.website_url || brandName);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Trophy },
    { id: 'ai_summary', label: 'AI Responses', icon: Bot },
    { id: 'competitors', label: 'Competitors', icon: Users },
    { id: 'prompts', label: 'Prompt Analysis', icon: Search },
    { id: 'charts', label: 'Charts & Graphs', icon: BarChart3 },
    { id: 'recommendations', label: 'Action Plan', icon: Zap },
    { id: 'sources', label: 'Sources', icon: Globe },
    { id: 'seo', label: 'Generative SEO', icon: Code2 },
  ] as const;

  const exportReportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${brandName}_AuraAI_Visibility_Report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white p-4 sm:p-6 md:p-8 relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 backdrop-blur-xl">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-indigo-500/30 p-2 shadow-xl shadow-indigo-500/20 flex items-center justify-center shrink-0">
              <img
                src={brandFavicon}
                alt={brandName}
                className="w-10 h-10 object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-2xl font-bold text-indigo-400 font-mono hidden group-has-[img[style*='display: none']]:inline">
                {brandName.charAt(0)}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{brandName}</h1>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  Rank #1 Leader
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Website: <span className="text-indigo-300">{reportData.website_url}</span> • Report ID: <span className="text-slate-500">{reportData.id}</span>
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto justify-end">
            <button
              onClick={exportReportJson}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={onNewAudit}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Audit</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 p-1.5 bg-slate-900/80 border border-slate-800/80 rounded-2xl scrollbar-none">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab View Switcher */}
        <div className="transition-all duration-300">
          {activeTab === 'overview' && <OverviewTab reportData={reportData} />}
          {activeTab === 'ai_summary' && <AiSummaryTab reportData={reportData} />}
          {activeTab === 'competitors' && <CompetitorAnalysisTab reportData={reportData} />}
          {activeTab === 'prompts' && <PromptAnalysisTab reportData={reportData} />}
          {activeTab === 'charts' && <ChartsTab reportData={reportData} />}
          {activeTab === 'recommendations' && <RecommendationsTab reportData={reportData} />}
          {activeTab === 'sources' && <SourcesTab reportData={reportData} />}
          {activeTab === 'seo' && <SeoTab reportData={reportData} />}
        </div>

      </div>
    </div>
  );
};
