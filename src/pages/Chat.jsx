import React, { useState, useEffect } from "react";
// 🚨 Added HiCalendar
import { HiSearch, HiPaperAirplane, HiDotsVertical, HiOutlineVideoCamera, HiCalendar } from "react-icons/hi";
import { useChat } from "../hooks/useChat"; 
import { useAuth } from "../context/AuthContext";
import { getMyConversations, getChatMessages } from "../services/AllApi"; 

// 🚨 IMPORT THE NEW MODAL
import ScheduleSessionModal from "../components/ScheduleSessionModal";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";
const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

export default function Chat() {
  const { user } = useAuth();
  
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [inputText, setInputText] = useState("");
  
  // 🚨 MODAL STATE
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const { messages, sendMessage, loadHistory } = useChat(activeContact?._id);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await getMyConversations();
        setContacts(res.data);
        if (res.data.length > 0) setActiveContact(res.data[0]); 
      } catch (err) {
        console.error("Failed to load contacts", err);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    if (!activeContact) return;
    
    const fetchOldMessages = async () => {
      try {
        const res = await getChatMessages(activeContact._id);
        loadHistory(res.data);
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };
    fetchOldMessages();
  }, [activeContact?._id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText("");
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Just now";
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Figure out who the peer is for the active chat
  const activePeer = activeContact?.participants.find(p => p._id !== user._id) || activeContact?.participants[0];

  return (
    <div className={`flex flex-col md:flex-row h-[calc(100vh-12rem)] min-h-[600px] overflow-hidden ${SHARED_CARD_STYLE}`}>
      
      {/* 🚨 MOUNT THE MODAL */}
      <ScheduleSessionModal 
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        peer={activePeer}
        skillId={activeContact?.listingId}
        onScheduleSuccess={(autoMessage) => {
          // This fires from the modal when successful, auto-posting the chat message!
          sendMessage(autoMessage);
        }}
      />

      {/* LEFT COLUMN: CONTACTS LIST */}
      <div className="w-full md:w-1/3 md:border-r-4 border-black dark:border-white flex flex-col bg-slate-50/50 dark:bg-neutral-900/30">
        <div className="p-4 border-b-4 border-black dark:border-white bg-white dark:bg-[#111]">
          <div className="relative border-2 border-black dark:border-white rounded-xl overflow-hidden flex items-center bg-slate-50 dark:bg-neutral-900">
            <span className="pl-3"><HiSearch className="w-4 h-4 text-black/50 dark:text-white/50" /></span>
            <input type="text" placeholder="SEARCH ..." className="w-full px-3 py-2 text-xs font-black uppercase bg-transparent outline-none placeholder-black/30 dark:placeholder-white/30"/>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contacts.map((convo) => {
            const peer = convo.participants.find(p => p._id !== user._id) || convo.participants[0];
            const isActive = activeContact?._id === convo._id;

            return (
              <div 
                key={convo._id} onClick={() => setActiveContact(convo)}
                className={`p-4 border-b-2 border-black/10 dark:border-white/10 cursor-pointer transition-all flex items-center gap-3 ${isActive ? "bg-black text-white dark:bg-white dark:text-black border-l-8 border-l-indigo-600 dark:border-l-orange-400" : "hover:bg-slate-100 dark:hover:bg-neutral-800"}`}
              >
                <img src={peer.avatarUrl || `https://ui-avatars.com/api/?name=${peer.username}&background=random`} alt={peer.username} className="w-10 h-10 rounded-lg border-2 border-current object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black truncate">{peer.username}</h4>
                  <p className={`text-[11px] font-medium truncate ${isActive ? "text-white/80 dark:text-black/80" : "text-black/60 dark:text-white/50"}`}>
                    Active Session
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE CHAT */}
      {activeContact ? (
        <div className="w-full md:w-2/3 flex flex-col bg-white dark:bg-[#111] relative z-0">
          {/* Header */}
          <div className="p-4 border-b-4 border-black dark:border-white flex justify-between items-center bg-slate-50 dark:bg-neutral-900 z-10">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-black uppercase">
                {activePeer?.username}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* 🚨 ADDED CALENDAR BUTTON */}
              <button 
                onClick={() => setIsScheduleModalOpen(true)}
                title="Schedule Session"
                className={`p-2 border-2 border-black dark:border-white rounded-lg bg-emerald-100 dark:bg-emerald-500/20 hover:bg-emerald-200 dark:hover:bg-emerald-500/40 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all ${PRESS_ANIMATION}`}
              >
                <HiCalendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </button>

              <button className={`p-2 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-[#111] transition-all ${PRESS_ANIMATION}`}><HiOutlineVideoCamera className="w-5 h-5 text-indigo-600 dark:text-orange-400" /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => {
              const isMe = msg.senderId === user?._id;
              // Add a special style if it's the automated system message
              const isSystemMsg = msg.text.startsWith("🗓️ System:");

              return (
                <div key={msg._id || idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`p-3 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${
                      isSystemMsg
                        ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300 rounded-xl"
                        : isMe 
                          ? "bg-indigo-600 text-white dark:bg-orange-400 dark:text-black rounded-xl rounded-tr-none" 
                          : "bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl rounded-tl-none"
                    }`}>
                      <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[9px] font-black text-black/40 dark:text-white/40 uppercase mt-1 px-1">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 z-10">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="TYPE A MESSAGE..." className="flex-1 px-4 py-3 border-2 border-black dark:border-white rounded-xl text-sm font-bold bg-white dark:bg-[#111] outline-none" />
              <button type="submit" disabled={!inputText.trim()} className={`px-5 py-3 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white rounded-xl font-black uppercase text-xs flex items-center gap-2 ${PRESS_ANIMATION}`}><HiPaperAirplane className="w-4 h-4 rotate-90" /></button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-2/3 flex items-center justify-center bg-white dark:bg-[#111]">
          <p className="text-xs font-black uppercase text-black/40 dark:text-white/40 border-2 border-dashed border-black/20 dark:border-white/20 p-4 rounded-xl">Select a contact to connect.</p>
        </div>
      )}
    </div>
  );
}