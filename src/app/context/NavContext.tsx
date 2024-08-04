"use client";
import React, { createContext, useContext, ReactNode } from "react";

import useNav from "../hooks/useNav";

interface NavContextType {
  nav: any;
  setNav: any;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const { nav, setNav } = useNav();

  return (
    <NavContext.Provider
      value={{
        nav,
        setNav,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
