import React from 'react';
import { CompleteReportData } from '../../types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity } from 'lucide-react';

interface ChartsTabProps {
  reportData: CompleteReportData;
}

export const ChartsTab: React.FC<ChartsTabProps> = ({ reportData }) => {
  const brandName = reportData.brand_name || 'Brand';
  const score = reportData.visibility_dashboard_data?.visibilityScore?.score || 77;
  const competitors = reportData.visibility_dashboard_data?.competitors || [];

  // Timeline Data
  const timelineData = [
    { month: 'Jan', brand: 52, avgCompetitor: 30 },
    { month: 'Feb', brand: 58, avgCompetitor: 32 },
    { month: 'Mar', brand: 61, avgCompetitor: 31 },
    { month: 'Apr', brand: 67, avgCompetitor: 33 },
    { month: 'May', brand: 72, avgCompetitor: 35 },
    { month: 'Jun', brand: 75, avgCompetitor: 34 },
    { month: 'Jul', brand: score, avgCompetitor: 36 },
  ];

  // Competitor Comparison Bar Data
  const barData = [
    { name: brandName, score: score, fill: '#6366f1' },
    ...competitors.map((c) => ({
      name: c.name,
      score: c.score,
      fill: '#a855f7',
    })),
  ];

  // Intent Distribution Pie Data
  const pieData = [
    { name: 'Informational', value: 35, color: '#6366f1' },
    { name: 'Commercial', value: 30, color: '#a855f7' },
    { name: 'Transactional', value: 20, color: '#ec4899' },
    { name: 'Investigational', value: 15, color: '#10b981' },
  ];

  // Radar Data
  const radarData = [
    { subject: 'Brand Authority', A: 90, B: 60, fullMark: 100 },
    { subject: 'E-commerce Links', A: 82, B: 70, fullMark: 100 },
    { subject: 'Social Media', A: 95, B: 55, fullMark: 100 },
    { subject: 'Email Capture', A: 65, B: 85, fullMark: 100 },
    { subject: 'Custom Domains', A: 78, B: 62, fullMark: 100 },
    { subject: 'Analytics Depth', A: 88, B: 58, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg">
            High-Fidelity Recharts Engine
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Visual Data Analytics & LLM Metrics
          </h2>
        </div>
      </div>

      {/* Grid Row 1: Timeline Area & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Timeline Area Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              AI Visibility Growth Timeline (2026)
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">+25% Growth</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="brand" name={brandName} stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBrand)" />
                <Area type="monotone" dataKey="avgCompetitor" name="Industry Avg" stroke="#a855f7" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorComp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Capability Radar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Category Strength Radar
            </h3>
            <span className="text-xs font-mono text-purple-300">6 Dimensions</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name={brandName} dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Radar name="Peers" dataKey="B" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Grid Row 2: Bar Comparison & Intent Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Competitor Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Share of Voice Score Comparison
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Intent Distribution Donut Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-pink-400" />
              User Search Intent Distribution
            </h3>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
