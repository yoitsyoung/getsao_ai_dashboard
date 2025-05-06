import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { StatCard } from './ui/StatCard';

const AggregateStats: React.FC = () => {
  const { data } = useAnalytics();
  const { aggregateStats } = data;

  const statColors = {
    positive: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      accent: 'bg-blue-600'
    },
    official: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      accent: 'bg-emerald-600'
    },
    relevant: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      accent: 'bg-purple-600'
    },
    useful: {
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      border: 'border-gray-200',
      accent: 'bg-gray-600'
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Aggregate Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Positive" 
          value={`${aggregateStats.positive}%`} 
          colors={statColors.positive}
        />
        
        <StatCard 
          title="Official" 
          value={`${aggregateStats.official}%`} 
          colors={statColors.official}
        />
        
        <StatCard 
          title="Relevant" 
          value={`${aggregateStats.relevant}%`} 
          colors={statColors.relevant}
        />
        
        <StatCard 
          title="Useful" 
          value={`${aggregateStats.useful}%`} 
          colors={statColors.useful}
        />
      </div>
    </div>
  );
};

export default AggregateStats;