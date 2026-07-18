import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import AppLayout from '@/components/Layout';

import AuthPage from '@/app/page';
import OnboardingPage from '@/app/onboarding/page';
import Dashboard from '@/app/dashboard/page';
import RoadmapPage from '@/app/roadmap/page';
import EssayWorkspace from '@/app/essays/page';
import ActivitiesPage from '@/app/activities/page';
import ScholarshipsPage from '@/app/scholarships/page';
import InterviewPrep from '@/app/interview/page';
import MentorPage from '@/app/mentor/page';
import StatsPage from '@/app/stats/page';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Auth / onboarding — no sidebar layout */}
      <Route path="/" component={AuthPage} />
      <Route path="/onboarding" component={OnboardingPage} />

      {/* App routes — wrapped in sidebar layout */}
      <Route path="/dashboard">
        <AppLayout><Dashboard /></AppLayout>
      </Route>
      <Route path="/roadmap">
        <AppLayout><RoadmapPage /></AppLayout>
      </Route>
      <Route path="/essays">
        <AppLayout><EssayWorkspace /></AppLayout>
      </Route>
      <Route path="/activities">
        <AppLayout><ActivitiesPage /></AppLayout>
      </Route>
      <Route path="/scholarships">
        <AppLayout><ScholarshipsPage /></AppLayout>
      </Route>
      <Route path="/interview">
        <AppLayout><InterviewPrep /></AppLayout>
      </Route>
      <Route path="/mentor">
        <AppLayout><MentorPage /></AppLayout>
      </Route>
      <Route path="/stats">
        <AppLayout><StatsPage /></AppLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
