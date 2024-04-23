import Link from "next/link";
import Image from "next/image";

const BackForm = (props: any) => {
  const { url } = props;
  return (
    <Link href={url}>
      <div className="group !relative mb-[30px] inline-flex items-center py-[4px] px-[8px] rounded-md duration-300 hover:bg-[rgba(151,179,231,0.4)]">
        <Image
          src="/icons/arrowLeft.svg"
          className="group-hover:translate-x-[-4px] !relative mr-[8px] sm:h-[16px] xsm:w-[14px] xsm:h-[14px]  duration-300"
          alt="LOGO"
          sizes="100vw"
          width={16}
          height={16}
        />
        <h4 className="text-text text-[1.6em] xsm:text-subMobile font-medium">
          Back
        </h4>
      </div>
    </Link>
  );
};

export default BackForm;
