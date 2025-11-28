
import type { InventoryItem, MonthlySale, DailyPeakSale, ProductTypeSale, SellerSale, Subscriber, Employee, Supplier, Vehicle, Expense, DeliveryEmployee, SellerMonthlyData, ProductTypeMonthlyData } from '../types';

// --- SALES TAB DATA ---

export const salesKpiData = {
    totalSales: { value: "15,832", change: "+8.2%", changeType: 'increase' },
    totalRevenue: { value: "R$ 1.85M", change: "+10.1%", changeType: 'increase' },
    averageTicket: { value: "R$ 116.85", change: "-1.2%", changeType: 'decrease' },
    totalProductsSold: { value: "25,310", change: "+7.5%", changeType: 'increase' },
    monthlyAverageSales: { value: "R$ 264k" },
    annualRevenue: { value: "R$ 21.2M" },
    inventoryValue: { value: "R$ 4.7M", change: "-1.9%", changeType: 'decrease' },
    cardSubscribers: { value: "1,280", change: "+35", changeType: 'increase' },
};

export const salesVsGoalsData: MonthlySale[] = [
  { month: 'Jan', vendas: 210000, meta: 200000 },
  { month: 'Fev', vendas: 230000, meta: 220000 },
  { month: 'Mar', vendas: 280000, meta: 250000 },
  { month: 'Abr', vendas: 260000, meta: 270000 },
  { month: 'Mai', vendas: 310000, meta: 290000 },
  { month: 'Jun', vendas: 290000, meta: 300000 },
  { month: 'Jul', vendas: 340000, meta: 320000 },
];

export const dailyPeakSalesData: DailyPeakSale[] = [
    { hour: '09:00', sales: 34 },
    { hour: '11:00', sales: 58 },
    { hour: '13:00', sales: 45 },
    { hour: '15:00', sales: 72 },
    { hour: '17:00', sales: 85 },
    { hour: '19:00', sales: 60 },
];

export const productTypeSalesData: ProductTypeSale[] = [
    { name: 'Eletrônicos', value: 450000 },
    { name: 'Eletrodomésticos', value: 620000 },
    { name: 'Móveis', value: 320000 },
    { name: 'Celulares', value: 280000 },
    { name: 'Informática', value: 180000 },
];

// Data with realistic seasonality and inconsistencies
export const productTypeMonthlySalesData: ProductTypeMonthlyData[] = [
    {
        name: 'Eletrônicos',
        monthlySales: {
            'Jan': 32000, 'Fev': 28500, 'Mar': 31000, 'Abr': 29000, 'Mai': 42000, 'Jun': 38000,
            'Jul': 41000, 'Ago': 36000, 'Set': 34000, 'Out': 39000, 'Nov': 85000, 'Dez': 65000
        } // Spike in Nov (Black Friday) and Dec
    },
    {
        name: 'Eletrodomésticos',
        monthlySales: {
            'Jan': 45000, 'Fev': 41000, 'Mar': 48000, 'Abr': 46000, 'Mai': 78000, 'Jun': 52000,
            'Jul': 55000, 'Ago': 49000, 'Set': 51000, 'Out': 58000, 'Nov': 65000, 'Dez': 55000
        } // Spike in May (Mother's Day) and Nov
    },
    {
        name: 'Móveis',
        monthlySales: {
            'Jan': 42000, 'Fev': 25000, 'Mar': 28000, 'Abr': 26000, 'Mai': 30000, 'Jun': 28000,
            'Jul': 32000, 'Ago': 29000, 'Set': 27000, 'Out': 28000, 'Nov': 35000, 'Dez': 22000
        } // High Jan (Sales), Low Dec (Focus on gifts)
    },
    {
        name: 'Celulares',
        monthlySales: {
            'Jan': 18000, 'Fev': 15000, 'Mar': 22000, 'Abr': 20000, 'Mai': 35000, 'Jun': 28000,
            'Jul': 32000, 'Ago': 45000, 'Set': 25000, 'Out': 22000, 'Nov': 72000, 'Dez': 58000
        } // Volatile: Spike in Aug (Father's Day/Launch) and Nov
    },
    {
        name: 'Informática',
        monthlySales: {
            'Jan': 38000, 'Fev': 35000, 'Mar': 15000, 'Abr': 12000, 'Mai': 14000, 'Jun': 15000,
            'Jul': 18000, 'Ago': 22000, 'Set': 15000, 'Out': 18000, 'Nov': 42000, 'Dez': 25000
        } // High Jan/Feb (Back to School), High Nov
    },
];

// Deprecated in favor of monthly data for dynamic charts, but kept for type compatibility if needed
export const sellerSalesData: SellerSale[] = [
    { name: 'Ana Silva', sales: 125000 },
    { name: 'Bruno Costa', sales: 118000 },
    { name: 'Carla Dias', sales: 110000 },
    { name: 'Daniel Souza', sales: 98000 },
    { name: 'Eduarda Lima', sales: 92000 },
];

// Seller data with individual performance inconsistencies
export const sellerMonthlySalesData: SellerMonthlyData[] = [
    {
        name: 'Ana Silva', // High performer, consistency
        monthlySales: {
            'Jan': 14500, 'Fev': 12800, 'Mar': 13200, 'Abr': 13500, 'Mai': 15500, 'Jun': 14000,
            'Jul': 13800, 'Ago': 14200, 'Set': 13500, 'Out': 14800, 'Nov': 28000, 'Dez': 21000
        }
    },
    {
        name: 'Bruno Costa', // Average, steady
        monthlySales: {
            'Jan': 11000, 'Fev': 10500, 'Mar': 11200, 'Abr': 10800, 'Mai': 11500, 'Jun': 11000,
            'Jul': 11300, 'Ago': 11000, 'Set': 10800, 'Out': 11200, 'Nov': 14000, 'Dez': 12500
        }
    },
    {
        name: 'Carla Dias', // Volatile, likely takes vacation in Feb
        monthlySales: {
            'Jan': 12500, 'Fev': 2500, 'Mar': 9000, 'Abr': 11000, 'Mai': 13000, 'Jun': 12500,
            'Jul': 13000, 'Ago': 11500, 'Set': 10000, 'Out': 11500, 'Nov': 18000, 'Dez': 15000
        }
    },
    {
        name: 'Daniel Souza', // Struggling, but one huge B2B sale in July
        monthlySales: {
            'Jan': 6000, 'Fev': 5500, 'Mar': 6200, 'Abr': 5800, 'Mai': 7000, 'Jun': 6500,
            'Jul': 25000, 'Ago': 6000, 'Set': 5500, 'Out': 6200, 'Nov': 8500, 'Dez': 7000
        }
    },
    {
        name: 'Eduarda Lima', // New hire starting mid-year logic (low start, growing)
        monthlySales: {
            'Jan': 3500, 'Fev': 4200, 'Mar': 5000, 'Abr': 6500, 'Mai': 7200, 'Jun': 8500,
            'Jul': 9000, 'Ago': 9500, 'Set': 10500, 'Out': 11000, 'Nov': 15000, 'Dez': 13500
        }
    },
];

