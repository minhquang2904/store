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
import { useEffect, useState } from "react";
import { address } from "@/app/data";
import { useAuthContext } from "@/app/context/AuthContext";
import NoItemCart from "@/app/components/noItemCart/noItemCart";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";

const ListsOrder = () => {
  const [listOrder, setListOrder] = useState(null) as any;
  const { user } = useAuthContext();

  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);
  const [noItemCart, setNoItemCart] = useState(false) as any;
  const [loading, setLoading] = useState(false) as any;

  const handleCloseDelete = () => setModalDeleteShow(false);
  const handleShowDelete = (data: any) => {
    setDataModalDelete(data[0]);
    setModalDeleteShow(true);
  };

  const fetchListOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/order?id=${user?.id}`);
      const result = await res.json();
      const { message, status } = result;
      if (status === 200) {
        setListOrder(result.data);
        if (result.data.length === 0) {
          setNoItemCart(true);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!listOrder) {
      fetchListOrder();
    }
  }, [listOrder, user?.id]);

  return (
    <>
      {listOrder && (
        <>
          <div className="flex flex-col gap-y-[40px]">
            {listOrder?.map((item: any) => {
              return (
                <div key={item._id}>
                  <div className="flex justify-between">
                    <div className="w-[50%] xsm:w-[80%]  flex">
                      {/* <div className="!relative">
                  <Image
                    src="/images/product2.png"
                    className="!relative max-w-[80px] w-full max-h-[auto]"
                    alt="Product 1"
                    fill
                    sizes="(max-width: 80px) 100vw"
                  />
                </div> */}
                      <div className="flex flex-col justify-center pr-[8px] xsm:px-[0]">
                        <h1 className="text-text text-[1.6em] font-semibold">
                          {item?.firstName} {item?.lastName}
                        </h1>
                        <h3 className="text-text text-[1.6em] font-normal line-clamp-1">
                          {item?.address}
                        </h3>
                        <h3 className="text-text text-[1.6em] font-normal capitalize">
                          {item?.payment}
                        </h3>
                      </div>
                    </div>
                    <div className="w-[20%] xsm:w-[20%] flex items-center justify-center px-[8px] xsm:px-[0]">
                      <h1 className="text-text text-[1.6em] font-semibold">
                        {item?.totalPrice}
                      </h1>
                    </div>
                    <div className="w-[30%] flex justify-end pl-[8px] xsm:hidden">
                      <div className="flex flex-col gap-y-[10px]">
                        <ButtonOrder
                          title="View Order"
                          styleCustom="border-button text-text bg-[transparent]"
                        />
                        <ButtonOrder
                          title="Cancel"
                          styleCustom="bg-secondary text-white"
                          onClick={() => handleShowDelete(address)}
                        />
                        {/* <ButtonOrder
                          title="Review"
                          styleCustom="bg-button text-white"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] xsm:flex justify-end sm:hidden mt-[32px]">
                    <div className="flex sm:flex-col xsm:flex-row gap-y-[10px] gap-x-[10px] xsm:w-full">
                      <ButtonOrder
                        title="View Order"
                        styleCustom="border-button text-text bg-[transparent] xsm:w-[50%]"
                      />
                      <ButtonOrder
                        styleCustom="bg-secondary text-white xsm:w-[50%]"
                        title="Cancel"
                        onClick={() => handleShowDelete(address)}
                      />
                      {/* <ButtonOrder
                        title="Review"
                        styleCustom="bg-button text-white xsm:w-[50%]"
                      /> */}
                    </div>
                  </div>
                  <div className="flex mt-[8px]">
                    <h1
                      className={`text-[1.6em] ${
                        (item?.status === "delivery" && "text-[#3CD139]") ||
                        (item?.status === "pending" && "text-[#E3B231]")
                      } mr-[16px] capitalize`}
                    >
                      {item?.status}
                    </h1>
                    <p className="text-[1.6em] text-text mr-[16px]">
                      {item?.status === "pending" && "Your product is pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {noItemCart && <NoItemCart className="max-w-[160px]" title="No orders" />}
      {loading && <LoadingComponent styleCustom="!min-h-[300px]" />}
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
          <p className="text-text text-[1.6em] text-center">{data.address}</p>
        </ModalBody>
        <ModalFooter className="flex gap-x-[10px] gap-y-[10px] xsm:flex-col sm:flex-col l:flex-row">
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-button bg-white xsm:w-full sm:w-full"
          />
          <ButtonModal
            onClick={onClose}
            title="Delete"
            styleCustom="bg-secondary text-white xsm:w-full sm:w-full"
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
      className={`text-[1.6em] font-normal outline-none capitalize px-[20px] py-[8px] w-[100px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80`}
    >
      {title}
    </button>
  );
};

export default ListsOrder;

{
  /* <div>
            <div className="flex justify-between">
              <div className="w-[50%] xsm:w-[80%] flex">
                <div className="!relative">
                  <Image
                    src="/images/product2.png"
                    className="!relative max-w-[80px] w-full max-h-[auto]"
                    alt="Product 1"
                    fill
                    sizes="(max-width: 80px) 100vw"
                  />
                </div>
                <div className="flex flex-col justify-center px-[8px] xsm:px-[0]">
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
              <div className="w-[20%] xsm:w-[20%] flex items-center justify-center px-[8px] xsm:px-[0]">
                <h1 className="text-text text-[1.6em] font-semibold">80.00</h1>
              </div>
              <div className="w-[30%] flex justify-end pl-[8px] xsm:hidden">
                <div className="flex flex-col gap-y-[10px]">
                  <ButtonOrder
                    title="View Order"
                    styleCustom="border-button text-text bg-[transparent]"
                  />
                  <ButtonOrder
                    title="Cancel"
                    styleCustom="bg-secondary text-white"
                    onClick={() => handleShowDelete(address)}
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] xsm:flex justify-end sm:hidden mt-[32px]">
              <div className="flex sm:flex-col xsm:flex-row gap-y-[10px] gap-x-[10px] xsm:w-full">
                <ButtonOrder
                  title="View Order"
                  styleCustom="border-button text-text bg-[transparent] xsm:w-[50%]"
                />
                <ButtonOrder
                  styleCustom="bg-secondary text-white xsm:w-[50%]"
                  title="Cancel"
                  onClick={() => handleShowDelete(address)}
                />
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
          </div> */
}
