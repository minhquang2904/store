"use client";

import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import Total from "@/app/components/total/total";
import { address } from "@/app/data";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const renderCity = (area: any, citis: any, district: any, ward: any) => {
  for (const x of area) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.onchange = function () {
    district.length = 1;
    ward.length = 1;
    if (this.value != "") {
      const result = area.filter((n: any) => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };

  district.onchange = function () {
    ward.length = 1;
    const dataCity = area.filter((n: any) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(
        (n: any) => n.Id === this.value
      )[0].Wards;

      for (const w of dataWards) {
        ward.options[ward.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
};
const Address = () => {
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalAddShow, setModalAddShow] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);
  const [dataModalEdit, setDataModalEdit] = useState([]);
  const [area, setArea] = useState();

  const handleCloseAdd = () => setModalAddShow(false);
  const handleShowAdd = (data: any) => {
    setModalAddShow(true);
  };

  const handleCloseEdit = () => setModalEditShow(false);
  const handleShowEdit = (data: any) => {
    setDataModalEdit(data);
    setModalEditShow(true);
  };

  const handleCloseDelete = () => setModalDeleteShow(false);
  const handleShowDelete = (data: any) => {
    setDataModalDelete(data);
    setModalDeleteShow(true);
  };

  useEffect(() => {
    if (area) {
      const getElement = setTimeout(() => {
        const citis = document.querySelector("#cityAdd");
        const district = document.querySelector("#districtAdd");
        const ward = document.querySelector("#wardAdd");
        renderCity(area, citis, district, ward);
      }, 10);
      return () => clearTimeout(getElement);
    }
  }, [modalAddShow]);

  useEffect(() => {
    getCity().then((data) => setArea(data));
  }, []);

  return (
    <>
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          <TitleCheckOut title="Shipping Address" />
          <div className="flex xsm:flex-col sm:flex-col l:flex-row xsm:w-full sm:w-full">
            <div className="shrink grow-0 l:basis-[70%] h-full xsm:overflow-x-scroll xsm:overflow-y-hidden">
              <button
                className="text-white text-[1.6em] bg-button py-[10px] px-[16px] rounded-[16px] cursor-pointer mb-[20px] hover:opacity-90"
                onClick={handleShowAdd}
              >
                Add a new address
              </button>
              <h1 className="text-text text-[1.6em] font-semibold mb-[20px]">
                Select a delivery address
              </h1>
              <div className="flex flex-wrap gap-y-[16px]">
                {address.map((data, index) => {
                  const { name, address } = data;
                  return (
                    <div key={index} className="p-[16px] w-[33.3333333%] group">
                      <h1 className="text-text text-[1.6em] font-semibold mb-[8px]">
                        {name}
                      </h1>
                      <p className="text-text text-[1.4em] font-medium mb-[20px] min-h-[42px] line-clamp-2">
                        {address}
                      </p>
                      <div className="flex mb-[32px]">
                        <div
                          className="flex w-[50%] px-[8px] py-[6px] justify-center cursor-pointer hover:bg-[#D6D8D9] rounded-[8px]"
                          onClick={() => handleShowEdit(data)}
                        >
                          <EditIcon />
                          <h1 className="text-text text-[1.4em] font-medium ml-[12px]">
                            Edit
                          </h1>
                        </div>
                        <div
                          className="flex w-[50%] px-[8px] py-[6px] justify-center cursor-pointer hover:bg-[#F8D7DA] rounded-[8px]"
                          onClick={() => handleShowDelete(data)}
                        >
                          <DeleteIcon />
                          <h1 className="text-secondary text-[1.4em] font-medium ml-[12px]">
                            Delete
                          </h1>
                        </div>
                      </div>
                      <button className="text-white text-[1.4em] bg-button w-full py-[12px] px-[16px] rounded-[8px] invisible group-hover:visible">
                        Delivery here
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <Total btn={false} />
          </div>
        </div>
      </div>
      <ModalAdd isOpen={modalAddShow} onClose={handleCloseAdd} />
      <ModalEdit
        isOpen={modalEditShow}
        onClose={handleCloseEdit}
        data={dataModalEdit}
      />
      <ModalDelete
        isOpen={modalDeleteShow}
        onClose={handleCloseDelete}
        data={dataModalDelete}
      />
    </>
  );
};

const getCity = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
  );
  const data = res.json();
  return data;
};

const ModalAdd = (props: any) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px"}
        margin={"auto 10px auto 10px"}
      >
        <ModalHeader>
          <div>
            <h1>Add a new address</h1>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col">
          <InputModal title="name" type="text" placeholder="Enter Name" />
          <InputModal
            title="mobile number"
            type="text"
            placeholder="Enter Mobile Number"
          />
          <InputOptionModal
            title="City"
            subTitle="Choose city"
            id="cityAdd"
            name="cityAdd"
          />
          <InputOptionModal
            title="District"
            subTitle="Choose district"
            id="districtAdd"
            name="districtAdd"
          />
          <InputOptionModal
            title="Ward"
            subTitle="Choose ward"
            id="wardAdd"
            name="wardAdd"
          />
          <InputModal
            title="Street Name, Building, House No."
            type="text"
            placeholder="Street Name, Building, House No."
          />
        </ModalBody>
        <ModalFooter>
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-[#D2D8DE] bg-white"
          />
          <ButtonModal
            onClick={onClose}
            title="Add"
            styleCustom="bg-[#255AC2] text-white"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ModalEdit = (props: any) => {
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
          <div>
            <h1>Update address</h1>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col">
          <InputModal title="name" type="text" placeholder="Enter Name" />
          <InputModal
            title="mobile number"
            type="text"
            placeholder="Enter Mobile Number"
          />
          <InputOptionModal
            title="City"
            subTitle="Choose city"
            id="city"
            name="city"
          />
          <InputOptionModal
            title="District"
            subTitle="Choose district"
            id="district"
            name="district"
          />
          <InputOptionModal
            title="Ward"
            subTitle="Choose ward"
            id="ward"
            name="ward"
          />
          <InputModal
            title="Street Name, Building, House No."
            type="text"
            placeholder="Street Name, Building, House No."
          />
        </ModalBody>
        <ModalFooter>
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-[#D2D8DE] bg-white"
          />
          <ButtonModal
            onClick={onClose}
            title="Update"
            styleCustom="bg-[#255AC2] text-white"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const LabelInput = (props: any) => {
  const { title } = props;
  return (
    <label className="text-text capitalize text-[1.6em] mb-[8px] font-medium">
      {title}
    </label>
  );
};

const InputModal = (props: any) => {
  const { title, type, placeholder } = props;
  return (
    <div className="flex flex-col mb-[16px]">
      <LabelInput title={title} />
      <input
        type={type}
        placeholder={placeholder}
        className="outline-none border-[1px] border-solid border-button px-[16px] py-[10px] rounded-[12px] text-[1.6em] text-text"
      />
    </div>
  );
};

const InputOptionModal = (props: any) => {
  const { title, subTitle, id, name, data } = props;
  return (
    <div className="flex flex-col mb-[16px]">
      <LabelInput title={title} />
      <div className="relative">
        <select
          id={id}
          name={name}
          className="border-[1px] border-solid border-button px-[16px] py-[10px] rounded-[12px] text-[1.6em] text-text outline-none appearance-none w-full"
          defaultValue=""
        >
          <option value="">{subTitle}</option>
        </select>
        <label
          className="absolute top-[50%] translate-y-[-50%] right-[16px]"
          htmlFor={id}
        >
          <svg
            fill="none"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m4 8 8 8 8-8"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </label>
      </div>
    </div>
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

const EditIcon = () => {
  return (
    <svg
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#292d32">
        <path d="m15 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75v-6c0-5.43 2.32-7.75 7.75-7.75h2c.41 0 .75.34.75.75s-.34.75-.75.75h-2c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 5.43-2.32 7.75-7.75 7.75z" />
        <path d="m8.49935 17.6901c-.61 0-1.17-.22-1.58-.62-.49-.49-.7-1.2-.59-1.95l.43-3.01c.08-.58.46-1.33.87-1.74l7.87995-7.88004c1.99-1.990001 4.01-1.990001 6 0 1.09 1.09 1.58 2.2 1.48 3.31-.09.9-.57 1.78-1.48 2.68l-7.88 7.88004c-.41.41-1.16.79-1.74.87l-3.00995.43c-.13.03-.26.03-.38.03zm8.06995-14.14004-7.87995 7.88004c-.19.19-.41.63-.45.89l-.43 3.01c-.04.29.02.53.17.68s.39.21.68.17l3.00995-.43c.26-.04.71-.26.89-.45l7.88-7.88004c.65-.65.99-1.23 1.04-1.77.06-.65-.28-1.34-1.04-2.11-1.6-1.6-2.7-1.15-3.87.01z" />
        <path d="m19.8496 9.82978c-.07 0-.14-.01-.2-.03-2.63-.74-4.72-2.83-5.46-5.46-.11-.4.12-.81.52-.93.4-.11.81.12.92.52.6 2.13 2.29 3.82 4.42 4.42.4.11.63.53.52.93-.09.34-.39.55-.72.55z" />
      </g>
    </svg>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="#ff6f61"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m3 6h18m-16 0v14c0 1.1046.89543 2 2 2h10c1.1046 0 2-.8954 2-2v-14m-11 0v-2c0-1.10457.89543-2 2-2h4c1.1046 0 2 .89543 2 2v2" />
        <path d="m14 11v6" />
        <path d="m10 11v6" />
      </g>
    </svg>
  );
};

export default Address;
