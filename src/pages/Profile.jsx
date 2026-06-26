import React, { useState, useEffect } from "react";
import { 
  HiStar, HiUserGroup, HiClock, HiCheckCircle, HiPlus, 
  HiGlobeAlt, HiLocationMarker, HiAcademicCap,
  HiBadgeCheck, HiPencilAlt, HiOutlineGlobeAlt
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; 
import ProfileCard from "../component/ProfileCard";
import EditProfileModal from "../components/EditProfileModal"; 
import { useAuth } from "../context/AuthContext";

// 1. IMPORT YOUR NEW ENTERPRISE API
import { getProfile } from "../services/AllApi"; 

const SHARED_CARD_STYLE = "border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]";

export default function Profile() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("schedule");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. THE CLEANED-UP AXIOS ENGINE
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      
      // Look how clean this is! The interceptor handles the token automatically.
      const response = await getProfile(); 
      const dbData = response.data; // Axios automatically parses JSON into .data
      
      // STRICT DATABASE MAPPING
      setProfileData({
        username: dbData.username,
        avatarUrl: dbData.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&h=300&q=80",
        rank: dbData.rank || "New Member",
        rating: dbData.rating || 5.0,
        location: dbData.location || "",
        website: dbData.website || "",
        bio: dbData.bio || "",
        
        socials: dbData.socials || { github: "", linkedin: "", twitter: "" },
        skillsOffered: dbData.skillsOffered || [],
        skillsDesired: dbData.skillsDesired || [],
        
        stats: { 
          totalSwaps: dbData.totalSessionsCompleted || 0, 
          hoursTaught: dbData.hoursTaught || 0, 
          hoursLearned: dbData.hoursLearned || 0 
        },
        
        qualifications: [],
        pendingRequests: [],
        upcomingSessions: [],
        reviews: []
      });
    } catch (err) {
      // Axios puts backend error messages inside err.response.data
      setError(err.response?.data?.message || "Failed to fetch identity matrix");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-mono">
        <div className="p-6 md:p-8 bg-yellow-300 dark:bg-yellow-400 border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] animate-pulse">
          <h2 className="text-xl md:text-2xl font-black uppercase text-black tracking-widest flex items-center gap-3">
            <HiOutlineGlobeAlt className="w-8 h-8 animate-spin" /> Decrypting Identity...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-mono">
        <div className="p-6 bg-rose-500 border-4 border-black rounded-xl text-white font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!profileData) return null;

  return (
    <div className="space-y-8 pb-16 font-mono text-black dark:text-white">
      
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        initialData={profileData} 
        onSaveSuccess={fetchProfile}
      />

      <div className={SHARED_CARD_STYLE + " p-6 md:p-8"}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-3 flex flex-col justify-center items-center min-w-[240px]">
            <ProfileCard
              name={profileData.username}
              title={profileData.rank}
              handle={profileData.username}
              status="Online"
              contactText="Contact Me"
              avatarUrl={profileData.avatarUrl}
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowColor="rgba(0, 0, 0, 0.1)"
              iconUrl=""
              behindGlowEnabled={true}
              innerGradient="linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="lg:col-span-9 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-black dark:border-white pb-4">
                
                <div>
                  <span className="text-[11px] font-black text-black/50 dark:text-white/50 block uppercase tracking-widest mb-1">Community Profile</span>
                  <div className="flex items-center gap-4">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white">
                      @{profileData.username}
                    </h1>
                    <button 
                      onClick={() => setIsEditModalOpen(true)}
                      className="h-8 px-3 bg-indigo-100 text-indigo-700 dark:bg-orange-500/20 dark:text-orange-400 border-2 border-indigo-700 dark:border-orange-400 rounded-lg text-[10px] font-black uppercase flex items-center gap-1.5 hover:bg-indigo-700 hover:text-white dark:hover:bg-orange-400 dark:hover:text-black transition-colors"
                    >
                      <HiPencilAlt className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
                  <span className="text-sm font-black px-3 py-1.5 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black uppercase rounded-md">
                    {profileData.rank}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 border-2 border-amber-500/40 px-3 py-1.5 rounded-md">
                    <HiStar className="w-4 h-4 fill-current" /> {profileData.rating.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-black dark:text-white">
                {profileData.location && (
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 border-2 border-black dark:border-white px-2.5 py-1 rounded-md">
                    <HiLocationMarker className="w-4 h-4" /> {profileData.location}
                  </span>
                )}
                {profileData.website && (
                  <a href={profileData.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 border-2 border-black dark:border-white px-2.5 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-neutral-800">
                    <HiGlobeAlt className="w-4 h-4" /> {profileData.website.replace(/^https?:\/\//, "")}
                  </a>
                )}

                <div className="flex items-center gap-1.5 border-2 border-black dark:border-white bg-amber-400 dark:bg-amber-500 p-0.5 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {profileData.socials.github && (
                    <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white rounded transition-colors text-black" aria-label="GitHub">
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}
                  {profileData.socials.linkedin && (
                    <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white rounded transition-colors text-black" aria-label="LinkedIn">
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                  {profileData.socials.twitter && (
                    <a href={profileData.socials.twitter} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white rounded transition-colors text-black" aria-label="Twitter">
                      <FaTwitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-base font-bold text-black/80 dark:text-white/80 leading-relaxed">
                {profileData.bio || "Initialize your identity matrix to connect with the network..."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: HiUserGroup, label: "Swaps Completed", val: `${profileData.stats.totalSwaps} times` },
                { icon: HiClock, label: "Time I've Taught", val: `${profileData.stats.hoursTaught} hrs` },
                { icon: HiCheckCircle, label: "Time I've Learned", val: `${profileData.stats.hoursLearned} hrs` },
                { icon: HiBadgeCheck, label: "Attendance Record", val: "100% Reliable" }
              ].map((stat, idx) => (
                <div key={idx} className="border-2 border-black dark:border-white p-4 md:p-5 bg-slate-50 dark:bg-neutral-900/40 rounded-xl flex items-center gap-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                  <div className="p-2.5 bg-white dark:bg-[#111] border-2 border-black dark:border-white rounded-lg shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    <stat.icon className="w-6 h-6 text-black dark:text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider block text-black/50 dark:text-white/50">{stat.label}</span>
                    <span className="text-lg font-black uppercase tracking-tight block text-black dark:text-white mt-0.5">{stat.val}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={SHARED_CARD_STYLE + " p-6"}>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight border-b-4 border-black dark:border-white pb-3 mb-4 text-emerald-700 dark:text-emerald-400">
            💪 Skills I Offer to Teach
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {profileData.skillsOffered.length > 0 ? (
              profileData.skillsOffered.map((s, i) => (
                <span key={i} className="px-3 py-1.5 text-xs font-black bg-slate-50 dark:bg-neutral-900 border-2 border-black dark:border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">{s}</span>
              ))
            ) : (
              <span className="text-xs font-bold text-black/50 dark:text-white/50 italic">No skills added yet. Click Edit Profile to add some!</span>
            )}
          </div>
        </div>

        <div className={SHARED_CARD_STYLE + " p-6"}>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight border-b-4 border-black dark:border-white pb-3 mb-4 text-sky-700 dark:text-sky-400">
            🎯 Skills I Want to Learn
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {profileData.skillsDesired.length > 0 ? (
              profileData.skillsDesired.map((s, i) => (
                <span key={i} className="px-3 py-1.5 text-xs font-black bg-slate-50 dark:bg-neutral-900 border-2 border-black dark:border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">{s}</span>
              ))
            ) : (
              <span className="text-xs font-bold text-black/50 dark:text-white/50 italic">No skills added yet. Click Edit Profile to add some!</span>
            )}
          </div>
        </div>
      </div>

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
          {activeTab === "schedule" && (
            <div className="space-y-8">
              <div>
                <h4 className="text-sm md:text-base font-black uppercase tracking-tight mb-3 text-black dark:text-white flex items-center gap-1.5">
                  <span>✦</span> Swap Requests
                </h4>
                {profileData.pendingRequests.length > 0 ? (
                  <div className="space-y-3">
                    {/* Maps over requests when we build them */}
                  </div>
                ) : (
                  <div className="p-6 border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl text-center">
                    <span className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-widest">Inbox is clear. No pending requests.</span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm md:text-base font-black uppercase tracking-tight mb-3 text-black dark:text-white flex items-center gap-1.5">
                  <span>✦</span> Confirmed Lessons
                </h4>
                {profileData.upcomingSessions.length > 0 ? (
                  <div className="space-y-3">
                    {/* Maps over sessions when we build them */}
                  </div>
                ) : (
                  <div className="p-6 border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl text-center">
                    <span className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-widest">No upcoming sessions. Time to explore!</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "qualifications" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-2 border-black dark:border-white/20 pb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-black/60 dark:text-white/60">My Background & Experience</h4>
                <button className="px-2 py-1 bg-black text-white dark:bg-white dark:text-black font-black text-[10px] uppercase border border-black dark:border-white rounded flex items-center gap-1 active:scale-95">
                  <HiPlus /> Add Entry
                </button>
              </div>
              <div className="p-6 border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl text-center">
                <span className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-widest">No qualifications logged yet.</span>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-black dark:border-white/20 pb-3 text-black/60 dark:text-white/60">What other members say</h4>
              <div className="p-6 border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl text-center">
                <span className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-widest">No reviews yet. Complete a swap to get rated!</span>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}