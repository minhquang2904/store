import { ReactNode } from "react";
import style from "./mainLayOut.module.scss";
import NavBar from "../../../components/navbar/navbar";
import Footer from "@/app/components/footer/footer";
import Support from "@/app/components/support/support";

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div
      className={`mainLayout`}
      style={{ backgroundColor: "#F3F4F4", minHeight: "100vh" }}
    >
      <NavBar />
      {children}
      <Support />
      <Footer />
    </div>
  );
}
