import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const SplashScreen: React.FC = () => {
  const { setStep } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
        Your Ivy League Journey <br />
        <span className="text-indigo-600">Starts Here.</span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
        You're aiming for the peak of academic excellence. We're here to help you
        map out the precise steps to make your dream college a reality.
      </p>
      <button
        onClick={() => setStep(1)}
        className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-xl"
      >
        Begin Your Pathway
      </button>
    </div>
  );
};
