"use client";

// import CardProduct from "@/app/components/cardProductLike/cardProduct";
import Filter from "@/app/components/filter/filter";
import Pagination from "@/app/components/pagination/pagination";
import TitlePageNavigation from "@/app/components/titlePageNavigation/titlePageNavigation";
import { data } from "@/app/data";
import { useLayoutEffect, useState } from "react";

const Trousers = () => {
  const styleCustom = { width: "33.333333%" };
  const [dataLists, setDataLists] = useState(data);

  useLayoutEffect(() => {
    const filtered = dataLists.filter((item: any) => {
      return item.type == "trousers";
    });
    setDataLists(filtered);
  }, []);
  return <></>;
};

export default Trousers;
