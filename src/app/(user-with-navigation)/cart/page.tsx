"use client";

import NoItemCart from "@/app/components/noItemCart/noItemCart";
import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import Image from "next/image";
import { useCartContext } from "@/app/context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { toastConfig } from "@/app/config/toaster";

const TitleTable = (props: any) => {
  const { title } = props;
  return (
    <th className="w-full p-[10px] text-text text-[1.6em] text-start capitalize">
      {title}
    </th>
  );
};
const Cart = () => {
  const { cart, triggerFetchCart } = useCartContext();

  const handleDeleteCartItem = async (id: any) => {
    console.log("Deleted", id);
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
          }
          if (status === 500) {
            toast.error(message);
          }
        });
    } catch (error) {
      console.error("There was a problem with deleting the cart item:", error);
    }
  };
  return (
    <>
      <Toaster toastOptions={toastConfig} />
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          <TitleCheckOut title="Checkout" />
          <div
            className="flex"
            style={!cart ? { justifyContent: "center" } : {}}
          >
            {!cart ? (
              <NoItemCart />
            ) : (
              <div className="flex xsm:flex-col sm:flex-col l:flex-row xsm:w-full sm:w-full">
                <div className="shrink grow-0 l:basis-[70%] h-full xsm:overflow-x-scroll xsm:overflow-y-hidden">
                  <table>
                    <tbody>
                      <tr>
                        <TitleTable title="product" />
                        <TitleTable title="price" />
                        <TitleTable title="quantity" />
                        <TitleTable title="subtotal" />
                        <TitleTable title="action" />
                      </tr>
                      {cart?.items?.map((item: any, index: any) => {
                        console.log(item);
                        return (
                          <tr key={`${item._id} - ${item.productId._id}`}>
                            <td className="w-full min-w-[320px] p-[10px] flex">
                              <div className="!relative">
                                <Image
                                  src={item.productId.files[0].url}
                                  className="!relative max-w-[100px] max-h-[100px]"
                                  alt="Item"
                                  fill
                                  sizes="(max-width: 100px) 100vw"
                                />
                              </div>
                              <div className="ml-[20px] flex flex-col justify-center">
                                <h3 className="text-text text-[1.6em] font-bold capitalize overflow-hidden max-w-[400px] line-clamp-1">
                                  {item.productId.name}
                                </h3>
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
                            <td className="w-full p-[10px] text-text text-[1.6em] text-start">
                              {item?.price}
                            </td>
                            <td className="w-full p-[10px] text-text text-[1.6em] !text-center">
                              {item?.quantity}
                            </td>
                            <td className="w-full p-[10px] text-text text-[1.6em] text-start">
                              {item.totalPriceItem}
                            </td>
                            <td className="w-full p-[10px]">
                              <div
                                className="flex justify-center"
                                onClick={() => handleDeleteCartItem(item._id)}
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
                <div className="shrink grow-0 l:basis-[30%] l:mt-[10px] xsm:mt-[40px] sm:mt-[40px] l:ml-[80px]">
                  {/* <div className="flex justify-between text-[1.6em] mb-[50px]">
                    <h1 className="text-text capitalize font-bold">subtotal</h1>
                    <h3 className="font-bold text-text">200.00</h3>
                  </div>
                  <div className="flex justify-between text-[1.6em] mb-[16px]">
                    <h1 className="text-text capitalize font-medium">
                      Delivery Change
                    </h1>
                    <h3 className="font-medium text-text">5.00</h3>
                  </div> */}
                  <div className="flex justify-between text-[1.6em] mb-[16px]">
                    <h1 className="text-text capitalize font-bold">
                      Grand Total
                    </h1>
                    <h3 className="font-bold text-text"> {cart?.totalPrice}</h3>
                  </div>
                  <div>
                    <button className="mt-[10px] text-[1.4em] text-white bg-button w-full p-[14px] rounded-[10px] hover:opacity-90">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
