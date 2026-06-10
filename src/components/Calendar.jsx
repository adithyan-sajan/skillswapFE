import React, { useState } from "react";
import { HiClock } from "react-icons/hi";

export default function Calendar() {
  const [timelineTab, setTimelineTab] = useState("future");

  const historySessions = {
    future: [
      { id: "S-902", topic: "Figma Layouts", date: "June 10", role: "Student" },
      { id: "S-844", topic: "Docker Basics", date: "June 11", role: "Teacher" },
    ],
    past: [
      { id: "S-711", topic: "React State Hooks", date: "May 28", role: "Student" },
      { id: "S-690", topic: "Intro to Tailwind", date: "May 15", role: "Teacher" },
    ]
  };

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const activeDays = [10, 11];

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-[#151515] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] space-y-4">
      
      <div className="flex justify-between items-center bg-slate-100 dark:bg-neutral-800 p-2 border border-black dark:border-white/20">
        <span className="text-xs font-black uppercase">June 2026</span>
        <span className="text-[10px] font-bold text-black/40 dark:text-white/40">MON - SUN GRID</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold">
        {calendarDays.map((day) => {
          const isBooked = activeDays.includes(day);
          return (
            <div 
              key={day} 
              className={`p-1.5 border transition-all ${
                isBooked 
                  ? "bg-blue-600 text-white dark:bg-orange-400 dark:text-black font-black border-black dark:border-white scale-105" 
                  : "border-black/10 dark:border-white/10 text-black/40 dark:text-white/30"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 border-t-2 border-black dark:border-white/30 pt-4 gap-2">
        <button 
          onClick={() => setTimelineTab("future")}
          className={`py-1.5 text-[11px] font-black uppercase border-2 transition-all ${
            timelineTab === "future" 
              ? "bg-black text-white dark:bg-white dark:text-black border-black" 
              : "border-transparent text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
          }`}
        >
          Upcoming Slots
        </button>
        <button 
          onClick={() => setTimelineTab("past")}
          className={`py-1.5 text-[11px] font-black uppercase border-2 transition-all ${
            timelineTab === "past" 
              ? "bg-black text-white dark:bg-white dark:text-black border-black" 
              : "border-transparent text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
          }`}
        >
          Past Logs
        </button>
      </div>

      <div className="space-y-2 max-h-40 overflow-y-auto pt-1">
        {historySessions[timelineTab].map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-dashed border-black/20 dark:border-white/20 p-2 text-[11px]">
            <div className="flex items-center gap-2">
              <HiClock className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />
              <span className="font-black uppercase tracking-tight">{item.topic}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-black/50 dark:text-white/40 uppercase bg-slate-100 dark:bg-neutral-800 px-1 py-0.5">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}