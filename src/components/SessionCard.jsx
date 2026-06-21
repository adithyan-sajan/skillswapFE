import React from "react";
import { HiArrowSmRight } from "react-icons/hi";

// Shared container style with your single vibrant shadow color
const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";

export default function SessionCard({ id, role, topic, partner, time, status }) {
  return (
    <div className={`p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden ${SHARED_CARD_STYLE}`}>
      <div className={`absolute top-0 left-0 text-[8px] font-bold uppercase px-2 py-0.5 rounded-br-lg border-b-2 border-r-2 border-black dark:border-white ${
        role === "Student" ? "bg-indigo-600 text-white" : "bg-purple-600 text-white"
      }`}>
        {role}
      </div>

      <div className="pt-2 space-y-1">
        <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">{topic}</h4>
        <p className="text-xs font-medium text-slate-500 dark:text-neutral-400">
          With Partner: <span className="text-slate-800 dark:text-neutral-200 font-bold">@{partner}</span> — {time}
        </p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t-2 md:border-t-0 border-dashed border-black dark:border-white pt-3 md:pt-0">
        <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 rounded-lg uppercase tracking-tight text-emerald-600 dark:text-emerald-400">
          ✓ {status}
        </span>
        <button className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#111] hover:bg-slate-50 dark:hover:bg-neutral-900 rounded-xl text-slate-700 dark:text-neutral-300 active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          <HiArrowSmRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}