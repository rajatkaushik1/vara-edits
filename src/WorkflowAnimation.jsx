import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const DURATIONS = {
  capture: 800,
  process: 1000,
  deliver: 1200,
  hold: 4000,
};

const NEXT = {
  capture: "process",
  process: "deliver",
  deliver: "hold",
  hold: "capture",
};

const SHORTS = [
  { label: "Hook #1", rotate: -8, y: 10, hue: "from-[#f5c542] to-[#ff9d2e]" },
  { label: "Rant Clip", rotate: -4, y: -6, hue: "from-[#ffe08a] to-[#f5c542]" },
  { label: "Best Line", rotate: 0, y: 14, hue: "from-[#f5c542] to-[#c98f1f]" },
  { label: "Reaction", rotate: 4, y: -8, hue: "from-[#ff9d2e] to-[#f5c542]" },
  { label: "CTA Cut", rotate: 8, y: 12, hue: "from-[#ffe08a] to-[#ff9d2e]" },
];

const MAINS = [
  { label: "Full Highlights", hue: "from-[#3a3a3a] to-[#161616]" },
  { label: "YouTube Recap", hue: "from-[#3a3a3a] to-[#161616]" },
];

const STEPS = [
  { phase: ["capture"], label: "01 · Feed the live stream" },
  { phase: ["process"], label: "02 · We Edit" },
  { phase: ["deliver", "hold"], label: "03 · Viral outputs, delivered" },
];

