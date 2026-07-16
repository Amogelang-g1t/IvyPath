import { create } from 'zustand';
import { UNIVERSITY_THEMES } from '../config/universities';

interface UserProfile {
  gpa: string;
  hasTakenStandardizedTest: boolean;
  satActScore?: string;
  satActGoalDate?: string;
  major: string;
  extracurriculars: string;
  efcTier: string;
  current_grade?: string;
  dreamCollege?: string;
}

interface AppState {
  currentStep: number;
  userProfile: UserProfile;
  dreamCollege: string;
  onboardingComplete: boolean;

  // Actions
  setStep: (step: number) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  setDreamCollege: (collegeId: string) => void;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentStep: 0,
  userProfile: {
    gpa: '',
    hasTakenStandardizedTest: false,
    major: '',
    extracurriculars: '',
    efcTier: '',
  },
  dreamCollege: 'default',
  onboardingComplete: false,

  setStep: (step) => set({ currentStep: step }),
  updateProfile: (data) => set((state) => ({
    userProfile: { ...state.userProfile, ...data }
  })),
  setDreamCollege: (collegeId) => {
    // Update state and also apply the CSS variable to the root
    set({ dreamCollege: collegeId });
    const theme = UNIVERSITY_THEMES[collegeId] || UNIVERSITY_THEMES.default;
    document.documentElement.style.setProperty('--color-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--color-accent', theme.accentColor);
    document.documentElement.style.setProperty('--color-text-primary', theme.textColor);
  },
  completeOnboarding: () => set({ onboardingComplete: true }),
}));
