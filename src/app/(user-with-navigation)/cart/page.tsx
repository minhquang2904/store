"use client";

import NoItemCart from "@/app/components/noItemCart/noItemCart";
import style from "./cart.module.scss";
import { data, itemCart } from "@/app/data";
import Image from "next/image";
import { useState } from "react";

const Cart = () => {
  const [dataCart, setdataCart] = useState(data);
  return (
    <div className="flex justify-center items-center">
      <div className={`${style.cartContainer}`}>
        <div>
          <h1 className="text-[3.6em] font-medium uppercase text-text">
            Checkout
          </h1>
        </div>
        <div
          className="mt-[40px] flex"
          style={dataCart.length <= 0 ? { justifyContent: "center" } : {}}
        >
          {dataCart.length <= 0 ? (
            <NoItemCart />
          ) : (
            <>
              <div className="shrink grow-0 basis-[70%]">
                <table>
                  <tbody>
                    <tr className={`${style.title}`}>
                      <th className="w-full p-[10px] text-text text-[1.6em] text-start capitalize">
                        product
                      </th>
                      <th className="w-full p-[10px] text-text text-[1.6em] text-start capitalize">
                        price
                      </th>
                      <th className="w-full p-[10px] text-text text-[1.6em] text-start capitalize">
                        quantity
                      </th>
                      <th className="w-full p-[10px] text-text text-[1.6em] text-start capitalize">
                        subtotal
                      </th>
                    </tr>
                    {dataCart.map((item: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td className="w-full p-[10px] flex">
                            <div className="!relative">
                              <Image
                                src={item.url}
                                className="!relative max-w-[100px] max-h-[100px]"
                                alt="Item"
                                fill
                                sizes="(max-width: 100px) 100vw"
                              />
                            </div>
                            <div className="ml-[20px] flex flex-col justify-center">
                              <h3
                                className={`text-text text-[1.6em] font-extrabold overflow-hidden max-w-[400px] ${style.hiddenTextTitle}`}
                              >
                                {item.title}
                              </h3>
                              <p className="text-[1.5em] text-text font-normal">
                                Size S
                              </p>
                            </div>
                          </td>
                          <td className="w-full p-[10px] text-text text-[1.6em] text-start">
                            ${item.price}
                          </td>
                          <td className="w-full p-[10px] text-text text-[1.6em] !text-center">
                            2
                          </td>
                          <td className="w-full p-[10px] text-text text-[1.6em] text-start">
                            ${item.price * 2}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="shrink grow-0 basis-[30%] mt-[10px] ml-[80px]">
                <div className="flex justify-between text-[1.6em] mb-[50px]">
                  <h1 className="text-text capitalize font-bold">subtotal</h1>
                  <h3 className="font-bold text-text">$200.00</h3>
                </div>
                <div className="flex justify-between text-[1.6em] mb-[16px]">
                  <h1 className="text-text capitalize font-medium">
                    Delivery Change
                  </h1>
                  <h3 className="font-medium text-text">$5.00</h3>
                </div>
                <div className="flex justify-between text-[1.6em] mb-[16px]">
                  <h1 className="text-text capitalize font-bold">
                    Grand Total
                  </h1>
                  <h3 className="font-bold text-text">$205.00</h3>
                </div>
                <div>
                  <button className="mt-[10px] text-[1.4em] text-white bg-button w-full p-[14px] rounded-[10px] hover:opacity-90">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
