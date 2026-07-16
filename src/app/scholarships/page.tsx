import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, ExternalLink, Trophy, RefreshCw } from 'lucide-react';
import { ScholarshipService } from '@/api/scholarshipService';
import { LocalPersistenceService } from '@/api/localPersistence';

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Load local data first
    const saved = LocalPersistenceService.load('scholarships') || [];
    setScholarships(saved);

    // Update online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Auto-sync if online
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
          <h1 className="text-3xl font-black text-stone-800">Scholarship Hub</h1>
          <p className="text-stone-500 font-medium">Curated opportunities to fund your education.</p>
        </div >
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            isOnline ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? 'Online' : 'Offline'}
          </div >
          <button
            onClick={triggerSync}
            disabled={!isOnline || isSyncing}
            className="neu-button text-primary font-bold flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Update List'}
          </button>
        </div >
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships.length === 0 ? (
          <div className="col-span-2 text-center py-20 neu-flat space-y-4">
            <Trophy className="w-12 h-12 text-stone-300 mx-auto" />
            <p className="text-stone-400 font-medium">No scholarships available offline. Connect to WiFi to sync.</p>
          </div >
        ) : (
          scholarships.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-flat p-6 space-y-4 group hover:scale-[1.02] transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-stone-800">{s.name}</h3>
                  <p className="text-primary font-bold text-xl">{s.amount}</p>
                </div >
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-stone-100 text-stone-400 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div >

              <p className="text-sm text-stone-500 leading-relaxed">
                {s.criteria}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                <span className="text-xs font-black text-stone-400 uppercase tracking-widest">
                  Deadline: {s.deadline}
                </span >
                <span className="text-[10px] px-2 py-1 rounded-full bg-stone-200 text-stone-600 font-bold uppercase">
                  {s.category}
                </span >
              </div >
            </motion.div>
          ))
        )}
      </div >
    </div >
  );
}
