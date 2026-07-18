import React, { useMemo, useState } from 'react';
import { Search, GraduationCap, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { UNIVERSITY_THEMES } from '../../config/universities';
import { useAppStore } from '../../store/useAppStore';

const REGIONS = ['All', 'United States', 'United Kingdom', 'South Africa', 'Europe', 'Asia', 'Canada', 'Australia', 'Other'];

const countryFlag: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'South Africa': '🇿🇦',
  'Switzerland': '🇨🇭',
  'Singapore': '🇸🇬',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Netherlands': '🇳🇱',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Sweden': '🇸🇪',
  'Denmark': '🇩🇰',
  'Japan': '🇯🇵',
  'China': '🇨🇳',
  'Hong Kong': '🇭🇰',
  'South Korea': '🇰🇷',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'Israel': '🇮🇱',
  'Ireland': '🇮🇪',
  'New Zealand': '🇳🇿',
  'Austria': '🇦🇹',
  'Belgium': '🇧🇪',
  'International': '🌐',
};

export const CollegeSelect: React.FC = () => {
  const { setDreamCollege, setStep, dreamCollege } = useAppStore();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');

  const colleges = useMemo(() => {
    return Object.entries(UNIVERSITY_THEMES)
      .filter(([id]) => id !== 'default')
      .filter(([_, theme]) => {
        const matchesSearch = theme.name.toLowerCase().includes(search.toLowerCase()) ||
          theme.knownFor.some(k => k.toLowerCase().includes(search.toLowerCase()));
        const matchesRegion = region === 'All' ||
          theme.country === region ||
          (region === 'Other' && !REGIONS.slice(1, -1).includes(theme.country));
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => a[1].name.localeCompare(b[1].name));
  }, [search, region]);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-[var(--ivy-text-primary)]">Choose Your North Star</h2>
        <p className="text-[var(--ivy-text-secondary)]">Select your dream college from the top universities worldwide.</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ivy-text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search universities, majors, or strengths..."
            className="w-full input-field pl-10 text-sm"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {REGIONS.map(r => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                region === r
                  ? 'bg-[var(--ivy-accent-glow)] text-[var(--ivy-accent)] border-[var(--ivy-accent)]'
                  : 'glass-panel text-[var(--ivy-text-secondary)] hover:border-[var(--ivy-accent)]/40'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-[var(--ivy-text-muted)] uppercase tracking-wider font-semibold">
        Showing {colleges.length} universities
      </p>

      {/* Scrollable Grid */}
      <div className="max-h-[55vh] overflow-y-auto pr-2 rounded-2xl border border-[var(--ivy-border)] bg-[var(--ivy-glass-bg)] p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colleges.map(([id, theme]) => (
            <button
              key={id}
              onClick={() => setDreamCollege(id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden text-left group
                ${dreamCollege === id
                  ? 'border-[var(--ivy-accent)] bg-[var(--ivy-accent)]/10 scale-[1.02]'
                  : 'border-[var(--ivy-border)] glass-panel hover:border-[var(--ivy-accent)]/40 hover:scale-[1.02]'
                }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full shrink-0 transition-transform border border-white/10"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--ivy-text-primary)] truncate leading-tight">
                    {countryFlag[theme.country] || '🌐'} {theme.name}
                  </p>
                  <p className="text-[10px] text-[var(--ivy-text-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {theme.country}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-[var(--ivy-text-secondary)] line-clamp-1">
                  <span className="text-[var(--ivy-text-muted)]">Acceptance:</span> {theme.acceptanceRate}
                </p>
                <div className="flex flex-wrap gap-1">
                  {theme.knownFor.slice(0, 2).map((k, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] text-[var(--ivy-text-secondary)] truncate max-w-[90px]">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {dreamCollege === id && (
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--ivy-accent)] rounded-full shadow-[0_0_8px_var(--ivy-accent)]" />
              )}
            </button>
          ))}
        </div>

        {colleges.length === 0 && (
          <div className="text-center py-16 text-[var(--ivy-text-secondary)]">
            No universities match your search.
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[var(--ivy-border)]">
        <button
          onClick={() => setStep(1)}
          className="btn-ghost px-6 py-3 text-sm flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Profile
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!dreamCollege || dreamCollege === 'default'}
          className={`px-10 py-4 flex items-center gap-2 ${
            dreamCollege !== 'default'
              ? 'btn-primary'
              : 'glass-panel opacity-40 cursor-not-allowed text-[var(--ivy-text-muted)]'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Generate My Pathway
        </button>
      </div>
    </div>
  );
};
