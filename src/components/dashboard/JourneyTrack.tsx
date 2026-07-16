import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppStore } from '../../store/useAppStore';
import { UNIVERSITY_THEMES } from '../../config/universities';

const CollegeTower = ({ collegeId }: { collegeId: string }) => {
  const theme = UNIVERSITY_THEMES[collegeId] || UNIVERSITY_THEMES.default;

  return (
    <svg viewBox="0 0 100 200" className="w-16 h-32 drop-shadow-lg">
      <rect x="30" y="160" width="40" height="40" fill="#D1BFA7" />
      <rect x="35" y="60" width="30" height="100" fill="#E8D5B7" />
      <rect x="40" y="70" width="8" height="12" fill={theme.primaryColor} />
      <rect x="52" y="70" width="8" height="12" fill={theme.primaryColor} />
      <rect x="40" y="90" width="8" height="12" fill={theme.primaryColor} />
      <rect x="52" y="90" width="8" height="12" fill={theme.primaryColor} />
      <rect x="40" y="110" width="8" height="12" fill={theme.primaryColor} />
      <rect x="52" y="110" width="8" height="12" fill={theme.primaryColor} />
      <rect x="38" y="40" width="24" height="20" fill="#E8D5B7" />
      <polygon points="50,10 65,40 35,40" fill={theme.primaryColor} />
      <line x1="50" y1="0" x2="50" y2="15" stroke="#333" strokeWidth="1" />
      <rect x="50" y="0" width="20" height="12" fill={theme.primaryColor} />
      <text x="54" y="9" fill="white" fontSize="6" fontWeight="bold">IVY</text>
    </svg>
  );
};

