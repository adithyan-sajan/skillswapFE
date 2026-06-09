import React from "react";
import { useTheme } from "../context/ThemeContext";
import { HiArrowRight, HiSun, HiMoon } from "react-icons/hi";

// Minimal Geometric Custom SVG Icons
const HexTokenIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current text-blue-600 dark:text-orange-400" fill="none" strokeWidth="6">
    <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
  </svg>
);
const SquareSwapIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current text-blue-600 dark:text-orange-400" fill="none" strokeWidth="6">
    <rect x="10" y="10" width="80" height="80" rx="4"/>
    <path d="M30 60 L50 40 L70 60" strokeLinecap="round"/>
  </svg>
);
const CircleTrustIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current text-blue-600 dark:text-orange-400" fill="none" strokeWidth="6">
    <circle cx="50" cy="50" r="45" />
    <path d="M35 50 L45 60 L65 40" strokeLinecap="round"/>
  </svg>
);

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#111] text-black dark:text-white font-mono antialiased transition-colors duration-150">
      
      {/* HEADER NAV */}
      <nav className="fixed top-0 w-full h-16 bg-white dark:bg-[#111] border-b-2 border-black dark:border-white z-50">
        <div className="max-w-screen-2xl mx-auto h-full flex items-center justify-between px-6 border-x-2 border-black dark:border-white">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-blue-600 dark:bg-orange-400" />
            <span className="text-xl font-bold tracking-tighter uppercase">Skill//Swap</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#exchange" className="text-sm font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white uppercase transition-colors">[ Exchange ]</a>
            <button onClick={toggleTheme} className="p-3 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-all active:scale-95">
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>
            <button className="px-5 py-3 text-sm font-bold bg-white dark:bg-[#111] border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black uppercase transition-all active:scale-95">
              Launch {">_"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-40 pb-20 px-6 max-w-screen-2xl mx-auto border-x-2 border-black dark:border-white">
        <div className="flex items-center gap-3 mb-10 text-xs font-bold uppercase">
          <div className="h-1 w-20 bg-blue-600 dark:bg-orange-400" />
          SYSTEM_STATUS: P2P_ACTIVE
        </div>
        
        <h1 className="font-sans text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] uppercase">
          <span className="text-blue-600 dark:text-orange-400">Knowledge</span> is <br />
          <span className="text-blue-600 dark:text-orange-400">Capital</span>. <br />
          Trade accordingly.
        </h1>
        
        <p className="mt-12 text-lg md:text-2xl text-black/80 dark:text-white/80 max-w-3xl font-bold leading-snug border-l-4 border-black dark:border-white pl-6">
          The skill exchange protocol. Teach others to earn Skill Tokens (SKL). Spend SKL to unlock mentorship. No cash, just raw expertise.
        </p>

        <div className="mt-14 flex flex-col sm:flex-row items-center gap-0 border-2 border-black dark:border-white w-full max-w-md">
          <button className="w-full sm:w-1/2 px-8 py-5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-sm border-r-2 border-black dark:border-white hover:bg-black/80 dark:hover:bg-white/80 transition-all flex items-center justify-center gap-2">
            Initialize Swap <HiArrowRight className="w-4 h-4"/>
          </button>
          <button className="w-full sm:w-1/2 px-8 py-5 bg-white dark:bg-black text-black dark:text-white font-bold uppercase text-sm hover:bg-slate-100 dark:hover:bg-slate-900 transition-all">
            View Protocol
          </button>
        </div>
      </header>

      {/* FEATURE GRID */}
      <section id="exchange" className="border-y-2 border-black dark:border-white">
        <div className="max-w-screen-2xl mx-auto px-6 border-x-2 border-black dark:border-white">
          <div className="pt-16 pb-8">
            <h2 className="text-3xl font-black tracking-tight uppercase">The exchange protocol</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-black dark:border-white">
            <div className="border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black dark:border-white p-10 flex flex-col items-start gap-6 group hover:bg-blue-600/5 dark:hover:bg-orange-400/5 transition-colors">
              <HexTokenIcon/>
              <h3 className="text-2xl font-bold uppercase tracking-tight">[ 01 ] SKL Tokens</h3>
              <p className="text-black/80 dark:text-white/80 font-bold text-base leading-relaxed">
                Tokens are the only unit of value. Host a micro-session to earn SKL. Tokens are stored in your tamper-proof ledger.
              </p>
              <div className="h-1 w-10 bg-black dark:bg-white group-hover:w-full transition-all duration-300"/>
            </div>

            <div className="border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black dark:border-white p-10 flex flex-col items-start gap-6 group hover:bg-blue-600/5 dark:hover:bg-orange-400/5 transition-colors">
              <SquareSwapIcon/>
              <h3 className="text-2xl font-bold uppercase tracking-tight">[ 02 ] Dynamic Swaps</h3>
              <p className="text-black/80 dark:text-white/80 font-bold text-base leading-relaxed">
                Spend SKL to book sessions on the decentralized exchange. Instant matching for code reviews, mentorship, and deep dives.
              </p>
              <div className="h-1 w-10 bg-black dark:bg-white group-hover:w-full transition-all duration-300"/>
            </div>

            <div className="p-10 flex flex-col items-start gap-6 group hover:bg-blue-600/5 dark:hover:bg-orange-400/5 transition-colors">
              <CircleTrustIcon/>
              <h3 className="text-2xl font-bold uppercase tracking-tight">[ 03 ] Direct Consensus</h3>
              <p className="text-black/80 dark:text-white/80 font-bold text-base leading-relaxed">
                Community ratings and verified session logs enforce accountability. Value is direct, zero intermediaries, pure P2P consensus.
              </p>
              <div className="h-1 w-10 bg-black dark:bg-white group-hover:w-full transition-all duration-300"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}