"use client";
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
import { address } from "@/app/data";

const ListsOrder = () => {
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);

  const handleCloseDelete = () => setModalDeleteShow(false);
  const handleShowDelete = (data: any) => {
    setDataModalDelete(data[0]);
    setModalDeleteShow(true);
  };

  return (
    <>
      <div className="flex flex-col gap-y-[40px]">
        <div>
          <div className="flex justify-between">
            <div className="w-[50%] flex">
              {/* <div className="!relative">
                <Image
                  src="/images/product2.png"
                  className="!relative max-w-[80px] w-full max-h-[auto]"
                  alt="Product 1"
                  fill
                  sizes="(max-width: 80px) 100vw"
                />
              </div> */}
              <div className="flex flex-col justify-center px-[8px]">
                <h1 className="text-text text-[1.6em] font-semibold">
                  Robert fox
                </h1>
                <h3 className="text-text text-[1.6em] font-normal line-clamp-1">
                  392 Dola Mine Road, Morrisville, North Carolina 392 Dola Mine
                  R, Morrisville, North Carolina
                </h3>
                <h3 className="text-text text-[1.6em] font-normal">
                  Debit Card
                </h3>
              </div>
            </div>
            <div className="w-[20%] flex items-center justify-center px-[8px]">
              <h1 className="text-text text-[1.6em] font-semibold">80.00</h1>
            </div>
            <div className="w-[30%] flex justify-end pl-[8px]">
              <div className="flex flex-col gap-y-[10px]">
                <ButtonOrder
                  title="View Order"
                  styleCustom="border-button text-text bg-[transparent]"
                />
                <ButtonOrder
                  title="Write a Review"
                  styleCustom="bg-button text-white"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-[8px]">
            <h1 className="text-[1.6em] text-[#3CD139] mr-[16px]">Delivery</h1>
            <p className="text-[1.6em] text-text mr-[16px]">
              Your product has been delivery
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="w-[50%] flex">
              {/* <div className="!relative">
                <Image
                  src="/images/product2.png"
                  className="!relative max-w-[80px] w-full max-h-[auto]"
                  alt="Product 1"
                  fill
                  sizes="(max-width: 80px) 100vw"
                />
              </div> */}
              <div className="flex flex-col justify-center px-[8px]">
                <h1 className="text-text text-[1.6em] font-semibold">
                  Robert fox
                </h1>
                <h3 className="text-text text-[1.6em] font-normal line-clamp-1">
                  392 Dola Mine Road, Morrisville, North Carolina 392 Dola Mine
                  R, Morrisville, North Carolina
                </h3>
                <h3 className="text-text text-[1.6em] font-normal">
                  Debit Card
                </h3>
              </div>
            </div>
            <div className="w-[20%] flex items-center justify-center px-[8px]">
              <h1 className="text-text text-[1.6em] font-semibold">80.00</h1>
            </div>
            <div className="w-[30%] flex justify-end pl-[8px]">
              <div className="flex flex-col gap-y-[10px]">
                <ButtonOrder
                  title="View Order"
                  styleCustom="border-button text-text bg-[transparent]"
                />
                <ButtonOrder
                  title="Cancel Order"
                  styleCustom="bg-secondary text-white"
                  onClick={() => handleShowDelete(address)}
                />
              </div>
            </div>
          </div>
          <div className="flex mt-[8px]">
            <h1 className="text-[1.6em] text-[#E3B231] mr-[16px]">
              In Process
            </h1>
            <p className="text-[1.6em] text-text mr-[16px]">
              Your product has been Inprocess
            </p>
          </div>
        </div>
      </div>
      <ModalDelete
        isOpen={modalDeleteShow}
        onClose={handleCloseDelete}
        data={dataModalDelete}
      />
    </>
  );
};

const ButtonOrder = (props: any) => {
  const { styleCustom, title, onClick } = props;
  return (
    <button
      className={`px-[30px] py-[12px] w-full text-[1.6em] border-[1px] border-solid rounded-[16px] ${styleCustom}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const ModalDelete = (props: any) => {
  const { isOpen, onClose, data } = props;
  console.log(data);
  const color = "#ff6f61";
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px"}
        margin={"auto 10px auto 10px"}
      >
        <ModalHeader>
          <div className="flex justify-center">
            <div className="max-w-[40px] max-h-[40px] relative before:content-[''] before:absolute before:w-[60px] before:h-[60px] before:bg-[#F4D4D7] before:top-[50%] before:left-[50%] before:translate-y-[-50%] before:translate-x-[-50%] z-0 before:rounded-[50%] ">
              <svg
                fill="none"
                height="40"
                viewBox="0 0 24 24"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
                className="z-1 relative"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="m12 8v5.5"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="16" fill={color} r="1" />
              </svg>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center">
          <h1 className="text-[2.2em] text-secondary">Delete Address</h1>
          <p className="text-text text-[1.6em]">{data.address}</p>
        </ModalBody>
        <ModalFooter>
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-[#D2D8DE] bg-white"
          />
          <ButtonModal
            onClick={onClose}
            title="Delete"
            styleCustom="bg-secondary text-white"
          />
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
      className={`text-[1.6em] font-normal outline-none capitalize ml-[16px] px-[20px] py-[8px] w-[100px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80`}
    >
      {title}
    </button>
  );
};

export default ListsOrder;
