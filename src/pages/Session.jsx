import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 🚨 1. IMPORT TLDRAW & ITS CSS
import { Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { io } from "socket.io-client";

import { HiMicrophone, HiOutlineMicrophone, HiVideoCamera, HiOutlineVideoCamera, HiDesktopComputer, HiChatAlt2, HiClock, HiPaperAirplane } from "react-icons/hi";

const socket = io("http://localhost:5000", { withCredentials: true });
const PRESS_ANIMATION = "active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all duration-150";

// 🚨 THE INVISIBLE SYNC ENGINE
function NetworkSync({ roomId }) {
  const editor = useEditor();

  useEffect(() => {
    // 1. Tell the server we entered the room
    socket.emit("join_room", roomId);

    // 2. Listen to LOCAL mouse strokes and send them to the server
    const unlisten = editor.store.listen(
      (update) => {
        // Only broadcast actions performed by the user (not incoming network actions)
        if (update.source === "user") {
          socket.emit("canvas_sync", {
            roomId,
            changes: update.changes,
          });
        }
      },
      { source: "user", scope: "document" }, // Filter out UI changes (like zooming)
    );

    // 3. Listen for REMOTE strokes from the server and draw them!
    const handleRemoteSync = (changes) => {
      editor.store.mergeRemoteChanges(() => {
        const { added, updated, removed } = changes;

        // Draw new shapes
        if (added) editor.store.put(Object.values(added));

        // Update moved/resized shapes
        if (updated) {
          const updatedRecords = Object.values(updated).map(([from, to]) => to);
          editor.store.put(updatedRecords);
        }

        // Erase deleted shapes
        if (removed) {
          const removedIds = Object.values(removed).map((record) => record.id);
          editor.store.remove(removedIds);
        }
      });
    };

    socket.on("canvas_sync", handleRemoteSync);

    return () => {
      unlisten();
      socket.off("canvas_sync", handleRemoteSync);
    };
  }, [editor, roomId]);

  return null; // This component is just a brain, no UI!
}

export default function Session() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // --- HARDWARE & UI STATES ---
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const videoRef = useRef(null);

  // --- CHAT STATE ---
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Connection Established.", sender: "system", time: "10:00 AM" },
    { id: 2, text: "Hey! Can you see my screen yet?", sender: "peer", time: "10:01 AM" },
  ]);
  const chatEndRef = useRef(null);

  // --- TIMER STATE ---
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- CAMERA MOCK ---
  useEffect(() => {
    let stream = null;
    const startCamera = async () => {
      if (isCamOn) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera access denied or unavailable.", err);
        }
      }
    };
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [isCamOn]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleEndSession = () => {
    if (window.confirm("Are you sure you want to end this session? Escrow will be released.")) {
      navigate("/dashboard");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: chatInput,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMsg]);
    setChatInput("");
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-100 dark:bg-[#0a0a0a] font-sans overflow-hidden">
      {/* =========================================
          TOP ROW: CANVAS & VIDEO TOWER
      ========================================= */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 md:p-2 overflow-hidden">
        {/* LEFT: THE TLDRAW WHITEBOARD */}
        <main className="flex-1 flex flex-col bg-white dark:bg-[#111] rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] border-2 border-black dark:border-white relative overflow-hidden">
          {/* Custom Header just to keep your UI aesthetic */}
          <div className="flex flex-wrap items-center justify-between border-b-2 border-black/10 dark:border-white/10 bg-slate-50 dark:bg-neutral-900 p-2.5 shrink-0 z-10 relative">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse border border-black dark:border-white" />
              <span className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Pro Canvas</span>
            </div>
          </div>

          {/* 🚨 2. DROP IN THE TLDRAW COMPONENT */}
          <div className="flex-1 relative">
            {isScreenSharing ? (
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 z-50">
                <div className="border-4 border-black dark:border-white bg-white dark:bg-[#111] p-12 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] text-center">
                  <h2 className="text-2xl font-black uppercase text-indigo-600 dark:text-indigo-400 mb-2">Screen Active</h2>
                  <p className="font-bold text-xs text-black/70 dark:text-white/70 uppercase tracking-widest">Broadcasting to peers.</p>
                </div>
              </div>
            ) : (
              // Tldraw takes up 100% of its parent container automatically
              <Tldraw persistenceKey={`skillswap-room-${roomId}`}>
                {/* 🚨 MOUNT THE SYNC ENGINE HERE */}
                <NetworkSync roomId={roomId} />
              </Tldraw>
            )}
          </div>
        </main>
        {/* RIGHT: VIDEO & CHAT TOWER (Unchanged) */}
        <aside className={`w-full md:w-[300px] flex-shrink-0 flex flex-col gap-4 transition-all duration-300 ${isChatOpen ? "absolute inset-4 md:relative md:inset-auto z-40 bg-slate-100 dark:bg-[#0a0a0a] md:bg-transparent" : "hidden md:flex"}`}>
          {/* Videos Stack */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="relative aspect-video bg-black rounded-xl border-2 border-black dark:border-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" alt="Peer" className="w-full h-full object-cover opacity-90" />
              <div className="absolute top-2 left-2 bg-black/80 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded border border-white/20">Peer Host</div>
            </div>

            <div className="relative aspect-video bg-zinc-800 rounded-xl border-2 border-black dark:border-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center">
              {isCamOn ? <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" /> : <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white font-black text-lg border-2 border-black">ME</div>}
              <div className="absolute top-2 left-2 bg-white text-black text-[9px] font-black uppercase px-2 py-0.5 rounded border border-black flex items-center gap-1">You {!isMicOn && <HiOutlineMicrophone className="text-rose-600 w-3 h-3" />}</div>
            </div>
          </div>

          {/* Chat Box */}
          <div className="flex-1 flex flex-col bg-white dark:bg-[#111] border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] overflow-hidden min-h-[160px]">
            <div className="p-2 border-b-2 border-black/10 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-neutral-900 shrink-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white pl-1">Terminal</span>
              <button onClick={() => setIsChatOpen(false)} className="md:hidden text-black dark:text-white font-black text-[10px] uppercase underline">
                Close
              </button>
            </div>

            <div className="flex-1 p-2.5 overflow-y-auto space-y-2">
              {messages.map((msg) => {
                if (msg.sender === "system") {
                  return (
                    <div key={msg.id} className="text-[9px] font-black text-center text-black/40 dark:text-white/40 uppercase my-1 border-y border-dashed border-black/10 dark:border-white/10 py-0.5">
                      {msg.text}
                    </div>
                  );
                }
                const isMe = msg.sender === "me";
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <span className="text-[8px] font-black text-black/50 dark:text-white/50 mb-0.5 px-0.5 uppercase tracking-wider">
                      {isMe ? "You" : "Peer"} [{msg.time}]
                    </span>
                    <div className={`p-2 rounded-lg border border-black dark:border-white max-w-[90%] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] ${isMe ? "bg-indigo-600 text-white dark:bg-orange-400 dark:text-black rounded-tr-none" : "bg-slate-100 dark:bg-neutral-800 text-black dark:text-white rounded-tl-none"}`}>
                      <p className="text-[10px] font-bold leading-snug">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-1.5 border-t-2 border-black/10 dark:border-white/10 flex gap-1.5 shrink-0 bg-slate-50 dark:bg-neutral-900">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type command..." className="w-full bg-white dark:bg-[#111] border border-black dark:border-white rounded-md px-2 py-1 text-[10px] font-bold outline-none text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:bg-slate-100 dark:focus:bg-neutral-800 transition-colors" />
              <button type="submit" disabled={!chatInput.trim()} className={`p-1.5 bg-indigo-600 dark:bg-orange-400 text-white dark:text-black rounded-md border border-black dark:border-white ${!chatInput.trim() ? "opacity-50 cursor-not-allowed" : "shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]"} ${PRESS_ANIMATION}`}>
                <HiPaperAirplane className="w-3 h-3 rotate-90" />
              </button>
            </form>
          </div>
        </aside>
      </div>

      {/* =========================================
          BOTTOM ROW: SOLID FULL-WIDTH FOOTER
      ========================================= */}
      <footer className="h-16 sm:h-20 border-t-2 border-black dark:border-white bg-white dark:bg-[#111] flex items-center justify-between px-4 sm:px-6 shrink-0 z-50">
        {/* Left: Timer */}
        <div className={`flex items-center gap-1.5 font-mono font-black text-sm md:text-base w-24 md:w-32 ${timeLeft < 300 ? "text-rose-500 animate-pulse" : "text-black dark:text-white"}`}>
          <HiClock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>

        {/* Center: Hardware Controls */}
        <div className="flex items-center gap-3 md:gap-4 justify-center">
          <button onClick={() => setIsMicOn(!isMicOn)} className={`w-10 h-10 md:w-11 md:h-11 rounded-lg border-2 border-black dark:border-white flex items-center justify-center transition-all ${isMicOn ? "bg-slate-50 dark:bg-neutral-900 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-slate-200" : "bg-rose-500 text-white shadow-none translate-y-[2px] translate-x-[2px]"} ${PRESS_ANIMATION}`}>
            {isMicOn ? <HiMicrophone className="w-4 h-4 md:w-5 md:h-5" /> : <HiOutlineMicrophone className="w-4 h-4 md:w-5 md:h-5" />}
          </button>

          <button onClick={() => setIsCamOn(!isCamOn)} className={`w-10 h-10 md:w-11 md:h-11 rounded-lg border-2 border-black dark:border-white flex items-center justify-center transition-all ${isCamOn ? "bg-slate-50 dark:bg-neutral-900 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-slate-200" : "bg-rose-500 text-white shadow-none translate-y-[2px] translate-x-[2px]"} ${PRESS_ANIMATION}`}>
            {isCamOn ? <HiVideoCamera className="w-4 h-4 md:w-5 md:h-5" /> : <HiOutlineVideoCamera className="w-4 h-4 md:w-5 md:h-5" />}
          </button>

          <div className="hidden md:block w-px h-6 bg-black/20 dark:bg-white/20 mx-1" />

          <button onClick={() => setIsScreenSharing(!isScreenSharing)} className={`w-10 h-10 md:w-auto md:px-4 md:h-11 rounded-lg border-2 border-black dark:border-white font-black uppercase text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all ${isScreenSharing ? "bg-indigo-600 text-white shadow-none translate-y-[2px] translate-x-[2px]" : "bg-slate-50 dark:bg-neutral-900 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-slate-200"} ${PRESS_ANIMATION}`}>
            <HiDesktopComputer className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{isScreenSharing ? "Sharing" : "Share"}</span>
          </button>

          {/* Mobile Chat Toggle */}
          <button onClick={() => setIsChatOpen(!isChatOpen)} className={`md:hidden w-10 h-10 rounded-lg border-2 border-black dark:border-white flex items-center justify-center bg-indigo-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${PRESS_ANIMATION}`}>
            <HiChatAlt2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: End Session */}
        <div className="flex justify-end w-24 md:w-32">
          <button onClick={handleEndSession} className={`h-10 md:h-11 px-3 md:px-5 bg-rose-500 text-white font-black uppercase text-[10px] md:text-xs tracking-widest border-2 border-black dark:border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-rose-400 ${PRESS_ANIMATION}`}>
            <span className="hidden md:inline">End Swap</span>
            <span className="md:hidden">End</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
