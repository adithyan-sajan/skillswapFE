import React, { useState } from "react";
import { HiLockClosed, HiCash, HiRefresh, HiShieldExclamation } from "react-icons/hi";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";
const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

// Mock Escrow Data
const ACTIVE_ESCROWS = [
  { id: "ESC-9091", student: "@DevAlex", teacher: "@StudioMina", amount: 1.5, status: "In Progress", timeLocked: "2 hours ago" },
  { id: "ESC-9092", student: "@Pixel_Lord", teacher: "@Sora_99", amount: 2.5, status: "Awaiting Completion", timeLocked: "5 hours ago" },
  { id: "ESC-9093", student: "@Growth_Hacker", teacher: "@Lingo_Guru", amount: 1.2, status: "Disputed", timeLocked: "1 day ago" },
];

const FIAT_MINTS = [
  { id: "TX-4401", user: "@Student_X", fiat: "$20.00", tokens: 12, method: "Stripe", date: "Today, 10:42 AM" },
  { id: "TX-4402", user: "@Newbie_1", fiat: "$10.00", tokens: 5, method: "PayPal", date: "Today, 09:15 AM" },
  { id: "TX-4403", user: "@DevAlex", fiat: "$3.00", tokens: 1, method: "Apple Pay", date: "Yesterday, 14:20 PM" },
];

export default function AdminEscrow() {
  const [activeTab, setActiveTab] = useState("escrow"); 

  return (
    <main className="max-w-screen-2xl mx-auto w-full p-6 md:p-8 space-y-8 flex-grow flex flex-col">
      
      {/* 1. Page Header */}
      <div className="flex justify-between items-end border-b-4 border-black dark:border-white pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-orange-400 block mb-1">Financial Core</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter">The Vault</h2>
        </div>
        <button className={`px-4 py-2 bg-slate-100 dark:bg-neutral-800 text-black dark:text-white font-black uppercase text-xs rounded-xl border-2 border-black dark:border-white flex items-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
          <HiRefresh className="w-4 h-4" /> Sync Ledgers
        </button>
      </div>

      {/* 2. Top Treasury Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 flex flex-col justify-between ${SHARED_CARD_STYLE}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl border-2 border-black dark:border-white bg-indigo-100 dark:bg-orange-950/30 text-indigo-600 dark:text-orange-400">
              <HiLockClosed className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50">Locked in Escrow</span>
          </div>
          <span className="text-4xl font-black font-mono tracking-tighter text-indigo-600 dark:text-orange-400">
            1,402 <span className="text-lg text-black/40 dark:text-white/40">SKL</span>
          </span>
        </div>

        <div className={`p-6 flex flex-col justify-between ${SHARED_CARD_STYLE}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl border-2 border-black dark:border-white bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <HiCash className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50">Fiat Revenue (30d)</span>
          </div>
          <span className="text-4xl font-black font-mono tracking-tighter text-emerald-600 dark:text-emerald-400">
            $4,290.<span className="text-2xl">00</span>
          </span>
        </div>

        <div className={`p-6 flex flex-col justify-between bg-rose-500 text-white dark:text-black border-4 border-black dark:border-white rounded-xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff]`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl border-2 border-current bg-rose-600 dark:bg-rose-400">
              <HiShieldExclamation className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Disputed Funds</span>
          </div>
          <span className="text-4xl font-black font-mono tracking-tighter">
            24.5 <span className="text-lg opacity-80">SKL</span>
          </span>
        </div>
      </div>

      {/* 3. Ledger Views (Tabs) */}
      <div className={`flex-grow flex flex-col overflow-hidden ${SHARED_CARD_STYLE}`}>
        
        {/* Tab Buttons */}
        <div className="flex border-b-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900">
          <button 
            onClick={() => setActiveTab("escrow")}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-r-4 border-black dark:border-white transition-colors ${activeTab === "escrow" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black/50 dark:text-white/50 hover:bg-slate-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white"}`}
          >
            🔒 Active Escrows
          </button>
          <button 
            onClick={() => setActiveTab("fiat")}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === "fiat" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black/50 dark:text-white/50 hover:bg-slate-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white"}`}
          >
            💳 Fiat to Token Mints
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-x-auto w-full flex-grow">
          {activeTab === "escrow" ? (
            <table className="w-full text-left whitespace-nowrap">
              <thead className="border-b-2 border-black/20 dark:border-white/20 text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50">
                <tr>
                  <th className="px-6 py-4">Escrow ID</th>
                  <th className="px-6 py-4">Student (Buyer)</th>
                  <th className="px-6 py-4">Teacher (Seller)</th>
                  <th className="px-6 py-4">Amount Locked</th>
                  <th className="px-6 py-4">Time Locked</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-dashed divide-black/10 dark:divide-white/10 text-sm font-bold">
                {ACTIVE_ESCROWS.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                    <td className="px-6 py-4 text-indigo-600 dark:text-orange-400">{row.student}</td>
                    <td className="px-6 py-4 text-indigo-600 dark:text-orange-400">{row.teacher}</td>
                    <td className="px-6 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-black">🪙 {row.amount} SKL</td>
                    <td className="px-6 py-4 text-xs text-black/50 dark:text-white/50">{row.timeLocked}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${row.status === "Disputed" ? "bg-rose-400" : "bg-yellow-300 dark:bg-yellow-500 text-black"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left whitespace-nowrap">
              <thead className="border-b-2 border-black/20 dark:border-white/20 text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Fiat Paid</th>
                  <th className="px-6 py-4">Tokens Minted</th>
                  <th className="px-6 py-4">Gateway</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-dashed divide-black/10 dark:divide-white/10 text-sm font-bold">
                {FIAT_MINTS.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                    <td className="px-6 py-4 text-indigo-600 dark:text-orange-400">{row.user}</td>
                    <td className="px-6 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-black">{row.fiat}</td>
                    <td className="px-6 py-4 font-mono font-black">+ {row.tokens} SKL</td>
                    <td className="px-6 py-4 text-xs uppercase">{row.method}</td>
                    <td className="px-6 py-4 text-right text-xs text-black/50 dark:text-white/50">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </main>
  );
}