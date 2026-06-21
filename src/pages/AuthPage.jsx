import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { HiSun, HiMoon, HiArrowNarrowLeft, HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

// Shared container style with your single vibrant shadow color
const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#151515] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";

export default function AuthPage() {
  const { isDark, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#111] text-black dark:text-white font-mono antialiased transition-colors duration-150 flex flex-col justify-between">
      
      {/* NAVIGATION HEADER */}
      <nav className="w-full h-16 bg-white dark:bg-[#111] border-b-4 border-black dark:border-white z-50">
        <div className="max-w-screen-2xl mx-auto h-full flex items-center justify-between px-6">
          <Link to="/" className="h-full px-4 flex items-center gap-2 text-xs font-bold uppercase hover:text-indigo-600 dark:hover:text-orange-400 transition-colors ml-[-16px]">
            <HiArrowNarrowLeft className="w-4 h-4" />
            <span>Exit</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-indigo-600 dark:bg-orange-400 rounded-md border-2 border-black" />
            <span className="text-xs font-black tracking-tighter uppercase hidden sm:inline">Skill Swap</span>
          </div>

          <button onClick={toggleTheme} className="p-3 text-neutral-500 hover:text-black dark:hover:text-white transition-colors mr-[-16px]">
            {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* CORE SPLIT SCREEN LAYOUT */}
      <main className="flex-grow max-w-screen-2xl w-full mx-auto border-x-4 border-transparent lg:border-black lg:dark:border-white grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* BRAND PROMO BLOCK */}
        <div className="lg:col-span-5 border-b-4 lg:border-b-0 lg:border-r-4 border-black dark:border-white p-8 md:p-12 flex flex-col justify-between bg-slate-50/50 dark:bg-neutral-950/10 select-none">
          <div>
            <h2 className="font-sans text-4xl font-black tracking-tighter uppercase leading-none mt-4">
              Join the <br />
              Knowledge <br />
              Collective.
            </h2>
          </div>

          <div className="mt-8 border-l-4 border-black dark:border-white pl-4 text-xs font-bold text-black/70 dark:text-white/70 space-y-3">
            <p>✔ Real people trading real skills and experiences.</p>
            <p>✔ Earn tokens by mentoring, or speed up your learning path.</p>
            <p>✔ Pure person-to-person connection. No hidden middleman.</p>
          </div>
        </div>

        {/* INPUT INTERACTIVE DISPLAY */}
        <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-12">
          <div className={`w-full max-w-md p-6 md:p-8 ${SHARED_CARD_STYLE}`}>
            
            {/* SUB-TAB TOGGLE COMPONENT */}
            <div className="grid grid-cols-2 bg-slate-100 dark:bg-neutral-900 p-1 border-2 border-black rounded-xl mb-6 text-center text-xs font-bold uppercase">
              <button onClick={() => setIsLogin(false)} className={`py-2.5 rounded-lg transition-all ${!isLogin ? "bg-black text-white dark:bg-white dark:text-black" : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"}`}>
                Register
              </button>
              <button onClick={() => setIsLogin(true)} className={`py-2.5 rounded-lg transition-all ${isLogin ? "bg-black text-white dark:bg-white dark:text-black" : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"}`}>
                Log In
              </button>
            </div>

            {/* INTERACTIVE TEXT FORM */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLogin ? "max-h-0 opacity-0 pointer-events-none mb-0" : "max-h-24 opacity-100 space-y-1.5"}`}>
                <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-neutral-400 block">Display Name</label>
                <div className="relative border-2 border-black dark:border-white bg-white dark:bg-[#111] h-11 rounded-xl flex items-center overflow-hidden focus-within:border-indigo-500 dark:focus-within:border-orange-400 transition-colors">
                  <span className="px-3 border-r-2 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
                    <HiUser className="w-4 h-4 text-slate-400" />
                  </span>
                  <input type="text" placeholder="e.g. Alex_Baker" className="w-full h-full px-3 text-xs bg-transparent outline-none font-bold placeholder-black/30 dark:placeholder-white/20" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-neutral-400 block">Email Address</label>
                <div className="relative border-2 border-black dark:border-white bg-white dark:bg-[#111] h-11 rounded-xl flex items-center overflow-hidden focus-within:border-indigo-500 dark:focus-within:border-orange-400 transition-colors">
                  <span className="px-3 border-r-2 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
                    <HiMail className="w-4 h-4 text-slate-400" />
                  </span>
                  <input type="email" placeholder="you@domain.com" className="w-full h-full px-3 text-xs bg-transparent outline-none font-bold placeholder-black/30 dark:placeholder-white/20" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center h-4">
                  <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-neutral-400 block">Password</label>
                  <a href="#forgot" className={`text-[10px] font-bold text-indigo-600 dark:text-orange-400 uppercase hover:underline transition-all ${isLogin ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    Forgot?
                  </a>
                </div>
                <div className="relative border-2 border-black dark:border-white bg-white dark:bg-[#111] h-11 rounded-xl flex items-center overflow-hidden focus-within:border-indigo-500 dark:focus-within:border-orange-400 transition-colors">
                  <span className="px-3 border-r-2 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
                    <HiLockClosed className="w-4 h-4 text-slate-400" />
                  </span>
                  <input type="password" placeholder="••••••••" className="w-full h-full px-3 text-xs bg-transparent outline-none font-bold placeholder-black/30 dark:placeholder-white/20" />
                </div>
              </div>

              <button type="submit" className="w-full h-12 bg-black text-white dark:bg-white dark:text-black font-bold uppercase text-xs rounded-xl border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#4f46e5] dark:shadow-[4px_4px_0px_0px_#f97316] active:translate-x-0.5 active:translate-y-0.5 transition-all mt-4 tracking-wider">
                {isLogin ? "Authorize Login →" : "Register Credentials →"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full h-12 border-t-4 border-black dark:border-white flex items-center justify-center text-[10px] font-bold uppercase tracking-wide text-slate-400">
        © 2026 Skill Swap
      </footer>
    </div>
  );
}