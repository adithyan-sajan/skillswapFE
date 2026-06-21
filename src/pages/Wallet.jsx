import React from "react";
import { HiArrowCircleUp, HiArrowCircleDown, HiSwitchHorizontal } from "react-icons/hi";

export default function Wallet() {
  const transactions = [
    { id: 1, type: "Credit", desc: "Teaching: React Hooks", amount: "+50.00 SKL", date: "June 08" },
    { id: 2, type: "Debit", desc: "Learning: Docker Ops", amount: "-25.00 SKL", date: "June 07" },
  ];

  return (
    <div className="space-y-10">
      {/* 1. BALANCE CARD */}
      <div className="border-4 border-black dark:border-white p-8 bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]">
        <span className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Total Balance</span>
        <h1 className="text-5xl font-black mt-2 mb-6">
          1,240.50 <span className="text-2xl text-black/40 dark:text-white/40 font-bold">SKL</span>
        </h1>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-black dark:border-white font-black uppercase text-xs rounded-xl bg-white dark:bg-[#111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:scale-95">
            <HiArrowCircleUp className="w-4 h-4 stroke-[1.5]" /> Deposit
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-black dark:border-white font-black uppercase text-xs rounded-xl bg-white dark:bg-[#111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:scale-95">
            <HiArrowCircleDown className="w-4 h-4 stroke-[1.5]" /> Withdraw
          </button>
        </div>
      </div>

      {/* 2. TRANSACTION HISTORY */}
      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider">Transaction History</h3>
        <div className="border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl overflow-hidden divide-y-4 divide-black dark:divide-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-4 bg-white dark:bg-[#111] hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 border-2 border-black dark:border-white bg-slate-100 dark:bg-neutral-800 rounded-lg">
                  <HiSwitchHorizontal className="text-lg stroke-1" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-tight text-black dark:text-white">{tx.desc}</p>
                  <p className="text-[10px] font-black text-black/40 dark:text-white/40">{tx.date}</p>
                </div>
              </div>
              <span className={`font-black text-sm uppercase ${tx.type === "Credit" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}