export const inventoryData: InventoryItem[] = [
  // ELETRÔNICOS
  { 
      id: "TV001", name: "Smart TV 55\" 4K", category: "Eletrônicos", stock: 150, status: "In Stock",
      monthlySales: { 'Jan': 12000, 'Fev': 10500, 'Mar': 11000, 'Abr': 10800, 'Mai': 15000, 'Jun': 13500, 'Jul': 14000, 'Ago': 12500, 'Set': 12000, 'Out': 14500, 'Nov': 35000, 'Dez': 25000 }
  },
  { 
      id: "CAI030", name: "Caixa de Som Bluetooth", category: "Eletrônicos", stock: 150, status: "In Stock",
      monthlySales: { 'Jan': 5000, 'Fev': 4500, 'Mar': 4800, 'Abr': 4600, 'Mai': 6000, 'Jun': 5500, 'Jul': 6200, 'Ago': 5800, 'Set': 5200, 'Out': 5500, 'Nov': 12000, 'Dez': 9000 }
  },
  { 
      id: "TV011", name: "Smart TV 43\" Full HD", category: "Eletrônicos", stock: 180, status: "In Stock",
      monthlySales: { 'Jan': 8000, 'Fev': 7500, 'Mar': 7800, 'Abr': 7200, 'Mai': 9500, 'Jun': 8500, 'Jul': 9000, 'Ago': 8200, 'Set': 7800, 'Out': 8500, 'Nov': 18000, 'Dez': 14000 }
  },
  { 
      id: "FON031", name: "Fone de Ouvido TWS", category: "Eletrônicos", stock: 0, status: "Out of Stock",
      monthlySales: { 'Jan': 4000, 'Fev': 3800, 'Mar': 4200, 'Abr': 4100, 'Mai': 5500, 'Jun': 5000, 'Jul': 5200, 'Ago': 4800, 'Set': 4500, 'Out': 4800, 'Nov': 10000, 'Dez': 0 } // Sold out in Dec
  },
  { 
      id: "VID038", name: "Video Game Última Geração", category: "Eletrônicos", stock: 12, status: "Low Stock",
      monthlySales: { 'Jan': 1500, 'Fev': 1200, 'Mar': 1300, 'Abr': 1100, 'Mai': 3000, 'Jun': 2500, 'Jul': 3500, 'Ago': 2000, 'Set': 1800, 'Out': 2500, 'Nov': 6000, 'Dez': 12000 }
  },
  { 
      id: "DRON039", name: "Drone com Câmera 4K", category: "Eletrônicos", stock: 28, status: "Low Stock",
      monthlySales: { 'Jan': 1200, 'Fev': 900, 'Mar': 1100, 'Abr': 1000, 'Mai': 2000, 'Jun': 1800, 'Jul': 2200, 'Ago': 1500, 'Set': 1400, 'Out': 1800, 'Nov': 3500, 'Dez': 4500 }
  },
  { 
      id: "TVBOX041", name: "TV Box 4K", category: "Eletrônicos", stock: 0, status: "Out of Stock",
      monthlySales: { 'Jan': 300, 'Fev': 100, 'Mar': 800, 'Abr': 200, 'Mai': 1000, 'Jun': 1200, 'Jul': 900, 'Ago': 1200, 'Set': 1300, 'Out': 1400, 'Nov': 500, 'Dez': 500 } // Inconsistent
  },

  // CELULARES
  { 
      id: "CEL002", name: "Smartphone XPTO 256GB", category: "Celulares", stock: 35, status: "Low Stock",
      monthlySales: { 'Jan': 6000, 'Fev': 5000, 'Mar': 7000, 'Abr': 6500, 'Mai': 12000, 'Jun': 9000, 'Jul': 10000, 'Ago': 15000, 'Set': 8000, 'Out': 7500, 'Nov': 25000, 'Dez': 20000 }
  },
  { 
      id: "CEL012", name: "Smartphone ZYX 128GB", category: "Celulares", stock: 40, status: "Low Stock",
      monthlySales: { 'Jan': 4000, 'Fev': 3500, 'Mar': 5000, 'Abr': 4500, 'Mai': 8000, 'Jun': 6500, 'Jul': 7500, 'Ago': 11000, 'Set': 6000, 'Out': 5500, 'Nov': 18000, 'Dez': 14000 }
  },
  { 
      id: "SMW040", name: "Smartwatch GPS", category: "Celulares", stock: 180, status: "In Stock",
      monthlySales: { 'Jan': 3000, 'Fev': 2500, 'Mar': 4000, 'Abr': 3500, 'Mai': 7000, 'Jun': 5500, 'Jul': 6500, 'Ago': 9000, 'Set': 5000, 'Out': 4500, 'Nov': 14000, 'Dez': 11000 }
  },
  { 
      id: "CARR050", name: "Carregador Portátil 20000mAh", category: "Celulares", stock: 220, status: "In Stock",
      monthlySales: { 'Jan': 5000, 'Fev': 4000, 'Mar': 6000, 'Abr': 5500, 'Mai': 8000, 'Jun': 7000, 'Jul': 8000, 'Ago': 10000, 'Set': 6000, 'Out': 4500, 'Nov': 15000, 'Dez': 13000 }
  },

  // ELETRODOMÉSTICOS
  { 
      id: "GEL003", name: "Geladeira Duplex 450L", category: "Eletrodomésticos", stock: 80, status: "In Stock",
      monthlySales: { 'Jan': 10000, 'Fev': 9000, 'Mar': 11000, 'Abr': 10500, 'Mai': 18000, 'Jun': 12000, 'Jul': 13000, 'Ago': 11500, 'Set': 12000, 'Out': 13500, 'Nov': 15000, 'Dez': 12000 }
  },
  { 
      id: "FOG004", name: "Fogão 5 Bocas Inox", category: "Eletrodomésticos", stock: 0, status: "Out of Stock",
      monthlySales: { 'Jan': 8000, 'Fev': 7500, 'Mar': 8500, 'Abr': 8000, 'Mai': 14000, 'Jun': 0, 'Jul': 0, 'Ago': 0, 'Set': 0, 'Out': 0, 'Nov': 0, 'Dez': 0 } // Stockout mid-year
  },
  { 
      id: "MIC007", name: "Micro-ondas 32L", category: "Eletrodomésticos", stock: 200, status: "In Stock",
      monthlySales: { 'Jan': 5000, 'Fev': 4500, 'Mar': 5500, 'Abr': 5000, 'Mai': 9000, 'Jun': 6000, 'Jul': 6500, 'Ago': 5500, 'Set': 6000, 'Out': 7000, 'Nov': 8000, 'Dez': 7500 }
  },
  { 
      id: "LAV009", name: "Lavadora de Roupas 12kg", category: "Eletrodomésticos", stock: 0, status: "Out of Stock",
      monthlySales: { 'Jan': 7000, 'Fev': 6500, 'Mar': 7500, 'Abr': 7000, 'Mai': 12000, 'Jun': 9000, 'Jul': 10000, 'Ago': 9000, 'Set': 9500, 'Out': 11000, 'Nov': 0, 'Dez': 0 } // Stockout for Black Friday
  },
  { 
      id: "FOG013", name: "Fogão 4 Bocas Branco", category: "Eletrodomésticos", stock: 95, status: "In Stock",
      monthlySales: { 'Jan': 3000, 'Fev': 2800, 'Mar': 3200, 'Abr': 3000, 'Mai': 5500, 'Jun': 4000, 'Jul': 4200, 'Ago': 3800, 'Set': 4000, 'Out': 4500, 'Nov': 5000, 'Dez': 4500 }
  },
  { 
      id: "AIR016", name: "Fritadeira Elétrica Air Fryer", category: "Eletrodomésticos", stock: 250, status: "In Stock",
      monthlySales: { 'Jan': 6000, 'Fev': 5500, 'Mar': 6500, 'Abr': 6000, 'Mai': 10000, 'Jun': 7000, 'Jul': 7500, 'Ago': 6500, 'Set': 7000, 'Out': 8000, 'Nov': 12000, 'Dez': 10000 }
  },
  { 
      id: "ASP017", name: "Aspirador de Pó Vertical", category: "Eletrodomésticos", stock: 0, status: "Out of Stock",
      monthlySales: { 'Jan': 2000, 'Fev': 1800, 'Mar': 2200, 'Abr': 2000, 'Mai': 3500, 'Jun': 2500, 'Jul': 2800, 'Ago': 2200, 'Set': 2400, 'Out': 0, 'Nov': 0, 'Dez': 0 }
  },
  { 
      id: "CAF020", name: "Cafeteira Elétrica", category: "Eletrodomésticos", stock: 130, status: "In Stock",
      monthlySales: { 'Jan': 1500, 'Fev': 1200, 'Mar': 1600, 'Abr': 1500, 'Mai': 2500, 'Jun': 1800, 'Jul': 2000, 'Ago': 1600, 'Set': 1800, 'Out': 2200, 'Nov': 3000, 'Dez': 2800 }
  },
  { 
      id: "BATED021", name: "Batedeira Planetária", category: "Eletrodomésticos", stock: 22, status: "Low Stock",
      monthlySales: { 'Jan': 1200, 'Fev': 1000, 'Mar': 1300, 'Abr': 1200, 'Mai': 2000, 'Jun': 1500, 'Jul': 1600, 'Ago': 1300, 'Set': 1400, 'Out': 1800, 'Nov': 2500, 'Dez': 2200 }
  },
  { 
      id: "LIQ022", name: "Liquidificador Turbo", category: "Eletrodomésticos", stock: 300, status: "In Stock",
      monthlySales: { 'Jan': 1000, 'Fev': 800, 'Mar': 1100, 'Abr': 1000, 'Mai': 1800, 'Jun': 1200, 'Jul': 1300, 'Ago': 1000, 'Set': 1100, 'Out': 1400, 'Nov': 2000, 'Dez': 1800 }
  },
  { 
      id: "FER023", name: "Ferro de Passar a Vapor", category: "Eletrodomésticos", stock: 0, status: "Out of Stock",
      monthlySales: { 'Jan': 800, 'Fev': 600, 'Mar': 900, 'Abr': 800, 'Mai': 1200, 'Jun': 0, 'Jul': 0, 'Ago': 0, 'Set': 0, 'Out': 0, 'Nov': 0, 'Dez': 0 }
  },
  { 
      id: "DEP045", name: "Depurador de Ar 60cm", category: "Eletrodomésticos", stock: 40, status: "Low Stock",
      monthlySales: { 'Jan': 1500, 'Fev': 1300, 'Mar': 1600, 'Abr': 1500, 'Mai': 2200, 'Jun': 1800, 'Jul': 1900, 'Ago': 1600, 'Set': 1700, 'Out': 2000, 'Nov': 2500, 'Dez': 2200 }
  },
  { 
      id: "BEB046", name: "Bebedouro de Água Gelada", category: "Eletrodomésticos", stock: 90, status: "In Stock",
      monthlySales: { 'Jan': 2000, 'Fev': 1800, 'Mar': 2100, 'Abr': 2000, 'Mai': 2800, 'Jun': 2400, 'Jul': 2500, 'Ago': 2200, 'Set': 2300, 'Out': 2600, 'Nov': 3200, 'Dez': 3000 }
  },
  { 
      id: "CLI047", name: "Climatizador de Ar", category: "Eletrodomésticos", stock: 0, status: "Out of Stock",
      monthlySales: { 'Jan': 2500, 'Fev': 2200, 'Mar': 2600, 'Abr': 2500, 'Mai': 0, 'Jun': 0, 'Jul': 0, 'Ago': 0, 'Set': 0, 'Out': 0, 'Nov': 0, 'Dez': 0 }
  },
  { 
      id: "VENT057", name: "Ventilador de Coluna", category: "Eletrodomésticos", stock: 240, status: "In Stock",
      monthlySales: { 'Jan': 3500, 'Fev': 3000, 'Mar': 2000, 'Abr': 1500, 'Mai': 1000, 'Jun': 800, 'Jul': 700, 'Ago': 800, 'Set': 1200, 'Out': 2000, 'Nov': 3500, 'Dez': 4000 } // Seasonal
  },
  { 
      id: "SAND058", name: "Sanduicheira Grill", category: "Eletrodomésticos", stock: 170, status: "In Stock",
      monthlySales: { 'Jan': 1200, 'Fev': 1000, 'Mar': 1300, 'Abr': 1200, 'Mai': 2000, 'Jun': 1500, 'Jul': 1600, 'Ago': 1300, 'Set': 1400, 'Out': 1800, 'Nov': 2500, 'Dez': 2200 }
  },
  { 
      id: "PUR059", name: "Purificador de Água", category: "Eletrodomésticos", stock: 15, status: "Low Stock",
      monthlySales: { 'Jan': 1800, 'Fev': 1500, 'Mar': 1900, 'Abr': 1800, 'Mai': 2500, 'Jun': 2000, 'Jul': 2200, 'Ago': 1900, 'Set': 2000, 'Out': 2300, 'Nov': 2800, 'Dez': 2500 }
  },

  // INFORMÁTICA
  { 
      id: "NOTE005", name: "Notebook Gamer i7", category: "Informática", stock: 120, status: "In Stock",
      monthlySales: { 'Jan': 12000, 'Fev': 11000, 'Mar': 5000, 'Abr': 4000, 'Mai': 4500, 'Jun': 5000, 'Jul': 6000, 'Ago': 7000, 'Set': 5000, 'Out': 6000, 'Nov': 14000, 'Dez': 8000 }
  },
  { 
      id: "TAB010", name: "Tablet 10\" 64GB", category: "Informática", stock: 90, status: "In Stock",
      monthlySales: { 'Jan': 5000, 'Fev': 4500, 'Mar': 2000, 'Abr': 1500, 'Mai': 1800, 'Jun': 2000, 'Jul': 2400, 'Ago': 2800, 'Set': 2000, 'Out': 2400, 'Nov': 5000, 'Dez': 3000 }
  },
  { 
      id: "NOTE014", name: "Notebook Essencial i3", category: "Informática", stock: 70, status: "In Stock",
      monthlySales: { 'Jan': 8000, 'Fev': 7500, 'Mar': 3000, 'Abr': 2500, 'Mai': 3000, 'Jun': 3200, 'Jul': 3800, 'Ago': 4500, 'Set': 3200, 'Out': 3800, 'Nov': 9000, 'Dez': 5000 }
  },
  { 
      id: "MON018", name: "Monitor Gamer 27\"", category: "Informática", stock: 65, status: "In Stock",
      monthlySales: { 'Jan': 4000, 'Fev': 3800, 'Mar': 1500, 'Abr': 1200, 'Mai': 1400, 'Jun': 1500, 'Jul': 1800, 'Ago': 2200, 'Set': 1500, 'Out': 1800, 'Nov': 4500, 'Dez': 2500 }
  },
  { 
      id: "IMP026", name: "Impressora Multifuncional", category: "Informática", stock: 110, status: "In Stock",
      monthlySales: { 'Jan': 3000, 'Fev': 2800, 'Mar': 1200, 'Abr': 1000, 'Mai': 1100, 'Jun': 1200, 'Jul': 1400, 'Ago': 1600, 'Set': 1200, 'Out': 1400, 'Nov': 3500, 'Dez': 2000 }
  },
  { 
      id: "TECL027", name: "Teclado Mecânico RGB", category: "Informática", stock: 5, status: "Low Stock",
      monthlySales: { 'Jan': 2000, 'Fev': 1800, 'Mar': 800, 'Abr': 600, 'Mai': 700, 'Jun': 800, 'Jul': 900, 'Ago': 1100, 'Set': 800, 'Out': 900, 'Nov': 2500, 'Dez': 1500 }
  },
  { 
      id: "MOU028", name: "Mouse Sem Fio", category: "Informática", stock: 210, status: "In Stock",
      monthlySales: { 'Jan': 1500, 'Fev': 1300, 'Mar': 600, 'Abr': 500, 'Mai': 550, 'Jun': 600, 'Jul': 700, 'Ago': 800, 'Set': 600, 'Out': 700, 'Nov': 1800, 'Dez': 1200 }
  },
  { 
      id: "HEAD029", name: "Headset Gamer 7.1", category: "Informática", stock: 75, status: "In Stock",
      monthlySales: { 'Jan': 1800, 'Fev': 1600, 'Mar': 700, 'Abr': 600, 'Mai': 650, 'Jun': 700, 'Jul': 800, 'Ago': 1000, 'Set': 700, 'Out': 800, 'Nov': 2200, 'Dez': 1400 }
  },
  { 
      id: "WEBC048", name: "Webcam Full HD", category: "Informática", stock: 130, status: "In Stock",
      monthlySales: { 'Jan': 1200, 'Fev': 1000, 'Mar': 500, 'Abr': 400, 'Mai': 450, 'Jun': 500, 'Jul': 600, 'Ago': 700, 'Set': 500, 'Out': 600, 'Nov': 1500, 'Dez': 1000 }
  },
  { 
      id: "ROTE049", name: "Roteador Wi-Fi 6", category: "Informática", stock: 160, status: "In Stock",
      monthlySales: { 'Jan': 2500, 'Fev': 2200, 'Mar': 1000, 'Abr': 800, 'Mai': 900, 'Jun': 1000, 'Jul': 1200, 'Ago': 1400, 'Set': 1000, 'Out': 1200, 'Nov': 3000, 'Dez': 1800 }
  },

  // MÓVEIS
  { 
      id: "SOF006", name: "Sofá Retrátil 3 Lugares", category: "Móveis", stock: 25, status: "Low Stock",
      monthlySales: { 'Jan': 10000, 'Fev': 6000, 'Mar': 7000, 'Abr': 6500, 'Mai': 7500, 'Jun': 7000, 'Jul': 8000, 'Ago': 7000, 'Set': 6500, 'Out': 7000, 'Nov': 9000, 'Dez': 5000 }
  },
  { 
      id: "CAM008", name: "Cama Box Casal", category: "Móveis", stock: 15, status: "Low Stock",
      monthlySales: { 'Jan': 8000, 'Fev': 5000, 'Mar': 6000, 'Abr': 5500, 'Mai': 6500, 'Jun': 6000, 'Jul': 7000, 'Ago': 6000, 'Set': 5500, 'Out': 6000, 'Nov': 8000, 'Dez': 4000 }
  },
  { 
      id: "SOF015", name: "Poltrona do Papai", category: "Móveis", stock: 18, status: "Low Stock",
      monthlySales: { 'Jan': 3000, 'Fev': 2000, 'Mar': 2500, 'Abr': 2200, 'Mai': 3000, 'Jun': 2500, 'Jul': 3000, 'Ago': 2500, 'Set': 2200, 'Out': 2500, 'Nov': 3500, 'Dez': 2000 }
  },
  { 
      id: "GUA019", name: "Guarda-Roupa Casal 6 Portas", category: "Móveis", stock: 45, status: "Low Stock",
      monthlySales: { 'Jan': 9000, 'Fev': 5500, 'Mar': 6500, 'Abr': 6000, 'Mai': 7000, 'Jun': 6500, 'Jul': 7500, 'Ago': 6500, 'Set': 6000, 'Out': 6500, 'Nov': 8500, 'Dez': 4500 }
  },
  { 
      id: "CADEI024", name: "Cadeira de Escritório Gamer", category: "Móveis", stock: 88, status: "In Stock",
      monthlySales: { 'Jan': 4000, 'Fev': 2500, 'Mar': 3000, 'Abr': 2800, 'Mai': 3200, 'Jun': 3000, 'Jul': 3500, 'Ago': 3000, 'Set': 2800, 'Out': 3000, 'Nov': 4000, 'Dez': 2500 }
  },
  { 
      id: "MESA025", name: "Mesa de Jantar 6 Lugares", category: "Móveis", stock: 33, status: "Low Stock",
      monthlySales: { 'Jan': 5000, 'Fev': 3000, 'Mar': 3500, 'Abr': 3200, 'Mai': 3800, 'Jun': 3500, 'Jul': 4000, 'Ago': 3500, 'Set': 3200, 'Out': 3500, 'Nov': 4500, 'Dez': 3000 }
  },
  { 
      id: "CULT042", name: "Colchão Casal Ortopédico", category: "Móveis", stock: 70, status: "In Stock",
      monthlySales: { 'Jan': 6000, 'Fev': 4000, 'Mar': 4500, 'Abr': 4200, 'Mai': 5000, 'Jun': 4500, 'Jul': 5000, 'Ago': 4500, 'Set': 4200, 'Out': 4500, 'Nov': 5500, 'Dez': 3500 }
  },
  { 
      id: "ESC043", name: "Escrivaninha para Home Office", category: "Móveis", stock: 105, status: "In Stock",
      monthlySales: { 'Jan': 3500, 'Fev': 2000, 'Mar': 2500, 'Abr': 2200, 'Mai': 2800, 'Jun': 2500, 'Jul': 3000, 'Ago': 2500, 'Set': 2200, 'Out': 2500, 'Nov': 3500, 'Dez': 2000 }
  },
  { 
      id: "RACK044", name: "Rack para TV até 65\"", category: "Móveis", stock: 55, status: "In Stock",
      monthlySales: { 'Jan': 4500, 'Fev': 3000, 'Mar': 3500, 'Abr': 3200, 'Mai': 4000, 'Jun': 3500, 'Jul': 4000, 'Ago': 3500, 'Set': 3200, 'Out': 3500, 'Nov': 4500, 'Dez': 3000 }
  },
  { 
      id: "EST055", name: "Estante para Livros", category: "Móveis", stock: 65, status: "In Stock",
      monthlySales: { 'Jan': 2500, 'Fev': 1500, 'Mar': 2000, 'Abr': 1800, 'Mai': 2200, 'Jun': 2000, 'Jul': 2500, 'Ago': 2000, 'Set': 1800, 'Out': 2000, 'Nov': 3000, 'Dez': 1500 }
  },
  { 
      id: "CRI056", name: "Criado-Mudo Retrô", category: "Móveis", stock: 35, status: "Low Stock",
      monthlySales: { 'Jan': 1500, 'Fev': 1000, 'Mar': 1200, 'Abr': 1100, 'Mai': 1500, 'Jun': 1200, 'Jul': 1500, 'Ago': 1200, 'Set': 1100, 'Out': 1200, 'Nov': 2000, 'Dez': 1000 }
  },

  // RANDOM OTHERS
  { 
      id: "SEC032", name: "Secador de Cabelo Profissional", category: "Utilidades Domésticas", stock: 60, status: "In Stock",
      monthlySales: { 'Jan': 2000, 'Fev': 1800, 'Mar': 2100, 'Abr': 2000, 'Mai': 3000, 'Jun': 2400, 'Jul': 2500, 'Ago': 2200, 'Set': 2300, 'Out': 2600, 'Nov': 3200, 'Dez': 3000 }
  },
  { 
      id: "PAN033", name: "Jogo de Panelas Antiaderente", category: "Utilidades Domésticas", stock: 190, status: "In Stock",
      monthlySales: { 'Jan': 3000, 'Fev': 2500, 'Mar': 2800, 'Abr': 2600, 'Mai': 4000, 'Jun': 3200, 'Jul': 3500, 'Ago': 3000, 'Set': 3200, 'Out': 3500, 'Nov': 4500, 'Dez': 4000 }
  },
  { 
      id: "PRA034", name: "Aparelho de Jantar 20 Peças", category: "Utilidades Domésticas", stock: 48, status: "Low Stock",
      monthlySales: { 'Jan': 2500, 'Fev': 2000, 'Mar': 2300, 'Abr': 2200, 'Mai': 3500, 'Jun': 2800, 'Jul': 3000, 'Ago': 2600, 'Set': 2800, 'Out': 3000, 'Nov': 4000, 'Dez': 3500 }
  },
  { 
      id: "TAB060", name: "Tábua de Passar Roupa", category: "Utilidades Domésticas", stock: 100, status: "In Stock",
      monthlySales: { 'Jan': 800, 'Fev': 700, 'Mar': 900, 'Abr': 800, 'Mai': 1000, 'Jun': 900, 'Jul': 950, 'Ago': 850, 'Set': 900, 'Out': 950, 'Nov': 1200, 'Dez': 1100 }
  },
  { 
      id: "FUR035", name: "Furadeira de Impacto", category: "Ferramentas", stock: 140, status: "In Stock",
      monthlySales: { 'Jan': 1500, 'Fev': 1400, 'Mar': 1600, 'Abr': 1500, 'Mai': 1800, 'Jun': 1600, 'Jul': 1700, 'Ago': 2500, 'Set': 1600, 'Out': 1700, 'Nov': 2200, 'Dez': 1800 }
  },
  { 
      id: "PAR036", name: "Parafusadeira a Bateria", category: "Ferramentas", stock: 95, status: "In Stock",
      monthlySales: { 'Jan': 1200, 'Fev': 1100, 'Mar': 1300, 'Abr': 1200, 'Mai': 1500, 'Jun': 1300, 'Jul': 1400, 'Ago': 2200, 'Set': 1300, 'Out': 1400, 'Nov': 1800, 'Dez': 1500 }
  },
  { 
      id: "MAL037", name: "Maleta de Ferramentas 110 Peças", category: "Ferramentas", stock: 38, status: "Low Stock",
      monthlySales: { 'Jan': 1000, 'Fev': 900, 'Mar': 1100, 'Abr': 1000, 'Mai': 1200, 'Jun': 1100, 'Jul': 1200, 'Ago': 2000, 'Set': 1100, 'Out': 1200, 'Nov': 1500, 'Dez': 1300 }
  },
  { 
      id: "ESC061", name: "Escada de Alumínio 5 Degraus", category: "Ferramentas", stock: 75, status: "In Stock",
      monthlySales: { 'Jan': 800, 'Fev': 700, 'Mar': 900, 'Abr': 800, 'Mai': 1000, 'Jun': 900, 'Jul': 950, 'Ago': 1200, 'Set': 900, 'Out': 950, 'Nov': 1100, 'Dez': 1000 }
  },
  { 
      id: "BIC051", name: "Bicicleta Aro 29", category: "Brinquedos", stock: 19, status: "Low Stock",
      monthlySales: { 'Jan': 2000, 'Fev': 1500, 'Mar': 1800, 'Abr': 1600, 'Mai': 1800, 'Jun': 1800, 'Jul': 2200, 'Ago': 1800, 'Set': 1600, 'Out': 2500, 'Nov': 3500, 'Dez': 4500 }
  },
  { 
      id: "BON052", name: "Boneca que Fala", category: "Brinquedos", stock: 115, status: "In Stock",
      monthlySales: { 'Jan': 1500, 'Fev': 1000, 'Mar': 1200, 'Abr': 1100, 'Mai': 1200, 'Jun': 1100, 'Jul': 1300, 'Ago': 1100, 'Set': 1100, 'Out': 3000, 'Nov': 4000, 'Dez': 5000 }
  },
  { 
      id: "CARC053", name: "Carrinho de Controle Remoto", category: "Brinquedos", stock: 85, status: "In Stock",
      monthlySales: { 'Jan': 1200, 'Fev': 800, 'Mar': 1000, 'Abr': 900, 'Mai': 1000, 'Jun': 900, 'Jul': 1100, 'Ago': 900, 'Set': 900, 'Out': 2500, 'Nov': 3500, 'Dez': 4500 }
  },
  { 
      id: "JOG054", name: "Jogo de Tabuleiro Moderno", category: "Brinquedos", stock: 0, status: "Out of Stock",
      monthlySales: { 'Jan': 1000, 'Fev': 600, 'Mar': 800, 'Abr': 700, 'Mai': 800, 'Jun': 700, 'Jul': 900, 'Ago': 700, 'Set': 700, 'Out': 2000, 'Nov': 0, 'Dez': 0 } // Stockout before Xmas
  },
];

