"use client";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";
import NavBar from "../components/navbar/navbar";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/loading/loading";
import { useCartContext } from "../context/CartContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { loadingAuth, user } = useAuthContext();
  const { cart } = useCartContext();

  useEffect(() => {
    if (user && cart) {
      const fetchData = async () => {
        console.log("Fetching data for user:", user.id);
        try {
          const res = await fetch(
            `https://recommend-product.vercel.app/get_data_history_order/?userId=${user.id}`
          );
          const result = await res.json();

          console.log("Data fetched:", JSON.parse(result));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [user, cart]);

  return (
    <>
      {loadingAuth && <Loading />}
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
