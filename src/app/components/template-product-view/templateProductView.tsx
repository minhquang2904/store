"use client";

import Image from "next/image";
import style from "./templateProductView.module.scss";
import Link from "next/link";
import { data, login } from "@/app/data";
import IconHeartSvg from "../iconHeartSvg/iconHeartSvg";
import { useState } from "react";

export default function TemplateProductView() {
  const [dataList, setData] = useState(data);
  const [checkLogin, setCheckLogin] = useState(login);
  const handleAddCart = (e: any) => {
    if (!checkLogin) {
      window.location.href = "/login";
    }
    e.preventDefault();
  };

  const handleSubmitHeart = (e: any) => {
    e.target
      .closest(`.${style.iconHeartSvg}`)
      .classList.toggle(`${style.active}`);
    e.preventDefault();
  };

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
          {dataList.map((item: any, index: any) => {
            return (
              <Link
                key={index}
                className={`${style.bestSellerItems}`}
                href="/productDetail"
              >
                <div className={`${style.bestSellerItemsImage}`}>
                  <Image
                    src={item.url}
                    className={`${style.picture}`}
                    alt="Product 1"
                    fill
                    sizes="(max-width: 312px) 100vw"
                    priority={true}
                  />
                  {item.discount ? (
                    <div className={`${style.bestSellerItemsSale}`}>
                      <p>Sale</p>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className={`${style.iconHeart}`}>
                    <IconHeartSvg
                      onClick={handleSubmitHeart}
                      className={style.iconHeartSvg}
                    />
                  </div>
                  <div
                    className={`${style.bestSellerItemsAdd}`}
                    onClick={handleAddCart}
                  >
                    <h3>Add to Card</h3>
                  </div>
                </div>
                <div className={`${style.bestSellerItemsSubTitle}`}>
                  <div className={`${style.bestSellerItemsTitle}`}>
                    <h1>{item.title}</h1>
                  </div>
                  <div className={`${style.bestSellerItemsTypeAndPrice}`}>
                    <p>{item.type}</p>
                    <div className={`${style.bestSellerItemsDiscount}`}>
                      {!item.discount ? (
                        <>
                          <h3
                            className={`${style.price}`}
                            style={{
                              textDecoration: "unset",
                              color: "#131118",
                            }}
                          >
                            {item.price}
                          </h3>
                        </>
                      ) : (
                        <>
                          <h3
                            className={`${style.price}`}
                            style={{ textDecoration: "line-through" }}
                          >
                            {item.price}
                          </h3>
                          <h3 className={`${style.discount}`}>
                            {item.discount}
                          </h3>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
