"use client";

import style from "./productDetail.module.scss";
import Image from "next/image";
import IconHeartSvg from "@/app/components/iconHeartSvg/iconHeartSvg";
import { useEffect, useRef, useState } from "react";
import { dataDescription } from "@/app/data";
import TitlePageNavigation from "@/app/components/titlePageNavigation/titlePageNavigation";
import RelatedProduct from "@/app/components/relatedProduct/relatedProduct";
import { getProduct } from "@/app/lib/getProduct";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorInput from "@/app/components/errorInput/errorInput";
import { useAuthContext } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { useCartContext } from "@/app/context/CartContext";
import NoItemCart from "@/app/components/noItemCart/noItemCart";
import { useRouter } from "next/navigation";
import { useRecommendContext } from "@/app/context/RecommedContext";
import { FormatCurrencyVND } from "@/app/config/formatCurrencyVND";
const order = ["s", "m", "l", "xl", "xxl"];

const SubTitleProductDetail = (props: any) => {
  const { title } = props;
  return (
    <h3 className="text-text capitalize font-semibold text-[1.6em]">{title}</h3>
  );
};

export default function ProductDetail({ searchParams }: any) {
  const { triggerFetchCart } = useCartContext();
  const { user } = useAuthContext();
  const id = searchParams.id;
  const { push } = useRouter();
  const { fetchDataRecommend, related } = useRecommendContext();

  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null) as any;
  const navDescription = dataDescription[0].description;
  const navAddInformation = dataDescription[1].addInformation;
  const [product, setProduct] = useState(null) as any;
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null) as any;
  const [filterSize, setFilterSize] = useState(null) as any;
  const [selectedSize, setSelectedSize] = useState(null) as any;
  const [showAmount, setShowAmount] = useState(null) as any;
  const [errorAmount, setErrorAmount] = useState(null) as any;
  const [like, setLike] = useState(false) as any;
  const [relatedProduct, setRelatedProduct] = useState(null) as any;
  const [fetchLikeAgain, setFetchLikeAgain] = useState(false) as any;
  const formikRef = useRef(null) as any;

  const triggerFetchLike = () => setFetchLikeAgain(true);

  const handleChangeDescription = (e: any) => {
    const id = e.target.id;
    id == "description" && setDescription(navDescription || "");
    id == "add-information" && setDescription(navAddInformation || "");

    document
      .querySelector(".activeTabDetail")
      ?.classList.remove("activeTabDetail");
    e.target.classList.add("activeTabDetail");
  };

  const handleActivePicture = (url: any) => {
    setPicture(url);
  };

  useEffect(() => {
    setDescription(navDescription || "");
  }, []);

  const getData = async () => {
    setLoadingProducts(true);
    const data = await getProduct(id, setLoadingProducts);
    setRelatedProduct(data.related);
    setProduct(data.data);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleChooseSize = (value: any, setFieldValue: any) => {
    const filterAmount = filterSize?.filter((item: any) => {
      return value == item.size && selectedColor == item.color;
    });
    setShowAmount(filterAmount[0].amount);
    setSelectedSize(value);
    setErrorAmount(null);
    setFieldValue("size", value);
  };

  const handleChooseColor = (value: any, setFieldValue: any) => {
    const filterSize = product?.sizes?.filter(
      (size: any) => value == size.color
    );
    setFilterSize(filterSize);
    setSelectedColor(value);
    setSelectedSize(null);
    setShowAmount(null);
    setFieldValue("size", "");
    setErrorAmount(null);
    setFieldValue("color", value);
  };

  const getLike = async () => {
    try {
      const res = await fetch(`/api/product/like?id=${user?.id}`);
      const result = await res.json();
      const { data, status } = result;

      if (status === 200) {
        const likeCheck = data?.likes?.find((item: any) => {
          return item?.productId?._id === product?._id;
        });
        likeCheck ? setLike(true) : setLike(false);
      }
      if (status === 404) {
        setLike(false);
      }
      setFetchLikeAgain(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLike();
  }, [fetchLikeAgain, product]);

  const handleSubmitHeart = (id: any) => {
    try {
      fetch("/api/product/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: id,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((result: any) => {
          const { status, message } = result;
          if (status === 200) {
            toast.success(
              <div>
                <span>{message}</span> - {""}
                <span
                  onClick={() => push("/like")}
                  className="underline cursor-pointer"
                >
                  Wish Lists
                </span>
              </div>,
              { duration: 3000 }
            );
            triggerFetchLike();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateAmount = (value: any, setFieldValue: any) => {
    setErrorAmount(null);
    setFieldValue("amount", Number(value));
  };

  const initialValues = {
    color: "",
    size: "",
    amount: 1,
  };

  const CartSchema = Yup.object().shape({
    color: Yup.string().required("- Color is required"),
    size: Yup.string().required("- Size is required"),
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "The minimum quantity of products is 1"),
  });

  const handleSubmit = (values: any, setSubmitting: any, resetForm: any) => {
    if (values.amount > showAmount) {
      setErrorAmount("Amount is greater than the available quantity");
      setSubmitting(false);
      return;
    }
    setErrorAmount(null);
    setSubmitting(true);
    try {
      fetch("/api/product/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: product._id,
          size: values.size,
          quantity: values.amount,
          color: values.color,
          price: product.discountedPrice,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const status = result.status;
          if (status === 200) {
            toast.success(
              <div>
                <span>Product added to cart</span> - {""}
                <Link href={"/cart"} className="underline">
                  CheckOut
                </Link>
              </div>,
              { duration: 3000 }
            );
            fetchDataRecommend();
            resetForm();
            setSelectedColor(null);
            setSelectedSize(null);
            triggerFetchCart();
          }
          if (status === 400) {
            toast.error(result.message);
          }
          setSubmitting(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setPicture(product?.files[0]?.url);
    setSelectedColor(null);
    setSelectedSize(null);
    if (formikRef.current) {
      formikRef.current.resetForm({ values: initialValues });
    }
  }, [product]);

  const reduceAmount = filterSize?.reduce(
    (acc: any, item: any) => acc + item.amount,
    0
  );

  return (
    <>
      {loadingProducts && <LoadingComponent />}
      {product === undefined && (
        <div className="mt-[100px]">
          <NoItemCart
            className="max-w-[160px]"
            title="This product does not exist"
          />
        </div>
      )}
      {product && (
        <div className="flex justify-center items-center px-pLayout">
          <div className="l:mt-80 sm:mt-60 xsm:mt-40 w-full max-w-layout">
            <TitlePageNavigation />
            <div className="l:mt-[50px] sm:mt-[40px] xsm:mt-[30px] flex xsm:flex-col">
              <div className="flex flex-col items-center shrink grow-0 l:basis-2/4 sm:basis-[40%] xsm:basis-[100%]">
                <div className="!relative max-w-[400px] flex w-full">
                  <Image
                    src={
                      picture ||
                      product?.files[0]?.url ||
                      "/images/avatar-profile.png"
                    }
                    className="!relative w-full"
                    alt={`${product?.files[0]?.url}`}
                    fill
                    sizes="(max-width: 400px) 100vw"
                    loading="lazy"
                  />
                  <div className="absolute bottom-[28px] left-[50%] translate-x-[-50%] flex gap-x-[10px]">
                    {product?.files?.map((item: any) => {
                      return (
                        <div
                          key={item.url}
                          className={`w-[8px] h-[8px] rounded-[50%] cursor-pointer select-none bg-[#9b9797] ${
                            item.url == picture
                              ? "bg-[#2b302e]"
                              : "bg-[#aca7a7]"
                          }`}
                          onClick={() => handleActivePicture(item.url)}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex mt-[10px]">
                  {product?.files?.map((item: any) => {
                    return product?.files?.length > 1 ? (
                      <div
                        key={item.url}
                        className="!relative max-w-[110px] w-full cursor-pointer hover:opacity-80"
                        onClick={() => handleActivePicture(item.url)}
                      >
                        <Image
                          src={item.url}
                          className="w-full !relative"
                          alt={`Product ${item.id}`}
                          fill
                          sizes="(max-width: 200px) 100vw"
                        />
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>
              </div>
              <div className="shrink grow-0 l:basis-2/4 ml-[30px] xsm:ml-[0] xsm:mt-[40px] sm:basis-[60%] xsm:basis-[100%]">
                <div className="flex justify-between xsm:flex-col">
                  <h1 className="text-text font-medium text-[2.2em] capitalize">
                    {product?.name || "N/A"}
                  </h1>
                </div>
                <div className="mt-[8px] flex">
                  <h4 className="text-text font-normal text-[1.6em] capitalize pr-[15px] border-r-2">
                    {product?.categories || "N/A"}
                  </h4>
                  <div className="text-[1.6em] px-[15px] border-r-2">
                    Stock : {product?.quantity || 0}
                  </div>
                  <div className="text-[1.6em] px-[15px]">
                    Sold : {product?.soldCount || 0}
                  </div>
                </div>
                <div className="flex mt-[8px] gap-x-[6px] items-center">
                  {product?.discount > 0 && (
                    <h4 className="text-button font-semibold text-[1.6em] line-through">
                      {FormatCurrencyVND(product?.price)} <span>đ</span>
                    </h4>
                  )}
                  <h4 className="text-secondary font-semibold text-[2.2em]">
                    {FormatCurrencyVND(product?.discountedPrice)}{" "}
                    <span className="text-text">đ</span>
                  </h4>
                </div>
                <div className="mt-[16px]">
                  <p className="text-text font-normal text-[1.4em] line-clamp-4">
                    {product?.description || "N/A"}
                  </p>
                </div>
                <Formik
                  innerRef={formikRef}
                  initialValues={initialValues}
                  validationSchema={CartSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) =>
                    handleSubmit(values, setSubmitting, resetForm)
                  }
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="flex flex-col">
                      <div className="mt-[16px]">
                        <div className="flex">
                          <SubTitleProductDetail title="Color" />
                          <ErrorInput
                            name="color"
                            styleCustom="!mt-[0] text-[1.6em] ml-[8px]"
                          />
                        </div>
                        <div className="mt-[8px] flex flex-wrap gap-y-[8px]">
                          {product?.colors?.map((item: any, index: any) => {
                            return (
                              <div key={item?.value + index}>
                                <label
                                  htmlFor={item?.value}
                                  className={`mr-[8px] ${
                                    values?.color == item?.value
                                      ? "bg-button text-white"
                                      : "bg-[transparent] text-text"
                                  } min-w-[70px] h-[40px] px-[14px] cursor-pointer rounded-[20px] flex justify-center items-center capitalize border-solid border-[1px] border-[#727074] text-[1.5em] select-none`}
                                >
                                  {item?.value}
                                </label>
                                <Field
                                  type="radio"
                                  name="color"
                                  id={item?.value}
                                  className="hidden"
                                  value={item?.value}
                                  onChange={(e: any) =>
                                    handleChooseColor(
                                      e.target.value,
                                      setFieldValue
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-[16px]">
                        <div className="flex">
                          <SubTitleProductDetail title="Size" />
                          <ErrorInput
                            name="size"
                            styleCustom="!mt-[0] text-[1.6em] ml-[8px]"
                          />
                          {selectedSize && (
                            <div className="text-[1.6em] ml-[4px]">
                              - {showAmount}
                            </div>
                          )}
                        </div>
                        <div className="flex mt-[8px] flex-wrap gap-y-[8px]">
                          {selectedColor ? (
                            <>
                              {(product?.quantity === 0 ||
                                reduceAmount === 0) && (
                                <div className="text-text text-[1.6em] font-normal py-[8px]">
                                  Out of stock
                                </div>
                              )}
                              {filterSize
                                ?.sort(
                                  (a: any, b: any) =>
                                    order.indexOf(a.size) -
                                    order.indexOf(b.size)
                                )
                                ?.filter((item: any) => item.amount > 0)
                                ?.map((item: any, index: any) => {
                                  return (
                                    <div
                                      key={`${item._id}-${index}-${item.size}`}
                                    >
                                      <label
                                        htmlFor={`${item?.color} - ${item?.size}`}
                                        className={`mr-[8px] ${
                                          values?.size == item?.size
                                            ? "bg-button text-white"
                                            : "bg-[transparent] text-text"
                                        } w-[70px] h-[40px] cursor-pointer rounded-[20px] flex justify-center items-center uppercase border-solid border-[1px] border-[#727074] text-[1.5em] select-none`}
                                      >
                                        {item?.size}
                                      </label>
                                      <Field
                                        type="radio"
                                        name="size"
                                        id={`${item?.color} - ${item?.size}`}
                                        className="hidden"
                                        value={item?.size}
                                        onChange={(e: any) =>
                                          handleChooseSize(
                                            e.target.value,
                                            setFieldValue
                                          )
                                        }
                                      />
                                    </div>
                                  );
                                })}
                            </>
                          ) : (
                            <div className="text-text text-[1.6em] font-normal py-[8px]">
                              Please select a color to display the available
                              sizes.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-[28px] inline-flex">
                        {product?.quantity !== 0 && (
                          <div className="mr-[16px]">
                            <div className="inline-flex !relative items-center border-[1px] border-solid border-button py-[4px] px-[8px] rounded-[26px] min-w-[106px]">
                              <Image
                                src="/icons/subtract.svg"
                                className="!relative !w-[24px] !h-[24px] cursor-pointer"
                                alt="Icon"
                                fill
                                sizes="100vw"
                                priority={true}
                                onClick={() => {
                                  setErrorAmount(null);
                                  if (values.amount > 0) {
                                    setFieldValue("amount", values.amount - 1);
                                  }
                                }}
                              />
                              <Field
                                type="number"
                                name="amount"
                                value={values.amount}
                                onChange={(e: any) =>
                                  handleUpdateAmount(
                                    e.target.value,
                                    setFieldValue
                                  )
                                }
                                className={`text-text outline-none p-[6px] text-[1.6em] max-w-[40px] font-medium text-center ${style.inputOuterAndInner} bg-[transparent]`}
                              />
                              <Image
                                src="/icons/plus.svg"
                                className="!relative !w-[24px] !h-[24px] cursor-pointer"
                                alt="Icon"
                                fill
                                sizes="100vw"
                                priority={true}
                                onClick={() => {
                                  setErrorAmount(null);
                                  setFieldValue("amount", values.amount + 1);
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex w-full gap-x-[16px]">
                          <div className="w-[80%] flex items-center rounded-[26px] hover:opacity-90 cursor-pointer duration-200 h-[46px] overflow-hidden">
                            {user ? (
                              <>
                                {product?.quantity === 0 ? (
                                  <button
                                    className="text-center w-full text-[1.4em] text-text h-full !bg-[#ccc]"
                                    disabled={true}
                                  >
                                    Sold Out
                                  </button>
                                ) : (
                                  <button
                                    className="text-center w-full text-[1.4em] text-white h-full bg-button "
                                    type="submit"
                                    disabled={isSubmitting}
                                  >
                                    Add to Card
                                  </button>
                                )}
                              </>
                            ) : (
                              <Link
                                href="/login"
                                className={`text-center w-full text-[1.4em] h-full flex items-center justify-center ${
                                  product?.quantity === 0
                                    ? "!bg-[#ccc] text-text"
                                    : "text-white bg-button"
                                }`}
                              >
                                <h1>
                                  {product?.quantity === 0
                                    ? "Sold Out"
                                    : "Add to Card"}
                                </h1>
                              </Link>
                            )}
                          </div>
                          <div className="w-[20%]">
                            {!user ? (
                              <>
                                <Link
                                  href="/login"
                                  className="flex justify-center items-center w-[46px] h-[46px] border-[1px] border-solid border-button rounded-[50%] cursor-pointer"
                                >
                                  <IconHeartSvg
                                    className={`iconHeartSvg ${
                                      like ? "fill-secondary" : "fill-none"
                                    } cursor-pointer`}
                                  />
                                </Link>
                              </>
                            ) : (
                              <>
                                <div
                                  className="flex justify-center items-center w-[46px] h-[46px] border-[1px] border-solid border-button rounded-[50%] cursor-pointer"
                                  onClick={() => handleSubmitHeart(product._id)}
                                >
                                  <IconHeartSvg
                                    className={`iconHeartSvg ${
                                      like ? "fill-secondary" : "fill-none"
                                    } cursor-pointer`}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <ErrorInput
                          name="amount"
                          styleCustom="!mt-[8px] text-[1.6em] ml-[8px]"
                        />
                        {errorAmount && (
                          <div className="text-[1.6em] mt-[8px] ml-[8px] text-secondary font-medium capitalize">
                            {errorAmount}
                          </div>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="l:mt-[80px] sm:mt-[60px] xsm:mt-[40px]">
              <div className="flex font-medium mb-[20px] text-sub capitalize text-[2em]">
                <div
                  className="activeTabDetail [&.activeTabDetail]:before:absolute [&.activeTabDetail]:before:content-[''] [&.activeTabDetail]:before:w-full [&.activeTabDetail]:before:h-[4px] [&.activeTabDetail]:before:bottom-[0] [&.activeTabDetail]:before:bg-button [&.activeTabDetail]:before:rounded-[4px] [&.activeTabDetail]:text-text pb-[8px] mr-[16px] relative cursor-pointer hover:text-button"
                  onClick={handleChangeDescription}
                  id="description"
                >
                  description
                </div>
                <div
                  className="[&.activeTabDetail]:before:absolute [&.activeTabDetail]:before:content-[''] [&.activeTabDetail]:before:w-full [&.activeTabDetail]:before:h-[4px] [&.activeTabDetail]:before:bottom-[0] [&.activeTabDetail]:before:bg-button [&.activeTabDetail]:before:rounded-[4px] [&.activeTabDetail]:text-text pb-[8px] mr-[16px] relative cursor-pointer hover:text-button"
                  onClick={handleChangeDescription}
                  id="add-information"
                >
                  Add Information
                </div>
              </div>
              <div className="text-text">
                <p className="text-[1.4em] leading-5">{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {(relatedProduct || relatedProduct?.length > 0) && (
        <RelatedProduct
          styleCustom={{ textAlign: "left", marginBottom: "35px" }}
          data={relatedProduct}
        />
      )}
    </>
  );
}
