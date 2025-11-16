import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcon, UserIcon, CogIcon, SunIcon, MoonIcon, LogOutIcon } from './Icons';
import { useAppContext } from '../contexts/AppContext';


export const Header: React.FC = () => {
    const { theme, setTheme, language, setLanguage, t, profile, setProfile } = useAppContext();
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setIsSettingsOpen(false);
        setProfile(null);
        navigate('/');
    };

    const toggleTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
    };

    const toggleLanguage = (newLang: 'pt' | 'en') => {
        setLanguage(newLang);
    };

  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-[var(--brand-blue)] flex-shrink-0">
        <div className="flex items-center">
            <LogoIcon />
            <h1 className="text-xl font-bold ml-3 text-white">BaIAninho</h1>
            <div className="w-px h-6 bg-white/50 mx-4"></div>
            <h2 className="text-lg font-semibold text-white">{t('logisticsDashboard')}</h2>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center">
                <div className="p-2 rounded-full bg-white/20">
                    <UserIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium text-white">{profile ? t(profile as 'ceo' | 'manager') : 'Usuário'}</p>
                    <p className="text-xs text-white/80">{t('companyName')}</p>
                </div>
            </div>
            <div className="relative" ref={settingsRef}>
                <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Open settings"
                >
                    <CogIcon className="h-6 w-6 text-white" />
                </button>
                {isSettingsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 text-slate-800 dark:text-slate-200">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                            <h3 className="font-semibold">{t('settings')}</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="text-sm font-medium">{t('theme')}</label>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    <button onClick={() => toggleTheme('light')} className={`flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${theme === 'light' ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                                        <SunIcon className="w-5 h-5" /> {t('lightMode')}
                                    </button>
                                    <button onClick={() => toggleTheme('dark')} className={`flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${theme === 'dark' ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                                        <MoonIcon className="w-5 h-5" /> {t('darkMode')}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">{t('language')}</label>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    <button onClick={() => toggleLanguage('pt')} className={`px-3 py-2 text-sm rounded-md transition-colors ${language === 'pt' ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                                        Português
                                    </button>
                                    <button onClick={() => toggleLanguage('en')} className={`px-3 py-2 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                                        English
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-left text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                <LogOutIcon className="w-5 h-5" />
                                {t('logout')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </header>
  );
};