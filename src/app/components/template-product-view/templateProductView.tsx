"use client";
import Image from "next/image";
import style from "./templateProductView.module.scss";
import Link from "next/link";
import { data } from "@/app/data";
import IconHeartSvg from "../iconHeartSvg/iconHeartSvg";

export default function TemplateProductView() {
  const handleAddCart = (e: any) => {
    e.preventDefault();
  };

  const handleSubmitHeart = (e: any) => {
    e.target
      .closest(`.${style.iconHeartSvg}`)
      .classList.toggle(`${style.active}`);
    e.preventDefault();
  };

  return (
    <div className={`${style.bestSeller}`}>
      <div className={`${style.bestSellerContainer}`}>
        <div className={`${style.bestSellerTitle}`}>
          <h1>Best sellers</h1>
        </div>
        <div className={`${style.bestSellerType}`}>
          <div className={`${style.bestSellerTypeLeft}`}>
            <div className={`${style.bestSellerTypeLeftItems} ${style.active}`}>
              all products
            </div>
            <div className={`${style.bestSellerTypeLeftItems}`}>t-shirt</div>
            <div className={`${style.bestSellerTypeLeftItems}`}>hoodies</div>
            <div className={`${style.bestSellerTypeLeftItems}`}>jacket</div>
          </div>
          <div className={`${style.bestSellerTypeRight}`}>
            <Link href="#" className={`${style.bestSellerTypeRightBtn}`}>
              show all
            </Link>
          </div>
        </div>
        <div className={`${style.bestSellerList}`}>
          {data.map((item, index) => {
            return (
              <Link key={index} className={`${style.bestSellerItems}`} href="#">
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