export const subscribersData: Subscriber[] = [
    { id: 'S001', name: 'João Pereira', cardId: '**** 1234', lastMonthSpending: 1250.50, status: 'Paid' },
    { id: 'S002', name: 'Maria Oliveira', cardId: '**** 5678', lastMonthSpending: 890.00, status: 'Paid' },
    { id: 'S003', name: 'Pedro Martins', cardId: '**** 9012', lastMonthSpending: 2100.75, status: 'Overdue' },
    { id: 'S004', name: 'Ana Rodrigues', cardId: '**** 3456', lastMonthSpending: 450.20, status: 'Paid' },
    { id: 'S005', name: 'Lucas Ferreira', cardId: '**** 7890', lastMonthSpending: 3200.00, status: 'Paid' },
    { id: 'S006', name: 'Mariana Costa', cardId: '**** 1122', lastMonthSpending: 150.80, status: 'Paid' },
    { id: 'S007', name: 'Rafael Souza', cardId: '**** 3344', lastMonthSpending: 540.00, status: 'Overdue' },
    { id: 'S008', name: 'Beatriz Almeida', cardId: '**** 5566', lastMonthSpending: 980.30, status: 'Paid' },
    { id: 'S009', name: 'Guilherme Lima', cardId: '**** 7788', lastMonthSpending: 275.00, status: 'Paid' },
    { id: 'S010', name: 'Isabela Gonçalves', cardId: '**** 9900', lastMonthSpending: 1800.50, status: 'Overdue' },
    { id: 'S011', name: 'Thiago Ribeiro', cardId: '**** 2468', lastMonthSpending: 720.25, status: 'Paid' },
    { id: 'S012', name: 'Laura Azevedo', cardId: '**** 1357', lastMonthSpending: 310.00, status: 'Paid' },
    { id: 'S013', name: 'Felipe Barros', cardId: '**** 8642', lastMonthSpending: 4200.00, status: 'Paid' },
    { id: 'S014', name: 'Camila Santos', cardId: '**** 9753', lastMonthSpending: 65.90, status: 'Overdue' },
    { id: 'S015', name: 'Leonardo Duarte', cardId: '**** 1001', lastMonthSpending: 95.00, status: 'Paid' },
    { id: 'S016', name: 'Sofia Monteiro', cardId: '**** 2002', lastMonthSpending: 1350.60, status: 'Paid' },
    { id: 'S017', name: 'Matheus Correia', cardId: '**** 3003', lastMonthSpending: 220.70, status: 'Paid' },
    { id: 'S018', name: 'Gabriela Pinto', cardId: '**** 4004', lastMonthSpending: 88.00, status: 'Paid' },
    { id: 'S019', name: 'Enzo Carvalho', cardId: '**** 5005', lastMonthSpending: 750.99, status: 'Overdue' },
    { id: 'S020', name: 'Valentina Cunha', cardId: '**** 6006', lastMonthSpending: 1100.00, status: 'Paid' },
    { id: 'S021', name: 'Davi Mendes', cardId: '**** 7007', lastMonthSpending: 49.90, status: 'Paid' },
    { id: 'S022', name: 'Helena Teixeira', cardId: '**** 8008', lastMonthSpending: 500.00, status: 'Paid' },
    { id: 'S023', name: 'Miguel Castro', cardId: '**** 9009', lastMonthSpending: 300.25, status: 'Overdue' },
    { id: 'S024', name: 'Alice Freire', cardId: '**** 0010', lastMonthSpending: 2500.10, status: 'Paid' },
    { id: 'S025', name: 'Heitor Rocha', cardId: '**** 0020', lastMonthSpending: 15.00, status: 'Paid' },
    { id: 'S026', name: 'Paula Ramos', cardId: '**** 1133', lastMonthSpending: 540.00, status: 'Overdue' },
    { id: 'S027', name: 'Bruno Martins', cardId: '**** 2244', lastMonthSpending: 1200.00, status: 'Paid' },
    { id: 'S028', name: 'Fernanda Lima', cardId: '**** 3355', lastMonthSpending: 350.50, status: 'Paid' },
    { id: 'S029', name: 'Rodrigo Alves', cardId: '**** 4466', lastMonthSpending: 890.90, status: 'Paid' },
    { id: 'S030', name: 'Camila Rocha', cardId: '**** 5577', lastMonthSpending: 45.00, status: 'Paid' },
    { id: 'S031', name: 'Diego Ferreira', cardId: '**** 6688', lastMonthSpending: 210.00, status: 'Overdue' },
    { id: 'S032', name: 'Amanda Gomes', cardId: '**** 7799', lastMonthSpending: 320.10, status: 'Paid' },
    { id: 'S033', name: 'Ricardo Barbosa', cardId: '**** 8800', lastMonthSpending: 1500.00, status: 'Paid' },
    { id: 'S034', name: 'Larissa Dias', cardId: '**** 9911', lastMonthSpending: 600.00, status: 'Overdue' },
    { id: 'S035', name: 'Tiago Castro', cardId: '**** 0022', lastMonthSpending: 85.50, status: 'Paid' },
    { id: 'S036', name: 'Vanessa Moreira', cardId: '**** 1144', lastMonthSpending: 400.00, status: 'Paid' },
    { id: 'S037', name: 'Alexandre Ribeiro', cardId: '**** 2255', lastMonthSpending: 1250.00, status: 'Paid' },
    { id: 'S038', name: 'Patrícia Carvalho', cardId: '**** 3366', lastMonthSpending: 30.00, status: 'Overdue' },
    { id: 'S039', name: 'Eduardo Santos', cardId: '**** 4477', lastMonthSpending: 2200.00, status: 'Paid' },
    { id: 'S040', name: 'Letícia Oliveira', cardId: '**** 5588', lastMonthSpending: 180.00, status: 'Paid' },
    { id: 'S041', name: 'Marcelo Silva', cardId: '**** 6699', lastMonthSpending: 95.00, status: 'Paid' },
    { id: 'S042', name: 'Cláudia Souza', cardId: '**** 7700', lastMonthSpending: 560.40, status: 'Overdue' },
    { id: 'S043', name: 'André Costa', cardId: '**** 8811', lastMonthSpending: 700.00, status: 'Paid' },
    { id: 'S044', name: 'Renata Pereira', cardId: '**** 9922', lastMonthSpending: 1150.00, status: 'Paid' },
    { id: 'S045', name: 'Gustavo Rodrigues', cardId: '**** 0033', lastMonthSpending: 340.00, status: 'Paid' },
    { id: 'S046', name: 'Daniela Almeida', cardId: '**** 1155', lastMonthSpending: 120.00, status: 'Overdue' },
    { id: 'S047', name: 'Fábio Nascimento', cardId: '**** 2266', lastMonthSpending: 1900.00, status: 'Paid' },
    { id: 'S048', name: 'Jéssica Araujo', cardId: '**** 3377', lastMonthSpending: 250.00, status: 'Paid' },
    { id: 'S049', name: 'Roberto Cunha', cardId: '**** 4488', lastMonthSpending: 50.00, status: 'Paid' },
    { id: 'S050', name: 'Tatiane Melo', cardId: '**** 5599', lastMonthSpending: 330.30, status: 'Overdue' },
    { id: 'S051', name: 'Sérgio Pinto', cardId: '**** 6600', lastMonthSpending: 1050.00, status: 'Paid' },
    { id: 'S052', name: 'Luana Teixeira', cardId: '**** 7711', lastMonthSpending: 420.00, status: 'Paid' },
    { id: 'S053', name: 'Wagner Cardozo', cardId: '**** 8822', lastMonthSpending: 900.00, status: 'Paid' },
    { id: 'S054', name: 'Priscila Correia', cardId: '**** 9933', lastMonthSpending: 155.00, status: 'Overdue' },
    { id: 'S055', name: 'Igor Cavalcanti', cardId: '**** 0044', lastMonthSpending: 2300.00, status: 'Paid' },
    { id: 'S056', name: 'Mônica Barros', cardId: '**** 1166', lastMonthSpending: 75.00, status: 'Paid' },
    { id: 'S057', name: 'Leandro Freitas', cardId: '**** 2277', lastMonthSpending: 500.00, status: 'Paid' },
    { id: 'S058', name: 'Natália Moraes', cardId: '**** 3388', lastMonthSpending: 110.00, status: 'Overdue' },
    { id: 'S059', name: 'Adriano Campos', cardId: '**** 4499', lastMonthSpending: 1400.00, status: 'Paid' },
    { id: 'S060', name: 'Elaine Batista', cardId: '**** 5500', lastMonthSpending: 260.00, status: 'Paid' },
    { id: 'S061', name: 'Mauricio Viana', cardId: '**** 6611', lastMonthSpending: 980.00, status: 'Paid' },
    { id: 'S062', name: 'Bianca Antunes', cardId: '**** 7722', lastMonthSpending: 350.00, status: 'Overdue' },
    { id: 'S063', name: 'Vitor Siqueira', cardId: '**** 8833', lastMonthSpending: 600.00, status: 'Paid' },
    { id: 'S064', name: 'Lorena Nogueira', cardId: '**** 9944', lastMonthSpending: 120.00, status: 'Paid' },
    { id: 'S065', name: 'Caio Braga', cardId: '**** 0055', lastMonthSpending: 2000.00, status: 'Paid' },
];

