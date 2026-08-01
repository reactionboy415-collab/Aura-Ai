import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  Bot,
  Layers,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Globe,
  ArrowRight,
  ChevronRight,
  Flame,
  MousePointer2,
} from 'lucide-react';

interface LandingHeroProps {
  onAnalyze: (url: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onAnalyze }) => {
  const [url, setUrl] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const sampleDomains = [
    'openai.com',
    'vercel.com',
    'notion.so',
    'github.com',
    'me.io',
    'linktree.com',
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Dynamic Mouse Glow Backdrop */}
      <div
        className="pointer-events-none absolute -inset-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
        }}
      />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Animated Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Hero Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10 flex-1 flex flex-col justify-center items-center text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500 shadow-sm shadow-indigo-500/10">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>AI Search Visibility & Brand Intelligence Audit</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6">
          How Does <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">ChatGPT & Gemini</span> Perceive Your Brand?
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mb-10 leading-relaxed font-light">
          Unlock instant AI Search Engine Share of Voice, prompt ranking benchmarks, competitor steal matrices, and generative SEO recommendations across all major LLMs.
        </p>

        {/* Interactive URL Search Form (Step 2) */}
        <div className="w-full max-w-2xl mb-6">
          <form
            onSubmit={handleSubmit}
            className="p-2 bg-slate-900/90 border border-slate-800 focus-within:border-indigo-500/60 rounded-2xl shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl transition-all relative group"
          >
            <div className="flex items-center gap-3 px-3">
              <Globe className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <input
                type="text"
                placeholder="Enter your website URL (e.g. vercel.com or me.io)..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent py-3.5 text-sm sm:text-base text-white placeholder-slate-500 outline-none font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Run AI Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Domain Presets */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            <span className="text-xs text-slate-500 font-mono">Try examples:</span>
            {sampleDomains.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => {
                  setUrl(domain);
                  onAnalyze(domain);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 text-xs font-mono transition-all"
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Live Statistics & Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mt-10">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">77%</div>
            <p className="text-xs text-slate-400 mt-1">Avg. AI Share of Voice</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">1.2M+</div>
            <p className="text-xs text-slate-400 mt-1">Prompts Benchmarked</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">99.8%</div>
            <p className="text-xs text-slate-400 mt-1">AI Citation Accuracy</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono">2 LLMs</div>
            <p className="text-xs text-slate-400 mt-1">ChatGPT & Gemini</p>
          </div>
        </div>

        {/* Glassmorphism Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-16 text-left">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multi-LLM Prompt Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track how ChatGPT and Gemini handle commercial, transactional, and investigational queries for your industry in real-time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-purple-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Competitor Steal Matrix</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover which competitors are being cited ahead of your brand in AI search results and execute targeted counter-strategies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-pink-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4 text-pink-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Generative Geo-SEO Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extract JSON-LD schemas, AI crawler rules, and structured authority links to maximize AI recommendation frequency.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Banner */}
      <footer className="border-t border-slate-900 py-6 bg-slate-950/80 relative z-10 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Brand Intelligence Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
