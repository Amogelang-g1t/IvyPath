import { useLocation } from 'wouter';
import { useAppStore } from '../../store/useAppStore';
import { SplashScreen } from '../../components/onboarding/SplashScreen';
import { IntakeForm } from '../../components/onboarding/IntakeForm';
import { CollegeSelect } from '../../components/onboarding/CollegeSelect';
import { PathwayEngine } from '../../api/pathwayEngine';
import { LocalPersistenceService } from '../../api/localPersistence';
import { RegistrationService } from '../../api/registrationService';

export default function OnboardingPage() {
  const { currentStep, userProfile, completeOnboarding } = useAppStore();
  const [, setLocation] = useLocation();

  const handleFinishOnboarding = async () => {
    // 1. Generate the personalized pathway
    const plan = PathwayEngine.generatePlan(userProfile);

    // 2. Save the profile and the generated tasks to local storage
    LocalPersistenceService.save('profile', { ...userProfile, onboarding_complete: true });
    LocalPersistenceService.save('tasks', plan.tasks);
    LocalPersistenceService.save('strategy', plan.overallStrategy);

    // 3. The "Digital Handshake" (User Tracking)
    RegistrationService.recordUser({
      userId: (LocalPersistenceService.load('identity') as any)?.name || 'anonymous',
      grade: userProfile.current_grade || '',
      dreamCollege: userProfile.dreamCollege || 'unknown',
      registrationDate: new Date().toISOString()
    });

    // 4. Update store and redirect
    completeOnboarding();
    setLocation('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-transparent transition-colors duration-500">
      {currentStep === 0 && <SplashScreen />}
      {currentStep === 1 && <IntakeForm />}
      {currentStep === 2 && <CollegeSelect />}
      {currentStep >= 3 && (
        <div className="glass-card text-center p-10 space-y-8 max-w-lg mx-auto">
          <h1 className="text-3xl font-black mb-4">Generating Your Pathway...</h1>
          <p className="text-[var(--ivy-text-secondary)]">Our engine is analyzing your profile against Ivy League benchmarks.</p>
          <div className="mt-8 w-16 h-16 border-4 border-[var(--ivy-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="mt-8">
            <button
              onClick={handleFinishOnboarding}
              className="btn-primary px-10 py-4 w-full"
            >
              Enter Command Center
            </button>
          </div>
        </div>
      )}
    </main>
  );
}