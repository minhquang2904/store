"use client";

import Filter from "@/app/components/filter/filter";
import Pagination from "@/app/components/pagination/pagination";
import TitlePageNavigation from "@/app/components/titlePageNavigation/titlePageNavigation";

const CategoryPage = ({ searchParams }: any) => {
  console.log(searchParams);
  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitlePageNavigation />
        <div className="l:mt-[50px] sm:mt-[40px] xsm:mt-[30px] flex justify-between sm:flex-col xsm:flex-col l:flex-row">
          <Filter />
          <div className="l:w-[70%] flex flex-wrap mx-mCard xsm:mt-[20px] sm:mt-[20px] l:mt-[ 0px]">
            {/* {dataLists.map((item: any) => {
          return <CardProduct key={item.id} data={item} />;
        })} */}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default CategoryPage;
