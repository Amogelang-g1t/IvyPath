import React from 'react';
import { UNIVERSITY_THEMES } from '../../config/universities';
import { useAppStore } from '../../store/useAppStore';

export const CollegeSelect: React.FC = () => {
  const { setDreamCollege, setStep, dreamCollege } = useAppStore();

  const colleges = Object.entries(UNIVERSITY_THEMES).filter(([id]) => id !== 'default');

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-black text-[var(--ivy-text-primary)]">Choose Your North Star</h2>
        <p className="text-[var(--ivy-text-secondary)] mt-2">Select your dream college to personalize your pathway.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colleges.map(([id, theme]) => (
          <button
            key={id}
            onClick={() => setDreamCollege(id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden
              ${dreamCollege === id
                ? 'border-[var(--ivy-accent)] bg-[var(--ivy-accent)]/10 scale-105'
                : 'border-[var(--ivy-border)] glass-panel hover:border-[var(--ivy-accent)]/40 hover:scale-[1.02]'
              }`}
          >
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 transition-transform"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <p className="text-center font-bold text-[var(--ivy-text-primary)] text-sm">{theme.name}</p>

            {dreamCollege === id && (
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--ivy-accent)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-[var(--ivy-border)]">
        <button
          onClick={() => setStep(1)}
          className="btn-ghost px-6 py-3 text-sm"
        >
          ← Back to Profile
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!dreamCollege || dreamCollege === 'default'}
          className={`px-10 py-4 ${
            dreamCollege !== 'default'
              ? 'btn-primary'
              : 'glass-panel opacity-40 cursor-not-allowed text-[var(--ivy-text-muted)]'
          }`}
        >
          Generate My Pathway
        </button>
      </div>
    </div>
  );
};
