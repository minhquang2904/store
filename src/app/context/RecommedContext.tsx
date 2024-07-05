"use client";
import React, { createContext, useContext, ReactNode } from "react";

import useGetRecommend from "../hooks/useRecommend";

interface RecommendContextType {
  recommend: any;
  triggerFetchRecommend: () => void;
}

const RecommendContext = createContext<RecommendContextType | undefined>(
  undefined
);

export const RecommendProvider = ({ children }: { children: ReactNode }) => {
  const { recommend, triggerFetchRecommend } = useGetRecommend();

  return (
    <RecommendContext.Provider
      value={{
        recommend,
        triggerFetchRecommend,
      }}
    >
      {children}
    </RecommendContext.Provider>
  );
};

export const useRecommendContext = () => {
  const context = useContext(RecommendContext);
  if (context === undefined) {
    throw new Error(
      "useRecommendContext must be used within a RecommendProvider"
    );
  }
  return context;
};
