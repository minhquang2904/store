"use client";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#F3F4F4] min-h-[100vh] mainLayout">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
