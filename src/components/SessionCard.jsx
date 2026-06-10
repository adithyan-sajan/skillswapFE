// src/components/SessionCard.jsx
import React from "react";
import { HiArrowSmRight } from "react-icons/hi";

export default function SessionCard({ id, role, topic, partner, time, status }) {
  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-[#151515] p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
      <div className={`absolute top-0 left-0 text-[8px] font-black uppercase px-2 py-0.5 border-b border-r border-black dark:border-white ${
        role === "Student" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
      }`}>
        {role}
      </div>

      <div className="pt-2 space-y-1">
        <h4 className="text-base font-black uppercase tracking-tight">{topic}</h4>
        <p className="text-xs font-bold text-black/50 dark:text-white/40">
          With Partner: <span className="text-black dark:text-white font-black">@{partner}</span> — {time}
        </p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-dashed border-black/20 dark:border-white/20 pt-3 md:pt-0">
        <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-neutral-800 border border-black dark:border-white/30 uppercase tracking-tight text-emerald-600 dark:text-emerald-400">
          ✓ {status}
        </span>
        <button className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] transition-all">
          <HiArrowSmRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}