import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Import the guards we just made
import { ProtectedRoute, AdminRoute, PublicRoute } from "./routes/ProtectedRoutes";

// 1. APP LAYOUTS (User)
import SidebarLayout from "./layouts/SidebarLayout";
// 2. PUBLIC PAGES
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProtocolPage from "./pages/HowItWorks";
import ErrorTemplate from "./pages/ErrorTemplate";
// 3. APP PAGES (User Facing)
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Explore from "./pages/ExplorePage";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Session from "./pages/Session";
// 4. ADMIN PORTAL (From /admin folder)
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminEscrow from "./admin/AdminEscrow";
import AdminDisputes from "./admin/AdminDisputes";
import AdminListings from "./admin/AdminListings";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES (Anyone can see Landing and Protocol) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/protocol" element={<ProtocolPage />} />

      {/* PUBLIC ONLY (Logged in users are kicked out of /auth) */}
      <Route element={<PublicRoute />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      {/* -------------------------------------------
          USER PORTAL (/dashboard/*)
          Locked behind the ProtectedRoute
      --------------------------------------------- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<SidebarLayout />}>
          <Route index element={<Navigate to="deck" replace />} />
          <Route path="deck" element={<Dashboard />} />
          <Route path="explore" element={<Explore />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="session/:roomId" element={<Session />} /> 
        </Route>
      </Route>

      {/* -------------------------------------------
          ADMIN PORTAL (/admin/*)
          Locked behind the AdminRoute
      --------------------------------------------- */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="ledger" element={<AdminUsers />} />
          <Route path="vault" element={<AdminEscrow />} />
          <Route path="disputes" element={<AdminDisputes />} />
          <Route path="listings" element={<AdminListings />} />
        </Route>
      </Route>

      {/* EXPLICIT ERROR STATUS PAGES */}
      <Route path="/access-denied" element={<ErrorTemplate code="403" title="Nice try, hacker" message="You don't have clearance for this room yet." />} />
      <Route path="/maintenance" element={<ErrorTemplate code="503" title="Under the hood" message="We're rewiring the infrastructure. Grab a coffee." />} />
      <Route path="*" element={<ErrorTemplate code="404" title="You hit a dead end" message="Whatever you're looking for, it isn't here." />} />
    </Routes>
  );
}