import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { BarChart, Hash } from 'lucide-react';

const CategoriesSection: React.FC = () => {
  const { data } = useAnalytics();
  
  // Sort categories by count
  const sortedCategories = [...data.sourceCategories].sort((a, b) => b.count - a.count);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Categorization of Sources</h2>
      
      <div className="overflow-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {sortedCategories.map((category, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Hash size={16} className="text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-800">{category.name}</span>
              </div>
              <span className="text-sm bg-blue-50 text-blue-700 py-1 px-2 rounded-full">
                {category.count}
              </span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, (category.count / 30) * 100)}%` }}
              ></div>
            </div>
            
            {category.examples.length > 0 && (
              <div className="mt-2 pl-6">
                <div className="text-xs text-gray-500 italic">Examples:</div>
                <div className="text-xs text-gray-600 truncate">
                  {category.examples.join(', ')}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;