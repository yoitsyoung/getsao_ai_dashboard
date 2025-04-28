export interface RunMetadata {
  totalRuns: number;
  lastRun: string;
}

export interface AggregateStats {
  ranking: number;
  official: number;
  referenced: number;
  unrelated: number;
}

export interface SourceCounts {
  connected: number;
  main: number;
  official: number;
  total: number;
}

export interface HistoricalDataPoint {
  date: string;
  ranking: number;
  official: number;
  referenced: number;
  unrelated: number;
}

export interface SourceCitation {
  url: string;
  count: number;
  category: string;
}

export interface SourceCategory {
  name: string;
  count: number;
  examples: string[];
}

export interface AnalyticsData {
  metadata: RunMetadata;
  aggregateStats: AggregateStats;
  historicalData: HistoricalDataPoint[];
  sourceCitations: SourceCitation[];
  sourceCategories: SourceCategory[];
  sourceCounts: SourceCounts;
}