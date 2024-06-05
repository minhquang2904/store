"use client";

import { Formik, Form, Field, useField } from "formik";
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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LoadingModal from "@/app/components/loadingModal/loadingModal";
import ErrorMessage from "@/app/components/errorMessage/errorMessage";
import LoadingLists from "@/app/components/loadingLists/loadingLists";
import style from "./add.module.scss";
import SubLabel from "@/app/components/subLabel/subLabel";
import Image from "next/image";

const AddProduct = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(null);
  const [resultModal, setResultModal] = useState(false);
  const [areaCount, setAreaCount] = useState(null) as any;
  const [images, setImages] = useState([]) as any;
  const [menu, setMenu] = useState(false);
  const menuRef: any = useRef(null);
  const iconMenuRef: any = useRef(null);
  const handleImageUpload = (event: any, setFieldValue: any) => {
    const files = Array.from(event.target.files);
    if (files.length < 7) {
      const length = images.length + files.length;
      if (length < 7) {
        let newPreviews: any = [];
        let newPreviewsSub: any = [];
        let updatedImages = [...images];
        files.forEach((file: any) => {
          const reader = new FileReader();
          const size = file.size;
          const type = file.type.split("/").pop();
          reader.onloadend = () => {
            newPreviews.push({
              data: reader.result,
              size: size,
              type: type,
            });
            newPreviewsSub = [...newPreviews];
            if (newPreviews.length === files.length) {
              newPreviewsSub.forEach((preview: any) => {
                if (!images.some((value: any) => value.data === preview.data)) {
                  updatedImages.push(preview);
                }
              });
              setImages(updatedImages);
              setFieldValue("files", updatedImages);
            }
          };
          reader.readAsDataURL(file);
        });
        console.log(updatedImages);
      }
    }
  };

  const handleRemoveImage = (imageUrl: any, setFieldValue: any) => {
    const newImages = images.filter((image: any) => image !== imageUrl);
    setImages(newImages);
    setFieldValue("files", newImages);
  };

  const initialValues = {
    files: [],
    name: "",
    subName: "",
    description: "",
  };

  const productSchema = Yup.object().shape({
    files: Yup.mixed()
      .test("is-limit-files-choose-min", "Select a minimum of 1 image", () => {
        let valid = true;
        const length = images.length;
        if (length < 1) {
          valid = false;
        }
        return valid;
      })
      .test("is-limit-files-choose-max", "Select a maximum of 6 images", () => {
        let valid = true;
        const length = images.length;
        if (length > 6) {
          valid = false;
        }
        return valid;
      })
      .test("is-file-too-big", "File exceeds 2MB", () => {
        let valid = true;
        const files = [...images];
        if (files) {
          files.forEach((file: any) => {
            const size = file.size / 1024 / 1024;
            if (size > 2) {
              valid = false;
            }
          });
        }
        return valid;
      })
      .test("is-file-of-correct-type", "File is not of supported type", () => {
        let valid = true;
        const files = [...images];
        if (files) {
          files.forEach((file: any) => {
            const type = file.type;
            const validTypes = ["jpeg", "png", "jpg"];
            if (!validTypes.includes(type)) {
              valid = false;
            }
          });
        }
        return valid;
      }),
    name: Yup.string()
      .required("Product Name is required")
      .max(100, "The product name can only be a maximum of 100 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(1000, "The description can only be a maximum of 1000 characters"),
    subName: Yup.string().max(
      100,
      "The sub-product name can only be a maximum of 100 characters"
    ),
  });

  const handleCountArea = (e: any, setFieldValue: any) => {
    const value = e.target.value;
    setAreaCount(value);
    setFieldValue("description", value);
  };

  const handleSubmit = (values: any, setSubmitting: any) => {
    console.log("values", values);
    setSubmitting(false);
  };

  const handleShowModalAdd = (e: any) => {
    setDataModal(e.target.id);
    setModalAdd(true);
    setMenu(false);
  };

  const handleCloseModalAdd = () => {
    setModalAdd(false);
  };

  const handleShowMenu = () => setMenu(!menu);

  const handleClickOutSide = (e: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      iconMenuRef.current &&
      !iconMenuRef.current.contains(e.target)
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between mb-[16px]">
        <TitlePageAmin title="Product - Add Product" styleCustom="!mb-[0]" />
        <div className="flex gap-x-[16px] text-[1.4em] uppercase relative">
          <div
            className="p-[10px] rounded-[12px] cursor-pointer bg-[#222222b3]"
            onClick={handleShowMenu}
            ref={iconMenuRef}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path
                d="m0 0h24v24h-24z"
                fill="#fff"
                opacity="0"
                transform="matrix(-1 0 0 -1 24 24)"
              />
              <path
                d="m19 11h-6v-6a1 1 0 0 0 -2 0v6h-6a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
                fill="#fff"
              />
            </svg>
          </div>
          <div
            ref={menuRef}
            className={`absolute top-[calc(100%+5px)] flex-col duration-200 bg-primary shadow-sm right-[0] w-[160px] rounded-[16px] ${
              menu
                ? "flex translate-y-[0] opacity-1 visible"
                : "translate-y-[10px] opacity-0 invisible"
            }`}
          >
            <TitleAddType
              title="categories"
              id="categories"
              onClick={handleShowModalAdd}
            />
            <TitleAddType
              title="Sub-Categories"
              id="sub_categories"
              onClick={handleShowModalAdd}
            />
            <TitleAddType
              title="size"
              id="sizes"
              onClick={handleShowModalAdd}
            />
            <TitleAddType title="sex" id="sexs" onClick={handleShowModalAdd} />
            <TitleAddType
              title="color"
              id="colors"
              onClick={handleShowModalAdd}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[700px]">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            validateOnChange={true}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex flex-col gap-y-[20px]">
                <div>
                  <div className="flex items-center justify-between">
                    <LabelInput
                      name="images"
                      id="files"
                      styleCustom="!mb-[0]"
                    />
                  </div>
                  <SubLabel title="Choose minimum 1, maximum 6 picture - File not exceeds 2MB - Supported type(.png, .jpeg, .jpg)" />
                  <div className="flex flex-col">
                    <div className="flex gap-x-[20px] border-[1px] bg-white border-solid border-[#ABAEB1] p-[10px] rounded-[16px]">
                      {images.map((image: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="relative inline-block group overflow-hidden rounded-[16px]"
                          >
                            <Image
                              src={image.data}
                              alt={`Uploaded ${index}`}
                              className="object-cover object-top !h-[100px] !w-[100px] !relative"
                              fill
                              sizes="100vw"
                            />
                            <div className="absolute justify-center items-center top-[0] left-[0] w-full h-full group-hover:flex hidden bg-[rgba(0,0,0,0.4)]">
                              <IconDelete
                                onClick={() =>
                                  handleRemoveImage(image, setFieldValue)
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                      {images.length < 6 && (
                        <div style={{ display: "inline-block" }}>
                          <label htmlFor="upload-image">
                            <div className="w-[100px] h-[100px] hover:bg-hover1 border-[1px] border-dashed border-[#ABAEB1] flex items-center justify-center cursor-pointer bg-[#eaecef] rounded-[16px]">
                              <div className="p-[4px] bg-[#000000b3] rounded-[50%]">
                                <IconPlus />
                              </div>
                            </div>
                          </label>
                          <input
                            id="upload-image"
                            name="files"
                            type="file"
                            style={{ display: "none" }}
                            multiple={true}
                            accept=".png,.jpg,.jpeg"
                            onChange={(event: any) =>
                              handleImageUpload(event, setFieldValue)
                            }
                          />
                        </div>
                      )}
                    </div>
                    <ErrorInput name="files" />
                  </div>
                </div>
                <div>
                  <LabelInput name="name" styleCustom="!mb-[0]" />
                  <SubLabel title="Product name must not exceed 100 characters." />
                  <FieldInput
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Example: DRY-EX Short Sleeve T-Shirt"
                    styleCustom="!border-[#ABAEB1]"
                  />
                  <ErrorInput name="name" />
                </div>
                <div>
                  <LabelInput
                    name="SubName (optional)"
                    id="subName"
                    styleCustom="!mb-[0]"
                  />
                  <SubLabel title="Sub-product name must not exceed 100 characters" />
                  <FieldInput
                    type="text"
                    name="subName"
                    id="subName"
                    placeholder="Example: DRY-EX Short Sleeve T-Shirt"
                    styleCustom="!border-[#ABAEB1]"
                  />
                  <ErrorInput name="subName" />
                </div>
                <div>
                  <LabelInput name="description" styleCustom="!mb-[0]" />
                  <SubLabel title="Product name must not exceed 1000 characters." />
                  <Field
                    onChange={(e: any) => handleCountArea(e, setFieldValue)}
                    as="textarea"
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Example: Made from 100% soft cotton, it is breathable and lightweight, making it ideal for warm weather,..."
                    className="w-full resize-none xsm:text-subMobile sm:text-subTablet l:text-subDesktop font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                  />
                  <ErrorInput name="description" />
                  <div className="flex justify-end">
                    <h1
                      className={`text-[1.3em] ${
                        areaCount && areaCount.length > 1000
                          ? "text-secondary"
                          : "text-text "
                      }`}
                    >
                      {(areaCount && areaCount.length) || 0} / 1000
                    </h1>
                  </div>
                </div>
                <div className="flex justify-end">
                  <BtnAccount
                    disabled={isSubmitting}
                    type="submit"
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
      className="py-[10px] text-center cursor-pointer font-medium px-[16px] text-text hover:text-opacity-70 duration-100"
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
  const [getCategories, setCategories] = useState(null) as any;

  useLayoutEffect(() => {
    if (type === "sub_categories") {
      setLoadingLists(true);
      fetch("/api/admin/categories")
        .then((res) => res.json())
        .then((data) => {
          setLoadingLists(false);
          setCategories(data.data);
        });
    }
  }, [type]);

  useLayoutEffect(() => {
    if (!isOpen) {
      setChangeLists(false);
      setError(false);
      setGetData(null);
    }
  }, [isOpen]);

  const typeSchema = Yup.object().shape({
    [type]: Yup.string()
      .max(100, `${type} name can only contain a maximum of 100 characters.`)
      .matches(/^[a-zA-Z ,]+$/, "contains special characters or numbers")
      .required(`${type} is required`),
  });

  const handleSubmit = (values: any, setSubmitting: any) => {
    let obj: any;
    if (type === "sub_categories") {
      obj = {
        sub_categories: values.sub_categories,
      };
      const jsonParse = JSON.parse(values.categories);
      obj.id = jsonParse._id;
      obj.categories = jsonParse.categories;
    }
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
        body: JSON.stringify(type === "sub_categories" ? obj : values),
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
          let sortedArray: any;
          setLoadingLists(false);
          if (data.status == 200) {
            if (type === "sub_categories") {
              sortedArray = [...data.data].sort((a, b) =>
                a.categories.localeCompare(b.categories)
              );
            } else {
              sortedArray = [...data.data].sort((a, b) =>
                a[type].localeCompare(b[type])
              );
            }
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

  const handleDeleteSubCategories = (item: any, id: any) => {
    setLoadingLists(true);

    let values: any = {
      item: item,
      sub_categories_id: id,
    };

    try {
      fetch(`/api/admin/${type}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoadingLists(false);
          getLists();
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
                      {type === "sub_categories" ? (
                        <>
                          <table>
                            <thead>
                              <tr>
                                <TitleTable title="Sub-Categories" />
                                <TitleTable title="Categories" />
                                <TitleTable title="action" />
                              </tr>
                            </thead>
                            <tbody>
                              {getData.map(
                                (category: any, categoryIndex: any) => {
                                  return category.sub_categories
                                    .sort((a: any, b: any) =>
                                      a.localeCompare(b)
                                    )
                                    .map(
                                      (
                                        sub_categories: any,
                                        subCategoryIndex: any
                                      ) => {
                                        return (
                                          <tr
                                            key={`${subCategoryIndex}-${categoryIndex}-${sub_categories}-${category}`}
                                          >
                                            <td className="font-normal w-full p-[10px] text-text text-[1.6em] text-start uppercase">
                                              {sub_categories}
                                            </td>
                                            <td className="font-normal w-full p-[10px] text-text text-[1.6em] text-start uppercase">
                                              <h1>{category.categories}</h1>
                                            </td>
                                            <td
                                              className="flex justify-center items-center p-[10px]"
                                              onClick={() =>
                                                handleDeleteSubCategories(
                                                  sub_categories,
                                                  category._id
                                                )
                                              }
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
                                      }
                                    );
                                }
                              )}
                            </tbody>
                          </table>
                        </>
                      ) : (
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
                      )}
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
              {type === "sub_categories" ? (
                <Formik
                  initialValues={{ [type]: "", categories: "" }}
                  validationSchema={Yup.object().shape({
                    [type]: Yup.string()
                      .max(
                        100,
                        `${type} name can only contain a maximum of 100 characters.`
                      )
                      .matches(
                        /^[a-zA-Z ,-]+$/,
                        "contains special characters or numbers"
                      )
                      .required(`${type} is required`),
                    categories: Yup.string().required("Categories is required"),
                  })}
                  validateOnBlur={false}
                  onSubmit={(values, { setSubmitting }) =>
                    handleSubmit(values, setSubmitting)
                  }
                >
                  {({ isSubmitting }) => (
                    <>
                      {loadingLists && <LoadingLists />}
                      {getCategories && (
                        <Form className="flex flex-col gap-y-[20px]">
                          <div>
                            <LabelInput
                              name="categories"
                              styleCustom="!mb-[0]"
                            />
                            <h3 className="text-[1.3em] text-[#8d8c8c] mb-[16px]">
                              Please select a main category for your product.
                            </h3>
                            <div className="relative">
                              <Field
                                as="select"
                                name="categories"
                                className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                              >
                                <option value="" label="Select category" />
                                {getCategories
                                  .sort((a: any, b: any) =>
                                    a.categories.localeCompare(b.categories)
                                  )
                                  .map((option: any) => {
                                    const jsonString = JSON.stringify(option);
                                    return (
                                      <option
                                        key={option._id}
                                        value={jsonString}
                                      >
                                        {option.categories}
                                      </option>
                                    );
                                  })}
                              </Field>
                              <label className="absolute top-[50%] translate-y-[-50%] right-[16px]">
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

                            <ErrorInput name="categories" />
                          </div>
                          <div>
                            <LabelInput name={type} styleCustom="!mb-[0]" />
                            <h3 className="text-[1.3em] text-[#8d8c8c] mb-[16px]">
                              Please enter product subcategories - maximum 100
                              characters - separated by commas `&#44;`.
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
                    </>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={{ [type]: "" }}
                  validationSchema={typeSchema}
                  validateOnBlur={false}
                  onSubmit={(values, { setSubmitting }) =>
                    handleSubmit(values, setSubmitting)
                  }
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-y-[20px]">
                      <div>
                        <LabelInput name={type} styleCustom="!mb-[0]" />
                        <h3 className="text-[1.3em] text-[#8d8c8c] mb-[16px]">
                          Please enter product {type} - maximum 100 characters -
                          separated by commas `&#44;`.
                        </h3>
                        <FieldInput
                          type="text"
                          name={type}
                          id={type}
                          placeholder={"Example: " + `${type}1, ${type}2,...`}
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
              )}
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

const IconDelete = ({ onClick }: any) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick}
    >
      <g stroke="#fff" strokeWidth="1.5">
        <path d="m5.05063 8.73418c-.8449-1.12655-.04109-2.73418 1.36709-2.73418h11.16458c1.4082 0 2.212 1.60763 1.3671 2.73418-.6163.82166-.9494 1.82102-.9494 2.84812v6.4177c0 2.2091-1.7909 4-4 4h-4c-2.20914 0-4-1.7909-4-4v-6.4177c0-1.0271-.33312-2.02646-.94937-2.84812z" />
        <g strokeLinecap="round">
          <path d="m14 17v-6" strokeLinejoin="round" />
          <path d="m10 17v-6" strokeLinejoin="round" />
          <path d="m16 6-.5442-1.63246c-.2722-.81668-1.0365-1.36754-1.8973-1.36754h-3.117c-.86084 0-1.62512.55086-1.89735 1.36754l-.54415 1.63246" />
        </g>
      </g>
    </svg>
  );
};

const IconPlus = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
    >
      <path
        d="m0 0h24v24h-24z"
        fill="#fff"
        opacity="0"
        transform="matrix(-1 0 0 -1 24 24)"
      />
      <path
        d="m19 11h-6v-6a1 1 0 0 0 -2 0v6h-6a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
        fill="#fff"
      />
    </svg>
  );
};

export default AddProduct;
