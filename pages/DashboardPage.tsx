
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { inventoryData, salesData, kpiData } from '../data/mockData';
import type { InventoryItem, MonthlySale, Kpi } from '../types';
import { TruckIcon, DollarSignIcon, PackageIcon, CheckCircleIcon } from '../components/Icons';

const KpiCard: React.FC<Kpi> = ({ title, value, change, changeType, icon: Icon }) => {
  const changeColor = changeType === 'increase' ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <p className={`text-sm mt-2 ${changeColor}`}>{change} vs. mês anterior</p>
      </div>
      <div className="bg-gray-700 p-3 rounded-full">
        <Icon className="h-7 w-7 text-red-500" />
      </div>
    </div>
  );
};

const SalesChart: React.FC = () => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-semibold text-white mb-4">Vendas vs. Metas</h3>
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="month" stroke="#A0AEC0" />
          <YAxis stroke="#A0AEC0" />
          <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
          <Legend wrapperStyle={{ color: '#A0AEC0' }}/>
          <Line type="monotone" dataKey="vendas" stroke="#D71920" strokeWidth={2} name="Vendas" />
          <Line type="monotone" dataKey="meta" stroke="#4A5568" strokeDasharray="5 5" name="Meta" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const InventoryTable: React.FC = () => {
    const getStatusClass = (status: InventoryItem['status']) => {
        switch(status) {
            case 'In Stock': return 'bg-green-500/20 text-green-400';
            case 'Low Stock': return 'bg-yellow-500/20 text-yellow-400';
            case 'Out of Stock': return 'bg-red-500/20 text-red-400';
        }
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Status do Inventário</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700 text-sm text-gray-400">
                            <th className="py-3 px-4 font-medium">Produto</th>
                            <th className="py-3 px-4 font-medium">Categoria</th>
                            <th className="py-3 px-4 font-medium">Estoque</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.map((item) => (
                            <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="py-3 px-4 text-white font-medium">{item.name}</td>
                                <td className="py-3 px-4 text-gray-300">{item.category}</td>
                                <td className="py-3 px-4 text-gray-300">{item.stock}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Vendas Totais" value={kpiData.totalSales.value} change={kpiData.totalSales.change} changeType="increase" icon={DollarSignIcon} />
        <KpiCard title="Entregas Realizadas" value={kpiData.deliveries.value} change={kpiData.deliveries.change} changeType="increase" icon={TruckIcon} />
        <KpiCard title="Valor do Inventário" value={kpiData.inventoryValue.value} change={kpiData.inventoryValue.change} changeType="decrease" icon={PackageIcon} />
        <KpiCard title="Entregas no Prazo" value={kpiData.onTimeRate.value} change={kpiData.onTimeRate.change} changeType="increase" icon={CheckCircleIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <SalesChart />
        </div>
        <div className="lg:col-span-2">
          <InventoryTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
