
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAppContext } from '../../contexts/AppContext';
import type { InventoryItem, Supplier } from '../../types';
import { suppliersKpiData, inventoryData, productTypeSalesData, suppliersData } from '../../data/mockData';
import { WarehouseIcon, PackageIcon } from '../Icons';

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

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string; headerAction?: React.ReactNode }> = ({ title, children, className = '', headerAction }) => (
    <div className={`bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md ${className}`}>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
            {headerAction}
        </div>
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
    const productCategories = useMemo(() => [...new Set(inventoryData.map(p => p.category))], []);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(productCategories);
    const [isCategorySelectorOpen, setIsCategorySelectorOpen] = useState(false);
    const categorySelectorRef = useRef<HTMLDivElement>(null);

    // You can change the height of the "Quantity by Product Type" chart here.
    const chartHeight = 367;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categorySelectorRef.current && !categorySelectorRef.current.contains(event.target as Node)) {
                setIsCategorySelectorOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCategoryFilterChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(name => name !== category)
                : [...prev, category]
        );
    };

    const selectAllCategories = () => {
        setSelectedCategories(productCategories);
    };

    const filteredInventory = useMemo(() => inventoryData.filter(item => selectedCategories.includes(item.category)), [selectedCategories]);
    
    const quantityByType = useMemo(() => {
        return productCategories.map(category => ({
            name: category,
            quantity: inventoryData.filter(item => item.category === category).reduce((sum, item) => sum + item.stock, 0)
        }));
    }, [productCategories]);

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
                                    <td className="py-2 px-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                            {t(item.status.toLowerCase().replace(/ /g, '_') as any)}
                                        </span>
                                    </td>
                                </tr>
                            )}
                        />
                    </div>
                </div>
                 <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* KPI: Total Inventory Value */}
                    <KpiCard title={t('inventoryValue')} value={suppliersKpiData.totalInventoryValue.value} icon={WarehouseIcon} />
                    <Card 
                        title={t('quantityByProductType')}
                    >
                        <div className="relative flex gap-2 mb-4" ref={categorySelectorRef}>
                            <button 
                                onClick={selectAllCategories}
                                className="p-1.5 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                {t('all')}
                            </button>
                            <button 
                                onClick={() => setIsCategorySelectorOpen(!isCategorySelectorOpen)}
                                className="p-1.5 px-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
                            >
                                <PackageIcon className="w-4 h-4" />
                                <span className="text-xs font-medium">{t('productClass')}</span>
                            </button>
                            
                            {isCategorySelectorOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-10 p-2">
                                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                                        {productCategories.map(cat => (
                                            <label key={cat} className="flex items-center space-x-2 cursor-pointer text-xs p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedCategories.includes(cat)} 
                                                    onChange={() => handleCategoryFilterChange(cat)} 
                                                    className="h-3 w-3 rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]" 
                                                />
                                                <span className="text-slate-700 dark:text-slate-300">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* GRAPHIC: Quantity by Product Type */}
                        {/* You can change the height of the chart by modifying the 'chartHeight' variable above or setting a fixed value here */}
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
                                    <th className="py-2 px-3 font-medium">{t('supplier')}</th>
                                    <th className="py-2 px-3 font-medium">{t('productsSupplied')}</th>
                                    <th className="py-2 px-3 font-medium">{t('deliveryRate')}</th>
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
