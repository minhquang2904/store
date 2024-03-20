import { ReactNode } from "react";
import NavBar from "../../../components/navbar/navbar";
import style from "./mainLayOut.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div
      className={`mainLayout`}
      style={{ backgroundColor: "#F3F4F4", minHeight: "1000vh" }}
    >
      <NavBar />
      {children}
    </div>
  );
}
