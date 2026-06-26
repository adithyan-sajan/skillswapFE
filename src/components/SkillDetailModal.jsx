import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

// 1. IMPORT YOUR SECURE API FUNCTION
import { createSwapRequest } from "../services/AllApi";

const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

export default function SkillDetailModal({ isOpen, onClose, skill }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Helper to reset the modal state when closing
  const handleClose = () => {
    setFeedback(null);
    setMessage("");
    onClose();
  };

  const handleRequest = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      // 2. SEND THE REQUEST TO MONGODB
      await createSwapRequest({ 
        listingId: skill._id, 
        message: message || "Hi! I'd love to swap skills with you." 
      });
      
      setFeedback({ type: "success", text: "Request sent successfully! Awaiting host approval." });
      
      // Auto-close the modal after 2 seconds on success
      setTimeout(() => {
        handleClose();
      }, 2000);
      
    } catch (err) {
      setFeedback({ type: "error", text: err.response?.data?.message || "Failed to send request." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && skill && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          
          {/* BACKGROUND OVERLAY */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={handleClose} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* MODAL CONTENT */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#111] border-4 border-black dark:border-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col font-mono overflow-hidden"
          >
            
            <button 
              onClick={handleClose} 
              className={`absolute top-4 right-4 w-8 h-8 bg-rose-500 text-white border-2 border-black dark:border-white rounded-full flex items-center justify-center z-20 hover:bg-rose-600 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}
            >
              <HiX className="w-4 h-4" />
            </button>

            {/* HEADER */}
            <div className="p-6 border-b-4 border-black dark:border-white bg-indigo-50 dark:bg-orange-500/10">
              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-orange-400 block mb-1">Peer Node</span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white leading-none mb-2">{skill.skill}</h2>
              <p className="text-xs font-bold text-black/60 dark:text-white/60">Hosted by <span className="text-black dark:text-white underline">@{skill.user}</span></p>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-6">
              
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-2 tracking-widest">Description</h3>
                <p className="text-sm font-bold leading-relaxed text-black/80 dark:text-white/80">{skill.desc}</p>
              </div>

              {/* MESSAGE INPUT */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">Intro Message (Optional)</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey, I'd love to learn this from you!"
                  className="w-full h-24 p-3 text-xs font-bold text-black dark:text-white bg-slate-50 dark:bg-neutral-900 border-2 border-black dark:border-white rounded-xl resize-none outline-none focus:border-indigo-600 dark:focus:border-orange-400 transition-colors"
                />
              </div>

              {/* DYNAMIC FEEDBACK BANNER */}
              {feedback && (
                <div className={`p-3 border-2 rounded-xl text-[10px] font-black uppercase tracking-wide ${
                  feedback.type === 'error' 
                    ? 'bg-rose-100 border-rose-500 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' 
                    : 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                }`}>
                  {feedback.type === 'error' ? '⚠️ ' : '✅ '} {feedback.text}
                </div>
              )}

              {/* FOOTER & ACTIONS */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-black/10 dark:border-white/10">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block tracking-widest">Exchange Cost</span>
                  <span className="text-lg font-black text-black dark:text-white">{skill.cost} SKL/hr</span>
                </div>
                
                <button 
                  onClick={handleRequest}
                  disabled={isSubmitting}
                  className={`px-6 h-12 bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-widest rounded-xl border-4 border-black dark:border-white transition-all ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : `hover:bg-indigo-600 dark:hover:bg-orange-500 hover:text-white hover:border-indigo-600 dark:hover:border-orange-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`
                  }`}
                >
                  {isSubmitting ? "Transmitting..." : "Initialize Swap"}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}