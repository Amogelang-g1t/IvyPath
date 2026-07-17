"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleStart = async () => {
    if (!name.trim()) return;
    setIsCreating(true);

    await new Promise(res => setTimeout(res, 1000));

    localStorage.setItem('ivypath_identity', JSON.stringify({ name }));
    setIsCreating(false);
    router.push('/onboarding');
  };

  const features = [
    'Personalized guidance',
    'Smart planning tools',
    'Track progress',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated gradient orbs - more subtle */}
      <div className="absolute top-20 right-40 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="glass-lg p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-black text-white">
              IvyPath
            </h1>
            <p className="text-gray-300 text-lg">Plan your university journey with precision</p>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-3 gap-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-sm p-3 text-center"
              >
                <p className="text-xs font-semibold text-blue-300">{feature}</p>
              </motion.div>
            ))}
          </div>

          {/* Input Section */}
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-xs font-bold text-blue-200 uppercase tracking-wider block mb-2">
                Get Started
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name..."
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                className="input-glass text-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              disabled={!name || isCreating}
              className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                name && !isCreating
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-lg shadow-blue-500/50'
                  : 'glass text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              {isCreating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 border-2 border-transparent border-t-white rounded-full"
                  />
                  Creating profile...
                </>
              ) : (
                <>
                  Start Planning
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">Your data stays private and secure</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 text-gray-400"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
}
