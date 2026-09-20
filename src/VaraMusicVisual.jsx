import React from 'react';
import { motion } from 'framer-motion';
import { Music, Radio, Sparkles, ShieldCheck } from 'lucide-react';

export default function VaraMusicVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto p-[2px] bg-gradient-to-b from-[#f5c542]/40 via-[#f5c542]/10 to-transparent rounded-[32px] overflow-hidden">
      <div className="relative w-full bg-[#0a0a0a]/90 border border-white/10 rounded-[30px] p-6 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between h-[340px] overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#f5c542]/10 rounded-full blur-[70px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-center pt-2">
          <span className="text-white/90 text-xs font-mono-tech tracking-[0.15em] uppercase font-bold">
            varamusic.com
          </span>
        </div>

        {/* Centerpiece - Pulsing AI Audio Core */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-4">
          <div className="relative flex items-center justify-center">
            {/* Expanding Sound Waves */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full border-[1.5px] border-[#f5c542]/80"
                initial={{ width: 60, height: 60, opacity: 0.8 }}
                animate={{ width: 160 + (ring * 40), height: 160 + (ring * 40), opacity: 0 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: ring * 0.6,
                }}
              />
            ))}
            
            {/* Central Core */}
            <motion.div 
              className="relative w-24 h-24 rounded-full bg-black border border-[#f5c542]/40 flex items-center justify-center shadow-[0_0_40px_rgba(245,197,66,0.2)] overflow-hidden"
            >
              {/* Inner glowing core */}
              <motion.div 
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-[#f5c542]/20 to-transparent opacity-50"
              />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#f5c542] to-[#d6a218] flex items-center justify-center shadow-[0_0_20px_rgba(245,197,66,0.5)]">
                 <Radio className="w-5 h-5 text-black" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Telemetry Footer */}
        <div className="relative z-10 w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 flex flex-col gap-3 backdrop-blur-xl">
          {/* Progress Bar */}
          <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute h-full w-[50%] bg-gradient-to-r from-transparent via-[#f5c542] to-transparent"
              animate={{ left: ["-50%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="flex items-center justify-center pt-1">
            <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span className="font-medium tracking-wide">100% Copyright-Free</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
