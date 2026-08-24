import { createContext, useContext, useState, useEffect } from "react";
import { userApi } from "../services/AxiosConfig";

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
        const response = await userApi.get("/auth/refresh");

        const data = response.data;
        setUser(data);
        setToken(data.accessToken); // Save the fresh short-lived token to RAM
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
    try {
      const response = await userApi.post("/auth/login", { email, password });
      const data = response.data;
      setUser(data);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      // Axios throws on non-2xx — surface the server's message if it has one
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // 3. THE LOGOUT ACTION
  const logout = async () => {
    try {
      await userApi.post("/auth/logout"); // withCredentials sends the cookie the server destroys
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