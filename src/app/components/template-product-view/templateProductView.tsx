import Link from "next/link";
import { data, login } from "@/app/data";
import { useState } from "react";
import CardProduct from "../cardProductLike/cardProductLike";
import TitleComponent from "../titleComponent/titleComponent";

export default function TemplateProductView() {
  const [dataList, setData] = useState(data);
  const styleCustom = { width: "25%" };

  const handleChangeType = (e: any) => {
    const id = e.target.id;

    id == "shirt" && getDataType("shirt");
    id == "bag" && getDataType("bag");
    id == "shoes" && getDataType("shoes");
    !id && setData(data);

    document.querySelector(".activeTabView")?.classList.remove("activeTabView");
    e.target.classList.add("activeTabView");
  };

  const getDataType = (type: string) => {
    const dataType = data.filter((item: any) => {
      return item.type.includes(type);
    });
    return setData(dataType);
  };

  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitleComponent title="Best sellers" />
        <div className="my-[35px] mx-[0] flex justify-between">
          <div className="flex gap-[12px] items-center">
            <div
              className="activeTabView [&.activeTabView]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
            >
              all products
            </div>
            <div
              className="[&.activeTabView]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
              id="shirt"
            >
              shirt
            </div>
            <div
              className="[&.activeTabView]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
              id="bag"
            >
              Bag
            </div>
            <div
              className="[&.activeTabView]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
              id="shoes"
            >
              Shoes
            </div>
          </div>
          <div>
            <Link
              href="#"
              className="bg-button text-white text-[1.6em] font-normal capitalize py-[8px] px-[14px] hover:opacity-90"
            >
              show all
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap mx-mCard">
          {dataList.slice(0, 8).map((item: any) => {
            return (
              <CardProduct
                key={item.id}
                data={item}
                styleCustom={styleCustom}
                login={login}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
