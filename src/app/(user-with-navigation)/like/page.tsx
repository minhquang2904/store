"use client";

import { useState } from "react";
import style from "./like.module.scss";
import { data, login } from "@/app/data";
import CardProduct from "@/app/components/cardProduct/cardProduct";
import Pagination from "@/app/components/pagination/pagination";
import ShowingPage from "@/app/components/showingPage/showingPage";

const Like = () => {
  const styleCustom = { width: "25%" };
  const [dataList, setDataList] = useState(data);
  return (
    <div className="flex justify-center items-center">
      <div className={`${style.likeContainer}`}>
        <ShowingPage />
        <div className="mt-[16px]">
          <div className="flex flex-wrap mx-[-12px]">
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
