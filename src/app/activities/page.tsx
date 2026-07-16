"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Award, TrendingUp, Star, ExternalLink, Tag } from 'lucide-react';
import { LocalPersistenceService } from '@/api/localPersistence';
import { useAppStore } from '../../store/useAppStore';

interface Activity {
  id: string;
  name: string;
  role: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'exceptional';
  category: string;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: '', role: '', description: '', impact: 'medium', category: 'Leadership'
  });

  useEffect(() => {
    const saved = LocalPersistenceService.load<Activity[]>('activities');
    if (saved) setActivities(saved);
  }, []);

  const addActivity = () => {
    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString(),
    };
    const updated = [...activities, activity];
    setActivities(updated);
    LocalPersistenceService.save('activities', updated);
    setIsAdding(false);
    setNewActivity({ name: '', role: '', description: '', impact: 'medium', category: 'Leadership' });
  };

  const deleteActivity = (id: string) => {
    const updated = activities.filter(a => a.id !== id);
    setActivities(updated);
    LocalPersistenceService.save('activities', updated);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-stone-800">Extracurricular Profile</h1>
          <p className="text-stone-500 font-medium">Defining your "Spike"—the unique value you bring to campus.</p>
        </div >
        <button
          onClick={() => setIsAdding(true)}
          className="neu-button text-primary font-bold flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Activity
        </button>
      </header>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-flat p-8 space-y-6 max-w-2xl mx-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-stone-800 uppercase tracking-widest text-sm">New Activity</h3>
            <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button
          </div >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase ml-1">Organization/Project</label>
              <input
                type="text"
                value={newActivity.name}
                onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none"
                placeholder="e.g. Robotics Club"
              />
            </div >
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase ml-1">Your Role</label>
              <input
                type="text"
                value={newActivity.role}
                onChange={(e) => setNewActivity({...newActivity, role: e.target.value})}
                className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none"
                placeholder="e.g. Founder & President"
              />
            </div >
          </div >

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase ml-1">Description of Impact</label>
            <textarea
              value={newActivity.description}
              onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
              className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none h-32"
              placeholder="Quantify your achievements (e.g. 'Increased membership by 50% and raised $2k')..."
            />
          </div >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase ml-1">Impact Level</label>
              <select
                value={newActivity.impact}
                onChange={(e) => setNewActivity({...newActivity, impact: e.target.value})}
                className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none appearance-none"
              >
                <option value="low">Local / Low</option>
                <option value="medium">Regional / Medium</option>
                <option value="high">National / High</option>
                <option value="exceptional">International / Exceptional</option>
              </select>
            </div >
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase ml-1">Category</label>
              <select
                value={newActivity.category}
                onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
                className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none appearance-none"
              >
                <option value="Leadership">Leadership</option>
                <option value="Academic">Academic Research</option>
                <option value="Arts">Arts & Culture</option>
                <option value="Athletics">Athletics</option>
                <option value="Community">Community Service</option>
              </select>
            </div >
          </div >

          <div className="flex justify-end pt-4">
            <button
              onClick={addActivity}
              className="neu-button px-10 py-4 text-primary font-black hover:scale-105 transition-all"
            >
              Add to Profile
            </button>
          </div >
        </motion.div>
      </div >

      <div className="grid md:grid-cols-2 gap-6">
        {activities.length === 0 ? (
          <div className="col-span-2 text-center py-20 neu-flat space-y-4">
            <Award className="w-12 h-12 text-stone-300 mx-auto" />
            <p className="text-stone-400 font-medium">Your profile is a blank slate. Start adding your achievements!</p>
          </div >
        ) : (
          activities.map(activity => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="neu-flat p-6 space-y-4 group relative"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-stone-800">{activity.name}</h3>
                  <p className="text-primary font-bold text-sm">{activity.role}</p>
                </div >
                <button
                  onClick={() => deleteActivity(activity.id)}
                  className="p-2 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div >

              <p className="text-sm text-stone-500 leading-relaxed italic">
                "{activity.description}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                  <Tag className="w-3 h-3" /> {activity.category}
                </div >
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  activity.impact === 'exceptional' ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-500'
                }`}>
                  {activity.impact} Impact
                </div >
              </div >
            </motion.div>
          ))
        )}
      </div >
    </div >
  );
}
