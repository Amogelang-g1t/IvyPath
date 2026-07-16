"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Save, Trash2, Award, Zap, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { EssayEngine, Essay } from '../../api/essayEngine';
import { LocalPersistenceService } from '../../api/localPersistence';

export default function EssayWorkspace() {
  const { dreamCollege } = useAppStore();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [activeEssay, setActiveEssay] = useState<Essay | null>(null);
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState({ score: 0, foundKeywords: [], missingKeywords: [], wordCount: 0 });

  useEffect(() => {
    const saved = LocalPersistenceService.load<Essay[]>('essays');
    if (saved) setEssays(saved);
  }, []);

  useEffect(() => {
    if (activeEssay) {
      setContent(activeEssay.content);
      runAnalysis(activeEssay.content);
    }
  }, [activeEssay]);

  const runAnalysis = (text: string) => {
    const result = EssayEngine.analyzeContent(text);
    setAnalysis(result);
  };

  const handleTextChange = (text: string) => {
    setContent(text);
    runAnalysis(text);
    if (activeEssay) {
      const updatedEssay = { ...activeEssay, content: text };
      const updatedEssays = essays.map(e => e.id === activeEssay.id ? updatedEssay : e);
      setEssays(updatedEssays);
      LocalPersistenceService.save('essays', updatedEssays);
    }
  };

  // Fixed save logic
  const saveCurrentEssay = () => {
    if (!activeEssay) return;
    const updatedEssay = { ...activeEssay, content };
    const newEssays = essays.map(e => e.id === activeEssay.id ? updatedEssay : e);
    setEssays(newEssays);
    LocalPersistenceService.save('essays', newEssays);
  };

  const createNewEssay = (prompt: any) => {
    const newEssay: Essay = {
      id: Date.now().toString(),
      title: prompt.title,
      content: '',
      prompt: prompt.desc,
      status: 'draft',
      score: 0
    };
    setEssays([...essays, newEssay]);
    setActiveEssay(newEssay);
    setContent('');
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-stone-800">Essay Workspace</h1>
          <p className="text-stone-500 font-medium">Craft your narrative for {dreamCollege.toUpperCase()}</p>
        </div >
        <div className="flex gap-3">
          <button
            onClick={() => setActiveEssay(null)}
            className="neu-button text-stone-600 font-bold"
          >
            Exit Editor
          </button>
          <button
            onClick={saveCurrentEssay}
            className="neu-button text-primary font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>
        </div >
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar: Essay List & Prompts */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest ml-1">Your Drafts</h3>
            <div className="space-y-3">
              {essays.length === 0 && <p className="text-xs text-stone-400 italic ml-2">No essays started yet.</p>}
              {essays.map(essay => (
                <div
                  key={essay.id}
                  onClick={() => setActiveEssay(essay)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    activeEssay?.id === essay.id ? 'neu-pressed text-primary font-bold' : 'neu-flat text-stone-600'
                  }`}
                >
                  <p className="text-sm truncate">{essay.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] opacity-60 uppercase">{essay.status}</span>
                    <span className="text-xs font-bold">{essay.score}%</span>
                  </div >
                </div >
              ))}
            </div >
          </div >

          <div className="space-y-3">
            <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest ml-1">New Prompt</h3>
            <div className="grid gap-3">
              {EssayEngine.getPrompts().map(prompt => (
                <button
                  key={prompt.id}
                  onClick={() => createNewEssay(prompt)}
                  className="neu-button text-left text-xs p-3 hover:scale-105 transition-all"
                >
                  <p className="font-bold text-stone-800">{prompt.title}</p>
                  <p className="text-stone-500 line-clamp-1">{prompt.desc}</p>
                </button>
              ))}
            </div >
          </div >
        </div >

        {/* Main Editor */}
        <div className="lg:col-span-6 space-y-6">
          {activeEssay ? (
            <div className="space-y-6">
              <div className="neu-flat p-6 space-y-2">
                <h2 className="text-xl font-bold text-stone-800">{activeEssay.title}</h2>
                <p className="text-sm text-stone-500 italic">{activeEssay.prompt}</p>
              </div >
              <textarea
                value={content}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Begin your story here..."
                className="w-full h-[60vh] p-8 rounded-3xl border-0 neu-pressed focus:ring-2 focus:ring-primary outline-none transition-all text-lg leading-relaxed"
              />
            </div >
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 neu-flat space-y-4">
              <FileText className="w-16 h-16 text-stone-300" />
              <h2 className="text-2xl font-bold text-stone-800">No Essay Selected</h2>
              <p className="text-stone-500">Select a draft from the sidebar or start a new one from the prompt library.</p>
            </div >
          )}
        </div >

        {/* Real-time Analysis Panel */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest ml-1">Live Analysis</h3>
          <div className="neu-flat p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#e2e8f0" strokeWidth="8" fill="none" className="neu-pressed" />
                  <motion.circle
                    cx="48" cy="48" r="40"
                    stroke="var(--color-primary)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (analysis.score / 100) * 251.2 }}
                    transition={{ duration: 1 }}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-2xl font-black text-stone-800">{analysis.score}%</span>
              </div >
              <p className="text-xs font-bold text-stone-500 uppercase tracking-tighter">Readiness Score</p>
            </div >

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-stone-600">
                  <span>Word Count</span>
                  <span>{analysis.wordCount} words</span>
                </div >
                <div className="h-2 bg-stone-200 rounded-full overflow-hidden neu-pressed">
                  <motion.div
                    className="h-full bg-primary"
                    animate={{ width: `${Math.min(100, (analysis.wordCount/500)*100)}%` }}
                  />
                </div >
              </div >

              <div className="space-y-3">
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Power Words Found</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.foundKeywords.map(k => (
                    <span key={k} className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded-full font-bold uppercase">
                      {k}
                    </span>
                  ))}
                  {analysis.foundKeywords.length === 0 && <span className="text-xs text-stone-400 italic">None yet...</span>}
                </div >
              </div >

              <div className="space-y-3">
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Suggested Focus</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.slice(0, 3).map(k => (
                    <span key={k} className="text-[10px] px-2 py-1 bg-stone-200 text-stone-500 rounded-full font-medium uppercase">
                      {k}
                    </span>
                  ))}
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
    </div>
  );
}
