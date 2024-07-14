"use client";
import Loading from "@/app/components/loading/loading";
import TitlePageAmin from "@/app/components/titlePageAdmin/titlePageAdmin";
import { useEffect, useLayoutEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import LabelInput from "@/app/components/labelInput/labelInput";
import Image from "next/image";
import SubLabel from "@/app/components/subLabel/subLabel";
import ErrorInput from "@/app/components/errorInput/errorInput";
import * as Yup from "yup";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import { useRouter } from "next/navigation";
import Select from "react-select";
import LoadingModal from "@/app/components/loadingModal/loadingModal";
import toast from "react-hot-toast";
import Link from "next/link";

const order = ["s", "m", "l", "xl", "xxl"];

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]) as any;
  const [images, setImages] = useState([]) as any;
  const [areaCount, setAreaCount] = useState(null) as any;
  const [dataCategories, setDataCategories] = useState(null) as any;
  const [dataSubCategories, setDataSubCategories] = useState(null) as any;
  const [selectedCategory, setSelectedCategory] = useState(null) as any;
  const [dataSex, setDataSex] = useState(null) as any;
  const [selectedColors, setSelectedColors] = useState([]);
  const [dataColor, setDataColor] = useState(null) as any;
  const [dataSize, setDataSize] = useState(null) as any;
  const [dataLoading, setDataLoading] = useState(null) as any;
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [productName, setProductName] = useState("") as any;
  const [productSubName, setProductSubName] = useState("") as any;
  const [productDescription, setProductDescription] = useState("") as any;
  const [productCategories, setProductCategories] = useState("") as any;
  const [productSubCategories, setProductSubCategories] = useState("") as any;
  const [productSexs, setProductSexs] = useState("") as any;
  const [productPrice, setProductPrice] = useState(0) as any;
  const [productDiscount, setProductDiscount] = useState(0) as any;
  const [productDiscountedPrice, setProductDiscountedPrice] = useState(
    0
  ) as any;
  const formData = new FormData();
  const router = useRouter();

  const [formValues, setFormValues] = useState(() =>
    createInitialValues(selectedColors, dataSize)
  );

  function createInitialValues(colors: string[], sizes: string[]) {
    const initialValues: { [key: string]: number } = {};

    if (!colors || !sizes) {
      return initialValues;
    }

    colors.forEach((color: any) => {
      sizes.forEach((size: any) => {
        const key = `${color.value}_${size.sizes}_quantity`;
        initialValues[key] = formValues[key] || 0;
      });
    });

    return initialValues;
  }

  const mergeApiDataWithInitialValues = (
    apiData: any[],
    initialValues: { [key: string]: number }
  ) => {
    apiData.forEach((item) => {
      const key = `${item.color}_${item.size}_quantity`;
      initialValues[key] = item.amount;
    });
    return initialValues;
  };

  const filterMergedValues = (mergedValues: any) => {
    const result: any = {};
    Object.entries(mergedValues).forEach(([key, value]) => {
      if (key.includes("_quantity")) {
        result[key] = value;
      }
    });
    return result;
  };

  useEffect(() => {
    setFormValues((prevFormValues) => {
      const initialValues = createInitialValues(selectedColors, dataSize);
      return { ...prevFormValues, ...initialValues };
    });
  }, [selectedColors, dataSize]);

  const getProductsId = async () => {
    const res = await fetch(`/api/admin/product/?id=${params.productId}`, {
      method: "GET",
    });
    const data = await res.json();
    const mergedValues = mergeApiDataWithInitialValues(
      data.products.sizes,
      data.products.colors
    );
    const filteredValues = filterMergedValues(mergedValues);

    if (data.status === 200) {
      setProduct(data.products);
      setImages(data.products.files);
      setAreaCount(data.products.description);
      setSelectedCategory(data.products.categories);
      setSelectedColors(data.products.colors);
      setProductName(data.products.name);
      setProductSubName(data.products.subName);
      setProductDescription(data.products.description);
      setProductCategories(data.products.categories);
      setProductSubCategories(data.products.sub_categories);
      setProductSexs(data.products.sexs);
      setProductPrice(data.products.price);
      setProductDiscount(data.products.discount);
      setProductDiscountedPrice(data.products.discountedPrice);
      setLoading(false);
      setFormValues(filteredValues);
    }
    if (data.status === 500) {
      router.push("/admin/product/404");
    }
  };

  const fetchData = async (type: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${type}`);
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useLayoutEffect(() => {
    setLoading(true);
    getProductsId();
  }, []);

  useEffect(() => {
    document.title = "Luxe Loft | " + product.name;
  }, [product]);

  useLayoutEffect(() => {
    const getDataCategories = async () => {
      const data = await fetchData("categories");
      setLoading(false);
      setDataCategories(data);
    };
    const getDataSubCategories = async () => {
      const data = await fetchData("sub_categories");
      setLoading(false);
      setDataSubCategories(data);
    };
    getDataCategories();
    getDataSubCategories();
  }, []);

  useLayoutEffect(() => {
    const getSize = async () => {
      const data = await fetchData("sizes");
      setLoading(false);
      setDataSize(data);
    };
    const getSex = async () => {
      const data = await fetchData("sexs");
      setLoading(false);
      setDataSex(data);
    };
    try {
      setLoading(true);
      fetch(`/api/admin/colors`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            const colors = data.data.map((color: any) => ({
              value: color.colors,
              label: color.colors,
            }));
            setLoading(false);
            setDataColor(colors);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    getSize();
    getSex();
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
        let newArrImage = [...images];
        fileObjects.forEach((fileObject: any) => {
          if (
            !newArrImage.some(
              (image: any) => image.lastModified === fileObject.lastModified
            )
          ) {
            newArrImage.push(fileObject);
          }
        });
        setImages(newArrImage);
        setFieldValue("files", newArrImage);
      }
    }
  };

  const handleRemoveImage = (index: any, setFieldValue: any) => {
    images.splice(index, 1);
    setImages(images);
    setFieldValue("files", images);
  };

  const initialValues = {
    files: [],
    name: productName || "",
    subName: productSubName || "",
    description: productDescription || "",
    categories: productCategories || "",
    sub_categories: productSubCategories || "",
    sexs: productSexs || "",
    price: productPrice || 0,
    discount: productDiscount || 0,
    discountedPrice: productDiscountedPrice || 0,
    colors: [...selectedColors],
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
            if (
              typeof file === "object" &&
              file.hasOwnProperty("lastModified")
            ) {
              const size = file.size / 1024 / 1024;
              if (size > 1) {
                valid = false;
              }
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
            if (
              typeof file === "object" &&
              file.hasOwnProperty("lastModified")
            ) {
              const type = file.type;
              const validTypes = ["jpeg", "png", "jpg"];
              if (!validTypes.includes(type)) {
                valid = false;
              }
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
    // .matches(/^[a-zA-Z0-9 -.]+$/, "Contains special characters or Numbers"),
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

  const handleCountArea = (e: any, setFieldValue: any) => {
    const value = e.target.value;
    setAreaCount(value);
    setProductDescription(e.target.value);
    setFieldValue("description", value);
  };

  const handleCategoryChange = (e: any, setFieldValue: any) => {
    setSelectedCategory(e.target.value);
    setProductCategories(e.target.value);
    setFieldValue("categories", e.target.value);
  };

  const filteredSubCategories =
    dataSubCategories &&
    dataSubCategories.filter((sub: any) => {
      return sub.categories === selectedCategory;
    });

  const handleChangePrice = (e: any, setFieldValue: any, values: any) => {
    const price = e.target.value;
    setProductPrice(Number(price));
    setFieldValue("price", Number(price));

    const discount = values.discount;

    const discountedPrice = Math.round(price - (price * discount) / 100);

    setProductDiscountedPrice(discountedPrice);
    setFieldValue("discountedPrice", discountedPrice);
  };

  function formatCurrencyVND(amount: any) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  const handleChangeDiscount = (e: any, setFieldValue: any, values: any) => {
    const discount = e.target.value;
    setProductDiscount(Number(discount));
    setFieldValue("discount", Number(discount));

    const price = values.price;

    const discountedPrice = Math.round(price - (price * discount) / 100);

    setProductDiscountedPrice(discountedPrice);
    setFieldValue("discountedPrice", discountedPrice);
  };

  const clearString = (value: any) => {
    return value.replace(/\s\s+/g, " ").toLowerCase().trim();
  };

  const handleColorChange = (selected: any, setFieldValue: any) => {
    setSelectedColors(selected);
    setFieldValue("colors", selected);
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

    formData.append("id", product._id || params.productId);
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
      formData.append("files", data.files || data.public_id);
    });

    setSubmitting(true);
    toast.promise(
      fetch(`/api/admin/product`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitting(false);
          if (data.status == 200) {
            getProductsId();
            return data.message;
          }
          if (data.status == 400 || data.status == 500) {
            throw new Error(data.message);
          }
        }),
      {
        loading: <div className="text-text text-[1.6em]">Update...</div>,
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
    );
  };

  return (
    <>
      {loading && <Loading />}
      <div>
        {product && (
          <TitlePageAmin
            title={`Edit Product - ${product.name}`}
            styleCustom="!mb-[0]"
          />
        )}
      </div>
      <div className="flex flex-col max-w-[700px]">
        <div>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
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
                  <SubLabel title="Choose minimum 1, maximum 6 picture - File not exceeds 2MB - Supported type(.png, .jpeg, .jpg)" />
                  <div className="flex flex-col">
                    <div className="flex flex-wrap xsm:gap-x-[20px] sm:gap-x-[14px]   xsm:gap-y-[16px] sm:gap-y-[16px] xsm:justify-center border-[1px] bg-white border-solid border-[#ABAEB1] p-[10px] rounded-[16px]">
                      {images?.map((data: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="!relative inline-block group overflow-hidden rounded-[16px]"
                          >
                            <Image
                              src={data.url}
                              alt={`Uploaded ${index}`}
                              className="object-cover object-top !h-[100px] !w-[100px] !relative"
                              fill
                              sizes="(max-width: 100px) 100vw"
                              priority
                            />
                            <div className="absolute justify-center items-center top-[0] left-[0] w-full h-full group-hover:flex hidden bg-[rgba(0,0,0,0.4)]">
                              <IconDelete
                                onClick={() =>
                                  handleRemoveImage(index, setFieldValue)
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                      {images?.length < 6 && (
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
                    value={values.name}
                    onChange={(e: any) => {
                      setProductName(e.target.value);
                      setFieldValue("name", e.target.value);
                    }}
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
                    value={values.subName}
                    onChange={(e: any) => {
                      setProductSubName(e.target.value);
                      setFieldValue("subName", e.target.value);
                    }}
                  />
                  <ErrorInput name="subName" />
                </div>
                <div>
                  <LabelInput name="description" styleCustom="!mb-[0]" />
                  <SubLabel title="Product name must not exceed 1000 characters." />
                  <Field
                    value={values.description}
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
                      value={values.categories}
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
                      value={values.sub_categories}
                      onChange={(e: any) => {
                        setProductSubCategories(e.target.value);
                        setFieldValue("sub_categories", e.target.value);
                      }}
                      as="select"
                      name="sub_categories"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                    >
                      <option value="" label="Select sub_categories" />
                      {selectedCategory &&
                        filteredSubCategories?.map((category: any) =>
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
                      value={values.sexs}
                      onChange={(e: any) => {
                        setProductSexs(e.target.value);
                        setFieldValue("sexs", e.target.value);
                      }}
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
                    value={values.price}
                    className="!border-[#ABAEB1] xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-button border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                  />
                  <ErrorInput name="price" />
                </div>
                <div className="flex gap-x-[20px] xsm:flex-col xsm:gap-y-[16px]">
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
                        value={values.discount}
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
                      className="!border-[#ABAEB1] select-none cursor-not-allowed opacity-50  xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      readOnly={true}
                      value={values.discountedPrice}
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
                            ?.sort(
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
      <LoadingModal
        title={dataLoading}
        loading={loadingStatus}
        resultModal={resultModal}
        styleCustom="max-w-[300px]"
      />
      {overlay && (
        <div className="fixed top-[0] bottom-[0] left-[0] right-[0] backdrop-blur-sm"></div>
      )}
    </>
  );
};

const FieldInput = (props: any) => {
  const { type, name, styleCustom, placeholder, refer, onChange, value } =
    props;
  return (
    <Field
      onChange={onChange}
      type={type}
      name={name}
      id={name}
      value={value}
      placeholder={placeholder}
      innerRef={refer}
      className={`${styleCustom} xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-button border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out`}
    />
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

export default ProductDetail;
