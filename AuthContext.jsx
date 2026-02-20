// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("lib_token");
    const storedUser  = localStorage.getItem("lib_user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch { logout(); }
    }
    setLoading(false);
  }, []);

  const login = useCallback((tokenVal, userData) => {
    localStorage.setItem("lib_token", tokenVal);
    localStorage.setItem("lib_user",  JSON.stringify(userData));
    setToken(tokenVal);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("lib_token");
    localStorage.removeItem("lib_user");
    localStorage.removeItem("lib_remember");
    setToken(null);
    setUser(null);
  }, []);

  const authFetch = useCallback(async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
    if (res.status === 401) { logout(); throw new Error("Session expired."); }
    return res;
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, authFetch, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
