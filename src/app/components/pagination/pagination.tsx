import Link from "next/link";
import IconArrowLeft from "../iconArrowLeft/iconArrowLeft";
import IconArrowRight from "../iconArrowRight/iconArrowRight";

const Pagination = (props: any) => {
  return (
    <div className="mt-[30px] flex justify-end items-center">
      <div className="p-[10px] rounded-half hover:bg-hover1 cursor-pointer">
        <IconArrowLeft stroke="#ACAAB2" />
      </div>
      <div className="mx-[6px]">
        <ul className="flex">
          <Link
            href="/"
            className="hover:bg-button [&.active]:bg-button [&.active]:text-white active hover:text-white duration-200 ease-out mx-[8px] w-[45px] h-[45px] rounded-sm text-text text-[1.8em] border-solid border-[1px] border-button font-semibold flex items-center justify-center"
          >
            1
          </Link>
          <Link
            href="/"
            className="hover:bg-button [&.active]:bg-button hover:text-white duration-200 ease-out mx-[8px] w-[45px] h-[45px] rounded-sm text-text text-[1.8em] border-solid border-[1px] border-button font-semibold flex items-center justify-center"
          >
            2
          </Link>
          <Link
            href="/"
            className="hover:bg-button [&.active]:bg-button hover:text-white duration-200 ease-out mx-[8px] w-[45px] h-[45px] rounded-sm text-text text-[1.8em] border-solid border-[1px] border-button font-semibold flex items-center justify-center"
          >
            3
          </Link>
          <Link
            href="/"
            className="hover:bg-button [&.active]:bg-button hover:text-white duration-200 ease-out mx-[8px] w-[45px] h-[45px] rounded-sm text-text text-[1.8em] border-solid border-[1px] border-button font-semibold flex items-center justify-center"
          >
            4
          </Link>
          <Link
            href="/"
            className="hover:bg-button [&.active]:bg-button hover:text-white duration-200 ease-out mx-[8px] w-[45px] h-[45px] rounded-sm text-text text-[1.8em] border-solid border-[1px] border-button font-semibold flex items-center justify-center"
          >
            5
          </Link>
        </ul>
      </div>
      <div className="p-[10px] rounded-half hover:bg-hover1 cursor-pointer">
        <IconArrowRight stroke="#333237" />
      </div>
    </div>
  );
};

export default Pagination;
