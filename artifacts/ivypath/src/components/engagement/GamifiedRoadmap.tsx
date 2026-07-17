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
    <div className="fixed top-6 left-0 right-0 px-4 flex justify-center z-40">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-500
              ${index <= currentStep
                ? 'bg-indigo-600 text-white scale-110 shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}
            `}>
              {step.icon}
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 w-6 rounded-full transition-all duration-500 ${
                index < currentStep ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
