import React from "react";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="w-full border-t-4 border-black dark:border-white bg-white dark:bg-[#111] relative z-10 font-mono">
      <div className="max-w-screen-2xl mx-auto border-x-4 border-black dark:border-white grid grid-cols-1 md:grid-cols-12 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black dark:divide-white">
        
        {/* BRAND STATEMENT */}
        <div className="p-8 md:col-span-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-indigo-600 dark:bg-orange-400 border-2 border-black dark:border-white rounded-sm" />
            <span className="text-sm font-black uppercase tracking-tight">Skill Swap</span>
          </div>
          <p className="text-xs font-bold text-black/60 dark:text-white/60 leading-relaxed max-w-xs uppercase">
            A community-driven marketplace where knowledge is the currency. Teach what you know, learn what you don't.
          </p>
        </div>

        {/* QUICK NAVIGATION */}
        <div className="p-8 md:col-span-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-black/40 dark:text-white/40">Explore</span>
            <ul className="space-y-1.5 text-xs font-black uppercase">
              <li><Link to="/protocol" className="hover:underline">How It Works</Link></li>
              <li><Link to="/auth" className="hover:underline">Browse Skills</Link></li>
              <li><Link to="/auth" className="hover:underline">Join Now</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-black/40 dark:text-white/40">Support</span>
            <ul className="space-y-1.5 text-xs font-black uppercase">
              <li><Link to="/help" className="hover:underline">Help Center</Link></li>
              <li><Link to="/guidelines" className="hover:underline">Guidelines</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER / ACTION */}
        <div className="p-8 md:col-span-4 flex flex-col justify-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-black/40 dark:text-white/40 mb-2 block">Stay Updated</span>
          <form onSubmit={(e) => e.preventDefault()} className="flex border-2 border-black dark:border-white rounded-lg overflow-hidden">
            <input 
              type="email" 
              placeholder="ENTER EMAIL" 
              className="w-full bg-slate-50 dark:bg-neutral-950 px-3 py-2 text-xs font-bold uppercase outline-none"
            />
            <button className="bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs px-4 border-l-2 border-black dark:border-white hover:opacity-80 transition-all">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* LOWER BOTTOM STRIP */}
      <div className="w-full border-t-4 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black py-4 px-6 flex flex-col sm:flex-row justify-between gap-2 text-[10px] font-black uppercase tracking-wider">
        <div>© 2026 SKILL SWAP. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-4">
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}