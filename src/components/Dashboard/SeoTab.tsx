import React, { useState } from 'react';
import { CompleteReportData } from '../../types';
import { Code2, Copy, Check, FileCode, Globe, Bot, ShieldCheck } from 'lucide-react';

interface SeoTabProps {
  reportData: CompleteReportData;
}

export const SeoTab: React.FC<SeoTabProps> = ({ reportData }) => {
  const brandName = reportData.brand_name || 'Brand';
  const websiteUrl = reportData.website_url || 'https://example.com/';
  const description = reportData.product_description || 'Leading AI brand platform.';

  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedRobots, setCopiedRobots] = useState(false);

  const jsonLdSchema = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: brandName,
      url: websiteUrl,
      description: description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '12400',
      },
    },
    null,
    2
  );

  const robotsTxtContent = `# AI Search Crawler Directives for ${brandName}
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${websiteUrl}sitemap.xml`;

  const copyToClipboard = (text: string, isRobots: boolean) => {
    navigator.clipboard.writeText(text);
    if (isRobots) {
      setCopiedRobots(true);
      setTimeout(() => setCopiedRobots(false), 2000);
    } else {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg">
            Generative SEO & Technical Schema
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            AI Search Crawler Optimization (2026)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Optimized structured data and crawler rules to maximize LLM ingestion for {brandName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* JSON-LD Schema Block */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              Recommended JSON-LD Schema
            </h3>
            <button
              onClick={() => copyToClipboard(jsonLdSchema, false)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSchema ? 'Copied!' : 'Copy JSON-LD'}</span>
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-indigo-300 overflow-x-auto max-h-72">
            {jsonLdSchema}
          </pre>
        </div>

        {/* AI Robots.txt Rules */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              AI Search Crawler Directives (robots.txt)
            </h3>
            <button
              onClick={() => copyToClipboard(robotsTxtContent, true)}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              {copiedRobots ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRobots ? 'Copied!' : 'Copy robots.txt'}</span>
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto max-h-72">
            {robotsTxtContent}
          </pre>
        </div>

      </div>

    </div>
  );
};
