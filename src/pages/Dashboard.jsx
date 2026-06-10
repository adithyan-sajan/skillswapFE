import React from "react";
import { HiCalendar, HiAcademicCap, HiTrendingUp, HiBadgeCheck } from "react-icons/hi";

// Import your custom isolated sub-components
import Calendar from "../components/Calendar";
import SessionCard from "../components/SessionCard";

export default function Dashboard() {
  // High utility operational metrics configuration
  const stats = [
    { label: "Hours Learned", value: "14 Hours", icon: HiAcademicCap, color: "text-blue-600 dark:text-orange-400" },
    { label: "Hours Taught", value: "10 Hours", icon: HiTrendingUp, color: "text-emerald-500" },
    { label: "Confirmed Events", value: "2 Sessions", icon: HiCalendar, color: "text-purple-500" },
  ];

  // Primary active dataset for upcoming appointments queue
  const upcomingSessions = [
    { id: "S-902", role: "Student", topic: "Advanced Auto-Layout in Figma", partner: "StudioMina", time: "Today at 20:00 UTC", status: "Confirmed" },
    { id: "S-844", role: "Instructor", topic: "Intro to Docker Containers", partner: "DevAlex", time: "Tomorrow at 14:30 UTC", status: "Confirmed" },
  ];

  return (
    <div className="space-y-10">
      {/* 1. WELCOME BANNER AREA */}
      <div className="border-4 border-black dark:border-white p-6 md:p-8 bg-slate-50 dark:bg-zinc-900/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-600 dark:text-orange-400">
            <HiBadgeCheck className="w-4 h-4" />
            <span>Verified Exchange Member</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Welcome Back, Alex_Baker</h1>
          <p className="text-xs font-bold text-black/60 dark:text-white/60 max-w-xl leading-relaxed">Your profile is currently active in the community directory. Check your confirmed timetable below or jump into the exchange index to schedule a new session.</p>
        </div>

        <div className="border-2 border-dashed border-black/30 dark:border-white/30 p-4 text-center md:w-48 bg-white dark:bg-zinc-950 flex-shrink-0">
          <span className="text-[10px] font-black uppercase text-black/40 dark:text-white/40 block">Member Rating</span>
          <span className="text-2xl font-black block mt-1 text-emerald-500">4.9 / 5.0</span>
        </div>
      </div>

      {/* 2. TOP METRIC COUNTERS ROW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="border-2 border-black dark:border-white bg-white dark:bg-[#111] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-black/40 dark:text-white/40 block">{stat.label}</span>
                <span className="text-xl font-black uppercase tracking-tight block">{stat.value}</span>
              </div>
              <Icon className={`w-8 h-8 ${stat.color} flex-shrink-0`} />
            </div>
          );
        })}
      </section>

      {/* 3. CORE TWO-COLUMN WORK DESK LAYER */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: UPCOMING SESSIONS */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center border-b-2 border-black dark:border-white pb-2">
            {/* 🎯 Changed to normal plain English text */}
            <h3 className="text-sm font-black uppercase tracking-wider">Upcoming Sessions</h3>
            <span className="text-[10px] font-bold text-black/40 dark:text-white/40">TOTAL: {upcomingSessions.length}</span>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} {...session} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CALENDAR SCHEDULER */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b-2 border-black dark:border-white pb-2">
            {/* 🎯 Changed to normal plain English text */}
            <h3 className="text-sm font-black uppercase tracking-wider">Your Calendar</h3>
          </div>
          <Calendar />
        </div>
      </section>
    </div>
  );
}
