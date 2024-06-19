"use client";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";
import NavBar from "../components/navbar/navbar";
import useAuth from "../hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

const protectedRoutes = ["/cart", "/profile", "/like"];

const Layout = ({ children }: { children: ReactNode }) => {
  const { id, loadingAuth } = useAuth();
  const pathName = usePathname();
  const { push } = useRouter();

  console.log("id", id, loadingAuth);
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
    }
  }, [id]);
  return (
    <div className="bg-[#F3F4F4] min-h-[100vh] mainLayout">
      <NavBar id={id} />
      <main>{children}</main>
      <Support />
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
