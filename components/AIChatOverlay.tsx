
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/geminiService';

const AIChatOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Sorry, I missed that.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error connecting to AI. Please check your API key.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-50 size-14 rounded-full bg-primary text-background-dark shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'smart_toy'}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-36 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] bg-surface-dark border border-primary/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-primary/20 bg-surface-accent/50 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <h3 className="font-bold text-white">FitLife AI Coach</h3>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-background-dark/50">
            {messages.length === 0 && (
              <div className="text-center text-text-dim py-10">
                <p>Hello! Ask me anything about your workouts, diet, or progress.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-background-dark rounded-tr-none' : 'bg-surface-accent text-white rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-accent p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-surface-dark border-t border-primary/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a coach..."
              className="flex-1 bg-background-dark text-white border-none rounded-lg focus:ring-1 focus:ring-primary text-sm h-10 px-3"
            />
            <button
              onClick={handleSend}
              className="size-10 bg-primary rounded-lg text-background-dark flex items-center justify-center hover:bg-primary-hover transition-colors"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatOverlay;
