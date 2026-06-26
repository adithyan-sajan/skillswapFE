import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCalendar } from "react-icons/hi";
import { createSession } from "../services/AllApi";

const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

export default function ScheduleSessionModal({ isOpen, onClose, peer, skillId, onScheduleSuccess }) {
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime) return setError("Please select a date and time.");
    
    setIsSubmitting(true);
    setError("");

    try {
      // 1. Send data to the backend
      await createSession({
        peerId: peer._id,
        skillId: skillId,
        scheduledStartTime: new Date(startTime).toISOString(),
        durationHours: Number(duration)
      });

      // 2. Auto-send a message to the chat
      const formattedTime = new Date(startTime).toLocaleString([], {
        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      onScheduleSuccess(`🗓️ System: Session officially scheduled for ${formattedTime}. Check your Dashboard Timetable!`);
      
      // 3. Reset and close
      setStartTime("");
      setDuration(1);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule session.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full h-11 px-3 border-2 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 rounded-lg text-sm font-bold outline-none focus:border-indigo-600 dark:focus:border-orange-400 text-black dark:text-white";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-white dark:bg-[#111] border-4 border-black dark:border-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col font-mono z-10"
        >
          <button onClick={onClose} className={`absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white border-4 border-black dark:border-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-20 hover:bg-rose-600 transition-all ${PRESS_ANIMATION}`}>
            <HiX className="w-5 h-5" />
          </button>

          <div className="p-5 border-b-4 border-black dark:border-white flex items-center gap-2 bg-indigo-50 dark:bg-orange-500/10 rounded-t-xl">
            <HiCalendar className="w-6 h-6 text-indigo-600 dark:text-orange-400" />
            <h2 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">Lock Time</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 bg-rose-500/10 border-2 border-rose-500 text-rose-500 text-xs font-black uppercase rounded-lg">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-1.5 relative">
              <label className="text-[11px] font-bold uppercase text-slate-500">Date & Time</label>
              <input 
                type="datetime-local" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[11px] font-bold uppercase text-slate-500">Duration (Hours)</label>
              <input 
                type="number" 
                min="0.5" step="0.5" max="5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" disabled={isSubmitting}
                className={`w-full h-12 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl border-4 border-black dark:border-white transition-all ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : `shadow-[4px_4px_0px_0px_#4f46e5] dark:shadow-[4px_4px_0px_0px_#f97316] ${PRESS_ANIMATION}`
                }`}
              >
                {isSubmitting ? "Syncing..." : "Confirm Schedule"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}