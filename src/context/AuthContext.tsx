"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginCredentials, RegisterData, UserRole } from "@/types/auth";
import { getStoredUsers, saveUser, INITIAL_USERS } from "@/lib/storage";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isExpert: boolean;
  isFarmer: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  demoLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_SESSION_KEY = "KRISHI_DRISHTI_CURRENT_USER";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_SESSION_KEY);
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      } else {
        // Default to demo farmer logged in so the user immediately experiences the platform seamlessly
        const defaultFarmer = INITIAL_USERS[1]; // Md. Rafiqul Islam (Farmer)
        setCurrentUser(defaultFarmer);
        localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(defaultFarmer));
      }
    } catch {
      // fallback
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const user = users.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase().trim());

    if (!user) {
      return { success: false, error: "এই ইমেল বা ফোন নম্বরের কোনো অ্যাকাউন্ট পাওয়া যায়নি।" };
    }

    // For demo purposes, any password of length >= 4 works, or specific test password
    if (credentials.password.length < 4) {
      return { success: false, error: "পাসওয়ার্ড ন্যূনতম ৪ অক্ষরের হতে হবে।" };
    }

    setCurrentUser(user);
    if (typeof window !== "undefined") {
      localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(user));
    }

    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase().trim())) {
      return { success: false, error: "এই ইমেল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা আছে।" };
    }

    const newUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || "01700000000",
      role: data.role || "farmer",
      district: data.district || "ঢাকা",
      upazila: data.upazila || "",
      createdAt: new Date().toISOString(),
      avatar:
        data.role === "admin"
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
          : data.role === "expert"
          ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    };

    saveUser(newUser);
    setCurrentUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(newUser));
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(CURRENT_USER_SESSION_KEY);
    }
  };

  const demoLogin = (role: UserRole) => {
    const target = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[1];
    setCurrentUser(target);
    if (typeof window !== "undefined") {
      localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(target));
    }
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
