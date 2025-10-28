// Fix: Import ElementType from react
import type { ElementType } from 'react';

export interface Kpi {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  // Fix: Use ElementType instead of React.ElementType
  icon: ElementType;
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