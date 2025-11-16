
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { SendIcon, UserIcon } from '../components/Icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { LogoIcon } from '../components/Icons';

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const isModel = message.role === 'model';
  return (
    <div className={`flex items-start gap-4 ${!isModel && 'justify-end'}`}>
      {isModel && (
        <div className="w-8 h-8 flex-shrink-0 bg-slate-200 rounded-full flex items-center justify-center">
            <LogoIcon />
        </div>
      )}
      <div
        className={`max-w-xl p-4 rounded-2xl ${
          isModel ? 'bg-sky-100 text-slate-800 rounded-tl-none' : 'bg-red-600 text-white rounded-br-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      {!isModel && (
        <div className="w-8 h-8 flex-shrink-0 bg-slate-300 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-gray-300" />
        </div>
      )}
    </div>
  );
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: 'model',
      content: 'Olá! Sou o BaIAninho, seu assistente de logística. Como posso ajudar a otimizar suas operações hoje?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessage: ChatMessageType = { role: 'model', content: '' };
    setMessages((prev) => [...prev, modelMessage]);

    try {
        const responseStream = streamChatResponse(input);
        for await (const chunk of responseStream) {
            setMessages((prev) => {
                const lastMessage = prev[prev.length -1];
                if (lastMessage && lastMessage.role === 'model') {
                    const updatedMessages = [...prev];
                    updatedMessages[prev.length - 1] = {...lastMessage, content: lastMessage.content + chunk};
                    return updatedMessages;
                }
                return prev;
            });
        }
    } catch (error) {
        console.error('Error handling stream:', error);
        setMessages((prev) => {
            const lastMessage = prev[prev.length -1];
            if (lastMessage && lastMessage.role === 'model' && lastMessage.content === '') {
                 const updatedMessages = [...prev];
                 updatedMessages[prev.length - 1] = {...lastMessage, content: "Desculpe, não consegui processar sua solicitação."};
                 return updatedMessages;
            }
            return prev;
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Fix: Display a loading spinner for the empty model message while waiting for a response. */}
        {messages.map((msg, index) => {
          if (index === messages.length - 1 && msg.role === 'model' && msg.content === '' && isLoading) {
            return (
              <div key="loading" className="flex items-start gap-4">
                <div className="w-8 h-8 flex-shrink-0 bg-slate-200 rounded-full flex items-center justify-center"><LogoIcon/></div>
                <div className="bg-sky-100 p-4 rounded-2xl rounded-tl-none"><LoadingSpinner size={20} /></div>
              </div>
            );
          }
          return <ChatMessage key={index} message={msg} />;
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte sobre estoque, rotas, previsões..."
            className="w-full bg-slate-100 text-slate-800 placeholder-slate-400 rounded-full py-3 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
          >
            {isLoading ? <LoadingSpinner size={20}/> : <SendIcon className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;