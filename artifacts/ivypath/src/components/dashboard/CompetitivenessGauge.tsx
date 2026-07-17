"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Trophy, FileText, ClipboardList } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function CompetitivenessGauge({
  score = 0,
  academicScore = 0,
  extracurricularScore = 0,
  essayScore = 0,
  testScore = 0
}) {
  const { dreamCollege } = useAppStore();

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-[var(--ivy-success)]';
    if (s >= 60) return 'text-amber-400';
    if (s >= 40) return 'text-orange-400';
    return 'text-[var(--ivy-danger)]';
  };

  const getScoreLabel = (s: number) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Developing';
    return 'Needs Work';
  };

  const breakdown = [
    { label: 'Academics', score: academicScore, icon: BookOpen, weight: '30%' },
    { label: 'Extracurriculars', score: extracurricularScore, icon: Trophy, weight: '25%' },
    { label: 'Essays', score: essayScore, icon: FileText, weight: '25%' },
    { label: 'Test Prep', score: testScore, icon: ClipboardList, weight: '20%' },
  ];

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--ivy-accent)]" />
            <h3 className="font-bold text-[var(--ivy-text-primary)]">Readiness Score</h3>
          </div>
          <span className={`text-[0.75rem] uppercase tracking-[0.08em] font-bold ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </span>
        </div>

        <div className="relative flex items-center justify-center py-6">
          <svg className="w-48 h-24" viewBox="0 0 200 100">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="var(--ivy-accent)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray="251"
              initial={{ strokeDashoffset: 251 }}
              animate={{ strokeDashoffset: 251 - (score / 100) * 251 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
            <motion.span
              className="text-4xl font-black text-[var(--ivy-text-primary)] drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {score}%
            </motion.span>
          </div>
        </div>

        <div className="space-y-4">
          {breakdown.map((item, index) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm items-center">
                <span className="text-[var(--ivy-text-secondary)] font-medium flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-[var(--ivy-text-muted)]" />
                  {item.label}
                </span>
                <span className="font-bold text-[var(--ivy-text-primary)]">{item.score}%</span>
              </div>
              <div className="h-2 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--ivy-accent)] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}