import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import SalesTab from '../components/dashboard/SalesTab';
import SuppliersTab from '../components/dashboard/SuppliersTab';
import ExpensesTab from '../components/dashboard/ExpensesTab';
import { DollarSignIcon, WarehouseIcon, TruckIcon } from '../components/Icons';

type Tab = 'sales' | 'suppliers' | 'expenses';

const DashboardPage: React.FC = () => {
  const { t, profile } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>('sales');

  const tabs = [
    { id: 'sales', label: t('sales'), icon: DollarSignIcon },
    { id: 'suppliers', label: t('suppliersAndProducts'), icon: WarehouseIcon },
    { id: 'expenses', label: t('expensesAndTransport'), icon: TruckIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sales':
        return <SalesTab />;
      case 'suppliers':
        return <SuppliersTab />;
      case 'expenses':
        return <ExpensesTab />;
      default:
        return null;
    }
  };

  // Restrict access for 'Gerente'
  const isManager = profile === 'manager';

  // Effect to handle restricted access for 'Gerente'
  useEffect(() => {
    if (isManager && activeTab !== 'sales') {
      setActiveTab('sales');
    }
  }, [isManager, activeTab]);

  const visibleTabs = isManager ? tabs.filter(tab => tab.id === 'sales') : tabs;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 border-b border-slate-300 dark:border-slate-700">
        <nav className="-mb-px flex space-x-6">
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                ${activeTab === tab.id
                  ? 'border-[var(--brand-blue)] text-[var(--brand-blue)]'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-grow pt-6 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DashboardPage;