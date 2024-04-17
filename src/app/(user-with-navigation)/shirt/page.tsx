"use client";

import { useLayoutEffect, useState } from "react";
import style from "./shirt.module.scss";
import { data } from "@/app/data";
import TitlePageNavigation from "@/app/components/titlePageNavigation/titlePageNavigation";
import Pagination from "@/app/components/pagination/pagination";
import CardProduct from "@/app/components/cardProduct/cardProduct";
import Filter from "@/app/components/filter/filter";

const Shirt = () => {
  const styleCustom = { width: "33.333333%" };
  const [dataLists, setDataLists] = useState([]);
  const [type, setType] = useState(["shirt"]);

  const childToParent = (data: any, check: any) => {
    if (!check) {
      const filtered = type.filter((item: any) => {
        return item != data;
      });
      setType([...filtered]);
    } else {
      setType([data, ...type]);
    }
  };

  useLayoutEffect(() => {
    const filtered = data.filter((item: any) => {
      return type.includes(item.type) || type.includes(item.size);
    });

    setDataLists(filtered);
  }, [type]);
  return (
    <div className={`${style.filter}`}>
      <div className={`${style.filterContainer}`}>
        <TitlePageNavigation />
        <div className={`${style.filterContent}`}>
          <Filter checkType="shirt" childParent={childToParent} />
          <div className={`${style.filterContentRight}`}>
            {dataLists.map((item: any) => {
              return (
                <CardProduct
                  key={item.id}
                  data={item}
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

export default Shirt;
