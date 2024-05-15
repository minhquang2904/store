"use client";

import SubTitleCheckOut from "@/app/components/subTitleCheckOut/subTitleCheckOut";
import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import Total from "@/app/components/total/total";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

const ReviewOrder = () => {
  const [modalOrderSuccess, setModalOrderSuccess] = useState(false);
  const item = [1, 2, 3, 4, 5, 4, 2, 3, 1, 5, 2, 3, 5, 2, 3, 6, 2, 3, 1, 3];

  const handleCloseModalOrderSuccess = () => setModalOrderSuccess(false);
  const handleShowModalOrderSuccess = () => setModalOrderSuccess(true);

  const handleSeeMore = () => {
    const listsOrder = document.querySelector(".listsOrder");
    const iconArrowDown = document.querySelector(".iconArrowDown");
    listsOrder?.classList.toggle("activeListsOrder");
    iconArrowDown?.classList.toggle("activeIconArrowDown");
  };
  return (
    <>
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          <TitleCheckOut title="Review your order" />
          <div className="flex xsm:flex-col sm:flex-col l:flex-row xsm:w-full sm:w-full">
            <div className="shrink grow-0 l:basis-[70%] h-full xsm:overflow-x-scroll xsm:overflow-y-hidden">
              <SubTitleCheckOut title="Estimated delivery: 22 Sep 2024" />
              <div className="flex flex-col gap-y-[32px] max-h-[364px] [&.activeListsOrder]:max-h-[100%] overflow-hidden listsOrder">
                {item.map((value, index) => {
                  return (
                    <div key={index} className="flex">
                      <div className="!relative">
                        <Image
                          src="/images/product3.png"
                          className="!relative max-w-[100px] max-h-[100px]"
                          alt="Item"
                          fill
                          sizes="(max-width: 100px) 100vw"
                        />
                      </div>
                      <div className="ml-[20px] flex flex-col justify-center">
                        <h3 className="text-text text-[1.6em] font-extrabold overflow-hidden max-w-[400px] line-clamp-1">
                          Basic shirt Green
                        </h3>
                        <h3 className="text-secondary text-[1.6em] font-medium overflow-hidden max-w-[400px] my-[4px]">
                          $103
                        </h3>
                        <p className="text-[1.5em] text-text font-normal">
                          Size S
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {item.length > 3 && (
                <div className="text-center">
                  <div
                    className="group hover:bg-button text-center mt-[16px] cursor-pointer text-text text-[1.3em] font-medium inline-flex items-center seeMoreBtn border-[1px] border-solid border-button px-[16px] py-[4px] rounded-[16px]"
                    onClick={handleSeeMore}
                  >
                    <h1 className="mr-[8px] uppercase group-hover:text-white">
                      See more
                    </h1>
                    <svg
                      fill="none"
                      height="16"
                      viewBox="0 0 24 24"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="[&.activeIconArrowDown]:rotate-180 iconArrowDown"
                    >
                      <path
                        d="m4 8 8 8 8-8"
                        className="stroke-[#131118] group-hover:stroke-white"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div className="mt-[40px]">
                <SubTitleCheckOut title="Shipping Address" />
                <div>
                  <h1 className="text-text text-[1.6em] font-semibold">
                    Robert Fox
                  </h1>
                  <p className="text-text text-[1.6em] font-normal mt-[6px]">
                    392 Dola Mine Road, Morrisville, North Carolina
                  </p>
                </div>
              </div>
              <div className="mt-[40px]">
                <SubTitleCheckOut title="Payment Method" />
                <div>
                  <h1 className="text-text text-[1.6em] font-semibold">
                    Debit Card (.... .... .... ..89)
                  </h1>
                </div>
              </div>
            </div>
            <Total
              btn={true}
              title="Place Order"
              onClick={handleShowModalOrderSuccess}
            />
          </div>
        </div>
      </div>
      <ModalOrderSuccess
        isOpen={modalOrderSuccess}
        onClose={handleCloseModalOrderSuccess}
      />
    </>
  );
};

const ModalOrderSuccess = (props: any) => {
  const { isOpen, onClose, data } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px"}
        margin={"auto 10px auto 10px"}
      >
        <ModalHeader>
          <div className="flex justify-center mt-[32px] mb-[32px]">
            <div className="relative before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:bg-[#d8d6d8] before:w-[80px] before:h-[80px] before:rounded-[50%] after:content-[''] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:bg-button after:w-[60px] after:h-[60px] after:rounded-[50%] z-0">
              <svg
                enableBackground="new 704.081 796 200 200"
                height="20"
                viewBox="704.081 796 200 200"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 fill-white"
              >
                <path d="m891.876 977.909-6.938-125.811h-34.661v-10.157c0-25.333-20.608-45.941-45.94-45.941s-45.94 20.609-45.94 45.941v10.157h-36.161l-5.969 126.355-.006.219c-.049 4.547 1.758 9.01 4.955 12.239 3.198 3.233 7.641 5.089 12.19 5.089h141.351c4.688 0 9.228-1.953 12.453-5.36 3.224-3.407 4.925-8.047 4.666-12.731zm-121.497-135.968c0-18.725 15.233-33.959 33.958-33.959 18.724 0 33.958 15.234 33.958 33.959v10.157h-67.917v-10.157zm108.128 140.461c-.973 1.026-2.339 1.615-3.751 1.615h-141.351c-1.37 0-2.707-.558-3.672-1.534-.942-.95-1.483-2.257-1.492-3.597l5.423-114.806h24.731v15.173c0 3.309 2.682 5.991 5.991 5.991s5.991-2.682 5.991-5.991v-15.173h67.917v15.173c0 3.309 2.682 5.991 5.991 5.991s5.99-2.682 5.99-5.991v-15.173h23.321l6.313 114.49c.081 1.41-.431 2.807-1.402 3.832z" />
              </svg>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center mb-[16px]">
          <h1 className="text-text text-[2em] font-semibold mb-[12px]">
            Your order is confirmed
          </h1>
          <p className="text-text text-[1.6em] text-center">
            Thanks for shopping! your order has not shipped yet, but we will
            send you and email when it done
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-col w-full">
            <ButtonModal
              onClick={onClose}
              title="View Order"
              styleCustom="bg-button text-white mb-[8px]"
            />
            <Link href="/" className="w-full">
              <ButtonModal
                onClick={onClose}
                title="Back to Home"
                styleCustom="bg-[transparent] text-text border-button"
              />
            </Link>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ButtonModal = (props: any) => {
  const { styleCustom, onClick, title } = props;
  return (
    <button
      onClick={onClick}
      className={`text-[1.6em] font-medium outline-none capitalize px-[20px] py-[12px] w-full rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80`}
    >
      {title}
    </button>
  );
};

export default ReviewOrder;
