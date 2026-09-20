import React from 'react';
import { motion } from 'framer-motion';

export default function CostComparisonChart() {
  return (
    <div className="relative w-full max-w-md mx-auto p-6 bg-white/[0.02] border border-white/10 rounded-[28px] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-end h-72">
      
      <div className="absolute top-5 left-6 text-white/40 text-[10px] font-mono-tech uppercase tracking-[0.2em]">
        Average Monthly Cost
      </div>

      <div className="flex items-end justify-center gap-12 h-full w-full pt-10 pb-2 border-b border-white/10">
        
        {/* Other Agencies Bar */}
        <div className="flex flex-col items-center gap-4 w-24">
          <div className="relative w-full h-40 bg-white/5 rounded-t-lg overflow-hidden border-t border-l border-r border-white/10 flex justify-center">
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-white/10 to-white/5"></div>
            <span className="absolute top-3 text-white/60 font-bold text-lg">$$$</span>
          </div>
          <span className="text-white/50 text-xs font-medium text-center tracking-wide">Other Agencies</span>
        </div>

        {/* Vara Edits Bar */}
        <div className="flex flex-col items-center gap-4 w-24">
          <motion.div 
            animate={{ 
              boxShadow: [
                "0 0 15px rgba(245,197,66,0.1)", 
                "0 0 40px rgba(245,197,66,0.5)", 
                "0 0 15px rgba(245,197,66,0.1)"
              ],
              borderColor: [
                "rgba(245,197,66,0.3)",
                "rgba(245,197,66,0.8)",
                "rgba(245,197,66,0.3)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-12 bg-[#f5c542]/10 rounded-t-lg overflow-hidden border-t-2 border-l-2 border-r-2 flex justify-center"
          >
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#f5c542]/80 to-[#ffe08a]/40"></div>
            <span className="absolute top-1 text-[#f5c542] font-extrabold text-lg">$</span>
          </motion.div>
          <span className="text-[#f5c542] text-xs font-bold text-center tracking-wide">Vara Edits</span>
        </div>

      </div>
    </div>
  );
}
