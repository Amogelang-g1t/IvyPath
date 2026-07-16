"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { MentorEngine, MentorResponse } from '../../api/mentorEngine';
import { LocalPersistenceService } from '../../api/localPersistence';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mentor';
  type?: MentorResponse['type'];
  timestamp: Date;
}

export default function MentorPage() {
  const { userProfile } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = LocalPersistenceService.load<Message[]>('mentor_chat');
    if (saved) setMessages(saved);
    else {
      setMessages([{
        id: '1',
        text: "Hello. I am your Ivy League Strategic Advisor. How can I help you optimize your profile today?",
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate "Thinking"
    const thinkingId = Date.now().toString() + '_think';
    setMessages(prev => [...prev, {
      id: thinkingId,
      text: 'Analyzing profile...',
      sender: 'mentor',
      timestamp: new Date()
    }]);

    await new Promise(res => setTimeout(res, 1200));

    const response = MentorEngine.getAdvice(input, userProfile);
    const mentorMsg: Message = {
      id: Date.now().toString(),
      text: response.text,
      sender: 'mentor',
      type: response.type,
      timestamp: new Date()
    };

    setMessages(prev => prev.filter(m => m.id !== thinkingId).concat(mentorMsg));
    LocalPersistenceService.save('mentor_chat', [...messages, userMsg, mentorMsg]);
  };

  const clearChat = () => {
    setMessages([]);
    LocalPersistenceService.save('mentor_chat', []);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <Bot className="w-6 h-6" />
          </div >
          <div>
            <h1 className="text-2xl font-black text-stone-800">AI Strategic Mentor</h1>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Offline Expert System</p>
          </div >
        </div >
        <button
          onClick={clearChat}
          className="neu-button text-stone-500 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth"
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl transition-all ${
                msg.sender === 'user'
                  ? 'neu-flat bg-primary text-white font-medium'
                  : 'neu-pressed text-stone-700'
              }`}>
                <div className="flex items-center gap-2 mb-1 opacity-60 text-[10px] font-black uppercase">
                  {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  {msg.sender === 'user' ? 'You' : 'Mentor'}
                </div >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className="text-right mt-1 text-[9px] opacity-40">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div >
              </div >
            </motion.div>
          ))}
        </AnimatePresence>
      </div >

      <div className="relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your profile, GPA, or target college..."
          className="w-full p-5 pr-16 rounded-3xl border-0 neu-pressed focus:ring-2 focus:ring-primary outline-none transition-all text-stone-700"
        />
        <button
          onClick={handleSend}
          className="absolute right-3 top-3 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-lg"
        >
          <Send className="w-5 h-5" />
        </button>
      </div >
    </div >
  );
}
