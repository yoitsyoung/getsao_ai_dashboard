import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  colors: {
    bg: string;
    text: string;
    border: string;
    accent: string;
  };
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, colors }) => {
  return (
    <div className={`${colors.bg} rounded-lg border ${colors.border} p-4 transition-all duration-300 hover:shadow-md`}>
      <div className="flex flex-col">
        <span className={`text-sm font-medium ${colors.text}`}>{title}</span>
        <span className="text-2xl font-bold text-gray-900 mt-1">{value}</span>
        <div className="w-12 h-1 mt-2 rounded-full" style={{ backgroundColor: colors.accent }}></div>
      </div>
    </div>
  );
};