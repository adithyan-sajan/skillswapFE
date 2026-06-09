import React from "react";
import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-react";
import { HiChartPie, HiSearch, HiUser, HiChat, HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

export default function SidebarLayout({ children }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    // Base Frame: Fixed viewport grid system
    <div className="flex h-screen w-screen bg-white dark:bg-[#111] overflow-hidden font-mono antialiased text-black dark:text-white transition-colors duration-150">
      
      {/* 1. STRUCTURAL SIDEBAR VERTICAL COLUMN */}
      <aside className="w-64 h-full hidden md:flex flex-col bg-white dark:bg-[#111] flex-shrink-0 border-r-2 border-black dark:border-white select-none">
        
        {/* Brand Container */}
        <div className="h-16 flex items-center px-6 border-b-2 border-black dark:border-white">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-blue-600 dark:bg-orange-400" />
            <h2 className="text-lg font-black tracking-tighter uppercase">
              SKILL//SWAP
            </h2>
          </div>
        </div>
        
        {/* Navigation Grid Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Active Navigation Cell */}
          <a href="#" className="flex items-center gap-3.5 px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-xs border-2 border-black dark:border-white transition-all">
            <HiChartPie className="w-5 h-5" />
            <span>[ Dashboard ]</span>
          </a>
          
          {/* Inactive Cells */}
          <a href="#" className="flex items-center gap-3.5 px-4 py-3 text-black/60 dark:text-white/60 border-2 border-transparent hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white font-bold uppercase text-xs transition-all group">
            <HiSearch className="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white" />
            <span>Explore Skills</span>
          </a>
          
          <a href="#" className="flex items-center gap-3.5 px-4 py-3 text-black/60 dark:text-white/60 border-2 border-transparent hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white font-bold uppercase text-xs transition-all group">
            <HiChat className="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white" />
            <span>Messages</span>
          </a>
          
          <a href="#" className="flex items-center gap-3.5 px-4 py-3 text-black/60 dark:text-white/60 border-2 border-transparent hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white font-bold uppercase text-xs transition-all group">
            <HiUser className="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white" />
            <span>My Profile</span>
          </a>
        </nav>

        {/* Telemetry Status Footer */}
        <div className="p-4 border-t-2 border-black dark:border-white text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-black dark:border-white text-[10px] font-bold uppercase tracking-tight">
            <span className="h-2 w-2 bg-emerald-500 animate-pulse" />
            NODE_SYNC: 100%
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT LAYER */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        
        {/* PLATFORM TOP HEADER BAR */}
        <header className="h-16 bg-white dark:bg-[#111] border-b-2 border-black dark:border-white flex items-center justify-between px-6 flex-shrink-0 select-none z-10">
          
          {/* Breadcrumb Indicator */}
          <div className="hidden md:block">
            <span className="text-xs font-bold uppercase">
              SYS // <span className="text-blue-600 dark:text-orange-400">DASHBOARD_MAIN</span>
            </span>
          </div>
          
          {/* Controls Array */}
          <div className="flex items-center gap-4 ml-auto">
            
            {/* Custom Token Pill Counter (Hard Box variant) */}
            <div className="bg-white dark:bg-[#111] text-black dark:text-white border-2 border-black dark:border-white text-xs font-bold px-3 py-1.5 flex items-center gap-2 uppercase">
              <span>🪙</span> 
              <span>BAL: 5.00 SKL</span>
            </div>

            {/* Global Theme Switching Box */}
            <button 
              onClick={toggleTheme}
              className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#111] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 transition-all"
              title="Toggle Layout Variable"
            >
              {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
            </button>

            {/* Profile Dropdown Container Frame */}
            <div className="border-2 border-black dark:border-white p-0.5 bg-white dark:bg-black">
              <Dropdown 
                arrowIcon={false} 
                inline 
                label={
                  <div className="cursor-pointer block flex-shrink-0">
                    <Avatar 
                      alt="User profile node" 
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                      className="rounded-none object-cover" 
                    />
                  </div>
                }
              >
                {/* Note: Flowbite elements override internal font arrays natively, so we pass explicit style utility variables */}
                <DropdownHeader className="border-b-2 border-black dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 rounded-none font-mono">
                  <span className="block text-xs font-bold text-black dark:text-white uppercase">User_Ice</span>
                  <span className="block truncate text-[10px] text-slate-500 font-medium mt-1">ice@skillswap.protocol</span>
                </DropdownHeader>
                <DropdownItem className="font-mono text-xs uppercase font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">Profile_Settings</DropdownItem>
                <DropdownItem className="font-mono text-xs uppercase font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">Network_Config</DropdownItem>
                <DropdownDivider className="border-t-2 border-black dark:border-zinc-700" />
                <DropdownItem className="font-mono text-xs uppercase font-black text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white">Terminate_Session</DropdownItem>
              </Dropdown>
            </div>

          </div>
        </header>

        {/* 3. CORE DISPLAY AREA VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-[#1c1c1c] transition-colors">
          {children}
        </main>

      </div>
    </div>
  );
}