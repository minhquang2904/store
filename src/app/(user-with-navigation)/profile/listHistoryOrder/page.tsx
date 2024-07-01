"use client";

import { useEffect, useState } from "react";
import { address } from "@/app/data";
import { useAuthContext } from "@/app/context/AuthContext";
import NoItemCart from "@/app/components/noItemCart/noItemCart";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";

const ListsHistoryOrder = () => {
  const [listOrder, setListOrder] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [noItemCart, setNoItemCart] = useState(false);

  const fetchHistoryOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/history_order?id=${user?.id}`);
      const result = await res.json();
      const { message, status } = result;
      if (status === 200) {
        setListOrder(result.data);
        if (result.data.length === 0) {
          setNoItemCart(true);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!listOrder) {
      fetchHistoryOrder();
    }
  }, [listOrder, user?.id]);

  return (
    <>
      {listOrder && (
        <>
          <div className="flex flex-col gap-y-[40px]">
            {listOrder?.map((item: any) => {
              return (
                <div key={item._id}>
                  <div className="flex justify-between">
                    <div className="w-[50%] xsm:w-[80%] flex">
                      <div className="flex flex-col justify-center pr-[8px] xsm:px-[0]">
                        <h1 className="text-text text-[1.6em] font-semibold">
                          {item?.firstName} {item?.lastName}
                        </h1>
                        <h3 className="text-text text-[1.6em] font-normal line-clamp-1">
                          {item?.address}
                        </h3>
                        <h3 className="text-text text-[1.6em] font-normal capitalize">
                          {item?.payment}
                        </h3>
                      </div>
                    </div>
                    <div className="w-[20%] xsm:w-[20%] flex items-center justify-center px-[8px] xsm:px-[0]">
                      <h1 className="text-text text-[1.6em] font-semibold">
                        {item?.totalPrice}
                      </h1>
                    </div>
                    <div className="w-[30%] flex justify-end pl-[8px] xsm:hidden">
                      <div className="flex flex-col gap-y-[10px]">
                        <ButtonOrder
                          title="View Order"
                          styleCustom="border-button text-text bg-[transparent]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] xsm:flex justify-end sm:hidden mt-[32px]">
                    <div className="flex sm:flex-col xsm:flex-row gap-y-[10px] gap-x-[10px] xsm:w-full">
                      <ButtonOrder
                        title="View Order"
                        styleCustom="border-button text-text bg-[transparent] xsm:w-[50%]"
                      />
                    </div>
                  </div>
                  <div className="flex mt-[8px]">
                    <h1
                      className={`text-[1.6em] ${
                        item?.status === "confirm" && "text-[#3CD139]"
                      } mr-[16px] capitalize`}
                    >
                      {item?.status}
                    </h1>
                    <p className="text-[1.6em] text-text mr-[16px]">
                      {item?.status === "confirm" &&
                        "Your product is confirmed"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {noItemCart && (
        <NoItemCart className="max-w-[160px]" title="No order history" />
      )}
      {loading && <LoadingComponent styleCustom="!min-h-[300px]" />}
    </>
  );
};

const ButtonOrder = (props: any) => {
  const { styleCustom, title, onClick } = props;
  return (
    <button
      className={`px-[30px] py-[12px] w-full text-[1.6em] border-[1px] border-solid rounded-[16px] ${styleCustom}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default ListsHistoryOrder;
