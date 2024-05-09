import Link from "next/link";
import Image from "next/image";
import style from "./cardProduct.module.scss";

const CardProduct = (props: any) => {
  const { data } = props;
  return (
    <div className="block mb-[24px] px-pCard l:w-[25%] sm:w-[33.333333%] xsm:w-[50%]">
      <Link
        className={`${style.hoverCard} block shadow-sm pb-[20px]`}
        href="/productDetail"
      >
        <div className="!relative">
          <Image
            src={data.url}
            className="!relative w-full max-h-[auto]"
            alt="Product 1"
            fill
            sizes="(max-width: 312px) 100vw"
          />
          {data.discount && (
            <div className="absolute top-[20px] left-[0]">
              <p className="text-white bg-secondary text-center text-[1.2em] font-semibold uppercase px-[12px] py-[6px]">
                Sale
              </p>
            </div>
          )}
        </div>
        <div className="mt-[18px] mx-[10px] mb-[0]">
          <div>
            <h1 className="text-text text-[1.6em] font-semibold capitalize min-h-[48px] line-clamp-2">
              {data.title}
            </h1>
          </div>
          <div className="my-[6px] mx-[0]">
            <h1 className="text-text text-[1.6em] font-bold capitalize min-h-[24px] line-clamp-1">
              {data.subTitle}
            </h1>
          </div>
          <div className="flex justify-between">
            <p className="text-[#00000080] text-[1.6em] font-medium capitalize">
              {data.type}
            </p>
            <div className="flex font-medium">
              {data.discount ? (
                <h3 className="text-[1.6em] ml-[10px] text-secondary">
                  {data.discount}
                </h3>
              ) : (
                <h3 className="text-[1.6em] text-secondary">{data.price}</h3>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProduct;
