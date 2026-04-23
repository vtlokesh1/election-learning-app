import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function GeminiChatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm your Election Assistant. Ask me anything about voting, EVMs, or the electoral process!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Simulate network delay for realistic feel
    setTimeout(() => {
      const text = userMessage.toLowerCase();
      let reply = "I am a static assistant. Please check the FAQ section on our website for more detailed information about the election process.";
      
      if (text.includes('age') || text.includes('old') || text.includes('उम्र') || text.includes('వయస్సు') || text.includes('வயது')) {
        reply = "You must be at least 18 years old to be eligible to vote.";
      } else if (text.includes('evm') || text.includes('machine')) {
        reply = "EVM stands for Electronic Voting Machine. They are highly secure, standalone devices used to cast votes electronically.";
      } else if (text.includes('nota')) {
        reply = "NOTA stands for 'None of the Above'. It allows voters to officially reject all candidates if they choose to do so.";
      } else if (text.includes('how') && text.includes('vote')) {
        reply = "You can vote by first registering on the NVSP portal, verifying your name on the electoral roll, finding your polling booth, and pressing the button next to your candidate on the EVM.";
      } else if (text.includes('hello') || text.includes('hi')) {
        reply = "Hello! How can I assist you with your voting questions today?";
      }

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open Election Assistant Chat"
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-pink-500 text-white flex items-center justify-center border-4 border-white/20 dark:border-slate-800/50",
          isOpen && "hidden"
        )}
      >
        <MessageSquare size={28} />
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            {/* Header */}
            <header className="p-4 bg-gradient-to-r from-blue-500 to-pink-500 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{t('chat.title')}</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {t('chat.status')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none"
              >
                <X size={20} />
              </button>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto",
                    msg.role === 'user' ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300" : "bg-gradient-to-br from-blue-500 to-pink-500 text-white"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-br-sm shadow-md" 
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-100 dark:border-white/5 shadow-sm"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center text-slate-400 p-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white/50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-white/10 shrink-0">
              <div className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  aria-label="Type your message"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="absolute right-2 p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full disabled:opacity-50 disabled:hover:bg-pink-500 transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 outline-none"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">{t('chat.poweredBy')}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
