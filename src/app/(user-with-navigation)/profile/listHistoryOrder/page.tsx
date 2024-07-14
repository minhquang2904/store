"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useAuthContext } from "@/app/context/AuthContext";
import NoItemCart from "@/app/components/noItemCart/noItemCart";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import Image from "next/image";
import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import style from "./listHistoryOrder.module.scss";
import { FormatCurrencyVND } from "@/app/config/formatCurrencyVND";

const ListsHistoryOrder = () => {
  const { push } = useRouter();
  const [listOrder, setListOrder] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [noItemCart, setNoItemCart] = useState(false);

  const [modalReOrderShow, setModalReOrderShow] = useState(false);
  const [dataModalReOrder, setDataModalReOrder] = useState(null) as any;
  const [modalViewOrder, setModalViewOrder] = useState(false);
  const [dataModalViewOrder, setDataModalViewOrder] = useState(null) as any;
  const [btnSubmit, setBtnSubmit] = useState(false) as any;

  const handleCloseModalViewOrder = () => setModalViewOrder(false);
  const handleShowModalViewOrder = (data: any) => {
    setDataModalViewOrder(data);
    setModalViewOrder(true);
  };

  const handleCloseModalReOrder = () => setModalReOrderShow(false);
  const handleShowModalReOrder = (orderId: any) => {
    setDataModalReOrder({ orderId });
    setModalReOrderShow(true);
  };

  const fetchHistoryOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/history_order?id=${user?.id}`);
      const result = await res.json();
      const { status } = result;
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

  const handleReOrder = (orderId: any) => {
    setBtnSubmit(true);
    toast.promise(
      fetch("/api/product/order", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      })
        .then((res) => res.json())
        .then((result) => {
          setBtnSubmit(false);
          const { status, message } = result;

          if (status === 200) {
            fetchHistoryOrder();
            handleCloseModalReOrder();
            handleCloseModalViewOrder();
            return result.message;
          } else {
            throw new Error(JSON.stringify(message));
          }
        }),
      {
        loading: <div className="text-text text-[1.6em]">Re-order...</div>,
        success: (data) => (
          <div>
            <span>{data}</span> -{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => push("/profile/listsOrder")}
            >
              History Order
            </span>
          </div>
        ),
        error: (data) => {
          const message = JSON.parse(data.message);
          return (
            <div>
              <span>{message?.error} </span> -{" "}
              <span
                onClick={() => push(`/productDetail?id=${message?.errorId}`)}
                className="underline capitalize cursor-pointer"
              >
                view product
              </span>
            </div>
          );
        },
      },
      { duration: 4000 }
    );
  };

  useEffect(() => {
    if (!listOrder) {
      fetchHistoryOrder();
    }
  }, [listOrder, user?.id]);

  return (
    <>
      {listOrder && (
        <>
          <div className="flex flex-col gap-y-[45px]">
            {listOrder?.map((item: any) => {
              return (
                <div key={item._id}>
                  <div className="flex justify-between">
                    <div className="w-[50%] xsm:w-[80%] flex">
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
                        <h3 className="text-text text-[1.6em] font-normal capitalize">
                          Order date -{" "}
                          {new Date(item?.createdAt).toLocaleString("en-GB")}
                        </h3>
                        <h3 className="text-text text-[1.6em] font-normal capitalize">
                          {item?.status === "cancel" &&
                            "Cancel date - " +
                              new Date(item?.updatedAt).toLocaleString("en-GB")}
                          {item?.status === "confirm" &&
                            "Confirm date - " +
                              new Date(item?.updatedAt).toLocaleString("en-GB")}
                        </h3>
                      </div>
                    </div>
                    <div className="w-[20%] xsm:w-[20%] flex items-center justify-center px-[8px] xsm:px-[0]">
                      <h1 className="text-text text-[1.6em] font-semibold">
                        {FormatCurrencyVND(item?.totalPrice)} <span>đ</span>
                      </h1>
                    </div>
                    <div className="w-[30%] flex justify-end pl-[8px] xsm:hidden">
                      <div className="flex flex-col gap-y-[10px]">
                        <ButtonOrder
                          title="View Order"
                          styleCustom="border-button text-text bg-[transparent]"
                          onClick={() => handleShowModalViewOrder({ item })}
                        />
                        <ButtonOrder
                          title="Re-order"
                          styleCustom="bg-button text-white border-button border-[1px] border-solid"
                          onClick={() => handleShowModalReOrder(item._id)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] xsm:flex justify-end sm:hidden mt-[20px]">
                    <div className="flex sm:flex-col xsm:flex-row gap-y-[10px] gap-x-[10px] xsm:w-full">
                      <ButtonOrder
                        title="View Order"
                        styleCustom="border-button text-text bg-[transparent] xsm:w-[50%]"
                        onClick={() => handleShowModalViewOrder(item._id)}
                      />
                      <ButtonOrder
                        styleCustom="bg-button text-white xsm:w-[50%] border-button border-[1px] border-solid"
                        title="Re-order"
                      />
                    </div>
                  </div>
                  <div className="flex mt-[8px]">
                    <h1
                      className={`text-[1.6em] ${
                        (item?.status === "confirm" && "text-[#3CD139]") ||
                        (item?.status === "cancel" && "text-secondary")
                      } mr-[16px] capitalize`}
                    >
                      {item?.status}
                    </h1>
                    <p className="text-[1.6em] text-text mr-[16px]">
                      {item?.status === "confirm" && "Your order is confirmed"}
                      {item?.status === "cancel" && "Your order is canceled"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {noItemCart && (
        <NoItemCart className="max-w-[160px]" title="No order history" />
      )}
      {modalReOrderShow && (
        <ModalReOrder
          isOpen={modalReOrderShow}
          onClose={handleCloseModalReOrder}
          data={dataModalReOrder}
          handleReOrder={handleReOrder}
          btnSubmit={btnSubmit}
        />
      )}
      {modalViewOrder && (
        <ModalConfirmOrder
          isOpen={modalViewOrder}
          onClose={handleCloseModalViewOrder}
          data={dataModalViewOrder}
          handleReOrder={handleReOrder}
          btnSubmit={btnSubmit}
        />
      )}
      {loading && <LoadingComponent styleCustom="!min-h-[300px]" />}
    </>
  );
};

const ButtonOrder = (props: any) => {
  const { styleCustom, title, onClick } = props;
  return (
    <button
      className={`px-[16px] py-[4px] w-full text-[1.6em] border-[1px] border-solid rounded-[12px] ${styleCustom}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const ModalReOrder = (props: any) => {
  const { isOpen, onClose, data, handleReOrder, btnSubmit } = props;
  const { orderId } = data;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px"}
        margin={"auto 10px auto 10px"}
      >
        <ModalHeader className="mt-[16px]">
          <div className="flex justify-center">
            <div className="max-w-[40px] max-h-[40px] relative before:content-[''] before:absolute before:w-[60px] before:h-[60px] before:bg-[#D3D3D3] before:top-[50%] before:left-[50%] before:translate-y-[-50%] before:translate-x-[-50%] z-0 before:rounded-[50%] ">
              <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                width="26 "
                height="26"
                fill="#131118"
                className="z-1 relative"
              >
                <path d="m504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984 31.385 24.905 71.104 39.77 114.323 39.77 101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314h-145.373c-8.837 0-16-7.163-16-16v-145.373c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372c44.523-42.549 104.866-68.685 171.314-68.685 136.81 0 247.747 110.78 248 247.531zm-180.912 78.784 9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679l-40.701-31.657v-104.349c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z" />
              </svg>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center">
          <h1 className="text-[2.2em] text-button">Re-Order</h1>
          {/* <p className="text-text text-[1.6em] text-center">{data.address}</p> */}
        </ModalBody>
        <ModalFooter className="flex gap-x-[10px] gap-y-[10px] xsm:flex-col sm:flex-col l:flex-row">
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-button bg-white xsm:w-full sm:w-full"
          />
          <ButtonModal
            onClick={() => handleReOrder(orderId)}
            disabled={btnSubmit}
            title={btnSubmit ? "Re-order..." : "Re-order"}
            styleCustom={`bg-button text-white xsm:w-full sm:w-full ${
              btnSubmit ? "opacity-80" : "opacity-100"
            }`}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ModalConfirmOrder = (props: any) => {
  const { isOpen, onClose, data, handleReOrder, btnSubmit } = props;
  const [seeMore, setSeeMore] = useState(false);
  const { item } = data;

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px 2px 10px 2px"}
        margin={"auto 15px auto 15px"}
        background={"#F3F4F4"}
        className="xsm:!max-w-[400px] xsm:!max-h-[600px] max-h-[800px]"
      >
        <div className="xsm:px-[16px] px-[12px] py-[10px]">
          <h1 className="text-text text-[2em] font-medium">Review Order</h1>
          <div
            className={`mt-[20px] overflow-y-auto xsm:max-h-[400px] max-h-[600px] pr-[12px] ${style.tableScroll}`}
          >
            <div>
              <div>
                <TitleCheckOut
                  title={`There are ${item?.items?.length} products in total`}
                />
                <ul
                  className={`${
                    seeMore ? "max-h-[100%]" : "max-h-[357px]"
                  } overflow-hidden`}
                >
                  {item && (
                    <>
                      {item?.items
                        ?.slice()
                        ?.reverse()
                        ?.map((item: any) => {
                          return (
                            <div
                              key={`${item._id} - ${item.productId._id}`}
                              className="py-[12px] !relative flex"
                            >
                              <Image
                                src={
                                  item.productId.files[0].url ||
                                  "/images/no-image.png"
                                }
                                className="!relative max-w-[80px] max-h-[80px] object-cover"
                                alt="Bag"
                                fill
                                sizes="(max-width: 80px) 100vw"
                              />
                              <div className="flex flex-col justify-center ml-[16px] basis-full shrink grow-0">
                                <h2 className="text-text text-[1.4em] font-medium capitalize">
                                  {item.productId.name}
                                </h2>
                                <h3 className="text-text text-[1.4em] my-[4px] font-bold flex gap-x-[4px]">
                                  <p>
                                    {item.quantity} x{" "}
                                    {FormatCurrencyVND(item.price)}
                                  </p>
                                  <p className="text-secondary">
                                    ({FormatCurrencyVND(item.totalPriceItem)})
                                  </p>
                                </h3>
                                <div className="flex justify-between items-center">
                                  <div className="text-text text-[1.4em] font-normal flex gap-x-[6px] items-center">
                                    <p className="h-full block">Size:</p>
                                    <p className="uppercase font-semibold h-full block">
                                      {item.size} - {item.color}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </ul>
                {item?.items?.length > 3 && (
                  <div className="text-center">
                    <div
                      className="group select-none hover:bg-button text-center mt-[16px] cursor-pointer text-text text-[1.3em] font-medium inline-flex items-center seeMoreBtn border-[1px] border-solid border-button px-[16px] py-[4px] rounded-[16px]"
                      onClick={() => setSeeMore(!seeMore)}
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
                        className={`${seeMore && "rotate-180"}`}
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
              </div>
              <div className="my-[30px]">
                <TitleCheckOut title="Shipping Address" />
                <div className="text-text text-[1.5em] font-normal mt-[4px]">
                  {item?.address}
                </div>
              </div>
              <div>
                <TitleCheckOut title="Payment Method" />
                <div className="text-text text-[1.5em] font-normal mt-[4px] capitalize">
                  {item?.payment}
                </div>
              </div>
            </div>
          </div>
          <div className="xsm:pt-[30px] pt-[40px] mb-[16px] flex justify-between">
            <h1 className="text-secondary capitalize font-bold text-[1.6em]">
              Grand Total
            </h1>
            <h1 className="text-secondary capitalize font-bold text-[1.6em]">
              {FormatCurrencyVND(item?.totalPrice)}{" "}
              <span className="text-text lowercase">đ</span>
            </h1>
          </div>
          <div className="flex justify-between gap-x-[10px] mb-[10px]">
            <ButtonModal
              onClick={onClose}
              title="Cancel"
              styleCustom="border-button bg-white !w-[50%]"
            />
            <BtnAccount
              styleCustom="!mt-[0] !px-[20px] !py-[8px] !border-button !rounded-[12px] !w-[50%]"
              onClick={() => handleReOrder(item._id)}
              title={btnSubmit ? "Re-order..." : "Re-order"}
              disabled={btnSubmit}
            />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

const ButtonModal = (props: any) => {
  const { styleCustom, onClick, title, disabled } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-[1.6em] font-normal outline-none capitalize px-[20px] py-[8px] w-[100px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80`}
    >
      {title}
    </button>
  );
};

export default ListsHistoryOrder;
