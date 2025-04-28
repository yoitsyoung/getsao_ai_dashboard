import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { LineGraph } from '../charts/LineGraph';
import { TrendingUp } from 'lucide-react';

const RankingBreakdown: React.FC = () => {
  const { data } = useAnalytics();
  
  // Get the current rank (using the last historical data point)
  const currentRank = data.historicalData[data.historicalData.length - 1]?.ranking || 0;
  
  // Prepare data for the historical chart
  const series = [{
    name: 'Ranking',
    data: data.historicalData.map(d => d.ranking),
    color: '#2563EB'
  }];
  
  const labels = data.historicalData.map(d => d.date);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Ranking Analysis</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Current Rank</div>
          <TrendingUp size={20} className="text-blue-500" />
        </div>
        <div className="text-4xl font-bold text-gray-900 mt-2">
          {currentRank}
          <span className="text-sm font-normal text-gray-500 ml-2">/ 100</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 mt-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${currentRank}%` }}
          ></div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">Historical Trend</div>
        </div>
        <div className="h-48">
          <LineGraph series={series} labels={labels} />
        </div>
      </div>
    </div>
  );
};

export default RankingBreakdown;