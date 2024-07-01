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

const ListOrder = () => {
  const [listOrder, setListOrder] = useState(null) as any;
  const [modalSee, setModalSee] = useState(false);
  const [dataModalSee, setDataModalSee] = useState(null) as any;

  const fetchListOrder = async () => {
    try {
      const res = await fetch("/api/admin/order");
      const result = await res.json();
      const { message, status } = result;
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
                      title={order.totalPrice ? order.totalPrice : "N/A"}
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
        />
      )}
    </>
  );
};

const ModalSee = (props: any) => {
  const { isOpen, onClose, data } = props;
  console.log(data);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"30px 10px 10px 10px "}
        margin={"auto 15px auto 15px"}
        className="l:min-w-[800px] xsm:!max-w-[400px] sm:min-w-[700px]"
      >
        <ModalBody
          className={`${style.tableScroll} flex flex-col gap-y-[20px] xsm:gap-y-[16px] overflow-y-auto max-h-[600px]`}
        >
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput label="First Name" title={"N/A"} />
            <LabelAndInput label="last name" title={"N/A"} />
          </div>
        </ModalBody>
        <ModalFooter className="flex xsm:flex-col sm:flex-col l:flex-row gap-x-[10px] gap-y-[10px]">
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-button bg-white xsm:w-full sm:w-full"
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
