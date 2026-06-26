import React, { useState, useEffect } from "react";
import { HiCalendar, HiAcademicCap, HiTrendingUp, HiBadgeCheck, HiInbox, HiServer, HiPlus } from "react-icons/hi";

import Calendar from "../components/Calendar";
import SessionCard from "../components/SessionCard";
import CreateListingModal from "../components/CreateListingModal";

// 1. IMPORT YOUR AUTH AND API SERVICES
import { useAuth } from "../context/AuthContext";
import { getMyListings, getMyRequests, updateSwapRequest } from "../services/AllApi";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";

export default function Dashboard() {
  const { user } = useAuth(); // Need this to know if a request is Incoming or Outgoing
  
  // STATE: Active Nodes
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [myNodes, setMyNodes] = useState([]);
  const [isLoadingNodes, setIsLoadingNodes] = useState(true);

  // STATE: Comm Link (Swap Requests)
  const [commRequests, setCommRequests] = useState([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);

  // FETCH: Active Nodes
  const fetchMyNodes = async () => {
    try {
      setIsLoadingNodes(true);
      const response = await getMyListings();
      setMyNodes(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard nodes:", error);
    } finally {
      setIsLoadingNodes(false);
    }
  };

  // FETCH: Swap Requests
  const fetchRequests = async () => {
    try {
      setIsLoadingRequests(true);
      const response = await getMyRequests();
      setCommRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setIsLoadingRequests(false);
    }
  };

  // ACTION: Accept or Reject Request
  const handleRequestAction = async (requestId, status) => {
    try {
      await updateSwapRequest(requestId, status);
      fetchRequests(); // Refresh the list immediately
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update request.");
    }
  };

  useEffect(() => {
    fetchMyNodes();
    fetchRequests();
  }, []);

  const stats = [
    { label: "Hours Learned", value: "14 Hours", icon: HiAcademicCap, color: "text-indigo-600 dark:text-orange-400" },
    { label: "Hours Taught", value: "10 Hours", icon: HiTrendingUp, color: "text-emerald-500" },
    { label: "Confirmed Events", value: "2 Sessions", icon: HiCalendar, color: "text-purple-500" },
  ];

  const now = new Date();
  const liveTime = new Date(now.getTime() + 2 * 60000).toISOString();
  const futureTime = new Date(now.getTime() + 24 * 60 * 60000).toISOString();

  const upcomingSessions = [
    { id: "room_789xyz", role: "Student", topic: "Advanced Auto-Layout in Figma", peer: "StudioMina", startTime: liveTime, duration: 60 },
    { id: "room_456abc", role: "Teacher", topic: "Intro to Docker Containers", peer: "DevAlex", startTime: futureTime, duration: 30 },
  ];

  return (
    <div className="space-y-10 mb-5 max-w-[1400px] mx-auto">
      {/* ATTACH THE MODAL */}
      <CreateListingModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={fetchMyNodes} />

      {/* 1. HERO BANNER */}
      <div className={`p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 ${SHARED_CARD_STYLE}`}>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase bg-black text-white dark:bg-white dark:text-black px-2.5 py-1 border border-black dark:border-transparent rounded-lg">
            <HiBadgeCheck className="w-4 h-4 text-indigo-400 dark:text-orange-500" />
            <span>Status: Active Member</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Welcome Back, {user?.username || "Hacker"}</h1>
          <p className="text-xs font-black text-black/70 dark:text-white/70 max-w-xl leading-relaxed uppercase">Check your timetable, manage requests, or prep for your next session.</p>
        </div>

        <div className="border-4 border-black dark:border-white rounded-xl p-4 text-center md:w-48 bg-yellow-300 dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] flex-shrink-0">
          <span className="text-[10px] font-black uppercase text-black dark:text-white/50 block tracking-wider">Member Rating</span>
          <span className="text-2xl font-black block mt-1 text-black dark:text-emerald-400 font-mono">{user?.rating?.toFixed(1) || "5.0"} / 5.0</span>
        </div>
      </div>

      {/* 2. METRICS ROW */}
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

      {/* 3. CORE THREE-COLUMN INTERACTION SYSTEM */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start pb-12">
        
        {/* COLUMN 1: DYNAMIC COMM LINK (Swap Requests) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b-4 border-black dark:border-white pb-3">
            <h3 className="text-sm font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded-md flex items-center gap-2">
              <HiInbox className="w-4 h-4" /> Comm Link
            </h3>
          </div>

          <div className="space-y-4">
            {isLoadingRequests ? (
              <div className="text-xs font-bold text-center py-4 uppercase animate-pulse">Scanning Frequencies...</div>
            ) : commRequests.length === 0 ? (
              <div className="p-4 border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl text-center text-[10px] font-bold uppercase">
                Comm link is quiet.
              </div>
            ) : (
              commRequests.map((req) => {
                // Determine if we sent this request or received it
                const isIncoming = req.receiverId._id === user?._id; 
                const peerName = isIncoming ? req.senderId.username : req.receiverId.username;

                return (
                  <div key={req._id} className="p-4 border-4 border-black dark:border-white bg-slate-50 dark:bg-[#151515] rounded-xl flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    <div className="text-sm font-bold flex flex-col gap-1.5 text-black/90 dark:text-white/90">
                      <span className={`w-max px-2 py-0.5 rounded text-[10px] font-black uppercase border-2 border-black ${isIncoming ? "bg-indigo-600 text-white dark:bg-orange-400 dark:text-black" : "bg-neutral-800 text-white dark:bg-white dark:text-black"}`}>
                        {isIncoming ? "Received Request" : "Sent Request"}
                      </span>
                      <span className="leading-tight">
                        <strong className="text-black dark:text-white font-black underline">@{peerName}</strong> requested <strong className="font-black text-indigo-700 dark:text-orange-400">{req.listingId?.title || "Skill"}</strong>
                      </span>
                      {req.message && (
                         <span className="text-[10px] bg-black/5 dark:bg-white/5 p-2 rounded italic mt-1">"{req.message}"</span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 w-full mt-2">
                      {isIncoming && req.status === 'Pending' ? (
                        <>
                          <button onClick={() => handleRequestAction(req._id, 'Accepted')} className="flex-1 px-2 py-2 bg-emerald-500 text-white font-black text-[10px] uppercase rounded-lg border-2 border-black hover:translate-y-[2px] hover:shadow-none shadow-[2px_2px_0px_0px_#000] transition-all">Accept</button>
                          <button onClick={() => handleRequestAction(req._id, 'Rejected')} className="flex-1 px-2 py-2 bg-rose-500 text-white font-black text-[10px] uppercase rounded-lg border-2 border-black hover:translate-y-[2px] hover:shadow-none shadow-[2px_2px_0px_0px_#000] transition-all">Reject</button>
                        </>
                      ) : (
                        <span className="text-[10px] font-black text-black dark:text-white uppercase bg-slate-200 dark:bg-neutral-800 px-3 py-2 rounded-lg border-2 border-black w-full text-center">
                          Status: {req.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* COLUMN 2: TIMETABLE */}
        <div className="space-y-4">
          <div className="border-b-4 border-black dark:border-white pb-3 flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded-md">⚡ Timetable</h3>
            <span className="text-[10px] font-mono font-black text-white bg-red-500 border-2 border-black px-2 py-0.5 rounded-md">Total: {upcomingSessions.length}</span>
          </div>

          <div className="space-y-5">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} {...session} />
            ))}
          </div>
        </div>

        {/* COLUMN 3: ACTIVE NODES & CALENDAR */}
        <div className="space-y-8">
          {/* ACTIVE NODES */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b-4 border-black dark:border-white pb-3">
              <h3 className="text-sm font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded-md flex items-center gap-2">
                <HiServer className="w-4 h-4" /> Active Nodes
              </h3>

              {/* TRIGGER MODAL BUTTON */}
              <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-1 text-[10px] font-black uppercase bg-indigo-600 dark:bg-orange-400 text-white dark:text-black px-2 py-1 rounded-md border-2 border-black hover:translate-y-[2px] hover:shadow-none shadow-[2px_2px_0px_0px_#000] transition-all">
                <HiPlus className="w-3 h-3" /> New
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {isLoadingNodes ? (
                <div className="text-xs font-bold text-center py-4 uppercase animate-pulse">Loading Nodes...</div>
              ) : myNodes.length === 0 ? (
                <div className="text-[10px] font-bold text-center py-4 uppercase border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl">No active listings deployed.</div>
              ) : (
                myNodes.map((node) => (
                  <div key={node._id} className="p-3 border-4 border-black dark:border-white rounded-xl bg-white dark:bg-[#111] flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    <div className="pr-2">
                      <h4 className="text-[11px] font-black uppercase leading-tight line-clamp-1">{node.title}</h4>
                      <span className="text-[10px] font-bold text-black/50 dark:text-white/50 block mt-0.5">{node.costPerHour} SKL / hr</span>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button className="text-[9px] font-black uppercase bg-slate-100 dark:bg-neutral-800 border-2 border-black dark:border-white px-2 py-1 rounded hover:bg-black hover:text-white transition-colors">View</button>
                      <div className={`w-3 h-3 rounded-full border-2 border-black ${node.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} title={`Status: ${node.isActive ? "Active" : "Inactive"}`} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CALENDAR */}
          <div className="space-y-4">
            <div className="border-b-4 border-black dark:border-white pb-3">
              <h3 className="text-sm font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 inline-block rounded-md">📅 Calendar</h3>
            </div>
            <Calendar />
          </div>
        </div>
      </section>
    </div>
  );
}