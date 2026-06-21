import React, { useState } from "react";
import { 
  HiStar, HiUserGroup, HiClock, HiCheckCircle, HiPlus, 
  HiGlobeAlt, HiLocationMarker, HiAcademicCap,
  HiBadgeCheck
} from "react-icons/hi";

// Classic solid Neo-brutalist border and layout shadows
const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("schedule");

  const [profileData, setProfileData] = useState({
    username: "Alex_Baker",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&h=300&q=80", 
    rank: "Experienced Member",
    location: "San Francisco, CA",
    website: "https://baker.dev",
    bio: "Full-stack developer by day, language learner by night. Right now I am practicing React development and trying to become fluent in Japanese.",
    rating: "4.92",
    stats: { totalSwaps: 38, hoursTaught: 24.5, hoursLearned: 19.0 },
    skillsOffered: ["React Architecture", "Custom Hooks", "Tailwind UI Layouts"],
    skillsDesired: ["Conversational Japanese", "Japanese Pronunciation", "Rust Programming"],
    
    qualifications: [
      { id: 1, title: "Senior Staff Engineer", issuer: "Tech Corp", verified: true },
      { id: 2, title: "Japanese Language Certificate (N2)", issuer: "Japan Foundation", verified: true },
      { id: 3, title: "BS in Computer Science", issuer: "Stanford University", verified: false }
    ],

    pendingRequests: [
      { id: 101, type: "Incoming", peer: "Sora_99", skill: "React Architecture", duration: "1.5 hours", state: "Needs your reply" },
      { id: 102, type: "Outgoing", peer: "Lingo_Guru", skill: "Advanced Spanish", duration: "1.0 hour", state: "Waiting for reply" }
    ],

    upcomingSessions: [
      { id: 201, peer: "Matrix_Rebel", role: "Teaching", skill: "Custom Hooks", time: "June 24, 2026 @ 2:00 PM" },
      { id: 202, peer: "Pixel_Lord", role: "Learning", skill: "Figma Design", time: "June 26, 2026 @ 6:30 PM" }
    ],

    reviews: [
      { id: 1, author: "Matrix_Rebel", rating: 5, comment: "Alex completely simplified how web components load data. Incredible clarity.", date: "2 days ago" },
      { id: 2, author: "Lingo_Guru", rating: 4, comment: "Super dedicated student! Pronunciation is improving very quickly.", date: "1 week ago" }
    ]
  });

  return (
    <div className="space-y-8 pb-16 font-mono text-black dark:text-white">
      
      {/* 1. MAIN ACCOUNT INFO & METRICS */}
      <div className={SHARED_CARD_STYLE + " p-6 md:p-8"}>
        <div className="flex flex-col xl:flex-row justify-between items-stretch gap-6 border-b-4 border-black dark:border-white pb-6 mb-6">
          
          {/* Profile Header Block */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1 w-full">
            
            {/* PROFILE PICTURE BOX (80% frame size adjustment) */}
            <div className="w-32 h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 shrink-0 rounded-2xl border-4 border-black dark:border-white overflow-hidden bg-slate-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              {profileData.avatarUrl ? (
                <img 
                  src={profileData.avatarUrl} 
                  alt={profileData.username} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-neutral-800 font-black text-4xl">
                  {profileData.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Profile Info Fields */}
            <div className="space-y-4 flex-1 w-full text-center md:text-left flex flex-col justify-between py-1">
              <div>
                <span className="text-[10px] font-black text-black/50 dark:text-white/50 block uppercase tracking-widest mb-1">Community Profile</span>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white">
                  @{profileData.username}
                </h1>
              </div>

              {/* Location & Personal Website links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-black/80 dark:text-white/80">
                <span className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 border-2 border-black dark:border-white px-2.5 py-1 rounded-md">
                  <HiLocationMarker className="w-4 h-4 text-black dark:text-white" /> {profileData.location}
                </span>
                <a href={profileData.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 border-2 border-black dark:border-white px-2.5 py-1 rounded-md hover:underline text-black dark:text-white">
                  <HiGlobeAlt className="w-4 h-4" /> {profileData.website.replace("https://", "")}
                </a>
              </div>

              <p className="text-sm font-bold text-black/70 dark:text-white/70 max-w-2xl leading-relaxed">
                {profileData.bio}
              </p>
            </div>
          </div>

          {/* Member Status & Score */}
          <div className="flex flex-row xl:flex-col justify-between xl:justify-start items-center xl:items-end gap-3 shrink-0 w-full xl:w-auto xl:border-l-4 xl:border-black dark:xl:border-white xl:pl-6">
            <span className="text-sm font-black px-4 py-2 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black uppercase rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]">
              {profileData.rank}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 border-2 border-amber-500/40 px-3 py-1.5 rounded-md">
              <HiStar className="w-4 h-4 fill-current" /> {profileData.rating} Rating
            </div>
          </div>
        </div>

        {/* 4-Column Simple Stats (Bigger values and labels layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: HiUserGroup, label: "Total Swaps Completed", val: `${profileData.stats.totalSwaps} times` },
            { icon: HiClock, label: "Time I've Taught", val: `${profileData.stats.hoursTaught} hours` },
            { icon: HiCheckCircle, label: "Time I've Learned", val: `${profileData.stats.hoursLearned} hours` },
            { icon: HiBadgeCheck, label: "Attendance Record", val: "100% Reliable" }
          ].map((stat, idx) => (
            <div key={idx} className="border-2 border-black dark:border-white p-4 bg-slate-50 dark:bg-neutral-900 rounded-xl">
              <div className="flex items-center gap-1.5 text-black dark:text-white mb-1.5 opacity-90">
                <stat.icon className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">{stat.label}</span>
              </div>
              <span className="text-xl font-black uppercase tracking-tight block text-black dark:text-white">{stat.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SKILL TAG SECTIONS (Color Fixed to high contrast Emerald & Sky) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={SHARED_CARD_STYLE + " p-6"}>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight border-b-4 border-black dark:border-white pb-3 mb-4 text-emerald-700 dark:text-emerald-400">
            💪 Skills I Offer to Teach
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {profileData.skillsOffered.map((s, i) => (
              <span key={i} className="px-3 py-1.5 text-xs font-black bg-slate-50 dark:bg-neutral-900 border-2 border-black dark:border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">{s}</span>
            ))}
          </div>
        </div>

        <div className={SHARED_CARD_STYLE + " p-6"}>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight border-b-4 border-black dark:border-white pb-3 mb-4 text-sky-700 dark:text-sky-400">
            🎯 Skills I Want to Learn
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {profileData.skillsDesired.map((s, i) => (
              <span key={i} className="px-3 py-1.5 text-xs font-black bg-slate-50 dark:bg-neutral-900 border-2 border-black dark:border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. DASHBOARD MAIN INTERACTIVE TABS */}
      <div className="border-4 border-black dark:border-white rounded-xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
        <div className="flex border-b-4 border-black dark:border-white bg-slate-50 dark:bg-neutral-900">
          {[
            { id: "schedule", label: "My Schedule & Requests" },
            { id: "qualifications", label: "Work History & Certificates" },
            { id: "reviews", label: "Reviews From Members" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3.5 text-xs md:text-sm font-black uppercase transition-all flex-1 border-r-2 last:border-r-0 border-black dark:border-white ${
                activeTab === t.id 
                  ? "bg-black text-white dark:bg-white dark:text-black" 
                  : "bg-transparent text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 bg-white dark:bg-[#111]">
          
          {/* TAB A: SCHEDULE & BOOKINGS (Legibility and header visibility maxed out) */}
          {activeTab === "schedule" && (
            <div className="space-y-8">
              <div>
                <h4 className="text-sm md:text-base font-black uppercase tracking-tight mb-3 text-black dark:text-white flex items-center gap-1.5">
                  <span>✦</span> Swap Requests
                </h4>
                <div className="space-y-3">
                  {profileData.pendingRequests.map((req) => (
                    <div key={req.id} className="p-4 border-2 border-black dark:border-white bg-slate-50 dark:bg-neutral-900/30 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                      <div className="text-sm font-bold text-black/90 dark:text-white/90 flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border-2 border-black ${req.type === "Incoming" ? "bg-emerald-600 text-white" : "bg-neutral-800 text-white dark:bg-white dark:text-black"}`}>
                          {req.type === "Incoming" ? "Received" : "Sent"}
                        </span>
                        <span>
                          User <strong className="text-black dark:text-white font-black underline">@{req.peer}</strong> requested a lesson on <strong className="font-black text-emerald-700 dark:text-emerald-400">{req.skill}</strong> ({req.duration})
                        </span>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto shrink-0">
                        {req.type === "Incoming" ? (
                          <>
                            <button className="flex-1 md:flex-initial px-3 py-1.5 bg-emerald-600 text-white font-black text-xs uppercase rounded-md border-2 border-black hover:opacity-90 active:scale-95">Accept</button>
                            <button className="flex-1 md:flex-initial px-3 py-1.5 bg-red-600 text-white font-black text-xs uppercase rounded-md border-2 border-black hover:opacity-90 active:scale-95">Decline</button>
                          </>
                        ) : (
                          <span className="text-xs font-black text-black dark:text-white uppercase tracking-tight bg-slate-200 dark:bg-neutral-800 px-3 py-1.5 rounded border-2 border-black w-full text-center md:w-auto">
                            {req.state}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm md:text-base font-black uppercase tracking-tight mb-3 text-black dark:text-white flex items-center gap-1.5">
                  <span>✦</span> Confirmed Lessons
                </h4>
                <div className="space-y-3">
                  {profileData.upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 border-2 border-black dark:border-white rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#151515] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                      <div className="text-sm font-bold flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-emerald-500 shrink-0 border border-black" />
                        <div>
                          <p className="uppercase text-[10px] text-black/60 dark:text-white/60 font-black tracking-wider">
                            {session.role === "Teaching" ? "You are teaching" : "You are learning from"} @{session.peer}
                          </p>
                          <p className="text-base font-black uppercase tracking-tight text-black dark:text-white">{session.skill}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black px-3 py-1.5 border-2 border-black dark:border-white bg-slate-100 dark:bg-neutral-800 rounded-md shrink-0 w-full sm:w-auto text-center text-black dark:text-white">
                        📅 {session.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB B: QUALIFICATIONS LIST */}
          {activeTab === "qualifications" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-2 border-black dark:border-white/20 pb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-black/60 dark:text-white/60">My Background & Experience</h4>
                <button className="px-2 py-1 bg-black text-white dark:bg-white dark:text-black font-black text-[10px] uppercase border border-black dark:border-white rounded flex items-center gap-1 active:scale-95">
                  <HiPlus /> Add Entry
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.qualifications.map((q) => (
                  <div key={q.id} className="p-4 border-2 border-black dark:border-white rounded-xl bg-slate-50 dark:bg-neutral-900/40 flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <HiAcademicCap className="w-4 h-4 text-black dark:text-white" />
                        <h5 className="text-xs font-black uppercase tracking-tight">{q.title}</h5>
                      </div>
                      <p className="text-[10px] text-black/60 dark:text-white/60 font-bold">{q.issuer}</p>
                    </div>

                    {q.verified ? (
                      <span className="text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB C: COMMUNITY MEMBER REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-black dark:border-white/20 pb-3 text-black/60 dark:text-white/60">What other members say</h4>
              <div className="divide-y-2 divide-black dark:divide-white/20 space-y-4">
                {profileData.reviews.map((r) => (
                  <div key={r.id} className="pt-4 first:pt-0 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-black dark:text-white uppercase">@{r.author}</span>
                      <div className="flex items-center gap-1 text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 border border-amber-500/20 rounded">
                        {"★".repeat(r.rating)}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-black/70 dark:text-white/70 leading-relaxed italic">
                      "{r.comment}"
                    </p>
                    <span className="text-[9px] font-black text-black/50 dark:text-white/50 block uppercase tracking-tighter">{r.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}