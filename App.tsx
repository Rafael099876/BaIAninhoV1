
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import FloatingChat from './components/FloatingChat';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </main>
        <FloatingChat />
      </div>
    </HashRouter>
  );
};

export default App;
