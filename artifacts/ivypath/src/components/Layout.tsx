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
    <div className="flex min-h-screen">
      <aside className={`fixed left-0 top-0 h-screen transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-20'
      } bg-[var(--neu-bg)] border-r border-stone-200`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-lg neu-flat flex items-center justify-center shadow-sm shrink-0 overflow-hidden p-1">
              <img src="/logo.png" alt="IvyPath Logo" className="w-full h-full object-contain" />
            </div>
            {isOpen && <span className="font-black text-xl text-stone-800 tracking-tight">IvyPath</span>}
          </div>

          <nav className="flex-1 space-y-3">
            {NAV_ITEMS.map((item) => {
              const isActive = location === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? 'neu-pressed text-primary font-bold'
                      : 'neu-flat text-stone-600 hover:text-stone-800'
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-stone-200 space-y-4">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl neu-button text-stone-500 hover:text-red-500 transition-all"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {isOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center p-2 rounded-xl neu-button text-stone-400"
            >
              {isOpen ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-20'}`}>
        <div className="relative min-h-screen">
          <GamifiedRoadmap />
          {children}
          <MotivationalTicker />
        </div>
      </main>
    </div>
  );
}
