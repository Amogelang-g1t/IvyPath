"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleStart = async () => {
    if (!name.trim()) return;
    setIsCreating(true);

    // Simulate identity creation
    await new Promise(res => setTimeout(res, 1000));

    localStorage.setItem('ivypath_identity', JSON.stringify({ name }));
    setIsCreating(false);
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 neu-flat space-y-8 text-center"
      >
        <div className="space-y-2">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl neu-flat flex items-center justify-center shadow-lg overflow-hidden p-2">
            <img src="/logo.png" alt="IvyPath Logo" className="w-full h-full object-contain" />
          </div >
          <h1 className="text-3xl font-black text-stone-800">IvyPath</h1>
          <p className="text-stone-500 font-medium">Local. Private. Excellence.</p>
        </div >

        <div className="space-y-4">
          <div className="text-left space-y-2">
            <label className="text-xs font-black text-stone-400 uppercase tracking-widest ml-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full p-4 rounded-2xl border-0 neu-pressed outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div >

          <button
            onClick={handleStart}
            disabled={!name || isCreating}
            className={`w-full py-4 rounded-2xl font-black transition-all ${
              name && !isCreating ? 'neu-button text-primary hover:scale-105' : 'text-stone-400 cursor-not-allowed'
            }`}
          >
            {isCreating ? 'Initializing Profile...' : 'Begin Your Journey'}
          </button>
        </div >

        <div className="pt-6 text-center">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            No Cloud. No Tracking. Your Data, Your Device.
          </p>
        </div >
      </motion.div>
    </div >
  );
}
