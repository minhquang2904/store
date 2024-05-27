"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TitlePageAmin from "@/app/components/titlePageAdmin/titlePageAdmin";
import LabelInput from "@/app/components/labelInput/labelInput";
import FieldInput from "@/app/components/fieldInput/fieldInput";
import ErrorInput from "@/app/components/errorInput/errorInput";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useLayoutEffect, useRef, useState } from "react";
import LoadingModal from "@/app/components/loadingModal/loadingModal";
import ErrorMessage from "@/app/components/errorMessage/errorMessage";
import LoadingLists from "@/app/components/loadingLists/loadingLists";
import style from "./add.module.scss";

const AddProduct = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(null);
  const [resultModal, setResultModal] = useState(false);

  const productSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
  });

  const handleSubmit = (values: any, setSubmitting: any) => {
    setSubmitting(false);
  };

  const handleShowModalAdd = (e: any) => {
    setDataModal(e.target.id);
    setModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setModalAdd(false);
  };
  return (
    <>
      <div className="flex justify-between mb-[16px]">
        <TitlePageAmin title="Product - Add Product" styleCustom="!mb-[0]" />
        <div className="flex gap-x-[16px] text-[1.4em] uppercase">
          <TitleAddType
            title="categories"
            id="categories"
            onClick={handleShowModalAdd}
          />
          <TitleAddType title="size" id="sizes" onClick={handleShowModalAdd} />
          <TitleAddType title="sex" id="sexs" onClick={handleShowModalAdd} />
          <TitleAddType
            title="color"
            id="colors"
            onClick={handleShowModalAdd}
          />
        </div>
      </div>
      <div className="flex flex-col max-w-[700px]">
        <div>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={productSchema}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-y-[20px]">
                <div>
                  <LabelInput name="name" />
                  <FieldInput
                    type="text"
                    name="name"
                    id="name"
                    placeholder="User Name"
                    styleCustom="!border-[#ABAEB1]"
                  />
                  <ErrorInput name="name" />
                </div>
                <div>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="4"
                    className="w-full resize-none xsm:text-subMobile sm:text-subTablet l:text-subDesktop font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                  />
                </div>
                <div className="flex justify-end">
                  <BtnAccount
                    disabled={isSubmitting}
                    type="submit"
                    title="Login"
                    styleCustom="max-w-[160px]"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ModalAdd
        isOpen={modalAdd}
        setModalAdd={setModalAdd}
        onClose={handleCloseModalAdd}
        data={dataModal}
        setLoading={setLoading}
        setDataLoading={setDataLoading}
        setResultModal={setResultModal}
      />
      <LoadingModal
        title={dataLoading}
        loading={loading}
        resultModal={resultModal}
        styleCustom="max-w-[300px]"
      />
    </>
  );
};

