"use client";
import React, { createContext, useContext, ReactNode } from "react";

import useFilter from "../hooks/useFilter";

interface FilterContextType {
  categories: any;
  size: any;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const { categories, size } = useFilter();

  return (
    <FilterContext.Provider
      value={{
        categories,
        size,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
