import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { motion } from "framer-motion";
import ExploreCard from "../components/ExploreCard"; // Importing your new component

// --- KEEP YOUR ICON COMPONENTS & MOCK_SKILLS ARRAY HERE ---
const LanguageIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2M4 5c.6 4.3 3.6 8.3 8 10M17 21l-3-7-3 7M12.2 17h3.6M14 5c-.5 2.5-2 5-4.5 7" /></svg>);
const TechIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>);
const CreativeIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" /><circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" /><circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" /><circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" /></svg>);
const BusinessIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 4h6v3H9V4zm11 16H4V9h16v11z" /></svg>);
const MiscIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-indigo-600 dark:text-orange-400" fill="none" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"/><circle cx="17" cy="18" r="2" /></svg>);

const MOCK_SKILLS = [
  { id: 1, user: "Alex_Baker", skill: "Conversational Japanese", cat: "languages", icon: LanguageIcon, cost: 1.5, desc: "Practice fluid conversational structures, casual slangs, and basic pitch accent correction.", level: "Intermediate", dateAdded: "2026-06-01" },
  { id: 2, user: "Matrix_Rebel", skill: "React Architecture & Custom Hooks", cat: "tech", icon: TechIcon, cost: 2.0, desc: "Learn how to cleanly abstract global data layer patterns using state orchestration frameworks.", level: "Advanced", dateAdded: "2026-06-09" },
  { id: 3, user: "Pixel_Lord", skill: "Figma Component Systems", cat: "creative", icon: CreativeIcon, cost: 1.0, desc: "Master auto-layout engines, semantic design tokens, and scalable interactive variants.", level: "Beginner", dateAdded: "2026-05-20" },
  { id: 4, user: "Growth_Hacker", skill: "Direct Response Copywriting", cat: "business", icon: BusinessIcon, cost: 1.8, desc: "Deconstruct psychological patterns that turn raw reader attention into targeted landing page conversions.", level: "Intermediate", dateAdded: "2026-06-05" },
  { id: 5, user: "Sora_99", skill: "Introduction to Rust Lang", cat: "tech", icon: TechIcon, cost: 2.5, desc: "Unpack memory safety rules without a garbage collector. Demystifying borrow-check syntax.", level: "Beginner", dateAdded: "2026-06-10" },
  { id: 6, user: "Lingo_Guru", skill: "Advanced Spanish Subjunctive", cat: "languages", icon: LanguageIcon, cost: 1.2, desc: "Break past plateaus by mastering complex conditional moods, triggers, and idiomatic speech templates.", level: "Advanced", dateAdded: "2026-05-15" },
  { id: 7, user: "Tone_Craft", skill: "Guitar Setup & Intonation", cat: "misc", icon: MiscIcon, cost: 1.0, desc: "Adjust truss rods, set saddle heights, cut nut slots, and fix scale lengths to stop fret buzz.", level: "Advanced", dateAdded: "2026-06-08" },
];

// Framer Motion parent container variant for staggering
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  }
};

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredSkills = MOCK_SKILLS.filter((item) => {
    const matchesSearch = item.skill.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.cat === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sortBy === "price-low") return a.cost - b.cost;
    if (sortBy === "price-high") return b.cost - a.cost;
    return 0;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. SEARCH & SORT ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-8 relative border-4 border-black dark:border-white bg-white dark:bg-[#111] h-14 rounded-xl flex items-center overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <span className="px-4 border-r-4 border-black dark:border-white h-full flex items-center bg-slate-50 dark:bg-neutral-900">
            <HiSearch className="w-5 h-5 text-black dark:text-white" />
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, keyword, or peer username..." 
            className="w-full h-full px-4 text-xs bg-transparent outline-none font-black uppercase tracking-tight placeholder-black/30 dark:placeholder-white/20" 
          />
        </div>

        <div className="lg:col-span-4 border-4 border-black dark:border-white bg-white dark:bg-[#111] h-14 rounded-xl flex items-center relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <span className="px-3 text-[10px] font-black uppercase tracking-tight border-r-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 h-full flex items-center shrink-0 text-black dark:text-white">
            SORT:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full h-full pl-3 pr-8 text-xs font-mono font-black uppercase bg-transparent outline-none cursor-pointer appearance-none text-indigo-600 dark:text-orange-400"
          >
            <option value="newest" className="bg-white dark:bg-neutral-900 text-black dark:text-white">📅 Newest Available</option>
            <option value="price-low" className="bg-white dark:bg-neutral-900 text-black dark:text-white">🪙 Price: Low to High</option>
            <option value="price-high" className="bg-white dark:bg-neutral-900 text-black dark:text-white">🪙 Price: High to Low</option>
          </select>
          <div className="absolute right-4 pointer-events-none text-black dark:text-white text-[10px]">▼</div>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR TABS */}
      <div className="flex flex-wrap gap-2 border-b-4 border-black dark:border-white pb-4">
        {[
          { id: "all", label: "All" },
          { id: "languages", label: "Languages" },
          { id: "tech", label: "Academic & Tech" },
          { id: "creative", label: "Arts & Creative" },
          { id: "business", label: "Business & Growth" },
          { id: "misc", label: "Misc" }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 font-mono text-xs font-black uppercase rounded-xl border-2 transition-all duration-200 active:scale-95 ${
              selectedCategory === cat.id
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-[2px_2px_0px_0px_#4f46e5] dark:shadow-[2px_2px_0px_0px_#f97316]"
                : "bg-white dark:bg-[#111] text-black/60 dark:text-white/60 border-black dark:border-white hover:bg-slate-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. PEER CARDS RESPONSE MATRIX */}
      {sortedSkills.length === 0 ? (
        <div className="border-4 border-dashed border-black dark:border-white rounded-xl p-12 text-center bg-white dark:bg-[#111]">
          <p className="text-xs font-black uppercase tracking-wide text-black/40 dark:text-white/40">⚡ No available network nodes match your metrics ⚡</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedSkills.map((node) => (
            <ExploreCard key={node.id} {...node} />
          ))}
        </motion.div>
      )}
    </div>
  );
}