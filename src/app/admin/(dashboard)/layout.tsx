"use client";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import NavAdmin from "@/app/components/navAdmin/navAdmin";
import HeaderAdmin from "@/app/components/headerAdmin/headerAdmin";

const Layout = ({ children }: { children: ReactNode }) => {
  const getInitialNav = () => {
    if (typeof window !== "undefined") {
      const navActive = localStorage.getItem("nav-active");
      return navActive ? JSON.parse(navActive) : false;
    }
    return false;
  };
  const [nav, setNav] = useState(false);

  useLayoutEffect(() => {
    const initial = getInitialNav();
    setNav(initial);
  }, []);

  useLayoutEffect(() => {
    localStorage.setItem("nav-active", JSON.stringify(nav));
  }, [nav]);

  const handleShowNav = () => {
    setNav(!nav);
  };
  return (
    <div className="bg-[#F3F4F4] min-h-[100vh] mainLayout">
      <NavAdmin nav={nav} handleShowNav={handleShowNav} />
      <main className={`${nav ? "pl-[75px]" : "pl-[265px]"} duration-200`}>
        <HeaderAdmin />
        <div className="px-[30px] py-[20px]">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
