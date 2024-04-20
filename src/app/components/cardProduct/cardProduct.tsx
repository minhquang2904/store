import Link from "next/link";
import Image from "next/image";
import style from "./cardProduct.module.scss";
import IconHeartSvg from "../iconHeartSvg/iconHeartSvg";

const CardProduct = (props: any) => {
  const { data, login, styleCustom } = props;

  const handleSubmitHeart = (e: any) => {
    e.target.closest(`.${style.iconHeartSvg}`).classList.toggle(style.active);
    e.preventDefault();
  };
  const handleAddCart = (e: any) => {
    if (!login) {
      window.location.href = "/login";
    }
    e.preventDefault();
  };
  return (
    <div className={`${style.column}`} style={styleCustom}>
      <Link
        className={`${style.cardProductItems} block shadow-sm pb-[20px] group`}
        href="/productDetail"
      >
        <div className="overflow-hidden !relative">
          <Image
            src={data.url}
            className="!relative w-full group-hover:scale-[1.04] group-hover:opacity-90 duration-300 ease-out max-h-400px"
            alt="Product 1"
            fill
            sizes="(max-width: 312px) 100vw"
          />
          {data.discount && (
            <div className="absolute top-[20px] left-0">
              <p className="text-white bg-secondary text-center text-[1.2em] font-semibold uppercase px-[12px] py-[6px]">
                Sale
              </p>
            </div>
          )}
          <div className="absolute right-[8px] top-[20px] hidden group-hover:block">
            <IconHeartSvg
              onClick={handleSubmitHeart}
              className={style.iconHeartSvg}
            />
          </div>
          <div
            className="flex items-center justify-center overflow-hidden h-0 text-center absolute duration-100 ease-linear bottom-0 left-0 right-0 bg-[#0000004d] text-white text-[1.6em] font-normal cursor-pointer group-hover:bg-[#00000080] group-hover:h-[40px]"
            onClick={handleAddCart}
          >
            <h3 className="h-full flex items-center">Add to Card</h3>
          </div>
        </div>
        <div className="mt-[18px] mx-[10px] mb-0">
          <div>
            <h1 className="text-text text-[1.6em] font-semibold capitalize">
              {data.title}
            </h1>
          </div>
          <div className="my-[6px] mx-0">
            <h1 className="text-text text-[1.6em] font-medium capitalize">
              {data.subTitle}
            </h1>
          </div>
          <div
            className={`${style.cardProductItemsTypeAndPrice} flex justify-between`}
          >
            <p className="text-[#00000080] text-[1.6em] font-medium capitalize">
              {data.type}
            </p>
            <div className="flex font-medium">
              <h3
                className="text-[1.6em] text-[#00000080]"
                style={
                  data.discount
                    ? {
                        textDecoration: "line-through",
                      }
                    : { textDecoration: "unset", color: "#131118" }
                }
              >
                ${data.price}
              </h3>
              {data.discount && (
                <h3 className="text-[1.6em] ml-[10px] text-[#ff6f61]">
                  ${data.discount}
                </h3>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProduct;
