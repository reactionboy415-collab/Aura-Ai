import React, { useState, useEffect } from 'react';
import {
  FileText,
  Bot,
  Sparkles,
  BarChart3,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface AiReportGenerationProgressProps {
  brandName: string;
  onComplete: () => void;
}

const REPORT_STEPS = [
  { id: 1, label: 'Generating Executive Summary...', icon: FileText, detail: 'Synthesizing market positioning & value proposition' },
  { id: 2, label: 'Running GPT-4o Analysis...', icon: Bot, detail: 'Executing ChatGPT prompt evaluations and citations' },
  { id: 3, label: 'Running Gemini 2.5 Analysis...', icon: Cpu, detail: 'Evaluating Gemini search grounding and domain authority' },
  { id: 4, label: 'Comparing Competitors...', icon: TrendingUp, detail: 'Calculating Share of Voice vs. direct rivals' },
  { id: 5, label: 'Calculating Visibility Score...', icon: BarChart3, detail: 'Computing weighted ranking score (77/100)' },
  { id: 6, label: 'Building Interactive Charts...', icon: Sparkles, detail: 'Generating radar, area, and intent breakdown charts' },
  { id: 7, label: 'Generating Recommendations...', icon: Zap, detail: 'Crafting prompt engineering & authority action items' },
  { id: 8, label: 'Generating Action Plan...', icon: ShieldCheck, detail: 'Assembling priority roadmap for brand growth' },
  { id: 9, label: 'Building Final Dashboard...', icon: CheckCircle2, detail: 'Rendering Apple-level executive SaaS dashboard' },
];

export const AiReportGenerationProgress: React.FC<AiReportGenerationProgressProps> = ({
  brandName,
  onComplete,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const totalSteps = REPORT_STEPS.length;
    const intervalTime = 550; // Fast 5s total animation

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
          }, 350);
          return prev;
        }
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentIcon = REPORT_STEPS[activeStepIndex]?.icon || Sparkles;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 animate-bounce">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                Step 6: AI Report Workflow
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Generating AI Intelligence for</span>
                <span className="text-purple-300 font-mono underline decoration-purple-500/40">
                  {brandName}
                </span>
              </h2>
            </div>
          </div>
          <div className="text-right font-mono">
            <div className="text-2xl font-extrabold text-purple-400">{progress}%</div>
            <div className="text-[10px] text-slate-500">Synthesizing</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>

        {/* Workflow List */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 font-mono text-xs">
          {REPORT_STEPS.map((step, idx) => {
            const isDone = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-500/10 scale-[1.01]'
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
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-slate-900 text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div
                      className={`font-semibold ${
                        isCurrent
                          ? 'text-purple-300'
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
                  {isCurrent && <span className="text-purple-400 font-bold uppercase animate-pulse">SYNTHESIZING</span>}
                  {!isDone && !isCurrent && <span className="text-slate-600 uppercase">WAITING</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span>Finalizing Apple-grade UI components & Recharts data...</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">LLM Mode: Dual</span>
        </div>

      </div>
    </div>
  );
};
