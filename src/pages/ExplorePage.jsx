import React, { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import { motion } from "framer-motion";
import ExploreCard from "../components/ExploreCard";
import SkillDetailModal from "../components/SkillDetailModal";

// 1. IMPORT YOUR AXIOS API SERVICE
import { getAllListings } from "../services/AllApi";

const AllIcon = ({ className = "text-indigo-600 dark:text-orange-400 w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={`stroke-current ${className}`} fill="none" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const LanguageIcon = ({ className = "text-indigo-600 dark:text-orange-400 w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={`stroke-current ${className}`} fill="none" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2M4 5c.6 4.3 3.6 8.3 8 10M17 21l-3-7-3 7M12.2 17h3.6M14 5c-.5 2.5-2 5-4.5 7" />
  </svg>
);
const TechIcon = ({ className = "text-indigo-600 dark:text-orange-400 w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={`stroke-current ${className}`} fill="none" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);
const CreativeIcon = ({ className = "text-indigo-600 dark:text-orange-400 w-5 h-5" }) => (
  <svg viewBox="0 0 297 297" className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M254.141,53.244C224.508,18.909,185.299,0,143.736,0c-35.062,0-68.197,13.458-93.302,37.9 C10.383,76.892-2.822,123.282,14.207,165.178c13.868,34.122,45.625,57.954,77.227,57.954c0.841,0,1.671-0.016,2.508-0.053 c4.705-0.194,9.249-0.586,13.646-0.966c5.309-0.462,10.325-0.895,14.77-0.895c10.54,0,19.645,0,19.645,26.846 c0,28.811,17.538,48.934,42.65,48.936c0.002,0,0.002,0,0.004,0c17.864,0,37.651-10.342,57.215-29.903 c25.882-25.88,43.099-62.198,47.234-99.64C293.762,125.326,281.343,84.763,254.141,53.244z M227.315,252.54 c-15.397,15.398-30.55,23.877-42.66,23.875c-16.288,0-22.064-15.274-22.064-28.352c0-32.357-12.786-47.43-40.232-47.43 c-5.333,0-10.778,0.472-16.545,0.969c-4.169,0.359-8.481,0.733-12.724,0.909c-0.553,0.024-1.102,0.034-1.655,0.034 c-23.07,0-47.529-18.975-58.156-45.118c-13.714-33.738-2.225-71.927,31.519-104.779c21.239-20.676,49.272-32.063,78.939-32.063 c35.485,0,69.159,16.373,94.82,46.107C289.187,125.359,272.6,207.256,227.315,252.54z"/>
    <path d="M192.654,165.877c0,17.213,13.918,31.217,31.026,31.217c17.107,0,31.025-14.004,31.025-31.217 c0-17.215-13.918-31.219-31.025-31.219C206.572,134.658,192.654,148.662,192.654,165.877z M234.118,165.877 c0,5.861-4.682,10.633-10.438,10.633c-5.756,0-10.438-4.771-10.438-10.633c0-5.863,4.683-10.633,10.438-10.633 C229.436,155.244,234.118,160.014,234.118,165.877z"/>
    <path d="M226.914,93.489c0-17.215-13.917-31.219-31.025-31.219c-17.107,0-31.025,14.004-31.025,31.219 c0,17.211,13.918,31.218,31.025,31.218C212.997,124.707,226.914,110.7,226.914,93.489z M185.45,93.489 c0-5.865,4.684-10.632,10.439-10.632c5.756,0,10.438,4.767,10.438,10.632c0,5.86-4.683,10.633-10.438,10.633 C190.133,104.122,185.45,99.35,185.45,93.489z"/>
    <path d="M124.863,39.627c-17.107,0-31.025,14.004-31.025,31.217c0,17.213,13.918,31.217,31.025,31.217s31.025-14.004,31.025-31.217 C155.888,53.631,141.97,39.627,124.863,39.627z M124.863,81.478c-5.756,0-10.438-4.771-10.438-10.634 c0-5.863,4.682-10.633,10.438-10.633c5.756,0,10.438,4.77,10.438,10.633C135.3,76.707,130.619,81.478,124.863,81.478z"/>
    <path d="M70.821,92.809c-17.107,0-31.026,14.004-31.026,31.217c0,17.214,13.919,31.219,31.026,31.219s31.024-14.005,31.024-31.219 C101.845,106.813,87.928,92.809,70.821,92.809z M70.821,134.658c-5.757,0-10.439-4.77-10.439-10.633 c0-5.861,4.683-10.63,10.439-10.63c5.755,0,10.438,4.769,10.438,10.63C81.259,129.889,76.576,134.658,70.821,134.658z"/>
  </svg>
);
const BusinessIcon = ({ className = "text-indigo-600 dark:text-orange-400 w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={`stroke-current ${className}`} fill="none" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 4h6v3H9V4zm11 16H4V9h16v11z" />
  </svg>
);
const MiscIcon = ({ className = "text-indigo-600 dark:text-orange-400 w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={`stroke-current ${className}`} fill="none" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const CATEGORIES = [
  { id: "all", label: "All", icon: AllIcon },
  { id: "languages", label: "Languages", icon: LanguageIcon },
  { id: "tech", label: "Academic & Tech", icon: TechIcon },
  { id: "creative", label: "Arts & Creative", icon: CreativeIcon },
  { id: "business", label: "Business & Growth", icon: BusinessIcon },
  { id: "misc", label: "Misc", icon: MiscIcon },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// HELPER: Matches the backend 'category' string to your custom icons
const getIconForCategory = (categoryStr) => {
  const cat = CATEGORIES.find(c => c.id === categoryStr);
  return cat ? cat.icon : MiscIcon;
};

export default function ExplorePage() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. FETCH LIVE DATA USING AXIOS ON MOUNT
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data); // Axios sets JSON payload inside .data
      } catch (err) {
        console.error("Listing fetch error:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch marketplace data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleOpenModal = (skill) => {
    // Map the database object to the format your modal probably expects
    const formattedSkill = {
      ...skill,
      user: skill.hostId?.username || "Unknown Host",
      skill: skill.title,
      desc: skill.description,
      cost: skill.costPerHour
    };
    setSelectedSkill(formattedSkill);
    setIsModalOpen(true);
  };

  // 3. FILTER & SORT LIVE DATA
  const filteredSkills = listings.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const hostMatch = item.hostId?.username?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSearch = titleMatch || descMatch || hostMatch;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "price-low") return a.costPerHour - b.costPerHour;
    if (sortBy === "price-high") return b.costPerHour - a.costPerHour;
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
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by topic, keyword, or peer username..." className="w-full h-full px-4 text-xs bg-transparent outline-none font-black uppercase tracking-tight placeholder-black/30 dark:placeholder-white/20" />
        </div>

        <div className="lg:col-span-4 border-4 border-black dark:border-white bg-white dark:bg-[#111] h-14 rounded-xl flex items-center relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <span className="px-3 text-[10px] font-black uppercase tracking-tight border-r-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 h-full flex items-center shrink-0 text-black dark:text-white">SORT:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full h-full pl-3 pr-8 text-xs font-mono font-black uppercase bg-transparent outline-none cursor-pointer appearance-none text-indigo-600 dark:text-orange-400">
            <option value="newest" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
              📅 Newest Available
            </option>
            <option value="price-low" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
              🪙 Price: Low to High
            </option>
            <option value="price-high" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
              🪙 Price: High to Low
            </option>
          </select>
          <div className="absolute right-4 pointer-events-none text-black dark:text-white text-[10px]">▼</div>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR TABS */}
      <div className="flex flex-wrap gap-2 border-b-4 border-black dark:border-white pb-4">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-2 px-4 py-2 font-mono text-xs font-black uppercase rounded-xl border-2 transition-all duration-200 active:scale-95 ${isSelected ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-[2px_2px_0px_0px_#4f46e5] dark:shadow-[2px_2px_0px_0px_#f97316]" : "bg-white dark:bg-[#111] text-black/60 dark:text-white/60 border-black dark:border-white hover:bg-slate-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"}`}>
              <IconComponent className={`w-4 h-4 ${isSelected ? "text-white dark:text-black" : "text-indigo-600 dark:text-orange-400"}`} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3. PEER CARDS RESPONSE MATRIX */}
      {isLoading ? (
        <div className="border-4 border-dashed border-black dark:border-white rounded-xl p-12 text-center bg-white dark:bg-[#111] animate-pulse">
          <p className="text-xs font-black uppercase tracking-wide text-indigo-600 dark:text-orange-400">⚡ Fetching Network Nodes... ⚡</p>
        </div>
      ) : error ? (
        <div className="border-4 border-dashed border-rose-500 rounded-xl p-12 text-center bg-rose-500/10">
          <p className="text-xs font-black uppercase tracking-wide text-rose-500">SYSTEM ERROR: {error}</p>
        </div>
      ) : sortedSkills.length === 0 ? (
        <div className="border-4 border-dashed border-black dark:border-white rounded-xl p-12 text-center bg-white dark:bg-[#111]">
          <p className="text-xs font-black uppercase tracking-wide text-black/40 dark:text-white/40">⚡ No available network nodes match your metrics ⚡</p>
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSkills.map((node) => (
            <ExploreCard 
              key={node._id} 
              user={node.hostId?.username || "Unknown Host"}
              skill={node.title}
              desc={node.description}
              cost={node.costPerHour}
              level={node.level}
              icon={getIconForCategory(node.category)}
              onSwapClick={() => handleOpenModal(node)} 
            />
          ))}
        </motion.div>
      )}

      {/* 4. SKILL DETAIL MODAL */}
      <SkillDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} skill={selectedSkill} />
    </div>
  );
}