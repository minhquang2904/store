"use client";
import React, { createContext, useContext, ReactNode } from "react";

import useAuth from "../hooks/useAuth";

interface AuthContextType {
  user: any;
  loadingAuth: boolean;
  setUser: any;
  setLoadingAuth: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loadingAuth, setUser, setLoadingAuth } = useAuth();

  return (
    <AuthContext.Provider
      value={{ user, loadingAuth, setUser, setLoadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
