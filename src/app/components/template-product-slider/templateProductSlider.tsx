import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { data, login } from "@/app/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./templateProductSlider.module.scss";
import "./slider.scss";
import CardProduct from "../cardProduct/cardProduct";

export default function TemplateProductSlider() {
  const [dataList, setData] = useState(data);

  const handleChangeType = (e: any) => {
    if (e.target.id == "shirt") {
      getDataType("shirt");
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
    const dataType = data.filter((item: any) => {
      return type.includes(item.type);
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
    <div className="flex justify-center items-center">
      <div className={`${style.productSliderContainer}`}>
        <div>
          <h1 className="text-[5em] font-medium capitalize text-center text-text">
            Discount
          </h1>
        </div>
        <div className="my-[35px] mx-0 flex justify-between">
          <div className="flex gap-10 items-center">
            <div
              className="active [&.active]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
            >
              all products
            </div>
            <div
              className="[&.active]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
              id="shirt"
            >
              Dress
            </div>
            <div
              className="[&.active]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
              id="bag"
            >
              Bag
            </div>
            <div
              className="[&.active]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
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
        <div className="slider-container">
          <Slider {...settings}>
            {dataList.map((item: any) => {
              return <CardProduct key={item.id} data={item} login={login} />;
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
