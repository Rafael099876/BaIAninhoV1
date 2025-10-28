
import React from 'react';
import { LogoIcon, UserIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center">
            <LogoIcon />
            <h1 className="text-xl font-bold ml-3 text-white">BaIAninho</h1>
            <div className="w-px h-6 bg-gray-600 mx-4"></div>
            <h2 className="text-lg font-semibold text-white">Painel de Logística</h2>
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
