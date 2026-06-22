import React, { useState } from "react";
import { HiSearch, HiFilter, HiEyeOff, HiTrash, HiExternalLink } from "react-icons/hi";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";
const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

// Mock Data: The active listings currently on the platform
const MOCK_NODES = [
  { id: "ND-501", host: "Alex_Baker", title: "Conversational Japanese", cat: "Languages", cost: 1.5, status: "Published" },
  { id: "ND-502", host: "Matrix_Rebel", title: "React Architecture & Custom Hooks", cat: "Tech", cost: 2.0, status: "Published" },
  { id: "ND-503", host: "CryptoSpammer", title: "BUY 1000 FOLLOWERS NOW", cat: "Business", cost: 0.5, status: "Flagged" },
  { id: "ND-504", host: "Pixel_Lord", title: "Figma Component Systems", cat: "Creative", cost: 1.0, status: "Published" },
  { id: "ND-505", host: "Lingo_Guru", title: "Advanced Spanish Subjunctive", cat: "Languages", cost: 1.2, status: "Published" },
  { id: "ND-506", host: "Troll_Account", title: "How to waste time", cat: "Misc", cost: 5.0, status: "Unpublished" },
];

export default function AdminListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  // Filtering Logic
  const filteredNodes = MOCK_NODES.filter((node) => {
    const matchesSearch = node.title.toLowerCase().includes(searchQuery.toLowerCase()) || node.host.toLowerCase().includes(searchQuery.toLowerCase()) || node.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = catFilter === "All" || node.cat === catFilter;
    return matchesSearch && matchesCat;
  });

  // Dynamic Status Badge
  const getStatusStyle = (status) => {
    const base = "text-[10px] font-black uppercase px-2 py-1 rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]";
    if (status === "Published") return `${base} bg-emerald-400 text-black`;
    if (status === "Flagged") return `${base} bg-yellow-400 text-black`;
    if (status === "Unpublished") return `${base} bg-black text-white dark:bg-white dark:text-black`;
    return base;
  };

  return (
    <main className="max-w-screen-2xl mx-auto w-full p-6 md:p-8 space-y-6 flex-grow flex flex-col">
      {/* 1. Page Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-black dark:border-white pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-orange-400 block mb-1">Content Moderation</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Exchange Nodes</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-tight">Active Listings:</span>
          <span className="text-sm font-black uppercase bg-emerald-500 text-black px-3 py-1.5 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">4,892</span>
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        {/* Search */}
        <div className={`relative flex-grow flex items-center h-12 w-full border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]`}>
          <span className="px-4 border-r-4 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
            <HiSearch className="w-5 h-5 text-black dark:text-white" />
          </span>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by Node ID, Host, or Title..." className="w-full h-full px-4 text-xs bg-transparent outline-none font-black uppercase tracking-tight placeholder-black/30 dark:placeholder-white/20" />
        </div>

        {/* Category Filter */}
        <div className={`relative w-full md:w-auto h-12 flex flex-shrink-0 items-center border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] overflow-hidden`}>
          <span className="px-3 text-[10px] font-black uppercase tracking-tight border-r-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 h-full flex items-center shrink-0">
            <HiFilter className="w-4 h-4 mr-1" /> Cat:
          </span>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="w-full h-full pl-3 pr-8 text-xs font-mono font-black uppercase bg-transparent outline-none cursor-pointer appearance-none text-indigo-600 dark:text-orange-400 min-w-[140px]">
            <option value="All" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
              All Categories
            </option>
            <option value="Languages" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
              Languages
            </option>
            <option value="Tech" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
              Tech
            </option>
            <option value="Creative" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
              Creative
            </option>
            <option value="Business" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
              Business
            </option>
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
                <th className="px-6 py-4">Node ID</th>
                <th className="px-6 py-4">Title / Topic</th>
                <th className="px-6 py-4">Host</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-dashed divide-black/20 dark:divide-white/20 text-sm font-bold bg-white dark:bg-[#111]">
              {filteredNodes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-xs font-black uppercase text-black/40 dark:text-white/40">
                    No nodes found matching filters.
                  </td>
                </tr>
              ) : (
                filteredNodes.map((node) => (
                  <tr key={node.id} className="hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors group">
                    {/* Node ID */}
                    <td className="px-6 py-4 font-mono text-xs text-black/60 dark:text-white/60">{node.id}</td>

                    {/* Title */}
                    <td className="px-6 py-4">
                      <span className="block max-w-xs truncate" title={node.title}>
                        {node.title}
                      </span>
                    </td>

                    {/* Host */}
                    <td className="px-6 py-4">
                      <span className="text-indigo-600 dark:text-orange-400 font-black uppercase">@{node.host}</span>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="text-[10px] uppercase font-black tracking-widest border-b-2 border-black/20 dark:border-white/20">{node.cat}</span>
                    </td>

                    {/* Cost */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 font-black">
                        <span className="text-xs">🪙</span> {node.cost.toFixed(2)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={getStatusStyle(node.status)}>{node.status}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className={`p-2 bg-slate-100 dark:bg-neutral-800 border-2 border-black dark:border-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`} title="View Node">
                          <HiExternalLink className="w-4 h-4" />
                        </button>
                        <button className={`p-2 bg-slate-100 dark:bg-neutral-800 border-2 border-black dark:border-white rounded-lg hover:bg-yellow-400 hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`} title="Unpublish">
                          <HiEyeOff className="w-4 h-4" />
                        </button>
                        <button className={`p-2 bg-slate-100 dark:bg-neutral-800 border-2 border-black dark:border-white rounded-lg hover:bg-rose-500 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`} title="Delete">
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
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
            Showing {filteredNodes.length} of {MOCK_NODES.length}
          </span>
          <div className="flex gap-2">
            <button className={`px-3 py-1.5 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-[#111] opacity-50 cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]`}>Prev</button>
            <button className={`px-3 py-1.5 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-[#111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}
