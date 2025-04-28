import React from 'react';
import { ExternalLink, Link } from 'lucide-react';

const sources = [
  {
    url: 'docs.l2platform.com/comparison',
    relevance: 95,
    type: 'Official'
  },
  {
    url: 'research.blockchain.org/l2-analysis',
    relevance: 88,
    type: 'Research'
  },
  {
    url: 'defi-metrics.io/rankings',
    relevance: 82,
    type: 'Analytics'
  },
  {
    url: 'crypto-compare.net/platforms',
    relevance: 75,
    type: 'Community'
  }
];

const RankingSources: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Ranking Sources
      </h2>
      
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Link size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                  {source.url}
                </span>
                <ExternalLink size={14} className="text-gray-400" />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                source.type === 'Official'
                  ? 'bg-green-100 text-green-700'
                  : source.type === 'Research'
                  ? 'bg-purple-100 text-purple-700'
                  : source.type === 'Analytics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {source.type}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${source.relevance}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {source.relevance}% relevant
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingSources;