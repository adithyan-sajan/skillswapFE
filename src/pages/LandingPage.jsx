import React from "react";
import { useTheme } from "../context/ThemeContext";
// Removed HiSun and HiMoon from the import array entirely!
import { HiSearch, HiFilter, HiArrowRight, HiTranslate, HiColorSwatch, HiSpeakerphone, HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";

// Hard-edged geometric theme icons to avoid react-icons version mismatching
const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="square">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Simple, universally recognizable geometric feature icons
const TokenIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current text-blue-600 dark:text-orange-400" fill="none" strokeWidth="6">
    <circle cx="50" cy="50" r="35" />
    <circle cx="50" cy="50" r="18" strokeDasharray="6 4" />
  </svg>
);
const SwapIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current text-blue-600 dark:text-orange-400" fill="none" strokeWidth="6">
    <rect x="15" y="15" width="70" height="70" rx="4" />
    <path d="M35 50 H65 M55 40 L65 50 L55 60" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TrustIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-current text-blue-600 dark:text-orange-400" fill="none" strokeWidth="6">
    <circle cx="50" cy="50" r="45" />
    <path d="M35 52 L45 62 L65 42" strokeLinecap="round" strokeLinejoin="round" />
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
            <button onClick={toggleTheme} className="p-3 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-all active:scale-95 flex items-center justify-center">
              {/* Using our ultra-safe inline SVGs here */}
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link to="/auth" className="px-5 py-3 text-sm font-bold bg-white dark:bg-[#111] border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black uppercase transition-all active:scale-95 block">
              Login / Register
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-40 pb-20 px-6 max-w-screen-2xl mx-auto border-x-2 border-black dark:border-white">
        <div className="flex items-center gap-3 mb-10 text-xs font-bold uppercase">
          <div className="h-1 w-20 bg-blue-600 dark:bg-orange-400" />A Cash-Free Knowledge Community
        </div>

        <h1 className="font-sans text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] uppercase">
          <span className="text-blue-600 dark:text-orange-400">Knowledge</span> is <br />
          <span className="text-blue-600 dark:text-orange-400">Capital</span>. <br />
          Trade accordingly.
        </h1>

        <p className="mt-12 text-lg md:text-2xl text-black/80 dark:text-white/80 max-w-3xl font-bold leading-snug border-l-4 border-black dark:border-white pl-6">The fair-trade skill network. Teach something you love to earn Skill Tokens (SKL). Spend your tokens to learn something brand new from someone else.</p>

        {/* Buttons inverted styling, position, and text updated */}
        <div className="mt-14 flex flex-col sm:flex-row items-center gap-0 border-2 border-black dark:border-white w-full max-w-md">
          {/* Left Button: "How It Works" with dark theme styling */}
          <Link to="/protocol" className="w-full sm:w-1/2 px-8 py-5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-sm border-b-2 sm:border-b-0 sm:border-r-2 border-black dark:border-white hover:bg-black/80 dark:hover:bg-white/80 transition-all text-center block">
            How It Works
          </Link>

          {/* Right Button: "Get Started" with light theme styling and the dynamic arrow tracking element */}
          <Link to="/auth" className="w-full sm:w-1/2 px-8 py-5 bg-white dark:bg-black text-black dark:text-white font-bold uppercase text-sm hover:bg-slate-100 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2 text-center">
            Get Started <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* THE THREE-STEP RULES GRID */}
      <section id="exchange" className="border-t-2 border-black dark:border-white">
        <div className="max-w-screen-2xl mx-auto px-6 border-x-2 border-black dark:border-white">
          <div className="pt-16 pb-8">
            <h2 className="text-3xl font-black tracking-tight uppercase">The core cycle</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-black dark:border-white">
            <div className="border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black dark:border-white p-10 flex flex-col items-start gap-6 group hover:bg-blue-600/5 dark:hover:bg-orange-400/5 transition-colors">
              <TokenIcon />
              <h3 className="text-2xl font-bold uppercase tracking-tight">[ 01 ] Teach & Earn</h3>
              <p className="text-black/80 dark:text-white/80 font-bold text-base leading-relaxed">Share what you are good at through quick 1-on-1 conversations or group classes to pull custom Skill Tokens directly into your balance.</p>
              <div className="h-1 w-10 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
            </div>

            <div className="border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black dark:border-white p-10 flex flex-col items-start gap-6 group hover:bg-blue-600/5 dark:hover:bg-orange-400/5 transition-colors">
              <SwapIcon />
              <h3 className="text-2xl font-bold uppercase tracking-tight">[ 02 ] Spend & Learn</h3>
              <p className="text-black/80 dark:text-white/80 font-bold text-base leading-relaxed">Redeem your collected tokens to book time with other community experts. Instantly learn languages, digital design, or new methods.</p>
              <div className="h-1 w-10 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
            </div>

            <div className="p-10 flex flex-col items-start gap-6 group hover:bg-blue-600/5 dark:hover:bg-orange-400/5 transition-colors">
              <TrustIcon />
              <h3 className="text-2xl font-bold uppercase tracking-tight">[ 03 ] Direct Exchange</h3>
              <p className="text-black/80 dark:text-white/80 font-bold text-base leading-relaxed">No subscription services, no algorithmic paywalls, and absolutely no bank fees. Just humans trading pure mental experience directly.</p>
              <div className="h-1 w-10 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* RELEVANT CATEGORIES EXPLORER */}
      <section id="categories" className="border-y-2 border-black dark:border-white bg-slate-50 dark:bg-neutral-950/20">
        <div className="max-w-screen-2xl mx-auto px-6 border-x-2 border-black dark:border-white py-16">
          <div className="pb-8">
            <h2 className="text-3xl font-black tracking-tight uppercase">What will you trade today?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <div className="bg-white dark:bg-[#111] border-2 border-black dark:border-white p-6 hover:-translate-y-1 hover:translate-x-1 transition-transform duration-150 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <HiTranslate className="w-8 h-8 text-blue-600 dark:text-orange-400 mb-4" />
              <h4 className="text-lg font-bold uppercase mb-2">Languages</h4>
              <p className="text-xs text-black/60 dark:text-white/60 font-bold">Trade fluent conversation practice in French, Spanish, Japanese, or Arabic.</p>
            </div>

            {/* Category 2 */}
            <div className="bg-white dark:bg-[#111] border-2 border-black dark:border-white p-6 hover:-translate-y-1 hover:translate-x-1 transition-transform duration-150 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <HiColorSwatch className="w-8 h-8 text-blue-600 dark:text-orange-400 mb-4" />
              <h4 className="text-lg font-bold uppercase mb-2">Arts & Creative</h4>
              <p className="text-xs text-black/60 dark:text-white/60 font-bold">Exchange lessons on video editing, digital painting, photography, or pastry baking.</p>
            </div>

            {/* Category 3 */}
            <div className="bg-white dark:bg-[#111] border-2 border-black dark:border-white p-6 hover:-translate-y-1 hover:translate-x-1 transition-transform duration-150 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <HiSpeakerphone className="w-8 h-8 text-blue-600 dark:text-orange-400 mb-4" />
              <h4 className="text-lg font-bold uppercase mb-2">Business & Growth</h4>
              <p className="text-xs text-black/60 dark:text-white/60 font-bold">Swap secrets on podcast production, social media strategy, copywriting, or pitching.</p>
            </div>

            {/* Category 4 */}
            <div className="bg-white dark:bg-[#111] border-2 border-black dark:border-white p-6 hover:-translate-y-1 hover:translate-x-1 transition-transform duration-150 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <HiAcademicCap className="w-8 h-8 text-blue-600 dark:text-orange-400 mb-4" />
              <h4 className="text-lg font-bold uppercase mb-2">Academic & Tech</h4>
              <p className="text-xs text-black/60 dark:text-white/60 font-bold">Share fundamentals of data structures, algebra tutoring, essay editing, or research math.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}