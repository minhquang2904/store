"use client";
import { useState } from "react";
import Link from "next/link";
import TitlePageAmin from "@/app/components/titlePageAdmin/titlePageAdmin";
import style from "./order.module.scss";

const OrderAdmin = () => {
  const [totalOrder, setTotalOrder] = useState(null) as any;
  const [loadingData, setLoadingData] = useState(false) as any;

  return (
    <>
      <TitlePageAmin title="Order" />
      <div>
        <Link
          href="/admin/order/newOrders"
          className={`${style.hoverCard} ${
            loadingData && "animate-pulse"
          } inline-flex pl-[16px] pr-[12px] py-[12px] max-w-[200px] w-full bg-[#f1f1f5] shadow-sm rounded-[16px] cursor-pointer`}
        >
          <div className="flex items-center justify-center mr-[16px] w-[45px] h-[45px] bg-[#E5E7E9] rounded-[50%]">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#292d32" strokeWidth="2">
                <rect height="17" rx="2" width="14" x="5" y="4" />
                <g strokeLinecap="round">
                  <path d="m9 9h6" />
                  <path d="m9 13h6" />
                  <path d="m9 17h4" />
                </g>
              </g>
            </svg>
          </div>
          <div>
            <h3 className="text-[#717171] text-[1.4em]">Number of Orders</h3>
            <h1 className="text-text text-[1.6em] font-medium">
              {totalOrder || 0}
            </h1>
          </div>
        </Link>
      </div>
    </>
  );
};

export default OrderAdmin;
