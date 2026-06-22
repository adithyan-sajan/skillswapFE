import React, { useState, useRef, useEffect } from "react";
import { HiChartPie, HiSearch, HiUser, HiChat, HiSun, HiMoon, HiCreditCard } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarLayout() {
  const { isDark, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  // Handle clicking outside the profile dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkStyles = (path) => {
    const isActive = location.pathname === path;
    const baseStyles = "flex items-center gap-3.5 px-4 py-3.5 font-bold uppercase text-sm rounded-xl border-2 transition-all duration-200 group";
    const alignmentStyles = isCollapsed ? "justify-center px-0" : "";

    const stateStyles = isActive 
      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[4px_4px_0px_0px_#4f46e5] dark:shadow-[4px_4px_0px_0px_#f97316]" 
      : "text-black/90 dark:text-white/90 border-transparent hover:bg-slate-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white";

    return `${baseStyles} ${alignmentStyles} ${stateStyles}`;
  };

  return (
    <div className="flex h-screen w-screen bg-white dark:bg-[#111] overflow-hidden font-mono antialiased text-black dark:text-white transition-colors duration-150">
      
      {/* SIDEBAR COLUMN */}
      <aside onMouseEnter={() => setIsCollapsed(false)} onMouseLeave={() => setIsCollapsed(true)} className={`${isCollapsed ? "w-20" : "w-64"} h-full hidden md:flex flex-col bg-white dark:bg-[#111] flex-shrink-0 border-r-4 border-black dark:border-white select-none transition-all duration-200 ease-in-out z-20`}>
        <div className="h-20 border-b-4 border-black dark:border-white flex-shrink-0" />

        <nav className="flex-1 px-3 py-6 space-y-2.5">
          <Link to="/dashboard/deck" className={getLinkStyles("/dashboard/deck")} title="Dashboard">
            <HiChartPie className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Dashboard</span>}
          </Link>

          <Link to="/dashboard/explore" className={getLinkStyles("/dashboard/explore")} title="Explore Skills">
            <HiSearch className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Explore Skills</span>}
          </Link>

          <Link to="/dashboard/wallet" className={getLinkStyles("/dashboard/wallet")} title="Wallet">
            <HiCreditCard className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Wallet</span>}
          </Link>

          <Link to="/dashboard/chat" className={getLinkStyles("/dashboard/messages")} title="Messages">
            <HiChat className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Messages</span>}
          </Link>

          <Link to="/dashboard/profile" className={getLinkStyles("/dashboard/profile")} title="My Profile">
            <HiUser className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">My Profile</span>}
          </Link>
        </nav>
      </aside>

      {/* MAIN APPLICATION VIEWPORT */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="h-20 bg-white dark:bg-[#111] border-b-4 border-black dark:border-white flex items-center justify-between px-6 md:px-8 flex-shrink-0 select-none z-10">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-indigo-600 dark:bg-orange-400 rounded-md border-2 border-black dark:border-white" />
            <h2 className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">Skill Swap</h2>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            
            {/* Shrunk the Wallet Button: Smaller text (text-xs), smaller padding (px-3 py-2) */}
            <Link to="/dashboard/wallet" className="bg-slate-50 dark:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white rounded-xl text-xs font-bold px-3 py-2 flex items-center gap-2 uppercase transition-all hover:bg-slate-100 dark:hover:bg-neutral-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
              <span className="text-sm">🪙</span>
              <span>Bal: 5.00 SKL</span>
            </Link>

            <button onClick={toggleTheme} className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#111] text-black dark:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>

            {/* CUSTOM NEO-BRUTALIST PROFILE DROPDOWN */}
            <div className="relative" ref={profileRef}>
              
              {/* Profile Image Trigger: Increased to w-12 h-12 */}
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="block border-2 border-black dark:border-white rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none"
              >
                <img 
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                  alt="User Avatar" 
                  className="w-12 h-12 object-cover block"
                />
              </button>

              {/* Framer Motion Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-0 top-16 w-56 bg-white dark:bg-[#111] border-4 border-black dark:border-white rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col z-50 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="px-4 py-3 border-b-2 border-black dark:border-white bg-slate-50 dark:bg-neutral-900">
                      <span className="block text-sm font-black text-black dark:text-white uppercase">User_Ice</span>
                      <span className="block truncate text-xs text-black/60 dark:text-white/60 font-bold mt-1">ice@skillswap.org</span>
                    </div>
                    
                    {/* Items */}
                    <div className="p-2 space-y-1">
                      {/* Changed to Link Component */}
                      <Link 
                        to="/dashboard/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block w-full text-left px-3 py-2 text-xs font-black uppercase rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        Profile Settings
                      </Link>
                      
                      <button className="w-full text-left px-3 py-2 text-xs font-black uppercase rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                        Network Config
                      </button>
                    </div>

                    {/* Divider & Logout */}
                    <div className="p-2 border-t-2 border-black dark:border-white">
                      <button className="w-full text-left px-3 py-2 text-xs font-black uppercase text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 dark:hover:text-black rounded-lg transition-colors">
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/60 dark:bg-[#161616] transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
}