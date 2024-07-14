"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import NoItemCart from "@/app/components/noItemCart/noItemCart";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import Image from "next/image";
import style from "./listOrder.module.scss";
import { FormatCurrencyVND } from "@/app/config/formatCurrencyVND";

const ListsOrder = () => {
  const [listOrder, setListOrder] = useState(null) as any;
  const { user } = useAuthContext();

  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState(null);
  const [noItemCart, setNoItemCart] = useState(false) as any;
  const [modalViewOrder, setModalViewOrder] = useState(false);
  const [dataModalViewOrder, setDataModalViewOrder] = useState(null) as any;
  const [loading, setLoading] = useState(false) as any;

  const handleCloseDelete = () => setModalDeleteShow(false);

  const handleCloseModalViewOrder = () => setModalViewOrder(false);
  const handleShowModalViewOrder = (data: any) => {
    setDataModalViewOrder(data);
    setModalViewOrder(true);
  };

  const fetchListOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/order?id=${user?.id}`);
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

  useEffect(() => {
    if (!listOrder) {
      fetchListOrder();
    }
  }, [listOrder, user?.id]);

  const handleShowDelete = (id: any) => {
    setDataModalDelete(id);
    setModalDeleteShow(true);
  };

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
                          title="Cancel"
                          styleCustom="bg-secondary text-white border-secondary border-[1px] border-solid"
                          onClick={() => handleShowDelete(item._id)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] xsm:flex justify-end sm:hidden mt-[20px]">
                    <div className="flex sm:flex-col xsm:flex-row gap-y-[10px] gap-x-[10px] xsm:w-full">
                      <ButtonOrder
                        title="View Order"
                        styleCustom="border-button text-text bg-[transparent] xsm:w-[50%]"
                        onClick={() => handleShowModalViewOrder({ item })}
                      />
                      <ButtonOrder
                        styleCustom="bg-secondary text-white xsm:w-[50%] border-secondary border-[1px] border-solid"
                        title="Cancel"
                        onClick={() => handleShowDelete(item._id)}
                      />
                    </div>
                  </div>
                  <div className="flex mt-[8px]">
                    <h1
                      className={`text-[1.6em] ${
                        item?.status === "pending" && "text-[#E3B231]"
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
        fetchListOrder={fetchListOrder}
      />
      {modalViewOrder && (
        <ModalConfirmOrder
          isOpen={modalViewOrder}
          onClose={handleCloseModalViewOrder}
          data={dataModalViewOrder}
        />
      )}
    </>
  );
};

const ModalConfirmOrder = (props: any) => {
  const { isOpen, onClose, data } = props;
  const [seeMore, setSeeMore] = useState(false);
  const { item } = data;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <div className="flex justify-end gap-x-[10px] mb-[10px]">
            <ButtonModal
              onClick={onClose}
              title="Close"
              styleCustom="border-button bg-white !w-[100%]"
            />
          </div>
        </div>
      </ModalContent>
    </Modal>
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

const ModalDelete = (props: any) => {
  const { isOpen, onClose, data, fetchListOrder } = props;
  const color = "#ff6f61";
  const { push } = useRouter();

  const handleDelete = (id: any) => {
    toast.promise(
      fetch(`/api/product/order?orderId=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          const { message, status } = result;
          if (status === 200) {
            fetchListOrder();
            onClose();
            return message;
          } else {
            throw new Error(JSON.stringify(message));
          }
        }),
      {
        loading: <div className="text-text text-[1.6em]">Deleting...</div>,
        success: (data) => (
          <div>
            <span>{data}</span> -{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => push("/profile/listHistoryOrder")}
            >
              History Order
            </span>
          </div>
        ),
        error: (data) => {
          const message = JSON.parse(data.message);
          return (
            <div>
              <span>{message.error}</span> -{" "}
              <span
                onClick={() => push("/profile/listHistoryOrder")}
                className="underline cursor-pointer"
              >
                History Order
              </span>
            </div>
          );
        },
      },
      { duration: 4000 }
    );
  };
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
          <h1 className="text-[2.2em] text-secondary">Delete Order</h1>
          {/* <p className="text-text text-[1.6em] text-center">{data.address}</p> */}
        </ModalBody>
        <ModalFooter className="flex gap-x-[10px] gap-y-[10px] xsm:flex-col sm:flex-col l:flex-row">
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-button bg-white xsm:w-full sm:w-full"
          />
          <ButtonModal
            onClick={() => handleDelete(data)}
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
