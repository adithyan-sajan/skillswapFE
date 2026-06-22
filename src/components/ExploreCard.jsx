import React from "react";
import { motion } from "framer-motion";

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_#4f46e5] dark:hover:shadow-[10px_10px_0px_0px_#f97316] transition-all duration-200";

// Framer Motion item variant for the staggered entrance
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

// Helper function to map difficulty levels to Neo-Brutalist colors
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

export default function ExploreCard({ user, skill, icon: IconComponent, cost, desc, level }) {
  return (
    <motion.div variants={itemVariants}>
      <div className={`p-5 h-full flex flex-col justify-between relative group ${SHARED_CARD_STYLE}`}>
        <div>
          {/* Micro Header */}
          <div className="flex justify-between items-start border-b-2 border-black dark:border-white/20 pb-3 mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-50 dark:bg-neutral-900 rounded-xl border-2 border-black dark:border-white/40">
                <IconComponent />
              </div>
              <div>
                <span className="text-[9px] font-black text-black/40 dark:text-white/40 block uppercase">PEER HOST</span>
                <span className="text-xs font-black uppercase tracking-tight text-indigo-600 dark:text-orange-400 hover:underline cursor-pointer">@{user}</span>
              </div>
            </div>
            
            {/* Dynamic Level Badge Applied Here */}
            <span className={getLevelBadgeStyle(level)}>
              {level}
            </span>
          </div>

          {/* Body Content */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-black uppercase tracking-tight leading-snug text-slate-900 dark:text-white">
              {skill}
            </h3>
            <p className="text-xs text-slate-600 dark:text-neutral-400 font-bold leading-relaxed line-clamp-3">
              {desc}
            </p>
          </div>
        </div>

        {/* Footer Drawer */}
        <div className="mt-5 pt-3 border-t-2 border-black dark:border-white/20 flex items-center justify-between gap-2">
          <div className="font-mono">
            <span className="text-[9px] font-black text-black/40 dark:text-white/40 block uppercase">EXCHANGE COST</span>
            <span className="text-xs font-black uppercase flex items-center gap-1">
              🪙 {cost.toFixed(2)} <span className="text-[10px] text-black/40 dark:text-white/40 font-bold">SKL/hr</span>
            </span>
          </div>

          <button className="h-9 px-3.5 bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-tight rounded-xl border-2 border-black dark:border-white hover:opacity-90 transition-all flex items-center gap-1.5 active:scale-95 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            Request Swap <ArrowRightIcon />
          </button>
        </div>
      </div>
    </motion.div>
  );
}