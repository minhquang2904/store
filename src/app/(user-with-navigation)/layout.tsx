"use client";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";
import NavBar from "../components/navbar/navbar";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/loading/loading";

const protectedRoutes = ["/cart", "/profile", "/like"];

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, loadingAuth } = useAuthContext();
  console.log("user - layout", user, loadingAuth);
  return (
    <>
      {loadingAuth && <Loading />}
      <div className="bg-[#F3F4F4] min-h-[100vh] mainLayout">
        <NavBar />
        <main>{children}</main>
        <Support />
        <Footer />
      </div>
    </>
  );
};

export default React.memo(Layout);
