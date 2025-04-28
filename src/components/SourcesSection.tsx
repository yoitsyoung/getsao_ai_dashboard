import React, { useState } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { ExternalLink } from 'lucide-react';

const SourcesSection: React.FC = () => {
  const { data } = useAnalytics();
  const [sortBy, setSortBy] = useState<'count' | 'url'>('count');
  
  // Sort source citations
  const sortedSources = [...data.sourceCitations].sort((a, b) => {
    if (sortBy === 'count') {
      return b.count - a.count;
    } else {
      return a.url.localeCompare(b.url);
    }
  });
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Sources (URLs) Cited</h2>
        
        <div className="flex text-sm">
          <button 
            className={`px-3 py-1 rounded-l-md ${
              sortBy === 'count' 
                ? 'bg-blue-100 text-blue-700 font-medium' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('count')}
          >
            By Count
          </button>
          <button 
            className={`px-3 py-1 rounded-r-md ${
              sortBy === 'url' 
                ? 'bg-blue-100 text-blue-700 font-medium' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('url')}
          >
            By URL
          </button>
        </div>
      </div>
      
      <div className="overflow-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <ul className="space-y-3">
          {sortedSources.map((source, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <div className="text-gray-700 max-w-[200px] truncate">
                  {source.url}
                </div>
                <ExternalLink size={14} className="ml-1 text-gray-400" />
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 bg-white py-1 px-2 rounded-full border border-gray-200">
                  {source.count}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SourcesSection;