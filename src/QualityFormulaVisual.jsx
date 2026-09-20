import React from 'react';
import { motion } from 'framer-motion';

export default function QualityFormulaVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto p-6 bg-white/[0.02] border border-white/10 rounded-[28px] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-between h-72">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-[10px] font-mono-tech uppercase tracking-[0.2em]">
          Viral Formula Engine
        </span>
        <span className="text-[#f5c542] text-[10px] font-mono-tech bg-[#f5c542]/10 border border-[#f5c542]/30 px-2 py-0.5 rounded-full font-semibold">
          85% Retention
        </span>
      </div>

      {/* Clean Retention Curve */}
      <div className="relative w-full h-36 mt-2">
        <svg viewBox="0 0 320 100" className="w-full h-full">
          <defs>
            <linearGradient id="formulaGlowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ebba2f" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ebba2f" stopOpacity="0.0" />
            </linearGradient>
            <filter id="retentionGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1="38" y1="15" x2="300" y2="15" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="38" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="38" y1="85" x2="300" y2="85" stroke="rgba(255,255,255,0.1)" />
          <line x1="38" y1="15" x2="38" y2="85" stroke="rgba(255,255,255,0.1)" />

          {/* Y-axis Labels */}
          <text x="32" y="18" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">100%</text>
          <text x="32" y="53" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">50%</text>
          <text x="32" y="88" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">0%</text>

          {/* Standard unedited drop-off (plunges in 3s) */}
          <path 
            d="M 38 15 C 48 65, 60 78, 100 80 T 300 83" 
            fill="none" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="2" 
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Vara Retention Fill */}
          <path 
            d="M 38 15 C 70 20, 150 25, 300 28 L 300 85 L 38 85 Z" 
            fill="url(#formulaGlowGrad)" 
          />

          {/* Vara Formula High Retention Curve */}
          <motion.path 
            d="M 38 15 C 70 20, 150 25, 300 28" 
            fill="none" 
            stroke="#ebba2f" 
            strokeWidth="3" 
            strokeLinecap="round" 
            filter="url(#retentionGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", repeatDelay: 1.5 }}
          />

          {/* Key Markers */}
          <circle cx="38" cy="15" r="3.5" fill="#f5c542" />
          <motion.circle 
            cx="300" 
            cy="28" 
            r="4" 
            fill="#f5c542"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* X Axis Timeline Labels */}
          <text x="38" y="97" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">0s</text>
          <text x="68" y="97" textAnchor="middle" fill="#f5c542" fontSize="8" fontWeight="bold" fontFamily="monospace">3s Hook</text>
          <text x="175" y="97" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">30s</text>
          <text x="300" y="97" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">60s</text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#f5c542] rounded-full shadow-[0_0_8px_rgba(235,186,47,0.8)]"></span>
          <span className="text-[10px] text-white/70 font-medium tracking-wide">Vara Formula (<strong className="text-[#f5c542]">85% Retention</strong>)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-white/30 border border-white/20 border-dashed rounded-full"></span>
          <span className="text-[10px] text-white/40 font-medium tracking-wide">Standard Edit (Early Drop)</span>
        </div>
      </div>

    </div>
  );
}
