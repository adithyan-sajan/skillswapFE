import React from "react";
import { useTheme } from "../context/ThemeContext";
import { HiArrowNarrowLeft, HiSun, HiMoon } from "react-icons/hi";
import { Link } from "react-router-dom";
import DotGrid from "../component/DotGrid";
import { motion } from "framer-motion";

const EarnPathIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 50 C20 35, 35 20, 50 20 C65 20, 80 35, 80 50 C80 65, 65 80, 50 80" />
    <path d="M50 10 L65 20 L50 30" />
    <path d="M40 50 H60 M50 40 V60" />
  </svg>
);

const BuyPathIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="20" y="30" width="60" height="50" rx="3" />
    <path d="M35 30 V20 C35 15, 65 15, 65 20 V30" />
    <circle cx="50" cy="55" r="6" />
  </svg>
);

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_#4f46e5] dark:hover:shadow-[10px_10px_0px_0px_#f97316] transition-all duration-200";
export const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 12 } 
  }
};

export default function HowItWorks() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#111] text-black dark:text-white font-mono antialiased transition-colors duration-150 flex flex-col relative overflow-hidden">
      
      {/* 0. GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <DotGrid dotSize={4} gap={20} baseColor={isDark ? "#222222" : "#E2E8F0"} activeColor={isDark ? "#F97316" : "#4F46E5"} proximity={120} shockRadius={220} shockStrength={5} resistance={700} returnDuration={1.4} />
      </div>

      {/* 1. DOCUMENT UTILITY BAR */}
      <nav className="fixed top-0 w-full h-16 bg-white/90 dark:bg-[#111]/90 backdrop-blur-md border-b-4 border-black dark:border-white z-50">
        <div className="max-w-screen-2xl mx-auto h-full flex items-center justify-between px-6 border-x-4 border-black dark:border-white">
          
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white rounded-xl bg-white dark:bg-[#111] hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}
            >
              <HiArrowNarrowLeft className="w-4 h-4 text-indigo-600 dark:text-orange-400" /> 
              <span className="text-xs font-black uppercase hidden sm:inline">Return Home</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 relative z-50">
            <button 
              onClick={toggleTheme} 
              className={`p-2.5 border-2 border-black dark:border-white rounded-xl bg-white dark:bg-[#111] hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all flex items-center justify-center text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}
            >
              {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
            </button>
            
            <Link 
              to="/auth" 
              className={`px-4 py-2.5 text-xs flex items-center justify-center font-black border-2 border-black dark:border-white rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}
            >
              Enter App
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HEADER CONTAINER */}
      <header className="w-full relative z-10 bg-transparent">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-screen-2xl pt-40 pb-20 mx-auto border-x-4 border-black dark:border-white px-6">
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8 text-[11px] font-black uppercase tracking-wider text-black/50 dark:text-white/50">
            <div className="h-[4px] w-12 bg-indigo-600 dark:bg-orange-400 border border-black dark:border-white" />
            Understanding the Protocol
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="font-sans text-4xl md:text-7xl font-black tracking-tight leading-[1.05] uppercase">
            The Token <span className="text-indigo-600 dark:text-orange-400">Economy</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-8 text-sm md:text-lg text-black/80 dark:text-white/80 max-w-3xl font-black leading-relaxed border-l-4 border-black dark:border-white pl-5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm p-4 rounded-r-lg inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
            Skill Tokens (SKL) power every exchange on the platform. To keep our community moving fast, we offer two distinct ways to fill your wallet.
          </motion.p>
        </motion.div>
      </header>

      {/* 3. DUAL SYSTEM EXPLANATION GRID */}
      <section className="w-full relative z-10 bg-slate-50/40 dark:bg-neutral-950/10 backdrop-blur-[2px] border-t-4 border-black dark:border-white">
        <div className="max-w-screen-2xl mx-auto border-x-4 border-black dark:border-white py-16 px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            
            {/* PATH A: THE FREEMIUM COMMUNITY LOOP */}
            <motion.div variants={itemVariants}>
              <div className={`p-8 h-full flex flex-col gap-6 group ${SHARED_CARD_STYLE}`}>
                <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-4">
                  <span className="text-[11px] font-black px-3 py-1.5 bg-indigo-600 text-white dark:bg-orange-400 dark:text-black uppercase rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    Path 01 // Free
                  </span>
                  <EarnPathIcon />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Earn by Teaching</h3>
                  <p className="text-xs text-black/70 dark:text-white/70 font-bold leading-relaxed mb-6">
                    If you have skills but want to save cash, this is your default ecosystem loop. List your expertise, accept a booking from another member, and spend an hour sharing what you know. Once the session wraps up, <strong>1 Token (SKL)</strong> drops straight into your wallet. 
                  </p>
                  <ul className="text-[11px] font-black space-y-3 text-black/80 dark:text-white/80 bg-slate-50 dark:bg-neutral-900 p-5 border-2 border-black dark:border-white rounded-xl">
                    <li className="flex items-start gap-2"><span className="text-indigo-600 dark:text-orange-400">•</span> Best for: People looking to share hobbies & build networks</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 dark:text-orange-400">•</span> Cost: $0.00 (Only your time)</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 dark:text-orange-400">•</span> Limit: Unlimited earnings</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* PATH B: THE PREMIUM ACCELERATOR */}
            <motion.div variants={itemVariants}>
              <div className={`p-8 h-full flex flex-col gap-6 group ${SHARED_CARD_STYLE}`}>
                <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-4">
                  <span className="text-[11px] font-black px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black uppercase rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    Path 02 // Fast Track
                  </span>
                  <BuyPathIcon />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Buy Tokens Directly</h3>
                  <p className="text-xs text-black/70 dark:text-white/70 font-bold leading-relaxed mb-6">
                    Don't have time to teach right now but need to learn a skill immediately? Skip the line. You can buy Skill Tokens directly using standard credit cards or digital pay systems. This cash feeds back into the eco-system to fund server costs and reward community leaders.
                  </p>
                  <ul className="text-[11px] font-black space-y-3 text-black/80 dark:text-white/80 bg-slate-50 dark:bg-neutral-900 p-5 border-2 border-black dark:border-white rounded-xl">
                    <li className="flex items-start gap-2"><span className="text-indigo-600 dark:text-orange-400">•</span> Best for: Busy professionals needing instant advice</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 dark:text-orange-400">•</span> Delivery: Instant wallet allocation</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-600 dark:text-orange-400">•</span> Support: Includes session protection guarantees</li>
                  </ul>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 4. THE ESCROW DETAILS SECTION */}
      <section className="w-full relative z-10 border-t-4 border-black dark:border-white bg-indigo-600 dark:bg-orange-500 text-white dark:text-black">
        <div className="max-w-screen-2xl mx-auto border-x-4 border-black dark:border-white px-6 py-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-[#111] text-black dark:text-white p-6 md:p-8 rounded-xl border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all duration-200">
              <div className="text-5xl">🛡️</div>
              <div>
                <h2 className="text-2xl font-black uppercase mb-2">The Safe-Swap Guarantee</h2>
                <p className="text-xs md:text-sm font-bold leading-relaxed text-black/70 dark:text-white/70">
                  Whether you earned your token or bought it with real cash, we protect your transaction. When you book a session, the token isn't handed over instantly. It sits securely in a <strong>temporary holding vault</strong>. Only when both you and your teacher click "Session Complete" is the token safely transferred. If a teacher doesn't show up, your token returns right back to your wallet.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. PRICING STRATEGY FOR BEGINNERS */}
      <section className="w-full relative z-10 border-y-4 border-black dark:border-white bg-white/40 dark:bg-[#111]/40 backdrop-blur-[2px] flex-grow flex flex-col">
        <div className="max-w-screen-2xl mx-auto border-x-4 border-black dark:border-white px-6 py-16 flex-grow w-full">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4 text-[11px] font-black uppercase tracking-wider text-black/50 dark:text-white/50">
              <div className="h-[4px] w-12 bg-indigo-600 dark:bg-orange-400 border border-black dark:border-white" />
              Platform Pricing
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-black dark:text-white">
              Flexible Entry Packages
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm font-black text-black/60 dark:text-white/60 mt-4 max-w-2xl border-l-4 border-black dark:border-white pl-4 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm p-2 rounded-r-lg inline-block">
              You are never forced to pay. Earn your way through the community by sharing your own skills, or buy a starter package to book your very first lesson instantly.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            
            {/* Tier 1 */}
            <motion.div variants={itemVariants}>
              <div className={`p-8 h-full flex flex-col justify-between ${SHARED_CARD_STYLE}`}>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-black/50 dark:text-white/50 border-b-2 border-black/10 dark:border-white/10 pb-2 block">[ The Trial ]</span>
                  <h4 className="text-2xl font-black uppercase mt-4">1 Skill Token</h4>
                  <p className="text-[11px] font-bold leading-relaxed text-black/60 dark:text-white/60 mt-4">Test the waters. Ideal for booking a single casual conversation or testing a specific mentor.</p>
                </div>
                <div className="mt-10 border-t-2 border-black/10 dark:border-white/10 pt-6">
                  <div className="text-4xl font-black mb-6">$3<span className="text-sm font-black text-black/40 dark:text-white/40"> / single</span></div>
                  <Link to="/auth" className={`w-full py-3 bg-slate-50 dark:bg-neutral-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black uppercase text-xs border-2 border-black dark:border-white rounded-xl transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center ${PRESS_ANIMATION}`}>
                    Select Path
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Tier 2 */}
            <motion.div variants={itemVariants}>
              <div className={`p-8 h-full flex flex-col justify-between relative overflow-hidden transform md:-translate-y-4 ${SHARED_CARD_STYLE}`}>
                <div className="absolute top-0 right-0 bg-indigo-600 text-white dark:bg-orange-400 dark:text-black font-black text-[10px] uppercase px-3 py-1.5 border-b-2 border-l-2 border-black dark:border-white rounded-bl-xl shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[-2px_2px_0px_0px_rgba(255,255,255,1)]">
                  Best Starter
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-orange-400 border-b-2 border-black/10 dark:border-white/10 pb-2 block">[ Learner Pack ]</span>
                  <h4 className="text-2xl font-black uppercase mt-4">5 Skill Tokens</h4>
                  <p className="text-[11px] font-bold leading-relaxed text-black/60 dark:text-white/60 mt-4">Our recommended path. Gives you enough credits to try out a couple of different topics or languages.</p>
                </div>
                <div className="mt-10 border-t-2 border-black/10 dark:border-white/10 pt-6">
                  <div className="text-4xl font-black mb-6">$10<span className="text-sm font-black text-black/40 dark:text-white/40"> / save 33%</span></div>
                  <Link to="/auth" className={`w-full py-3 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-black uppercase text-xs border-2 border-black dark:border-white rounded-xl transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center ${PRESS_ANIMATION}`}>
                    Select Path
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Tier 3 */}
            <motion.div variants={itemVariants}>
              <div className={`p-8 h-full flex flex-col justify-between ${SHARED_CARD_STYLE}`}>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-black/50 dark:text-white/50 border-b-2 border-black/10 dark:border-white/10 pb-2 block">[ Deep Dive Bundle ]</span>
                  <h4 className="text-2xl font-black uppercase mt-4">12 Skill Tokens</h4>
                  <p className="text-[11px] font-bold leading-relaxed text-black/60 dark:text-white/60 mt-4">Skip the trading system entirely for a while. Perfect for mastering an entire skill curriculum.</p>
                </div>
                <div className="mt-10 border-t-2 border-black/10 dark:border-white/10 pt-6">
                  <div className="text-4xl font-black mb-6">$20<span className="text-sm font-black text-black/40 dark:text-white/40"> / best value</span></div>
                  <Link to="/auth" className={`w-full py-3 bg-slate-50 dark:bg-neutral-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black uppercase text-xs border-2 border-black dark:border-white rounded-xl transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center ${PRESS_ANIMATION}`}>
                    Select Path
                  </Link>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}