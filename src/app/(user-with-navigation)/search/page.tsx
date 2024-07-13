"use client";

import CardProduct from "@/app/components/cartProduct/cartProduct";
import LoadingComponent from "@/app/components/loadingComponent/loadingComponent";
import NoItemCart from "@/app/components/noItemCart/noItemCart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination/pagination";

const SearchPage = ({ searchParams }: any) => {
  const searchKeyword = searchParams.keyword;
  const searchPage = searchParams.page;
  const [currentPage, setCurrentPage] = useState(parseInt(searchPage));
  const [products, setProducts] = useState(null) as any;
  const [totalPages, setTotalPages] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const fetchDataSearch = async () => {
      setLoadingProducts(true);
      try {
        const response = await fetch(
          `/api/users/search/page?keyword=${searchKeyword
            .replace(/\s+/g, "")
            .trim()}&page=${currentPage}`
        );
        const data = await response.json();
        if (data.status === 200) {
          setProducts(data.data);
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
        } else {
          setProducts([]);
        }
        setLoadingProducts(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataSearch();
  }, [currentPage, searchKeyword]);

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      push(`/search?keyword=${searchKeyword}&page=${page}`);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center px-pLayout">
        <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
          {loadingProducts && <LoadingComponent />}
          {products?.length > 0 ? (
            <>
              <h1 className="text-[2em] font-medium text-text">
                Search Result: {searchKeyword}
              </h1>
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

export default SearchPage;
