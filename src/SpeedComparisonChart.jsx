import React from 'react';
import { motion } from 'framer-motion';

export default function SpeedComparisonChart() {
  return (
    <div className="relative w-full max-w-md mx-auto p-6 bg-white/[0.02] border border-white/10 rounded-[28px] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-between h-72">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-[10px] font-mono-tech uppercase tracking-[0.2em]">
          Turnaround Time
        </span>
        <span className="text-[#f5c542] text-[10px] font-mono-tech bg-[#f5c542]/10 border border-[#f5c542]/30 px-2 py-0.5 rounded-full font-semibold">
          30x Faster
        </span>
      </div>

      {/* Graph Area */}
      <div className="relative w-full h-36 mt-2">
        <svg viewBox="0 0 320 130" className="w-full h-full">
          <defs>
            {/* Vara Gold Glow Area */}
            <linearGradient id="varaAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ebba2f" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ebba2f" stopOpacity="0.0" />
            </linearGradient>
            
            {/* Glow Filter */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1="38" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="38" y1="62" x2="300" y2="62" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="38" y1="105" x2="300" y2="105" stroke="rgba(255,255,255,0.12)" />
          <line x1="38" y1="20" x2="38" y2="105" stroke="rgba(255,255,255,0.12)" />

          {/* Y Axis Labels */}
          <text x="32" y="24" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">100%</text>
          <text x="32" y="107" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">0%</text>

          {/* Other Agencies Line (Slow 7+ days) */}
          <path 
            d="M 38 105 Q 150 102, 230 75 T 295 24" 
            fill="none" 
            stroke="rgba(248, 113, 113, 0.45)" 
            strokeWidth="2.5" 
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          {/* Other Agencies Endpoint */}
          <circle cx="295" cy="24" r="3.5" fill="#f87171" opacity="0.8" />

          {/* Vara Edits Area Fill */}
          <path 
            d="M 38 105 C 50 75, 68 30, 92 24 L 92 105 Z" 
            fill="url(#varaAreaGrad)" 
          />

          {/* Vara Edits Line (Fast < 6 hours) */}
          <motion.path 
            d="M 38 105 C 50 75, 68 30, 92 24" 
            fill="none" 
            stroke="#ebba2f" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            filter="url(#goldGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", repeatDelay: 1.5 }}
          />

          {/* Vara Edits Endpoint with Pulsing Glow */}
          <motion.circle 
            cx="92" 
            cy="24" 
            r="4.5" 
            fill="#f5c542"
            animate={{ r: [4, 5.5, 4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* X Axis Time Marks */}
          <text x="38" y="122" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">0h</text>
          <text x="92" y="122" textAnchor="middle" fill="#f5c542" fontSize="8" fontWeight="bold" fontFamily="monospace">&lt;6h</text>
          <text x="160" y="122" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">24h</text>
          <text x="230" y="122" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">3d</text>
          <text x="295" y="122" textAnchor="middle" fill="rgba(248,113,113,0.7)" fontSize="8" fontFamily="monospace">7d+</text>
        </svg>

        {/* Floating Tooltips */}
        <div 
          className="absolute text-[#f5c542] text-[10px] font-bold whitespace-nowrap bg-black/85 px-2 py-0.5 rounded border border-[#f5c542]/40 shadow-[0_0_10px_rgba(245,197,66,0.3)]"
          style={{ left: '29%', top: '-2px', transform: 'translateX(-50%)' }}
        >
          &lt; 6 Hours
        </div>

        <div 
          className="absolute text-red-400 text-[10px] font-bold whitespace-nowrap bg-black/85 px-2 py-0.5 rounded border border-red-500/30"
          style={{ right: '4px', top: '-2px' }}
        >
          7+ Days
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#f5c542] rounded-full shadow-[0_0_8px_rgba(235,186,47,0.8)]"></span>
          <span className="text-[10px] text-white/70 font-medium tracking-wide">Vara Edits (<strong className="text-[#f5c542]">&lt; 6h</strong>)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-red-400/60 border border-red-400/40 border-dashed rounded-full"></span>
          <span className="text-[10px] text-white/50 font-medium tracking-wide">Other Agencies (7+ Days)</span>
        </div>
      </div>

    </div>
  );
}
