'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot({ context }: { context: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hi! I am your Attendance Advisor. Ask me anything about your attendance!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context }),
      });

      const data = await res.json();
      
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 active:scale-95 z-50 flex items-center justify-center"
        aria-label="Open Chat"
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 text-white"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-white" />
                <span className="font-semibold text-white">Attendance Advisor</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[400px] flex flex-col gap-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${m.role === 'user' ? 'bg-indigo-600 rounded-tr-none' : 'bg-gray-800 rounded-tl-none border border-gray-700'}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 flex-row">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-gray-800 rounded-tl-none border border-gray-700 flex items-center">
                    <Loader2 size={16} className="animate-spin text-gray-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-900 border-t border-gray-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your attendance..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-indigo-600 rounded-xl text-white disabled:opacity-50 hover:bg-indigo-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
