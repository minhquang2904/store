"use client";
import React, { createContext, useContext, ReactNode } from "react";

import useGetCart from "../hooks/useGetCart";

interface CartContextType {
  cart: any;
  triggerFetchCart: () => void;
  loadingCart: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { cart, triggerFetchCart, loadingCart } = useGetCart();

  return (
    <CartContext.Provider
      value={{
        cart,
        triggerFetchCart,
        loadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
