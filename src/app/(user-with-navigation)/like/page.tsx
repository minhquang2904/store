"use client";

import { useEffect, useState } from "react";
import Pagination from "@/app/components/pagination/pagination";
import ShowingPage from "@/app/components/showingPage/showingPage";
import { useAuthContext } from "@/app/context/AuthContext";
import CardProductLike from "@/app/components/cardProductLike/cardProductLike";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import NoItemCart from "@/app/components/noItemCart/noItemCart";

const Like = () => {
  const { user } = useAuthContext();
  const [productLike, setProductLike] = useState(null) as any;
  const [loading, setLoading] = useState(false) as any;

  const getDataLike = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/like?id=${user?.id}`);
      const data = await res.json();

      if (data.status === 200) {
        setProductLike(data.data.likes);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!productLike) {
      getDataLike();
    }
  }, [productLike, user?.id]);

  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <ShowingPage
          title="Wish Lists"
          subTitle={`Showing 1 - 16 of ${productLike?.length} results`}
        />
        {loading && <LoadingComponent />}
        {productLike ? (
          <div className="mt-[16px]">
            <div className="flex flex-wrap mx-mCard">
              {productLike
                ?.slice()
                ?.reverse()
                ?.map((item: any) => {
                  return (
                    <CardProductLike key={item?.productId?._id} data={item} />
                  );
                })}
            </div>
          </div>
        ) : (
          <NoItemCart className="!max-w-[200px]" title="No product" />
        )}

        <Pagination />
      </div>
    </div>
  );
};

export default Like;
