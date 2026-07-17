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
  const [analysis, setAnalysis] = useState<{ score: number; foundKeywords: string[]; missingKeywords: string[]; wordCount: number }>({ score: 0, foundKeywords: [], missingKeywords: [], wordCount: 0 });

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
          <h1 className="text-3xl font-black">Essay Workspace</h1>
          <p className="text-[var(--ivy-text-secondary)] font-medium">Craft your narrative for {dreamCollege.toUpperCase()}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveEssay(null)}
            className="btn-ghost"
          >
            Exit Editor
          </button>
          <button
            onClick={saveCurrentEssay}
            className="btn-primary"
          >
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar: Essay List & Prompts */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-4 space-y-4">
            <h3 className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">Your Drafts</h3>
            <div className="space-y-2">
              {essays.length === 0 && <p className="text-xs text-[var(--ivy-text-muted)] italic">No essays started yet.</p>}
              {essays.map(essay => (
                <div
                  key={essay.id}
                  onClick={() => setActiveEssay(essay)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeEssay?.id === essay.id ? 'bg-[var(--ivy-bg-elevated)] border-[var(--ivy-accent)] border-l-4' : 'bg-transparent border-transparent hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  <p className={`text-sm font-bold truncate ${activeEssay?.id === essay.id ? 'text-[var(--ivy-text-primary)]' : 'text-[var(--ivy-text-secondary)]'}`}>{essay.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-[var(--ivy-text-muted)] uppercase">{essay.status}</span>
                    <span className="text-xs font-bold text-[var(--ivy-accent)]">{essay.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 space-y-4">
            <h3 className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">New Prompt</h3>
            <div className="grid gap-2">
              {EssayEngine.getPrompts().map(prompt => (
                <button
                  key={prompt.id}
                  onClick={() => createNewEssay(prompt)}
                  className="text-left text-xs p-3 rounded-lg border border-[var(--ivy-border)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[var(--ivy-border-strong)] transition-all"
                >
                  <p className="font-bold text-[var(--ivy-text-primary)]">{prompt.title}</p>
                  <p className="text-[var(--ivy-text-muted)] mt-1 line-clamp-2 leading-relaxed">{prompt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="lg:col-span-6 space-y-6">
          {activeEssay ? (
            <div className="space-y-4">
              <div className="glass-panel p-6 space-y-2 border-l-4 border-l-[var(--ivy-accent)]">
                <h2 className="text-xl font-bold">{activeEssay.title}</h2>
                <p className="text-sm text-[var(--ivy-text-secondary)] leading-relaxed italic">{activeEssay.prompt}</p>
              </div>
              <textarea
                value={content}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Begin your story here..."
                className="w-full h-[60vh] p-8 rounded-[12px] bg-[rgba(15,26,46,0.5)] border border-[var(--ivy-glass-border)] text-[var(--ivy-text-primary)] focus:border-[var(--ivy-accent)] focus:ring-1 focus:ring-[var(--ivy-accent)] outline-none transition-all text-lg leading-relaxed resize-none"
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 glass-card space-y-4">
              <FileText className="w-16 h-16 text-[var(--ivy-text-muted)]" />
              <h2 className="text-2xl font-bold text-[var(--ivy-text-primary)]">No Essay Selected</h2>
              <p className="text-[var(--ivy-text-secondary)]">Select a draft from the sidebar or start a new one from the prompt library.</p>
            </div>
          )}
        </div>

        {/* Real-time Analysis Panel */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] ml-1">Live Analysis</h3>
          <div className="glass-card p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="48" cy="48" r="40"
                    stroke="var(--ivy-accent)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (analysis.score / 100) * 251.2 }}
                    transition={{ duration: 1 }}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-2xl font-black text-[var(--ivy-text-primary)]">{analysis.score}%</span>
              </div>
              <p className="text-xs font-bold text-[var(--ivy-text-muted)] uppercase tracking-tighter">Readiness Score</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[var(--ivy-text-secondary)]">
                  <span>Word Count</span>
                  <span>{analysis.wordCount} words</span>
                </div>
                <div className="h-2 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--ivy-accent)]"
                    animate={{ width: `${Math.min(100, (analysis.wordCount/500)*100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">Power Words Found</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.foundKeywords.map(k => (
                    <span key={k} className="text-[10px] px-2 py-1 bg-[var(--ivy-accent-glow)] border border-[var(--ivy-accent)] text-[var(--ivy-accent)] rounded-[24px] font-bold uppercase">
                      {k}
                    </span>
                  ))}
                  {analysis.foundKeywords.length === 0 && <span className="text-xs text-[var(--ivy-text-muted)] italic">None yet...</span>}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">Suggested Focus</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.slice(0, 3).map(k => (
                    <span key={k} className="text-[10px] px-2 py-1 bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] text-[var(--ivy-text-secondary)] rounded-[24px] font-medium uppercase">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}