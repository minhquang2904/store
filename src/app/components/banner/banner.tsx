import style from "./banner.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <div className={`${style.banner} flex justify-center items-center`}>
      <div className={`${style.bannerContainer} flex items-center`}>
        <div className="shrink-0 grow-0 basis-2/4">
          <div className="mb-[6px]">
            <h1 className="text-[6em] font-medium capitalize text-text">
              Collections
            </h1>
          </div>
          <div className="mb-[40px]">
            <p className="text-text capitalize font-light text-[2.4em]">
              You can explore ans shop many differnt collection from various
              barands here.
            </p>
          </div>
          <div className="inline-block">
            <Link
              href="#"
              className="group bg-button hover:opacity-90 !relative inline-flex py-[10px] px-[14px] rounded-sm items-center"
            >
              <button className="text-[1.6em] mr-[10px]">Shop Now</button>
              <Image
                src="/icons/arrowRight.svg"
                className="!relative max-w-[20px] dark:invert group-hover:translate-x-[6px] duration-500"
                alt="Arrow"
                fill
                sizes="100vw"
                priority={true}
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-center shrink-0 grow-0 basis-2/4">
          <div className="relative  before:border-solid before:border-[2px] before:border-[#00000040] before:content-[''] before:h-full before:w-full before:top-[16px] before:left-[16px] before:absolute z-0">
            <Image
              src="/images/picture2.png"
              className="!relative object-cover max-w-[424px] shadow-sm"
              alt="Picture"
              fill
              sizes="(max-width: 542px) 100vw"
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
