import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import RankingDashboard from './components/RankingDashboard';
import PromptsTable from './components/PromptsTable';
import { AnalyticsProvider } from './context/AnalyticsContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ranking" element={<RankingDashboard />} />
            <Route path="/prompts" element={<PromptsTable />} />
          </Routes>
        </BrowserRouter>
      </AnalyticsProvider>
    </div>
  );
}

export default App;