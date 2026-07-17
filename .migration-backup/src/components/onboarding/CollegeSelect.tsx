import React from 'react';
import { UNIVERSITY_THEMES } from '../../config/universities';
import { useAppStore } from '../../store/useAppStore';

export const CollegeSelect: React.FC = () => {
  const { setDreamCollege, setStep, dreamCollege } = useAppStore();

  const colleges = Object.entries(UNIVERSITY_THEMES).filter(([id]) => id !== 'default');

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your North Star</h2>
        <p className="text-gray-500 mt-2">Select your dream college to customize your pathway experience.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colleges.map(([id, theme]) => (
          <button
            key={id}
            onClick={() => setDreamCollege(id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden
              ${dreamCollege === id
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 scale-105 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 bg-white dark:bg-gray-800'}`}
          >
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 transition-transform group-hover:scale-110"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <p className="text-center font-bold text-gray-800 dark:text-gray-200">{theme.name}</p>

            {dreamCollege === id && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-12 border-t pt-8">
        <button
          onClick={() => setStep(1)}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          ← Back to Profile
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!dreamCollege || dreamCollege === 'default'}
          className={`px-10 py-4 rounded-full font-bold text-lg transition-all
            ${dreamCollege !== 'default'
              ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Generate My Pathway
        </button>
      </div>
    </div>
  );
};