const MiniAvatar = ({ position }: { position: number }) => {
  const leftPosition = `${position}%`;

  return (
    <motion.div
      className="absolute -top-12 z-20"
      style={{ left: leftPosition }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="relative">
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md text-xs whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Let's go!
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
        </motion.div>
        <svg viewBox="0 0 60 100" className="w-12 h-20">
          <ellipse cx="30" cy="18" rx="12" ry="14" fill="#C4956A" />
          <path d="M 18 14 Q 18 4 30 4 Q 42 4 42 14 Q 42 10 30 8 Q 18 10 18 14" fill="#1a1a1a" />
          <ellipse cx="30" cy="8" rx="9" ry="5" fill="#1a1a1a" />
          <path d="M 22 14 L 26 13" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 34 13 L 38 14" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="24" cy="17" rx="2.5" ry="2" fill="white" />
          <ellipse cx="36" cy="17" rx="2.5" ry="2" fill="white" />
          <circle cx="24.5" cy="17.5" r="1.2" fill="#4a3728" />
          <circle cx="36.5" cy="17.5" r="1.2" fill="#4a3728" />
          <path d="M 30 19 L 29 23 L 31 23" stroke="#a67c52" strokeWidth="1" fill="none" />
          <path d="M 26 26 Q 30 29 34 26" stroke="#8B5A2B" strokeWidth="1.2" fill="none" />
          <ellipse cx="17" cy="18" rx="2" ry="3" fill="#C4956A" />
          <ellipse cx="43" cy="18" rx="2" ry="3" fill="#C4956A" />
          <rect x="26" y="30" width="8" height="6" fill="#C4956A" />
          <path d="M 14 36 L 14 70 L 46 70 L 46 36 Q 46 33 40 33 L 20 33 Q 14 33 14 36" fill="#E8E8E8" />
          <path d="M 20 33 Q 22 38 30 38 Q 38 38 40 33" fill="#D0D0D0" />
          <rect x="20" y="52" width="20" height="12" rx="2" fill="#D0D0D0" />
          <line x1="30" y1="38" x2="30" y2="52" stroke="#D0D0D0" strokeWidth="1" />
          <line x1="26" y1="38" x2="26" y2="48" stroke="#CCCCCC" strokeWidth="1.5" />
          <line x1="34" y1="38" x2="34" y2="48" stroke="#CCCCCC" strokeWidth="1.5" />
          <path d="M 14 36 L 6 50 L 6 54 L 10 54 L 14 45" fill="#E8E8E8" />
          <path d="M 46 36 L 54 50 L 54 54 L 50 54 L 46 45" fill="#E8E8E8" />
          <ellipse cx="8" cy="56" rx="4" ry="3" fill="#C4956A" />
          <ellipse cx="52" cy="56" rx="4" ry="3" fill="#C4956A" />
          <rect x="18" y="70" width="10" height="22" fill="#2C3E50" />
          <rect x="32" y="70" width="10" height="22" fill="#2C3E50" />
          <ellipse cx="23" cy="94" rx="7" ry="4" fill="#FFFFFF" />
          <ellipse cx="37" cy="94" rx="7" ry="4" fill="#FFFFFF" />
          <rect x="17" y="91" width="12" height="3" rx="1" fill="#FFFFFF" />
          <rect x="32" y="91" width="12" height="3" rx="1" fill="#FFFFFF" />
        </svg>
      </div>
    </motion.div>
  );
};

export default function JourneyTrack({ tasks = [] }) {
  const { dreamCollege } = useAppStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (tasks.length === 0) {
      setProgress(5);
      return;
    }
    const completed = tasks.filter(t => t.status === 'completed').length;
    const progressPercent = Math.max(5, Math.min(85, (completed / tasks.length) * 100));
    setProgress(progressPercent);
  }, [tasks]);

  const milestones = [
    { id: 1, position: 5, label: "Start", grade: "grade_10", term: "now" },
    { id: 2, position: 12, label: "SAT Prep", grade: "grade_10", term: "term_2" },
    { id: 3, position: 20, label: "Join Clubs", grade: "grade_10", term: "term_3" },
    { id: 4, position: 28, label: "SAT Practice", grade: "grade_11", term: "term_1" },
    { id: 5, position: 36, label: "Leadership", grade: "grade_11", term: "term_2" },
    { id: 6, position: 44, label: "Official SAT", grade: "grade_11", term: "term_3" },
    { id: 7, position: 52, label: "Summer Prep", grade: "grade_11", term: "term_4" },
    { id: 8, position: 60, label: "REA Essays", grade: "grade_12", term: "term_1" },
    { id: 9, position: 68, label: "REA Submit", grade: "grade_12", term: "term_1" },
    { id: 10, position: 76, label: "RD Apps", grade: "grade_12", term: "term_2" },
    { id: 11, position: 84, label: "Interviews", grade: "grade_12", term: "term_3" },
    { id: 12, position: 95, label: "Goal!", grade: "grade_12", term: "final" },
  ];

  const getMilestoneStatus = (milestone) => {
    const relevantTasks = tasks.filter(t =>
      t.grade_level === milestone.grade &&
      (milestone.term === 'now' || t.term === milestone.term)
    );
    if (relevantTasks.length === 0) return 'pending';
    const completed = relevantTasks.filter(t => t.status === 'completed').length;
    if (completed === relevantTasks.length) return 'completed';
    if (completed > 0) return 'in_progress';
    return 'pending';
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-indigo-50 rounded-2xl p-8 overflow-hidden shadow-inner">
      <div className="flex justify-between mb-4 px-4 text-sm font-medium text-stone-600">
        <span className="bg-white/80 px-3 py-1 rounded-full">Grade 10</span>
        <span className="bg-white/80 px-3 py-1 rounded-full">Grade 11</span>
        <span className="bg-white/80 px-3 py-1 rounded-full">Grade 12</span>
      </div>

      <div className="relative h-32 mt-8">
        <svg className="absolute top-1/2 left-4 right-20 h-3 transform -translate-y-1/2" style={{ width: 'calc(100% - 6rem)' }}>
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
          <motion.line
            x1="0" y1="50%" x2={`${progress}%`} y2="50%"
            stroke="var(--color-primary)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
        </svg>

        <MiniAvatar position={progress} />

        <TooltipProvider>
          {milestones.map((milestone, index) => {
            const status = getMilestoneStatus(milestone);
            const isGoal = index === milestones.length - 1;

            return (
              <Tooltip key={milestone.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                    style={{ left: `${milestone.position}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {isGoal ? (
                      <div className="relative">
                        <CollegeTower collegeId={dreamCollege} />
                        <motion.div
                          className="absolute -top-2 left-1/2 -translate-x-1/2"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                        </motion.div>
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
                        status === 'completed'
                          ? 'bg-green-500 text-white'
                          : status === 'in_progress'
                          ? 'bg-primary text-white'
                          : 'bg-white border-2 border-stone-300'
                      }`}>
                        {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                         status === 'in_progress' ? <div className="w-3 h-3 bg-white rounded-full animate-pulse" /> :
                         <Circle className="w-4 h-4 text-stone-400" />}
                      </div>
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{milestone.label}</p>
                  <p className="text-xs opacity-70">{milestone.grade.replace('_', ' ')}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
