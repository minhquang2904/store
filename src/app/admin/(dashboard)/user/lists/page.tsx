"use client";
import TitlePageAmin from "@/app/components/titlePageAdmin/titlePageAdmin";
import { useEffect, useState } from "react";
import TitleTable from "@/app/components/titleTable/titleTable";
import ContentTable from "@/app/components/contentTable/conentTable";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import style from "./lists.module.scss";
import LabelInput from "@/app/components/labelInput/labelInput";
import Image from "next/image";
import Pagination from "@/app/components/pagination/pagination";

const ListUser = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [users, setUsers] = useState([]) as any;
  const [modalSee, setModalSee] = useState(false);
  const [dataModalSee, setDataModalSee] = useState(null) as any;
  const [modalImage, setModalImage] = useState(false) as any;
  const [dataModalImage, setDataModalImage] = useState(null) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log("data", "test--------------------");
  const fetchData = () => {
    setLoadingData(true);
    try {
      fetch(`/api/admin/getUser?page=${currentPage}&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data.status === 200) {
            const dataReverse = data.data.reverse();
            setTotalPages(data.totalPages);
            setUsers(dataReverse);
          }
          if (data.status === 400) {
            console.error(data.message);
          }
          setLoadingData(false);
        });
    } catch (error) {
      console.error("Error in fetchData: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleShowModalDetail = (user: any) => {
    setDataModalSee(user);
    setModalSee(true);
  };

  const handleCloseModalDetail = () => setModalSee(false);

  const handleCloseModalImage = () => setModalImage(false);

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setLoadingData(true);
      setCurrentPage(page);
    }
  };
  return (
    <>
      <div>
        <TitlePageAmin title="USER - LIST USER" />
        <div className="overflow-x-auto min-h-[705px] relative">
          <table className="min-w-full">
            <thead>
              <tr>
                <TitleTable title="Email" />
                <TitleTable title="Last name" />
                <TitleTable title="First name" />
                <TitleTable title="Phone Number" />
                <TitleTable title="Status" />
                <TitleTable title="Action" />
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user: any) => (
                  <tr
                    key={user._id}
                    className={`${loadingData ? "animate-pulse" : ""}`}
                  >
                    <ContentTable title={user.email} styleCustom="!lowercase" />
                    <ContentTable
                      title={user.firstName ? user.firstName : "N/A"}
                    />
                    <ContentTable
                      title={user.lastName ? user.lastName : "N/A"}
                    />
                    <ContentTable title={user.phone ? user.phone : "N/A"} />
                    <td className="font-normal px-[10px] py-[14px] text-text text-[1.6em] text-start capitalize">
                      <span
                        className={`${
                          user.status == "active"
                            ? "bg-[#D4EDDA] text-[#155724]"
                            : "bg-[#F8D7DA] text-[#ff6f61]"
                        } font-medium px-[16px] py-[8px] rounded-[16px]`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="font-normal px-[10px] py-[14px] text-text text-[1.6em] text-start capitalize flex gap-x-[14px]">
                      <div
                        className="inline-block cursor-pointer bg-[#FFF3CD] p-[8px] rounded-[12px] hover:opacity-80 duration-200"
                        onClick={() => handleShowModalDetail(user)}
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
                      <div
                        className="inline-block cursor-pointer bg-[#E2E3E5] p-[8px] rounded-[12px] hover:opacity-80 duration-200"
                        // onClick={() =>
                        //   handleShowModalDelete(product._id, product.name)
                        // }
                      >
                        <svg
                          fill="none"
                          height="22"
                          viewBox="0 0 24 24"
                          width="22"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g stroke="#383D41" strokeWidth="1.5">
                            <circle cx="12" cy="6" r="4" />
                            <path d="m15 13.3271c-.9264-.2109-1.9391-.3271-3-.3271-4.41828 0-8 2.0147-8 4.5s0 4.5 8 4.5c5.6874 0 7.3315-1.0183 7.8068-2.5" />
                            <path
                              d="m15.1715 18.8284c.7239.7239 1.7239 1.1716 2.8285 1.1716 2.2091 0 4-1.7909 4-4 0-1.1046-.4477-2.1046-1.1716-2.8285m-5.6569 5.6569c-.7238-.7239-1.1715-1.7238-1.1715-2.8284 0-2.2091 1.7909-4 4-4 1.1046 0 2.1045.4477 2.8284 1.1715m-5.6569 5.6569 5.6569-5.6569"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pb-[16px]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {modalImage && (
        <ModalImage
          data={dataModalImage}
          onClose={handleCloseModalImage}
          isOpen={modalImage}
        />
      )}
      {modalSee && (
        <ModalSee
          isOpen={modalSee}
          onClose={handleCloseModalDetail}
          data={dataModalSee}
          setModalImage={setModalImage}
          setDataModalImage={setDataModalImage}
        />
      )}
    </>
  );
};

const ModalSee = (props: any) => {
  const { isOpen, onClose, data, setModalImage, setDataModalImage } = props;

  const {
    image,
    firstName,
    lastName,
    loginAt,
    logoutAt,
    role,
    status,
    email,
    address_list,
    phone,
  } = data;

  const handleShowModalImage = (url: any) => {
    setDataModalImage(url);
    setModalImage(true);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"30px 10px 10px 10px "}
        margin={"auto 15px auto 15px"}
        className="min-w-[800px]"
      >
        <ModalBody
          className={`${style.tableScroll} flex flex-col gap-y-[20px] overflow-y-auto max-h-[600px]`}
        >
          <div className="inline-block">
            {image && (
              <div
                className="relative inline-block group overflow-hidden rounded-[16px] !h-[100px] !w-[100px] cursor-pointer"
                onClick={() => handleShowModalImage(image.url)}
              >
                <div className="!relative group duration-200">
                  <Image
                    src={image.url || "/images/avatar-profile.png"}
                    alt={`Image ${image.url}`}
                    className="rounded-[50%] object-cover object-top !h-[100px] !w-[100px] !relative"
                    fill
                    sizes="(max-width: 100px) 100vw"
                    loading="lazy"
                  />
                  <div className="absolute rounded-[50%] bg-[rgba(0,0,0,0.3)] top-[0] left-[0] bottom-[0] right-[0] hidden group-hover:flex justify-center items-center">
                    <svg
                      fill="none"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="#fff">
                        <path d="m5 6c0-.55228.44772-1 1-1h2c.55228 0 1-.44772 1-1s-.44772-1-1-1h-2c-1.65685 0-3 1.34315-3 3v2c0 .55228.44772 1 1 1s1-.44772 1-1z" />
                        <path d="m5 18c0 .5523.44772 1 1 1h2c.55228 0 1 .4477 1 1s-.44772 1-1 1h-2c-1.65685 0-3-1.3431-3-3v-2c0-.5523.44772-1 1-1s1 .4477 1 1z" />
                        <path d="m18 5c.5523 0 1 .44772 1 1v2c0 .55228.4477 1 1 1s1-.44772 1-1v-2c0-1.65685-1.3431-3-3-3h-2c-.5523 0-1 .44772-1 1s.4477 1 1 1z" />
                        <path d="m19 18c0 .5523-.4477 1-1 1h-2c-.5523 0-1 .4477-1 1s.4477 1 1 1h2c1.6569 0 3-1.3431 3-3v-2c0-.5523-.4477-1-1-1s-1 .4477-1 1z" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <div className="w-[50%]">
              <LabelInput name="First Name" styleCustom="!mb-[4px]" />
              <TitleSee title={firstName || "N/A"} />
            </div>
            <div className="w-[50%]">
              <LabelInput name="last name" styleCustom="!mb-[4px]" />
              <TitleSee title={lastName || "N/A"} />
            </div>
          </div>
          <div className="flex">
            <div className="w-[50%]">
              <LabelInput name="email" styleCustom="!mb-[4px]" />
              <TitleSee title={email || "N/A"} styleCustom="!lowercase" />
            </div>
            <div className="w-[50%]">
              <LabelInput name="role" styleCustom="!mb-[4px]" />
              <TitleSee title={role || "N/A"} />
            </div>
          </div>
          <div className="flex">
            <div className="w-[50%]">
              <LabelInput name="login At" styleCustom="!mb-[4px]" />
              <TitleSee
                title={new Date(loginAt).toLocaleString("en-GB") || "N/A"}
              />
            </div>
            <div className="w-[50%]">
              <LabelInput name="logout At" styleCustom="!mb-[4px]" />
              <TitleSee
                title={new Date(logoutAt).toLocaleString("en-GB") || "N/A"}
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-[50%]">
              <LabelInput name="Status" styleCustom="!mb-[4px]" />
              <div
                className={`${
                  status == "active"
                    ? "bg-[#D4EDDA] text-[#155724]"
                    : "bg-[#F8D7DA] text-[#ff6f61]"
                } font-medium px-[16px] py-[8px] rounded-[16px] text-[1.6em] capitalize inline-block`}
              >
                {status}
              </div>
            </div>
            <div className="w-[50%]">
              <LabelInput name="number phone" styleCustom="!mb-[4px]" />
              <TitleSee title={phone || "N/A"} />
            </div>
          </div>
          <div className="inline-block">
            <LabelInput name="Address" styleCustom="!mb-[4px]" />
            <TitleSee title={address_list.length > 0 ? address_list : "N/A"} />
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

const ModalImage = (props: any) => {
  const { url, onClose } = props;

  return (
    <div className="fixed flex z-[5000] duration-200 top-[0] bottom-[0] left-[0] right-[0] items-center justify-center">
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.6)]"></div>
      <div>
        <div
          className="absolute right-[30px] top-[30px] cursor-pointer hover:opacity-80 duration-200"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <div className="relative">
          <Image
            src={url || "/images/avatar-profile.png"}
            alt={`Uploaded ${url}`}
            className="!max-h-[300px] !max-w-[300px] !relative object-cover object-center select-none"
            fill
            sizes="(max-width: 100px) 100vw"
            loading="lazy"
          />
        </div>
      </div>
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

const TitleSee = ({ title, styleCustom }: any) => {
  return (
    <div className={`text-text text-[1.6em] capitalize ${styleCustom}`}>
      {title}
    </div>
  );
};

export default ListUser;
