import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import FloatingChat from './components/FloatingChat';
import { AppProvider } from './contexts/AppContext';

const MainLayout = () => (
  <div className="flex flex-col h-screen bg-[#d9d9d9] dark:bg-slate-900 text-slate-800 dark:text-slate-100 page-transition">
    <Header />
    <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
      <Outlet />
    </main>
    <FloatingChat />
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;