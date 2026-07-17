import React, { useState, useEffect } from 'react';

const QUOTES = [
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Excellence is not a skill. It is an attitude.",
  "Your academic goals are high, and your potential is higher.",
  "Consistency beats talent when talent doesn't work hard.",
  "The Ivy League isn't just a destination; it's a standard of excellence.",
  "Dream big, work hard, stay focused, and surround yourself with excellence."
];

export const MotivationalTicker: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-primary text-white overflow-hidden flex items-center justify-center z-50 shadow-inner">
      <div className="animate-pulse text-sm font-medium px-4 text-center transition-opacity duration-1000">
        {QUOTES[index]}
      </div>
    </div>
  );
};