export const employeesData: Employee[] = [
    { id: 'E01', name: 'Fernanda Rocha', position: 'Gerente de Vendas', status: 'present' },
    { id: 'E02', name: 'Ricardo Alves', position: 'Vendedor', status: 'present' },
    { id: 'E03', name: 'Juliana Gomes', position: 'Vendedor', status: 'on_leave' },
    { id: 'E04', name: 'Márcio Santos', position: 'Caixa', status: 'present' },
    { id: 'E05', name: 'Beatriz Azevedo', position: 'Estoquista', status: 'absent' },
    { id: 'E06', name: 'Vinicius Barros', position: 'Vendedor', status: 'present' },
    { id: 'E07', name: 'Lucas Pereira', position: 'Vendedor', status: 'present' },
    { id: 'E08', name: 'Mariana Costa', position: 'Caixa', status: 'present' },
    { id: 'E09', name: 'Rafael Souza', position: 'Estoquista', status: 'present' },
    { id: 'E10', name: 'Beatriz Almeida', position: 'Vendedora', status: 'on_leave' },
    { id: 'E11', name: 'Guilherme Lima', position: 'Vendedor', status: 'present' },
    { id: 'E12', name: 'Isabela Gonçalves', position: 'Caixa', status: 'absent' },
    { id: 'E13', name: 'Thiago Ribeiro', position: 'Estoquista', status: 'present' },
    { id: 'E14', name: 'Laura Azevedo', position: 'Vendedora', status: 'present' },
    { id: 'E15', name: 'Felipe Barros', position: 'Gerente de Loja', status: 'present' },
    { id: 'E16', name: 'Camila Santos', position: 'Atendente', status: 'present' },
    { id: 'E17', name: 'Leonardo Duarte', position: 'Supervisor de Vendas', status: 'present' },
    { id: 'E18', name: 'Sofia Monteiro', position: 'Vendedora', status: 'on_leave' },
    { id: 'E19', name: 'Matheus Correia', position: 'Vendedor', status: 'present' },
    { id: 'E20', name: 'Gabriela Pinto', position: 'Caixa', status: 'present' },
    { id: 'E21', name: 'Enzo Carvalho', position: 'Estoquista', status: 'absent' },
    { id: 'E22', name: 'Valentina Cunha', position: 'Vendedora', status: 'present' },
    { id: 'E23', name: 'Davi Mendes', position: 'Vendedor', status: 'present' },
    { id: 'E24', name: 'Helena Teixeira', position: 'Atendente', status: 'present' },
    { id: 'E25', name: 'Miguel Castro', position: 'Estoquista', status: 'on_leave' },
    { id: 'E26', name: 'Alice Freire', position: 'Gerente de Vendas', status: 'present' },
    { id: 'E27', name: 'Heitor Rocha', position: 'Vendedor', status: 'present' },
    { id: 'E28', name: 'Arthur Moraes', position: 'Caixa', status: 'present' },
    { id: 'E29', name: 'Manuela Dias', position: 'Vendedora', status: 'absent' },
    { id: 'E30', name: 'Bernardo Pinto', position: 'Estoquista', status: 'present' },
    { id: 'E31', name: 'Laura Martins', position: 'Vendedora', status: 'present' },
    { id: 'E32', name: 'Pedro Henrique Gomes', position: 'Vendedor', status: 'present' },
    { id: 'E33', name: 'Luiza Fernandes', position: 'Caixa', status: 'on_leave' },
    { id: 'E34', name: 'Gustavo Oliveira', position: 'Estoquista', status: 'present' },
    { id: 'E35', name: 'Clara Ribeiro', position: 'Vendedora', status: 'present' },
    { id: 'E36', name: 'Murilo Azevedo', position: 'Gerente de Loja', status: 'present' },
    { id: 'E37', name: 'Livia Cardoso', position: 'Atendente', status: 'absent' },
    { id: 'E38', name: 'Lorenzo Ferreira', position: 'Supervisor de Vendas', status: 'present' },
    { id: 'E39', name: 'Heloísa Andrade', position: 'Vendedora', status: 'present' },
    { id: 'E40', name: 'Nicolas Barbosa', position: 'Vendedor', status: 'present' },
    { id: 'E41', name: 'Esther Almeida', position: 'Caixa', status: 'present' },
    { id: 'E42', name: 'Samuel Rocha', position: 'Estoquista', status: 'present' },
];

