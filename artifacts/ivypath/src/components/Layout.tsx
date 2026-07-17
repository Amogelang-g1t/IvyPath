import React, { useState } from 'react';
import { GraduationCap, Target, FileText, Trophy, DollarSign, Mic, Home, LogOut } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { MotivationalTicker } from '@/components/engagement/MotivationalTicker';
import { GamifiedRoadmap } from '@/components/engagement/GamifiedRoadmap';

const NAV_ITEMS = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Target, label: 'Roadmap', path: '/roadmap' },
  { icon: FileText, label: 'Essays', path: '/essays' },
  { icon: Trophy, label: 'Activities', path: '/activities' },
  { icon: DollarSign, label: 'Scholarships', path: '/scholarships' },
  { icon: Mic, label: 'Interview', path: '/interview' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen text-[var(--ivy-text-primary)]">
      <aside className={`fixed left-0 top-0 h-screen transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-20'
      } bg-[var(--ivy-bg-panel)] border-r border-[var(--ivy-border)]`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden p-1">
              <img src="/logo.png" alt="IvyPath Logo" className="w-full h-full object-contain" />
            </div>
            {isOpen && <span className="font-black text-xl tracking-tight text-[var(--ivy-text-primary)]">IvyPath</span>}
          </div>

          <nav className="flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[var(--ivy-border)] space-y-4">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full btn-ghost hover:!border-[var(--ivy-danger)] hover:!text-[var(--ivy-danger)] flex items-center gap-4 justify-start"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {isOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center p-2 rounded-xl text-[0.75rem] uppercase tracking-[0.08em] font-semibold text-[var(--ivy-text-muted)] hover:text-[var(--ivy-text-primary)] transition-colors"
            >
              {isOpen ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-20'}`}>
        <div className="relative min-h-screen pb-10">
          <GamifiedRoadmap />
          {children}
          <MotivationalTicker />
        </div>
      </main>
    </div>
  );
}