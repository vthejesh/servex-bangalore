'use client';

import React from 'react';

export const TirupatiLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Glow Aura Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 rounded-2xl blur-md opacity-70 animate-pulse" />

      {/* Main Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950 rounded-2xl border border-amber-500/40 p-2 flex items-center justify-center shadow-xl">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>

          {/* Golden Crown / Kalasa Top */}
          <path
            d="M 50 10 L 60 25 L 40 25 Z"
            fill="url(#goldGradient)"
          />
          <circle cx="50" cy="10" r="3" fill="#fef08a" />

          {/* Left White Tilak Stripe */}
          <path
            d="M 28 25 C 32 45 35 65 44 75 L 35 75 C 26 62 22 42 20 25 Z"
            fill="url(#whiteGradient)"
          />

          {/* Right White Tilak Stripe */}
          <path
            d="M 72 25 C 68 45 65 65 56 75 L 65 75 C 74 62 78 42 80 25 Z"
            fill="url(#whiteGradient)"
          />

          {/* Center Red Kasturi Tilak (Kunkuma) */}
          <path
            d="M 46 25 C 46 45 47 62 50 78 C 53 62 54 45 54 25 Z"
            fill="url(#redGradient)"
          />

          {/* Bottom Lotus / Padma Base */}
          <path
            d="M 25 82 C 38 92 62 92 75 82 C 60 88 40 88 25 82 Z"
            fill="url(#goldGradient)"
          />
        </svg>
      </div>
    </div>
  );
};
