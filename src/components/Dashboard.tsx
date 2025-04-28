import React from 'react';
import Header from './Header';
import AggregateStats from './AggregateStats';
import HistoricalChart from './HistoricalChart';
import SourcesSection from './SourcesSection';
import CategoriesSection from './CategoriesSection';
import MetricsPanel from './MetricsPanel';
import { useAnalytics } from '../context/AnalyticsContext';
import { LoadingSpinner } from './ui/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h2 className="text-red-700 text-xl font-semibold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <AggregateStats />
          <HistoricalChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SourcesSection />
            <CategoriesSection />
          </div>
        </div>
        <div className="lg:col-span-1">
          <MetricsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;