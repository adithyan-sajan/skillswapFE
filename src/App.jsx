import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ==========================================
// 1. APP LAYOUTS (User)
// ==========================================
import SidebarLayout from "./layouts/SidebarLayout";

// ==========================================
// 2. PUBLIC PAGES
// ==========================================
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProtocolPage from "./pages/HowItWorks";
import ErrorTemplate from "./pages/ErrorTemplate";

// ==========================================
// 3. APP PAGES (User Facing)
// ==========================================
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Explore from "./pages/ExplorePage";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Session from "./pages/Session"; // <-- Imported the new Session room

// ==========================================
// 4. ADMIN PORTAL (From /admin folder)
// ==========================================
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminEscrow from "./admin/AdminEscrow";
import AdminDisputes from "./admin/AdminDisputes";
import AdminListings from "./admin/AdminListings";

export default function App() {
  return (
    <Routes>
      {/* -------------------------------------------
          PUBLIC ROUTES
          These stand alone and have no sidebars.
      --------------------------------------------- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/protocol" element={<ProtocolPage />} />

      {/* -------------------------------------------
          USER PORTAL (/dashboard/*)
          Everything inside here gets the SidebarLayout.
      --------------------------------------------- */}
      <Route path="/dashboard" element={<SidebarLayout />}>
        {/* Redirect /dashboard directly to /dashboard/deck */}
        <Route index element={<Navigate to="deck" replace />} />

        <Route path="deck" element={<Dashboard />} />
        <Route path="explore" element={<Explore />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
        
        {/* <-- Added the Live Classroom Route --> */}
        <Route path="session/:roomId" element={<Session />} /> 
      </Route>

      {/* -------------------------------------------
          ADMIN PORTAL (/admin/*)
          Everything inside here gets the AdminLayout (PillNav).
      --------------------------------------------- */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* The 'index' route renders the Overview at exactly /admin */}
        <Route index element={<AdminDashboard />} />

        {/* Nested admin tools */}
        <Route path="ledger" element={<AdminUsers />} />
        <Route path="vault" element={<AdminEscrow />} />
        <Route path="disputes" element={<AdminDisputes />} />
        <Route path="listings" element={<AdminListings />} />
      </Route>

      {/* -------------------------------------------
          EXPLICIT ERROR STATUS PAGES
      --------------------------------------------- */}
      <Route path="/access-denied" element={<ErrorTemplate code="403" title="Nice try, hacker" message="You don't have clearance for this room yet. Trade some more skills, rank up your member rating, and come back when you're invited." />} />

      <Route path="/maintenance" element={<ErrorTemplate code="503" title="Under the hood" message="We're currently rewiring the infrastructure to handle your massive brains. Grab a coffee, stretch your legs, and try refreshing in a minute." />} />

      <Route path="*" element={<ErrorTemplate code="404" title="You hit a dead end" message="Whatever you're looking for, it isn't here. Either someone gave you a broken link, or you're looking for skills you can't learn on the internet." />} />
    </Routes>
  );
}