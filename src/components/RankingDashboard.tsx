import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { LoadingSpinner } from './ui/LoadingSpinner';
import RankingHeader from './ranking/RankingHeader';
import RankingBreakdown from './ranking/RankingBreakdown';
import CompetitorList from './ranking/CompetitorList';
import RankingSources from './ranking/RankingSources';

const RankingDashboard: React.FC = () => {
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
      <RankingHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          <RankingBreakdown />
        </div>
        <div className="lg:col-span-1">
          <CompetitorList />
        </div>
        <div className="lg:col-span-1">
          <RankingSources />
        </div>
      </div>
    </div>
  );
};

export default RankingDashboard;