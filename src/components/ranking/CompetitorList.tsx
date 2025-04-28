import React from 'react';
import { Trophy, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const competitors = [
  { name: 'CompetitorA', rank: 95, change: 2 },
  { name: 'CompetitorB', rank: 88, change: -1 },
  { name: 'CompetitorC', rank: 82, change: 0 },
  { name: 'GetSAO.ai', rank: 78, change: 3 },
  { name: 'CompetitorD', rank: 75, change: -2 },
  { name: 'CompetitorE', rank: 70, change: 1 }
];

const CompetitorList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Competitor Rankings</h2>
      
      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${
              competitor.name === 'GetSAO.ai' 
                ? 'border-blue-200 bg-blue-50'
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {index === 0 && (
                  <Trophy size={16} className="text-yellow-500" />
                )}
                <span className={`font-medium ${
                  competitor.name === 'GetSAO.ai'
                    ? 'text-blue-900'
                    : 'text-gray-900'
                }`}>
                  {competitor.name}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  {competitor.rank}
                </span>
                <div className={`flex items-center ${
                  competitor.change > 0 
                    ? 'text-green-600'
                    : competitor.change < 0
                    ? 'text-red-600'
                    : 'text-gray-400'
                }`}>
                  {competitor.change > 0 ? (
                    <ArrowUp size={16} />
                  ) : competitor.change < 0 ? (
                    <ArrowDown size={16} />
                  ) : (
                    <Minus size={16} />
                  )}
                  <span className="text-sm ml-1">
                    {Math.abs(competitor.change)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  competitor.name === 'GetSAO.ai'
                    ? 'bg-blue-600'
                    : index === 0
                    ? 'bg-yellow-500'
                    : 'bg-gray-400'
                }`}
                style={{ width: `${competitor.rank}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorList;