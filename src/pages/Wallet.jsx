import React from "react";
import { HiArrowCircleDown, HiSwitchHorizontal, HiLightningBolt, HiStar } from "react-icons/hi";

const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150";

export default function Wallet() {
  const transactions = [
    { id: 1, type: "Credit", desc: "Teaching: React Hooks", amount: "+2.00 SKL", date: "June 08" },
    { id: 2, type: "Debit", desc: "Learning: Docker Ops", amount: "-1.50 SKL", date: "June 07" },
    { id: 3, type: "Purchase", desc: "Stripe Token Refill", amount: "+10.00 SKL", date: "June 01" },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      
      {/* 1. TOP DASHBOARD: BALANCE & STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Balance Card (Spans 2 columns) */}
        <div className="md:col-span-2 border-4 border-black dark:border-white p-8 bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 block mb-2">Available Escrow Balance</span>
            <h1 className="text-5xl font-black text-black dark:text-white">
              14.50 <span className="text-2xl text-indigo-600 dark:text-orange-400 font-bold">SKL</span>
            </h1>
          </div>
          
          <div className="flex gap-4 mt-8">
            <button className={`flex items-center gap-2 px-5 py-3 border-4 border-black dark:border-white font-black uppercase text-xs rounded-xl bg-black text-white dark:bg-white dark:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-slate-800 dark:hover:bg-slate-200 ${PRESS_ANIMATION}`}>
              <HiArrowCircleDown className="w-5 h-5 stroke-[1.5]" /> Send To Peer
            </button>
          </div>
        </div>

        {/* Premium Status Card */}
        <div className="border-4 border-black dark:border-white p-6 bg-slate-50 dark:bg-neutral-900 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-center text-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-black dark:border-white bg-yellow-400 flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <HiStar className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white">Free Tier</h3>
          <p className="text-xs font-bold text-black/60 dark:text-white/60 mt-2 mb-4 leading-relaxed">
            Upgrade to Premium for free swaps, a verified instructor badge, and priority search listing.
          </p>
          <button className={`w-full py-2.5 border-4 border-black dark:border-white font-black uppercase text-xs tracking-widest rounded-lg bg-indigo-600 text-white dark:bg-orange-400 dark:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:opacity-90 ${PRESS_ANIMATION}`}>
            Upgrade ($15/mo)
          </button>
        </div>
      </div>

      {/* 2. STRIPE CREDIT PURCHASE (TOKEN BUNDLES) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
            <HiLightningBolt className="text-yellow-500 w-5 h-5" /> Fast-Track Tokens
          </h3>
          <span className="text-[10px] font-bold uppercase text-black/50 dark:text-white/50 bg-slate-100 dark:bg-neutral-800 px-2 py-1 border-2 border-black/10 dark:border-white/10 rounded">Via Stripe Checkout</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { tokens: 5, price: 10, label: "Starter" },
            { tokens: 15, price: 25, label: "Popular", highlight: true },
            { tokens: 50, price: 80, label: "Pro" }
          ].map((bundle, idx) => (
            <div key={idx} className={`relative border-4 border-black dark:border-white p-6 rounded-xl flex flex-col items-center text-center transition-all ${bundle.highlight ? 'bg-indigo-50 dark:bg-orange-950/20 shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316] -translate-y-1' : 'bg-white dark:bg-[#111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'}`}>
              {bundle.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Best Value</span>
              )}
              <span className="text-3xl font-black text-black dark:text-white mt-2">{bundle.tokens} <span className="text-sm">SKL</span></span>
              <span className="text-xs font-bold text-black/50 dark:text-white/50 mt-1 uppercase tracking-widest">{bundle.label}</span>
              <button className={`mt-6 w-full py-2 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-black uppercase text-[10px] tracking-widest rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-slate-800 dark:hover:bg-slate-200 ${PRESS_ANIMATION}`}>
                Buy for ${bundle.price}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRANSACTION HISTORY */}
      <section className="space-y-4 pt-4 border-t-4 border-black/10 dark:border-white/10">
        <h3 className="text-sm font-black uppercase tracking-wider text-black dark:text-white">Ledger History</h3>
        <div className="border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl overflow-hidden divide-y-4 divide-black dark:divide-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-4 bg-white dark:bg-[#111] hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 border-2 border-black dark:border-white rounded-lg ${tx.type === 'Purchase' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-slate-100 dark:bg-neutral-800'}`}>
                  {tx.type === "Purchase" ? <HiLightningBolt className="text-lg text-yellow-600 dark:text-yellow-400" /> : <HiSwitchHorizontal className="text-lg text-black dark:text-white" />}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-tight text-black dark:text-white">{tx.desc}</p>
                  <p className="text-[10px] font-black text-black/40 dark:text-white/40">{tx.date} • {tx.type}</p>
                </div>
              </div>
              <span className={`font-black text-sm uppercase ${tx.type === "Debit" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}