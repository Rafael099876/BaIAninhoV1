import type { InventoryItem, MonthlySale, DailyPeakSale, ProductTypeSale, SellerSale, Subscriber, Employee, Supplier, Vehicle, Expense, DeliveryEmployee } from '../types';

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

export const sellerSalesData: SellerSale[] = [
    { name: 'Ana Silva', sales: 125000 },
    { name: 'Bruno Costa', sales: 118000 },
    { name: 'Carla Dias', sales: 110000 },
    { name: 'Daniel Souza', sales: 98000 },
    { name: 'Eduarda Lima', sales: 92000 },
];

export const inventoryData: InventoryItem[] = [
  { id: "TV001", name: "Smart TV 55\" 4K", category: "Eletrônicos", stock: 150, status: "In Stock" },
  { id: "CEL002", name: "Smartphone XPTO 256GB", category: "Celulares", stock: 35, status: "Low Stock" },
  { id: "GEL003", name: "Geladeira Duplex 450L", category: "Eletrodomésticos", stock: 80, status: "In Stock" },
  { id: "FOG004", name: "Fogão 5 Bocas Inox", category: "Eletrodomésticos", stock: 0, status: "Out of Stock" },
  { id: "NOTE005", name: "Notebook Gamer i7", category: "Informática", stock: 120, status: "In Stock" },
  { id: "SOF006", name: "Sofá Retrátil 3 Lugares", category: "Móveis", stock: 25, status: "Low Stock" },
  { id: "MIC007", name: "Micro-ondas 32L", category: "Eletrodomésticos", stock: 200, status: "In Stock" },
  { id: "CAM008", name: "Cama Box Casal", category: "Móveis", stock: 15, status: "Low Stock" },
  { id: "LAV009", name: "Lavadora de Roupas 12kg", category: "Eletrodomésticos", stock: 0, status: "Out of Stock" },
  { id: "TAB010", name: "Tablet 10\" 64GB", category: "Informática", stock: 90, status: "In Stock" },
  { id: "TV011", name: "Smart TV 43\" Full HD", category: "Eletrônicos", stock: 180, status: "In Stock" },
  { id: "CEL012", name: "Smartphone ZYX 128GB", category: "Celulares", stock: 40, status: "Low Stock" },
  { id: "FOG013", name: "Fogão 4 Bocas Branco", category: "Eletrodomésticos", stock: 95, status: "In Stock" },
  { id: "NOTE014", name: "Notebook Essencial i3", category: "Informática", stock: 70, status: "In Stock" },
  { id: "SOF015", name: "Poltrona do Papai", category: "Móveis", stock: 18, status: "Low Stock" },
  { id: "AIR016", name: "Fritadeira Elétrica Air Fryer", category: "Eletrodomésticos", stock: 250, status: "In Stock" },
  { id: "ASP017", name: "Aspirador de Pó Vertical", category: "Eletrodomésticos", stock: 0, status: "Out of Stock" },
  { id: "MON018", name: "Monitor Gamer 27\"", category: "Informática", stock: 65, status: "In Stock" },
  { id: "GUA019", name: "Guarda-Roupa Casal 6 Portas", category: "Móveis", stock: 45, status: "Low Stock" },
  { id: "CAF020", name: "Cafeteira Elétrica", category: "Eletrodomésticos", stock: 130, status: "In Stock" },
  { id: "BATED021", name: "Batedeira Planetária", category: "Eletrodomésticos", stock: 22, status: "Low Stock" },
  { id: "LIQ022", name: "Liquidificador Turbo", category: "Eletrodomésticos", stock: 300, status: "In Stock" },
  { id: "FER023", name: "Ferro de Passar a Vapor", category: "Eletrodomésticos", stock: 0, status: "Out of Stock" },
  { id: "CADEI024", name: "Cadeira de Escritório Gamer", category: "Móveis", stock: 88, status: "In Stock" },
  { id: "MESA025", name: "Mesa de Jantar 6 Lugares", category: "Móveis", stock: 33, status: "Low Stock" },
  { id: "IMP026", name: "Impressora Multifuncional", category: "Informática", stock: 110, status: "In Stock" },
  { id: "TECL027", name: "Teclado Mecânico RGB", category: "Informática", stock: 5, status: "Low Stock" },
  { id: "MOU028", name: "Mouse Sem Fio", category: "Informática", stock: 210, status: "In Stock" },
  { id: "HEAD029", name: "Headset Gamer 7.1", category: "Informática", stock: 75, status: "In Stock" },
  { id: "CAI030", name: "Caixa de Som Bluetooth", category: "Eletrônicos", stock: 150, status: "In Stock" },
  { id: "FON031", name: "Fone de Ouvido TWS", category: "Eletrônicos", stock: 0, status: "Out of Stock" },
  { id: "SEC032", name: "Secador de Cabelo Profissional", category: "Utilidades Domésticas", stock: 60, status: "In Stock" },
  { id: "PAN033", name: "Jogo de Panelas Antiaderente", category: "Utilidades Domésticas", stock: 190, status: "In Stock" },
  { id: "PRA034", name: "Aparelho de Jantar 20 Peças", category: "Utilidades Domésticas", stock: 48, status: "Low Stock" },
  { id: "FUR035", name: "Furadeira de Impacto", category: "Ferramentas", stock: 140, status: "In Stock" },
  { id: "PAR036", name: "Parafusadeira a Bateria", category: "Ferramentas", stock: 95, status: "In Stock" },
  { id: "MAL037", name: "Maleta de Ferramentas 110 Peças", category: "Ferramentas", stock: 38, status: "Low Stock" },
  { id: "VID038", name: "Video Game Última Geração", category: "Eletrônicos", stock: 12, status: "Low Stock" },
  { id: "DRON039", name: "Drone com Câmera 4K", category: "Eletrônicos", stock: 28, status: "Low Stock" },
  { id: "SMW040", name: "Smartwatch GPS", category: "Celulares", stock: 180, status: "In Stock" },
  { id: "TVBOX041", name: "TV Box 4K", category: "Eletrônicos", stock: 0, status: "Out of Stock" },
  { id: "CULT042", name: "Colchão Casal Ortopédico", category: "Móveis", stock: 70, status: "In Stock" },
  { id: "ESC043", name: "Escrivaninha para Home Office", category: "Móveis", stock: 105, status: "In Stock" },
  { id: "RACK044", name: "Rack para TV até 65\"", category: "Móveis", stock: 55, status: "In Stock" },
  { id: "DEP045", name: "Depurador de Ar 60cm", category: "Eletrodomésticos", stock: 40, status: "Low Stock" },
  { id: "BEB046", name: "Bebedouro de Água Gelada", category: "Eletrodomésticos", stock: 90, status: "In Stock" },
  { id: "CLI047", name: "Climatizador de Ar", category: "Eletrodomésticos", stock: 0, status: "Out of Stock" },
  { id: "WEBC048", name: "Webcam Full HD", category: "Informática", stock: 130, status: "In Stock" },
  { id: "ROTE049", name: "Roteador Wi-Fi 6", category: "Informática", stock: 160, status: "In Stock" },
  { id: "CARR050", name: "Carregador Portátil 20000mAh", category: "Celulares", stock: 220, status: "In Stock" },
  { id: "BIC051", name: "Bicicleta Aro 29", category: "Brinquedos", stock: 19, status: "Low Stock" },
  { id: "BON052", name: "Boneca que Fala", category: "Brinquedos", stock: 115, status: "In Stock" },
  { id: "CARC053", name: "Carrinho de Controle Remoto", category: "Brinquedos", stock: 85, status: "In Stock" },
  { id: "JOG054", name: "Jogo de Tabuleiro Moderno", category: "Brinquedos", stock: 0, status: "Out of Stock" },
  { id: "EST055", name: "Estante para Livros", category: "Móveis", stock: 65, status: "In Stock" },
  { id: "CRI056", name: "Criado-Mudo Retrô", category: "Móveis", stock: 35, status: "Low Stock" },
  { id: "VENT057", name: "Ventilador de Coluna", category: "Eletrodomésticos", stock: 240, status: "In Stock" },
  { id: "SAND058", name: "Sanduicheira Grill", category: "Eletrodomésticos", stock: 170, status: "In Stock" },
  { id: "PUR059", name: "Purificador de Água", category: "Eletrodomésticos", stock: 15, status: "Low Stock" },
  { id: "TAB060", name: "Tábua de Passar Roupa", category: "Utilidades Domésticas", stock: 100, status: "In Stock" },
  { id: "ESC061", name: "Escada de Alumínio 5 Degraus", category: "Ferramentas", stock: 75, status: "In Stock" },
];

