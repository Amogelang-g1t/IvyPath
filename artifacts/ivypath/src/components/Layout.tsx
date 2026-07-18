import React, { useState } from 'react';
import { GraduationCap, Target, FileText, Trophy, DollarSign, Mic, Home, LogOut, Bot, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { MotivationalTicker } from '@/components/engagement/MotivationalTicker';
import { GamifiedRoadmap } from '@/components/engagement/GamifiedRoadmap';
import { AnalyticsService } from '@/api/analyticsService';

const NAV_ITEMS = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Target, label: 'Roadmap', path: '/roadmap' },
  { icon: FileText, label: 'Essays', path: '/essays' },
  { icon: Trophy, label: 'Activities', path: '/activities' },
  { icon: DollarSign, label: 'Scholarships', path: '/scholarships' },
  { icon: Mic, label: 'Interview', path: '/interview' },
  { icon: Bot, label: 'AI Mentor', path: '/mentor' },
];

const BOTTOM_NAV = [
  { icon: BarChart2, label: 'App Stats', path: '/stats' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Track page visits for analytics
  React.useEffect(() => {
    const page = location.replace('/', '') || 'dashboard';
    AnalyticsService.recordPageVisit(page);
  }, [location]);

  return (
    <div className="flex min-h-screen text-[var(--ivy-text-primary)]">
      <aside className={`fixed left-0 top-0 h-screen transition-all duration-300 z-50 flex flex-col ${
        isOpen ? 'w-64' : 'w-16'
      } bg-[var(--ivy-bg-panel)] border-r border-[var(--ivy-border)]`}>

        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-[var(--ivy-border)] ${!isOpen ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden p-0.5">
            <img src="/logo.png" alt="IvyPath" className="w-full h-full object-contain" />
          </div>
          {isOpen && <span className="font-black text-xl tracking-tight text-[var(--ivy-text-primary)]">IvyPath</span>}
        </div>

        {/* Main nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item ${isActive ? 'active' : ''} ${!isOpen ? '!px-0 justify-center' : ''}`}
                title={!isOpen ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div className="p-3 border-t border-[var(--ivy-border)] space-y-1">
          {BOTTOM_NAV.map((item) => {
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item ${isActive ? 'active' : ''} ${!isOpen ? '!px-0 justify-center' : ''}`}
                title={!isOpen ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}

          <button
            onClick={() => window.location.href = '/'}
            className={`w-full nav-item hover:!text-[var(--ivy-danger)] ${!isOpen ? '!px-0 justify-center' : ''}`}
            title={!isOpen ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>

          {/* Collapse toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center gap-2 p-2 rounded-lg text-[var(--ivy-text-muted)] hover:text-[var(--ivy-text-primary)] hover:bg-[rgba(255,255,255,0.04)] transition-colors ${!isOpen ? 'justify-center' : 'justify-end px-3'}`}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-16'}`}>
        <div className="relative min-h-screen pb-10">
          <GamifiedRoadmap />
          {children}
          <MotivationalTicker />
        </div>
      </main>
    </div>
  );
}