// --- SUPPLIERS & PRODUCTS TAB DATA ---

export const suppliersKpiData = {
    totalInventoryValue: { value: "R$ 4.72M" },
};

export const suppliersData: Supplier[] = [
    { id: 'F001', name: 'Eletrônicos Master', productsSupplied: 150, onTimeDeliveryRate: 98.5 },
    { id: 'F002', name: 'Eletro Forte', productsSupplied: 210, onTimeDeliveryRate: 96.2 },
    { id: 'F003', name: 'Móveis Conforto', productsSupplied: 85, onTimeDeliveryRate: 99.1 },
    { id: 'F004', name: 'Cell Distribuidora', productsSupplied: 120, onTimeDeliveryRate: 94.8 },
    { id: 'F005', name: 'InfoTech Solutions', productsSupplied: 95, onTimeDeliveryRate: 97.3 },
];

// --- EXPENSES & TRANSPORT TAB DATA ---

export const transportKpiData = {
    onTimeDeliveries: { value: "98.2%", change: "+1.8%", changeType: 'increase' },
    deliveriesCompleted: { value: "8,942", change: "+5.1%", changeType: 'increase' },
};

export const vehiclesData: Vehicle[] = [
    { type: 'motorcycle', count: 12 },
    { type: 'car', count: 8 },
    { type: 'truck', count: 5 },
];

