// src/services/AxiosConfig.js
import axios from "axios";

// Public Agent (For Login / Signup)
export const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// User Agent (For protected user data)
export const userApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true // ⚡ This automatically attaches cookies to every request!
});

// Admin Agent (For admin actions)
export const adminApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true
});