const TitleAddType = ({ title, onClick, id }: any) => {
  return (
    <div
      id={id}
      className="py-[10px] cursor-pointer font-medium px-[8px] text-text hover:text-opacity-70 duration-100"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const ModalAdd = (props: any) => {
  const {
    isOpen,
    onClose,
    setModalAdd,
    data,
    setLoading,
    setDataLoading,
    setResultModal,
  } = props;
  const type = data;
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [changeLists, setChangeLists] = useState(false);
  const [getData, setGetData] = useState(null) as any;
  const [loadingLists, setLoadingLists] = useState(false);
  const [sortedItems, setSortedItems] = useState(null);

  useLayoutEffect(() => {
    if (!isOpen) {
      setChangeLists(false);
      setError(false);
      setGetData(null);
    }
  }, [isOpen]);

  const typeSchema = Yup.object().shape({
    [type]: Yup.string()
      .max(10, `${type} name can only contain a maximum of 10 characters.`)
      .required(`${type} is required`),
  });

  const handleSubmit = (values: any, setSubmitting: any) => {
    const cate = values[type];
    setDataLoading(`Add ${type} : ${cate}`);
    setLoading(true);
    setSubmitting(true);
    try {
      fetch(`/api/admin/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            setDataLoading("Successfully");
            setResultModal(true);
            setModalAdd(false);
            setTimeout(() => {
              setLoading(false);
            }, 800);
            setTimeout(() => {
              setResultModal(false);
            }, 1000);
          }
          if (data.status == 400) {
            setDataLoading("Failed");
            setErrorData(data.message);
            setError(true);
            setResultModal(true);
            setTimeout(() => {
              setLoading(false);
            }, 800);
            setTimeout(() => {
              setResultModal(false);
            }, 1000);
          }
          setTimeout(() => {
            setSubmitting(false);
          }, 1200);
        });
    } catch (error: any) {
      console.log("Add Failed", error.message);
    }
  };

  const getLists = () => {
    setLoadingLists(true);
    try {
      fetch(`/api/admin/${type}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setLoadingLists(false);
          if (data.status == 200) {
            const sortedArray = [...data.data].sort((a, b) =>
              a[type].localeCompare(b[type])
            );
            setGetData(sortedArray);
          }
        });
    } catch (error: any) {
      console.log("Get Failed", error.message);
    }
  };

  const handleDelete = (id: any) => {
    setLoadingLists(true);
    try {
      fetch(`/api/admin/${type}?id=${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            setLoadingLists(false);
            getLists();
          }
        });
    } catch (error: any) {
      console.log("Delete Failed", error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"16px 12px 16px 12px"}
        margin={"auto 15px auto 15px"}
      >
        <div className="flex justify-end select-none duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-[#868995] hover:stroke-button cursor-pointer"
            onClick={() => {
              onClose();
              setError(false);
            }}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <ModalHeader padding={"8px 16px"}>
          <div className="flex gap-x-[16px] uppercase">
            <h1
              className={`select-none cursor-pointer font-medium ${
                changeLists ? "text-text" : "text-[#1B84FF]"
              }`}
              onClick={() => setChangeLists(false)}
            >
              Add
            </h1>
            <h1
              className={`select-none cursor-pointer font-medium  ${
                changeLists ? "text-[#1B84FF]" : "text-text"
              }`}
              onClick={() => {
                getLists();
                setChangeLists(true);
              }}
            >
              List
            </h1>
          </div>
        </ModalHeader>
        {changeLists ? (
          <>
            {getData && (
              <>
                <ModalBody
                  className={`flex flex-col ${style.tableScroll} max-h-[545px] overflow-y-auto`}
                  padding={"8px 16px"}
                >
                  {getData.length > 0 ? (
                    <>
                      <table>
                        <thead>
                          <tr>
                            <TitleTable title="type" />
                            <TitleTable title="action" />
                          </tr>
                        </thead>
                        <tbody>
                          {getData.map((data: any) => {
                            return (
                              <tr key={data._id}>
                                <td className="font-normal w-full p-[10px] text-text text-[1.6em] text-start uppercase">
                                  {data[type]}
                                </td>
                                <td
                                  className="flex justify-center items-center p-[10px]"
                                  onClick={() => handleDelete(data._id)}
                                >
                                  <svg
                                    fill="none"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="cursor-pointer"
                                  >
                                    <g
                                      stroke="#ff6f61"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                    >
                                      <path d="m3 6h18m-16 0v14c0 1.1046.89543 2 2 2h10c1.1046 0 2-.8954 2-2v-14m-11 0v-2c0-1.10457.89543-2 2-2h4c1.1046 0 2 .89543 2 2v2"></path>
                                      <path d="m14 11v6"></path>
                                      <path d="m10 11v6"></path>
                                    </g>
                                  </svg>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <div className="text-center text-[1.6em] text-text font-normal">
                      There are no {type} - please switch to the tab to add{" "}
                      {type}
                    </div>
                  )}
                </ModalBody>
              </>
            )}
            {loadingLists && <LoadingLists />}
          </>
        ) : (
          <>
            <div className="px-[16px]">
              {error && (
                <ErrorMessage message={errorData} styleCustom="!mb-[0px]" />
              )}
            </div>
            <ModalBody className="flex flex-col" padding={"8px 16px"}>
              <Formik
                initialValues={{ [type]: "" }}
                validationSchema={typeSchema}
                onSubmit={(values, { setSubmitting }) =>
                  handleSubmit(values, setSubmitting)
                }
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-y-[20px]">
                    <div>
                      <LabelInput name={type} styleCustom="!mb-[0]" />
                      <h3 className="text-[1.3em] text-[#8d8c8c] mb-[16px]">
                        Make it short - You can only enter up to 10 characters
                      </h3>
                      <FieldInput
                        type="text"
                        name={type}
                        id={type}
                        placeholder={"Enter " + type + "..."}
                        styleCustom="!border-[#ABAEB1]"
                      />
                      <ErrorInput name={type} />
                    </div>
                    <div className="flex justify-end gap-x-[8px]">
                      <BtnAccount
                        disabled={isSubmitting}
                        type="submit"
                        styleCustom="max-w-[130px] !border-button !mt-[20px]"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const TitleTable = ({ title, styleCustom }: any) => {
  return (
    <th
      className={`w-full p-[10px] text-text text-[1.6em] font-medium text-start capitalize border-b border-[#515d6d] ${styleCustom}`}
    >
      {title}
    </th>
  );
};

export default AddProduct;
