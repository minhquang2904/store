"use client";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import NavAdmin from "@/app/components/navAdmin/navAdmin";
import HeaderAdmin from "@/app/components/headerAdmin/headerAdmin";
import { usePathname } from "next/navigation";
import Loading from "@/app/components/loading/loading";
import { useAuthContext } from "@/app/context/AuthContext";
const Layout = ({ children }: { children: ReactNode }) => {
  const { loadingAuth } = useAuthContext();
  const pathName = usePathname();

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

  useEffect(() => {
    window.innerWidth <= 768 && setNav(true);
  }, [pathName]);

  return (
    <>
      {loadingAuth && <Loading />}
      {!nav && (
        <div
          className="z-[500] bg-[rgba(0,0,0,0.7)] xsm:fixed sm:fixed l:relative top-[0] right-[0] left-[0] bottom-[0]"
          onClick={handleShowNav}
        ></div>
      )}
      <div className="bg-[#F3F4F4] min-h-[100vh] mainLayout">
        <NavAdmin nav={nav} handleShowNav={handleShowNav} />
        <main
          className={`${nav ? "l:pl-[75px]" : "l:pl-[265px]"} duration-200`}
        >
          <HeaderAdmin childToParent={handleShowNav} />
          <div className="xsm:px-[15px] px-[30px] py-[20px]">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
