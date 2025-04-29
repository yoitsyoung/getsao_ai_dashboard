import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { formatDate } from '../../utils/formatters';
import { RefreshCw, Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const RankingHeader: React.FC = () => {
  const { data, refreshData } = useAnalytics();
  const { metadata } = data;
  const location = useLocation();
  const selectedPrompt = location.state?.prompt || 'No prompt selected';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ranking Prompt Analytics</h1>
          <p className="text-lg text-gray-600 mt-1">Prompt Performance Analysis</p>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">Selected Prompt: <span className="font-medium">{selectedPrompt}</span></p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 md:mt-0 gap-4">
          <div className="bg-blue-50 py-2 px-4 rounded-md">
            <div className="text-xs text-blue-600 font-medium">No. of Runs</div>
            <div className="text-lg font-semibold text-blue-800">{metadata.totalRuns}</div>
          </div>
          
          <div className="bg-blue-50 py-2 px-4 rounded-md">
            <div className="text-xs text-blue-600 font-medium">Last Run</div>
            <div className="text-lg font-semibold text-blue-800">{formatDate(metadata.lastRun)}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-4">
          <PromptTag label="Superlative" value="most" />
          <PromptTag label="Quality" value="robust" />
          <PromptTag label="Category" value="L2 platform" />
          <PromptTag label="User Group" value="developers" />
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          onClick={refreshData}
        >
          <RefreshCw size={16} />
          <span>Refresh Data</span>
        </button>
        
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition-colors"
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

interface PromptTagProps {
  label: string;
  value: string;
}

const PromptTag: React.FC<PromptTagProps> = ({ label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-500">{label}:</span>
    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
      {value}
    </span>
  </div>
);

export default RankingHeader;