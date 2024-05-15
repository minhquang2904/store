"use client";
import MenuProfile from "@/app/components/menuProfile/menuProfile";
import React from "react";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          <h1 className="sm:text-[3.2em] xsm:text-[2.8em] font-medium capitalize text-text mb-[30px]">
            My Profile
          </h1>
          <div className="flex gap-x-[20px]">
            <MenuProfile />
            <div className="w-[70%]">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Layout);
