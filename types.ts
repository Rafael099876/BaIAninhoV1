import type { ElementType } from 'react';

export interface Kpi {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: ElementType;
  description?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface MonthlySale {
  month: string;
  vendas: number;
  meta: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

// BaIAninho 2.0 Types

export interface DailyPeakSale {
  hour: string;
  sales: number;
}

export interface ProductTypeSale {
  name: string;
  value: number;
  // Fix: Add index signature to satisfy Recharts data prop type.
  [key: string]: string | number;
}

export interface SellerSale {
  name: string;
  sales: number;
}

export interface Subscriber {
  id: string;
  name: string;
  cardId: string;
  lastMonthSpending: number;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  status: 'present' | 'on_leave' | 'absent';
}

export interface Supplier {
  id: string;
  name: string;
  productsSupplied: number;
  onTimeDeliveryRate: number;
}

export interface Vehicle {
    type: 'motorcycle' | 'car' | 'truck';
    count: number;
}

export interface Expense {
    type: 'maintenance' | 'fuel' | 'others';
    amount: number;
}

export interface DeliveryEmployee {
    id: string;
    name: string;
    deliveries: number;
    status: 'present' | 'on_leave' | 'absent';
}