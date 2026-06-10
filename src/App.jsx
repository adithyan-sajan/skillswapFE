import React from "react";
import {  Routes, Route, Navigate } from "react-router-dom";

import SidebarLayout from "./layouts/SidebarLayout";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProtocolPage from "./pages/ProtocolPage";

import Dashboard from "./pages/Dashboard"; 
import Wallet from "./pages/Wallet";
import Explore from "./pages/Explore";


export default function App() {
  return (
    <Routes>
      {/* 1. Standalone Views */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/protocol" element={<ProtocolPage />} />

      {/* 2. Nested Workspace Portal */}
      <Route path="/dashboard" element={<SidebarLayout />}>
        {/* The 'index' route renders inside SidebarLayout when path is EXACTLY /dashboard */}
        <Route index element={<Navigate to="deck" replace />} />
        
        {/* These routes now live inside SidebarLayout */}
        <Route path="deck" element={<Dashboard />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="explore" element={<Explore />} />
      </Route>
      
      {/* REMOVED: <Route path="/wallet" element={<Wallet />} /> */}
      {/* Reason: It was outside the layout, so it wouldn't have your sidebar. */}
    </Routes>
  );
}
