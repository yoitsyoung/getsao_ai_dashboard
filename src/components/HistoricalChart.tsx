import React, { useState } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { LineGraph } from './charts/LineGraph';

// Define time range options
type TimeRange = '7d' | '14d' | '30d' | 'all';

const HistoricalChart: React.FC = () => {
  const { data } = useAnalytics();
  const [timeRange, setTimeRange] = useState<TimeRange>('14d');
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    const allData = [...data.historicalData].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    if (timeRange === 'all') return allData;
    
    const days = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : 30;
    return allData.slice(-days);
  };
  
  const filteredData = getFilteredData();
  
  // Create series data for the chart
  const series = [
    {
      name: 'Ranking',
      data: filteredData.map(d => d.ranking),
      color: '#2563EB'
    },
    {
      name: 'Official',
      data: filteredData.map(d => d.official),
      color: '#10B981'
    },
    {
      name: 'Referenced',
      data: filteredData.map(d => d.referenced),
      color: '#8B5CF6'
    },
    {
      name: 'Unrelated',
      data: filteredData.map(d => d.unrelated),
      color: '#6B7280'
    }
  ];
  
  const labels = filteredData.map(d => d.date);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Historical Statistics</h2>
        
        <div className="flex space-x-2 mt-3 sm:mt-0">
          <TimeRangeButton 
            label="7D" 
            active={timeRange === '7d'} 
            onClick={() => setTimeRange('7d')} 
          />
          <TimeRangeButton 
            label="14D" 
            active={timeRange === '14d'} 
            onClick={() => setTimeRange('14d')} 
          />
          <TimeRangeButton 
            label="30D" 
            active={timeRange === '30d'} 
            onClick={() => setTimeRange('30d')} 
          />
          <TimeRangeButton 
            label="All" 
            active={timeRange === 'all'} 
            onClick={() => setTimeRange('all')} 
          />
        </div>
      </div>
      
      <div className="h-64 w-full">
        <LineGraph series={series} labels={labels} />
      </div>
    </div>
  );
};

interface TimeRangeButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TimeRangeButton: React.FC<TimeRangeButtonProps> = ({ label, active, onClick }) => (
  <button
    className={`px-3 py-1 text-sm rounded-md transition-colors ${
      active 
        ? 'bg-blue-100 text-blue-700 font-medium' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default HistoricalChart;