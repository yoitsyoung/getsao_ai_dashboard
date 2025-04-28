import { AnalyticsData } from '../types/analytics';

// Generate dates for the last 30 days
const getDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

// Generate random historical data with some trend
const generateHistoricalData = () => {
  const dates = getDates();
  return dates.map(date => {
    // Create somewhat realistic looking trends
    const dayNum = new Date(date).getDate();
    const baseRanking = 35 + Math.sin(dayNum / 5) * 10;
    const baseOfficial = 15 + Math.cos(dayNum / 4) * 8;
    const baseReferenced = 30 + Math.sin(dayNum / 3) * 10;
    
    return {
      date,
      ranking: Math.round(baseRanking + Math.random() * 10),
      official: Math.round(baseOfficial + Math.random() * 10),
      referenced: Math.round(baseReferenced + Math.random() * 10),
      unrelated: Math.round(100 - baseRanking - baseOfficial - baseReferenced + Math.random() * 5)
    };
  });
};

// Example URLs for citations
const exampleUrls = [
  'docs.getsao.ai/api/v1',
  'research.university.edu/papers/2023',
  'github.com/getsao/examples',
  'stackoverflow.com/questions/123456',
  'medium.com/ai-insights/prompt-engineering',
  'ai-community.org/resources',
  'developer.mozilla.org/en-US/docs',
  'kaggle.com/datasets/nlp',
  'research.google/pubs/pub123456',
  'arxiv.org/abs/2301.00001'
];

// Source categories
const categoryNames = [
  'Official Documentation',
  'Academic Papers',
  'Forums & Q&A',
  'Tutorials',
  'Blogs',
  'Research Publications'
];

export const mockAnalyticsData: AnalyticsData = {
  metadata: {
    totalRuns: 43,
    lastRun: '2023-10-04T09:00:00Z'
  },
  aggregateStats: {
    ranking: 40,
    official: 20,
    referenced: 30,
    unrelated: 10
  },
  historicalData: generateHistoricalData(),
  sourceCitations: exampleUrls.map((url, index) => ({
    url,
    count: Math.floor(Math.random() * 20) + 1,
    category: categoryNames[Math.floor(Math.random() * categoryNames.length)]
  })),
  sourceCategories: categoryNames.map(name => ({
    name,
    count: Math.floor(Math.random() * 30) + 5,
    examples: exampleUrls
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .filter(() => Math.random() > 0.5)
  })),
  sourceCounts: {
    connected: 124,
    main: 37,
    official: 16,
    total: 159
  }
};