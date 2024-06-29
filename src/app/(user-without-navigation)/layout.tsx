import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-white min-h-screen flex l:flex-row sm:flex-col xsm:flex-col">
      <div className="w-2/4 !relative sm:w-full xsm:w-full">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            className="z-10 min-w-[143px] max-w-[143px] xsm:max-w-[100px] xsm:min-w-[100px] min-h-[58px] max-h-[58px] !mt-[40px] !ml-[40px] xsm:!mt-[20px] xsm:!ml-[20px]"
            alt="Image"
            fill
            sizes="100vw"
            priority={true}
          />
        </Link>
        <Image
          src="/images/login1.svg"
          className="sm:max-h-[600px] !relative w-full l:max-h-[100vh] h-full object-cover object-top"
          fill
          sizes="100vw"
          alt="Image"
          priority={true}
        />
      </div>
      <div className="w-2/4 flex flex-col justify-center items-center sm:w-full sm:p-[30px] xsm:w-full xsm:p-[30px]">
        <div className="max-w-[445px] w-full sm:p-[30px] md:max-w-[500px] xsm:p-[30px]">
          {children}
        </div>
      </div>
    </main>
  );
}
