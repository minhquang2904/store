"use client";

import NoItemCart from "@/app/components/noItemCart/noItemCart";
import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import Total from "@/app/components/total/total";
import { data } from "@/app/data";
import Image from "next/image";
import { useState } from "react";

const TitleTable = (props: any) => {
  const { title } = props;
  return (
    <th className="w-full p-[10px] text-text text-[1.6em] text-start capitalize">
      {title}
    </th>
  );
};
const Cart = () => {
  const [dataCart, setdataCart] = useState(data);
  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitleCheckOut title="Checkout" />
        <div
          className="flex"
          style={dataCart.length <= 0 ? { justifyContent: "center" } : {}}
        >
          {dataCart.length <= 0 ? (
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
                    {dataCart.map((item: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td className="w-full min-w-[320px] p-[10px] flex">
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
                              <h3 className="text-text text-[1.6em] font-extrabold overflow-hidden max-w-[400px] line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-[1.5em] text-text font-normal">
                                Size S
                              </p>
                            </div>
                          </td>
                          <td className="w-full p-[10px] text-text text-[1.6em] text-start">
                            {item.price}
                          </td>
                          <td className="w-full p-[10px] text-text text-[1.6em] !text-center">
                            2
                          </td>
                          <td className="w-full p-[10px] text-text text-[1.6em] text-start">
                            {item.price * 2}
                          </td>
                          <td className="w-full p-[10px]">
                            <div className="flex justify-center">
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
              <Total />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
