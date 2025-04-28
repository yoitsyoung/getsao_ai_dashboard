import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnalyticsData } from '../types/analytics';
import { mockAnalyticsData } from '../data/mockData';

interface AnalyticsContextType {
  data: AnalyticsData;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate data fetching
  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setData(mockAnalyticsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return (
    <AnalyticsContext.Provider value={{ data, loading, error, refreshData }}>
      {children}
    </AnalyticsContext.Provider>
  );
};