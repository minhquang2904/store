import { ReactNode } from "react";
import Image from "next/image";
import style from "./layoutAccount.module.scss";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutAccount({ children }: LayoutProps) {
  return (
    <main className={`bg-white min-h-screen ${style.main}`}>
      <div className={style.formImage}>
        <Image
          src="/images/logo.svg"
          className={style.logo}
          alt="LOGO"
          layout="fill"
        />
        <Image
          src="/images/login1.svg"
          className={style.image}
          alt="IMAGE"
          layout="fill"
        />
      </div>
      <div className={`${style.formLogin} ${jost.className}`}>
        <div className={`${style.formContainer}`}>{children}</div>
      </div>
    </main>
  );
}
