import React from "react";
import { HiCreditCard, HiArrowCircleUp, HiArrowCircleDown, HiSwitchHorizontal } from "react-icons/hi";

export default function Wallet() {
  const transactions = [
    { id: 1, type: "Credit", desc: "Teaching: React Hooks", amount: "+50.00", date: "June 08" },
    { id: 2, type: "Debit", desc: "Learning: Docker Ops", amount: "-25.00", date: "June 07" },
  ];

  return (
    <div className="space-y-10">
      {/* 1. BALANCE CARD */}
      <div className="border-4 border-black dark:border-white p-8 bg-white dark:bg-[#151515] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
        <span className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Total Balance</span>
        <h1 className="text-5xl font-black mt-2 mb-6">1,240.50 <span className="text-2xl text-black/40">SKL</span></h1>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-black font-black uppercase text-xs hover:bg-black hover:text-white transition-all">
            <HiArrowCircleUp /> Deposit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-black font-black uppercase text-xs hover:bg-black hover:text-white transition-all">
            <HiArrowCircleDown /> Withdraw
          </button>
        </div>
      </div>

      {/* 2. TRANSACTION HISTORY */}
      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider">Transaction History</h3>
        <div className="border-2 border-black dark:border-white bg-white dark:bg-[#151515] divide-y-2 divide-black dark:divide-white">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              <div className="flex items-center gap-4">
                <HiSwitchHorizontal className="text-xl" />
                <div>
                  <p className="text-xs font-black uppercase">{tx.desc}</p>
                  <p className="text-[10px] font-bold text-black/40 dark:text-white/40">{tx.date}</p>
                </div>
              </div>
              <span className={`font-black ${tx.type === "Credit" ? "text-emerald-600" : "text-red-600"}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}