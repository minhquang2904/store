"use client";
import React from "react";
import { ReactNode } from "react";
import style from "./mainLayOut.module.scss";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";
import NavBar from "../components/navbar/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#F3F4F4] mainLayout">
      <NavBar />
      <main>{children}</main>
      <Support />
      <Footer />
    </div>
  );
}
