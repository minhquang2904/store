"use client";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";
import NavBar from "../components/navbar/navbar";
import useAuth from "../hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../components/loading/loading";
import useFetchUser from "../hooks/useFetchUser";

const protectedRoutes = ["/cart", "/profile", "/like"];

const Layout = ({ children }: { children: ReactNode }) => {
  const { id, loadingAuth } = useAuth();
  const users = useFetchUser({ id });
  const pathName = usePathname();
  const { push } = useRouter();
  const [dataUser, setDataUser] = useState(null) as any;

  useEffect(() => {
    if (!loadingAuth) {
      if (protectedRoutes.includes(pathName) && !id) {
        fetch("/api/users/logout", { method: "POST" })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === 200) {
              push("/login");
            }
          });
      }
      setDataUser(users);
      console.log("setUser---setUser");
    }
  }, [id]);
  return (
    <>
      {loadingAuth && <Loading />}
      <div className="bg-[#F3F4F4] min-h-[100vh] mainLayout">
        <NavBar dataUser={dataUser} />
        {/* <NavBar id={id} loading Auth={loadingAuth} /> */}
        <main>{children}</main>
        <Support />
        <Footer />
      </div>
    </>
  );
};

export default React.memo(Layout);
