import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, TrendingUp, List } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    {
      path: '/',
      name: 'General Analytics',
      icon: <BarChart2 size={20} />
    },
    {
      path: '/ranking',
      name: 'Ranking Analytics',
      icon: <TrendingUp size={20} />
    },
    {
      path: '/prompts',
      name: 'Prompts',
      icon: <List size={20} />
    }
  ];
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">GetSAO.ai</h1>
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;