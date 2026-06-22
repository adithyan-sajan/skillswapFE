import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

const ADMIN_LINKS = [
  { id: "overview", label: "Overview", path: "/admin" },
  { id: "ledger", label: "User Ledger", path: "/admin/ledger" },
  { id: "vault", label: "The Vault", path: "/admin/vault" },
  { id: "listings", label: "Active Listings", path: "/admin/listings" }, // <-- Updated here!
  { id: "disputes", label: "Disputes", path: "/admin/disputes" },
];

export default function AdminNav() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  // Default to overview if exact path doesn't match
  const currentPath = location.pathname;

  return (
    <header className="w-full bg-white dark:bg-[#111] border-b-4 border-black dark:border-white px-6 h-20 flex items-center justify-between sticky top-0 z-50">
      {/* 1. BRANDING */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 bg-black dark:bg-white rounded-md border-2 border-black dark:border-white flex items-center justify-center">
          <span className="text-white dark:text-black text-[10px] font-black">A</span>
        </div>
        <h1 className="text-xl font-black tracking-tighter uppercase whitespace-nowrap hidden sm:block">Admin Dashboard</h1>
      </div>

      {/* 2. PILL NAVIGATION */}
      <nav className="hidden lg:flex items-center gap-1 p-1 border-4 border-black dark:border-white rounded-xl bg-slate-50 dark:bg-neutral-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" onMouseLeave={() => setHoveredPath(null)}>
        {ADMIN_LINKS.map((link) => {
          const isActive = currentPath === link.path;
          const isHovered = hoveredPath === link.path;

          return (
            <Link key={link.id} to={link.path} onMouseEnter={() => setHoveredPath(link.path)} className={`relative px-4 py-2 text-xs font-black uppercase tracking-tight rounded-lg transition-colors z-10 ${isActive ? "text-white dark:text-black" : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"}`}>
              <span className="relative z-20">{link.label}</span>

              {/* Active State Pill */}
              {isActive && <motion.div layoutId="activeAdminPill" className="absolute inset-0 bg-indigo-600 dark:bg-orange-400 rounded-lg z-0 border-2 border-black dark:border-white" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}

              {/* Hover State Background (subtle) */}
              {isHovered && !isActive && <motion.div layoutId="hoverAdminPill" className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-lg z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
            </Link>
          );
        })}
      </nav>

      {/* 3. UTILITIES */}
      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="hidden md:flex items-center border-2 border-black dark:border-white rounded-xl bg-white dark:bg-[#111] overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 h-10 w-48">
          <input type="text" placeholder="FIND TX_ID..." className="w-full h-full px-3 text-[10px] font-black uppercase tracking-widest bg-transparent outline-none placeholder-black/30 dark:placeholder-white/30" />
        </div>

        <button onClick={toggleTheme} className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#111] text-black dark:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
          {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}