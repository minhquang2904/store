"use client";

import NoItemCart from "@/app/components/noItemCart/noItemCart";
import style from "./cart.module.scss";
import { data, itemCart } from "@/app/data";
import Image from "next/image";
import { useState } from "react";

const Cart = () => {
  const [dataCart, setdataCart] = useState([]);
  return (
    <div className={`${style.cart}`}>
      <div className={`${style.cartContainer}`}>
        <div className={`${style.cartTitle}`}>
          <h1>Checkout</h1>
        </div>
        <div
          className={`${style.cartContent}`}
          style={dataCart.length <= 0 ? { justifyContent: "center" } : {}}
        >
          {dataCart.length <= 0 ? (
            <NoItemCart />
          ) : (
            <>
              <div className={`${style.cartContentLeft}`}>
                <table>
                  <tbody>
                    <tr className={`${style.title}`}>
                      <th>product</th>
                      <th>price</th>
                      <th>quantity</th>
                      <th>subtotal</th>
                    </tr>
                    {dataCart.map((item: any, index: any) => {
                      return (
                        <tr key={index} className={`${style.content}`}>
                          <td className={`${style.product}`}>
                            <div>
                              <Image
                                src={item.url}
                                className={style.image}
                                alt="Item"
                                fill
                                sizes="(max-width: 100px) 100vw"
                              />
                            </div>
                            <div>
                              <h3>{item.title}</h3>
                              <p>Size S</p>
                            </div>
                          </td>
                          <td className={`${style.price}`}>${item.price}</td>
                          <td className={`${style.quantity}`}>2</td>
                          <td className={`${style.subtotal}`}>
                            ${item.price * 2}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className={`${style.cartContentRight}`}>
                <div className={`${style.subtotal}`}>
                  <h1>subtotal</h1>
                  <h3>$200.00</h3>
                </div>
                <div className={`${style.delivery}`}>
                  <h1>Delivery Change</h1>
                  <h3>$5.00</h3>
                </div>
                <div className={`${style.grandTotal}`}>
                  <h1>Grand Total</h1>
                  <h3>$205.00</h3>
                </div>
                <div className={`${style.btnCheckout}`}>
                  <button>Proceed to Checkout</button>
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
