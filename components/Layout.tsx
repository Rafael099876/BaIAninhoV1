
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoIcon, DashboardIcon, ChatIcon, UserIcon } from './Icons';

const NavItem: React.FC<{ to: string; icon: React.ElementType; label: string }> = ({ to, icon: Icon, label }) => {
  const baseClasses = "flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200";
  const activeClasses = "bg-gray-800 text-white";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ''}`}
    >
      <Icon className="h-6 w-6 mr-3" />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <div className="flex items-center">
            <LogoIcon />
            <h1 className="text-xl font-bold ml-2 text-white">BaIAninho</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-4 py-4">
          <NavItem to="/" icon={DashboardIcon} label="Dashboard" />
          <NavItem to="/chat" icon={ChatIcon} label="Chat com IA" />
        </nav>
      </div>
    </div>
  );
};

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold text-white">Painel de Logística</h1>
        </div>
        <div className="flex items-center">
            <div className="p-2 rounded-full bg-gray-700">
                <UserIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-3 hidden sm:block">
                <p className="text-sm font-medium text-white">Gerente</p>
                <p className="text-xs text-gray-400">Casas Bahia</p>
            </div>
        </div>
    </header>
  );
};
