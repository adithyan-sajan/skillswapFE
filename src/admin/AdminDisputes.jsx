import React, { useState } from "react";
import { HiShieldExclamation, HiChatAlt2, HiCheckCircle, HiBan } from "react-icons/hi";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";
const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

// Mock Dispute Data
const MOCK_DISPUTES = [
  {
    id: "DSP-892",
    student: "Student_X",
    teacher: "Lingo_Guru",
    amount: 1.2,
    reason: "Teacher No-Show",
    date: "June 21, 2026",
    status: "Action Required",
    logs: [
      { type: "system", text: "Session ESC-9093 scheduled for 14:00 UTC", time: "12:00" },
      { type: "system", text: "Student_X joined the video room", time: "13:58" },
      { type: "msg", sender: "Student_X", text: "Hey, I'm in the room whenever you are ready!", time: "14:02" },
      { type: "msg", sender: "Student_X", text: "Everything okay? It's been 15 mins.", time: "14:15" },
      { type: "system", text: "Lingo_Guru did not connect. Room closed.", time: "14:30" },
      { type: "system", text: "Student_X flagged session for dispute.", time: "14:32" },
    ]
  },
  {
    id: "DSP-891",
    student: "MusicMan",
    teacher: "Tone_Craft",
    amount: 1.0,
    reason: "Poor Quality / Harassment",
    date: "June 20, 2026",
    status: "Action Required",
    logs: [
      { type: "system", text: "Session ESC-8812 started successfully", time: "09:00" },
      { type: "msg", sender: "Tone_Craft", text: "Your guitar is cheap, I can't help you fix that buzz.", time: "09:12" },
      { type: "msg", sender: "MusicMan", text: "Excuse me? You're supposed to teach me truss rod adjustments.", time: "09:13" },
      { type: "msg", sender: "Tone_Craft", text: "Waste of my time.", time: "09:15" },
      { type: "system", text: "Tone_Craft disconnected from the room.", time: "09:15" },
      { type: "system", text: "MusicMan flagged session for dispute.", time: "09:20" },
    ]
  }
];

export default function AdminDisputes() {
  const [activeCase, setActiveCase] = useState(MOCK_DISPUTES[0]);

  return (
    <main className="max-w-screen-2xl mx-auto w-full p-6 md:p-8 space-y-6 flex-grow flex flex-col h-[calc(100vh-5rem)]">
      
      {/* 1. Page Header */}
      <div className="flex justify-between items-end border-b-4 border-black dark:border-white pb-4 flex-shrink-0">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 dark:text-rose-400 block mb-1">Moderation Core</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Resolution Court</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-tight">Active Cases:</span>
          <span className="text-sm font-black uppercase bg-rose-500 text-white dark:bg-rose-500 dark:text-black px-3 py-1.5 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            {MOCK_DISPUTES.length}
          </span>
        </div>
      </div>

      {/* 2. Dual Pane Layout */}
      <div className="flex flex-col lg:flex-row gap-6 flex-grow overflow-hidden">
        
        {/* LEFT PANE: DISPUTE QUEUE */}
        <div className={`w-full lg:w-1/3 flex flex-col overflow-hidden ${SHARED_CARD_STYLE}`}>
          <div className="p-4 border-b-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900">
            <h3 className="text-sm font-black uppercase tracking-widest">Queue</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_DISPUTES.map((d) => (
              <div 
                key={d.id}
                onClick={() => setActiveCase(d)}
                className={`p-4 border-b-2 border-dashed border-black/20 dark:border-white/20 cursor-pointer transition-all ${activeCase.id === d.id ? "bg-black text-white dark:bg-white dark:text-black border-l-8 border-l-rose-500 dark:border-l-rose-500 border-solid" : "hover:bg-slate-100 dark:hover:bg-neutral-800"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{d.id}</span>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded border border-current">
                    {d.amount} SKL
                  </span>
                </div>
                <div className="text-xs font-bold uppercase mb-1">
                  <span className={activeCase.id === d.id ? "text-indigo-400 dark:text-indigo-600" : "text-indigo-600 dark:text-orange-400"}>@{d.student}</span> 
                  <span className="opacity-50 mx-1">vs</span> 
                  <span className={activeCase.id === d.id ? "text-indigo-400 dark:text-indigo-600" : "text-indigo-600 dark:text-orange-400"}>@{d.teacher}</span>
                </div>
                <div className={`text-[10px] font-black uppercase tracking-tight ${activeCase.id === d.id ? "text-rose-400 dark:text-rose-600" : "text-rose-600 dark:text-rose-400"}`}>
                  ⚠ {d.reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANE: EVIDENCE VIEWER & ACTIONS */}
        <div className={`w-full lg:w-2/3 flex flex-col overflow-hidden ${SHARED_CARD_STYLE}`}>
          
          {/* Case Header */}
          <div className="p-4 border-b-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                <HiShieldExclamation className="w-6 h-6 text-rose-500" />
                Case File: {activeCase.id}
              </h3>
              <p className="text-xs font-bold text-black/60 dark:text-white/60 uppercase mt-1">
                Reported on {activeCase.date}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest block opacity-50 mb-1">Frozen Escrow</span>
              <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">🪙 {activeCase.amount} SKL</span>
            </div>
          </div>

          {/* Audit Logs (Terminal-style) */}
          <div className="flex-1 bg-[#0a0a0a] dark:bg-[#050505] p-4 md:p-6 overflow-y-auto font-mono text-[11px] space-y-3">
            <div className="text-center mb-6">
              <span className="bg-white/10 text-white/50 px-3 py-1 rounded text-[9px] uppercase tracking-widest font-bold">
                --- System Audit Trail Generated ---
              </span>
            </div>

            {activeCase.logs.map((log, idx) => (
              <div key={idx} className={`flex gap-3 ${log.type === 'system' ? 'opacity-60' : 'opacity-100'}`}>
                <span className="text-white/40 flex-shrink-0 w-10 text-right">[{log.time}]</span>
                {log.type === "system" ? (
                  <span className="text-yellow-400/80 uppercase font-bold tracking-tight"> {log.text}</span>
                ) : (
                  <div>
                    <span className="text-indigo-400 font-bold uppercase mr-2">@{log.sender}:</span>
                    <span className="text-white">{log.text}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Adjudication Actions */}
          <div className="p-4 border-t-4 border-black dark:border-white bg-slate-100 dark:bg-neutral-900">
            <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 block mb-3 text-center md:text-left">
              Adjudication Actions (Irreversible)
            </span>
            <div className="flex flex-col sm:flex-row gap-3">
              
              {/* Refund Buyer */}
              <button className={`flex-1 py-3 px-4 bg-emerald-500 text-black border-2 border-black dark:border-white rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
                <HiCheckCircle className="w-5 h-5" />
                Refund @{activeCase.student}
              </button>

              {/* Pay Seller */}
              <button className={`flex-1 py-3 px-4 bg-indigo-600 text-white dark:bg-orange-400 dark:text-black border-2 border-black dark:border-white rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
                <HiChatAlt2 className="w-5 h-5" />
                Pay @{activeCase.teacher}
              </button>

              {/* Ban / Warn Offender */}
              <button className={`sm:flex-none py-3 px-4 bg-rose-600 text-white border-2 border-black dark:border-white rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
                <HiBan className="w-5 h-5" />
                <span className="sm:hidden">Penalize User</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}