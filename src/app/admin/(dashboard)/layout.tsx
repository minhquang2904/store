"use client";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import NavAdmin from "@/app/components/navAdmin/navAdmin";
import HeaderAdmin from "@/app/components/headerAdmin/headerAdmin";
import { CustomContext } from "@/app/context/context";
import Cookies from "js-cookie";
import Loading from "@/app/components/loading/loading";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const Layout = ({ children }: { children: ReactNode }) => {
  const token = Cookies.get("LOGIN-INFO-ADMIN");
  const [dataDecode, setDataDecode] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  useLayoutEffect(() => {
    setLoading(true);
    if (token) {
      fetch("/api/admin/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setDataDecode(data.payload);
          }
          if (data.status === 400 || data.status === 500) {
            Cookies.remove("LOGIN-INFO-ADMIN");
            router.push("/admin/login");
          }
          setLoading(false);
        });
    }
  }, []);

  const [path, setPath] = useState(null);

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
      {loading && <Loading />}
      {!nav && (
        <div
          className="z-[500] bg-[rgba(0,0,0,0.7)] xsm:fixed sm:fixed l:relative top-[0] right-[0] left-[0] bottom-[0]"
          onClick={handleShowNav}
        ></div>
      )}
      <CustomContext.Provider value={path}>
        <div className="bg-[#F3F4F4] min-h-[100vh] mainLayout">
          <NavAdmin nav={nav} handleShowNav={handleShowNav} />
          <main
            className={`${nav ? "l:pl-[75px]" : "l:pl-[265px]"} duration-200`}
          >
            <HeaderAdmin
              dataDecode={dataDecode}
              childToParent={handleShowNav}
            />
            <div className="xsm:px-[15px] px-[30px] py-[20px]">{children}</div>
          </main>
        </div>
      </CustomContext.Provider>
    </>
  );
};

export default Layout;
