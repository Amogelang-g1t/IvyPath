import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flame, Trophy, Star } from 'lucide-react';

export default function StatsOverview({ profile, tasks = [], activities = [], essays = [] }) {
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalPoints = tasks.filter(t => t.status === 'completed').reduce((sum, t) => sum + (t.points || 0), 0);

  const stats = [
    { icon: Target, label: 'Tasks', value: `${completedTasks}/${totalTasks}`, subtext: `${progressPercent}%`, color: 'from-blue-500 to-blue-600' },
    { icon: Flame, label: 'Streak', value: `${profile?.streak_days || 0}`, subtext: 'days', color: 'from-orange-500 to-red-500' },
    { icon: Trophy, label: 'Points', value: totalPoints.toLocaleString(), subtext: 'earned', color: 'from-amber-500 to-yellow-500' },
    { icon: Star, label: 'Readiness', value: `${profile?.competitiveness_score || 0}%`, subtext: 'target score', color: 'from-primary to-indigo-600' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="neu-flat p-4 hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center mb-3 shadow-inner">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-800">{stat.value}</p>
          <p className="text-sm text-stone-600 font-medium">{stat.label}</p>
          <p className="text-xs text-stone-400">{stat.subtext}</p>
        </motion.div>
      ))}
    </div>
  );
}
