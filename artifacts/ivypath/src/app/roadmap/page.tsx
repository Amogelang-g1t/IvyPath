import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Calendar, Tag, Trophy, ChevronRight, Upload, Image as ImageIcon, X } from 'lucide-react';
import { LocalPersistenceService } from '@/api/localPersistence';
import { useAppStore } from '../../store/useAppStore';

export default function RoadmapPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const { dreamCollege } = useAppStore();

  useEffect(() => {
    const saved = LocalPersistenceService.load<any[]>('tasks') || [];
    setTasks(Array.isArray(saved) ? saved : []);
  }, []);

  const toggleTask = (id: string) => {
    const newTasks = tasks.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'completed' ? 'pending' : 'completed' };
      }
      return t;
    });
    setTasks(newTasks);
    LocalPersistenceService.save('tasks', newTasks);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newTasks = tasks.map(t => {
        if (t.id === taskId) {
          return { ...t, proofImage: base64String, status: 'completed' };
        }
        return t;
      });
      setTasks(newTasks);
      LocalPersistenceService.save('tasks', newTasks);
    };
    reader.readAsDataURL(file);
  };

  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true : t.category.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black">Strategic Roadmap</h1>
          <p className="text-[var(--ivy-text-secondary)] font-medium">Your evidence-based path to {dreamCollege.toUpperCase()}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'Academic', 'Testing', 'Extracurricular', 'Strategic', 'High-Impact'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-[0.75rem] font-semibold tracking-[0.08em] uppercase transition-all ${
                filter === cat ? 'bg-[var(--ivy-accent-glow)] text-[var(--ivy-accent)] border border-[var(--ivy-accent)]' : 'border border-[var(--ivy-border)] text-[var(--ivy-text-secondary)] hover:text-[var(--ivy-text-primary)] hover:border-[var(--ivy-border-strong)]'
              }`}
            >
              {cat === 'all' ? 'All Tasks' : cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 glass-card space-y-4">
            <p className="text-[var(--ivy-text-secondary)]">No tasks found for this category.</p>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <div
                className={`p-6 rounded-[12px] border transition-all flex flex-col md:flex-row md:items-center gap-6 ${
                  task.status === 'completed' ? 'bg-[var(--ivy-glass-bg)] border-[var(--ivy-accent)] opacity-80' : 'bg-[var(--ivy-bg-panel)] border-[var(--ivy-border)] hover:-translate-y-[2px] hover:border-[var(--ivy-border-strong)]'
                }`}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="cursor-pointer shrink-0"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-8 h-8 text-[var(--ivy-success)]" />
                  ) : (
                    <Circle className="w-8 h-8 text-[var(--ivy-text-muted)] group-hover:text-[var(--ivy-accent)] transition-colors" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[0.75rem] px-3 py-1 rounded-[24px] font-semibold uppercase tracking-[0.08em] border ${
                      task.priority === 'high' ? 'border-[var(--ivy-danger)] text-[var(--ivy-danger)] bg-[rgba(248,113,113,0.1)]' : 'border-[var(--ivy-border-strong)] text-[var(--ivy-text-secondary)]'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {task.term}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold ${task.status === 'completed' ? 'line-through text-[var(--ivy-text-muted)]' : 'text-[var(--ivy-text-primary)]'}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-[var(--ivy-text-secondary)] leading-relaxed">{task.description}</p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-[var(--ivy-border)] md:border-0">
                  <div className="flex items-center gap-1 text-[var(--ivy-accent)] font-bold text-sm">
                    <Trophy className="w-4 h-4" /> {task.points} pts
                  </div>

                  <div className="flex gap-2">
                    {task.proofImage ? (
                      <button
                        onClick={() => setSelectedProof(task.proofImage)}
                        className="p-2 rounded-[8px] bg-[var(--ivy-accent-glow)] text-[var(--ivy-accent)] hover:bg-[var(--ivy-accent)] hover:text-[#0B1220] transition-all"
                        title="View Proof"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </button>
                    ) : (
                      <label className="p-2 rounded-[8px] bg-[var(--ivy-bg-elevated)] text-[var(--ivy-text-muted)] hover:text-[var(--ivy-accent)] hover:bg-[var(--ivy-accent-glow)] transition-all cursor-pointer" title="Upload Proof">
                        <Upload className="w-5 h-5" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, task.id)}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Proof Modal */}
      <AnimatePresence>
        {selectedProof && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-2 max-w-2xl w-full relative"
            >
              <button
                onClick={() => setSelectedProof(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] text-[var(--ivy-text-muted)] hover:text-[var(--ivy-danger)] shadow-lg flex items-center justify-center transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img src={selectedProof} alt="Task Proof" className="w-full rounded-[8px] shadow-inner" />
              <div className="p-4 text-center">
                <p className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">Verified Achievement</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="text-center py-10">
        <p className="text-sm text-[var(--ivy-text-muted)] italic">
          Upload screenshots as proof of completion to build your digital portfolio.
        </p>
      </footer>
    </div>
  );
}