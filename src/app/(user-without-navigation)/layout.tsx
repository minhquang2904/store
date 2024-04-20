import { ReactNode } from "react";
import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-white min-h-screen flex">
      <div className="w-2/4 !relative">
        <Image
          src="/images/logo.svg"
          className="z-10 min-w-[143px] max-w-[143px] min-h-[58px] max-h-[58px] !mt-[40px] !ml-[40px]"
          alt="Image"
          fill
          sizes="100vw"
          priority={true}
        />
        <Image
          src="/images/login1.svg"
          className="!relative w-full max-h-[100vh] h-full object-cover object-top"
          fill
          sizes="100vw"
          alt="Image"
          priority={true}
        />
      </div>
      <div className="w-2/4 flex flex-col justify-center items-center">
        <div className="max-w-[445px] w-full">{children}</div>
      </div>
    </main>
  );
}
