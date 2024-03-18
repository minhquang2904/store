import Image from "next/image";
import style from "./brandList.module.scss";

export default function BrandList() {
  return (
    <div className={`${style.brandList}`}>
      <div className={`${style.brandItem}`}>
        <Image
          src="/images/brand-1.png"
          className={`${style.logo}`}
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
      <div className={`${style.brandItem}`}>
        <Image
          src="/images/brand-2.png"
          className={`${style.logo}`}
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
      <div className={`${style.brandItem}`}>
        <Image
          src="/images/brand-3.png"
          className={`${style.logo}`}
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
      <div className={`${style.brandItem}`}>
        <Image
          src="/images/brand-4.png"
          className={`${style.logo}`}
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
      <div className={`${style.brandItem}`}>
        <Image
          src="/images/brand-5.png"
          className={`${style.logo}`}
          alt="Brand"
          fill
          sizes="(width: 200px) 100vw"
          priority={true}
        />
      </div>
    </div>
  );
}
