import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiSun, HiMoon, HiArrowNarrowLeft, HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import { PRESS_ANIMATION } from "./HowItWorks";

// 1. IMPORT YOUR NEW API AGENT
import { registerUser } from "../services/AllApi";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#151515] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";

export default function AuthPage() {
  const { isDark, toggleTheme } = useTheme();
  const { login } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLogin, setIsLogin] = useState(false);
  
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        // 2. USE THE CLEAN AXIOS SERVICE
        await registerUser(formData);
        
        // After successful registration, log them in instantly
        await login(formData.email, formData.password);
      }

      // If successful, send them to the dashboard (or back to where they tried to go)
      const origin = location.state?.from?.pathname || '/dashboard/deck';
      navigate(origin, { replace: true });

    } catch (err) {
      // 3. HANDLE AXIOS ERRORS CORRECTLY
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

          <button onClick={toggleTheme} className={`p-2.5 border-2 border-black dark:border-white rounded-xl bg-white dark:bg-[#111] hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all flex items-center justify-center text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
            {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* CORE SPLIT SCREEN LAYOUT */}
      <main className="flex-grow max-w-screen-2xl w-full mx-auto border-x-4 border-transparent lg:border-black lg:dark:border-white grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* BRAND PROMO BLOCK */}
        <div className="lg:col-span-5 border-b-4 lg:border-b-0 lg:border-r-4 border-black dark:border-white p-8 md:p-12 flex flex-col justify-between bg-slate-50/50 dark:bg-neutral-950/10 select-none">
          <div>
            <h2 className="font-sans text-4xl font-black tracking-tighter uppercase leading-none mt-4">
              Join the <br />Knowledge <br />Collective.
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
            
            <div className="grid grid-cols-2 bg-slate-100 dark:bg-neutral-900 p-1 border-2 border-black rounded-xl mb-6 text-center text-xs font-bold uppercase">
              <button onClick={() => { setIsLogin(false); setError(''); }} className={`py-2.5 rounded-lg transition-all ${!isLogin ? "bg-black text-white dark:bg-white dark:text-black" : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"}`}>
                Register
              </button>
              <button onClick={() => { setIsLogin(true); setError(''); }} className={`py-2.5 rounded-lg transition-all ${isLogin ? "bg-black text-white dark:bg-white dark:text-black" : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"}`}>
                Log In
              </button>
            </div>

            {/* ERROR DISPLAY */}
            {error && (
              <div className="mb-4 p-3 bg-rose-500/10 border-2 border-rose-500 text-rose-500 text-xs font-bold uppercase rounded-lg text-center">
                ⚠ {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLogin ? "max-h-0 opacity-0 pointer-events-none mb-0" : "max-h-24 opacity-100 space-y-1.5"}`}>
                <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-neutral-400 block">Display Name</label>
                <div className="relative border-2 border-black dark:border-white bg-white dark:bg-[#111] h-11 rounded-xl flex items-center overflow-hidden focus-within:border-indigo-500 dark:focus-within:border-orange-400 transition-colors">
                  <span className="px-3 border-r-2 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
                    <HiUser className="w-4 h-4 text-slate-400" />
                  </span>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} required={!isLogin} placeholder="e.g. Alex_Baker" className="w-full h-full px-3 text-xs bg-transparent outline-none font-bold placeholder-black/30 dark:placeholder-white/20" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-neutral-400 block">Email Address</label>
                <div className="relative border-2 border-black dark:border-white bg-white dark:bg-[#111] h-11 rounded-xl flex items-center overflow-hidden focus-within:border-indigo-500 dark:focus-within:border-orange-400 transition-colors">
                  <span className="px-3 border-r-2 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
                    <HiMail className="w-4 h-4 text-slate-400" />
                  </span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@domain.com" className="w-full h-full px-3 text-xs bg-transparent outline-none font-bold placeholder-black/30 dark:placeholder-white/20" />
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
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className="w-full h-full px-3 text-xs bg-transparent outline-none font-bold placeholder-black/30 dark:placeholder-white/20" />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full h-12 bg-black text-white dark:bg-white dark:text-black font-bold uppercase text-xs rounded-xl border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#4f46e5] dark:shadow-[4px_4px_0px_0px_#f97316] active:translate-x-0.5 active:translate-y-0.5 transition-all mt-4 tracking-wider disabled:opacity-50">
                {isLoading ? "Processing..." : isLogin ? "Authorize Login →" : "Register Credentials →"}
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