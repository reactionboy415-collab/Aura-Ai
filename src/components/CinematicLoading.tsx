import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Loader2,
  Globe,
  Cpu,
  Bot,
  Search,
  Layers,
  Sparkles,
  BarChart3,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface CinematicLoadingProps {
  targetWebsite: string;
  onComplete: () => void;
}

const LOADING_STEPS = [
  { id: 1, label: 'Validating Website Structure', icon: Globe, detail: 'Checking HTTPS certificate and DOM availability' },
  { id: 2, label: 'Connecting AI Search Engine', icon: Cpu, detail: 'Establishing secure Gemini & GPT neural links' },
  { id: 3, label: 'Discovering Direct Competitors', icon: Search, detail: 'Identifying market peers and industry rivals' },
  { id: 4, label: 'Crawling Authority Pages', icon: Layers, detail: 'Analyzing structured schema and backlink trust' },
  { id: 5, label: 'Extracting Brand Identity', icon: Sparkles, detail: 'Parsing logos, descriptions, and value propositions' },
  { id: 6, label: 'Finding Industry Classification', icon: Bot, detail: 'Categorizing brand taxonomy and vertical niche' },
  { id: 7, label: 'Collecting AI Search Signals', icon: Zap, detail: 'Executing multi-intent search query matrix' },
  { id: 8, label: 'Processing Visibility Metrics', icon: BarChart3, detail: 'Computing Share of Voice and ranking position' },
  { id: 9, label: 'Building Final Intelligence Report', icon: CheckCircle2, detail: 'Synthesizing recommendations & visualization data' },
];

export const CinematicLoading: React.FC<CinematicLoadingProps> = ({
  targetWebsite,
  onComplete,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const totalSteps = LOADING_STEPS.length;
    const intervalTime = 600; // Fast 5.4s total cinematic flow

    const timer = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < totalSteps - 1) {
          const nextIndex = prev + 1;
          setProgress(Math.round(((nextIndex + 1) / totalSteps) * 100));
          return nextIndex;
        } else {
          clearInterval(timer);
          setProgress(100);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentIcon = LOADING_STEPS[activeStepIndex]?.icon || Sparkles;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Animated Gradient Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Floating Light Pulse */}
      <div className="w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse absolute pointer-events-none" />

      <div className="max-w-2xl w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative z-10 space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 animate-bounce">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                Step 4 of Core Workflow
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Analyzing</span>
                <span className="text-indigo-300 font-mono underline decoration-indigo-500/40">
                  {targetWebsite}
                </span>
              </h2>
            </div>
          </div>
          <div className="text-right font-mono">
            <div className="text-2xl font-extrabold text-indigo-400">{progress}%</div>
            <div className="text-[10px] text-slate-500">Processing</div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>

        {/* Step List Sequence */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 font-mono text-xs">
          {LOADING_STEPS.map((step, idx) => {
            const isDone = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10 scale-[1.01]'
                    : isDone
                    ? 'bg-slate-950/60 border-slate-800/80 opacity-80'
                    : 'bg-slate-950/20 border-slate-900 opacity-40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isDone
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : isCurrent
                        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        : 'bg-slate-900 text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div
                      className={`font-semibold ${
                        isCurrent
                          ? 'text-indigo-300'
                          : isDone
                          ? 'text-slate-200'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </div>
                    {isCurrent && (
                      <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                        {step.detail}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-[10px]">
                  {isDone && <span className="text-emerald-400 font-bold uppercase">DONE</span>}
                  {isCurrent && <span className="text-indigo-400 font-bold uppercase animate-pulse">RUNNING</span>}
                  {!isDone && !isCurrent && <span className="text-slate-600 uppercase">WAITING</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Status Ticker Footer */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            <span>Synthesizing API payloads & live LLM models...</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">Latency: 14ms</span>
        </div>

      </div>
    </div>
  );
};
