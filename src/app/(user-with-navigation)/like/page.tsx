"use client";

import Link from "next/link";
import { useState } from "react";
import style from "./like.module.scss";
import { data, login } from "@/app/data";
import CardProduct from "@/app/components/cardProduct/cardProduct";
import IconArrowLeft from "@/app/components/iconArrowLeft/iconArrowLeft";
import IconArrowRight from "@/app/components/iconArrowRight/iconArrowRight";

const Like = () => {
  const [dataList, setDataList] = useState(data);
  return (
    <div className={`${style.like}`}>
      <div className={`${style.likeContainer}`}>
        <div className={`${style.likeHeader}`}>
          <h1>Wish Lists</h1>
          <p>Showing 1 - 16 of 72 results</p>
        </div>
        <div className={`${style.likeContent}`}>
          <div className={`${style.likeList}`}>
            {dataList.map((item: any) => {
              return <CardProduct key={item.id} data={item} login={login} />;
            })}
          </div>
        </div>
        <div className={`${style.likeFooter}`}>
          <div className={`${style.likeIconLeft}`}>
            <IconArrowLeft stroke="#ACAAB2" />
          </div>
          <div className={`${style.likePage}`}>
            <ul>
              <Link href="/" className={`${style.active}`}>
                1
              </Link>
              <Link href="/">2</Link>
              <Link href="/">3</Link>
              <Link href="/">4</Link>
              <Link href="/">5</Link>
            </ul>
          </div>
          <div className={`${style.likeIconRight}`}>
            <IconArrowRight stroke="#333237" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Like;
