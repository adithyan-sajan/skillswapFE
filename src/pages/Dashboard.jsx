import React from "react";
import { HiCalendar, HiAcademicCap, HiTrendingUp, HiBadgeCheck } from "react-icons/hi";

import Calendar from "../components/Calendar";
import SessionCard from "../components/SessionCard";

// Single consistent vibrant shadow color and perfect rounded-xl alignment
const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";

export default function Dashboard() {
  const stats = [
    { label: "Hours Learned", value: "14 Hours", icon: HiAcademicCap, color: "text-indigo-600 dark:text-orange-400" },
    { label: "Hours Taught", value: "10 Hours", icon: HiTrendingUp, color: "text-emerald-500" },
    { label: "Confirmed Events", value: "2 Sessions", icon: HiCalendar, color: "text-purple-500" },
  ];

  const upcomingSessions = [
    { id: "S-902", role: "Student", topic: "Advanced Auto-Layout in Figma", partner: "StudioMina", time: "Today at 20:00 UTC", status: "Confirmed" },
    { id: "S-844", role: "Instructor", topic: "Intro to Docker Containers", partner: "DevAlex", time: "Tomorrow at 14:30 UTC", status: "Confirmed" },
  ];

  return (
    <div className="space-y-10">
      {/* 1. HERO BANNER AREA */}
      <div className={`p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 ${SHARED_CARD_STYLE}`}>
        <div className="space-y-3">
          {/* Fixed corner nesting here with rounded-lg */}
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase bg-black text-white dark:bg-white dark:text-black px-2.5 py-1 border border-black dark:border-transparent rounded-lg">
            <HiBadgeCheck className="w-4 h-4 text-indigo-400 dark:text-orange-500" />
            <span>Status: Active Member</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Welcome Back, Alex_Baker</h1>
          <p className="text-xs font-black text-black/70 dark:text-white/70 max-w-xl leading-relaxed uppercase">Your profile is active. Check your timetable below or look for a new session swap.</p>
        </div>

        {/* Unified shadow and rounded corners */}
        <div className="border-4 border-black dark:border-white rounded-xl p-4 text-center md:w-48 bg-yellow-300 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] flex-shrink-0">
          <span className="text-[10px] font-black uppercase text-black dark:text-white/50 block tracking-wider">Member Rating</span>
          <span className="text-2xl font-black block mt-1 text-black dark:text-emerald-400 font-mono">4.9 / 5.0</span>
        </div>
      </div>

      {/* 2. TOP METRIC COUNTERS ROW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`p-5 flex items-center justify-between ${SHARED_CARD_STYLE}`}>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-black/50 dark:text-white/40 block tracking-wide">{stat.label}</span>
                <span className="text-xl font-black uppercase font-mono tracking-tight block">{stat.value}</span>
              </div>
              <div className="p-2 border-2 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 rounded-xl">
                <Icon className={`w-7 h-7 ${stat.color} flex-shrink-0`} />
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. CORE TWO-COLUMN INTERACTION SYSTEM */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: UPCOMING SESSIONS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center border-b-4 border-black dark:border-white pb-3">
            <h3 className="text-sm font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded-md">⚡ Timetable</h3>
            <span className="text-xs font-mono font-black text-white bg-red-500 border-2 border-black px-2 py-0.5 rounded-md">Total: {upcomingSessions.length}</span>
          </div>

          <div className="space-y-5">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} {...session} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CALENDAR */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b-4 border-black dark:border-white pb-3">
            <h3 className="text-sm font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 inline-block rounded-md">📅 Calendar</h3>
          </div>
          <div className={`p-4 ${SHARED_CARD_STYLE}`}>
            <Calendar />
          </div>
        </div>
      </section>
    </div>
  );
}