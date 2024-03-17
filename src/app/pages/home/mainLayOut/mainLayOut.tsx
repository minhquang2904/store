import { ReactNode } from "react";
import NavBar from "../../../components/navbar/navbar";
import style from "./mainLayOut.module.scss";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div
      className={`${jost.className} mainLayout`}
      style={{ backgroundColor: "#F3F4F4", minHeight: "1000vh" }}
    >
      <NavBar />
      {children}
    </div>
  );
}
