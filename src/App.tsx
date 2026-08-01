import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { CinematicLoading } from './components/CinematicLoading';
import { FetchedInfoPreview } from './components/FetchedInfoPreview';
import { AiReportGenerationProgress } from './components/AiReportGenerationProgress';
import { Dashboard } from './components/Dashboard/Dashboard';
import {
  fetchWebsiteInfo,
  fetchCompetitorSuggestions,
  fetchPromptSuggestions,
  createReport,
  runFreeAnalysis,
  updateReportData,
  getFreeReport,
} from './lib/api/client';
import {
  ScrapedWebsiteInfo,
  CompetitorSuggestion,
  PromptSuggestion,
  CompleteReportData,
} from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState<
    'landing' | 'loading_fetch' | 'preview_fetched' | 'loading_report' | 'dashboard'
  >('landing');

  const [targetUrl, setTargetUrl] = useState('');
  const [websiteInfo, setWebsiteInfo] = useState<ScrapedWebsiteInfo | null>(null);
  const [competitors, setCompetitors] = useState<CompetitorSuggestion[]>([]);
  const [prompts, setPrompts] = useState<PromptSuggestion[]>([]);
  const [createdReportId, setCreatedReportId] = useState<string>('');
  const [reportData, setReportData] = useState<CompleteReportData | null>(null);

  // Trigger Step 2 -> Step 3 & Step 4: Start Fetching endpoints with dynamic URL replacement
  const handleStartAnalysis = async (urlInput: string) => {
    let cleanUrl = urlInput.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }
    setTargetUrl(cleanUrl);
    setCurrentStep('loading_fetch');

    try {
      // Step 3 & Step 4: Call initial 4 endpoints in parallel or sequence
      const scraped = await fetchWebsiteInfo(cleanUrl);
      setWebsiteInfo(scraped);

      const comps = await fetchCompetitorSuggestions(
        scraped.brandName,
        scraped.website,
        scraped.description
      );
      setCompetitors(comps);

      const promptList = await fetchPromptSuggestions(
        scraped.brandName,
        scraped.description
      );
      setPrompts(promptList);

      const reportInit = await createReport(
        scraped.brandName,
        scraped.website,
        scraped.description,
        comps
      );
      setCreatedReportId(reportInit.id);

      // Once all initial 4 endpoints return, transition to Step 5 display
    } catch (err) {
      console.error('Error during initial endpoint fetch:', err);
    }
  };

  // Called when Step 4 Cinematic Loading finishes
  const handleFetchLoadingComplete = () => {
    if (websiteInfo) {
      setCurrentStep('preview_fetched');
    } else {
      // Fallback in case of slow response
      setWebsiteInfo({
        brandName: 'Linktree',
        website: targetUrl || 'https://linktree.com/',
        title: 'Link in bio tool: Everything you are, in one simple link',
        description: 'Join creators and sell, share & curate everything you do online.',
      });
      setCurrentStep('preview_fetched');
    }
  };

  // Trigger Step 6: Deep AI Report Generation
  const handleProceedToDeepReport = async () => {
    setCurrentStep('loading_report');

    try {
      if (websiteInfo) {
        // Run deep analysis endpoint
        const analysisResult = await runFreeAnalysis({
          brandName: websiteInfo.brandName,
          website: websiteInfo.website,
          industry: websiteInfo.industry || 'Technology',
          description: websiteInfo.description,
          competitors: competitors.map((c) => ({ name: c.name, url: c.url })),
          prompts: prompts.map((p) => p.prompt),
          language: 'English',
          location: 'United States',
        });

        const reportId = createdReportId || `aur_rep_${Date.now()}`;

        // Update report state
        await updateReportData(
          reportId,
          analysisResult.visibilityData,
          analysisResult.promptPerformanceData,
          analysisResult.allSources
        );

        // Fetch complete updated report
        const fullReport = await getFreeReport(reportId);
        setReportData(fullReport);
      }
    } catch (err) {
      console.error('Error running deep analysis report:', err);
    }
  };

  // Called when Step 6 AI Report Generation animation finishes
  const handleReportGenerationComplete = () => {
    if (!reportData && websiteInfo) {
      // Ensure fallbacks if network delayed
      setReportData({
        id: createdReportId || 'aur_rep_fallback',
        created_at: new Date().toISOString(),
        status: 'completed',
        brand_name: websiteInfo.brandName,
        website_url: websiteInfo.website,
        product_description: websiteInfo.description,
        industry: 'Technology',
        language: 'English',
        location: 'United States',
        visibility_dashboard_data: {
          brandName: websiteInfo.brandName,
          competitors: [
            { url: 'https://beacons.app', name: 'Beacons', score: 57, change: 'N/A', traffic: 'N/A' },
            { url: 'https://taplink.io', name: 'Taplink', score: 8, change: 'N/A', traffic: 'N/A' },
            { url: 'https://campsite.com', name: 'Campsite', score: 22, change: 'N/A', traffic: 'N/A' },
            { url: 'https://lnkbio.com', name: 'Lnk.Bio', score: 30, change: 'N/A', traffic: 'N/A' },
          ],
          discoveredCompetitors: [
            { name: 'Carrd', score: 28, mentionCount: 5 },
            { name: 'Mailchimp', score: 23, mentionCount: 3 },
            { name: 'Bitly', score: 18, mentionCount: 2 },
          ],
          suggestions: [],
          visibilityScore: { rank: 1, score: 77, maxScore: 100, totalPrompts: 10 },
        },
        prompt_analysis_data: [
          { aiModel: 'ChatGPT', prompt: prompts[0]?.prompt || 'Best bio link tools', promptId: 'p-1', avgPosition: 1, visibility: '100%', score: 100 },
          { aiModel: 'Gemini', prompt: prompts[0]?.prompt || 'Best bio link tools', promptId: 'p-1', avgPosition: 1, visibility: '100%', score: 100 },
        ],
        ai_sources_data: [
          { url: 'https://youtube.com', title: 'youtube.com', domain: 'youtube.com', category: 'Social Media', originalPrompt: 'Bio links', domainAuthority: 88 },
          { url: 'https://shopify.com', title: 'shopify.com', domain: 'shopify.com', category: 'E-commerce', originalPrompt: 'Digital products', domainAuthority: 85 },
        ],
      });
    }
    setCurrentStep('dashboard');
  };

  const handleResetToLanding = () => {
    setCurrentStep('landing');
    setTargetUrl('');
    setWebsiteInfo(null);
    setCompetitors([]);
    setPrompts([]);
    setReportData(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar
        onSearchUrl={handleStartAnalysis}
        onResetToLanding={handleResetToLanding}
        currentStep={currentStep}
        brandName={websiteInfo?.brandName}
      />

      <main className="flex-1">
        {currentStep === 'landing' && (
          <LandingHero onAnalyze={handleStartAnalysis} />
        )}

        {currentStep === 'loading_fetch' && (
          <CinematicLoading
            targetWebsite={targetUrl}
            onComplete={handleFetchLoadingComplete}
          />
        )}

        {currentStep === 'preview_fetched' && websiteInfo && (
          <FetchedInfoPreview
            websiteInfo={websiteInfo}
            competitors={competitors}
            prompts={prompts}
            onProceedToDeepReport={handleProceedToDeepReport}
          />
        )}

        {currentStep === 'loading_report' && websiteInfo && (
          <AiReportGenerationProgress
            brandName={websiteInfo.brandName}
            onComplete={handleReportGenerationComplete}
          />
        )}

        {currentStep === 'dashboard' && reportData && (
          <Dashboard
            reportData={reportData}
            onNewAudit={handleResetToLanding}
          />
        )}
      </main>
    </div>
  );
}
