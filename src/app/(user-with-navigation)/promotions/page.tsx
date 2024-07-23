"use client";

import CardProduct from "@/app/components/cartProduct/cartProduct";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import NoItemCart from "@/app/components/noItemCart/noItemCart";
import Pagination from "@/app/components/pagination/pagination";
const PromotionsPage = ({ searchParams }: any) => {
  const promotions = searchParams.promotions;
  const searchPage = searchParams.page;
  const [products, setProducts] = useState(null) as any;
  const [currentPage, setCurrentPage] = useState(parseInt(searchPage));
  const [totalPages, setTotalPages] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { push } = useRouter();

  const getPromotions = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `/api/product/promotions?promotions=${promotions}&page=${currentPage}`
      );
      const result = await res.json();
      const { status } = result;
      if (status === 200) {
        setProducts(result.data);
        setCurrentPage(result.currentPage);
        setTotalPages(result.totalPages);
      } else {
        setProducts([]);
      }
      setLoadingProducts(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPromotions();
  }, [promotions, currentPage]);

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      push(`/promotions?promotions=${promotions}&page=${page}`);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          {loadingProducts && <LoadingComponent />}
          {products?.length > 0 ? (
            <>
              <div className="flex flex-wrap mx-mCard">
                {products?.map((item: any) => {
                  return <CardProduct key={item._id} data={item} />;
                })}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <>
              <div className="mt-[100px]">
                <NoItemCart
                  className="max-w-[160px]"
                  title="This product does not exist"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PromotionsPage;
