"use client";
import ContentTable from "@/app/components/contentTable/conentTable";
import TitlePageAmin from "@/app/components/titlePageAdmin/titlePageAdmin";
import TitleTable from "@/app/components/titleTable/titleTable";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import style from "./newOrders.module.scss";
import LabelInput from "@/app/components/labelInput/labelInput";
import Image from "next/image";
import toast from "react-hot-toast";
import { FormatCurrencyVND } from "@/app/config/formatCurrencyVND";

const ListOrder = () => {
  const [listOrder, setListOrder] = useState(null) as any;
  const [modalSee, setModalSee] = useState(false);
  const [dataModalSee, setDataModalSee] = useState(null) as any;

  const fetchListOrder = async () => {
    try {
      const res = await fetch("/api/admin/order");
      const result = await res.json();
      const { message, status } = result;
      console.log("result", result);
      if (status === 200) {
        setListOrder(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!listOrder) {
      fetchListOrder();
    }
  }, [listOrder]);

  const handleShowModalDetail = (order: any) => {
    setDataModalSee(order);
    setModalSee(true);
  };

  const handleCloseModalDetail = () => setModalSee(false);

  return (
    <>
      <div>
        <TitlePageAmin title="ORDER - NEW ORDER" />
        <div className="overflow-x-auto min-h-[705px] relative">
          <table className="min-w-full">
            <thead>
              <tr>
                <TitleTable title="Name" />
                <TitleTable title="Phone Number" />
                <TitleTable title="Total" />
                <TitleTable title="Quantity" styleCustom="!text-center" />
                <TitleTable title="Status" />
                <TitleTable title="Action" />
              </tr>
            </thead>
            <tbody>
              {listOrder &&
                listOrder.map((order: any) => (
                  <tr
                    key={order._id}
                    // className={`${loadingData ? "animate-pulse" : ""}`}
                  >
                    <ContentTable
                      title={
                        order.lastName || order.firstName
                          ? order.lastName + " " + order.firstName
                          : "N/A"
                      }
                    />
                    <ContentTable title={order.phone ? order.phone : "N/A"} />
                    <ContentTable
                      title={
                        order.totalPrice
                          ? FormatCurrencyVND(order.totalPrice)
                          : "N/A"
                      }
                      styleCustom="!text-secondary !font-medium"
                    />
                    <ContentTable
                      title={order.items ? order.items.length : "N/A"}
                      styleCustom="!text-center"
                    />
                    <td className="font-normal px-[10px] py-[14px] text-text text-[1.6em] text-start capitalize">
                      <span
                        className={`${
                          order.status == "pending" &&
                          "text-[#FFA500] bg-[#FFF3CD]"
                        } font-medium px-[16px] py-[8px] rounded-[16px]`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="font-normal px-[10px] py-[14px] text-text text-[1.6em] text-start capitalize flex gap-x-[14px]">
                      <div
                        className="inline-block cursor-pointer bg-[#FFF3CD] p-[8px] rounded-[12px] hover:opacity-80 duration-200"
                        onClick={() => handleShowModalDetail(order)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          viewBox="0 0 24 24"
                          width="22"
                          fill="none"
                          stroke="#956424"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-eye"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* {users.length === 0 && <LoadingTable />} */}
        </div>
      </div>
      {modalSee && (
        <ModalSee
          isOpen={modalSee}
          onClose={handleCloseModalDetail}
          data={dataModalSee}
          fetchListOrder={fetchListOrder}
        />
      )}
    </>
  );
};

const ModalSee = (props: any) => {
  const { isOpen, onClose, data, fetchListOrder } = props;
  const handleConfirmOrder = (id: any) => {
    try {
      fetch("/api/admin/order/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((result) => {
          const { message, status } = result;
          if (status === 200) {
            fetchListOrder();
            toast.success(result.message);
            onClose();
          }
          if (status === 500) {
            toast.error(result.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"30px 10px 10px 10px "}
        margin={"auto 15px auto 15px"}
        className="l:min-w-[800px] xsm:!max-w-[400px] sm:min-w-[700px]"
      >
        <h1 className="text-[2em] text-button capitalize px-[24px] mb-[8px]">
          orders from {data.firstName + " " + data.lastName} -{" "}
          <span className="text-secondary font-medium">
            {FormatCurrencyVND(data.totalPrice)}
          </span>
        </h1>
        <ModalBody
          className={`${style.tableScroll} flex flex-col gap-y-[20px] xsm:gap-y-[16px] overflow-y-auto max-h-[600px]`}
        >
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput
              label="Total Price"
              title={FormatCurrencyVND(data.totalPrice) || "N/A"}
            />
            <LabelAndInput label="status" title={data.status || "N/A"} />
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput label="First Name" title={data.firstName || "N/A"} />
            <LabelAndInput label="last name" title={data.lastName || "N/A"} />
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput label="Payment" title={data.payment || "N/A"} />
            <LabelAndInput label="Phone" title={data.phone || "N/A"} />
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput
              label="Order date"
              title={new Date(data.createdAt).toLocaleString("en-GB") || "N/A"}
            />
            <LabelAndInput
              label="Confirmation date"
              title={
                data.updatedAt
                  ? new Date(data.updatedAt).toLocaleString("en-GB")
                  : "N/A"
              }
            />
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput
              label="Quantity"
              title={data.email || "N/A"}
              styleCustomSee="!lowercase"
            />
            <LabelAndInput
              label="Address delivery"
              title={data.address || "N/A"}
            />
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px] flex-col">
            <LabelAndInput label="List Product" />
            <div className="flex flex-wrap">
              {data.items.map((item: any) => {
                return (
                  <div
                    key={`${item._id}`}
                    className="py-[12px] !relative flex xsm:w-[100%] w-[50%] items-center"
                  >
                    <Image
                      src={
                        item.productId.files[0].url || "/images/no-image.png"
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
                          {item.quantity} x {FormatCurrencyVND(item.price)}
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
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex xsm:flex-col sm:flex-col l:flex-row gap-x-[10px] gap-y-[10px]">
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-button bg-white xsm:w-full sm:w-full"
          />
          <ButtonModal
            title="Confirm Order"
            styleCustom="border-button bg-button xsm:w-full sm:w-full text-white"
            onClick={() => handleConfirmOrder(data._id)}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const LabelAndInput = ({ label, title, styleCustom, styleCustomSee }: any) => {
  return (
    <div className={`w-[50%] xsm:w-full ${styleCustom}`}>
      <LabelInput name={label} styleCustom="!mb-[4px]" />
      <TitleSee title={title} styleCustom={styleCustomSee} />
    </div>
  );
};

const TitleSee = ({ title, styleCustom }: any) => {
  return (
    <div className={`text-text text-[1.6em] capitalize ${styleCustom}`}>
      {title}
    </div>
  );
};

const ButtonModal = (props: any) => {
  const { styleCustom, onClick, title, disabled } = props;
  return (
    <button
      onClick={onClick}
      className={`text-[1.6em] font-normal outline-none capitalize px-[20px] py-[8px] w-[120px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80 ${
        disabled
          ? "cursor-not-allowed opacity-80"
          : "cursor-pointer opacity-100"
      }`}
      disabled={disabled || false}
    >
      {title}
    </button>
  );
};

export default ListOrder;
