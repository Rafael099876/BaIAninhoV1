import { GoogleGenAI, Chat } from "@google/genai";
import { inventoryData, kpiData, salesData } from '../data/mockData';

// Fix: Directly use process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const systemInstruction = `Você é o 'BaIAninho', um assistente de IA especialista em logística para a Casas Bahia. Seu público são gerentes de logística e CEOs. Responda em português do Brasil. Você receberá dados de KPIs, inventário e vendas no formato JSON. Use esses dados para responder às perguntas. Seja conciso, profissional e forneça insights acionáveis. Formate respostas complexas com markdown, como listas e tabelas. Nunca mencione que você é um modelo de linguagem ou IA, atue sempre como o BaIAninho.`;

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction,
  },
});

const getFullContext = () => {
    return `Contexto de Dados Atuais:
    - KPIs: ${JSON.stringify(kpiData)}
    - Inventário: ${JSON.stringify(inventoryData)}
    - Vendas: ${JSON.stringify(salesData)}
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