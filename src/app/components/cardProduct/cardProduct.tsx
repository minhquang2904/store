import Link from "next/link";
import Image from "next/image";
import style from "./cardProduct.module.scss";
import IconHeartSvg from "../iconHeartSvg/iconHeartSvg";

const CardProduct = (props: any) => {
  const { data, login, styleCustom } = props;

  const handleSubmitHeart = (e: any) => {
    e.target
      .closest(`.${style.iconHeartSvg}`)
      .classList.toggle(`${style.active}`);
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
        className={`${style.cardProductItems} block shadow-sm pb-[20px]`}
        href="/productDetail"
      >
        <div
          className={`${style.cardProductItemsImage} overflow-hidden !relative`}
        >
          <Image
            src={data.url}
            className="!relative duration-500 w-full ease-in"
            alt="Product 1"
            fill
            sizes="(max-width: 312px) 100vw"
            priority={true}
          />
          {data.discount && (
            <div className="absolute top-[20px] left-0">
              <p className="text-white bg-secondary text-center text-[1.2em] font-semibold uppercase px-[12px] py-[6px]">
                Sale
              </p>
            </div>
          )}
          <div className="absolute right-[8px] top-[20px] hidden">
            <IconHeartSvg
              onClick={handleSubmitHeart}
              className={style.iconHeartSvg}
            />
          </div>
          <div
            className="flex items-center justify-center overflow-hidden h-0 text-center absolute duration-100 ease-linear bottom-0 left-0 right-0 bg-[#0000004d] text-white text-[1.6em] font-normal cursor-pointer hover:bg-[#00000080]"
            onClick={handleAddCart}
          >
            <h3 className="h-full flex items-center">Add to Card</h3>
          </div>
        </div>
        <div className={`${style.cardProductItemsSubTitle}`}>
          <div className={`${style.cardProductItemsTitle}`}>
            <h1>{data.title}</h1>
          </div>
          <div className={`${style.cardProductItemsSub}`}>
            <h1>{data.subTitle}</h1>
          </div>
          <div className={`${style.cardProductItemsTypeAndPrice}`}>
            <p>{data.type}</p>
            <div className={`${style.cardProductItemsDiscount}`}>
              <h3
                className={`${style.price}`}
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
                <h3 className={`${style.discount}`}>${data.discount}</h3>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProduct;
