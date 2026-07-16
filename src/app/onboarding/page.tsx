import { useRouter } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';
import { SplashScreen } from '../../components/onboarding/SplashScreen';
import { IntakeForm } from '../../components/onboarding/IntakeForm';
import { CollegeSelect } from '../../components/onboarding/CollegeSelect';
import { PathwayEngine } from '../../api/pathwayEngine';
import { LocalPersistenceService } from '../../api/localPersistence';
import { RegistrationService } from '../../api/registrationService';

export default function OnboardingPage() {
  const { currentStep, userProfile, completeOnboarding } = useAppStore();
  const router = useRouter();

  const handleFinishOnboarding = async () => {
    // 1. Generate the personalized pathway
    const plan = PathwayEngine.generatePlan(userProfile);

    // 2. Save the profile and the generated tasks to local storage
    LocalPersistenceService.save('profile', { ...userProfile, onboarding_complete: true });
    LocalPersistenceService.save('tasks', plan.tasks);
    LocalPersistenceService.save('strategy', plan.overallStrategy);

    // 3. The "Digital Handshake" (User Tracking)
    // We do this asynchronously and don't block the user from entering the app.
    RegistrationService.recordUser({
      userId: (LocalPersistenceService.load('identity') as any)?.name || 'anonymous',
      grade: userProfile.current_grade,
      dreamCollege: userProfile.dreamCollege || 'unknown'
    });

    // 4. Update store and redirect
    completeOnboarding();
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-transparent transition-colors duration-500">
      {currentStep === 0 && <SplashScreen />}
      {currentStep === 1 && <IntakeForm />}
      {currentStep === 2 && <CollegeSelect />}
      {currentStep >= 3 && (
        <div className="text-center p-10 space-y-8">
          <h1 className="text-4xl font-bold mb-4">Generating Your Pathway...</h1>
          <p className="text-gray-500">Our engine is analyzing your profile against Ivy League benchmarks.</p>
          <div className="mt-8 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="mt-8">
            <button
              onClick={handleFinishOnboarding}
              className="neu-button px-10 py-4 text-primary font-bold hover:scale-105 transition-all"
            >
              Enter Command Center
            </button>
          </div >
        </div >
      )}
    </main>
  );
}

