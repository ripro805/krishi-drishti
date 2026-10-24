"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginCredentials, RegisterData, UserRole } from "@/types/auth";
import { apiClient } from "@/lib/apiClient";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isExpert: boolean;
  isFarmer: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  demoLogin: (role: UserRole) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_SESSION_KEY = "KRISHI_DRISHTI_CURRENT_USER";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session from token / me endpoint on mount (NO auto-demo login!)
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = apiClient.getToken();
        if (token) {
          const res = await apiClient.auth.me();
          if (res?.user) {
            setCurrentUser(res.user);
            localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(res.user));
          } else {
            apiClient.setToken(null);
            setCurrentUser(null);
            localStorage.removeItem(CURRENT_USER_SESSION_KEY);
          }
        } else {
          // Check if cached offline user exists
          const cached = localStorage.getItem(CURRENT_USER_SESSION_KEY);
          if (cached) {
            try {
              setCurrentUser(JSON.parse(cached));
            } catch {
              localStorage.removeItem(CURRENT_USER_SESSION_KEY);
            }
          }
        }
      } catch (e) {
        console.warn("[Auth] Session validation failed:", e);
        apiClient.setToken(null);
        setCurrentUser(null);
        localStorage.removeItem(CURRENT_USER_SESSION_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      const data = await apiClient.auth.login({
        email: credentials.email.trim(),
        password: credentials.password,
      });

      if (!data?.user || !data?.token) {
        return { success: false, error: "লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।" };
      }

      apiClient.setToken(data.token);
      setCurrentUser(data.user);
      localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(data.user));

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "ভুল ইমেল বা পাসওয়ার্ড।" };
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await apiClient.auth.register({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        phone: data.phone?.trim(),
        role: data.role || "farmer",
        district: data.district || "ঢাকা",
      });

      if (!res?.user || !res?.token) {
        return { success: false, error: "রেজিস্ট্রেশন সম্পন্ন করা সম্ভব হয়নি।" };
      }

      apiClient.setToken(res.token);
      setCurrentUser(res.user);
      localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(res.user));

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।" };
    }
  };

  const logout = async () => {
    try {
      await apiClient.auth.logout();
    } catch {
      // ignore
    } finally {
      apiClient.setToken(null);
      setCurrentUser(null);
      localStorage.removeItem(CURRENT_USER_SESSION_KEY);
    }
  };

  // Explicit opt-in demo login for testing and evaluation
  const demoLogin = async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
    const demoCredentials: Record<UserRole, LoginCredentials> = {
      admin: { email: "admin@krishidrishti.gov.bd", password: "admin123" },
      farmer: { email: "farmer@krishidrishti.gov.bd", password: "farmer123" },
      expert: { email: "expert@krishidrishti.gov.bd", password: "expert123" },
    };

    const target = demoCredentials[role] || demoCredentials.farmer;
    return login(target);
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === "admin";
  const isExpert = currentUser?.role === "expert";
  const isFarmer = currentUser?.role === "farmer";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        isExpert,
        isFarmer,
        isLoading,
        login,
        register,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
