
import type { InventoryItem, MonthlySale } from '../types';

export const kpiData = {
    totalSales: {
        value: "R$ 1.2M",
        change: "+12.5%",
    },
    deliveries: {
        value: "8,942",
        change: "+5.1%",
    },
    inventoryValue: {
        value: "R$ 4.8M",
        change: "-2.3%",
    },
    onTimeRate: {
        value: "98.2%",
        change: "+1.8%",
    }
}

export const inventoryData: InventoryItem[] = [
  { id: "TV001", name: "Smart TV 55\" 4K", category: "Eletrônicos", stock: 150, status: "In Stock" },
  { id: "CEL002", name: "Smartphone XPTO 256GB", category: "Celulares", stock: 35, status: "Low Stock" },
  { id: "GEL003", name: "Geladeira Duplex 450L", category: "Eletrodomésticos", stock: 80, status: "In Stock" },
  { id: "FOG004", name: "Fogão 5 Bocas Inox", category: "Eletrodomésticos", stock: 0, status: "Out of Stock" },
  { id: "NOTE005", name: "Notebook Gamer i7", category: "Informática", stock: 120, status: "In Stock" },
  { id: "SOF006", name: "Sofá Retrátil 3 Lugares", category: "Móveis", stock: 25, status: "Low Stock" },
];

export const salesData: MonthlySale[] = [
  { month: 'Jan', vendas: 4000, meta: 3500 },
  { month: 'Fev', vendas: 3000, meta: 3200 },
  { month: 'Mar', vendas: 5000, meta: 4500 },
  { month: 'Abr', vendas: 4780, meta: 4800 },
  { month: 'Mai', vendas: 5890, meta: 5500 },
  { month: 'Jun', vendas: 4390, meta: 4600 },
  { month: 'Jul', vendas: 6490, meta: 6000 },
];
