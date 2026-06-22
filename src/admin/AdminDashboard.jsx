import React from "react";
import { HiArrowUp, HiArrowDown, HiUsers, HiCurrencyDollar, HiScale, HiShieldCheck } from "react-icons/hi";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";
const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

// Reusable Metric Block Component
const MetricBlock = ({ title, value, trend, isPositive, icon: Icon, color }) => (
  <div className={`p-6 flex flex-col justify-between ${SHARED_CARD_STYLE}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-[#111] ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-black uppercase px-2 py-1 rounded-lg border-2 border-black dark:border-white ${isPositive ? 'bg-emerald-400 text-black' : 'bg-rose-400 text-black'}`}>
        {isPositive ? <HiArrowUp className="w-3 h-3" /> : <HiArrowDown className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <div>
      <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 block mb-1">
        {title}
      </span>
      <span className="text-3xl font-black font-mono tracking-tighter">
        {value}
      </span>
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <main className="max-w-screen-2xl mx-auto w-full p-6 md:p-8 space-y-8 flex-grow flex flex-col">
      
      {/* 1. Page Title & Live Badge */}
      <div className="flex justify-between items-end border-b-4 border-black dark:border-white pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-orange-400 block mb-1">Platform Status</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Global Overview</h2>
        </div>
        <span className="text-xs font-black uppercase bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 rounded-lg border-2 border-black dark:border-white">
          Live Data
        </span>
      </div>

      {/* 2. Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricBlock 
          title="Total Active Users" 
          value="14,208" 
          trend="12%" 
          isPositive={true} 
          icon={HiUsers} 
          color="text-indigo-600 dark:text-orange-400" 
        />
        <MetricBlock 
          title="SKL In Circulation" 
          value="89,450" 
          trend="5.2%" 
          isPositive={true} 
          icon={HiCurrencyDollar} 
          color="text-emerald-500" 
        />
        <MetricBlock 
          title="Active Escrows" 
          value="1,402" 
          trend="2.1%" 
          isPositive={false} 
          icon={HiScale} 
          color="text-purple-500" 
        />
        <MetricBlock 
          title="Open Disputes" 
          value="12" 
          trend="4" 
          isPositive={false} 
          icon={HiShieldCheck} 
          color="text-rose-500" 
        />
      </div>

      {/* 3. Action Logs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Fiat Purchases */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-3 py-1 inline-block rounded-lg border-2 border-black dark:border-white">
            💰 Fiat Ledger (Recent)
          </h3>
          <div className={`p-0 overflow-hidden ${SHARED_CARD_STYLE}`}>
            <table className="w-full text-left text-xs font-bold uppercase">
              <thead className="border-b-4 border-black dark:border-white bg-slate-100 dark:bg-neutral-900">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-dashed divide-black/20 dark:divide-white/20 bg-white dark:bg-[#111]">
                {[
                  { user: "@DevAlex", pack: "Deep Dive", amt: "$20.00" },
                  { user: "@StudioMina", pack: "Learner", amt: "$10.00" },
                  { user: "@Pixel_Lord", pack: "Trial", amt: "$3.00" },
                  { user: "@Growth_H", pack: "Deep Dive", amt: "$20.00" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors">
                    <td className="px-4 py-3 text-indigo-600 dark:text-orange-400">{row.user}</td>
                    <td className="px-4 py-3">{row.pack}</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600 dark:text-emerald-400">{row.amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dispute Queue */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest bg-rose-500 text-white dark:text-black px-3 py-1 inline-block rounded-lg border-2 border-black dark:border-white">
            🛡️ Escrow Disputes
          </h3>
          <div className={`p-4 space-y-3 ${SHARED_CARD_STYLE}`}>
            {[
              { id: "DSP-892", users: "@Lingo_Guru vs @Student_X", reason: "No Show", status: "Review" },
              { id: "DSP-891", users: "@Tone_Craft vs @MusicMan", reason: "Quality", status: "Review" },
            ].map((dispute, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-3 border-2 border-black dark:border-white rounded-xl bg-slate-50 dark:bg-neutral-900">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 block mb-1">{dispute.id}</span>
                  <span className="text-xs font-black uppercase block">{dispute.users}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase px-2 py-1 bg-yellow-400 text-black rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    {dispute.reason}
                  </span>
                  <button className={`px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black text-[10px] font-black uppercase rounded-lg border-2 border-black dark:border-white hover:opacity-90 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`}>
                    Resolve
                  </button>
                </div>
              </div>
            ))}
            <button className={`w-full py-3 text-xs font-black uppercase border-2 border-dashed border-black/40 dark:border-white/40 rounded-xl text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-solid hover:border-black dark:hover:border-white transition-all ${PRESS_ANIMATION}`}>
              View All 12 Disputes
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}