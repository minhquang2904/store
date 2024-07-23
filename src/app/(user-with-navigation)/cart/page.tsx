"use client";

import NoItemCart from "@/app/components/noItemCart/noItemCart";
import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import Image from "next/image";
import { useCartContext } from "@/app/context/CartContext";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorInput from "@/app/components/errorInput/errorInput";
import { Modal, ModalOverlay, ModalContent, filter } from "@chakra-ui/react";
import BtnAccount from "@/app/components/btnAccount/btnAccount";
import FieldInput from "@/app/components/fieldInput/fieldInput";
import LabelInput from "@/app/components/labelInput/labelInput";
import style from "./cart.module.scss";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import Loading from "../loading";
import toast from "react-hot-toast";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import { useRouter } from "next/navigation";
import { useRecommendContext } from "@/app/context/RecommedContext";
import { FormatCurrencyVND } from "@/app/config/formatCurrencyVND";

const order = ["s", "m", "l", "xl", "xxl"];

const TitleTable = (props: any) => {
  const { title } = props;
  return (
    <th className="w-full p-[10px] text-text text-[1.6em] text-start capitalize">
      {title}
    </th>
  );
};
const Cart = () => {
  const { cart, triggerFetchCart, loadingCart } = useCartContext();
  const { user } = useAuthContext();
  const { recommend, fetchDataRecommend, setRecommend } = useRecommendContext();

  const [modalAddAddress, setModalAddAddress] = useState(false);
  const [modalConfirmOrder, setModalConfirmOrder] = useState(false);
  const [area, setArea] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [dataModalConfirm, setDataModalConfirm] = useState(null) as any;

  const handleCloseModalAddAddress = () => setModalAddAddress(false);
  const handleShowModalAddAddress = () => setModalAddAddress(true);
  const handleCloseModalConfirmOrder = () => setModalConfirmOrder(false);

  const payMentMethod = ["cash delivery"];

  const handleDeleteCartItem = (id: any) => {
    try {
      fetch(`/api/product/cart?id=${id}&userId=${cart?.userId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          const { message, status } = result;
          if (status === 200) {
            toast.success(message);
            triggerFetchCart();
            fetchDataRecommend();
          }
          if (status === 500) {
            toast.error(message);
          }
        });
    } catch (error) {
      console.error("There was a problem with deleting the cart item:", error);
    }
  };

  const initialValues = {
    address: "",
    payment: "",
  };

  const orderSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    payment: Yup.string().required("Payment is required"),
  });

  const handleSubmit = (value: any, setSubmitting: any, resetForm: any) => {
    setDataModalConfirm({ value, resetForm });
    setModalConfirmOrder(true);
    setSubmitting(false);
  };

  const [selectedColors, setSelectedColors] = useState(
    Array(recommend?.length).fill("")
  );
  const [selectedSizes, setSelectedSizes] = useState(() =>
    Array(recommend?.length).fill("")
  );

  const [amountCheck, setAmountCheck] = useState(() =>
    Array(recommend?.length).fill("")
  );

  const handleChooseColorForItem = (
    color: any,
    itemIndex: any,
    setFieldValue: any
  ) => {
    setSelectedColors((prevColors) => {
      const newSelectedColors = [...prevColors];
      newSelectedColors[itemIndex] = color;
      return newSelectedColors;
    });

    setSelectedSizes((prevSizes) => {
      const newSelectedSizes = [...prevSizes];
      newSelectedSizes[itemIndex] = "";
      return newSelectedSizes;
    });

    amountCheck[itemIndex] = "";
    setFieldValue("size", "");
    setFieldValue("color", color);
  };

  const handleChooseSizeForItem = (
    size: any,
    itemIndex: any,
    setFieldValue: any
  ) => {
    setSelectedSizes((prevSizes) => {
      const newSelectedSizes = [...prevSizes];
      newSelectedSizes[itemIndex] = size;
      return newSelectedSizes;
    });

    const filterAmount = recommend[itemIndex].sizes.filter((item: any) => {
      return item.size === size && item.color === selectedColors[itemIndex];
    });

    setAmountCheck((prevSizes) => {
      const newAmount = [...prevSizes];
      newAmount[itemIndex] = filterAmount[0].amount;
      return newAmount;
    });

    setFieldValue("size", size);
  };

  const handleUpdateAmount = (value: any, setFieldValue: any) => {
    setFieldValue("amount", Number(value));
  };

  const getFilteredSizes = (item: any, itemIndex: any) => {
    return item.sizes
      ?.filter((sizeItem: any) => sizeItem.color === selectedColors[itemIndex])
      ?.sort((a: any, b: any) => order.indexOf(a.size) - order.indexOf(b.size));
  };

  const handleSubmitColorSize = (
    values: any,
    item: any,
    itemIndex: any,
    setSubmitting: any,
    resetForm: any
  ) => {
    if (values.amount > amountCheck[itemIndex]) {
      toast.error("The product is out of stock");
      setSubmitting(false);
      return;
    }
    try {
      fetch("/api/product/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: item._id.$oid,
          size: values.size,
          quantity: values.amount,
          color: values.color,
          price: item.discountedPrice,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const status = result.status;
          if (status === 200) {
            setRecommend(
              recommend.filter((value: any) => {
                return value._id.$oid !== item._id.$oid;
              })
            );
            selectedColors[itemIndex] = "";
            selectedSizes[itemIndex] = "";
            fetchDataRecommend();
            resetForm();
            triggerFetchCart();
            toast.success(
              <div>
                <span>Product added to cart</span> - {""}
                <Link href={"/cart"} className="underline">
                  CheckOut
                </Link>
              </div>,
              { duration: 3000 }
            );
          }
          if (status === 400) {
            setSubmitting(false);
            toast.error(result.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          <h1 className="sm:text-[3.2em] xsm:text-[2.8em] font-medium capitalize text-text mb-[30px]">
            Checkout
          </h1>
          <div
            className="flex"
            style={!cart ? { justifyContent: "center" } : {}}
          >
            {!cart ? (
              <>
                {!loadingCart && (
                  <NoItemCart className="max-w-[160px]" title="No product" />
                )}
              </>
            ) : (
              <div className="flex xsm:flex-col sm:flex-col l:flex-row xsm:w-full sm:w-full">
                <div className="shrink grow-0 l:basis-[70%] h-full">
                  <div className="xsm:overflow-x-scroll xsm:overflow-y-hidden">
                    <table>
                      <tbody>
                        <tr>
                          <TitleTable title="product" />
                          <TitleTable title="price" />
                          <TitleTable title="quantity" />
                          <TitleTable title="subtotal" />
                          <TitleTable title="action" />
                        </tr>
                        {cart?.items
                          ?.slice()
                          ?.reverse()
                          ?.map((item: any) => {
                            return (
                              <tr
                                key={`${item._id} - ${item.productId._id}`}
                                className={`${
                                  loadingCart ? "animate-pulse" : ""
                                }`}
                              >
                                <td className="w-full min-w-[320px] p-[10px] flex">
                                  <div className="!relative">
                                    <Image
                                      src={item.productId.files[0].url}
                                      className="!relative max-w-[100px] max-h-[100px] object-cover"
                                      alt="Item"
                                      fill
                                      sizes="(max-width: 100px) 100vw"
                                    />
                                  </div>
                                  <div className="ml-[20px] flex flex-col justify-center">
                                    <Link
                                      href={{
                                        pathname: "/productDetail",
                                        query: { id: item?.productId._id },
                                      }}
                                      className="text-text text-[1.6em] font-bold capitalize overflow-hidden max-w-[400px] line-clamp-1"
                                    >
                                      {item.productId.name}
                                    </Link>
                                    <div className="flex gap-x-[6px]">
                                      <p className="text-[1.5em] text-text font-normal">
                                        Size:
                                      </p>
                                      <p className="text-[1.5em] text-text font-medium uppercase">
                                        {item.size} - {item.color}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="w-full p-[10px] whitespace-nowrap text-text text-[1.6em] text-start">
                                  {FormatCurrencyVND(item?.price)}{" "}
                                  <span>đ</span>
                                </td>
                                <td className="w-full p-[10px] text-text text-[1.6em] !text-center">
                                  {item?.quantity}
                                </td>
                                <td className="w-full p-[10px] whitespace-nowrap text-text text-[1.6em] text-start">
                                  {FormatCurrencyVND(item?.totalPriceItem)}{" "}
                                  <span>đ</span>
                                </td>
                                <td className="w-full p-[10px]">
                                  <div
                                    className="flex justify-center"
                                    onClick={() =>
                                      handleDeleteCartItem(item._id)
                                    }
                                  >
                                    <svg
                                      fill="none"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="cursor-pointer"
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
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <>
                    {recommend?.length > 0 && (
                      <div className="mt-[16px] mb-[16px] pt-[26px] text-text text-[1.6em] font-medium uppercase border-t-[1px] border-border">
                        Popular products
                      </div>
                    )}
                    {recommend?.length > 0 && (
                      <div className="flex flex-col sm:gap-y-[46px] xsm:gap-y-[20px]">
                        {recommend.map((item: any, itemIndex: any) => {
                          return (
                            <div key={item._id.$oid}>
                              <Formik
                                initialValues={{
                                  color: "",
                                  size: "",
                                  amount: 1,
                                }}
                                validationSchema={Yup.object().shape({
                                  color: Yup.string().required(
                                    "- Color is required"
                                  ),
                                  size: Yup.string().required(
                                    "- Size is required"
                                  ),
                                  amount: Yup.number()
                                    .required("Amount is required")
                                    .min(
                                      1,
                                      "The minimum quantity of products is 1"
                                    ),
                                })}
                                onSubmit={(
                                  values,
                                  { setSubmitting, resetForm }
                                ) =>
                                  handleSubmitColorSize(
                                    values,
                                    item,
                                    itemIndex,
                                    setSubmitting,
                                    resetForm
                                  )
                                }
                              >
                                {({ isSubmitting, setFieldValue, values }) => (
                                  <Form className="flex xsm:flex-col">
                                    <div className="w-[40%] xsm:w-[100%] flex items-center xsm:flex-col xsm:mb-[16px]">
                                      <Link
                                        href={`/productDetail?id=${item._id.$oid}`}
                                        className="!relative"
                                      >
                                        <Image
                                          src={item.files[0].url}
                                          className="!relative max-w-[300px] max-h-[300px] object-cover"
                                          alt="Item"
                                          fill
                                          sizes="(max-width: 200px) 200px"
                                        />
                                      </Link>
                                    </div>
                                    <div className="w-[60%] xsm:w-[100%] sm:ml-[16px]">
                                      <div className="flex justify-between xsm:flex-col">
                                        <h1 className="text-text font-medium text-[1.8em] capitalize">
                                          {item.name}
                                        </h1>
                                      </div>
                                      <div className="flex mt-[8px] gap-x-[6px] items-center">
                                        {item?.discount > 0 && (
                                          <h4 className="text-button font-semibold text-[1.6em] line-through">
                                            {FormatCurrencyVND(item?.price)}{" "}
                                            <span>đ</span>
                                          </h4>
                                        )}
                                        <h4 className="text-secondary font-semibold text-[1.8em]">
                                          {FormatCurrencyVND(
                                            item?.discountedPrice
                                          )}{" "}
                                          <span className="text-text">đ</span>
                                        </h4>
                                      </div>
                                      <div className="mt-[8px]">
                                        <div className="flex">
                                          <SubTitleProductDetail title="Color" />
                                          <ErrorInput
                                            name="color"
                                            styleCustom="!mt-[0] text-[1.6em] ml-[8px]"
                                          />
                                        </div>
                                        <div className="mt-[8px] flex flex-wrap gap-y-[8px]">
                                          {item?.colors?.map(
                                            (colorItem: any, index: any) => {
                                              return (
                                                <div
                                                  key={
                                                    colorItem?.value +
                                                    index +
                                                    itemIndex
                                                  }
                                                  className="mb-[8px]"
                                                >
                                                  <label
                                                    htmlFor={`item_${itemIndex}_${colorItem?.value}`}
                                                    className={`mr-[20px] ${
                                                      selectedColors[
                                                        itemIndex
                                                      ] === colorItem?.value
                                                        ? "text-[#000]"
                                                        : "text-[#858388]"
                                                    } cursor-pointer rounded-[20px] flex justify-center items-center capitalize text-[1.6em] select-none font-semibold`}
                                                  >
                                                    {colorItem?.value}
                                                  </label>
                                                  <Field
                                                    type="radio"
                                                    name="color"
                                                    id={`item_${itemIndex}_${colorItem?.value}`}
                                                    className="hidden"
                                                    value={colorItem?.value}
                                                    onChange={(e: any) =>
                                                      handleChooseColorForItem(
                                                        e.target.value,
                                                        itemIndex,
                                                        setFieldValue
                                                      )
                                                    }
                                                  />
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                      <div className="mt-[8px]">
                                        <div className="flex">
                                          <SubTitleProductDetail title="Size" />
                                          {amountCheck[itemIndex] ? (
                                            <div className="text-[1.6em] ml-[4px]">
                                              - {amountCheck[itemIndex]}
                                            </div>
                                          ) : (
                                            <ErrorInput
                                              name="size"
                                              styleCustom="!mt-[0] text-[1.6em] ml-[8px]"
                                            />
                                          )}
                                        </div>
                                        <div className="flex mt-[8px] flex-wrap gap-y-[8px]">
                                          {selectedColors[itemIndex] ? (
                                            <>
                                              {getFilteredSizes(item, itemIndex)
                                                .filter(
                                                  (value: any) =>
                                                    value.amount > 0
                                                )
                                                .map((sizeItem: any) => {
                                                  return (
                                                    <div
                                                      key={sizeItem._id.$oid}
                                                      className="mb-[8px]"
                                                    >
                                                      <label
                                                        htmlFor={`item_${itemIndex}_${sizeItem.size}`}
                                                        className={`mr-[20px] ${
                                                          selectedSizes[
                                                            itemIndex
                                                          ] == sizeItem?.size
                                                            ? "text-[#000]"
                                                            : "text-[#727074]"
                                                        } cursor-pointer rounded-[20px] flex justify-center items-center font-semibold uppercase text-[1.6em] select-none`}
                                                      >
                                                        {sizeItem?.size}
                                                      </label>
                                                      <Field
                                                        type="radio"
                                                        name="size"
                                                        id={`item_${itemIndex}_${sizeItem.size}`}
                                                        className="hidden"
                                                        value={sizeItem?.size}
                                                        onChange={(e: any) =>
                                                          handleChooseSizeForItem(
                                                            e.target.value,
                                                            itemIndex,
                                                            setFieldValue
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  );
                                                })}
                                            </>
                                          ) : (
                                            <div className="text-text text-[1.6em] font-normal py-[4px]">
                                              Please select a color to display
                                              the available sizes.
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <div className="mt-[16px] flex mb-[8px]">
                                        {item?.quantity !== 0 && (
                                          <div className="mr-[16px] h-full">
                                            <div className="inline-flex justify-around !relative items-center border-[1px] border-solid border-button py-[4px] px-[8px] rounded-[26px] min-w-[106px]">
                                              <Image
                                                src="/icons/subtract.svg"
                                                className="!relative !w-[20px] !h-[20px] cursor-pointer"
                                                alt="Icon"
                                                fill
                                                sizes="100vw"
                                                priority
                                                onClick={() => {
                                                  if (values.amount > 0) {
                                                    setFieldValue(
                                                      "amount",
                                                      values.amount - 1
                                                    );
                                                  }
                                                }}
                                              />
                                              <Field
                                                type="number"
                                                name={`item_${itemIndex}_amount`}
                                                value={values.amount}
                                                onChange={(e: any) =>
                                                  handleUpdateAmount(
                                                    e.target.value,
                                                    setFieldValue
                                                  )
                                                }
                                                className={`text-text outline-none px-[6px] py-[2px] text-[1.6em] max-w-[40px] font-medium text-center bg-[transparent]`}
                                              />
                                              <Image
                                                src="/icons/plus.svg"
                                                className="!relative !w-[20px] !h-[20px] cursor-pointer"
                                                alt="Icon"
                                                fill
                                                sizes="100vw"
                                                priority
                                                onClick={() => {
                                                  setFieldValue(
                                                    "amount",
                                                    values.amount + 1
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        )}
                                        <div className="flex xsm:w-[100%] w-[40%] gap-x-[16px]">
                                          <div className="flex items-center w-full rounded-[26px] hover:opacity-90 cursor-pointer duration-200  h-full overflow-hidden">
                                            <button
                                              className="text-center w-full text-[1.4em] h-full text-white bg-button cursor-pointer"
                                              type="submit"
                                              disabled={isSubmitting}
                                            >
                                              Add to Cart
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <ErrorInput
                                        name="amount"
                                        styleCustom="!mt-[0] text-[1.6em] ml-[8px]"
                                      />
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={orderSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    handleSubmit(values, setSubmitting, resetForm);
                  }}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <div className="shrink grow-0 l:basis-[30%] l:mt-[10px] xsm:mt-[40px] sm:mt-[40px] l:ml-[80px]">
                      <Form className="flex flex-col gap-y-[32px]">
                        <div>
                          <div className="flex items-center justify-between mb-[16px]">
                            <TitleCheckOut title="Shipping Address" />
                            <div
                              className="cursor-pointer p-[6px] bg-hover1 rounded-[50%] hover:opacity-80"
                              onClick={handleShowModalAddAddress}
                            >
                              <svg
                                width="18"
                                height="18"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 12H12M18 12H12M12 12V6M12 12V18"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <div className="relative">
                              <Field
                                as="select"
                                name="address"
                                className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium py-[16px] pl-[16px] pr-[38px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                              >
                                <option value="" label="Select address" />
                                {user?.delivery_list?.map((option: any) => {
                                  return (
                                    <option
                                      key={option._id}
                                      value={JSON.stringify({
                                        id: option._id,
                                        addressFull: option.addressFull,
                                        phone: option.phone,
                                        city: option.city,
                                        district: option.district,
                                        ward: option.ward,
                                        street: option.street,
                                        lastName: option.lastName,
                                        firstName: option.firstName,
                                      })}
                                      className="capitalized"
                                    >
                                      {option.addressFull +
                                        " - " +
                                        option.phone}
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
                            <ErrorInput name="address" />
                          </div>
                        </div>
                        <div>
                          <div className="mb-[16px]">
                            <TitleCheckOut title="Payment Method" />
                          </div>
                          <div>
                            <div className="flex">
                              {payMentMethod.map((item: any) => {
                                return (
                                  <div key={item}>
                                    <label
                                      htmlFor={item}
                                      className={` ${
                                        values?.payment == item
                                          ? "bg-button text-white"
                                          : "bg-[transparent] text-text"
                                      } mr-[8px] min-w-[70px] h-[40px] px-[14px] cursor-pointer rounded-[20px] flex justify-center items-center capitalize border-solid border-[1px] border-[#727074] text-[1.5em] select-none`}
                                    >
                                      {item}
                                    </label>
                                    <Field
                                      type="radio"
                                      id={item}
                                      name="payment"
                                      className="hidden"
                                      value={item}
                                      onChange={(e: any) => {
                                        setFieldValue(
                                          "payment",
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>

                            <ErrorInput name="payment" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[1.6em]">
                            <h1 className="text-text capitalize font-bold">
                              Grand Total
                            </h1>
                            <h3 className="font-bold text-text">
                              {FormatCurrencyVND(cart?.totalPrice)}{" "}
                              <span>đ</span>
                            </h3>
                          </div>
                          <button
                            type="submit"
                            className="mt-[10px] text-[1.4em] text-white bg-button w-full p-[14px] rounded-[10px] hover:opacity-90"
                          >
                            Review Order
                          </button>
                        </div>
                      </Form>
                    </div>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalAddAddress && (
        <ModalAdd
          isOpen={modalAddAddress}
          onClose={handleCloseModalAddAddress}
          setLoading={setLoading}
          area={area}
          setArea={setArea}
        />
      )}
      {modalConfirmOrder && (
        <ModalConfirmOrder
          isOpen={modalConfirmOrder}
          onClose={handleCloseModalConfirmOrder}
          data={dataModalConfirm}
          handleDeleteCartItem={handleDeleteCartItem}
        />
      )}
      {loading && <LoadingComponent styleCustom="!min-h-[300px]" />}
      {loading && <Loading />}
    </>
  );
};

const ModalConfirmOrder = (props: any) => {
  const { isOpen, onClose, data, handleDeleteCartItem } = props;
  const [seeMore, setSeeMore] = useState(false);
  const { value, resetForm } = data;
  const { address, payment } = value;
  const jsonParse = JSON.parse(address);
  const [btnSubmit, setBtnSubmit] = useState(false) as any;
  const { push } = useRouter();
  const { user } = useAuthContext();
  const { cart, triggerFetchCart } = useCartContext();
  const { fetchDataRecommend } = useRecommendContext();

  useEffect(() => {
    if (!cart) {
      onClose();
    }
  }, [cart]);

  const handleConfirmOrder = () => {
    setBtnSubmit(true);

    toast.promise(
      fetch("/api/product/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          address: jsonParse,
          payment: payment,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setBtnSubmit(false);
          const { message, status } = result;
          if (status === 200) {
            triggerFetchCart();
            fetchDataRecommend();
            resetForm();
            onClose();
            return message;
          }
          if (status === 500) {
            throw new Error(JSON.stringify(message));
          }
        }),
      {
        loading: <div className="text-text text-[1.6em]">Order...</div>,
        success: (message) => (
          <div>
            <span>{message} - </span>
            <span
              onClick={() => push("/profile/listsOrder")}
              className="underline cursor-pointer"
            >
              See Order
            </span>
          </div>
        ),
        error: (data) => {
          const message = JSON.parse(data.message);
          return (
            <div>
              Product{" "}
              <span
                onClick={() => push(`/productDetail/${message.errorId}`)}
                className="text-secondary underline capitalize cursor-pointer"
              >
                {message.errorName}
              </span>{" "}
              does not have enough inventory for size{" "}
              <span className="text-secondary uppercase">
                {message.errorSize}
              </span>{" "}
              and color{" "}
              <span className="text-secondary uppercase">
                {message.errorColor}
              </span>{" "}
              - Quantity{" "}
              <span className="text-secondary uppercase">
                {message.errorQuantity}
              </span>
            </div>
          );
        },
      },
      { duration: 4000 }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px 2px 10px 2px"}
        margin={"auto 15px auto 15px"}
        background={"#F3F4F4"}
        className="xsm:!max-w-[400px] xsm:!max-h-[600px] max-h-[800px]"
      >
        <div className="xsm:px-[16px] px-[12px] py-[10px]">
          <h1 className="text-text text-[2em] font-medium">Review Order</h1>
          <div
            className={`mt-[20px] overflow-y-auto xsm:max-h-[400px] max-h-[600px] pr-[12px] ${style.tableScroll}`}
          >
            <div>
              <div>
                <TitleCheckOut
                  title={`There are ${cart?.items?.length} products in total`}
                />
                <ul
                  className={`${
                    seeMore ? "max-h-[100%]" : "max-h-[357px]"
                  } overflow-hidden`}
                >
                  {cart && (
                    <>
                      {cart?.items
                        ?.slice()
                        ?.reverse()
                        ?.map((item: any) => {
                          return (
                            <div
                              key={`${item._id} - ${item.productId._id}`}
                              className="py-[12px] !relative flex"
                            >
                              <Image
                                src={
                                  item.productId.files[0].url ||
                                  "/images/no-image.png"
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
                                    {item.quantity} x{" "}
                                    {FormatCurrencyVND(item.price)}{" "}
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
                                  <div
                                    className="flex justify-center"
                                    onClick={() =>
                                      handleDeleteCartItem(item._id)
                                    }
                                  >
                                    <svg
                                      fill="none"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="cursor-pointer"
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </ul>
                {cart?.items?.length > 3 && (
                  <div className="text-center">
                    <div
                      className="group select-none hover:bg-button text-center mt-[16px] cursor-pointer text-text text-[1.3em] font-medium inline-flex items-center seeMoreBtn border-[1px] border-solid border-button px-[16px] py-[4px] rounded-[16px]"
                      onClick={() => setSeeMore(!seeMore)}
                    >
                      <h1 className="mr-[8px] uppercase group-hover:text-white">
                        See more
                      </h1>
                      <svg
                        fill="none"
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${seeMore && "rotate-180"}`}
                      >
                        <path
                          d="m4 8 8 8 8-8"
                          className="stroke-[#131118] group-hover:stroke-white"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="my-[30px]">
                <TitleCheckOut title="Shipping Address" />
                <div className="text-text text-[1.5em] font-normal mt-[4px]">
                  {jsonParse.addressFull}
                </div>
              </div>
              <div>
                <TitleCheckOut title="Payment Method" />
                <div className="text-text text-[1.5em] font-normal mt-[4px] capitalize">
                  {payment}
                </div>
              </div>
            </div>
          </div>
          <div className="xsm:pt-[30px] pt-[40px] mb-[16px] flex justify-between">
            <h1 className="text-secondary capitalize font-bold text-[1.6em]">
              Grand Total
            </h1>
            <h1 className="text-secondary capitalize font-bold text-[1.6em]">
              {FormatCurrencyVND(cart?.totalPrice)}{" "}
              <span className="text-text lowercase">đ</span>
            </h1>
          </div>
          <div className="flex justify-between gap-x-[10px] mb-[10px]">
            <ButtonModal
              onClick={onClose}
              title="Cancel"
              styleCustom="border-button bg-white !w-[50%]"
            />
            <BtnAccount
              styleCustom="!mt-[0] !px-[20px] !py-[8px] !border-button !rounded-[12px] !w-[50%]"
              onClick={handleConfirmOrder}
              title={btnSubmit ? "Place order..." : "Place order"}
              disabled={btnSubmit}
            />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

const ModalAdd = (props: any) => {
  const { isOpen, onClose, area, setLoading, setArea } = props;

  const [city, setCity] = useState([]) as any;
  const [district, setDistrict] = useState([]) as any;
  const formData = new FormData();
  const { user, triggerFetch } = useAuthContext();

  const updateCityAndDistrict = (
    area: any[],
    user: any,
    setCity: (city: any) => void,
    setDistrict: (district: any) => void
  ) => {
    if (!area || !user || !user.address || !user.address[0]) {
      setCity([]);
      setDistrict([]);
      return;
    }
    const filteredCity = area.filter(
      (n: any) => n.Name === user.address[0].city
    );

    if (filteredCity.length > 0) {
      setCity(filteredCity[0].Districts);

      const filteredDistrict = filteredCity[0].Districts.filter(
        (n: any) => n.Name === user.address[0].district
      );

      setDistrict(filteredDistrict[0].Wards);
    } else {
      setCity([]);
      setDistrict([]);
    }
  };

  useEffect(() => {
    if (area && user) {
      updateCityAndDistrict(area, user, setCity, setDistrict);
    }
  }, [area, user]);

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    city: user?.address[0]?.city || "",
    district: user?.address[0]?.district || "",
    ward: user?.address[0]?.ward || "",
    street: user?.address[0]?.street || "",
  };

  const userSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .max(50, "The first name can only be a maximum of 50 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(50, "The last name can only be a maximum of 50 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Only number"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    ward: Yup.string().required("Ward is required"),
    street: Yup.string().required("Street is required"),
  });

  useEffect(() => {
    const fetchDataArea = async () => {
      setLoading(true);
      try {
        await fetch(process.env.AREA_URL!)
          .then((res) => res.json())
          .then((data) => {
            setArea(data);
            setLoading(false);
          });
      } catch (error: any) {
        console.log("Get area Failed!", error);
      }
    };
    if (!area) {
      fetchDataArea();
    }
  }, []);

  useEffect(() => {
    if (!city) {
      setDistrict([]);
    }
  }, [city]);

  const handleSubmit = (values: any, setSubmitting: any) => {
    formData.set("id", user.id);
    formData.set("firstName", values.firstName);
    formData.set("lastName", values.lastName);
    formData.set("phone", values.phone.toString());
    formData.set("city", values.city);
    formData.set("district", values.district);
    formData.set("ward", values.ward);
    formData.set("street", values.street);
    console.log(values);

    try {
      setSubmitting(true);
      fetch("/api/users/address", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          const status = result.status;
          if (status === 200) {
            triggerFetch();
            onClose();
          }
          if (status === 400) {
            console.log(result.message);
          }
          setSubmitting(false);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px 2px 10px 2px"}
        margin={"auto 15px auto 15px"}
        className="xsm:!max-w-[400px] xsm:!max-h-[600px] max-h-[800px]"
      >
        <div className="xsm:px-[16px] px-[24px] py-[10px]">
          <h1 className="text-text text-[2em] font-medium">Add address</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          validateOnChange={true}
          onSubmit={(values, { setSubmitting }) =>
            handleSubmit(values, setSubmitting)
          }
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-y-[16px] overflow-hidden xsm:px-[4px] px-[12px]">
              <div
                className={`flex flex-col gap-y-[20px] overflow-y-auto px-[12px] ${style.tableScroll}`}
              >
                <div className="flex justify-between gap-x-[20px] gap-y-[20px] xsm:flex-col">
                  <div className="sm:w-[50%] xsm:w-[100%]">
                    <LabelInput
                      name="First Name"
                      id="firstName"
                      styleCustom="!mb-[4px]"
                    />
                    <FieldInput
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      styleCustom="!border-[#ABAEB1]"
                    />
                    <ErrorInput name="firstName" />
                  </div>
                  <div className="sm:w-[50%] xsm:w-[100%]">
                    <LabelInput
                      name="Last Name"
                      id="lastName"
                      styleCustom="!mb-[4px]"
                    />
                    <FieldInput
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      styleCustom="!border-[#ABAEB1]"
                    />
                    <ErrorInput name="lastName" />
                  </div>
                </div>
                <div>
                  <LabelInput
                    name="Phone Number"
                    id="phone"
                    styleCustom="!mb-[4px]"
                  />
                  <FieldInput
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    styleCustom="!border-[#ABAEB1]"
                  />
                  <ErrorInput name="phone" />
                </div>
                <div>
                  <LabelInput name="city" styleCustom="!mb-[4px]" />
                  <div className="relative">
                    <Field
                      as="select"
                      name="city"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      onChange={(e: any) => {
                        const result = area.filter(
                          (n: any) => n.Name === e.target.value
                        );
                        setFieldValue("city", e.target.value);
                        setFieldValue("district", "");
                        setFieldValue("ward", "");
                        setDistrict([]);
                        setCity(result[0]?.Districts);
                      }}
                    >
                      <option value="" label="Select city" />
                      {area?.map((option: any) => {
                        return (
                          <option key={option.Id} value={option.Name}>
                            {option.Name}
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
                  <ErrorInput name="city" />
                </div>
                <div>
                  <LabelInput name="district" styleCustom="!mb-[4px]" />
                  <div className="relative">
                    <Field
                      as="select"
                      name="district"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      onChange={(e: any) => {
                        const result = city.filter(
                          (n: any) => n.Name === e.target.value
                        );
                        setFieldValue("district", e.target.value);
                        setFieldValue("ward", "");
                        setDistrict(result[0]?.Wards);
                      }}
                    >
                      <option value="" label="Select district" />
                      {city?.map((option: any) => {
                        return (
                          <option key={option.Id} value={option.Name}>
                            {option.Name}
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
                  <ErrorInput name="district" />
                </div>
                <div>
                  <LabelInput name="ward" styleCustom="!mb-[4px]" />
                  <div className="relative">
                    <Field
                      as="select"
                      name="ward"
                      className="xsm:text-subMobile appearance-none capitalize sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-[#ABAEB1] border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out"
                      onChange={(e: any) => {
                        setFieldValue("ward", e.target.value);
                      }}
                    >
                      <option value="" label="Select ward" />
                      {district?.map((option: any) => {
                        return (
                          <option key={option.Id} value={option.Name}>
                            {option.Name}
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
                  <ErrorInput name="ward" />
                </div>
                <div>
                  <LabelInput
                    name="Street Name, Building, House No."
                    id="street"
                    styleCustom="!mb-[4px]"
                  />
                  <FieldInput
                    type="text"
                    name="street"
                    placeholder="Street Name, Building, House No."
                    styleCustom="!border-[#ABAEB1]"
                  />
                  <ErrorInput name="street" />
                </div>
              </div>
              <div className="flex gap-x-[10px] justify-end mt-[16px] px-[12px]">
                <ButtonModal
                  onClick={onClose}
                  title="Cancel"
                  styleCustom="border-button bg-white max-w-[140px] w-full"
                />
                <BtnAccount
                  disabled={isSubmitting}
                  type="submit"
                  styleCustom="max-w-[140px] !mt-[0] !px-[20px] !py-[8px] !border-button !rounded-[12px]"
                />
              </div>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

const ButtonModal = (props: any) => {
  const { styleCustom, onClick, title } = props;
  return (
    <button
      onClick={onClick}
      className={`text-[1.6em] font-normal outline-none capitalize px-[20px] py-[8px] w-[120px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80`}
    >
      {title}
    </button>
  );
};

const SubTitleProductDetail = (props: any) => {
  const { title } = props;
  return (
    <h3 className="text-text capitalize font-semibold text-[1.6em]">{title}</h3>
  );
};

export default Cart;
