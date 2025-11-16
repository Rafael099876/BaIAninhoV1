import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { transportKpiData, vehiclesData, expensesData, deliveryEmployeesData } from '../../data/mockData';
import type { DeliveryEmployee, Kpi, Vehicle, Expense } from '../../types';
import { CheckCircleIcon, TruckIcon, CarIcon, WrenchIcon, FuelIcon, Settings2Icon, UsersIcon } from '../Icons';

// --- Reusable Components ---

const KpiCard: React.FC<Kpi> = ({ title, value, change, changeType, icon: Icon }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
        {change && <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>}
      </div>
      <div className="bg-[#2196f3]/10 dark:bg-[#2196f3]/20 p-3 rounded-full">
        <Icon className="h-6 w-6 text-[#2196f3] dark:text-sky-400" />
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md ${className}`}>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">{title}</h3>
        {children}
    </div>
);

const SearchableList: React.FC<{ title: string; data: any[]; renderItem: (item: any) => React.ReactNode; searchKeys: string[]; headers: { key: string, label: string }[] }> = ({ title, data, renderItem, searchKeys, headers }) => {
    const { t } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter(item =>
            searchKeys.some(key =>
                item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm, searchKeys]);

    return (
        <Card title={title} className="flex flex-col h-full">
            <input
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
            />
            <div className="flex-grow overflow-y-auto">
                <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 bg-white dark:bg-slate-800">
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                            {headers.map(h => <th key={h.key} className="py-2 px-3 font-medium">{h.label}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(renderItem)}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const FilterableKpiCard: React.FC<{ title: string; icon: React.ElementType; items: { name: string, value: number, type: string }[]; onFilterChange: (filters: string[]) => void; initialFilters: string[], unit?: string, className?: string }> = ({ title, icon: Icon, items, onFilterChange, initialFilters, unit='', className = ''}) => {
    const { t } = useAppContext();
    const [activeFilters, setActiveFilters] = useState<string[]>(initialFilters);

    const handleFilterToggle = (type: string) => {
        const newFilters = activeFilters.includes(type)
            ? activeFilters.filter(f => f !== type)
            : [...activeFilters, type];
        setActiveFilters(newFilters);
        onFilterChange(newFilters);
    };

    const totalValue = useMemo(() => {
        return items.filter(item => activeFilters.includes(item.type)).reduce((sum, item) => sum + item.value, 0);
    }, [items, activeFilters]);
    
    return (
         <div className={`bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md flex flex-col h-full ${className}`}>
            {/* KPI Section */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                        {unit}{totalValue.toLocaleString('pt-BR')}
                    </p>
                </div>
                <div className="bg-[#2196f3]/10 dark:bg-[#2196f3]/20 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-[#2196f3] dark:text-sky-400" />
                </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>

            {/* Filters Section */}
            <div className="space-y-2 flex-grow overflow-y-auto">
                {items.map(item => (
                    <label key={item.type} className="flex items-center space-x-2 cursor-pointer text-sm p-1 rounded-md transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <input type="checkbox" checked={activeFilters.includes(item.type)} onChange={() => handleFilterToggle(item.type)} className="h-4 w-4 rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]" />
                        <span className="flex-grow">{t(item.name as any)}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">{unit}{item.value.toLocaleString('pt-BR')}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};


// --- Expenses Tab Main Component ---

const ExpensesTab: React.FC = () => {
    const { t } = useAppContext();
    const [activeVehicleFilters, setActiveVehicleFilters] = useState<string[]>(vehiclesData.map(v => v.type));
    const [activeExpenseFilters, setActiveExpenseFilters] = useState<string[]>(expensesData.map(e => e.type));

    const vehicleItems = vehiclesData.map(v => ({ name: v.type === 'motorcycle' ? 'motorcycles' : v.type === 'car' ? 'cars' : 'trucks', value: v.count, type: v.type }));
    const expenseItems = expensesData.map(e => ({ name: e.type, value: e.amount, type: e.type }));
    
    const getEmployeeStatusClass = (status: DeliveryEmployee['status']) => {
        switch(status) {
            case 'present': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
            case 'on_leave': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
            case 'absent': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content area, spanning 2/3 of the width */}
            <div className="lg:col-span-2 space-y-6">
                {/* Top-level KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <KpiCard title={t('onTimeDeliveries')} value={transportKpiData.onTimeDeliveries.value} change={transportKpiData.onTimeDeliveries.change} changeType="increase" icon={CheckCircleIcon} />
                    <KpiCard title={t('deliveriesCompleted')} value={transportKpiData.deliveriesCompleted.value} change={transportKpiData.deliveriesCompleted.change} changeType="increase" icon={TruckIcon} />
                </div>
                
                {/* Delivery Employees List with a defined height for scrolling */}
                <div className="h-[480px]">
                     <SearchableList
                        title={t('deliveryEmployees')}
                        data={deliveryEmployeesData}
                        searchKeys={['name']}
                        headers={[{ key: 'name', label: t('name') }, { key: 'deliveries', label: t('deliveriesCompleted') }, { key: 'status', label: t('status') }]}
                        renderItem={(item: DeliveryEmployee) => (
                            <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                                <td className="py-2 px-3">{item.deliveries}</td>
                                <td className="py-2 px-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEmployeeStatusClass(item.status)}`}>{item.status}</span>
                                </td>
                            </tr>
                        )}
                    />
                </div>
            </div>

            {/* Sidebar content, spanning 1/3 of the width */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="flex-1 min-h-0">
                    <FilterableKpiCard
                        title={t('activeVehicles')}
                        icon={CarIcon}
                        items={vehicleItems}
                        initialFilters={activeVehicleFilters}
                        onFilterChange={setActiveVehicleFilters}
                    />
                </div>
                <div className="flex-1 min-h-0">
                    <FilterableKpiCard
                        title={t('totalExpenses')}
                        icon={Settings2Icon}
                        items={expenseItems}
                        initialFilters={activeExpenseFilters}
                        onFilterChange={setActiveExpenseFilters}
                        unit="R$ "
                    />
                </div>
            </div>
        </div>
    );
};

export default ExpensesTab;