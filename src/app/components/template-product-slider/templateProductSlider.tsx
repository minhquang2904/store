import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { data, login } from "@/app/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss";
import TitleComponent from "../titleComponent/titleComponent";
import IconHeartSvg from "../iconHeartSvg/iconHeartSvg";

export default function TemplateProductSlider() {
  const [dataList, setData] = useState(data);

  const handleChangeType = (e: any) => {
    const id = e.target.id;

    id == "shirt" && getDataType("shirt");
    id == "bag" && getDataType("bag");
    id == "shoes" && getDataType("shoes");
    !id && setData(data);

    document
      .querySelector(".activeTabSlider")
      ?.classList.remove("activeTabSlider");
    e.target.classList.add("activeTabSlider");
  };

  const getDataType = (type: string) => {
    const dataType = data.filter((item: any) => {
      return type.includes(item.type);
    });
    return setData(dataType);
  };

  const handleSubmitHeart = (e: any) => {
    e.target.closest(".iconHeartSvg").classList.toggle("active");
    e.preventDefault();
  };

  const handleAddCart = (e: any) => {
    if (!login) {
      window.location.href = "/login";
    }
    e.preventDefault();
  };

  const SampleNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image
          src="/icons/arrow-right-1.svg"
          alt="Icon"
          fill
          sizes="100vw"
          priority={true}
        />
      </div>
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} !xsm:hidden l:block`} onClick={onClick}>
        <Image
          src="/icons/arrow-left-1.svg"
          alt="Icon"
          fill
          sizes="100vw"
          priority={true}
        />
      </div>
    );
  };

  const settings = {
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const slideArrow = document.querySelectorAll(".slick-arrow");
    dataList.length <= 4
      ? slideArrow.forEach((item: any) => (item.style.display = "none"))
      : slideArrow.forEach((item: any) => (item.style.display = "block"));
  }, [dataList]);

  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitleComponent title="Discount" />
        <div className="my-[35px] mx-[0] flex justify-between">
          <div className="flex gap-[10px] items-center">
            <div
              className="activeTabSlider [&.activeTabSlider]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
            >
              all products
            </div>
            <div
              className="[&.activeTabSlider]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
              id="shirt"
            >
              shirt
            </div>
            <div
              className="[&.activeTabSlider]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
              onClick={handleChangeType}
              id="bag"
            >
              Bag
            </div>
            <div
              className="[&.activeTabSlider]:text-text text-sub text-[1.6em] font-semibold capitalize cursor-pointer hover:text-text"
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
              return (
                <div key={item.id} className="block px-pCard">
                  <Link
                    className="block shadow-sm pb-[20px] group"
                    href="/productDetail"
                  >
                    <div className="overflow-hidden !relative">
                      <Image
                        src={item.url}
                        className="!relative w-full group-hover:scale-[1.04] group-hover:opacity-90 duration-300 ease-out max-h-400px"
                        alt="Product 1"
                        fill
                        sizes="(max-width: 312px) 100vw"
                      />
                      {item.discount && (
                        <div className="absolute top-[20px] left-[0]">
                          <p className="text-white bg-secondary text-center text-[1.2em] font-semibold uppercase px-[12px] py-[6px]">
                            Sale
                          </p>
                        </div>
                      )}
                      <div className="absolute right-[8px] top-[20px] hidden group-hover:block">
                        <IconHeartSvg
                          onClick={handleSubmitHeart}
                          className="iconHeartSvg [&.active]:fill-secondary"
                        />
                      </div>
                      <div
                        className="flex items-center justify-center overflow-hidden h-[0] text-center absolute duration-100 ease-linear bottom-[0] left-[0] right-[0] bg-[#0000004d] text-white text-[1.6em] font-normal cursor-pointer group-hover:bg-[#00000080] group-hover:h-[40px]"
                        onClick={handleAddCart}
                      >
                        <h3 className="h-full flex items-center">
                          Add to Card
                        </h3>
                      </div>
                    </div>
                    <div className="mt-[18px] mx-[10px] mb-[0]">
                      <div>
                        <h1 className="text-text text-[1.6em] font-semibold capitalize min-h-[48px] line-clamp-2">
                          {item.title}
                        </h1>
                      </div>
                      <div className="my-[6px] mx-[0]">
                        <h1 className="text-text text-[1.6em] font-medium capitalize min-h-[24px] line-clamp-1">
                          {item.subTitle}
                        </h1>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-[#00000080] text-[1.6em] font-medium capitalize">
                          {item.type}
                        </p>
                        <div className="flex font-medium">
                          <h3
                            className="text-[1.6em] text-[#00000080]"
                            style={
                              item.discount
                                ? {
                                    textDecoration: "line-through",
                                  }
                                : {
                                    textDecoration: "unset",
                                    color: "#131118",
                                  }
                            }
                          >
                            {item.price}
                          </h3>
                          {item.discount && (
                            <h3 className="text-[1.6em] ml-[10px] text-[#ff6f61]">
                              {item.discount}
                            </h3>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
