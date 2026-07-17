import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flame, Trophy, Star } from 'lucide-react';

export default function StatsOverview({ profile, tasks = [], activities = [], essays = [] }: { profile?: any; tasks?: any[]; activities?: any[]; essays?: any[] }) {
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalPoints = tasks.filter(t => t.status === 'completed').reduce((sum, t) => sum + (t.points || 0), 0);

  const stats = [
    { icon: Target, label: 'Tasks', value: `${completedTasks}/${totalTasks}`, subtext: `${progressPercent}%`, color: 'text-[#38BDF8]' },
    { icon: Flame, label: 'Streak', value: `${profile?.streak_days || 0}`, subtext: 'days', color: 'text-orange-400' },
    { icon: Trophy, label: 'Points', value: totalPoints.toLocaleString(), subtext: 'earned', color: 'text-amber-400' },
    { icon: Star, label: 'Readiness', value: `${profile?.competitiveness_score || 0}%`, subtext: 'target score', color: 'text-[#34D399]' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-6 hover:-translate-y-1 transition-transform cursor-pointer border border-[var(--ivy-border)]"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] flex items-center justify-center mb-4 shadow-sm">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <p className="text-3xl font-black text-[var(--ivy-text-primary)]">{stat.value}</p>
          <p className="text-sm text-[var(--ivy-text-secondary)] font-medium mt-1">{stat.label}</p>
          <p className="text-xs text-[var(--ivy-text-muted)] mt-1">{stat.subtext}</p>
        </motion.div>
      ))}
    </div>
  );
}