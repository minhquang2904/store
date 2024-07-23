import Link from "next/link";
import { data, login } from "@/app/data";
import { useEffect, useState } from "react";
import CardProduct from "../cartProduct/cartProduct";
import TitleComponent from "../titleComponent/titleComponent";

export default function TemplateProductView() {
  const [dataList, setData] = useState(data);
  const [products, setProducts] = useState(null) as any;

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

  const getNewProduct = () => {
    try {
      fetch("/api/product/new-product")
        .then((res) => res.json())
        .then((result) => {
          const { data, status } = result;
          if (status === 200) {
            setProducts(data);
          }
          if (status === 404) {
            console.log("No product found!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!products) {
      getNewProduct();
    }
  }, [products]);

  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitleComponent title="new product " />
        <div className="my-[35px] mx-[0] flex justify-end">
          <div>
            <Link
              href={`/promotions?promotions=new-product`}
              className="bg-button text-white text-[1.6em] font-normal capitalize py-[8px] px-[14px] hover:opacity-90"
            >
              show all
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap mx-mCard">
          {products?.map((item: any) => {
            return <CardProduct key={item._id} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
