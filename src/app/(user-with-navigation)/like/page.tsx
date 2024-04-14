"use client";

import { useState } from "react";
import style from "./like.module.scss";
import { data, login } from "@/app/data";
import CardProduct from "@/app/components/cardProduct/cardProduct";
import Pagination from "@/app/components/pagination/pagination";
import ShowingPage from "@/app/components/showingPage/showingPage";

const Like = () => {
  const [dataList, setDataList] = useState(data);
  return (
    <div className={`${style.like}`}>
      <div className={`${style.likeContainer}`}>
        <ShowingPage />
        <div className={`${style.likeContent}`}>
          <div className={`${style.likeList}`}>
            {dataList.map((item: any) => {
              return <CardProduct key={item.id} data={item} login={login} />;
            })}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Like;
