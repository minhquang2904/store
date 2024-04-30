import Image from "next/image";
import style from "./brandList.module.scss";

export default function BrandList() {
  return (
    <div
      className={`${style.brandList} shrink-0 flex items-center justify-around min-w-full`}
    >
      <div className="!relative">
        <Image
          src="/images/brand-1.png"
          className="!relative sm:!min-w-[200px] xsm:!min-w-[160px] max-h-[70px]"
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
      <div className="!relative">
        <Image
          src="/images/brand-2.png"
          className="!relative sm:!min-w-[200px] xsm:!min-w-[160px] max-h-[70px]"
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
      <div className="!relative">
        <Image
          src="/images/brand-3.png"
          className="!relative sm:!min-w-[200px] xsm:!min-w-[160px] max-h-[70px]"
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
      <div className="!relative">
        <Image
          src="/images/brand-4.png"
          className="!relative sm:!min-w-[200px] xsm:!min-w-[160px] max-h-[70px]"
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
      <div className="!relative">
        <Image
          src="/images/brand-5.png"
          className="!relative sm:!min-w-[200px] xsm:!min-w-[160px] max-h-[70px]"
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
    </div>
  );
}
