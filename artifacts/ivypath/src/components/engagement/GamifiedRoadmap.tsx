import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const GamifiedRoadmap: React.FC = () => {
  const { currentStep } = useAppStore();

  const steps = [
    { id: 0, label: 'Welcome', icon: '1' },
    { id: 1, label: 'Profile', icon: '2' },
    { id: 2, label: 'Dream College', icon: '3' },
    { id: 3, label: 'Pathway', icon: '4' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 px-4 flex justify-center z-40 pointer-events-none">
      <div className="glass-card p-3 rounded-full flex items-center gap-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
              ${index <= currentStep
                ? 'bg-[var(--ivy-accent)] text-[#0B1220] scale-110 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] text-[var(--ivy-text-muted)]'}
            `}>
              {step.icon}
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 w-6 rounded-full transition-all duration-500 ${
                index < currentStep ? 'bg-[var(--ivy-accent)] shadow-[0_0_8px_rgba(56,189,248,0.4)]' : 'bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)]'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};