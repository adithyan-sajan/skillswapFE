import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { HiSun, HiMoon, HiArrowNarrowLeft, HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const { isDark, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(false); // Toggle between login and register

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#111] text-black dark:text-white font-mono antialiased transition-colors duration-150 flex flex-col justify-between">
      {/* 1. TOP NAV BAR */}
      <nav className="w-full h-16 bg-white dark:bg-[#111] border-b-2 border-black dark:border-white z-50">
        <div className="max-w-screen-2xl mx-auto h-full flex items-center justify-between px-6 border-x-2 border-black dark:border-white">
          <Link to="/" className="h-full px-5 border-r-2 border-black dark:border-white flex items-center gap-2 text-xs font-bold uppercase bg-white dark:bg-[#111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-95 ml-[-24px]">
            <HiArrowNarrowLeft className="w-4 h-4" />
            <span>[ Exit ]</span>
          </Link>

          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-blue-600 dark:bg-orange-400" />
            <span className="text-sm font-bold tracking-tighter uppercase hidden sm:inline">Skill//Swap</span>
          </div>

          <button onClick={toggleTheme} className="p-3 border-l-2 border-black dark:border-white h-full bg-white dark:bg-[#111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all mr-[-24px]">
            {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* 2. MAIN SPLIT INTERFACE */}
      <main className="flex-grow max-w-screen-2xl w-full mx-auto border-x-2 border-black dark:border-white grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* LEFT BRAND PANEL */}
        <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-black dark:border-white p-8 md:p-12 flex flex-col justify-between bg-slate-50 dark:bg-neutral-950/20 select-none">
          <div>
            <h2 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tighter uppercase leading-none mt-4">
              Join the <br />
              Knowledge <br />
              Collective.
            </h2>
          </div>

          <div className="mt-8 border-l-4 border-black dark:border-white pl-4 text-xs font-bold text-black/60 dark:text-white/60 space-y-2">
            <p>✔ Real people trading real hobbies and experiences.</p>
            <p>✔ Earn tokens by mentoring, or fast-track your learning path.</p>
            <p>✔ Pure P2P interaction. Zero subscription middlemen.</p>
          </div>
        </div>

        {/* RIGHT INTERACTIVE FORM CONTAINER */}
        <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md border-4 border-black dark:border-white bg-white dark:bg-[#151515] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            {/* SUB-NAV COMPONENT */}
            <div className="grid grid-cols-2 border-2 border-black dark:border-white mb-8 text-center text-xs font-bold uppercase">
              <button onClick={() => setIsLogin(false)} className={`py-3 transition-all duration-200 ${!isLogin ? "bg-black text-white dark:bg-white dark:text-black" : "bg-transparent hover:bg-slate-100 dark:hover:bg-neutral-900"}`}>
                Create Account
              </button>
              <button onClick={() => setIsLogin(true)} className={`py-3 border-l-2 border-black dark:border-white transition-all duration-200 ${isLogin ? "bg-black text-white dark:bg-white dark:text-black" : "bg-transparent hover:bg-slate-100 dark:hover:bg-neutral-900"}`}>
                Log In
              </button>
            </div>

            {/* THE FORM ACCELERATOR */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              
              {/* SMOOTH TRANSITION CONTAINER FOR DISPLAY NAME */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isLogin 
                    ? "max-h-0 opacity-0 pointer-events-none mb-0 space-y-0" 
                    : "max-h-24 opacity-100 space-y-2 mb-5"
                }`}
              >
                <label className="text-xs font-black uppercase block">[ Display Name ]</label>
                <div className="relative border-2 border-black dark:border-white bg-white dark:bg-[#111] h-12 flex items-center">
                  <span className="px-3 border-r-2 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
                    <HiUser className="w-4 h-4 text-black/50 dark:text-white/50" />
                  </span>
                  <input type="text" placeholder="e.g. Alex_Baker" className="w-full h-full px-3 text-sm bg-transparent outline-none font-bold placeholder-black/40 dark:placeholder-white/40" />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase block">[ Email Address ]</label>
                <div className="relative border-2 border-black dark:border-white bg-white dark:bg-[#111] h-12 flex items-center">
                  <span className="px-3 border-r-2 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
                    <HiMail className="w-4 h-4 text-black/50 dark:text-white/50" />
                  </span>
                  <input type="email" placeholder="you@domain.com" className="w-full h-full px-3 text-sm bg-transparent outline-none font-bold placeholder-black/40 dark:placeholder-white/40" />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center h-4">
                  <label className="text-xs font-black uppercase block">[ Password ]</label>
                  {/* Smooth crossfade for "Forgot?" link */}
                  <a 
                    href="#forgot" 
                    className={`text-[10px] font-bold text-blue-600 dark:text-orange-400 uppercase hover:underline transition-all duration-200 ${
                      isLogin ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative border-2 border-black dark:border-white bg-white dark:bg-[#111] h-12 flex items-center">
                  <span className="px-3 border-r-2 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
                    <HiLockClosed className="w-4 h-4 text-black/50 dark:text-white/50" />
                  </span>
                  <input type="password" placeholder="••••••••" className="w-full h-full px-3 text-sm bg-transparent outline-none font-bold placeholder-black/40 dark:placeholder-white/40" />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full h-14 bg-blue-600 text-white dark:bg-orange-400 dark:text-black font-black uppercase text-sm border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 mt-4">
                {isLogin ? "Authorize Login →" : "Register Wallet & Account →"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* 3. TINY FOOTER */}
      <footer className="w-full h-12 border-t-2 border-black dark:border-white flex items-center justify-center text-[10px] font-bold uppercase tracking-tight text-black/50 dark:text-white/50">
        © 2026 Skill//Swap
      </footer>
    </div>
  );
}