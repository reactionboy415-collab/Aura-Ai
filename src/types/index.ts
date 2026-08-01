export interface ScrapedWebsiteInfo {
  brandName: string;
  description: string;
  title: string;
  website: string;
  industry?: string;
  language?: string;
  location?: string;
}

export interface CompetitorSuggestion {
  name: string;
  url: string;
  justification: string;
  score?: number;
  traffic?: string;
  change?: string;
}

export interface PromptSuggestion {
  prompt: string;
  justification: string;
  intent: 'INFORMATIONAL' | 'COMMERCIAL' | 'INVESTIGATIONAL' | 'TRANSACTIONAL';
  topic: string;
}

export interface ReportCreateRequest {
  user_id: string | null;
  brand_name: string;
  website_url: string;
  product_description: string;
  industry: string;
  competitor_method: string;
  manual_competitors_input: string;
  onboarding_email: string;
  language: string;
  location: string;
  status: string;
}

export interface ReportCreateResponse {
  id: string;
  user_id: string | null;
  created_at: string;
  updated_at?: string;
  status: string;
  brand_name: string;
  website_url: string;
  product_description: string;
  industry: string;
  competitor_method: string;
  manual_competitors_input: string;
  onboarding_email: string;
  language: string;
  location: string;
  visibility_dashboard_data?: VisibilityDashboardData | null;
  prompt_analysis_data?: PromptPerformanceItem[] | null;
  ai_sources_data?: AiSourceItem[] | null;
}

export interface FreeAnalysisRunRequest {
  brandName: string;
  website: string;
  industry: string;
  description: string;
  competitors: Array<{ name: string; url: string }>;
  prompts: string[];
  language: string;
  location: string;
}

export interface PromptModelOutput {
  rawText: string;
  sources: Array<{ url: string; title: string }>;
}

export interface PromptAnalysisResult {
  rank: number;
  score: number;
  brandId?: string | null;
  sentiment?: string | null;
  entityName: string;
  competitorId?: string | null;
  mentionSummary: string;
  sentimentConfidence?: number | null;
}

export interface PromptResultItem {
  prompt: string;
  models: {
    'gpt-4o-mini'?: PromptModelOutput;
    'gemini-2.5-flash'?: PromptModelOutput;
    [key: string]: PromptModelOutput | undefined;
  };
  sources?: Array<{
    url: string;
    title: string;
    category?: string;
    domainAuthority?: number;
  }>;
  analysis?: PromptAnalysisResult[];
}

export interface DiscoveredCompetitor {
  name: string;
  score: number;
  mentionCount: number;
}

export interface CompetitorMetric {
  name: string;
  url: string;
  score: number;
  traffic: string;
  change: string;
}

export interface VisibilityDashboardData {
  brandName: string;
  competitors: CompetitorMetric[];
  discoveredCompetitors: DiscoveredCompetitor[];
  suggestions: string[];
  trafficValue?: {
    estimate: string;
    note: string | null;
    methodology: string;
  };
  freeAiTraffic?: {
    monthlyVisitors: string;
    change: string;
    topCompetitor: {
      name: string;
      traffic: string;
      change: string;
    };
    allCompetitors: any[];
  };
  visibilityScore: {
    rank: number;
    score: number;
    maxScore: number;
    totalPrompts: number;
  };
  _analysisMetadata?: {
    durationMs: number;
    modelCount: number;
    modelsUsed: string[];
    promptResults?: PromptResultItem[];
  };
}

export interface PromptPerformanceItem {
  aiModel: string;
  prompt: string;
  promptId: string;
  avgPosition: number;
  visibility: string;
  score: number;
}

export interface AiSourceItem {
  url: string;
  title: string;
  domain: string;
  category: string;
  originalPrompt: string;
  domainAuthority: number;
}

export interface CompleteReportData {
  id: string;
  user_id?: string | null;
  created_at: string;
  updated_at?: string;
  status: string;
  brand_name: string;
  website_url: string;
  product_description: string;
  industry: string;
  language: string;
  location: string;
  visibility_dashboard_data: VisibilityDashboardData | null;
  prompt_analysis_data: PromptPerformanceItem[] | null;
  ai_sources_data: AiSourceItem[] | null;
  subscription_status?: string;
}

export interface AiRecommendation {
  id: string;
  title: string;
  category: 'Prompt Engineering' | 'Brand Authority' | 'Technical SEO' | 'Competitor Defense';
  impact: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  actionItem: string;
}
