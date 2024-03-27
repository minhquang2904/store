import { ReactNode } from "react";
import Image from "next/image";
import style from "./layoutAccount.module.scss";

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
          fill
          sizes="100vw"
          priority={true}
        />
        <Image
          src="/images/login1.svg"
          className={style.image}
          alt="LOGIN"
          fill
          sizes="100vw"
          priority={true}
        />
      </div>
      <div className={`${style.formLogin}`}>
        <div className={`${style.formContainer}`}>{children}</div>
      </div>
    </main>
  );
}
