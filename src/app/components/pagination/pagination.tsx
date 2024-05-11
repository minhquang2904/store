import Link from "next/link";
import IconArrowLeft from "../iconArrowLeft/iconArrowLeft";
import IconArrowRight from "../iconArrowRight/iconArrowRight";

const Number = (props: any) => {
  const { number, active } = props;
  return (
    <Link
      href="/"
      className={`hover:bg-button ${active} [&.active]:bg-button [&.active]:text-white hover:text-white duration-200 ease-out mx-[8px] sm:w-[45px] sm:h-[45px] xsm:w-[38px] xsm:h-[38px] rounded-sm text-text xsm:text-[1.6em] sm:text-[1.8em] border-solid border-[1px] border-button font-semibold flex items-center justify-center`}
    >
      {number}
    </Link>
  );
};

const Pagination = (props: any) => {
  return (
    <div className="mt-[30px] flex justify-end items-center">
      <div className="p-[10px] rounded-half hover:bg-hover1 cursor-pointer">
        <IconArrowLeft stroke="#ACAAB2" />
      </div>
      <div className="mx-[6px]">
        <ul className="flex">
          <Number number="1" active="active" />
          <Number number="2" />
          <Number number="3" />
          <Number number="4" />
          <Number number="5" />
        </ul>
      </div>
      <div className="p-[10px] rounded-half hover:bg-hover1 cursor-pointer">
        <IconArrowRight stroke="#333237" />
      </div>
    </div>
  );
};

export default Pagination;
