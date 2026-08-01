import React, { useState } from 'react';
import { CompleteReportData } from '../../types';
import {
  Bot,
  Cpu,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  CheckCircle2,
  ListFilter,
} from 'lucide-react';

interface AiSummaryTabProps {
  reportData: CompleteReportData;
}

export const AiSummaryTab: React.FC<AiSummaryTabProps> = ({ reportData }) => {
  const meta = reportData.visibility_dashboard_data?._analysisMetadata;
  const promptResults = meta?.promptResults || [];
  const [expandedPromptIdx, setExpandedPromptIdx] = useState<number | null>(0);
  const [modelFilter, setModelFilter] = useState<'all' | 'gpt' | 'gemini'>('all');

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg">
              LLM Benchmark Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Models Evaluated: ChatGPT (GPT-4o-mini), Gemini (2.5 Flash)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Raw AI Search Engine Output Analysis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Inspect exactly how major LLMs respond to high-intent prompts regarding {reportData.brand_name}.
          </p>
        </div>

        {/* Model Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium">
          <button
            onClick={() => setModelFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              modelFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Models
          </button>
          <button
            onClick={() => setModelFilter('gpt')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              modelFilter === 'gpt'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>ChatGPT</span>
          </button>
          <button
            onClick={() => setModelFilter('gemini')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              modelFilter === 'gemini'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Gemini</span>
          </button>
        </div>
      </div>

      {/* Prompts Response Accordion List */}
      <div className="space-y-4">
        {promptResults.map((item, idx) => {
          const isExpanded = expandedPromptIdx === idx;
          const gptData = item.models['gpt-4o-mini'];
          const geminiData = item.models['gemini-2.5-flash'];

          return (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg transition-all"
            >
              {/* Accordion Header */}
              <div
                onClick={() => setExpandedPromptIdx(isExpanded ? null : idx)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors select-none"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      "{item.prompt}"
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Cited #1 for {reportData.brand_name}</span>
                      </span>
                      <span>•</span>
                      <span>{item.sources?.length || 0} Citation Sources</span>
                    </div>
                  </div>
                </div>

                <div className="text-slate-400">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Accordion Expanded Body */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-6">
                  
                  {/* Model Answers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* ChatGPT Response */}
                    {(modelFilter === 'all' || modelFilter === 'gpt') && (
                      <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                            <Bot className="w-4 h-4" />
                            <span>ChatGPT Response (GPT-4o)</span>
                          </div>
                          <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20">
                            Rank #1
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                          {gptData?.rawText || 'No response captured for this model.'}
                        </p>
                      </div>
                    )}

                    {/* Gemini Response */}
                    {(modelFilter === 'all' || modelFilter === 'gemini') && (
                      <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold font-mono">
                            <Cpu className="w-4 h-4" />
                            <span>Gemini Response (2.5 Flash)</span>
                          </div>
                          <span className="px-2 py-0.5 text-[10px] bg-purple-500/10 text-purple-300 rounded border border-purple-500/20">
                            Grounding Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                          {geminiData?.rawText || 'No response captured for this model.'}
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Sources Cited by AI */}
                  {item.sources && item.sources.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Cited Web Sources
                      </h4>
                      <div className="flex items-center flex-wrap gap-2">
                        {item.sources.map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-300 hover:text-white rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
                          >
                            <span>{src.title}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
