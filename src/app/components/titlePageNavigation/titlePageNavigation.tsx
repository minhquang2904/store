import Image from "next/image";
import Link from "next/link";

const TitlePageNavigation = (props: any) => {
  return (
    <div className="text-text text-[1.6em] font-medium !relative flex items-center">
      <Link href="/" className="text-[#05a]">
        Home
      </Link>
      <Image
        src="/icons/arrow-right-1.svg"
        className="mx-[4px] !relative max-w-[16px] max-h-[16px]"
        alt="Product 1"
        fill
        sizes="100vw"
      />
      <Link href="/" className="text-[#05a]">
        Shirt
      </Link>
    </div>
  );
};

export default TitlePageNavigation;
