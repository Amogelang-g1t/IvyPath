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
          <h1 className="text-3xl font-black text-stone-800">Strategic Roadmap</h1>
          <p className="text-stone-500 font-medium">Your evidence-based path to {dreamCollege.toUpperCase()}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'Academic', 'Testing', 'Extracurricular', 'Strategic', 'High-Impact'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat ? 'neu-pressed text-primary' : 'neu-button text-stone-500'
              }`}
            >
              {cat === 'all' ? 'All Tasks' : cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 neu-flat space-y-4">
            <p className="text-stone-400">No tasks found for this category.</p>
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
                className={`p-6 rounded-3xl transition-all flex items-center gap-6 ${
                  task.status === 'completed' ? 'neu-pressed opacity-80' : 'neu-flat hover:scale-[1.01]'
                }`}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="cursor-pointer"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : (
                    <Circle className="w-8 h-8 text-stone-300 group-hover:text-primary transition-colors" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                      task.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs font-bold text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {task.term}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold ${task.status === 'completed' ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{task.description}</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-1 text-amber-600 font-black text-sm">
                    <Trophy className="w-4 h-4" /> {task.points} pts
                  </div>

                  <div className="flex gap-2">
                    {task.proofImage ? (
                      <button
                        onClick={() => setSelectedProof(task.proofImage)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                        title="View Proof"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </button>
                    ) : (
                      <label className="p-2 rounded-lg bg-stone-100 text-stone-400 hover:text-primary transition-all cursor-pointer" title="Upload Proof">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="neu-flat bg-white p-2 rounded-3xl max-w-2xl w-full relative"
            >
              <button
                onClick={() => setSelectedProof(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-stone-500 hover:text-red-500 shadow-lg flex items-center justify-center transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <img src={selectedProof} alt="Task Proof" className="w-full rounded-2xl shadow-inner" />
              <div className="p-4 text-center">
                <p className="text-sm font-bold text-stone-600 uppercase tracking-widest">Verified Achievement</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="text-center py-10">
        <p className="text-sm text-stone-400 italic font-medium">
          Upload screenshots as proof of completion to build your digital portfolio.
        </p>
      </footer>
    </div>
  );
}
