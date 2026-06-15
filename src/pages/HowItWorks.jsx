import React from "react";
import { useTheme } from "../context/ThemeContext";
import { HiArrowNarrowLeft, HiSun, HiMoon } from "react-icons/hi";
import { Link } from "react-router-dom";

// Clean, universally recognizable geometric path icons
const EarnPathIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current text-blue-600 dark:text-orange-400" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 50 C20 35, 35 20, 50 20 C65 20, 80 35, 80 50 C80 65, 65 80, 50 80" />
    <path d="M50 10 L65 20 L50 30" />
    <path d="M40 50 H60 M50 40 V60" />
  </svg>
);

const BuyPathIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current text-blue-600 dark:text-orange-400" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="20" y="30" width="60" height="50" rx="3" />
    <path d="M35 30 V20 C35 15, 65 15, 65 20 V30" />
    <circle cx="50" cy="55" r="6" />
  </svg>
);

export default function HowItWorks() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#111] text-black dark:text-white font-mono antialiased transition-colors duration-150">
      
      {/* 1. DOCUMENT UTILITY BAR */}
      <nav className="fixed top-0 w-full h-16 bg-white dark:bg-[#111] border-b-2 border-black dark:border-white z-50">
        <div className="max-w-screen-2xl mx-auto h-full flex items-center justify-between px-6 border-x-2 border-black dark:border-white">
          
          <Link 
            to="/" 
            className="h-full px-5 border-r-2 border-black dark:border-white flex items-center gap-2 text-xs font-bold uppercase bg-white dark:bg-[#111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-95 ml-[-24px]"
          >
            <HiArrowNarrowLeft className="w-4 h-4" /> 
            <span>[ Return Home ]</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={toggleTheme} 
              className="p-3 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-all active:scale-95"
            >
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>
            
            {/* NEW: Actionable Universal App Entry Button */}
            <button className="px-5 py-3 text-sm font-bold bg-white dark:bg-[#111] border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black uppercase transition-all active:scale-95">
              Enter App
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HEADER CONTAINER */}
      <header className="pt-40 pb-16 px-6 max-w-screen-2xl mx-auto border-x-2 border-black dark:border-white">
        <h1 className="font-sans text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
          The Token Economy
        </h1>
        <p className="mt-6 text-base md:text-lg text-black/70 dark:text-white/70 max-w-3xl leading-relaxed font-bold border-l-4 border-black dark:border-white pl-6">
          Skill Tokens (SKL) power every exchange on the platform. To keep our community moving fast, we offer two distinct ways to fill your wallet.
        </p>
      </header>

      {/* 3. DUAL SYSTEM EXPLANATION GRID */}
      <section className="border-t-2 border-black dark:border-white">
        <div className="max-w-screen-2xl mx-auto border-x-2 border-black dark:border-white">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* PATH A: THE FREEMIUM COMMUNITY LOOP */}
            <div className="p-10 border-b-2 md:border-b-0 border-r-0 md:border-r-2 border-black dark:border-white space-y-6 bg-slate-50/50 dark:bg-neutral-900/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 bg-blue-600 text-white dark:bg-orange-400 dark:text-black uppercase">Path 01 // Free</span>
                <EarnPathIcon />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Earn by Teaching</h3>
              <p className="text-sm text-black/70 dark:text-white/70 font-bold leading-relaxed">
                If you have skills but want to save cash, this is your default ecosystem loop. List your expertise, accept a booking from another member, and spend an hour sharing what you know. Once the session wraps up, <strong>1 Token (SKL)</strong> drops straight into your wallet. 
              </p>
              <ul className="text-xs font-bold space-y-2 text-black/60 dark:text-white/50 bg-white dark:bg-[#151515] p-4 border border-black dark:border-white/20">
                <li>• Best for: People looking to share hobbies & build networks</li>
                <li>• Cost: $0.00 (Only your time)</li>
                <li>• Limit: Unlimited earnings</li>
              </ul>
            </div>

            {/* PATH B: THE PREMIUM ACCELERATOR */}
            <div className="p-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black uppercase">Path 02 // Fast Track</span>
                <BuyPathIcon />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Buy Tokens Directly</h3>
              <p className="text-sm text-black/70 dark:text-white/70 font-bold leading-relaxed">
                Don't have time to teach right now but need to learn a skill immediately? Skip the line. You can buy Skill Tokens directly using standard credit cards or digital pay systems. This cash feeds back into the eco-system to fund server costs and reward community leaders.
              </p>
              <ul className="text-xs font-bold space-y-2 text-black/60 dark:text-white/50 bg-white dark:bg-[#151515] p-4 border border-black dark:border-white/20">
                <li>• Best for: Busy professionals needing instant advice</li>
                <li>• Delivery: Instant wallet allocation</li>
                <li>• Support: Includes session protection guarantees</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. THE ESCROW DETAILS SECTION */}
      <section className="border-t-2 border-black dark:border-white bg-slate-50 dark:bg-neutral-950/20">
        <div className="max-w-screen-2xl mx-auto border-x-2 border-black dark:border-white px-6 py-16">
          <h2 className="text-2xl font-black uppercase mb-4">🛡️ The Safe-Swap Guarantee</h2>
          <p className="text-sm text-black/70 dark:text-white/70 max-w-4xl font-bold leading-relaxed">
            Whether you earned your token or bought it with real cash, we protect your transaction. When you book a session, the token isn't handed over instantly. It sits securely in a <strong>temporary holding vault</strong>. Only when both you and your teacher click "Session Complete" is the token safely transferred. If a teacher doesn't show up, your token returns right back to your wallet.
          </p>
        </div>
      </section>

      {/* 5. REWRITTEN: PRICING STRATEGY FOR BEGINNERS */}
      <section className="border-y-2 border-black dark:border-white bg-white dark:bg-[#111]">
        <div className="max-w-screen-2xl mx-auto border-x-2 border-black dark:border-white px-6 py-16">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black uppercase">
              [ Platform Pricing ]
            </span>
            <h2 className="text-3xl font-black uppercase mt-4">Flexible Entry Packages</h2>
            <p className="text-sm font-bold text-black/60 dark:text-white/60 mt-2 max-w-lg mx-auto">
              You are never forced to pay. Earn your way through the community by sharing your own skills, or buy a starter package to book your very first lesson instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Tier 1 - Re-framed as a test/trial */}
            <div className="border-2 border-black dark:border-white bg-white dark:bg-[#111] p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <div>
                <span className="text-xs font-bold uppercase text-black/40 dark:text-white/40">[ The Trial ]</span>
                <h4 className="text-2xl font-black uppercase mt-2">1 Skill Token</h4>
                <p className="text-xs font-bold text-black/60 dark:text-white/60 mt-4">Test the waters. Ideal for booking a single casual conversation or testing a specific mentor.</p>
              </div>
              <div className="mt-8">
                <div className="text-3xl font-black mb-4">$3<span className="text-sm font-bold text-black/40 dark:text-white/40"> / single</span></div>
                <button className="w-full py-2.5 bg-slate-100 dark:bg-neutral-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold uppercase text-xs border border-black dark:border-white transition-all">Select Path</button>
              </div>
            </div>

            {/* Tier 2 - Re-framed as the default learner pack */}
            <div className="border-2 border-black dark:border-white bg-white dark:bg-[#111] p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white dark:bg-orange-400 dark:text-black font-bold text-[9px] uppercase px-2 py-1 border-b border-l border-black dark:border-white">Best Starter</div>
              <div>
                <span className="text-xs font-bold uppercase text-black/40 dark:text-white/40">[ Learner Pack ]</span>
                <h4 className="text-2xl font-black uppercase mt-2">5 Skill Tokens</h4>
                <p className="text-xs font-bold text-black/60 dark:text-white/60 mt-4">Our recommended path. Gives you enough credits to try out a couple of different topics or languages.</p>
              </div>
              <div className="mt-8">
                <div className="text-3xl font-black mb-4">$10<span className="text-sm font-bold text-black/40 dark:text-white/40"> / save 33%</span></div>
                <button className="w-full py-2.5 bg-black text-white dark:bg-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white font-bold uppercase text-xs border border-black dark:border-white transition-all">Select Path</button>
              </div>
            </div>

            {/* Tier 3 - Re-framed as a deep dive */}
            <div className="border-2 border-black dark:border-white bg-white dark:bg-[#111] p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <div>
                <span className="text-xs font-bold uppercase text-black/40 dark:text-white/40">[ Deep Dive Bundle ]</span>
                <h4 className="text-2xl font-black uppercase mt-2">12 Skill Tokens</h4>
                <p className="text-xs font-bold text-black/60 dark:text-white/60 mt-4">Skip the trading system entirely for a while. Perfect for mastering an entire skill curriculum.</p>
              </div>
              <div className="mt-8">
                <div className="text-3xl font-black mb-4">$20<span className="text-sm font-bold text-black/40 dark:text-white/40"> / best value</span></div>
                <button className="w-full py-2.5 bg-slate-100 dark:bg-neutral-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold uppercase text-xs border border-black dark:border-white transition-all">Select Path</button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}