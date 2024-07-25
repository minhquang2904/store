"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import NoItemCart from "@/app/components/noItemCart/noItemCart";
import Pagination from "@/app/components/pagination/pagination";
import CardProduct from "@/app/components/cartProduct/cartProduct";
import TitlePromotion from "@/app/components/titlePromotion/titlePromotion";

const SubCategoriesPage = ({ searchParams }: any) => {
  const subCategories = searchParams["sub-categories"];
  const searchPage = searchParams.page;
  const [products, setProducts] = useState(null) as any;
  const [currentPage, setCurrentPage] = useState(parseInt(searchPage));
  const [totalPages, setTotalPages] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { push } = useRouter();

  const getSubCategories = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `/api/product/sub-categories?sub-categories=${subCategories}&page=${currentPage}`
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
    getSubCategories();
  }, [subCategories, currentPage]);

  useEffect(() => {
    const handleRouteChange = () => {
      const pageFromParams = parseInt(
        new URLSearchParams(window.location.search).get("page") || "1"
      );
      setCurrentPage(pageFromParams);
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      push(`/sub-categories?sub-categories=${subCategories}&page=${page}`);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          {loadingProducts && <LoadingComponent />}
          {products?.length > 0 ? (
            <>
              <TitlePromotion title={subCategories} />
              <p className="mb-[16px] font-medium text-text text-[1.6em]">
                Page {currentPage} of {totalPages || 1} - ({products?.length}{" "}
                products on this page)
              </p>
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

export default SubCategoriesPage;
