"use client";

import style from "./templateProductDetail.module.scss";
import Image from "next/image";
import IconHeartSvg from "../iconHeartSvg/iconHeartSvg";
import { useEffect, useState } from "react";
import { dataDescription, data } from "@/app/data";

export default function TemplateProductDetail() {
  const [description, setDescription] = useState("");
  const [dataDetail, setDataDetail] = useState(data);
  const [picture, setPicture] = useState(0);
  const navDescription = dataDescription[0].description;
  const navAddInformation = dataDescription[1].addInformation;

  const handleChangeDescription = (e: any) => {
    const id = e.target.id;
    if (id == "description") {
      setDescription(navDescription || "");
    } else if (id == "add-information") {
      setDescription(navAddInformation || "");
    }
    document
      .querySelector(`.${style.detailDescriptionItem}.${style.active}`)
      ?.classList.remove(`${style.active}`);
    e.target.classList.add(`${style.active}`);
  };
  const handleIconHeart = () => {};
  const handleActivePicture = (index: any) => {
    setPicture(index);
  };

  useEffect(() => {
    setDescription(navDescription || "");
  }, []);

  return (
    <div className={`${style.detail}`}>
      <div className={`${style.detailContainer}`}>
        <div className={`${style.detailPageNavigation}`}>Home</div>
        <div className={`${style.detailBuy}`}>
          <div className={`${style.detailBuyLeft}`}>
            <div className={`${style.detailBuyLeftImage}`}>
              <Image
                src={dataDetail[picture].url || ""}
                className={`${style.picture}`}
                alt="Product 1"
                fill
                sizes="(max-width: 400px) 100vw"
                priority={true}
              />
            </div>
            <div className={`${style.detailBuyLeftReview}`}>
              {dataDetail.slice(0, 6).map((item, index) => {
                return dataDetail.length > 1 ? (
                  <div
                    key={index}
                    className={`${style.detailBuyLeftReviewItem}`}
                    onClick={() => handleActivePicture(index)}
                  >
                    <Image
                      src={item.url}
                      className={`${style.picture}`}
                      alt="Product 1"
                      fill
                      sizes="(max-width: 200px) 100vw"
                      priority={true}
                    />
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
          <div className={`${style.detailBuyRight}`}>
            <div className={`${style.detailBuyRightTitle}`}>
              <h1>YK Disney</h1>
              <div>
                <div className={`${style.detailBuyRightTitleHeart}`}>
                  <div>
                    <IconHeartSvg
                      onClick={handleIconHeart}
                      className={style.iconHeart}
                    />
                  </div>
                </div>
                <div className={`${style.detailBuyRightTitleStock}`}>
                  <h5>In Stock : 8</h5>
                </div>
              </div>
            </div>
            <div className={`${style.detailBuyRightType}`}>
              <h4>Girl Pink Dress</h4>
            </div>
            <div className={`${style.detailBuyRightPrice}`}>
              <h4>$80.00</h4>
            </div>
            <div className={`${style.detailBuyRightDescription}`}>
              <p>
                Lustrous yet understated. The new evening wear collection
                exclusively offered at the reopened Giorgio Armani boutique in
                Los Angeles. Lustrous yet understated. The new evening wear
                collection exclusively offered at the reopened Giorgio Armani
                boutique in Los Angeles. Lustrous yet understated. The new
                evening wear collection exclusively offered at the reopened
                Giorgio Armani boutique in Los Angeles. xclusively offered at
                the reopened Giorgio Armani boutique in Los Angeles.
              </p>
            </div>
            <div className={`${style.detailBuyRightColor}`}>
              <h3>Color</h3>
              <div className={`${style.detailBuyRightColorList}`}>
                <div className={`${style.detailBuyRightColorItem}`}></div>
                <div className={`${style.detailBuyRightColorItem}`}></div>
              </div>
            </div>
            <div className={`${style.detailBuyRightSize}`}>
              <h3>Size</h3>
              <div className={`${style.detailBuyRightSizeList}`}>
                <div className={`${style.detailBuyRightSizeItem}`}>S</div>
                <div className={`${style.detailBuyRightSizeItem}`}>M</div>
                <div className={`${style.detailBuyRightSizeItem}`}>L</div>
                <div className={`${style.detailBuyRightSizeItem}`}>XL</div>
                <div className={`${style.detailBuyRightSizeItem}`}>XXl</div>
              </div>
            </div>
            <div className={`${style.detailBuyRightAddToCard}`}>
              <div className={`${style.detailBuyRightAddToCardNumber}`}>
                <div>
                  <Image
                    src="/icons/subtract.svg"
                    className={style.logo}
                    alt="Icon"
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                  <input type="number" />
                  <Image
                    src="/icons/plus.svg"
                    className={style.logo}
                    alt="Icon"
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                </div>
              </div>
              <div className={`${style.detailBuyRightAddToCardBtn}`}>
                <button>Add to Card</button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.detailDescription}`}>
          <div className={`${style.detailDescriptionNavigation}`}>
            <div
              className={`${style.detailDescriptionItem} ${style.active}`}
              onClick={handleChangeDescription}
              id="description"
            >
              description
            </div>
            <div
              className={`${style.detailDescriptionItem}`}
              onClick={handleChangeDescription}
              id="add-information"
            >
              Add Information
            </div>
            <div className={`${style.line}`}></div>
          </div>
          <div className={`${style.detailDescriptionContent}`}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
