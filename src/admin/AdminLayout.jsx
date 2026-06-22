import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav"; 

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#161616] font-mono text-black dark:text-white transition-colors duration-150 flex flex-col">
      
      {/* 1. Global Admin Header */}
      <AdminNav />

      {/* 2. Dynamic Page Content goes here */}
      <Outlet />
      
    </div>
  );
}