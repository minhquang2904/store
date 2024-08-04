import Link from "next/link";
import Image from "next/image";
import style from "./cardProduct.module.scss";
import SoldOut from "../soldOut/soldOut";
import { MathCeil } from "@/app/config/formatCurrencyVND";

const CardProduct = (props: any) => {
  const { data, filterCard } = props;
  return (
    <>
      {data && (
        <div
          className={`block mb-[24px] px-pCard ${
            filterCard ? "l:w-[33.333333%]" : "l:w-[25%]"
          } sm:w-[33.333333%] xsm:w-[50%]`}
        >
          <Link
            className={`${style.hoverCard} block shadow-sm pb-[20px]`}
            href={{
              pathname: "/productDetail",
              query: { id: data?._id?.$oid || data?._id },
            }}
          >
            <div className="!relative">
              <Image
                src={data?.files[0]?.url}
                className="!relative w-full max-h-[auto]"
                alt="Product 1"
                fill
                sizes="(max-width: 312px) 100vw"
                priority={true}
              />
              {data?.discount > 0 && (
                <div className="absolute top-[20px] left-[0]">
                  <p className="text-white bg-secondary text-center text-[1.2em] font-semibold uppercase px-[12px] py-[6px]">
                    Sale
                  </p>
                </div>
              )}
              {data?.quantity === 0 && <SoldOut />}
            </div>
            <div className="mt-[18px] mx-[10px] mb-[0]">
              <div>
                <h1 className="text-text text-[1.6em] font-semibold capitalize line-clamp-1 mb-[16px]">
                  {data?.name}
                </h1>
              </div>
              <div className="flex justify-between">
                <p className="text-[#00000080] text-[1.6em] font-medium capitalize">
                  {data?.categories}
                </p>
                <div className="flex font-medium">
                  {data?.discount > 0 ? (
                    <>
                      <h3 className="text-[1.6em] text-button line-through">
                        {MathCeil(data?.price)}
                      </h3>
                      <h3 className="text-[1.6em] ml-[10px] text-secondary">
                        {MathCeil(data?.discountedPrice)}
                      </h3>
                    </>
                  ) : (
                    <h3 className="text-[1.6em] text-secondary">
                      {MathCeil(data?.price)}
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default CardProduct;
