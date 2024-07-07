"use client";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";
import NavBar from "../components/navbar/navbar";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/loading/loading";

const Layout = ({ children }: { children: ReactNode }) => {
  const { loadingAuth } = useAuthContext();
  if (loadingAuth) {
    return <Loading />;
  }
  return (
    <>
      <div className="bg-primary min-h-[100vh] mainLayout">
        <NavBar />
        <main>{children}</main>
        <Support />
        <Footer />
      </div>
    </>
  );
};

export default React.memo(Layout);
