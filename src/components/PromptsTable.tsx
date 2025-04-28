import React, { useState } from 'react';
import { RotateCw, Upload } from 'lucide-react';
import { Modal } from './ui/Modal';

interface Prompt {
  id: number;
  text: string;
}

const mockPrompts: Prompt[] = [
  { id: 1, text: 'best TechBehemoths product for productivity' },
  { id: 2, text: 'TechBehemoths reviews for high performance' },
  { id: 3, text: 'stylish TechBehemoths gadgets with nice design' },
  { id: 4, text: 'TechBehemoths laptops for gaming' },
  { id: 5, text: 'affordable TechBehemoths devices for students' },
  { id: 6, text: 'TechBehemoths products with great battery life' },
  { id: 7, text: 'TechBehemoths accessories for home office setup' },
  { id: 8, text: 'TechBehemoths family pack electronics sale' },
  { id: 9, text: 'lightweight TechBehemoths tablet for travel' },
  { id: 10, text: 'TechBehemoths products with no bloatware' }
];

const PromptsTable: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchPrompts, setBatchPrompts] = useState('');
  const promptsPerPage = 10;

  const totalPages = Math.ceil(prompts.length / promptsPerPage);
  const startIndex = (currentPage - 1) * promptsPerPage;
  const endIndex = startIndex + promptsPerPage;
  const currentPrompts = prompts.slice(startIndex, endIndex);

  const handleBatchUpload = () => {
    const newPrompts = batchPrompts
      .split('\n')
      .filter(text => text.trim())
      .map((text, index) => ({
        id: prompts.length + index + 1,
        text: text.trim()
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TechBehemoths</h1>
              <p className="text-sm text-gray-500 mt-1">Prompt Management</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Upload size={16} />
                Batch Upload
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <RotateCw size={16} />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-sm font-medium text-gray-500 p-4 border-b border-gray-200">
                  Prompt
                </th>
                <th className="text-right text-sm font-medium text-gray-500 p-4 border-b border-gray-200 w-24">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPrompts.map((prompt) => (
                <tr key={prompt.id} className="border-b border-gray-100 last:border-0">
                  <td className="p-4 text-sm text-gray-900">{prompt.text}</td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              第 {startIndex + 1}-{Math.min(endIndex, prompts.length)} 条/总共 {prompts.length} 条
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
        title="Batch Upload Prompts"
      >
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Enter one prompt per line. Each line will be added as a separate prompt.
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