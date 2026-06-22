import React, { useState } from "react";
import { HiSearch, HiPaperAirplane, HiDotsVertical, HiOutlineVideoCamera } from "react-icons/hi";

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_#4f46e5] dark:shadow-[6px_6px_0px_0px_#f97316]";
const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

// Mock Data
const CONTACTS = [
  { id: 1, name: "StudioMina", avatar: "https://i.pravatar.cc/150?img=47", lastMsg: "Sounds good, see you at 20:00 UTC!", time: "10:42 AM", unread: 0, online: true },
  { id: 2, name: "DevAlex", avatar: "https://i.pravatar.cc/150?img=11", lastMsg: "Could you explain the Docker volume mapping again?", time: "Yesterday", unread: 2, online: true },
  { id: 3, name: "LanguageGuru", avatar: "https://i.pravatar.cc/150?img=32", lastMsg: "¡Perfecto! Has mejorado mucho.", time: "Mon", unread: 0, online: false },
  { id: 4, name: "Pixel_Lord", avatar: "https://i.pravatar.cc/150?img=68", lastMsg: "I'll send over the Figma file shortly.", time: "Sun", unread: 0, online: false },
];

const MOCK_MESSAGES = [
  { id: 1, senderId: 2, text: "Hey! Ready for our session tomorrow?", time: "10:30 AM" },
  { id: 2, senderId: "me", text: "Absolutely. I've got my notes prepped for the Docker container teardown.", time: "10:35 AM" },
  { id: 3, senderId: 2, text: "Awesome. I struggled a bit with the network bridges this week.", time: "10:38 AM" },
  { id: 4, senderId: 2, text: "Could you explain the Docker volume mapping again?", time: "10:39 AM" },
];

export default function Chat() {
  const [activeContact, setActiveContact] = useState(CONTACTS[1]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      senderId: "me",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setMessage("");
  };

  return (
    <div className={`flex flex-col md:flex-row h-[calc(100vh-12rem)] min-h-[600px] overflow-hidden ${SHARED_CARD_STYLE}`}>
      
      {/* LEFT COLUMN: CONTACTS LIST */}
      <div className="w-full md:w-1/3 md:border-r-4 border-black dark:border-white flex flex-col bg-slate-50/50 dark:bg-neutral-900/30">
        
        {/* Search Header */}
        <div className="p-4 border-b-4 border-black dark:border-white bg-white dark:bg-[#111]">
          <div className="relative border-2 border-black dark:border-white rounded-xl overflow-hidden flex items-center bg-slate-50 dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-indigo-500">
            <span className="pl-3">
              <HiSearch className="w-4 h-4 text-black/50 dark:text-white/50" />
            </span>
            <input 
              type="text" 
              placeholder="SEARCH ..." 
              className="w-full px-3 py-2 text-xs font-black uppercase bg-transparent outline-none placeholder-black/30 dark:placeholder-white/30"
            />
          </div>
        </div>

        {/* Contacts Scroll */}
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map((contact) => (
            <div 
              key={contact.id} 
              onClick={() => setActiveContact(contact)}
              className={`p-4 border-b-2 border-black/10 dark:border-white/10 cursor-pointer transition-all flex items-center gap-3 ${
                activeContact.id === contact.id 
                  ? "bg-black text-white dark:bg-white dark:text-black border-l-8 border-l-indigo-600 dark:border-l-orange-400" 
                  : "hover:bg-slate-100 dark:hover:bg-neutral-800"
              }`}
            >
              <div className="relative flex-shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-lg border-2 border-current object-cover" />
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#111] rounded-full" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-black truncate">{contact.name}</h4>
                  <span className={`text-[9px] font-bold ${activeContact.id === contact.id ? "text-white/70 dark:text-black/70" : "text-black/40 dark:text-white/40"}`}>
                    {contact.time}
                  </span>
                </div>
                <p className={`text-[11px] font-medium truncate ${activeContact.id === contact.id ? "text-white/80 dark:text-black/80" : "text-black/60 dark:text-white/50"}`}>
                  {contact.lastMsg}
                </p>
              </div>

              {contact.unread > 0 && (
                <div className="w-5 h-5 flex-shrink-0 bg-rose-500 border-2 border-black dark:border-white rounded-full flex items-center justify-center text-[10px] font-black text-white">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE CHAT */}
      <div className="w-full md:w-2/3 flex flex-col bg-white dark:bg-[#111] relative z-0">
        
        {/* Chat Header */}
        <div className="p-4 border-b-4 border-black dark:border-white flex justify-between items-center bg-slate-50 dark:bg-neutral-900 z-10">
          <div className="flex items-center gap-3">
            <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-lg border-2 border-black dark:border-white object-cover" />
            <div>
              <h3 className="text-sm font-black uppercase">{activeContact.name}</h3>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                {activeContact.online ? "● Online" : "○ Offline"}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className={`p-2 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-[#111] hover:bg-slate-100 dark:hover:bg-neutral-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all ${PRESS_ANIMATION}`}>
              <HiOutlineVideoCamera className="w-5 h-5 text-indigo-600 dark:text-orange-400" />
            </button>
            <button className={`p-2 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-[#111] hover:bg-slate-100 dark:hover:bg-neutral-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all ${PRESS_ANIMATION}`}>
              <HiDotsVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
          
          {/* Timestamp Separator */}
          <div className="flex justify-center mb-6">
            <span className="text-[9px] font-black uppercase bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              Today
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderId === "me";
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  
                  {/* Chunky Chat Bubble */}
                  <div className={`p-3 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] ${
                    isMe 
                      ? "bg-indigo-600 text-white dark:bg-orange-400 dark:text-black rounded-xl rounded-tr-none" 
                      : "bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl rounded-tl-none"
                  }`}>
                    <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                  </div>
                  
                  <span className="text-[9px] font-black text-black/40 dark:text-white/40 uppercase mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Footer */}
        <div className="p-4 border-t-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 z-10">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="TYPE A MESSAGE..." 
              className="flex-1 px-4 py-3 border-2 border-black dark:border-white rounded-xl text-sm font-bold bg-white dark:bg-[#111] outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-orange-400 transition-shadow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] placeholder-black/30 dark:placeholder-white/30"
            />
            <button 
              type="submit"
              disabled={!message.trim()}
              className={`px-5 py-3 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white rounded-xl font-black uppercase text-xs flex items-center gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] disabled:opacity-50 disabled:shadow-none disabled:translate-y-[2px] disabled:translate-x-[2px] ${PRESS_ANIMATION}`}
            >
              <span className="hidden sm:inline">Send</span>
              <HiPaperAirplane className="w-4 h-4 rotate-90" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}