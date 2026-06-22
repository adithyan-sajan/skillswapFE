import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiVideoCamera, HiClock, HiCalendar, HiX } from "react-icons/hi";

const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150";

export default function SessionCard({ id, peer, role, topic, startTime, duration }) {
  const navigate = useNavigate();
  const [isJoinable, setIsJoinable] = useState(false);
  const [timeStatus, setTimeStatus] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const diff = start - now;

      // 5 minutes in milliseconds = 300,000
      if (diff <= 300000 && diff > -3600000) { 
        setIsJoinable(true);
        setTimeStatus(diff <= 0 ? "LIVE NOW" : "STARTING SOON");
      } else if (diff <= -3600000) {
        setIsJoinable(false);
        setTimeStatus("ENDED");
      } else {
        setIsJoinable(false);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 24) {
          const days = Math.floor(hours / 24);
          setTimeStatus(`IN ${days} DAY${days > 1 ? 'S' : ''}`);
        } else if (hours > 0) {
          setTimeStatus(`IN ${hours}H ${mins}M`);
        } else {
          setTimeStatus(`IN ${mins} MINS`);
        }
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [startTime]);

  const roleBadge = role === "Teacher" 
    ? "bg-indigo-600 dark:bg-orange-400 text-white dark:text-black" 
    : "bg-emerald-400 text-black";

  const handleReschedule = () => alert("Open Reschedule Modal...");
  const handleCancel = () => alert("Open Cancel/Refund Escrow Modal...");

  return (
    <div className={`relative border-4 border-black dark:border-white p-5 rounded-xl flex flex-col justify-between transition-all ${
      isJoinable 
        ? "bg-white dark:bg-[#111] shadow-[6px_6px_0px_0px_#10b981] dark:shadow-[6px_6px_0px_0px_#34d399] border-emerald-500 dark:border-emerald-400" 
        : "bg-slate-50 dark:bg-neutral-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
    }`}>
      
      {/* Top Meta Row */}
      <div className="flex justify-between items-start mb-4 border-b-2 border-black/10 dark:border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border-2 border-black dark:border-white overflow-hidden bg-slate-200 flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${peer}`} alt={peer} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border-2 border-black dark:border-white ${roleBadge}`}>
                {role}
              </span>
            </div>
            <p className="text-sm font-black uppercase tracking-tight text-black dark:text-white">@{peer}</p>
          </div>
        </div>
        
        {/* Real-time Status Badge */}
        <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1.5 rounded-md border-2 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] ${
          isJoinable 
            ? "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950" 
            : "border-black/20 text-black/50 dark:border-white/20 dark:text-white/50 bg-white dark:bg-[#111]"
        }`}>
          {isJoinable && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
          {timeStatus}
        </div>
      </div>

      {/* Session Details */}
      <div className="mb-6">
        <h3 className="text-base md:text-lg font-black uppercase leading-tight text-black dark:text-white mb-2 line-clamp-2" title={topic}>
          {topic}
        </h3>
        <p className="text-xs font-bold text-black/60 dark:text-white/60 flex items-center gap-1.5 uppercase tracking-wider">
          <HiClock className="w-4 h-4 text-black dark:text-white" /> {duration} min session
        </p>
      </div>

      {/* Action Buttons Area (3-Column Grid) */}
      <div className="grid grid-cols-3 gap-2 mt-auto">
        
        {/* Join Button */}
        <button 
          disabled={!isJoinable}
          onClick={() => navigate(`/dashboard/session/${id}`)}
          className={`py-2.5 border-4 border-black dark:border-white font-black uppercase text-[9px] sm:text-[10px] tracking-tight rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 transition-all ${
            isJoinable 
              ? `bg-emerald-500 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-400 ${PRESS_ANIMATION}`
              : "bg-slate-200 dark:bg-neutral-800 text-black/40 dark:text-white/40 cursor-not-allowed"
          }`}
        >
          <HiVideoCamera className="w-4 h-4 md:mb-0 mb-0.5" />
          <span className="truncate">{isJoinable ? "Join" : "Locked"}</span>
        </button>

        {/* Reschedule Button */}
        <button 
          onClick={handleReschedule}
          className={`py-2.5 border-4 border-black dark:border-white bg-yellow-400 text-black font-black uppercase text-[9px] sm:text-[10px] tracking-tight rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 ${PRESS_ANIMATION}`}
        >
          <HiCalendar className="w-4 h-4 md:mb-0 mb-0.5" /> 
          <span className="truncate">Postpone</span>
        </button>

        {/* Cancel Button */}
        <button 
          onClick={handleCancel}
          className={`py-2.5 border-4 border-black dark:border-white bg-rose-500 text-white font-black uppercase text-[9px] sm:text-[10px] tracking-tight rounded-xl flex flex-col md:flex-row items-center justify-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-rose-400 ${PRESS_ANIMATION}`}
        >
          <HiX className="w-4 h-4 md:mb-0 mb-0.5" /> 
          <span className="truncate">Cancel</span>
        </button>

      </div>

    </div>
  );
}