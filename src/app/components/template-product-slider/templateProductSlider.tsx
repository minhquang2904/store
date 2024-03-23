"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { data } from "@/app/data";
import IconHeartSvg from "../iconHeartSvg/iconHeartSvg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./templateProductSlider.module.scss";
import "./slider.scss";

export default function TemplateProductSlider() {
  const [dataList, setData] = useState(data);

  const handleAddCart = (e: any) => {
    e.preventDefault();
  };

  const handleSubmitHeart = (e: any) => {
    e.target
      .closest(`.${style.iconHeartSvg}`)
      .classList.toggle(`${style.active}`);
    e.preventDefault();
  };

  const handleChangeType = (e: any) => {
    if (e.target.id == "dress") {
      getDataType("dress");
    } else if (e.target.id == "bag") {
      getDataType("bag");
    } else if (e.target.id == "shoes") {
      getDataType("shoes");
    } else {
      setData(data);
    }
    document
      .querySelector(`.${style.productSliderTypeLeftItems}.${style.active}`)
      ?.classList.remove(`${style.active}`);
    e.target.classList.add(`${style.active}`);
  };

  const getDataType = (type: string) => {
    const dataType = data.filter((item) => {
      return item.type.includes(type);
    });
    return setData(dataType);
  };

  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image
          src="/icons/arrow-right-1.svg"
          alt="Arrow 1"
          fill
          sizes="100vw"
          priority={true}
        />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image
          src="/icons/arrow-left-1.svg"
          alt="Arrow 2"
          fill
          sizes="100vw"
          priority={true}
        />
      </div>
    );
  }

  const settings = {
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  useEffect(() => {
    const slideArrow = document.querySelectorAll(".slick-arrow");
    dataList.length <= 4
      ? slideArrow.forEach((item: any) => {
          item.style.display = "none";
        })
      : slideArrow.forEach((item: any) => {
          item.style.display = "block";
        });
  }, [dataList]);

  return (
    <div className={`${style.productSlider}`}>
      <div className={`${style.productSliderContainer}`}>
        <div className={`${style.productSliderTitle}`}>
          <h1>Discount</h1>
        </div>
        <div className={`${style.productSliderType}`}>
          <div className={`${style.productSliderTypeLeft}`}>
            <div
              className={`${style.productSliderTypeLeftItems} ${style.active}`}
              onClick={handleChangeType}
            >
              all products
            </div>
            <div
              className={`${style.productSliderTypeLeftItems}`}
              onClick={handleChangeType}
              id="dress"
            >
              Dress
            </div>
            <div
              className={`${style.productSliderTypeLeftItems}`}
              onClick={handleChangeType}
              id="bag"
            >
              Bag
            </div>
            <div
              className={`${style.productSliderTypeLeftItems}`}
              onClick={handleChangeType}
              id="shoes"
            >
              Shoes
            </div>
          </div>
          <div className={`${style.productSliderTypeRight}`}>
            <Link href="#" className={`${style.productSliderTypeRightBtn}`}>
              show all
            </Link>
          </div>
        </div>
        <div className={`${style.productSliderList} slider-container`}>
          <Slider {...settings}>
            {dataList.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={`${style.productSliderItems}`}
                  href="#"
                >
                  <div className={`${style.productSliderItemsImage}`}>
                    <Image
                      src={item.url}
                      className={`${style.picture}`}
                      alt="Product 1"
                      fill
                      sizes="(max-width: 312px) 100vw"
                      priority={true}
                    />
                    {item.discount ? (
                      <div className={`${style.productSliderItemsSale}`}>
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
                      className={`${style.productSliderItemsAdd}`}
                      onClick={handleAddCart}
                    >
                      <h3>Add to Card</h3>
                    </div>
                  </div>
                  <div className={`${style.productSliderItemsSubTitle}`}>
                    <div className={`${style.productSliderItemsTitle}`}>
                      <h1>{item.title}</h1>
                    </div>
                    <div className={`${style.productSliderItemsTypeAndPrice}`}>
                      <p>{item.type}</p>
                      <div className={`${style.productSliderItemsDiscount}`}>
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
          </Slider>
        </div>
      </div>
    </div>
  );
}
