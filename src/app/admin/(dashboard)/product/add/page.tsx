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
  ModalBody,
  Link,
} from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LoadingModal from "@/app/components/loadingModal/loadingModal";
import ErrorMessage from "@/app/components/errorMessage/errorMessage";
import LoadingLists from "@/app/components/loadingLists/loadingLists";
import style from "./add.module.scss";
import SubLabel from "@/app/components/subLabel/subLabel";
import Image from "next/image";
import Loading from "@/app/components/loading/loading";
import Select from "react-select";
import toast from "react-hot-toast";

const order = ["s", "m", "l", "xl", "xxl"];

const AddProduct = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(null) as any;
  const [loadingPage, setLoadingPage] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [areaCount, setAreaCount] = useState(null) as any;
  const [images, setImages] = useState([]) as any;
  const [menu, setMenu] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const menuRef: any = useRef(null);
  const iconMenuRef: any = useRef(null);
  const formData = new FormData();

  useEffect(() => {
    document.title = "Luxe Loft | " + "Add products";
  }, []);

  const handleImageUpload = (event: any, setFieldValue: any) => {
    const files = Array.from(event.target.files);

    if (files.length < 7) {
      const length = images.length + files.length;
      if (length < 7) {
        let fileObjects = files.map((file: any) => ({
          url: URL.createObjectURL(file),
          files: file,
          lastModified: file.lastModified,
          size: file.size,
          type: file.type.split("/").pop(),
        }));
        let newArrImage = [...images, ...fileObjects];
        setImages(newArrImage);
        setFieldValue("files", newArrImage);
      }
    }
  };

  const handleRemoveImage = (lastModified: any, setFieldValue: any) => {
    const newImages = images.filter(
      (image: any) => image.lastModified !== lastModified
    );
    setImages(newImages);
    setFieldValue("files", newImages);
  };

  const handleCountArea = (e: any, setFieldValue: any) => {
    const value = e.target.value;
    setAreaCount(value);
    setFieldValue("description", value);
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

  const fetchData = async (type: any) => {
    setLoadingPage(true);
    try {
      const response = await fetch(`/api/admin/${type}`);
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [dataCategories, setDataCategories] = useState(null) as any;
  const [dataSubCategories, setDataSubCategories] = useState(null) as any;
  const [selectedCategory, setSelectedCategory] = useState(null) as any;
  const [checkDataCategories, setCheckDataCategories] = useState(false);

  const [dataSize, setDataSize] = useState(null) as any;
  const [dataSex, setDataSex] = useState(null) as any;
  const [dataColor, setDataColor] = useState(null) as any;
  const [checkDataType, setCheckDataType] = useState(false);

  useLayoutEffect(() => {
    const getDataCategories = async () => {
      const data = await fetchData("categories");
      setLoadingPage(false);
      setDataCategories(data);
    };
    const getDataSubCategories = async () => {
      const data = await fetchData("sub_categories");
      setLoadingPage(false);
      setDataSubCategories(data);
    };
    getDataSubCategories();
    getDataCategories();
  }, [checkDataCategories]);

  useLayoutEffect(() => {
    const getSize = async () => {
      const data = await fetchData("sizes");
      setLoadingPage(false);
      setDataSize(data);
    };
    const getSex = async () => {
      const data = await fetchData("sexs");
      setLoadingPage(false);
      setDataSex(data);
    };
    try {
      setLoadingPage(true);
      fetch(`/api/admin/colors`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            const colors = data.data.map((color: any) => ({
              value: color.colors,
              label: color.colors,
            }));
            setLoadingPage(false);
            setDataColor(colors);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    getSize();
    getSex();
  }, [checkDataType]);

  const handleCategoryChange = (e: any, setFieldValue: any) => {
    setSelectedCategory(e.target.value);
    setFieldValue("categories", e.target.value);
  };

  const filteredSubCategories =
    dataSubCategories &&
    dataSubCategories.filter((sub: any) => sub.categories === selectedCategory);

  const handleChangePrice = (e: any, setFieldValue: any, values: any) => {
    const price = e.target.value;
    setFieldValue("price", Number(price));

    const discount = values.discount;

    const discountedPrice = Math.round(price - (price * discount) / 100);

    setFieldValue("discountedPrice", discountedPrice);
  };
  const handleChangeDiscount = (e: any, setFieldValue: any, values: any) => {
    const discount = e.target.value;
    setFieldValue("discount", Number(discount));

    const price = values.price;

    const discountedPrice = Math.round(price - (price * discount) / 100);

    setFieldValue("discountedPrice", discountedPrice);
  };

  const handleColorChange = (selected: any, setFieldValue: any) => {
    setSelectedColors(selected);
    setFieldValue("colors", selected);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "12px",
      borderColor: "#ABAEB1",
      padding: "0.25rem",
      "&:hover": {
        background: "#e3e7f3",
      },
      fontSize: "1rem",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#D8DADC",
      borderRadius: "12px",
      padding: "0.25rem",
      fontSize: "1.17rem",
      textTransform: "capitalize",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#131118",
      textTransform: "capitalize",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#131118",
      "&:hover": {
        backgroundColor: "transparent",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#a0aec0",
      fontSize: "0.875rem",
      textTransform: "capitalize",
    }),
    menu: (provided: any) => ({
      ...provided,
      fontSize: "1rem",
      textTransform: "capitalize",
    }),
  };

  const colorSizeInitialValues: any = {};
  const [formValues, setFormValues] = useState(colorSizeInitialValues);
  function createInitialValues(
    colors: string[],
    sizes: string[],
    currentFormValues: any
  ) {
    const initialValues = { ...currentFormValues };

    if (!colors || !sizes) {
      return initialValues;
    }

    colors.forEach((color: any) => {
      sizes.forEach((size: any) => {
        const key = `${color.value}_${size.sizes}_quantity`;
        if (!(key in initialValues)) {
          initialValues[key] = 0;
        }
      });
    });

    return initialValues;
  }

  useEffect(() => {
    setFormValues((prevFormValues: any) => {
      const initialValues = createInitialValues(
        selectedColors,
        dataSize,
        prevFormValues
      );
      return { ...prevFormValues, ...initialValues };
    });
  }, [selectedColors, dataSize]);

  const initialValues = {
    files: [],
    name: "",
    subName: "",
    description: "",
    categories: "",
    sub_categories: "",
    sexs: "",
    price: 0,
    discount: 0,
    discountedPrice: 0,
    colors: [],
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
      .test("is-file-too-big", "File exceeds 1MB", () => {
        let valid = true;
        const files = [...images];

        if (files) {
          files.forEach((file: any) => {
            const size = file.size / 1024 / 1024;
            if (size > 1) {
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
      .max(100, "The product name can only be a maximum of 100 characters")
      .matches(/^[a-zA-Z -.]+$/, "Contains special characters or Numbers"),
    description: Yup.string()
      .required("Description is required")
      .max(1000, "The description can only be a maximum of 1000 characters"),
    subName: Yup.string()
      .max(100, "The sub-product name can only be a maximum of 100 characters")
      .matches(/^[a-zA-Z -.]+$/, "Contains special characters or Numbers"),
    categories: Yup.string().required("Categories is required"),
    sub_categories: Yup.string().required("Sub-Categories is required"),
    sexs: Yup.string().required("Sex is required"),
    price: Yup.number()
      .required("Price is required")
      .notOneOf([0], "Price must be greater than 0"),
    discount: Yup.number().required("Discount is required"),
    discountedPrice: Yup.number()
      .required("Discounted Price is required")
      .min(1, "Discounted Price must be greater than 0"),
    colors: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().required("Color value is required"),
          label: Yup.string().required("Color label is required"),
        })
      )
      .min(1, "Please select at least one color")
      .required("Required"),
  });

  const clearString = (value: any) => {
    return value.replace(/\s\s+/g, " ").trim();
  };

  const handleSubmit = (values: any, setSubmitting: any, resetForm: any) => {
    const hasAtLeastOneSizePerColor = selectedColors.every((color: any) => {
      const colorSizes = dataSize.map(
        (size: any) => formValues[`${color.value}_${size.sizes}_quantity`]
      );
      return colorSizes.some((value: any) => value > 0);
    });

    if (!hasAtLeastOneSizePerColor) {
      alert(
        "Each color must have at least one size with a quantity greater than 0"
      );
      setSubmitting(false);
      return;
    }

    const sizeData = Object.entries(formValues).map(([key, value]) => {
      const [color, size, quantity] = key.split("_");
      return {
        size,
        amount: Number(value),
        color,
      };
    });

    const filterColor = sizeData.filter((color: any) =>
      selectedColors.some(
        (selectedColor: any) => selectedColor.value === color.color
      )
    );

    const filterAmount = filterColor.filter(
      (amount: any) => amount.amount >= 0
    );

    const totalQuantity = filterAmount.reduce((acc: any, cur: any) => {
      return acc + cur.amount;
    }, 0);

    formData.append("name", clearString(values.name));
    formData.append("subName", clearString(values.subName));
    formData.append("description", clearString(values.description));
    formData.append("categories", values.categories);
    formData.append("sub_categories", values.sub_categories);
    formData.append("sexs", values.sexs);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("discountedPrice", values.discountedPrice);
    formData.append("colors", JSON.stringify(values.colors));
    formData.append("quantity", totalQuantity);
    formData.append("size", JSON.stringify(filterAmount));
    images.forEach((data: any) => {
      formData.append("files", data.files);
    });

    setSubmitting(true);
    toast
      .promise(
        fetch(`/api/admin/product`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            setSubmitting(false);
            if (data.status === 200) {
              setDataLoading("Successfully");
              setImages([]);
              setFormValues(colorSizeInitialValues);
              setSelectedColors([]);
              resetForm();
              return data.message;
            }
            if (data.status === 400 || data.status === 500) {
              throw new Error(data.message);
            }
          }),
        {
          loading: <div className="text-text text-[1.6em]">Add...</div>,
          success: (data) => (
            <div>
              <span className="text-text">{data}</span> -{" "}
              <Link href="/admin/product/lists" className="underline">
                Lists Product
              </Link>
            </div>
          ),
          error: (data) => <div className="text-text">{data.message}</div>,
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loadingPage && <Loading />}
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
            onSubmit={(values, { setSubmitting, resetForm }) =>
              handleSubmit(values, setSubmitting, resetForm)
            }
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="flex flex-col gap-y-[20px]">
                <div>
                  <div className="flex items-center justify-between">
                    <LabelInput
                      name="images"
                      id="files"
                      styleCustom="!mb-[0]"
                    />
                  </div>
                  <SubLabel title="Choose minimum 1, maximum 6 picture - File not exceeds 1MB - Supported type(.png, .jpeg, .jpg)" />
                  <div className="flex flex-col">
                    <div className="flex flex-wrap xsm:gap-x-[20px] sm:gap-x-[14px] xsm:gap-y-[16px] sm:gap-y-[16px] xsm:justify-center border-[1px] bg-white border-solid border-[#ABAEB1] p-[10px] rounded-[16px]">
                      {images.map((data: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="relative inline-block group overflow-hidden rounded-[16px]"
                          >
                            <Image
                              src={data.url}
                              alt={`Uploaded ${index}`}
                              className="object-cover object-top !h-[100px] !w-[100px] !relative"
                              fill
                              sizes="100vw"
                            />
                            <div className="absolute justify-center items-center top-[0] left-[0] w-full h-full group-hover:flex hidden bg-[rgba(0,0,0,0.4)]">
                              <IconDelete
                                onClick={() =>
                                  handleRemoveImage(
                                    data.lastModified,
                                    setFieldValue
                                  )
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
                    placeholder="Enter product name"
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
                    placeholder="Enter sub-name (optional)"
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
                    placeholder="Enter product description"
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
                <div>
                  <LabelInput name="categories" styleCustom="!mb-[0]" />
                  <h3 className="text-[1.3em] text-[#8d8c8c] mb-[16px]">
                    Please select a main category for your product.
                  </h3>
                  <div className="relative">
                    <Field
                      as="select"
                      name="categories"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      onChange={(e: any) =>
                        handleCategoryChange(e, setFieldValue)
                      }
                    >
                      <option value="" label="Select category" />
                      {dataCategories &&
                        dataCategories
                          .sort((a: any, b: any) =>
                            a.categories.localeCompare(b.categories)
                          )
                          .map((option: any) => {
                            return (
                              <option
                                key={option._id}
                                value={option.categories}
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
                  <LabelInput name="sub_categories" styleCustom="!mb-[0]" />
                  <h3 className="text-[1.3em] text-[#8d8c8c] mb-[16px]">
                    Please select a main sub_categories for your product.
                  </h3>
                  <div className="relative">
                    <Field
                      as="select"
                      name="sub_categories"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                    >
                      <option value="" label="Select sub_categories" />
                      {selectedCategory &&
                        filteredSubCategories.map((category: any) =>
                          category.sub_categories
                            .sort((a: any, b: any) => a.localeCompare(b))
                            .map((sub_categories: any, index: any) => {
                              return (
                                <option
                                  key={`${category}-${index}-${sub_categories}`}
                                  value={sub_categories}
                                >
                                  {sub_categories}
                                </option>
                              );
                            })
                        )}
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
                  <ErrorInput name="sub_categories" />
                </div>
                <div>
                  <LabelInput name="sexs" styleCustom="!mb-[0]" />
                  <h3 className="text-[1.3em] text-[#8d8c8c] mb-[16px]">
                    Please select a main sexs for your product.
                  </h3>
                  <div className="relative">
                    <Field
                      as="select"
                      name="sexs"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                    >
                      <option value="" label="Select sexs" />
                      {dataSex &&
                        dataSex
                          .sort((a: any, b: any) =>
                            a.sexs.localeCompare(b.sexs)
                          )
                          .map((option: any) => {
                            return (
                              <option
                                key={option._id}
                                value={option.sexs}
                                className="capitalized"
                              >
                                {option.sexs}
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
                  <ErrorInput name="sexs" />
                </div>
                <div>
                  <LabelInput name="price" styleCustom="!mb-[0]" />
                  <SubLabel title="The price must be greater than 0 - unit ($)" />
                  <Field
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter product price"
                    onChange={(e: any) =>
                      handleChangePrice(e, setFieldValue, values)
                    }
                    className="!border-[#ABAEB1] xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-button border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                  />
                  <ErrorInput name="price" />
                </div>
                <div className="flex gap-x-[20px] xsm:flex-col xsm:gap-y-[20px]">
                  <div className="w-[50%] xsm:w-full">
                    <LabelInput name="discount" styleCustom="!mb-[0]" />
                    <SubLabel title="Discount based on (%)" />
                    <div className="relative overflow-hidden">
                      <Field
                        type="number"
                        name="discount"
                        id="discount"
                        placeholder="Enter product discount"
                        onChange={(e: any) =>
                          handleChangeDiscount(e, setFieldValue, values)
                        }
                        className="border-[#ABAEB1] pr-[60px] xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium pt-[16px] pl-[16px] pb-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      />
                      <div className="absolute top-[50%] right-[0] translate-y-[-50%] flex items-center bg-[#ABAEB1] rounded-r-[12px] px-[16px] h-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="19" y1="5" x2="5" y2="19" />
                          <circle cx="6.5" cy="6.5" r="2.5" />
                          <circle cx="17.5" cy="17.5" r="2.5" />
                        </svg>
                      </div>
                    </div>
                    <ErrorInput name="discount" />
                  </div>
                  <div className="w-[50%] xsm:w-full">
                    <LabelInput
                      name="discounted price"
                      id="discountedPrice"
                      styleCustom="!mb-[0]"
                    />
                    <SubLabel title="Discounted price is based on price and discount" />
                    <Field
                      type="number"
                      name="discountedPrice"
                      id="discountedPrice"
                      placeholder="Enter product price"
                      className="!border-[#ABAEB1] select-none cursor-not-allowed opacity-50  xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-button border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      readOnly={true}
                    />
                    <ErrorInput name="discountedPrice" />
                  </div>
                </div>
                <div>
                  <LabelInput name="colors" styleCustom="!mb-[0]" />
                  <SubLabel title="Multi-select Colors" />
                  <Field name="colors">
                    {({ field, form }: any) => (
                      <Select
                        isMulti
                        name="colors"
                        options={dataColor}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Please select product colors..."
                        instanceId="myUniqueSelectId"
                        value={values.colors}
                        onChange={(selected) =>
                          handleColorChange(selected, setFieldValue)
                        }
                        styles={customStyles}
                      />
                    )}
                  </Field>
                  <ErrorInput name="colors" />
                </div>
                <div>
                  {selectedColors.map((color: any, colorIndex: any) => {
                    return (
                      <div
                        key={`${color.value}-${colorIndex}`}
                        className="mb-[20px]"
                      >
                        <h2 className="text-text text-[1.4em] capitalize font-normal">
                          {color.label}
                        </h2>
                        <SubLabel
                          title={`The color ${color.value} must have at least one size with a quantity greater than 0`}
                        />
                        <div className="flex justify-between flex-wrap gap-y-[8px]">
                          {dataSize
                            .sort(
                              (a: any, b: any) =>
                                order.indexOf(a.sizes) - order.indexOf(b.sizes)
                            )
                            .map((size: any) => {
                              return (
                                <div
                                  key={`${color.value}-${colorIndex}-${size.sizes}-${size._id}`}
                                  className="w-[16.6666667%] flex items-center xsm:shrink xsm:flex-col"
                                >
                                  <label className="text-text text-[1.5em] uppercase mr-[8px] xsm:mr-[0] xsm:font-medium">
                                    {size.sizes}
                                  </label>
                                  <Field
                                    type="number"
                                    min="0"
                                    name={`${color.value}_${size.sizes}_quantity`}
                                    placeholder="0"
                                    value={
                                      formValues[
                                        `${color.value}_${size.sizes}_quantity`
                                      ] || 0
                                    }
                                    onChange={(e: any) => {
                                      setFormValues({
                                        ...formValues,
                                        [`${color.value}_${size.sizes}_quantity`]:
                                          e.target.value,
                                      });
                                    }}
                                    className="border-[#ABAEB1] xsm:text-center px-[16px] py-[2px] xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium xsm:py-[10px] sm:py-[2px] text-[1.6em] border-solid border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                                  />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <BtnAccount
                    disabled={isSubmitting}
                    type="submit"
                    styleCustom="max-w-[160px] xsm:!mt-[16px]"
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
        setCheckDataCategories={setCheckDataCategories}
        checkDataCategories={checkDataCategories}
        setCheckDataType={setCheckDataType}
        checkDataType={checkDataType}
      />
      <LoadingModal
        title={dataLoading}
        loading={loading}
        resultModal={resultModal}
        styleCustom="max-w-[300px]"
      />
      {overlay && (
        <div className="fixed top-[0] bottom-[0] left-[0] right-[0] backdrop-blur-sm"></div>
      )}
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
    data,
    setCheckDataCategories,
    checkDataCategories,
    setCheckDataType,
    checkDataType,
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
      (type == "categories" || type == "sub_categories") &&
        setCheckDataCategories(!checkDataCategories);
      (type == "sizes" || type == "sexs" || type == "colors") &&
        setCheckDataType(!checkDataType);
    }
  }, [isOpen]);

  const typeSchema = Yup.object().shape({
    [type]: Yup.string()
      .max(500, `${type} name can only contain a maximum of 500 characters.`)
      .matches(/^[a-zA-Z ,-]+$/, "contains special characters or numbers")
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

    try {
      setSubmitting(true);
      fetch(`/api/admin/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(type === "sub_categories" ? obj : values),
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitting(false);
          if (data.status == 200) {
            toast.success("Successfully!", { duration: 3000 });
            onClose();
          }
          if (data.status == 400) {
            toast.error("Exist!", { duration: 3000 });
          }
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
    toast.promise(
      fetch(`/api/admin/${type}?id=${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          setLoadingLists(false);
          if (data.status == 200) {
            getLists();
            return data.message;
          }
          if (data.status == 400 || data.status == 500) {
            throw new Error(data.message);
          }
        }),
      {
        loading: <div className="text-text text-[1.6em]">Deleting...</div>,
        success: (data) => <div className="text-text">{data}</div>,
        error: (data) => <div className="text-text">{data.message}</div>,
      }
    );
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
          if (data.status == 200) {
            toast.success("Successfully!", { duration: 3000 });
            getLists();
            setError(false);
          }
          if (data.status == 400) {
            toast.error("Failed!", { duration: 3000 });
            setErrorData(data.message);
            setError(true);
          }
          setLoadingLists(false);
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
              onClick={() => {
                setError(false);
                setChangeLists(false);
              }}
            >
              Add
            </h1>
            <h1
              className={`select-none cursor-pointer font-medium  ${
                changeLists ? "text-[#1B84FF]" : "text-text"
              }`}
              onClick={() => {
                getLists();
                setError(false);
                setChangeLists(true);
              }}
            >
              List
            </h1>
          </div>
        </ModalHeader>
        {changeLists ? (
          <>
            <div className="px-[16px]">
              {error && (
                <ErrorMessage message={errorData} styleCustom="!mb-[0px]" />
              )}
            </div>
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
                        500,
                        `${type} name can only contain a maximum of 500 characters.`
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
                              Please enter product subcategories - maximum 500
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
                          Please enter product {type} - maximum 500 characters -
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
