"use client";

import style from "./productDetail.module.scss";
import Image from "next/image";
import IconHeartSvg from "@/app/components/iconHeartSvg/iconHeartSvg";
import { useEffect, useState } from "react";
import { dataDescription, data } from "@/app/data";
import TitlePageNavigation from "@/app/components/titlePageNavigation/titlePageNavigation";

export default function ProductDetail() {
  const [description, setDescription] = useState("");
  const [dataDetail, setDataDetail] = useState(data);
  const [picture, setPicture] = useState(0);
  const navDescription = dataDescription[0].description;
  const navAddInformation = dataDescription[1].addInformation;

  const handleChangeDescription = (e: any) => {
    const id = e.target.id;
    id == "description" && setDescription(navDescription || "");
    id == "add-information" && setDescription(navAddInformation || "");

    document
      .querySelector(".activeTabDetail")
      ?.classList.remove("activeTabDetail");
    e.target.classList.add("activeTabDetail");
  };

  const handleActivePicture = (index: any) => {
    setPicture(index);
  };

  useEffect(() => {
    setDescription(navDescription || "");
  }, []);

  const handleChooseSize = (e: any) => {
    document.querySelector(".activeSize")?.classList.remove("activeSize");
    e.target.classList.add("activeSize");
  };

  const handleChooseColor = (e: any) => {
    document.querySelector(".activeColor")?.classList.remove("activeColor");
    e.target.classList.add("activeColor");
  };

  const handleSubmitHeart = (e: any) => {
    e.target.closest(".iconHeartSvg").classList.toggle("active");
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="l:mt-80 sm:mt-60 xsm:mt-40 w-full max-w-layout">
        <TitlePageNavigation />
        <div className="mt-[50px] flex">
          <div className="flex flex-col items-center shrink grow-0 l:basis-2/4 sm:basis-[40%]">
            <div className="!relative max-w-[400px] flex w-full">
              <Image
                src={dataDetail[picture].url || ""}
                className="!relative w-full"
                alt="Product 1"
                fill
                sizes="(max-width: 400px) 100vw"
              />
            </div>
            <div className="flex">
              {dataDetail.slice(0, 6).map((item: any) => {
                return dataDetail.length > 1 ? (
                  <div
                    key={item.id}
                    className="!relative max-w-[110px] w-full cursor-pointer hover:opacity-80"
                    onClick={() => handleActivePicture(item.id - 1)}
                  >
                    <Image
                      src={item.url}
                      className="w-full !relative"
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
          <div className="shrink grow-0 l:basis-2/4 ml-[30px] sm:basis-[60%]">
            <div className="flex justify-between">
              <h1 className="text-text font-bold text-[2.6em]">YK Disney</h1>
              <div className="flex">
                <div className="flex items-center mr-[16px]">
                  <div>
                    <IconHeartSvg
                      onClick={handleSubmitHeart}
                      className="iconHeartSvg [&.active]:fill-secondary cursor-pointer"
                    />
                  </div>
                </div>
                <div className="bg-[#e2f8e2] flex items-center py-[8px] px-[16px] rounded-[10px]">
                  <h5 className="text-[#3cd139] text-[1.4em] font-medium">
                    In Stock : 8
                  </h5>
                </div>
              </div>
            </div>
            <div className="mt-[8px]">
              <h4 className="text-text font-normal text-[1.6em]">
                Girl Pink Dress
              </h4>
            </div>
            <div className="mt-[8px]">
              <h4 className="text-text font-normal text-[1.6em]">$80.00</h4>
            </div>
            <div className="mt-[16px]">
              <p className="text-text font-normal text-[1.4em] line-clamp-4">
                Lustrous yet understated. The new evening wear collection
                exclusively offered at the reopened Giorgio Armani boutique in
                Los Angeles. Lustrous yet understated. The new evening wear
                collection exclusively offered at the reopened Giorgio Armani
                boutique in Los Angeles. Lustrous yet understated. The new
                evening wear collection exclusively offered at the reopened
                Giorgio Armani boutique in Los Angeles. xclusively offered at
                the reopened Giorgio Armani boutique in Los Angeles. yet
                understated. The new evening wear collection exclusively offered
                at the reopened Giorgio Armani boutique in Los Angeles.
                xclusively offered at the reopened Giorgio Armani boutique in
                Los Angeles.
              </p>
            </div>
            <div className="mt-[16px]">
              <h3 className="text-text text-[1.6em] font-semibold">Color</h3>
              <div className="mt-[8px] flex flex-wrap gap-y-[8px]">
                {dataDetail[0].color.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      onClick={handleChooseColor}
                      className={`mr-[8px] [&.activeColor]:border-solid [&.activeColor]:border-[3px] [&.activeColor]:border-[#afb3b8] w-[70px] h-[40px] cursor-pointer rounded-[20px]`}
                      style={{ background: `${item}` }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="mt-[16px]">
              <h3 className="text-text  font-semibold text-[1.6em]">Size</h3>
              <div className="flex mt-[8px]">
                {dataDetail[0].size.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      onClick={handleChooseSize}
                      className="[&.activeSize]:bg-button [&.activeSize]:text-white uppercase text-text mr-[8px] border-solid border-[1px] border-[#727074] text-[1.5em] w-[70px] h-[40px] rounded-[20px] flex justify-center items-center cursor-pointer font-medium"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-[28px] flex">
              <div>
                <div className="inline-flex !relative items-center border-[1px] border-solid border-button py-[4px] px-[8px] rounded-[26px]">
                  <Image
                    src="/icons/subtract.svg"
                    className="!relative !w-[24px] !h-[24px] cursor-pointer"
                    alt="Icon"
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                  <input
                    type="number"
                    className={`text-text outline-none p-[8px] text-[1.4em] max-w-[40px] font-medium text-center ${style.inputOuterAndInner}`}
                  />
                  <Image
                    src="/icons/plus.svg"
                    className="!relative !w-[24px] !h-[24px] cursor-pointer"
                    alt="Icon"
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                </div>
              </div>
              <div className="mx-[16px] flex items-center bg-button rounded-[26px] max-w-[300px] w-full">
                <button className="text-center w-full text-[1.4em]">
                  Add to Card
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[80px]">
          <div className="flex font-medium mb-[20px] text-sub capitalize text-[2em]">
            <div
              className="activeTabDetail [&.activeTabDetail]:before:absolute [&.activeTabDetail]:before:content-[''] [&.activeTabDetail]:before:w-full [&.activeTabDetail]:before:h-[4px] [&.activeTabDetail]:before:bottom-[0] [&.activeTabDetail]:before:bg-button [&.activeTabDetail]:before:rounded-[4px] [&.activeTabDetail]:text-text pb-[8px] mr-[16px] relative cursor-pointer hover:text-button"
              onClick={handleChangeDescription}
              id="description"
            >
              description
            </div>
            <div
              className="[&.activeTabDetail]:before:absolute [&.activeTabDetail]:before:content-[''] [&.activeTabDetail]:before:w-full [&.activeTabDetail]:before:h-[4px] [&.activeTabDetail]:before:bottom-[0] [&.activeTabDetail]:before:bg-button [&.activeTabDetail]:before:rounded-[4px] [&.activeTabDetail]:text-text pb-[8px] mr-[16px] relative cursor-pointer hover:text-button"
              onClick={handleChangeDescription}
              id="add-information"
            >
              Add Information
            </div>
          </div>
          <div className="text-text">
            <p className="text-[1.4em] leading-5">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
