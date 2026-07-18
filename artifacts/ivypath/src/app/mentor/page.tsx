import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Trash2, Wifi, WifiOff } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { MentorEngine, MentorResponse } from '../../api/mentorEngine';
import { LocalPersistenceService } from '../../api/localPersistence';
import { AnalyticsService } from '../../api/analyticsService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mentor';
  type?: MentorResponse['type'];
  timestamp: Date;
}

function detectMode(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('essay') || t.includes('write') || t.includes('draft')) return 'essay';
  if (t.includes('interview') || t.includes('practice')) return 'interview';
  return 'general';
}

export default function MentorPage() {
  const { userProfile } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = LocalPersistenceService.load<Message[]>('mentor_chat');
    if (saved) setMessages(saved);
    else {
      setMessages([{
        id: '1',
        text: "Hello! I'm your IvyPath AI Advisor. Ask me about essays, interviews, scholarships, or how to build a standout application.",
        sender: 'mentor',
        type: 'encouragement',
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const mode = detectMode(userText);

    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Record analytics
    AnalyticsService.recordChatMessage();

    const thinkingId = Date.now().toString() + '_think';
    setMessages(prev => [...prev, {
      id: thinkingId,
      text: isOnline ? 'Thinking...' : 'Analyzing profile...',
      sender: 'mentor',
      timestamp: new Date()
    }]);

    let replyText = '';
    let replyType: MentorResponse['type'] = 'strategic';

    const currentOnline = navigator.onLine;

    if (currentOnline) {
      try {
        // Build conversation history from current messages + new user message
        const historyMessages = [...messages, userMsg]
          .filter(m => m.sender === 'user' || m.sender === 'mentor')
          .filter(m => !m.id.endsWith('_think'))
          .slice(-10)
          .map(m => ({
            role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
            content: m.text
          }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: historyMessages, mode })
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        replyText = data.reply || '';
        replyType = 'strategic';
      } catch {
        // Fall back to offline engine if fetch fails
        const fallback = MentorEngine.getAdvice(userText, userProfile);
        replyText = fallback.text;
        replyType = fallback.type;
      }
    } else {
      const fallback = MentorEngine.getAdvice(userText, userProfile);
      replyText = fallback.text;
      replyType = fallback.type;
    }

    const mentorMsg: Message = {
      id: Date.now().toString(),
      text: replyText,
      sender: 'mentor',
      type: replyType,
      timestamp: new Date()
    };

    setMessages(prev => {
      const filtered = prev.filter(m => m.id !== thinkingId).concat(mentorMsg);
      LocalPersistenceService.save('mentor_chat', filtered);
      return filtered;
    });
  };

  const clearChat = () => {
    setMessages([]);
    LocalPersistenceService.save('mentor_chat', []);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--ivy-accent)] flex items-center justify-center text-[#0B1220]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black">AI Strategic Mentor</h1>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <span className="flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-cyan-400">
                  <Wifi className="w-3 h-3" /> AI Mode
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[var(--ivy-text-muted)]">
                  <WifiOff className="w-3 h-3" /> Offline Mode
                </span>
              )}
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="btn-ghost hover:!border-[var(--ivy-danger)] hover:!text-[var(--ivy-danger)] !px-3">
          <Trash2 className="w-4 h-4" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl transition-all ${
                msg.sender === 'user'
                  ? 'bg-[var(--ivy-accent-glow)] border border-[rgba(56,189,248,0.25)] text-[var(--ivy-text-primary)] rounded-tr-sm'
                  : 'glass-panel rounded-tl-sm'
              }`}>
                <div className={`flex items-center gap-2 mb-1 opacity-60 text-[10px] font-black uppercase ${msg.sender === 'user' ? 'text-[var(--ivy-accent)]' : 'text-[var(--ivy-text-muted)]'}`}>
                  {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  {msg.sender === 'user' ? 'You' : 'Mentor'}
                </div>
                <p className="text-sm leading-relaxed text-[var(--ivy-text-primary)]">{msg.text}</p>
                <div className="text-right mt-2 text-[9px] opacity-40 text-[var(--ivy-text-muted)]">
                  {msg.timestamp instanceof Date
                    ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative pt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about essays, interview prep, scholarships..."
          className="input-field !pr-16 !py-4 !rounded-[12px] bg-[var(--ivy-bg-panel)] border-[var(--ivy-border-strong)]"
        />
        <button
          onClick={handleSend}
          className="absolute right-2 top-6 bottom-2 w-12 bg-[var(--ivy-accent)] text-[#0B1220] rounded-[8px] flex items-center justify-center hover:bg-opacity-90 transition-all shadow-lg"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