export const expensesData: Expense[] = [
    { type: 'maintenance', amount: 15800 },
    { type: 'fuel', amount: 22500 },
    { type: 'others', amount: 8900 },
];

export const deliveryEmployeesData: DeliveryEmployee[] = [
    { id: 'D01', name: 'Carlos Andrade', deliveries: 152, status: 'present' },
    { id: 'D02', name: 'Eduardo Moreira', deliveries: 145, status: 'present' },
    { id: 'D03', name: 'Fábio Teixeira', deliveries: 138, status: 'on_leave' },
    { id: 'D04', name: 'Gustavo Ribeiro', deliveries: 160, status: 'present' },
    { id: 'D05', name: 'Heitor Nogueira', deliveries: 120, status: 'absent' },
    { id: 'D06', name: 'Ivan Santos', deliveries: 155, status: 'present' },
    { id: 'D07', name: 'Jonas Silva', deliveries: 148, status: 'present' },
    { id: 'D08', name: 'Kleber Oliveira', deliveries: 132, status: 'on_leave' },
    { id: 'D09', name: 'Leandro Costa', deliveries: 165, status: 'present' },
    { id: 'D10', name: 'Marcelo Pereira', deliveries: 115, status: 'absent' },
    { id: 'D11', name: 'Nelson Ferreira', deliveries: 158, status: 'present' },
    { id: 'D12', name: 'Otavio Almeida', deliveries: 142, status: 'present' },
    { id: 'D13', name: 'Paulo Rodrigues', deliveries: 128, status: 'on_leave' },
    { id: 'D14', name: 'Quintino Dias', deliveries: 170, status: 'present' },
    { id: 'D15', name: 'Ricardo Nunes', deliveries: 110, status: 'absent' },
];