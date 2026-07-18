import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi, WifiOff, ExternalLink, Trophy, Search, Bookmark, BookmarkCheck
} from 'lucide-react';
import { ScholarshipService, Scholarship } from '@/api/scholarshipService';

const CATEGORY_PILLS = [
  { label: 'All', value: 'all' },
  { label: '🇿🇦 SA Bursaries', value: 'sa-bursaries' },
  { label: '🌍 International', value: 'international' },
  { label: '🔬 STEM', value: 'stem' },
  { label: '🏆 Leadership', value: 'leadership' },
  { label: '💡 Need-Based', value: 'need-based' },
  { label: '🎓 Postgraduate', value: 'postgraduate' },
  { label: '🔖 Saved', value: 'saved' },
] as const;

const DEGREE_FILTERS = [
  { label: 'All Degrees', value: 'all' },
  { label: 'Undergraduate', value: 'undergraduate' },
  { label: 'Postgraduate', value: 'postgraduate' },
] as const;

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  'sa-bursary': 'bg-[rgba(52,211,153,0.15)] text-[#34d399] border-[#34d399]',
  'sa-merit': 'bg-[rgba(251,191,36,0.15)] text-[#fbbf24] border-[#fbbf24]',
  'international': 'bg-[rgba(99,102,241,0.15)] text-[#818cf8] border-[#818cf8]',
  'stem': 'bg-[rgba(56,189,248,0.15)] text-[#38bdf8] border-[#38bdf8]',
  'leadership': 'bg-[rgba(251,146,60,0.15)] text-[#fb923c] border-[#fb923c]',
  'need-based': 'bg-[rgba(248,113,113,0.15)] text-[#f87171] border-[#f87171]',
  'postgraduate': 'bg-[rgba(167,139,250,0.15)] text-[#a78bfa] border-[#a78bfa]',
};

const COUNTRY_FLAGS: Record<string, string> = {
  'South Africa': '🇿🇦',
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Germany': '🇩🇪',
  'Japan': '🇯🇵',
  'China': '🇨🇳',
  'Canada': '🇨🇦',
  'European Union': '🇪🇺',
  'Various': '🌍',
  'Rwanda / Mauritius': '🌍',
};

const BOOKMARKS_KEY = 'ivypath_bookmarks';

function loadBookmarks(): string[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveBookmarks(ids: string[]) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
}

