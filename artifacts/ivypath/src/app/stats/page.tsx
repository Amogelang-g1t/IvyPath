import React, { useMemo } from 'react';
import { BarChart2, Users, BookOpen, MessageSquare, CheckSquare, Calendar, Clock } from 'lucide-react';
import { AnalyticsService } from '../../api/analyticsService';
import { RegistrationService } from '../../api/registrationService';

export default function StatsPage() {
  const stats = useMemo(() => AnalyticsService.getStats(), []);
  const registrations = useMemo(() => RegistrationService.getLocalRegistrations(), []);

  const daysSinceFirst = stats.firstUsed
    ? Math.floor((Date.now() - new Date(stats.firstUsed).getTime()) / 86_400_000)
    : 0;

  const topPages = Object.entries(stats.pagesVisited)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const collegeBreakdown = registrations.reduce<Record<string, number>>((acc, r) => {
    const key = r.dreamCollege || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const gradeBreakdown = registrations.reduce<Record<string, number>>((acc, r) => {
    const key = r.grade || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const StatCard = ({
    icon: Icon,
    label,
    value,
    sub,
    accent,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    sub?: string;
    accent?: boolean;
  }) => (
    <div className="glass-card p-6 flex flex-col gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent ? 'bg-[var(--ivy-accent)] text-[#0B1220]' : 'bg-[var(--ivy-bg-elevated)] text-[var(--ivy-accent)]'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-3xl font-black text-[var(--ivy-text-primary)]">{value}</p>
        <p className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] mt-1">{label}</p>
        {sub && <p className="text-xs text-[var(--ivy-text-muted)] mt-0.5">{sub}</p>}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-black">App Analytics</h1>
        <p className="text-[var(--ivy-text-secondary)]">How IvyPath is being used — tracked locally on this device.</p>
      </header>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Registered Users" value={registrations.length} accent sub="on this device" />
        <StatCard icon={BarChart2} label="Total Sessions" value={stats.totalSessions} />
        <StatCard icon={Calendar} label="Days Active" value={daysSinceFirst} sub={`Since ${stats.firstUsed ? new Date(stats.firstUsed).toLocaleDateString('en-ZA') : '—'}`} />
        <StatCard icon={CheckSquare} label="Tasks Completed" value={stats.tasksCompleted} />
        <StatCard icon={BookOpen} label="Essays Saved" value={stats.essaysSaved} />
        <StatCard icon={MessageSquare} label="Chat Messages" value={stats.chatMessages} />
      </div>

      {/* Last active */}
      <div className="glass-panel p-4 flex items-center gap-3">
        <Clock className="w-4 h-4 text-[var(--ivy-accent)]" />
        <p className="text-sm text-[var(--ivy-text-secondary)]">
          Last active: <span className="text-[var(--ivy-text-primary)] font-semibold">
            {stats.lastUsed ? new Date(stats.lastUsed).toLocaleString('en-ZA') : '—'}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Page visits */}
        {topPages.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-black">Most Visited Pages</h2>
            <div className="glass-card divide-y divide-[var(--ivy-border)]">
              {topPages.map(([page, count]) => {
                const max = topPages[0][1];
                return (
                  <div key={page} className="flex items-center gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--ivy-text-primary)] capitalize truncate">{page}</p>
                      <div className="mt-1.5 h-1.5 rounded-full bg-[var(--ivy-bg-elevated)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[var(--ivy-accent)] transition-all"
                          style={{ width: `${(count / max) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[var(--ivy-accent)] shrink-0">{count}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Grade breakdown */}
        {Object.keys(gradeBreakdown).length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-black">Users by Grade</h2>
            <div className="glass-card divide-y divide-[var(--ivy-border)]">
              {Object.entries(gradeBreakdown).map(([grade, count]) => (
                <div key={grade} className="flex items-center justify-between p-4">
                  <p className="text-sm font-semibold text-[var(--ivy-text-primary)] capitalize">{grade.replace('_', ' ')}</p>
                  <span className="text-sm font-bold text-[var(--ivy-accent)]">{count} user{count !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dream college breakdown */}
        {Object.keys(collegeBreakdown).length > 0 && (
          <section className="space-y-4 md:col-span-2">
            <h2 className="text-lg font-black">Dream Colleges</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(collegeBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([college, count]) => (
                  <div key={college} className="glass-panel p-4 text-center space-y-1">
                    <p className="text-2xl font-black text-[var(--ivy-accent)]">{count}</p>
                    <p className="text-xs font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.06em] capitalize">{college}</p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>

      {registrations.length === 0 && stats.totalSessions <= 1 && (
        <div className="text-center py-16 glass-card space-y-3">
          <BarChart2 className="w-12 h-12 text-[var(--ivy-text-muted)] mx-auto" />
          <p className="text-[var(--ivy-text-secondary)]">Analytics build up as students use the app.</p>
          <p className="text-xs text-[var(--ivy-text-muted)]">All data is stored locally on this device — no tracking servers.</p>
        </div>
      )}
    </div>
  );
}
