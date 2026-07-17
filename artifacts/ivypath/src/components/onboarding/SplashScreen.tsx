import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const SplashScreen: React.FC = () => {
  const { setStep } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 max-w-3xl mx-auto">
      <h1 className="text-5xl font-black mb-6 tracking-tight text-[var(--ivy-text-primary)]">
        Your Ivy League Journey <br />
        <span className="text-[var(--ivy-accent)]">Starts Here.</span>
      </h1>
      <p className="text-xl text-[var(--ivy-text-secondary)] mb-10 max-w-2xl leading-relaxed">
        You're aiming for the peak of academic excellence. We're here to help you
        map out the precise steps to make your dream college a reality.
      </p>
      <button
        onClick={() => setStep(1)}
        className="btn-primary px-10 py-5 text-lg"
      >
        Begin Your Pathway
      </button>
    </div>
  );
};