export default function ScholarshipsPage() {
  const [all, setAll] = useState<Scholarship[]>([]);
  const [filtered, setFiltered] = useState<Scholarship[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [degree, setDegree] = useState('all');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Load data + bookmarks on mount
  useEffect(() => {
    const data = ScholarshipService.getAll();
    setAll(data);
    setFiltered(data);
    setBookmarks(loadBookmarks());

    const handleOnline = () => {
      setIsOnline(true);
      ScholarshipService.syncScholarships().then(fresh => setAll(fresh));
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Re-filter whenever filters or data change
  useEffect(() => {
    if (category === 'saved') {
      setFiltered(all.filter(s => bookmarks.includes(s.id)));
      return;
    }
    setFiltered(
      ScholarshipService.filter(all, { search, category, degree })
    );
  }, [search, category, degree, all, bookmarks]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      saveBookmarks(next);
      return next;
    });
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* ── Header ── */}
      <header className="flex flex-wrap justify-between items-start gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black">Scholarship Hub</h1>
          <p className="text-[var(--ivy-text-secondary)] font-medium">
            Curated funding opportunities for your education journey.
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-[24px] text-[0.75rem] font-bold uppercase tracking-[0.08em] border ${
            isOnline
              ? 'border-[var(--ivy-success)] text-[var(--ivy-success)] bg-[rgba(52,211,153,0.1)]'
              : 'border-[var(--ivy-danger)] text-[var(--ivy-danger)] bg-[rgba(248,113,113,0.1)]'
          }`}
        >
          {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </header>

      {/* ── Search ── */}
      <div className="glass-panel p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ivy-text-muted)]" />
          <input
            type="text"
            placeholder="Search by name, provider, country, field…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] rounded-xl text-sm text-[var(--ivy-text-primary)] placeholder:text-[var(--ivy-text-muted)] focus:outline-none focus:border-[var(--ivy-accent)] transition-colors"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_PILLS.map(pill => (
            <button
              key={pill.value}
              onClick={() => setCategory(pill.value)}
              className={`px-3 py-1.5 rounded-[20px] text-[0.75rem] font-bold border transition-all ${
                category === pill.value
                  ? 'bg-[var(--ivy-accent)] border-[var(--ivy-accent)] text-white'
                  : 'bg-[var(--ivy-bg-elevated)] border-[var(--ivy-border)] text-[var(--ivy-text-secondary)] hover:border-[var(--ivy-accent)] hover:text-[var(--ivy-accent)]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Degree filter + result count */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {DEGREE_FILTERS.map(d => (
              <button
                key={d.value}
                onClick={() => setDegree(d.value)}
                className={`px-3 py-1 rounded-lg text-[0.75rem] font-semibold border transition-all ${
                  degree === d.value
                    ? 'bg-[var(--ivy-accent)] border-[var(--ivy-accent)] text-white'
                    : 'bg-[var(--ivy-bg-elevated)] border-[var(--ivy-border)] text-[var(--ivy-text-muted)] hover:text-[var(--ivy-accent)]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <span className="text-[0.8rem] text-[var(--ivy-text-muted)] font-medium">
            Showing <span className="text-[var(--ivy-accent)] font-bold">{filtered.length}</span> of{' '}
            <span className="font-bold">{all.length}</span>
          </span>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-2 text-center py-20 glass-card space-y-4"
          >
            <Trophy className="w-12 h-12 text-[var(--ivy-text-muted)] mx-auto" />
            <p className="text-[var(--ivy-text-secondary)] font-medium">
              {category === 'saved'
                ? 'No saved scholarships yet. Bookmark some to find them here!'
                : 'No scholarships match your filters.'}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((s, i) => {
              const isBookmarked = bookmarks.includes(s.id);
              const flagEmoji = COUNTRY_FLAGS[s.country] || '🌐';
              const badgeClass = CATEGORY_BADGE_COLORS[s.category] || '';
              return (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className="glass-card p-6 space-y-4 hover:-translate-y-[2px] transition-transform"
                >
                  {/* Top row */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <h3 className="text-base font-black leading-tight">{s.name}</h3>
                      <p className="text-[0.75rem] text-[var(--ivy-text-muted)] font-medium truncate">
                        {s.provider}
                      </p>
                      <p className="text-xl font-black text-[var(--ivy-accent)] mt-1">{s.amount}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => toggleBookmark(s.id)}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                        className={`p-2 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-[rgba(99,102,241,0.15)] border-[var(--ivy-accent)] text-[var(--ivy-accent)]'
                            : 'bg-[var(--ivy-bg-elevated)] border-[var(--ivy-border)] text-[var(--ivy-text-muted)] hover:text-[var(--ivy-accent)] hover:border-[var(--ivy-accent)]'
                        }`}
                      >
                        {isBookmarked
                          ? <BookmarkCheck className="w-4 h-4" />
                          : <Bookmark className="w-4 h-4" />}
                      </button>
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open scholarship website"
                        className="p-2 rounded-lg bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] text-[var(--ivy-text-muted)] hover:text-[var(--ivy-accent)] hover:border-[var(--ivy-accent)] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Criteria */}
                  <p className="text-sm text-[var(--ivy-text-secondary)] leading-relaxed line-clamp-2">
                    {s.criteria}
                  </p>

                  {/* Footer */}
                  <div className="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-[var(--ivy-border)]">
                    <div className="space-y-0.5">
                      <p className="text-[0.7rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">
                        Deadline: <span className="text-[var(--ivy-text-secondary)]">{s.deadline}</span>
                      </p>
                      <p className="text-[0.7rem] text-[var(--ivy-text-muted)]">
                        {flagEmoji} {s.country}
                      </p>
                    </div>
                    <span
                      className={`text-[0.65rem] px-2.5 py-1 rounded-[20px] border font-bold uppercase tracking-[0.06em] ${badgeClass}`}
                    >
                      {s.category.replace('-', ' ')}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
