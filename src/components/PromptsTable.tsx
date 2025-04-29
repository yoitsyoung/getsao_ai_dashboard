import React, { useState } from 'react';
import { RotateCw, Upload } from 'lucide-react';
import { Modal } from './ui/Modal';
import { useNavigate } from 'react-router-dom';

interface Prompt {
  id: number;
  text: string;
  type: 'direct' | 'ranking';
  ranking?: number;
  numberOfRuns: number;
  lastRunDateTime: string;
}

const mockPrompts: Prompt[] = [
  { 
    id: 1, 
    text: 'best TechBehemoths product for productivity', 
    type: 'direct',
    ranking: 1,
    numberOfRuns: 15,
    lastRunDateTime: '2024-04-28 14:30:00'
  },
  { 
    id: 2, 
    text: 'TechBehemoths reviews for high performance', 
    type: 'direct',
    ranking: 2,
    numberOfRuns: 12,
    lastRunDateTime: '2024-04-28 13:45:00'
  },
  { 
    id: 3, 
    text: 'stylish TechBehemoths gadgets with nice design', 
    type: 'direct',
    ranking: 3,
    numberOfRuns: 8,
    lastRunDateTime: '2024-04-27 16:20:00'
  },
  { 
    id: 4, 
    text: 'TechBehemoths laptops for gaming', 
    type: 'direct',
    ranking: 4,
    numberOfRuns: 20,
    lastRunDateTime: '2024-04-28 15:10:00'
  },
  { 
    id: 5, 
    text: 'affordable TechBehemoths devices for students', 
    type: 'direct',
    ranking: 5,
    numberOfRuns: 10,
    lastRunDateTime: '2024-04-27 11:30:00'
  },
  { 
    id: 6, 
    text: 'TechBehemoths products with great battery life', 
    type: 'ranking',
    numberOfRuns: 18,
    lastRunDateTime: '2024-04-28 10:15:00'
  },
  { 
    id: 7, 
    text: 'TechBehemoths accessories for home office setup', 
    type: 'ranking',
    numberOfRuns: 14,
    lastRunDateTime: '2024-04-28 09:30:00'
  },
  { 
    id: 8, 
    text: 'TechBehemoths family pack electronics sale', 
    type: 'ranking',
    numberOfRuns: 7,
    lastRunDateTime: '2024-04-27 14:45:00'
  },
  { 
    id: 9, 
    text: 'lightweight TechBehemoths tablet for travel', 
    type: 'ranking',
    numberOfRuns: 22,
    lastRunDateTime: '2024-04-28 16:20:00'
  },
  { 
    id: 10, 
    text: 'TechBehemoths products with no bloatware', 
    type: 'ranking',
    numberOfRuns: 16,
    lastRunDateTime: '2024-04-28 11:40:00'
  }
];

const PromptsTable: React.FC = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchPrompts, setBatchPrompts] = useState('');
  const [activeTab, setActiveTab] = useState<'direct' | 'ranking'>('direct');
  const promptsPerPage = 10;

  const filteredPrompts = prompts.filter(prompt => prompt.type === activeTab);
  const totalPages = Math.ceil(filteredPrompts.length / promptsPerPage);
  const startIndex = (currentPage - 1) * promptsPerPage;
  const endIndex = startIndex + promptsPerPage;
  const currentPrompts = filteredPrompts.slice(startIndex, endIndex);

  const handlePromptClick = (prompt: Prompt) => {
    navigate(`/prompts/${prompt.id}`);
  };

  const handleCheckboxChange = (promptId: number) => {
    setSelectedPrompts(prev => {
      if (prev.includes(promptId)) {
        return prev.filter(id => id !== promptId);
      } else {
        return [...prev, promptId];
      }
    });
  };

  const handleGenerateReport = () => {
    const selectedPromptData = prompts.filter(prompt => selectedPrompts.includes(prompt.id));
    console.log('Selected prompts for report:', selectedPromptData);
    // Here you would implement the actual report generation logic
  };

  const handleBatchUpload = () => {
    const newPrompts = batchPrompts
      .split('\n')
      .filter(text => text.trim())
      .map((text, index) => ({
        id: prompts.length + index + 1,
        text: text.trim(),
        type: activeTab,
        ranking: activeTab === 'direct' ? prompts.length + index + 1 : undefined,
        numberOfRuns: 0,
        lastRunDateTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }));

    setPrompts(prev => [...prev, ...newPrompts]);
    setBatchPrompts('');
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TechBehemoths</h1>
                <p className="text-sm text-gray-500 mt-1">Prompt Management</p>
              </div>
              <input
                type="text"
                placeholder="Project Name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <RotateCw size={16} />
                Refresh
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Upload size={16} />
                Batch Upload
              </button>
              <button 
                onClick={handleGenerateReport}
                disabled={selectedPrompts.length === 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedPrompts.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <RotateCw size={16} />
                Generate Report ({selectedPrompts.length})
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => {
                setActiveTab('direct');
                setCurrentPage(1);
              }}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'direct'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Direct Prompts
            </button>
            <button
              onClick={() => {
                setActiveTab('ranking');
                setCurrentPage(1);
              }}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'ranking'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ranking Prompts
            </button>
          </nav>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-sm font-medium text-gray-500 p-4 border-b border-gray-200">
                  Prompt
                </th>
                {activeTab === 'direct' && (
                  <th className="text-center text-sm font-medium text-gray-500 p-4 border-b border-gray-200 w-24">
                    Ranking
                  </th>
                )}
                <th className="text-center text-sm font-medium text-gray-500 p-4 border-b border-gray-200 w-24">
                  Number of Runs
                </th>
                <th className="text-center text-sm font-medium text-gray-500 p-4 border-b border-gray-200 w-40">
                  Last Run
                </th>
                <th className="text-center text-sm font-medium text-gray-500 p-4 border-b border-gray-200 w-12">
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPrompts.map((prompt) => (
                <tr 
                  key={prompt.id} 
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td 
                    className="p-4 text-sm text-gray-900 cursor-pointer"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <span className="text-blue-600 hover:text-blue-800">{prompt.text}</span>
                  </td>
                  {activeTab === 'direct' && (
                    <td className="p-4 text-center text-sm text-gray-900">
                      {prompt.ranking}
                    </td>
                  )}
                  <td className="p-4 text-center text-sm text-gray-900">
                    {prompt.numberOfRuns}
                  </td>
                  <td className="p-4 text-center text-sm text-gray-900">
                    {prompt.lastRunDateTime}
                  </td>
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedPrompts.includes(prompt.id)}
                      onChange={() => handleCheckboxChange(prompt.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              第 {startIndex + 1}-{Math.min(endIndex, filteredPrompts.length)} 条/总共 {filteredPrompts.length} 条
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                ←
              </button>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setBatchPrompts('');
        }}
        title={`Batch Upload ${activeTab === 'direct' ? 'Direct' : 'Ranking'} Prompts`}
      >
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Enter one prompt per line. Each line will be added as a separate {activeTab} prompt.
          </p>
          <textarea
            value={batchPrompts}
            onChange={(e) => setBatchPrompts(e.target.value)}
            className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter prompts here..."
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setBatchPrompts('');
              }}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBatchUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Prompts
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PromptsTable;