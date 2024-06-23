import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { data, login } from "@/app/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss";
import TitleComponent from "../titleComponent/titleComponent";

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
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const TemplateProductSlider = () => {
  const [dataList, setData] = useState(data);
  const [product, setProduct] = useState(null) as any;

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

  useEffect(() => {
    const slideArrow = document.querySelectorAll(".slick-arrow");
    dataList.length <= 4
      ? slideArrow.forEach((item: any) => (item.style.display = "none"))
      : slideArrow.forEach((item: any) => (item.style.display = "block"));
  }, [dataList]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await fetch("/api/product/discount");
        const result = await response.json();
        const status = result.status;
        const data = result.data;
        console.log(data);
        if (status === 200) {
          setProduct(data);
        }
        if (status === 404) {
          console.log("No product found!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!product) {
      fetchDataProduct();
    }
  }, [product]);

  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitleComponent title="Discount" />
        <div className="my-[35px] mx-[0] flex justify-between">
          <div className="flex gap-[12px] items-center">
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
            {product?.map((item: any) => {
              return (
                <div key={item?._id} className="block px-pCard">
                  <Link
                    className="block shadow-sm pb-[20px]"
                    href={`/productDetail/${item?._id}/`}
                  >
                    <div className="!relative">
                      <Image
                        src={item?.files[0]?.url}
                        className="!relative w-full max-h-400px"
                        alt="Product 1"
                        fill
                        sizes="(max-width: 312px) 100vw"
                      />
                      <div className="absolute top-[20px] left-[0]">
                        <p className="text-white bg-secondary text-center text-[1.2em] font-semibold uppercase px-[12px] py-[6px]">
                          Sale
                        </p>
                      </div>
                    </div>
                    <div className="mt-[18px] mx-[10px] mb-[0]">
                      <div>
                        <h1 className="text-text text-[1.6em] font-semibold capitalize min-h-[48px] line-clamp-2">
                          {item?.name}
                        </h1>
                      </div>
                      <div className="my-[6px] mx-[0]">
                        <h1 className="text-text text-[1.6em] font-medium capitalize min-h-[24px] line-clamp-1">
                          {item?.subName}
                        </h1>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-[#00000080] text-[1.6em] font-medium capitalize">
                          {item?.categories}
                        </p>
                        <div className="flex font-medium">
                          {item?.discount > 0 ? (
                            <>
                              <h3 className="text-[1.6em] text-button line-through">
                                {item?.price}
                              </h3>
                              <h3 className="text-[1.6em] ml-[10px] text-secondary">
                                {item?.discountedPrice}
                              </h3>
                            </>
                          ) : (
                            <h3 className="text-[1.6em] text-secondary">
                              {item?.price}
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
};

export default TemplateProductSlider;
