
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { SendIcon, UserIcon, ChatIcon, XIcon, LogoIcon } from '../components/Icons';
import LoadingSpinner from '../components/LoadingSpinner';

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const isModel = message.role === 'model';
  return (
    <div className={`flex items-start gap-3 ${!isModel && 'justify-end'}`}>
      {isModel && (
        <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center">
            <LogoIcon />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-sm p-3 rounded-2xl ${
          isModel ? 'bg-gray-700 rounded-tl-none' : 'bg-red-600 text-white rounded-br-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }}></p>
      </div>
      {!isModel && (
        <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-gray-300" />
        </div>
      )}
    </div>
  );
};

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

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
    <>
      <div
        className={`fixed bottom-0 left-0 z-40 mb-4 ml-4 md:mb-8 md:ml-8 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-[-200%]' : 'translate-x-0'}`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Abrir chat"
        >
          <ChatIcon className="w-8 h-8" />
        </button>
      </div>

      <div
        className={`fixed bottom-0 left-0 z-50 w-full h-full md:h-auto md:max-h-[80vh] md:w-[400px] md:mb-8 md:ml-8 md:rounded-lg bg-gray-800 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-[-150%]'
        }`}
        role="dialog"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Chat com BaIAninho</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Fechar chat"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => {
            if (index === messages.length - 1 && msg.role === 'model' && msg.content === '' && isLoading) {
              return (
                <div key="loading" className="flex items-start gap-4">
                  <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center"><LogoIcon/></div>
                  <div className="bg-gray-700 p-4 rounded-2xl rounded-tl-none"><LoadingSpinner size={20} /></div>
                </div>
              );
            }
            return <ChatMessage key={index} message={msg} />;
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte ao BaIAninho..."
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full py-3 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-600 text-white disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
              aria-label="Enviar mensagem"
            >
              {isLoading ? <LoadingSpinner size={20}/> : <SendIcon className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FloatingChat;
