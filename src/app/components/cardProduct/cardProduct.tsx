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
      <Link className={`${style.cardProductItems}`} href="/productDetail">
        <div className={`${style.cardProductItemsImage}`}>
          <Image
            src={data.url}
            className={`${style.picture}`}
            alt="Product 1"
            fill
            sizes="(max-width: 312px) 100vw"
            priority={true}
          />
          {data.discount && (
            <div className={`${style.cardProductItemsSale}`}>
              <p>Sale</p>
            </div>
          )}
          <div className={`${style.iconHeart}`}>
            <IconHeartSvg
              onClick={handleSubmitHeart}
              className={style.iconHeartSvg}
            />
          </div>
          <div
            className={`${style.cardProductItemsAdd}`}
            onClick={handleAddCart}
          >
            <h3>Add to Card</h3>
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
