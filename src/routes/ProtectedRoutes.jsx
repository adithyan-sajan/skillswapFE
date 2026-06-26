import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 1. STANDARD USER GUARD
export const ProtectedRoute = () => {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111]">
        <h1 className="text-2xl font-black uppercase tracking-widest animate-pulse dark:text-white">
          Decrypting Identity...
        </h1>
      </div>
    );
  }

  // If no user is logged in, kick them to the login page
  // We use the `state` to remember where they were trying to go so we can redirect them back later
  return user ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
};

// 2. ADMIN ONLY GUARD
export const AdminRoute = () => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return null; // Let the ProtectedRoute handle the loading screen

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // NOTE: You will need to add a `role` field (e.g., 'admin' or 'user') to your User Mongoose Schema later!
  // For now, if you don't have a role field, this just checks if the user exists.
  if (user.role !== 'admin') {
    // If they are logged in but NOT an admin, kick them to the custom Access Denied error page!
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};

// 3. PUBLIC ONLY GUARD (Prevents logged-in users from seeing the Login page)
export const PublicRoute = () => {
  const { user, isAuthLoading } = useAuth();
  
  if (isAuthLoading) return null;
  
  return user ? <Navigate to="/dashboard/deck" replace /> : <Outlet />;
};