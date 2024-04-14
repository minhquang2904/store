import Image from "next/image";
import Link from "next/link";
import style from "./titlePageNavigation.module.scss";

const TitlePageNavigation = (props: any) => {
  return (
    <div className={`${style.detailPageNavigation}`}>
      <Link href="/">Home</Link>
      <Image
        src="/icons/arrow-right-1.svg"
        className={`${style.icon}`}
        alt="Product 1"
        fill
        sizes="100vw"
      />
      <Link href="/">Shirt</Link>
    </div>
  );
};

export default TitlePageNavigation;
