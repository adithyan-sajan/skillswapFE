import React, { useState } from "react";
import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-react";
import { HiChartPie, HiSearch, HiUser, HiChat, HiSun, HiMoon, HiCreditCard } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function SidebarLayout() {
  const { isDark, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const getLinkStyles = (path) => {
    const isActive = location.pathname === path;
    const baseStyles = "flex items-center gap-3.5 px-4 py-3 font-bold uppercase text-xs rounded-xl border-2 transition-all duration-200 group";
    const alignmentStyles = isCollapsed ? "justify-center px-0" : "";

    const stateStyles = isActive 
      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[4px_4px_0px_0px_#4f46e5] dark:shadow-[4px_4px_0px_0px_#f97316]" 
      : "text-black/60 dark:text-white/60 border-transparent hover:bg-slate-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white";

    return `${baseStyles} ${alignmentStyles} ${stateStyles}`;
  };

  return (
    <div className="flex h-screen w-screen bg-white dark:bg-[#111] overflow-hidden font-mono antialiased text-black dark:text-white transition-colors duration-150">
      
      {/* SIDEBAR COLUMN */}
      <aside 
        onMouseEnter={() => setIsCollapsed(false)} 
        onMouseLeave={() => setIsCollapsed(true)} 
        className={`${isCollapsed ? "w-20" : "w-64"} h-full hidden md:flex flex-col bg-white dark:bg-[#111] flex-shrink-0 border-r-4 border-black dark:border-white select-none transition-all duration-200 ease-in-out`}
      >
        <div className="h-16 border-b-4 border-black dark:border-white flex-shrink-0" />

        <nav className="flex-1 px-3 py-6 space-y-2.5">
          <Link to="/dashboard/deck" className={getLinkStyles("/dashboard/deck")} title="Dashboard">
            <HiChartPie className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Dashboard</span>}
          </Link>

          <Link to="/dashboard/explore" className={getLinkStyles("/dashboard/explore")} title="Explore Skills">
            <HiSearch className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Explore Skills</span>}
          </Link>

          <Link to="/dashboard/wallet" className={getLinkStyles("/dashboard/wallet")} title="Wallet">
            <HiCreditCard className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Wallet</span>}
          </Link>

          <Link to="/dashboard/messages" className={getLinkStyles("/dashboard/messages")} title="Messages">
            <HiChat className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Messages</span>}
          </Link>

          <Link to="/dashboard/profile" className={getLinkStyles("/dashboard/profile")} title="My Profile">
            <HiUser className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">My Profile</span>}
          </Link>
        </nav>
      </aside>

      {/* MAIN APPLICATION VIEWPORT */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="h-16 bg-white dark:bg-[#111] border-b-4 border-black dark:border-white flex items-center justify-between px-6 flex-shrink-0 select-none z-10">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-indigo-600 dark:bg-orange-400 rounded-md border-2 border-black" />
            <h2 className="text-base font-black tracking-tighter uppercase whitespace-nowrap">Skill Swap</h2>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Link to="/dashboard/wallet" className="bg-slate-50 dark:bg-neutral-900 text-black dark:text-white border-2 border-black dark:border-white rounded-xl text-xs font-bold px-3 py-1.5 flex items-center gap-2 uppercase transition-all hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <span>🪙</span>
              <span>Bal: 5.00 SKL</span>
            </Link>

            <button onClick={toggleTheme} className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#111] text-black dark:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-900 active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
            </button>

            <div className="border-2 border-black dark:border-white p-0.5 bg-white dark:bg-black rounded-xl">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="cursor-pointer block flex-shrink-0">
                    <Avatar alt="User profile" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" className="rounded-xl object-cover" />
                  </div>
                }
              >
                <DropdownHeader className="border-b-2 border-black dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50 rounded-t-xl font-mono">
                  <span className="block text-xs font-bold text-black dark:text-white uppercase">User_Ice</span>
                  <span className="block truncate text-[10px] text-slate-500 font-medium mt-1">ice@skillswap.org</span>
                </DropdownHeader>
                <DropdownItem className="font-mono text-xs uppercase font-bold hover:bg-slate-100 dark:hover:bg-neutral-800">Profile Settings</DropdownItem>
                <DropdownItem className="font-mono text-xs uppercase font-bold hover:bg-slate-100 dark:hover:bg-neutral-800">Network Config</DropdownItem>
                <DropdownDivider className="border-t-2 border-black dark:border-neutral-800" />
                <DropdownItem className="font-mono text-xs uppercase font-black text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30">Log Out</DropdownItem>
              </Dropdown>
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