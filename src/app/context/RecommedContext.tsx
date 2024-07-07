"use client";
import React, { createContext, useContext, ReactNode } from "react";

import useGetRecommend from "../hooks/useRecommend";

interface RecommendContextType {
  recommend: any;
  triggerFetchRecommend: () => void;
  fetchDataRecommend: () => void;
  setRecommend: (data: any) => void;
  related: any;
  setRelated: (data: any) => void;
}

const RecommendContext = createContext<RecommendContextType | undefined>(
  undefined
);

export const RecommendProvider = ({ children }: { children: ReactNode }) => {
  const {
    recommend,
    triggerFetchRecommend,
    fetchDataRecommend,
    setRecommend,
    related,
    setRelated,
  } = useGetRecommend();

  return (
    <RecommendContext.Provider
      value={{
        recommend,
        triggerFetchRecommend,
        fetchDataRecommend,
        setRecommend,
        related,
        setRelated,
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
