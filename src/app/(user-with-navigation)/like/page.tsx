"use client";

import { useState } from "react";
import { data, login } from "@/app/data";
import CardProduct from "@/app/components/cardProduct/cardProduct";
import Pagination from "@/app/components/pagination/pagination";
import ShowingPage from "@/app/components/showingPage/showingPage";

const Like = () => {
  const styleCustom = { width: "25%" };
  const [dataList, setDataList] = useState(data);
  return (
    <div className="flex justify-center items-center px-[15px]">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <ShowingPage
          title="Wish Lists"
          subTitle="Showing 1 - 16 of 72 results"
        />
        <div className="mt-[16px]">
          <div className="flex flex-wrap mx-mCard">
            {dataList.map((item: any) => {
              return (
                <CardProduct
                  key={item.id}
                  data={item}
                  login={login}
                  styleCustom={styleCustom}
                />
              );
            })}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Like;
