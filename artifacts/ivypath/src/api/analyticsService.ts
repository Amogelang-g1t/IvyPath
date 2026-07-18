/**
 * IvyPath Analytics Service
 * Tracks usage locally (localStorage). Privacy-first — no external calls.
 * Counts are aggregated per-device and stored as a simple JSON blob.
 */

export interface AppStats {
  totalSessions: number;
  firstUsed: string;        // ISO date string
  lastUsed: string;         // ISO date string
  pagesVisited: Record<string, number>;
  tasksCompleted: number;
  essaysSaved: number;
  chatMessages: number;
}

const KEY = 'ivypath_analytics';

function load(): AppStats {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    totalSessions: 0,
    firstUsed: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    pagesVisited: {},
    tasksCompleted: 0,
    essaysSaved: 0,
    chatMessages: 0,
  };
}

function save(stats: AppStats) {
  try {
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {}
}

export const AnalyticsService = {
  /** Call once on app start / login */
  recordSession() {
    const stats = load();
    stats.totalSessions += 1;
    stats.lastUsed = new Date().toISOString();
    if (!stats.firstUsed) stats.firstUsed = new Date().toISOString();
    save(stats);
  },

  recordPageVisit(page: string) {
    const stats = load();
    stats.pagesVisited[page] = (stats.pagesVisited[page] || 0) + 1;
    save(stats);
  },

  recordTaskCompletion() {
    const stats = load();
    stats.tasksCompleted += 1;
    save(stats);
  },

  recordEssaySave() {
    const stats = load();
    stats.essaysSaved += 1;
    save(stats);
  },

  recordChatMessage() {
    const stats = load();
    stats.chatMessages += 1;
    save(stats);
  },

  getStats(): AppStats {
    return load();
  },

  /** Returns total unique devices ever registered (from RegistrationService logs) */
  getTotalRegisteredUsers(): number {
    try {
      const raw = localStorage.getItem('ivypath_registered_users');
      if (raw) return (JSON.parse(raw) as any[]).length;
    } catch {}
    return 0;
  },
};
