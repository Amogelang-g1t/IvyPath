import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, ExternalLink, Trophy, RefreshCw } from 'lucide-react';
import { ScholarshipService } from '@/api/scholarshipService';
import { LocalPersistenceService } from '@/api/localPersistence';

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const saved: any[] = LocalPersistenceService.load<any[]>('scholarships') || [];
    setScholarships(saved);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.onLine) {
      triggerSync();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = async () => {
    setIsSyncing(true);
    const freshData = await ScholarshipService.syncScholarships();
    if (freshData) {
      setScholarships(freshData);
    }
    setIsSyncing(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-black">Scholarship Hub</h1>
          <p className="text-[var(--ivy-text-secondary)] font-medium">Curated opportunities to fund your education.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-[24px] text-[0.75rem] font-bold uppercase tracking-[0.08em] border ${
            isOnline ? 'border-[var(--ivy-success)] text-[var(--ivy-success)] bg-[rgba(52,211,153,0.1)]' : 'border-[var(--ivy-danger)] text-[var(--ivy-danger)] bg-[rgba(248,113,113,0.1)]'
          }`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <button
            onClick={triggerSync}
            disabled={!isOnline || isSyncing}
            className="btn-primary disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Update List'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships.length === 0 ? (
          <div className="col-span-2 text-center py-20 glass-card space-y-4">
            <Trophy className="w-12 h-12 text-[var(--ivy-text-muted)] mx-auto" />
            <p className="text-[var(--ivy-text-secondary)] font-medium">No scholarships available offline. Connect to WiFi to sync.</p>
          </div>
        ) : (
          scholarships.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 space-y-4 group hover:-translate-y-[2px] transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-black">{s.name}</h3>
                  <p className="text-[var(--ivy-accent)] font-bold text-xl">{s.amount}</p>
                </div>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] text-[var(--ivy-text-muted)] hover:text-[var(--ivy-accent)] hover:border-[var(--ivy-accent)] transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <p className="text-sm text-[var(--ivy-text-secondary)] leading-relaxed">{s.criteria}</p>

              <div className="flex justify-between items-center pt-4 border-t border-[var(--ivy-border)]">
                <span className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">
                  Deadline: {s.deadline}
                </span>
                <span className="text-[0.75rem] px-3 py-1 rounded-[24px] bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border-strong)] text-[var(--ivy-text-secondary)] font-bold uppercase">
                  {s.category}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}