import React, { useState } from "react";
import { HiSearch, HiFilter, HiDotsHorizontal, HiDownload } from "react-icons/hi";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";
const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

// Mock User Database
const MOCK_USERS = [
  { id: "U-1092", username: "Alex_Baker", email: "alex@example.com", balance: 12.5, rating: 4.9, status: "Active", joined: "2026-01-14" },
  { id: "U-1093", username: "StudioMina", email: "mina@studio.io", balance: 45.0, rating: 5.0, status: "Active", joined: "2026-02-02" },
  { id: "U-1094", username: "CryptoSpammer", email: "buy@coins.net", balance: 0.0, rating: 1.2, status: "Suspended", joined: "2026-06-10" },
  { id: "U-1095", username: "DevAlex", email: "dev.alex@tech.com", balance: 8.0, rating: 4.7, status: "Active", joined: "2026-03-15" },
  { id: "U-1096", username: "Lingo_Guru", email: "hola@lingo.org", balance: 104.5, rating: 4.8, status: "Warned", joined: "2025-11-20" },
  { id: "U-1097", username: "Pixel_Lord", email: "pixel@design.co", balance: 2.5, rating: 4.5, status: "Active", joined: "2026-04-18" },
  { id: "U-1098", username: "Troll_Account", email: "troll99@web.com", balance: 1.0, rating: 2.1, status: "Suspended", joined: "2026-05-30" },
];

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filtering Logic
  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Dynamic Status Badge Styling
  const getStatusStyle = (status) => {
    const base = "text-[10px] font-black uppercase px-2.5 py-1 rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]";
    if (status === "Active") return `${base} bg-emerald-400 text-black`;
    if (status === "Warned") return `${base} bg-yellow-400 text-black`;
    if (status === "Suspended") return `${base} bg-rose-500 text-white dark:text-black`;
    return base;
  };

  return (
    <main className="max-w-screen-2xl mx-auto w-full p-6 md:p-8 space-y-6 flex-grow flex flex-col">
      
      {/* 1. Page Title & Export */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-black dark:border-white pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-orange-400 block mb-1">Identity Management</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter">User Ledger</h2>
        </div>
        <button className={`px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs rounded-xl border-2 border-black dark:border-white flex items-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
          <HiDownload className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* 2. Toolbar (Search & Filter) */}
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        {/* Search */}
        <div className={`relative flex-grow flex items-center h-12 w-full border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]`}>
          <span className="px-4 border-r-4 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
            <HiSearch className="w-5 h-5 text-black dark:text-white" />
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, Username, or Email..." 
            className="w-full h-full px-4 text-xs bg-transparent outline-none font-black uppercase tracking-tight placeholder-black/30 dark:placeholder-white/20" 
          />
        </div>

        {/* Filter Dropdown */}
        <div className={`relative w-full md:w-auto h-12 flex flex-shrink-0 items-center border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] overflow-hidden`}>
          <span className="px-3 text-[10px] font-black uppercase tracking-tight border-r-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 h-full flex items-center shrink-0">
            <HiFilter className="w-4 h-4 mr-1" /> Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-full pl-3 pr-8 text-xs font-mono font-black uppercase bg-transparent outline-none cursor-pointer appearance-none text-indigo-600 dark:text-orange-400 min-w-[140px]"
          >
            <option value="All" className="bg-white dark:bg-neutral-900 text-black dark:text-white">All Users</option>
            <option value="Active" className="bg-white dark:bg-neutral-900 text-black dark:text-white">Active</option>
            <option value="Warned" className="bg-white dark:bg-neutral-900 text-black dark:text-white">Warned</option>
            <option value="Suspended" className="bg-white dark:bg-neutral-900 text-black dark:text-white">Suspended</option>
          </select>
          <div className="absolute right-3 pointer-events-none text-[10px]">▼</div>
        </div>
      </div>

      {/* 3. The Data Table */}
      <div className={`w-full overflow-hidden flex-grow flex flex-col ${SHARED_CARD_STYLE}`}>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="border-b-4 border-black dark:border-white bg-slate-100 dark:bg-neutral-900 text-xs font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Identity</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Wallet (SKL)</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-dashed divide-black/20 dark:divide-white/20 text-sm font-bold bg-white dark:bg-[#111]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-xs font-black uppercase text-black/40 dark:text-white/40">
                    No users found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors group">
                    {/* User ID */}
                    <td className="px-6 py-4">
                      <span className="bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md text-[11px] font-black border border-black/10 dark:border-white/10">
                        {user.id}
                      </span>
                    </td>

                    {/* Identity */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-indigo-600 dark:text-orange-400 font-black uppercase">@{user.username}</span>
                        <span className="text-[10px] text-black/50 dark:text-white/50">{user.email}</span>
                      </div>
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 text-xs font-mono text-black/70 dark:text-white/70">
                      {user.joined}
                    </td>

                    {/* Wallet Balance */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-mono text-emerald-600 dark:text-emerald-400 font-black text-base">
                        <span className="text-sm">🪙</span> {user.balance.toFixed(2)}
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 font-mono">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className={user.rating < 3.0 ? "text-rose-500" : ""}>{user.rating.toFixed(1)}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={getStatusStyle(user.status)}>
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <button className={`p-2 bg-slate-100 dark:bg-neutral-800 border-2 border-black dark:border-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
                        <HiDotsHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="border-t-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 p-4 flex justify-between items-center text-xs font-black uppercase">
          <span className="text-black/60 dark:text-white/60">
            Showing {filteredUsers.length} of {MOCK_USERS.length}
          </span>
          <div className="flex gap-2">
            <button className={`px-3 py-1.5 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-[#111] opacity-50 cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]`}>
              Prev
            </button>
            <button className={`px-3 py-1.5 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-[#111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
              Next
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}