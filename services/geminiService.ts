import { GoogleGenAI, Chat } from "@google/genai";
import { 
    inventoryData, 
    salesKpiData, 
    salesVsGoalsData, 
    suppliersData, 
    transportKpiData, 
    expensesData, 
    employeesData,
    dailyPeakSalesData,
    productTypeMonthlySalesData,
    sellerMonthlySalesData,
    subscribersData,
    vehiclesData,
    deliveryEmployeesData
} from '../data/mockData';

// Fix: Directly use process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const systemInstruction = `Você é o 'BaIAninho', um assistente de IA especialista em logística para a Casas Bahia. Seu público são gerentes de logística e CEOs. Responda em português do Brasil. Você receberá dados de KPIs, inventário, vendas, fornecedores e despesas no formato JSON. Use esses dados para responder às perguntas. Seja conciso, profissional e forneça insights acionáveis. Formate respostas complexas com markdown, como listas e tabelas. Nunca mencione que você é um modelo de linguagem ou IA, atue sempre como o BaIAninho.`;

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction,
  },
});

const getFullContext = () => {
    return `Contexto de Dados Atuais do Dashboard Logístico da Casas Bahia:
    
    1. VENDAS E METAS:
    - KPIs Gerais: ${JSON.stringify(salesKpiData)}
    - Histórico de Vendas vs Metas: ${JSON.stringify(salesVsGoalsData)}
    - Picos de Vendas por Hora: ${JSON.stringify(dailyPeakSalesData)}
    - Vendas Mensais por Categoria de Produto: ${JSON.stringify(productTypeMonthlySalesData)}
    - Vendas Mensais por Vendedor: ${JSON.stringify(sellerMonthlySalesData)}
    
    2. CLIENTES E ESTOQUE:
    - Lista de Assinantes (Cartão): ${JSON.stringify(subscribersData)}
    - Inventário Detalhado: ${JSON.stringify(inventoryData)}
    
    3. EQUIPE E OPERAÇÃO:
    - Funcionários da Loja: ${JSON.stringify(employeesData)}
    - Fornecedores: ${JSON.stringify(suppliersData)}
    
    4. TRANSPORTE E DESPESAS:
    - KPIs de Transporte: ${JSON.stringify(transportKpiData)}
    - Frota de Veículos: ${JSON.stringify(vehiclesData)}
    - Despesas Operacionais: ${JSON.stringify(expensesData)}
    - Entregadores: ${JSON.stringify(deliveryEmployeesData)}
    `;
};

export async function* streamChatResponse(message: string): AsyncGenerator<string> {
    const fullMessage = `${getFullContext()}\n\nPergunta do usuário: ${message}`;
    
    try {
        const responseStream = await chat.sendMessageStream({ message: fullMessage });
        for await (const chunk of responseStream) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error streaming response from Gemini:", error);
        yield "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.";
    }
}