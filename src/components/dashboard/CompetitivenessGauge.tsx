"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from '../../store/useAppStore';

export default function CompetitivenessGauge({
  score = 0,
  academicScore = 0,
  extracurricularScore = 0,
  essayScore = 0,
  testScore = 0
}) {
  const { dreamCollege } = useAppStore();

  const getScoreColor = (s) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 60) return 'text-amber-600';
    if (s >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Developing';
    return 'Needs Work';
  };

  const breakdown = [
    { label: 'Academics', score: academicScore, icon: '📚', weight: '30%' },
    { label: 'Extracurriculars', score: extracurricularScore, icon: '🏆', weight: '25%' },
    { label: 'Essays', score: essayScore, icon: '✍️', weight: '25%' },
    { label: 'Test Prep', score: testScore, icon: '📝', weight: '20%' },
  ];

  return (
    <div className="neu-flat overflow-hidden border-0 shadow-md p-1">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-stone-800">Readiness Score</h3>
          </div>
          <span className={`text-sm font-bold ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </span>
        </div>

        <div className="relative flex items-center justify-center py-6">
          <svg className="w-48 h-24" viewBox="0 0 200 100">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="var(--color-primary)"
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
              className="text-4xl font-black text-stone-800"
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
              <div className="flex justify-between text-sm">
                <span className="text-stone-600 font-medium">{item.label}</span>
                <span className="font-bold text-stone-800">{item.score}%</span>
              </div>
              <div className="h-3 bg-stone-200 rounded-full overflow-hidden neu-pressed p-0.5">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
}
