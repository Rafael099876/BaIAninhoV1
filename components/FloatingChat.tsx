import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { SendIcon, UserIcon, ChatIcon, XIcon, LogoIcon } from '../components/Icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppContext } from '../contexts/AppContext';

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const isModel = message.role === 'model';
  return (
    <div className={`flex items-start gap-3 ${!isModel && 'justify-end'}`}>
      {isModel && (
        <div className="w-8 h-8 flex-shrink-0 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <LogoIcon />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-sm p-3 rounded-2xl ${
          isModel ? 'bg-sky-100 dark:bg-sky-500/20 text-slate-800 dark:text-slate-200 rounded-tl-none' : 'bg-[var(--brand-red)] text-white rounded-br-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      {!isModel && (
        <div className="w-8 h-8 flex-shrink-0 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-slate-100 dark:text-slate-400" />
        </div>
      )}
    </div>
  );
};

const FloatingChat: React.FC = () => {
  const { t } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: 'model',
      content: t('initialChatMessage'),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // State for dragging functionality
  const [position, setPosition] = useState({ x: 32, y: window.innerHeight - Math.min(window.innerHeight * 0.8, 600) - 32 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);
  
  // Effect for handling drag events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !chatWindowRef.current) return;
        
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;

        const containerWidth = chatWindowRef.current.offsetWidth;
        const containerHeight = chatWindowRef.current.offsetHeight;

        const constrainedX = Math.max(0, Math.min(window.innerWidth - containerWidth, newX));
        const constrainedY = Math.max(0, Math.min(window.innerHeight - containerHeight, newY));

        setPosition({ x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
    };

    if (isDragging) {
        document.body.style.userSelect = 'none';
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
    };
}, [isDragging, offset]);


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
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent dragging when clicking on the button
    if ((e.target as HTMLElement).closest('button')) {
        return;
    }
    if (chatWindowRef.current) {
        setIsDragging(true);
        const rect = chatWindowRef.current.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 z-40 mb-4 ml-4 md:mb-8 md:ml-8 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[var(--brand-red)] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2 focus:ring-offset-slate-100"
          aria-label={t('openChat')}
        >
          <ChatIcon className="w-8 h-8" />
        </button>
      </div>

      <div
        ref={chatWindowRef}
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
        className={`fixed z-50 w-full h-full md:h-auto md:max-h-[80vh] md:w-[400px] md:rounded-lg bg-white dark:bg-slate-800 shadow-xl flex flex-col transition-opacity duration-300 ease-in-out
          ${ isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none' }
        `}
        role="dialog"
        aria-hidden={!isOpen}
      >
        <div 
            onMouseDown={handleMouseDown}
            className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 cursor-move"
        >
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{t('chatWithBaianinho')}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-slate-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
            aria-label={t('closeChat')}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => {
            if (index === messages.length - 1 && msg.role === 'model' && msg.content === '' && isLoading) {
              return (
                <div key="loading" className="flex items-start gap-4">
                  <div className="w-8 h-8 flex-shrink-0 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center"><LogoIcon/></div>
                  <div className="bg-sky-100 dark:bg-sky-500/20 p-4 rounded-2xl rounded-tl-none"><LoadingSpinner size={20} /></div>
                </div>
              );
            }
            return <ChatMessage key={index} message={msg} />;
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('askBaianinho')}
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-full py-3 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--brand-red)] text-white disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:opacity-90 transition-colors"
              aria-label={t('sendMessage')}
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