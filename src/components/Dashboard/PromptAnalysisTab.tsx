import React, { useState } from 'react';
import { CompleteReportData } from '../../types';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  ListFilter,
  Sparkles,
} from 'lucide-react';

interface PromptAnalysisTabProps {
  reportData: CompleteReportData;
}

export const PromptAnalysisTab: React.FC<PromptAnalysisTabProps> = ({
  reportData,
}) => {
  const promptPerf = reportData.prompt_analysis_data || [];
  const [selectedIntent, setSelectedIntent] = useState<string>('ALL');
  const [selectedModel, setSelectedModel] = useState<string>('ALL');

  // Filter unique prompts
  const filteredPrompts = promptPerf.filter((item) => {
    const matchesModel = selectedModel === 'ALL' || item.aiModel.toLowerCase() === selectedModel.toLowerCase();
    return matchesModel;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg">
            Search Matrix
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Prompt Performance & AI Ranking Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Detailed breakdown of how {reportData.brand_name} ranks for individual high-intent user prompts.
          </p>
        </div>

        {/* Model Filter */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono">
          <button
            onClick={() => setSelectedModel('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedModel === 'ALL' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Models
          </button>
          <button
            onClick={() => setSelectedModel('ChatGPT')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedModel === 'ChatGPT' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            ChatGPT
          </button>
          <button
            onClick={() => setSelectedModel('Gemini')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedModel === 'Gemini' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gemini
          </button>
        </div>
      </div>

      {/* Prompts Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-400" />
            Prompt Evaluation Log ({filteredPrompts.length} entries)
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Avg. Rank: #1.2
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">AI Model</th>
                <th className="py-3 px-4">Evaluated User Prompt</th>
                <th className="py-3 px-4 text-center">Position</th>
                <th className="py-3 px-4 text-center">Visibility</th>
                <th className="py-3 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredPrompts.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        item.aiModel === 'ChatGPT'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                      }`}
                    >
                      {item.aiModel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200 max-w-md">
                    "{item.prompt}"
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">
                    {item.avgPosition === 1 ? (
                      <span className="text-emerald-400 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Rank #1</span>
                      </span>
                    ) : item.avgPosition === 2 ? (
                      <span className="text-indigo-300">Rank #2</span>
                    ) : (
                      <span className="text-slate-500">Unranked</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-300">
                    {item.visibility}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-indigo-300">
                    {item.score}/100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
