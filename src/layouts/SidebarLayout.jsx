import React, { useState } from "react";
import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-react";
import { HiChartPie, HiSearch, HiUser, HiChat, HiSun, HiMoon, HiCreditCard } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function SidebarLayout() {
  const { isDark, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Get the current active URL path
  const location = useLocation();

  // Helper function to generate clean, dynamic styles for our links
  const getLinkStyles = (path) => {
    const isActive = location.pathname === path;
    const baseStyles = "flex items-center gap-3.5 px-4 py-3 font-bold uppercase text-xs border-2 transition-all group";
    const alignmentStyles = isCollapsed ? "justify-center px-0" : "";

    const stateStyles = isActive ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" : "text-black/60 dark:text-white/60 border-transparent hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white";

    return `${baseStyles} ${alignmentStyles} ${stateStyles}`;
  };

  return (
    <div className="flex h-screen w-screen bg-white dark:bg-[#111] overflow-hidden font-mono antialiased text-black dark:text-white transition-colors duration-150">
      {/* 1. STRUCTURAL SIDEBAR VERTICAL COLUMN */}
      <aside onMouseEnter={() => setIsCollapsed(false)} onMouseLeave={() => setIsCollapsed(true)} className={`${isCollapsed ? "w-20" : "w-64"} h-full hidden md:flex flex-col bg-white dark:bg-[#111] flex-shrink-0 border-r-2 border-black dark:border-white select-none transition-all duration-200 ease-in-out`}>
        <div className="h-16 border-b-2 border-black dark:border-white flex-shrink-0" />

        {/* Navigation Grid Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Dashboard Link Component */}
          <Link to="/dashboard/deck" className={getLinkStyles("/dashboard/deck")} title="Dashboard">
            <HiChartPie className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">[ Dashboard ]</span>}
          </Link>

          {/* Explore Skills Link Component */}
          <Link to="/dashboard/explore" className={getLinkStyles("/dashboard/explore")} title="Explore Skills">
            <HiSearch className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Explore Skills</span>}
          </Link>

          {/* Wallet Link Component */}
          <Link to="/dashboard/wallet" className={getLinkStyles("/dashboard/wallet")} title="Wallet">
            <HiCreditCard className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Wallet</span>}
          </Link>

          {/* Messages Link Component */}
          <Link to="/dashboard/messages" className={getLinkStyles("/dashboard/messages")} title="Messages">
            <HiChat className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Messages</span>}
          </Link>

          {/* My Profile Link Component */}
          <Link to="/dashboard/profile" className={getLinkStyles("/dashboard/profile")} title="My Profile">
            <HiUser className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">My Profile</span>}
          </Link>
        </nav>
        
        {/* Telemetry Status Footer placeholder wrapper has been cleanly detached */}
      </aside>

      {/* 2. MAIN APPLICATION CONTENT LAYER */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="h-16 bg-white dark:bg-[#111] border-b-2 border-black dark:border-white flex items-center justify-between px-6 flex-shrink-0 select-none z-10">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-blue-600 dark:bg-orange-400 flex-shrink-0" />
            <h2 className="text-lg font-black tracking-tighter uppercase whitespace-nowrap">SKILL//SWAP</h2>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Link to="/dashboard/wallet" className="bg-white dark:bg-[#111] text-black dark:text-white border-2 border-black dark:border-white text-xs font-bold px-3 py-1.5 flex items-center gap-2 uppercase">
              <span>🪙</span>
              <span>BAL: 5.00 SKL</span>
            </Link>

            <button onClick={toggleTheme} className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#111] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 transition-all" title="Toggle Layout Variable">
              {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
            </button>

            <div className="border-2 border-black dark:border-white p-0.5 bg-white dark:bg-black">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="cursor-pointer block flex-shrink-0">
                    <Avatar alt="User profile node" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" className="rounded-none object-cover" />
                  </div>
                }
              >
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}