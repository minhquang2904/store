import Link from "next/link";
import Image from "next/image";
import style from "./bannerGroup.module.scss";

export default function BannerGroup() {
  return (
    <div className="px-[15px] flex justify-center items-center">
      <div className={`${style.bannerGroupContainer}`}>
        <div className="grid grid-cols-4 grid-rows-[324px_324px] gap-[24px]">
          <Link
            href="#"
            className="group row-start-1 col-start-1 row-end-3 col-end-3 !relative"
          >
            <Image
              src="/images/bannerGroup1.png"
              className="!relative object-cover"
              alt="LOGIN"
              fill
              sizes="(max-width: 648px),100vw"
              priority={true}
            />
            <div className="group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 opacity-0">
              <div>
                <h1 className="uppercase text-[4em] tracking-[10px]">women</h1>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="group row-start-1 col-start-3 row-end-2 col-end-5 !relative"
          >
            <Image
              src="/images/bannerGroup2.jpg"
              className="!relative object-cover object-right-top"
              alt="LOGIN"
              fill
              sizes="(max-width: 648px),100vw"
              priority={true}
            />
            <div className="group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 opacity-0">
              <div>
                <h1 className="uppercase text-[4em] tracking-[10px]">man</h1>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="group row-start-2 col-start-3 row-end-3 col-end-4 !relative"
          >
            <Image
              src="/images/bannerGroup3.jpg"
              className="!relative object-cover"
              alt="LOGIN"
              fill
              sizes="(max-width: 648px),100vw"
              priority={true}
            />
            <div className="group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 opacity-0">
              <div>
                <h1 className="uppercase text-[4em] tracking-[10px]">bag</h1>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="group row-start-2 col-start-4 row-end-3 col-end-5 !relative"
          >
            <Image
              src="/images/bannerGroup4.jpg"
              className="!relative object-cover"
              alt="LOGIN"
              fill
              sizes="(max-width: 648px),100vw"
              priority={true}
            />
            <div className="group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 opacity-0">
              <div>
                <h1 className="uppercase text-[4em] tracking-[10px]">shoes</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
