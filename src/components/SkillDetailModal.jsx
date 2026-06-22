import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiX, HiStar, HiClock, HiCalendar } from "react-icons/hi";

const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

// Mock available time slots
const TIME_SLOTS = ["10:00 AM", "01:30 PM", "03:00 PM", "06:00 PM"];

export default function SkillDetailModal({ isOpen, onClose, skill }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!skill) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#111] border-4 border-black dark:border-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col max-h-[90vh]"
          >
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className={`absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white dark:text-black border-4 border-black dark:border-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-10 hover:bg-rose-600 transition-all ${PRESS_ANIMATION}`}
            >
              <HiX className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-grow custom-scrollbar">
              
              {/* Host Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-4 border-black dark:border-white pb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-4 border-black dark:border-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex-shrink-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${skill.user}`} alt="Host" className="w-full h-full object-cover bg-indigo-100 dark:bg-orange-200" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-indigo-600 dark:text-orange-400">
                      @{skill.user}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center text-yellow-500 text-xs font-black">
                        <HiStar className="w-4 h-4 mr-0.5" /> 4.9
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border-2 border-black dark:border-white bg-slate-100 dark:bg-neutral-800 text-black dark:text-white">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Timezone & Profile Link */}
                <div className="flex flex-col sm:items-end gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded border-2 border-black/10 dark:border-white/10">
                    🌐 Timezone: UTC-5 (EST)
                  </span>
                  <Link 
                    to={`/dashboard/profile/${skill.user}`} 
                    onClick={onClose}
                    className="text-xs font-black uppercase tracking-tight text-indigo-600 dark:text-orange-400 hover:underline hover:text-black dark:hover:text-white transition-colors"
                  >
                    View Full Profile →
                  </Link>
                </div>
              </div>

              {/* Skill Details */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 block">
                  Skill Offering
                </span>
                <h2 className="text-2xl font-black uppercase leading-tight text-black dark:text-white">
                  {skill.skill}
                </h2>
                <p className="text-sm font-bold leading-relaxed text-black/70 dark:text-white/70">
                  {skill.desc} This is a detailed expansion of the description. In a real application, this would contain the syllabus, prerequisites, and what exactly you will cover during the 1-hour session.
                </p>
              </div>

              {/* Scheduling Section */}
              <div className="p-5 border-4 border-black dark:border-white rounded-xl bg-slate-50 dark:bg-neutral-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <HiCalendar className="w-5 h-5 text-indigo-600 dark:text-orange-400" /> 
                  Select a Time (UTC)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedSlot(time)}
                      className={`py-2 text-xs font-black uppercase border-2 border-black dark:border-white rounded-lg transition-all ${
                        selectedSlot === time 
                          ? "bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] translate-y-[-2px] translate-x-[-2px]" 
                          : "bg-white dark:bg-[#111] text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Fixed Footer (Action Area) */}
            <div className="border-t-4 border-black dark:border-white bg-white dark:bg-[#111] p-6 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50">
                  Total Escrow Cost
                </span>
                <span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                  🪙 {skill.cost.toFixed(2)} <span className="text-xs">SKL</span>
                </span>
              </div>

              <button 
                disabled={!selectedSlot}
                className={`w-full sm:w-auto px-6 py-3.5 bg-indigo-600 text-white dark:bg-orange-400 dark:text-black font-black uppercase text-sm tracking-widest rounded-xl border-4 border-black dark:border-white transition-all ${
                  selectedSlot 
                    ? `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-indigo-700 dark:hover:bg-orange-500 ${PRESS_ANIMATION}`
                    : "opacity-50 cursor-not-allowed bg-slate-300 dark:bg-neutral-700 text-black/40 border-black/20"
                }`}
              >
                {selectedSlot ? "Confirm & Escrow" : "Pick a Time"}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}