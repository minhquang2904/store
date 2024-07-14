import Link from "next/link";
import Image from "next/image";
import style from "./cardProductLike.module.scss";
import SoldOut from "../soldOut/soldOut";
import { MathCeil } from "@/app/config/formatCurrencyVND";

const CardProductLike = (props: any) => {
  const { data } = props;
  const {
    categories,
    files,
    discount,
    discountedPrice,
    price,
    name,
    quantity,
    _id,
  } = data.productId;

  return (
    <>
      {data && (
        <div className="block mb-[24px] px-pCard l:w-[25%] sm:w-[33.333333%] xsm:w-[50%]">
          <Link
            className={`${style.hoverCard} block shadow-sm pb-[20px]`}
            href={{
              pathname: "/productDetail",
              query: { id: _id },
            }}
          >
            <div className="!relative">
              <Image
                src={files[0].url}
                className="!relative w-full max-h-[auto]"
                alt="Product 1"
                fill
                sizes="(max-width: 312px) 100vw"
                priority={true}
              />
              {discount > 0 && (
                <div className="absolute top-[20px] left-[0]">
                  <p className="text-white bg-secondary text-center text-[1.2em] font-semibold uppercase px-[12px] py-[6px]">
                    Sale
                  </p>
                </div>
              )}
              {quantity === 0 && <SoldOut />}
            </div>
            <div className="mt-[18px] mx-[10px] mb-[0]">
              <div>
                <h1 className="text-text text-[1.6em] font-semibold capitalize line-clamp-1 mb-[16px]">
                  {name}
                </h1>
              </div>
              <div className="flex justify-between">
                <p className="text-[#00000080] text-[1.6em] font-medium capitalize">
                  {categories}
                </p>
                <div className="flex font-medium">
                  {discount > 0 ? (
                    <>
                      <h3 className="text-[1.6em] text-button line-through">
                        {MathCeil(price)}
                      </h3>
                      <h3 className="text-[1.6em] ml-[10px] text-secondary">
                        {MathCeil(discountedPrice)}
                      </h3>
                    </>
                  ) : (
                    <h3 className="text-[1.6em] text-secondary">
                      {MathCeil(price)}
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

export default CardProductLike;
