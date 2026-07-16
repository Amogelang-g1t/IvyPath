"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto"
            >
              <div className="glass-sm w-full h-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-indigo-400" />
              </div>
            </motion.div>

            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                IvyPath
              </h1>
              <p className="text-gray-300 font-medium mt-2">Your journey to excellence starts here</p>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-widest ml-1">Full Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                className="input-glass"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              disabled={!name || isCreating}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                name && !isCreating
                  ? 'glass hover:bg-[rgba(255,255,255,0.15)] text-white cursor-pointer'
                  : 'glass-sm text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              {isCreating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Initializing...
                </>
              ) : (
                <>
                  Begin Your Journey
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>

          {/* Footer */}
          <div className="pt-4 text-center border-t border-white/10">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              ✨ Local • Private • Excellence
            </p>
          </div>
        </div>
      </motion.div>

      {/* Subtle glow effect */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/5 to-pink-500/0 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  );
}
