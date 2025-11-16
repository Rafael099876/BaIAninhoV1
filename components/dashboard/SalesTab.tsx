import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import type { Kpi, InventoryItem, Subscriber, Employee } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import { salesKpiData, salesVsGoalsData, dailyPeakSalesData, productTypeSalesData, sellerSalesData, inventoryData, subscribersData, employeesData } from '../../data/mockData';
import { DollarSignIcon, PackageIcon, BriefcaseIcon, UsersIcon, CheckCircleIcon, UserIcon, TruckIcon, WarehouseIcon } from '../Icons';

// --- Reusable Components ---

const KpiCard: React.FC<Kpi> = ({ title, value, change, changeType, icon: Icon, description }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
        {change && <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>}
        {description && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{description}</p>}
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


// --- Sales Tab Main Component ---

const SalesTab: React.FC = () => {
  const { t, theme } = useAppContext();
  const [filteredProductTypes, setFilteredProductTypes] = useState<string[]>(productTypeSalesData.map(p => p.name));

  const handleProductTypeFilterChange = (typeName: string) => {
    setFilteredProductTypes(prev =>
      prev.includes(typeName)
        ? prev.filter(name => name !== typeName)
        : [...prev, typeName]
    );
  };
  
  const displayedProductTypeData = productTypeSalesData.filter(p => filteredProductTypes.includes(p.name));
  
  const tooltipStyles = theme === 'dark'
    ? { backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', borderRadius: '0.5rem' }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '0.5rem' };
  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';

  const kpis: Kpi[] = [
    { title: t('totalRevenue'), value: salesKpiData.totalRevenue.value, change: salesKpiData.totalRevenue.change, changeType: 'increase', icon: DollarSignIcon },
    { title: t('totalSales'), value: salesKpiData.totalSales.value, change: salesKpiData.totalSales.change, changeType: 'increase', icon: PackageIcon },
    { title: t('averageTicket'), value: salesKpiData.averageTicket.value, change: salesKpiData.averageTicket.change, changeType: 'decrease', icon: CheckCircleIcon },
    { title: t('cardSubscribers'), value: salesKpiData.cardSubscribers.value, change: salesKpiData.cardSubscribers.change, changeType: 'increase', icon: UsersIcon },
    { title: t('annualRevenue'), value: salesKpiData.annualRevenue.value, icon: DollarSignIcon },
    { title: t('inventoryValue'), value: salesKpiData.inventoryValue.value, change: salesKpiData.inventoryValue.change, changeType: 'decrease', icon: WarehouseIcon },
    { title: t('totalProductsSold'), value: salesKpiData.totalProductsSold.value, change: salesKpiData.totalProductsSold.change, changeType: 'increase', icon: WarehouseIcon },
    { title: t('monthlyAverageSales'), value: salesKpiData.monthlyAverageSales.value, icon: BriefcaseIcon },
  ];

  const getStatusClass = (status: InventoryItem['status']) => {
    switch(status) {
        case 'In Stock': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
        case 'Low Stock': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400';
        case 'Out of Stock': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
    }
  }

  const getEmployeeStatusClass = (status: Employee['status']) => {
    switch(status) {
        case 'present': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
        case 'on_leave': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
        case 'absent': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
    }
  }
  
  const COLORS = ['#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('salesVsGoals')}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesVsGoalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="month" stroke={axisColor} fontSize={12} />
              <YAxis stroke={axisColor} fontSize={12} tickFormatter={(value) => `R$${(value as number / 1000)}k`} />
              <Tooltip contentStyle={tooltipStyles} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="vendas" stroke="var(--brand-blue)" strokeWidth={2} name={t('sales')} />
              <Line type="monotone" dataKey="meta" stroke="#94a3b8" strokeDasharray="5 5" name={t('goal')} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card title={t('dailyPeakSales')}>
          <ResponsiveContainer width="100%" height={300}>
             <BarChart data={dailyPeakSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="hour" stroke={axisColor} fontSize={12}/>
                <YAxis stroke={axisColor} fontSize={12} />
                <Tooltip contentStyle={tooltipStyles} />
                <Bar dataKey="sales" fill="var(--brand-blue)" name={t('sales')} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('productTypeRanking')}>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs">
                {productTypeSalesData.map(p => (
                    <label key={p.name} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={filteredProductTypes.includes(p.name)} onChange={() => handleProductTypeFilterChange(p.name)} className="h-4 w-4 rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]" />
                        <span>{p.name}</span>
                    </label>
                ))}
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={displayedProductTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
                       {displayedProductTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyles}/>
                </PieChart>
            </ResponsiveContainer>
        </Card>
        <Card title={t('salesRankingBySeller')}>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={sellerSalesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                    <XAxis type="number" stroke={axisColor} fontSize={12} tickFormatter={(value) => `R$${(value as number / 1000)}k`}/>
                    <YAxis type="category" dataKey="name" stroke={axisColor} fontSize={12} width={80}/>
                    <Tooltip contentStyle={tooltipStyles}/>
                    <Bar dataKey="sales" fill="#2196f3" name={t('sales')} background={{ fill: theme === 'dark' ? '#334155' : '#eee' }}/>
                </BarChart>
            </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="h-[450px]">
              <SearchableList
                  title={t('inventoryStatus')}
                  data={inventoryData}
                  searchKeys={['name', 'category']}
                  headers={[{ key: 'name', label: t('product') }, { key: 'stock', label: t('stock') }, { key: 'status', label: t('status') }]}
                  renderItem={(item: InventoryItem) => (
                      <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="py-2 px-3"><span className="font-medium text-slate-800 dark:text-slate-200">{item.name}</span><br/><span className="text-slate-500">{item.category}</span></td>
                          <td className="py-2 px-3">{item.stock}</td>
                          <td className="py-2 px-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(item.status)}`}>{item.status}</span></td>
                      </tr>
                  )}
              />
          </div>
          <div className="h-[450px]">
              <SearchableList
                  title={t('subscribersList')}
                  data={subscribersData}
                  searchKeys={['name', 'cardId', 'lastMonthSpending']}
                  headers={[{ key: 'name', label: t('name') }, { key: 'cardId', label: t('cardId') }, { key: 'amountSpent', label: t('amountSpent') }]}
                  renderItem={(item: Subscriber) => (
                      <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                          <td className="py-2 px-3">{item.cardId}</td>
                          <td className="py-2 px-3">R$ {item.lastMonthSpending.toFixed(2)}</td>
                      </tr>
                  )}
              />
          </div>
          <div className="h-[450px]">
              <SearchableList
                  title={t('employeesList')}
                  data={employeesData}
                  searchKeys={['name', 'position']}
                  headers={[{ key: 'name', label: t('name') }, { key: 'position', label: t('position') }, { key: 'status', label: t('status') }]}
                  renderItem={(item: Employee) => (
                      <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                          <td className="py-2 px-3">{item.position}</td>
                          <td className="py-2 px-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEmployeeStatusClass(item.status)}`}>{item.status}</span></td>
                      </tr>
                  )}
              />
          </div>
      </div>

    </div>
  );
};

export default SalesTab;