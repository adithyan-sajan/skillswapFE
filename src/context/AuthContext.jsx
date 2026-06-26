import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // This is the shield that prevents the app from flashing the wrong UI on load
  const [isAuthLoading, setIsAuthLoading] = useState(true); 

  // 1. THE SILENT REFRESH (Runs exactly once when the app loads or refreshes)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/refresh", {
          method: "GET",
          // CRITICAL: This line tells the browser, "Please include the locked httpOnly cookie!"
          credentials: "include", 
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setToken(data.accessToken); // Save the fresh short-lived token to RAM
        }
      } catch (error) {
        console.log("No valid session found. User needs to log in.",error);
      } finally {
        // Whether it succeeded or failed, we are done checking. Drop the shield.
        setIsAuthLoading(false); 
      }
    };

    checkLoggedIn();
  }, []);

  // 2. THE LOGIN ACTION
  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Tells the browser to accept and store the new cookie
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    setUser(data);
    setToken(data.accessToken);
    return data;
  };

  // 3. THE LOGOUT ACTION
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Tells the server to destroy the cookie
      });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      // Wipe the RAM
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);