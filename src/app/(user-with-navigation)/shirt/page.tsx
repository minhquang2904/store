"use client";

import { useLayoutEffect, useState } from "react";
import { data } from "@/app/data";
import TitlePageNavigation from "@/app/components/titlePageNavigation/titlePageNavigation";
import Pagination from "@/app/components/pagination/pagination";
import CardProduct from "@/app/components/cardProduct/cardProduct";
import Filter from "@/app/components/filter/filter";

const Shirt = () => {
  const styleCustom = { width: "33.333333%" };
  const [dataLists, setDataLists] = useState(data);
  const [type, setType] = useState(["shirt"]);
  const [size, setSize] = useState([null]);

  const childParentType = (data: any, check: any) => {
    if (!check) {
      const filtered = type.filter((item: any) => {
        return item != data;
      });
      setType([...filtered]);
    } else {
      setType([data, ...type]);
    }
  };

  const childParentSize = (data: any, check: any) => {
    if (!check) {
      const filtered = size.filter((item: any) => {
        return item != data;
      });
      setSize([...filtered]);
    } else {
      setSize([data, ...size]);
    }
  };

  useLayoutEffect(() => {
    const filteredType = data.filter((item: any) => {
      return type.includes(item.type.toString());
    });
    setDataLists(filteredType);
    // if (size.length > 0) {
    //   const filteredSize = dataLists.filter((item: any) => {
    //     console.log(item.size);
    //     return size.some((size: any) => item.size.includes(size));
    //   });
    //   setDataLists(filteredSize);
    // }
  }, [type, size]);

  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitlePageNavigation />
        <div className="l:mt-[50px] sm:mt-[40px] xsm:mt-[30px] flex justify-between sm:flex-col xsm:flex-col l:flex-row">
          <Filter
            checkType="shirt"
            childParentType={childParentType}
            childParentSize={childParentSize}
          />
          <div className="l:w-[70%] flex flex-wrap mx-mCard xsm:mt-[20px] sm:mt-[20px] l:mt-[ 0px]">
            {dataLists.map((item: any) => {
              return <CardProduct key={item.id} data={item} />;
            })}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Shirt;
