import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { Link2, Database, FileCheck, Hash } from 'lucide-react';

const MetricsPanel: React.FC = () => {
  const { data } = useAnalytics();
  const { sourceCounts } = data;
  
  const metrics = [
    {
      name: 'Connected Sources',
      value: sourceCounts.connected,
      icon: <Link2 size={20} className="text-blue-500" />,
      description: 'Total number of external sources connected to the system'
    },
    {
      name: 'Main Sources',
      value: sourceCounts.main,
      icon: <Database size={20} className="text-indigo-500" />,
      description: 'Primary data sources used for analysis'
    },
    {
      name: 'Official Sources',
      value: sourceCounts.official,
      icon: <FileCheck size={20} className="text-emerald-500" />,
      description: 'Sources from verified or official documentation'
    },
    {
      name: 'All No. of Sources',
      value: sourceCounts.total,
      icon: <Hash size={20} className="text-gray-500" />,
      description: 'Combined total of all sources in the system'
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full sticky top-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Metrics Summary</h2>
      
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="transition-all duration-300 hover:translate-x-1">
            <div className="flex items-center mb-1">
              {metric.icon}
              <span className="ml-2 text-gray-700 font-medium">{metric.name}</span>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
              <span className="ml-2 text-xs text-gray-500">{metric.description}</span>
            </div>
            
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  index === 0 ? 'bg-blue-500' : 
                  index === 1 ? 'bg-indigo-500' : 
                  index === 2 ? 'bg-emerald-500' : 
                  'bg-gray-500'
                }`}
                style={{ width: `${Math.min(100, (metric.value / 200) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsPanel;