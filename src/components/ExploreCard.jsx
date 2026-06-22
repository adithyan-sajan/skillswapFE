import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; 

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const getLevelBadgeStyle = (level) => {
  const baseStyle = "text-[10px] font-black px-2 py-0.5 rounded-md border-2 border-black dark:border-white uppercase";
  switch (level?.toLowerCase()) {
    case "beginner":
      return `${baseStyle} bg-emerald-400 dark:bg-emerald-500 text-black`;
    case "intermediate":
      return `${baseStyle} bg-yellow-400 dark:bg-yellow-500 text-black`;
    case "advanced":
      return `${baseStyle} bg-rose-400 dark:bg-rose-500 text-black`;
    default:
      return `${baseStyle} bg-slate-100 dark:bg-neutral-800 text-black dark:text-white`;
  }
};

export default function ExploreCard({ user, skill, icon: IconComponent, cost, desc, level, onSwapClick }) {
  const { isDark } = useTheme();
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // The high-contrast neon tracking glow
  const glowGradient = isDark
    ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 60, 0, 1) 0%, rgba(255, 0, 255, 0.8) 50%, transparent 100%)`
    : `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 150, 1) 0%, rgba(0, 100, 255, 0.8) 50%, transparent 100%)`;

  return (
    <motion.div variants={itemVariants} className="h-full">
      {/* FIXED WRAPPER: 
        Keeps a constant 6px shadow. When hover:-translate-y-2 fires, 
        the shadow moves perfectly in sync with the card, lifting off the page!
      */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative h-full rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316] hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-200 group cursor-default"
      >
        {/* MAGIC GLOW LAYER */}
        <div
          className="absolute -inset-1.5 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg rounded-2xl"
          style={{ background: glowGradient }}
        />

        {/* ACTUAL CARD SURFACE */}
        <div className="p-5 h-full flex flex-col justify-between relative bg-white dark:bg-[#111] border-4 border-black dark:border-white rounded-xl z-10 overflow-hidden">
          
          <div>
            <div className="flex justify-between items-start border-b-2 border-black/10 dark:border-white/20 pb-3 mb-3.5">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-50 dark:bg-neutral-900 rounded-xl border-2 border-black dark:border-white/40">
                  <IconComponent />
                </div>
                <div>
                  <span className="text-[9px] font-black text-black/40 dark:text-white/40 block uppercase">PEER HOST</span>
                  <span className="text-xs font-black uppercase tracking-tight text-indigo-600 dark:text-orange-400 hover:underline cursor-pointer">@{user}</span>
                </div>
              </div>
              <span className={getLevelBadgeStyle(level)}>{level}</span>
            </div>

            <div className="space-y-1.5 relative z-20">
              <h3 className="text-sm font-black uppercase tracking-tight leading-snug text-slate-900 dark:text-white">{skill}</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 font-bold leading-relaxed line-clamp-3">{desc}</p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t-2 border-black/10 dark:border-white/20 flex items-center justify-between gap-2 relative z-20">
            <div className="font-mono">
              <span className="text-[9px] font-black text-black/40 dark:text-white/40 block uppercase">EXCHANGE COST</span>
              <span className="text-xs font-black uppercase flex items-center gap-1 text-black dark:text-white">
                🪙 {cost.toFixed(2)} <span className="text-[10px] text-black/40 dark:text-white/40 font-bold">SKL/hr</span>
              </span>
            </div>

            <button onClick={onSwapClick} className="h-9 px-3.5 bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-tight rounded-xl border-2 border-black dark:border-white hover:opacity-90 transition-all flex items-center gap-1.5 active:scale-95 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              Request Swap <ArrowRightIcon />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}