export default function WorkflowAnimation() {
  const [phase, setPhase] = useState("capture");
  const timeoutRef = useRef(undefined);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setPhase((p) => NEXT[p]);
    }, DURATIONS[phase]);
    return () => window.clearTimeout(timeoutRef.current);
  }, [phase]);

  const capturing = phase === "capture";
  const processing = phase === "process";
  const delivering = phase === "deliver" || phase === "hold";

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 interactive">
      {/* step indicator */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
        {STEPS.map((s, i) => {
          const active = s.phase.includes(phase);
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    active ? "bg-[#f5c542] shadow-[0_0_10px_rgba(245,197,66,0.9)]" : "bg-white/20"
                  }`}
                />
                <span
                  className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 sm:text-xs ${
                    active ? "text-[#f5c542]" : "text-white/30"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && <span className="hidden h-px w-6 bg-white/10 sm:block" />}
            </div>
          );
        })}
      </div>

      {/* main scene */}
      <div className="relative flex flex-col items-center gap-6 rounded-[28px] border border-white/10 bg-white/[0.02] p-5 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8 lg:flex-row lg:items-center lg:gap-4 lg:p-10">
        {/* STREAM SOURCE */}
        <div className="flex w-full flex-col items-center gap-2 lg:w-auto z-10">
          <motion.div
            animate={{
              scale: processing ? 0.92 : 1,
              boxShadow: capturing
                ? "0 0 40px rgba(245,197,66,0.35)"
                : processing
                  ? "0 0 60px rgba(245,197,66,0.55)"
                  : "0 0 15px rgba(245,197,66,0.08)",
              borderColor: capturing || processing ? "rgba(245,197,66,0.6)" : "rgba(255,255,255,0.1)",
            }}
            transition={{ duration: 0.6 }}
            className="relative h-36 w-full max-w-[280px] overflow-hidden rounded-2xl border lg:w-64"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url('/thumbnail.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="flex items-center justify-between px-3 pt-3">
              <div className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-2 py-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                <span className="font-mono-tech text-[9px] font-semibold tracking-wide text-red-400">LIVE</span>
              </div>
              <span className="font-mono-tech text-[9px] text-white/40">2:45:00</span>
            </div>

          </motion.div>
        </div>

        {/* CONNECTOR: stream -> core */}
        <FlowConnector active={capturing || processing} direction="row" />

        {/* CORE */}
        {/* CORE / ENGINE */}
        <div className="flex flex-col items-center gap-2.5 z-10">
          <div className="relative flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
            <motion.div
              className="absolute inset-0 rounded-full bg-[#f5c542]/25 blur-2xl"
              animate={{
                scale: processing ? [1, 1.4, 1] : [1, 1.08, 1],
                opacity: processing ? [0.5, 0.9, 0.5] : [0.25, 0.4, 0.25],
              }}
              transition={{ duration: processing ? 0.8 : 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={{
                scale: processing ? [1, 1.15, 1] : 1,
                filter: processing 
                  ? "drop-shadow(0 0 35px rgba(245,197,66,0.8))" 
                  : "drop-shadow(0 0 10px rgba(245,197,66,0.3))"
              }}
              transition={{ duration: 0.6, repeat: processing ? Infinity : 0, repeatType: "mirror" }}
              className="relative flex h-full w-full flex-col items-center justify-center z-10"
            >
              <img src="/engine-logo.png" alt="VARA Edits Team" className="w-[85%] h-auto object-contain" />
            </motion.div>
          </div>

        </div>

        {/* CONNECTOR: core -> outputs */}
        <FlowConnector active={delivering} direction="row" fan />

        {/* OUTPUTS */}
        <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-1 z-10">
          <motion.div
            initial="hidden"
            animate={delivering ? "visible" : "hidden"}
            className="flex flex-col items-center gap-4"
          >
            {/* main horizontal videos */}
            <div className="flex gap-3">
              {MAINS.map((m, i) => (
                <motion.div
                  key={m.label}
                  custom={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.6, x: -20, y: 0 },
                    visible: (idx) => ({
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: 0,
                      transition: { type: "spring", stiffness: 260, damping: 22, delay: idx * 0.08 },
                    }),
                  }}
                  className={`relative flex aspect-video w-24 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br ${m.hue} shadow-lg sm:w-28`}
                >
                  <PlayGlyph />
                  <span className="absolute bottom-1 left-1.5 font-mono-tech text-[7px] text-white/70">{m.label}</span>
                </motion.div>
              ))}
            </div>

            {/* vertical shorts fan */}
            <div className="flex items-end gap-2 sm:gap-2.5">
              {SHORTS.map((s, i) => (
                <motion.div
                  key={s.label}
                  custom={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, x: -30, y: 0, rotate: 0 },
                    visible: (idx) => ({
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: s.y * 0.4,
                      rotate: s.rotate,
                      transition: { type: "spring", stiffness: 240, damping: 20, delay: 0.15 + idx * 0.09 },
                    }),
                  }}
                  className={`relative flex aspect-[9/16] w-11 items-center justify-center overflow-hidden rounded-md border border-[#f5c542]/30 bg-gradient-to-br ${s.hue} shadow-[0_4px_20px_rgba(245,197,66,0.25)] sm:w-14`}
                >
                  <PlayGlyph small />
                  <span className="absolute bottom-0.5 left-0 right-0 text-center font-mono-tech text-[6px] font-semibold text-black/70 sm:text-[7px]">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PlayGlyph({ small }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm ${
        small ? "h-4 w-4" : "h-6 w-6"
      }`}
    >
      <svg viewBox="0 0 24 24" className={small ? "h-2 w-2" : "h-3 w-3"} fill="white">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

function FlowConnector({
  active,
  direction,
  fan,
}) {
  const isRow = direction === "row";
  return (
    <div
      className={
        isRow
          ? "relative flex h-px w-10 items-center justify-center overflow-visible sm:w-14 lg:w-16 z-0"
          : "relative flex h-10 w-px items-center justify-center overflow-visible lg:h-16 z-0"
      }
    >
      <div className={`absolute ${isRow ? "h-px w-full" : "h-full w-px"} bg-gradient-to-r from-[#f5c542]/10 via-[#f5c542]/40 to-[#f5c542]/10`} />
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#f5c542] shadow-[0_0_8px_rgba(245,197,66,0.9)]"
          animate={
            isRow
              ? { left: ["0%", "100%"], opacity: active ? [0, 1, 0] : 0 }
              : { top: ["0%", "100%"], opacity: active ? [0, 1, 0] : 0 }
          }
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.36, ease: "linear" }}
          style={isRow ? { top: "50%", translateY: "-50%" } : { left: "50%", translateX: "-50%" }}
        />
      ))}
      {fan && (
        <span className="absolute -right-1 h-2 w-2 rotate-45 border-r border-t border-[#f5c542]/50" />
      )}
    </div>
  );
}
