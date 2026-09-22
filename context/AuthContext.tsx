"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  email: string;
  avatarText: string;
  role?: string;
  jurisdiction?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

const AUTH_STORAGE_KEY = "nyayasetu_auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Only restore from explicit localStorage — no route-based auto-login
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setIsAuthenticated(true);
        setUser(parsed);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const login = (email: string, name?: string) => {
    const resolvedName = name?.trim() || (email ? email.split("@")[0] : "Citizen User");
    const initials = resolvedName
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join("") || "CU";

    const newUser: UserProfile = {
      name: resolvedName,
      email: email || "citizen@nyayasetu.in",
      avatarText: initials,
      role: "Verified Citizen",
      jurisdiction: "Karnataka (Bengaluru)",
    };

    setIsAuthenticated(true);
    setUser(newUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore storage errors
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
