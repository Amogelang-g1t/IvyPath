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
        <h2 className="text-3xl font-black text-[var(--ivy-text-primary)]">Academic Profile</h2>
        <p className="text-[var(--ivy-text-secondary)] font-medium mt-2">Help us understand your environment to build your path.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* School Type */}
        <div className="space-y-4">
          <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">School Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCHOOL_TYPES.map(type => (
              <button
                key={type.value}
                onClick={() => handleChange('schoolType', type.value)}
                className={`p-4 text-left rounded-xl border transition-all ${
                  userProfile.schoolType === type.value
                    ? 'border-[var(--ivy-accent)] bg-[var(--ivy-accent)]/10 text-[var(--ivy-accent)]'
                    : 'glass-panel text-[var(--ivy-text-secondary)] hover:border-[var(--ivy-accent)]/40'
                }`}
              >
                <p className="font-bold text-sm">{type.label}</p>
                <p className="text-xs opacity-70 mt-0.5">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">School Name</label>
            <input
              type="text"
              value={userProfile.schoolName}
              onChange={(e) => handleChange('schoolName', e.target.value)}
              placeholder="e.g. Pretoria Boys High"
              className="input-field text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">Province</label>
            <select
              value={userProfile.province}
              onChange={(e) => handleChange('province', e.target.value)}
              className="input-field text-sm appearance-none"
            >
              <option value="">Select Province</option>
              {PROVINCES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
        </div>

        {/* GPA */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">Current Average (%)</label>
          <input
            type="text"
            value={userProfile.gpa}
            onChange={(e) => handleChange('gpa', e.target.value)}
            placeholder="e.g. 85"
            className="input-field text-sm"
          />
        </div>

        {/* Standardized Test */}
        <div className="glass-panel p-6 space-y-4">
          <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">
            Have you taken the SAT or ACT?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => handleChange('hasTakenStandardizedTest', true)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${
                userProfile.hasTakenStandardizedTest
                  ? 'border-[var(--ivy-accent)] bg-[var(--ivy-accent)]/10 text-[var(--ivy-accent)]'
                  : 'border-[var(--ivy-border)] text-[var(--ivy-text-secondary)] hover:border-[var(--ivy-accent)]/40'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleChange('hasTakenStandardizedTest', false)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${
                !userProfile.hasTakenStandardizedTest
                  ? 'border-[var(--ivy-accent)] bg-[var(--ivy-accent)]/10 text-[var(--ivy-accent)]'
                  : 'border-[var(--ivy-border)] text-[var(--ivy-text-secondary)] hover:border-[var(--ivy-accent)]/40'
              }`}
            >
              No
            </button>
          </div>

          {userProfile.hasTakenStandardizedTest ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">Your Score</label>
              <input
                type="text"
                value={userProfile.satActScore}
                onChange={(e) => handleChange('satActScore', e.target.value)}
                placeholder="e.g. 1550 SAT"
                className="input-field text-sm"
              />
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-[var(--ivy-accent)]/20 bg-[var(--ivy-accent)]/5 space-y-3">
              <p className="text-sm text-[var(--ivy-accent)] font-medium">
                Standardized tests are key for many Ivy League target profiles. We recommend scheduling a test date.
              </p>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">Set Your Goal Date</label>
                <input
                  type="date"
                  value={userProfile.satActGoalDate}
                  onChange={(e) => handleChange('satActGoalDate', e.target.value)}
                  className="input-field text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Major & ECs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">Intended Major</label>
            <input
              type="text"
              value={userProfile.major}
              onChange={(e) => handleChange('major', e.target.value)}
              placeholder="e.g. Computer Science"
              className="input-field text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">Financial Aid Needs</label>
            <select
              value={userProfile.efcTier}
              onChange={(e) => handleChange('efcTier', e.target.value)}
              className="input-field text-sm appearance-none"
            >
              <option value="">Select Tier</option>
              <option value="low">Low (Full Need)</option>
              <option value="medium">Medium</option>
              <option value="high">High (Self-Funded)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block">Notable Extracurriculars</label>
          <textarea
            value={userProfile.extracurriculars}
            onChange={(e) => handleChange('extracurriculars', e.target.value)}
            placeholder="Describe your key achievements..."
            rows={3}
            className="input-field text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button
          onClick={() => setStep(2)}
          className="btn-primary px-10 py-4"
        >
          Next: Target Colleges
        </button>
      </div>
    </div>
  );
};
