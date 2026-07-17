import React from 'react';
import { useAppStore } from '../../store/useAppStore';

const PROVINCES = [
  { value: 'gauteng', label: 'Gauteng' },
  { value: 'western_cape', label: 'Western Cape' },
  { value: 'kwazulu_natal', label: 'KwaZulu-Natal' },
  { value: 'eastern_cape', label: 'Eastern Cape' },
  { value: 'free_state', label: 'Free State' },
  { value: 'limpopo', label: 'Limpopo' },
  { value: 'mpumalanga', label: 'Mpumalanga' },
  { value: 'north_west', label: 'North West' },
  { value: 'northern_cape', label: 'Northern Cape' },
];

const SCHOOL_TYPES = [
  { value: 'public', label: 'Public School', desc: 'Government school with NSC curriculum' },
  { value: 'private', label: 'Private School', desc: 'Independent school' },
  { value: 'ieb', label: 'IEB School', desc: 'Independent Examinations Board' },
  { value: 'cambridge', label: 'Cambridge/A-Levels', desc: 'British curriculum school' },
];

export const IntakeForm: React.FC = () => {
  const { userProfile, updateProfile, setStep } = useAppStore();

  const handleChange = (field: string, value: any) => {
    updateProfile({ [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 py-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-stone-800">Academic Profile</h2>
        <p className="text-stone-500 font-medium">Help us understand your environment to build your path.</p>
      </div >

      <div className="grid grid-cols-1 gap-8">
        {/* School Information */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-stone-700 ml-1">School Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCHOOL_TYPES.map(type => (
              <button
                key={type.value}
                onClick={() => handleChange('schoolType', type.value)}
                className={`p-4 text-left transition-all ${
                  userProfile.schoolType === type.value
                    ? 'neu-pressed text-primary font-bold'
                    : 'neu-flat text-stone-600 hover:scale-[1.02]'
                }`}
              >
                <p className="font-bold text-sm">{type.label}</p>
                <p className="text-xs opacity-70">{type.desc}</p>
              </button>
            ))}
          </div >
        </div >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 ml-1">School Name</label>
            <input
              type="text"
              value={userProfile.schoolName}
              onChange={(e) => handleChange('schoolName', e.target.value)}
              placeholder="e.g. Pretoria Boys High"
              className="w-full p-4 rounded-2xl border-0 neu-pressed focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div >
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 ml-1">Province</label>
            <select
              value={userProfile.province}
              onChange={(e) => handleChange('province', e.target.value)}
              className="w-full p-4 rounded-2xl border-0 neu-pressed focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
            >
              <option value="">Select Province</option>
              {PROVINCES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div >
        </div >

        {/* GPA Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700 ml-1">Current Average (%)</label>
          <input
            type="text"
            value={userProfile.gpa}
            onChange={(e) => handleChange('gpa', e.target.value)}
            placeholder="e.g. 85"
            className="w-full p-4 rounded-2xl border-0 neu-pressed focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div >

        {/* Standardized Test Logic */}
        <div className="p-6 rounded-3xl neu-flat space-y-4">
          <label className="text-sm font-bold text-stone-700 block">
            Have you taken the SAT or ACT?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => handleChange('hasTakenStandardizedTest', true)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                userProfile.hasTakenStandardizedTest
                ? 'neu-pressed text-primary'
                : 'neu-button text-stone-600'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleChange('hasTakenStandardizedTest', false)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                !userProfile.hasTakenStandardizedTest
                ? 'neu-pressed text-primary'
                : 'neu-button text-stone-600'
              }`}
            >
              No
            </button >
          </div >

          {userProfile.hasTakenStandardizedTest ? (
            <div className="mt-4 space-y-2">
              <label className="text-xs text-stone-400 uppercase font-black tracking-widest">Your Score</label>
              <input
                type="text"
                value={userProfile.satActScore}
                onChange={(e) => handleChange('satActScore', e.target.value)}
                placeholder="e.g. 1550 SAT"
                className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none"
              />
            </div >
          ) : (
            <div className="mt-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
              <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
                Standardized tests are key for many Ivy League target profiles. We recommend scheduling a test date to benchmark your progress.
              </p>
              <div className="space-y-2">
                <label className="text-xs text-indigo-600 uppercase font-black tracking-widest">Set Your Goal Date</label>
                <input
                  type="date"
                  value={userProfile.satActGoalDate}
                  onChange={(e) => handleChange('satActGoalDate', e.target.value)}
                  className="w-full p-3 rounded-xl border-0 neu-pressed outline-none text-sm"
                />
              </div >
            </div >
          )}
        </div >

        {/* Major & ECs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 ml-1">Intended Major</label>
            <input
              type="text"
              value={userProfile.major}
              onChange={(e) => handleChange('major', e.target.value)}
              placeholder="e.g. Computer Science"
              className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none transition-all"
            />
          </div >
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 ml-1">Financial Aid Needs</label>
            <select
              value={userProfile.efcTier}
              onChange={(e) => handleChange('efcTier', e.target.value)}
              className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none transition-all appearance-none"
            >
              <option value="">Select Tier</option>
              <option value="low">Low (Full Need)</option>
              <option value="medium">Medium</option>
              <option value="high">High (Self-Funded)</option>
            </select>
          </div >
        </div >

        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700 ml-1">Notable Extracurriculars</label>
          <textarea
            value={userProfile.extracurriculars}
            onChange={(e) => handleChange('extracurriculars', e.target.value)}
            placeholder="Describe your key achievements..."
            rows={3}
            className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none transition-all"
          />
        </div >
      </div >

      <div className="flex justify-end mt-10">
        <button
          onClick={() => setStep(2)}
          className="neu-button px-10 py-4 text-primary font-black hover:scale-105 transition-all"
        >
          Next: Target Colleges →
        </button>
      </div >
    </div >
  );
};
