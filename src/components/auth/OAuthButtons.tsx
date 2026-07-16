import React, { useState } from 'react';

interface OAuthButtonProps {
  provider: 'google' | 'microsoft' | 'facebook';
  onClick: () => Promise<void>;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, onClick }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleAuth = async () => {
    setStatus('loading');
    try {
      await onClick();
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  const providers = {
    google: { label: 'Sign in with Google', color: 'bg-white text-gray-700 border border-gray-300' },
    microsoft: { label: 'Sign in with Microsoft', color: 'bg-blue-600 text-white' },
    facebook: { label: 'Sign in with Facebook', color: 'bg-blue-800 text-white' },
  };

  const current = providers[provider];

  return (
    <button
      onClick={handleAuth}
      disabled={status === 'loading'}
      className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2
      ${current.color} ${status === 'loading' ? 'opacity-70 cursor-wait' : 'hover:opacity-90 active:scale-95'}`}
    >
      {status === 'loading' && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {status === 'error' && <span className="text-xs font-bold">Error</span>}
      {status === 'success' && <span className="text-xs font-bold">Verified</span>}
      {current.label}
    </button>
  );
};
