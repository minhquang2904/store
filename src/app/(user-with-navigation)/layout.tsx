"use client";
import React from "react";
import { ReactNode } from "react";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";
import NavBar from "../components/navbar/navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#F3F4F4] min-h-[100vh] mainLayout">
      <NavBar />
      <main>{children}</main>
      <Support />
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
