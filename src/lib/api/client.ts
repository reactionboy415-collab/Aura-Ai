import {
  ScrapedWebsiteInfo,
  CompetitorSuggestion,
  PromptSuggestion,
  ReportCreateResponse,
  FreeAnalysisRunRequest,
  CompleteReportData,
} from '../../types';

/**
 * Client-side API Service that interacts with all 7 reverse-engineered backend endpoints.
 * Dynamically replaces captured target URLs with user-entered website values.
 */

export async function fetchWebsiteInfo(websiteUrl: string): Promise<ScrapedWebsiteInfo> {
  const encoded = encodeURIComponent(websiteUrl);
  const response = await fetch(`/api/scrape-website-info?url=${encoded}`);
  if (!response.ok) {
    throw new Error(`Failed to scrape website info: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchCompetitorSuggestions(
  brandName: string,
  websiteUrl: string,
  description: string,
  industry: string = 'Technology'
): Promise<CompetitorSuggestion[]> {
  const response = await fetch('/api/competitors/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      brandName,
      url: websiteUrl,
      description,
      industry,
      strategy: 'direct',
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to suggest competitors: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchPromptSuggestions(
  brandName: string,
  description: string,
  industry: string = 'Technology',
  language: string = 'English'
): Promise<PromptSuggestion[]> {
  const response = await fetch('/api/prompts/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      brandName,
      description,
      industry,
      language,
      strategy: 'discovery',
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to suggest prompts: ${response.statusText}`);
  }
  return response.json();
}

export async function createReport(
  brandName: string,
  websiteUrl: string,
  description: string,
  competitorsList: CompetitorSuggestion[],
  industry: string = 'Technology',
  userEmail: string = 'user@example.com'
): Promise<ReportCreateResponse> {
  const manualCompetitorsInput = competitorsList.map((c) => c.name).join(',');
  const response = await fetch('/api/reports/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: null,
      brand_name: brandName,
      website_url: websiteUrl,
      product_description: description,
      industry,
      competitor_method: 'auto',
      manual_competitors_input: manualCompetitorsInput,
      onboarding_email: userEmail,
      language: 'English',
      location: 'United States',
      status: 'processing',
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to create report: ${response.statusText}`);
  }
  return response.json();
}

export async function runFreeAnalysis(
  payload: FreeAnalysisRunRequest
): Promise<any> {
  const response = await fetch('/api/free-analysis/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to run free analysis: ${response.statusText}`);
  }
  return response.json();
}

export async function updateReportData(
  reportId: string,
  visibilityDashboardData: any,
  promptAnalysisData: any[],
  aiSourcesData: any[]
): Promise<ReportCreateResponse> {
  const response = await fetch('/api/reports/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: reportId,
      data: {
        visibility_dashboard_data: visibilityDashboardData,
        prompt_analysis_data: promptAnalysisData,
        ai_sources_data: aiSourcesData,
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to update report: ${response.statusText}`);
  }
  return response.json();
}

export async function getFreeReport(reportId: string): Promise<CompleteReportData> {
  const response = await fetch(`/api/getfreereport?reportId=${encodeURIComponent(reportId)}`);
  if (!response.ok) {
    throw new Error(`Failed to get report: ${response.statusText}`);
  }
  return response.json();
}
