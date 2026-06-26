import React, { useState } from "react";
import { HiVideoCamera, HiCheck, HiShieldExclamation, HiX } from "react-icons/hi";
import { markComplete, raiseDispute } from "../services/AllApi";
import { useNavigate } from "react-router-dom"; // 🚨 ADD THIS

const PRESS_ANIMATION = "active:translate-x-[1px] active:translate-y-[1px] active:shadow-none";

export default function SessionCard({ session, role, peerName, onUpdate }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disputeMode, setDisputeMode] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");

  const handleComplete = async () => {
    if (!window.confirm("Are you sure you want to mark this session as complete and release the escrow?")) return;
    setIsSubmitting(true);
    try {
      await markComplete(session._id);
      onUpdate(); // Tell the Dashboard to refresh!
    } catch (error) {
      alert(error.response?.data?.message || "Failed to mark complete.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDispute = async () => {
    if (!disputeReason.trim()) return alert("Please provide a reason for the dispute.");
    setIsSubmitting(true);
    try {
      await raiseDispute(session._id, disputeReason);
      setDisputeMode(false);
      onUpdate();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit dispute.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to format date
  const timeString = new Date(session.scheduledStartTime).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 border-4 border-black dark:border-white bg-slate-50 dark:bg-[#151515] rounded-xl flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all">
      {/* HEADER: Badges & Time */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${role === "Teacher" ? "bg-indigo-600 text-white dark:bg-orange-400 dark:text-black" : "bg-emerald-500 text-black"}`}>{role}</span>
            <span className="text-[10px] font-black px-2 py-0.5 bg-yellow-300 dark:bg-zinc-800 border-2 border-black dark:border-white rounded text-black dark:text-white uppercase">Escrow: {session.escrowAmount} SKL</span>
          </div>
          <span className="text-[10px] font-black uppercase text-black/60 dark:text-white/60 tracking-wider">{timeString}</span>
        </div>

        {/* Dynamic Status Badge */}
        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded border-2 border-black dark:border-white ${session.status === "completed" ? "bg-emerald-200 text-emerald-900" : session.status === "disputed" ? "bg-rose-200 text-rose-900" : "bg-white dark:bg-neutral-800 text-black dark:text-white"}`}>{session.status}</span>
      </div>

      {/* BODY: Topic & Peer */}
      <div>
        <h4 className="text-lg font-black uppercase leading-tight text-black dark:text-white mb-1">{session.skillId?.title || "Skill Exchange"}</h4>
        <p className="text-xs font-bold text-black/80 dark:text-white/80">
          with <span className="underline">@{peerName}</span>
        </p>
      </div>

      {/* FOOTER ACTIONS (Only show if pending/active) */}
      {(session.status === "pending" || session.status === "active") && !disputeMode && (
        <div className="flex gap-2 pt-2 mt-2 border-t-2 border-black/10 dark:border-white/10">
          <button onClick={() => navigate(`/dashboard/session/${session.roomId}`)}className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 bg-white dark:bg-neutral-800 text-black dark:text-white font-black text-[10px] uppercase rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] transition-all hover:bg-slate-100 dark:hover:bg-neutral-700 ${PRESS_ANIMATION}`}>
            <HiVideoCamera className="w-4 h-4 text-indigo-600 dark:text-orange-400" /> Enter Matrix
          </button>

          <button onClick={handleComplete} disabled={isSubmitting} className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 bg-emerald-500 text-white dark:text-black font-black text-[10px] uppercase rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] transition-all disabled:opacity-50 ${PRESS_ANIMATION}`}>
            <HiCheck className="w-4 h-4" /> Sign Off
          </button>

          <button onClick={() => setDisputeMode(true)} className={`px-3 py-2.5 bg-rose-500 text-white font-black text-[10px] uppercase rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] transition-all ${PRESS_ANIMATION}`}>
            <HiShieldExclamation className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* DISPUTE MODE INLINE UI */}
      {disputeMode && (
        <div className="pt-2 mt-2 border-t-2 border-rose-500/50 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400">Initiate Dispute Protocol</span>
            <button onClick={() => setDisputeMode(false)} className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white">
              <HiX className="w-4 h-4" />
            </button>
          </div>
          <input type="text" placeholder="Reason for dispute..." value={disputeReason} onChange={(e) => setDisputeReason(e.target.value)} className="w-full px-3 py-2 border-2 border-black dark:border-white rounded text-xs font-bold bg-white dark:bg-[#111] outline-none" />
          <button onClick={handleDispute} disabled={isSubmitting} className={`w-full py-2 bg-rose-500 text-white font-black uppercase text-[10px] rounded border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] disabled:opacity-50 ${PRESS_ANIMATION}`}>
            {isSubmitting ? "Freezing..." : "Freeze Escrow"}
          </button>
        </div>
      )}

      {/* STATUS MESSAGES */}
      {session.status === "completed" && <div className="pt-2 mt-2 border-t-2 border-emerald-500/30 text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 text-center">✅ Contract Fulfilled. Escrow Released.</div>}

      {session.status === "disputed" && <div className="pt-2 mt-2 border-t-2 border-rose-500/30 text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 text-center">⚠️ Funds Frozen. Admin Reviewing.</div>}
    </div>
  );
}
