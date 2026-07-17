import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleStart = async () => {
    if (!name.trim()) return;
    setIsCreating(true);

    await new Promise(res => setTimeout(res, 1000));

    localStorage.setItem('ivypath_identity', JSON.stringify({ name }));
    setIsCreating(false);
    setLocation('/onboarding');
  };

  const features = [
    'Personalized guidance',
    'Smart planning tools',
    'Track progress',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="glass-card p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-black">
              IvyPath
            </h1>
            <p className="text-[var(--ivy-text-secondary)] text-lg">Plan your university journey with precision</p>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-3 gap-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-3 text-center flex items-center justify-center"
              >
                <p className="text-xs font-semibold text-[var(--ivy-text-secondary)] leading-tight">{feature}</p>
              </motion.div>
            ))}
          </div>

          {/* Input Section */}
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em] block mb-2">
                Get Started
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name..."
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                className="input-field text-sm"
              />
            </div>

            <button
              onClick={handleStart}
              disabled={!name || isCreating}
              className={`w-full py-3 ${
                name && !isCreating
                  ? 'btn-primary'
                  : 'btn-ghost opacity-50 cursor-not-allowed'
              }`}
            >
              {isCreating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-transparent border-t-[#0B1220] rounded-full mr-2"
                  />
                  Creating profile...
                </>
              ) : (
                <>
                  Start Planning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-[var(--ivy-border)] text-center">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--ivy-text-muted)]">Your data stays private and secure</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}