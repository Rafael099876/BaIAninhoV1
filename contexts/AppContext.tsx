import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

const translations = {
  pt: {
    // Header
    logisticsDashboard: 'Painel de Logística',
    manager: 'Gerente',
    salesManager: 'Gerente de Vendas',
    companyName: 'Casas Bahia',
    // Settings Menu
    settings: 'Configurações',
    theme: 'Tema',
    lightMode: 'Claro',
    darkMode: 'Escuro',
    language: 'Idioma',
    logout: 'Sair',
    // Login Page
    welcome: 'Bem-vindo ao BaIAninho',
    welcomeSubtitle: 'Seu assistente de logística para decisões inteligentes.',
    selectProfile: 'Selecione seu perfil para continuar',
    ceo: 'CEO',
    // Dashboard Tabs
    sales: 'Vendas',
    suppliersAndProducts: 'Fornecedores e Produtos',
    expensesAndTransport: 'Despesas e Transporte',
    // Sales Tab KPIs
    totalSales: 'Vendas Totais (Unid.)',
    totalRevenue: 'Receita Total',
    averageTicket: 'Ticket Médio',
    totalProductsSold: 'Produtos Vendidos',
    monthlyAverageSales: 'Vendas Médias Mensais',
    annualRevenue: 'Receita Anual',
    inventoryValue: 'Valor do Inventário',
    cardSubscribers: 'Assinantes Cartão CB',
    vsPreviousMonth: 'vs. mês anterior',
    // Sales Tab Charts & Lists
    salesVsGoals: 'Vendas vs. Metas',
    goal: 'Meta',
    dailyPeakSales: 'Pico de Vendas Diárias',
    productTypeRanking: 'Ranking por Tipo de Produto',
    salesRankingBySeller: 'Ranking de Vendas por Vendedor',
    inventoryStatus: 'Status do Inventário',
    search: 'Buscar...',
    product: 'Produto',
    category: 'Categoria',
    stock: 'Estoque',
    status: 'Status',
    subscribersList: 'Lista de Assinantes',
    name: 'Nome',
    cardId: 'ID do Cartão',
    amountSpent: 'Gasto no Último Mês',
    employeesList: 'Lista de Funcionários',
    position: 'Cargo',
    // Suppliers Tab
    quantityByProductType: 'Quantidade por Tipo de Produto',
    productsInStock: 'Produtos em Estoque',
    supplierRanking: 'Ranking de Fornecedores',
    // Expenses Tab
    onTimeDeliveries: 'Entregas no Prazo',
    deliveriesCompleted: 'Entregas Realizadas',
    activeVehicles: 'Veículos Ativos',
    motorcycles: 'Motos',
    cars: 'Carros',
    trucks: 'Caminhões',
    totalExpenses: 'Despesas Totais',
    maintenance: 'Manutenção',
    fuel: 'Combustível',
    others: 'Outros',
    monthlyExpenses: 'Despesas Mensais',
    deliveryEmployees: 'Funcionários (Entregas)',
    // Chat
    chatWithBaianinho: 'Chat com BaIAninho',
    openChat: 'Abrir chat',
    closeChat: 'Fechar chat',
    sendMessage: 'Enviar mensagem',
    askBaianinho: 'Pergunte ao BaIAninho...',
    initialChatMessage: 'Olá! Sou o BaIAninho, seu assistente de logística. Como posso ajudar a otimizar suas operações hoje?',
  },
  en: {
    // Header
    logisticsDashboard: 'Logistics Dashboard',
    manager: 'Manager',
    salesManager: 'Sales Manager',
    companyName: 'Casas Bahia',
    // Settings Menu
    settings: 'Settings',
    theme: 'Theme',
    lightMode: 'Light',
    darkMode: 'Dark',
    language: 'Language',
    logout: 'Logout',
    // Login Page
    welcome: 'Welcome to BaIAninho',
    welcomeSubtitle: 'Your logistics assistant for smart decisions.',
    selectProfile: 'Select your profile to continue',
    ceo: 'CEO',
    // Dashboard Tabs
    sales: 'Sales',
    suppliersAndProducts: 'Suppliers & Products',
    expensesAndTransport: 'Expenses & Transport',
    // Sales Tab KPIs
    totalSales: 'Total Sales (Units)',
    totalRevenue: 'Total Revenue',
    averageTicket: 'Average Ticket',
    totalProductsSold: 'Products Sold',
    monthlyAverageSales: 'Monthly Average Sales',
    annualRevenue: 'Annual Revenue',
    inventoryValue: 'Inventory Value',
    cardSubscribers: 'CB Card Subscribers',
    vsPreviousMonth: 'vs. previous month',
    // Sales Tab Charts & Lists
    salesVsGoals: 'Sales vs. Goals',
    goal: 'Goal',
    dailyPeakSales: 'Daily Peak Sales',
    productTypeRanking: 'Ranking by Product Type',
    salesRankingBySeller: 'Sales Ranking by Seller',
    inventoryStatus: 'Inventory Status',
    search: 'Search...',
    product: 'Product',
    category: 'Category',
    stock: 'Stock',
    status: 'Status',
    subscribersList: 'Subscribers List',
    name: 'Name',
    cardId: 'Card ID',
    amountSpent: 'Amount Spent Last Month',
    employeesList: 'Employees List',
    position: 'Position',
    // Suppliers Tab
    quantityByProductType: 'Quantity by Product Type',
    productsInStock: 'Products in Stock',
    supplierRanking: 'Supplier Ranking',
    // Expenses Tab
    onTimeDeliveries: 'On-Time Deliveries',
    deliveriesCompleted: 'Deliveries Completed',
    activeVehicles: 'Active Vehicles',
    motorcycles: 'Motorcycles',
    cars: 'Cars',
    trucks: 'Trucks',
    totalExpenses: 'Total Expenses',
    maintenance: 'Maintenance',
    fuel: 'Fuel',
    others: 'Others',
    monthlyExpenses: 'Monthly Expenses',
    deliveryEmployees: 'Employees (Deliveries)',
    // Chat
    chatWithBaianinho: 'Chat with BaIAninho',
    openChat: 'Open chat',
    closeChat: 'Close chat',
    sendMessage: 'Send message',
    askBaianinho: 'Ask BaIAninho...',
    initialChatMessage: 'Hello! I\'m BaIAninho, your logistics assistant. How can I help optimize your operations today?',
  },
};

type Language = 'pt' | 'en';
type Theme = 'light' | 'dark';
export type Profile = 'manager' | 'ceo' | null;

type TranslationKeys = keyof typeof translations.pt;

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  profile: Profile;
  setProfile: (profile: Profile) => void;
  t: (key: TranslationKeys) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('pt');
  const [profile, setProfile] = useState<Profile>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, profile, setProfile, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};