export const subscribersData: Subscriber[] = [
    { id: 'S001', name: 'João Pereira', cardId: '**** 1234', lastMonthSpending: 1250.50 },
    { id: 'S002', name: 'Maria Oliveira', cardId: '**** 5678', lastMonthSpending: 890.00 },
    { id: 'S003', name: 'Pedro Martins', cardId: '**** 9012', lastMonthSpending: 2100.75 },
    { id: 'S004', name: 'Ana Rodrigues', cardId: '**** 3456', lastMonthSpending: 450.20 },
    { id: 'S005', name: 'Lucas Ferreira', cardId: '**** 7890', lastMonthSpending: 3200.00 },
    { id: 'S006', name: 'Mariana Costa', cardId: '**** 1122', lastMonthSpending: 150.80 },
    { id: 'S007', name: 'Rafael Souza', cardId: '**** 3344', lastMonthSpending: 540.00 },
    { id: 'S008', name: 'Beatriz Almeida', cardId: '**** 5566', lastMonthSpending: 980.30 },
    { id: 'S009', name: 'Guilherme Lima', cardId: '**** 7788', lastMonthSpending: 275.00 },
    { id: 'S010', name: 'Isabela Gonçalves', cardId: '**** 9900', lastMonthSpending: 1800.50 },
    { id: 'S011', name: 'Thiago Ribeiro', cardId: '**** 2468', lastMonthSpending: 720.25 },
    { id: 'S012', name: 'Laura Azevedo', cardId: '**** 1357', lastMonthSpending: 310.00 },
    { id: 'S013', name: 'Felipe Barros', cardId: '**** 8642', lastMonthSpending: 4200.00 },
    { id: 'S014', name: 'Camila Santos', cardId: '**** 9753', lastMonthSpending: 65.90 },
    { id: 'S015', name: 'Leonardo Duarte', cardId: '**** 1001', lastMonthSpending: 95.00 },
    { id: 'S016', name: 'Sofia Monteiro', cardId: '**** 2002', lastMonthSpending: 1350.60 },
    { id: 'S017', name: 'Matheus Correia', cardId: '**** 3003', lastMonthSpending: 220.70 },
    { id: 'S018', name: 'Gabriela Pinto', cardId: '**** 4004', lastMonthSpending: 88.00 },
    { id: 'S019', name: 'Enzo Carvalho', cardId: '**** 5005', lastMonthSpending: 750.99 },
    { id: 'S020', name: 'Valentina Cunha', cardId: '**** 6006', lastMonthSpending: 1100.00 },
    { id: 'S021', name: 'Davi Mendes', cardId: '**** 7007', lastMonthSpending: 49.90 },
    { id: 'S022', name: 'Helena Teixeira', cardId: '**** 8008', lastMonthSpending: 500.00 },
    { id: 'S023', name: 'Miguel Castro', cardId: '**** 9009', lastMonthSpending: 300.25 },
    { id: 'S024', name: 'Alice Freire', cardId: '**** 0010', lastMonthSpending: 2500.10 },
    { id: 'S025', name: 'Heitor Rocha', cardId: '**** 0020', lastMonthSpending: 15.00 },
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
