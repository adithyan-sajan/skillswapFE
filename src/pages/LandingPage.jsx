import React from "react";
import { useTheme } from "../context/ThemeContext";
import { HiArrowRight, HiTranslate, HiColorSwatch, HiSpeakerphone, HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import TextType from "../component/TextType";
import DotGrid from "../component/DotGrid";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const TokenIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" strokeDasharray="2 2" />
  </svg>
);

const SwapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 12h10M13 8l4 4-4 4" />
  </svg>
);

const TrustIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#111] text-black dark:text-white font-mono antialiased transition-colors duration-150 flex flex-col relative">
      
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor={isDark ? "#222222" : "#E2E8F0"}
          activeColor={isDark ? "#F97316" : "#4F46E5"}
          proximity={120}
          shockRadius={220}
          shockStrength={5}
          resistance={700}
          returnDuration={1.4}
        />
      </div>

      {/* HEADER */}
      <nav className="fixed top-0 w-full h-16 bg-white/90 dark:bg-[#111]/90 backdrop-blur-md border-b-4 border-black dark:border-white z-50">
        <div className="max-w-screen-2xl mx-auto h-full flex items-center justify-between px-6 border-x-4 border-black dark:border-white">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-indigo-600 dark:bg-orange-400 border-2 border-black dark:border-white rounded-sm" />
            <span className="text-base font-black tracking-tighter uppercase">Skill Swap</span>
          </div>

          <div className="flex items-center gap-3 relative z-50">
            <button onClick={toggleTheme} className="p-2.5 border-2 border-black dark:border-white rounded-xl bg-white dark:bg-[#111] hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all flex items-center justify-center text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link to="/auth" className="px-4 py-2 text-xs font-black border-2 border-black dark:border-white rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="w-full relative z-10 border-b-4 border-black dark:border-white bg-transparent">
        <header className="max-w-screen-2xl mx-auto border-x-4 border-black dark:border-white pt-40 pb-24 px-6 relative">
          


          <div className="flex items-center gap-3 mb-8 text-[11px] font-black uppercase tracking-wider text-black/50 dark:text-white/50">
            <div className="h-[4px] w-12 bg-indigo-600 dark:bg-orange-400 border border-black dark:border-white" />
            A Cashless Knowledge Community
          </div>

          {/* DYNAMIC TYPOGRAPHY */}
          <div className="mb-6">
            <h1 className="font-sans text-4xl md:text-7xl font-black tracking-tight leading-[1.05] uppercase text-black dark:text-white block">
              <TextType 
                text={["Knowledge is Capital", "Exchange what you know", "Learn brand new skills"]} 
                typingSpeed={75} 
                pauseDuration={1500} 
                showCursor 
                cursorCharacter="_" 
                deletingSpeed={50} 
                variableSpeedEnabled={false} 
                cursorBlinkDuration={0.5} 
              />
            </h1>
            <h2 className="font-sans text-4xl md:text-7xl font-black tracking-tight leading-[1.05] uppercase text-black dark:text-white">
              AT <span className="text-indigo-600 dark:text-orange-400">SKILLSWAP</span>
            </h2>
          </div>

          <p className=" text-sm md:text-lg text-black/80 dark:text-white/80 max-w-2xl font-black leading-relaxed border-l-4 border-black dark:border-white pl-5 bg-white/90 dark:bg-[#111]/90 backdrop-blur-sm p-2 rounded-r-lg inline-block">
            The fair trade network. Teach something you love to earn Skill Tokens. Spend your tokens to learn something brand new from your peers.
          </p>

          <div className="mt-10 p-2 rounded-xl flex flex-col sm:flex-row items-center gap-3 max-w-md border-4 border-black dark:border-white bg-white dark:bg-[#111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <Link to="/protocol" className="w-full sm:w-1/2 px-4 py-3 bg-white dark:bg-neutral-800 text-black dark:text-white font-black uppercase text-xs rounded-xl border-2 border-black dark:border-white text-center hover:bg-slate-100 transition-all">
              How It Works
            </Link>
            <Link to="/auth" className="w-full sm:w-1/2 px-4 py-3 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs rounded-xl border-2 border-black dark:border-white hover:opacity-90 transition-all flex items-center justify-center gap-1.5 text-center">
              Enter App <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>
      </div>

      {/* CORE CYCLE */}
      <section id="exchange" className="w-full relative z-10 bg-white/40 dark:bg-[#111]/40 backdrop-blur-[2px]">
        <div className="max-w-screen-2xl mx-auto border-x-4 border-black dark:border-white">
          <div className="pt-16 pb-8 px-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-black dark:text-white">The Core Cycle</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t-4 border-black dark:border-white divide-y-4 md:divide-y-0 md:divide-x-4 divide-black dark:divide-white bg-white/80 dark:bg-[#111]/80">
            <div className="py-10 px-6 flex flex-col items-start gap-4 group">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2.5 bg-slate-50 dark:bg-neutral-900 rounded-xl border-2 border-black dark:border-white flex-shrink-0">
                  <TokenIcon />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Teach and Earn</h3>
              </div>
              <p className="text-xs text-black/60 dark:text-white/60 font-bold leading-relaxed">Share what you are good at through quick interactive conversations or group sessions to build up your token balance directly.</p>
            </div>

            <div className="py-10 px-6 flex flex-col items-start gap-4 group">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2.5 bg-slate-50 dark:bg-neutral-900 rounded-xl border-2 border-black dark:border-white flex-shrink-0">
                  <SwapIcon />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Spend and Learn</h3>
              </div>
              <p className="text-xs text-black/60 dark:text-white/60 font-bold leading-relaxed">Redeem your collected tokens to book time with other experts. Instantly study languages, digital design, or strategic skills.</p>
            </div>

            <div className="py-10 px-6 flex flex-col items-start gap-4 group">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2.5 bg-slate-50 dark:bg-neutral-900 rounded-xl border-2 border-black dark:border-white flex-shrink-0">
                  <TrustIcon />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Direct Exchange</h3>
              </div>
              <p className="text-xs text-black/60 dark:text-white/60 font-bold leading-relaxed">No complex subscriptions, no dynamic paywalls, and absolutely no transaction fees. Just direct exchange between group members.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="w-full border-t-4 border-black dark:border-white bg-slate-50/40 dark:bg-neutral-950/10 backdrop-blur-[2px] flex-grow flex flex-col relative z-10">
        <div className="max-w-screen-2xl mx-auto border-x-4 border-black dark:border-white flex-grow w-full pb-16">
          <div className="pt-16 pb-8 px-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-black dark:text-white">What will you trade today?</h2>
          </div>

          <div className="px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: HiTranslate, label: "Languages", desc: "Trade fluent conversation practice in French, Spanish, Japanese, or Arabic." },
                { icon: HiColorSwatch, label: "Arts and Creative", desc: "Exchange lessons on video editing, digital painting, photography, or pastry baking." },
                { icon: HiSpeakerphone, label: "Business and Growth", desc: "Swap secrets on podcast production, social media strategy, copywriting, or pitching." },
                { icon: HiAcademicCap, label: "Academic and Tech", desc: "Share fundamentals of data structures, algebra tutoring, essay editing, or research math." },
              ].map((cat, idx) => (
                <div key={idx} className={`p-5 transition-transform duration-150 ${SHARED_CARD_STYLE}`}>
                  <cat.icon className="w-6 h-6 text-indigo-600 dark:text-orange-400 mb-3" />
                  <h4 className="text-sm font-black uppercase mb-1">{cat.label}</h4>
                  <p className="text-[11px] text-black/60 dark:text-white/50 font-bold leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}