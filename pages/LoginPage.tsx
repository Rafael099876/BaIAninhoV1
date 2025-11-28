import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, BriefcaseIcon } from '../components/Icons';
import { useAppContext, Profile } from '../contexts/AppContext';

const RoleCard: React.FC<{ title: string; icon: React.ElementType; onClick: () => void }> = ({ title, icon: Icon, onClick }) => (
    <div
        onClick={onClick}
        className="group flex flex-col items-center justify-center w-64 h-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-[var(--brand-blue)] hover:shadow-blue-500/20 transform hover:-translate-y-2"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick()}
        aria-label={`Selecionar perfil ${title}`}
    >
        <div className="w-20 h-20 mb-4 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center transition-colors group-hover:bg-[var(--brand-blue)]">
            <Icon className="w-10 h-10 text-slate-500 dark:text-slate-400 transition-colors group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{title}</h3>
    </div>
);


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { t, setProfile } = useAppContext();

    const handleRoleSelection = (role: Profile) => {
        setProfile(role);
        navigate('/dashboard');
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#d9d9d9] dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 page-transition">
            <div className="text-center mb-12">
                <div className="inline-block mb-4">
                    <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="49" fill="#00529F"/>
                      <circle cx="50" cy="50" r="44" stroke="#2196F3" strokeWidth="4" fill="none"/>
                      
                      <g transform="translate(10, 12) scale(0.8)">
                        <path d="M 35 25 L 70 25 L 55 50 L 80 75 L 35 75 Z"
                              fill="#00529F"/>
                        
                        <path d="M 35 25 L 70 25 L 55 50 L 35 50 Z" 
                              fill="#b71c1c"/>
                              
                        <path d="M 35 25 L 70 25 L 55 50 L 80 75 L 35 75 Z" 
                              stroke="white" strokeWidth="8" strokeLinejoin="miter" strokeLinecap="square" fill="none"/>
                      </g>
                    </svg>
                </div>
                <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">{t('welcome')}</h1>
                <p className="mt-4 text-xl text-slate-500 dark:text-slate-400">{t('welcomeSubtitle')}</p>
            </div>
            
            <div className="text-center mb-10">
                 <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">{t('selectProfile')}</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <RoleCard title={t('salesManager')} icon={UserIcon} onClick={() => handleRoleSelection('manager')} />
                <RoleCard title={t('ceo')} icon={BriefcaseIcon} onClick={() => handleRoleSelection('ceo')} />
            </div>

            <footer className="absolute bottom-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">By Nextore Analytics</p>
            </footer>
        </div>
    );
};

export default LoginPage;