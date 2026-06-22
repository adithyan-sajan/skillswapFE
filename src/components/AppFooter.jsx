import React from "react";
import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <footer className="w-full mt-auto border-t-2 border-dashed border-black/20 dark:border-white/20 pt-6 pb-2 font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 text-[10px] font-black uppercase tracking-wider text-black/50 dark:text-white/40">
        
        {/* SIMPLE BRAND LINK / TAG */}
        <div>
          <Link to="/dashboard/deck" className="hover:text-black dark:hover:text-white transition-colors">
            SKILL SWAP USER PORTAL
          </Link>
        </div>

        {/* USEFUL HELPFUL NAVIGATION */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard/guide" className="hover:text-black dark:hover:text-white underline underline-offset-2">User Guide</Link>
          <Link to="/dashboard/bug-report" className="hover:text-black dark:hover:text-white underline underline-offset-2">Report a Bug</Link>
          <Link to="/dashboard/support" className="hover:text-black dark:hover:text-white underline underline-offset-2">Support Ticket</Link>
        </div>
      </div>
    </footer>
  );
}