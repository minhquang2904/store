import style from "./templateProductView.module.scss";
import Link from "next/link";
import { data, login } from "@/app/data";
import { useState } from "react";
import CardProduct from "../cardProduct/cardProduct";

export default function TemplateProductView() {
  const [dataList, setData] = useState(data);
  const styleCustom = { width: "25%" };

  const handleChangeType = (e: any) => {
    const id = e.target.id;
    if (id == "dress") {
      getDataType("dress");
    } else if (id == "bag") {
      getDataType("bag");
    } else if (id == "shoes") {
      getDataType("shoes");
    } else {
      setData(data);
    }
    document
      .querySelector(`.${style.bestSellerTypeLeftItems}.${style.active}`)
      ?.classList.remove(`${style.active}`);
    e.target.classList.add(`${style.active}`);
  };

  const getDataType = (type: string) => {
    const dataType = data.filter((item: any) => {
      return item.type.includes(type);
    });
    return setData(dataType);
  };

  return (
    <div className={`${style.bestSeller}`}>
      <div className={`${style.bestSellerContainer}`}>
        <div className={`${style.bestSellerTitle}`}>
          <h1>Best sellers</h1>
        </div>
        <div className={`${style.bestSellerType}`}>
          <div className={`${style.bestSellerTypeLeft}`}>
            <div
              className={`${style.bestSellerTypeLeftItems} ${style.active}`}
              onClick={handleChangeType}
            >
              all products
            </div>
            <div
              className={`${style.bestSellerTypeLeftItems}`}
              onClick={handleChangeType}
              id="dress"
            >
              Dress
            </div>
            <div
              className={`${style.bestSellerTypeLeftItems}`}
              onClick={handleChangeType}
              id="bag"
            >
              Bag
            </div>
            <div
              className={`${style.bestSellerTypeLeftItems}`}
              onClick={handleChangeType}
              id="shoes"
            >
              Shoes
            </div>
          </div>
          <div className={`${style.bestSellerTypeRight}`}>
            <Link href="#" className={`${style.bestSellerTypeRightBtn}`}>
              show all
            </Link>
          </div>
        </div>
        <div className={`${style.bestSellerList}`}>
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
