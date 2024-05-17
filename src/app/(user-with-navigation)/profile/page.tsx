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
import Loading from "@/app/components/loading/loading";

const renderCity = (area: any, citis: any, district: any, ward: any) => {
  for (const x of area) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.addEventListener("change", () => {
    district.length = 1;
    ward.length = 1;
    if (citis.value != "") {
      const result = area.filter((n: any) => n.Id === citis.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  });

  district.addEventListener("change", () => {
    ward.length = 1;
    const dataCity = area.filter((n: any) => n.Id === citis.value);
    if (district.value != "") {
      const dataWards = dataCity[0].Districts.filter(
        (n: any) => n.Id === district.value
      )[0].Wards;

      for (const w of dataWards) {
        ward.options[ward.options.length] = new Option(w.Name, w.Id);
      }
    }
  });
};

const Profile = () => {
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState();
  const AREA_URL: any = process.env.AREA_URL;

  const handleCloseModalEditProfile = () => setModalEditProfile(false);
  const handleShowModalEditProfile = () => {
    setLoading(true);
    getDataArea(AREA_URL).then((data) => {
      setArea(data);
      setLoading(false);
      setModalEditProfile(true);
    });
  };

  useEffect(() => {
    if (area && modalEditProfile) {
      const getElement = setTimeout(() => {
        const citis = document.querySelector("#cityAdd");
        const district = document.querySelector("#districtAdd");
        const ward = document.querySelector("#wardAdd");
        renderCity(area, citis, district, ward);
      }, 10);
      return () => clearTimeout(getElement);
    }
  }, [modalEditProfile]);
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div className="!relative max-w-[80px] max-h-[80px] w-full">
            <Image
              src="/images/profile.png"
              alt="Bag"
              className="!relative max-w-[80px] max-h-[80px] w-full h-full rounded-[50%] object-cover"
              fill
              sizes="(max-width: 51px) 100vw"
            />
          </div>
          <div
            className="inline-flex items-center bg-button px-[20px] py-[12px] rounded-[16px] cursor-pointer"
            onClick={handleShowModalEditProfile}
          >
            <svg
              fill="none"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="white">
                <path d="m15 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75v-6c0-5.43 2.32-7.75 7.75-7.75h2c.41 0 .75.34.75.75s-.34.75-.75.75h-2c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 5.43-2.32 7.75-7.75 7.75z" />
                <path d="m8.49935 17.6901c-.61 0-1.17-.22-1.58-.62-.49-.49-.7-1.2-.59-1.95l.43-3.01c.08-.58.46-1.33.87-1.74l7.87995-7.88004c1.99-1.990001 4.01-1.990001 6 0 1.09 1.09 1.58 2.2 1.48 3.31-.09.9-.57 1.78-1.48 2.68l-7.88 7.88004c-.41.41-1.16.79-1.74.87l-3.00995.43c-.13.03-.26.03-.38.03zm8.06995-14.14004-7.87995 7.88004c-.19.19-.41.63-.45.89l-.43 3.01c-.04.29.02.53.17.68s.39.21.68.17l3.00995-.43c.26-.04.71-.26.89-.45l7.88-7.88004c.65-.65.99-1.23 1.04-1.77.06-.65-.28-1.34-1.04-2.11-1.6-1.6-2.7-1.15-3.87.01z" />
                <path d="m19.8496 9.82978c-.07 0-.14-.01-.2-.03-2.63-.74-4.72-2.83-5.46-5.46-.11-.4.12-.81.52-.93.4-.11.81.12.92.52.6 2.13 2.29 3.82 4.42 4.42.4.11.63.53.52.93-.09.34-.39.55-.72.55z" />
              </g>
            </svg>
            <h1 className="text-white text-[1.6em] ml-[8px] capitalize select-none">
              Edit profile
            </h1>
          </div>
        </div>
        <div className="mt-[32px]">
          <div className="flex gap-x-[20px]">
            <InputModal
              title="First Name"
              styleCustom="w-[50%]"
              readOnly={true}
            />
            <InputModal
              title="Last Name"
              styleCustom="w-[50%]"
              readOnly={true}
            />
          </div>
          <div className="flex gap-x-[20px]">
            <InputModal
              title="Phone Number"
              styleCustom="w-[50%]"
              readOnly={true}
            />
            <InputModal
              title="Email Address"
              styleCustom="w-[50%]"
              readOnly={true}
            />
          </div>
          <div className="flex gap-x-[20px]">
            <InputModal
              title="Address"
              styleCustom="w-[100%]"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <ModalAdd
        isOpen={modalEditProfile}
        onClose={handleCloseModalEditProfile}
      />
      {loading && <Loading />}
    </>
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
  const { title, type, placeholder, styleCustom, readOnly } = props;
  return (
    <div className={`flex flex-col mb-[16px] ${styleCustom}`}>
      <LabelInput title={title} />
      <input
        readOnly={readOnly}
        type={type}
        placeholder={placeholder}
        className="outline-none border-[1px] border-solid border-button px-[16px] py-[10px] rounded-[12px] text-[1.6em] text-text"
      />
    </div>
  );
};

const ButtonModal = (props: any) => {
  const { styleCustom, onClick, title } = props;
  return (
    <button
      onClick={onClick}
      className={`text-[1.6em] font-normal outline-none capitalize ml-[16px] px-[20px] py-[8px] w-[120px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80`}
    >
      {title}
    </button>
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

const ModalAdd = (props: any) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px"}
        margin={"auto 10px auto 10px"}
        maxWidth={"500px"}
      >
        <ModalHeader>
          <div>
            <h1>Edit Profile</h1>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col">
          <div className="flex justify-between gap-x-[20px]">
            <InputModal
              title="First Name"
              type="text"
              placeholder="Enter First Name"
              styleCustom={"w-[50%]"}
            />
            <InputModal
              title="Last Name"
              type="text"
              placeholder="Enter Last Name"
              styleCustom={"w-[50%]"}
            />
          </div>
          <InputModal
            title="mobile number"
            type="text"
            placeholder="Enter Mobile Number"
          />
          <InputModal
            title="Email Address"
            type="text"
            placeholder="Enter Email Address"
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
            styleCustom="border-button bg-white"
          />
          <ButtonModal
            onClick={onClose}
            title="Save"
            styleCustom="bg-button text-white"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const getDataArea = async (url: any) => {
  const res = await fetch(url);
  return res.json();
};

export default Profile;
