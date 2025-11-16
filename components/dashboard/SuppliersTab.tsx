import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAppContext } from '../../contexts/AppContext';
import type { InventoryItem, Supplier } from '../../types';
import { suppliersKpiData, inventoryData, productTypeSalesData, suppliersData } from '../../data/mockData';
import { WarehouseIcon } from '../Icons';

// --- Reusable Components (could be moved to a shared file) ---

const KpiCard: React.FC<{ title: string; value: string; icon: React.ElementType; }> = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
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


// --- Suppliers Tab Main Component ---

const SuppliersTab: React.FC = () => {
    const { t, theme } = useAppContext();
    const productCategories = [...new Set(inventoryData.map(p => p.category))];
    const [selectedCategories, setSelectedCategories] = useState<string[]>(productCategories);

    // You can change the height of the "Quantity by Product Type" chart here.
    const chartHeight = 300;

    const handleCategoryFilterChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(name => name !== category)
                : [...prev, category]
        );
    };

    const filteredInventory = useMemo(() => inventoryData.filter(item => selectedCategories.includes(item.category)), [selectedCategories]);
    
    const quantityByType = useMemo(() => {
        return productCategories.map(category => ({
            name: category,
            quantity: inventoryData.filter(item => item.category === category).reduce((sum, item) => sum + item.stock, 0)
        }));
    }, []);

    const getStatusClass = (status: InventoryItem['status']) => {
        switch(status) {
            case 'In Stock': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
            case 'Low Stock': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400';
            case 'Out of Stock': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
        }
    };
    
    const tooltipStyles = theme === 'dark'
    ? { backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', borderRadius: '0.5rem' }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '0.5rem' };
    const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';


    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="h-[585px]">
                        {/* LIST: Products in Stock */}
                        <SearchableList
                            title={t('productsInStock')}
                            data={filteredInventory}
                            searchKeys={['name', 'id']}
                            headers={[{ key: 'name', label: t('product') }, { key: 'category', label: t('category') }, { key: 'stock', label: t('stock') }, { key: 'status', label: t('status') }]}
                            renderItem={(item: InventoryItem) => (
                                <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                                    <td className="py-2 px-3">{item.category}</td>
                                    <td className="py-2 px-3">{item.stock}</td>
                                    <td className="py-2 px-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(item.status)}`}>{item.status}</span></td>
                                </tr>
                            )}
                        />
                    </div>
                </div>
                 <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* KPI: Total Inventory Value */}
                    <KpiCard title={t('inventoryValue')} value={suppliersKpiData.totalInventoryValue.value} icon={WarehouseIcon} />
                    <Card title={t('quantityByProductType')}>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                            {productCategories.map(cat => (
                                <label key={cat} className="flex items-center space-x-2 cursor-pointer text-sm">
                                    <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryFilterChange(cat)} className="h-4 w-4 rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]" />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>
                        {/* GRAPHIC: Quantity by Product Type */}
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <BarChart data={quantityByType.filter(d => selectedCategories.includes(d.name))} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                                <XAxis type="number" stroke={axisColor} fontSize={12} />
                                <YAxis type="category" dataKey="name" stroke={axisColor} fontSize={12} width={100} />
                                <Tooltip contentStyle={tooltipStyles} />
                                <Bar dataKey="quantity" fill="var(--brand-blue)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </div>

            <div style={{ height: '450px' }}>
                {/* LIST: Supplier Ranking */}
                <Card title={t('supplierRanking')} className="flex flex-col h-full">
                    <div className="flex-grow overflow-y-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="sticky top-0 bg-white dark:bg-slate-800">
                                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                    <th className="py-2 px-3 font-medium">Fornecedor</th>
                                    <th className="py-2 px-3 font-medium">Produtos Fornecidos</th>
                                    <th className="py-2 px-3 font-medium">Taxa de Entrega no Prazo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliersData.sort((a,b) => b.onTimeDeliveryRate - a.onTimeDeliveryRate).map((supplier: Supplier) => (
                                    <tr key={supplier.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                        <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">{supplier.name}</td>
                                        <td className="py-2 px-3">{supplier.productsSupplied}</td>
                                        <td className="py-2 px-3">{supplier.onTimeDeliveryRate}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SuppliersTab;