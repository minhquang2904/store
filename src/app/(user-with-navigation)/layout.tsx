import React from "react";
import { ReactNode } from "react";
import style from "./mainLayOut.module.scss";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";
import NavBar from "../components/navbar/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`mainLayout`}
      style={{ backgroundColor: "#F3F4F4", minHeight: "100vh" }}
    >
      <NavBar />
      <main>{children}</main>
      <Support />
      <Footer />
    </div>
  );
}
