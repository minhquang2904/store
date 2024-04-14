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
      <Link className={`${style.bestSellerItems}`} href="/productDetail">
        <div className={`${style.bestSellerItemsImage}`}>
          <Image
            src={data.url}
            className={`${style.picture}`}
            alt="Product 1"
            fill
            sizes="(max-width: 312px) 100vw"
            priority={true}
          />
          {data.discount ? (
            <div className={`${style.bestSellerItemsSale}`}>
              <p>Sale</p>
            </div>
          ) : (
            <></>
          )}
          <div className={`${style.iconHeart}`}>
            <IconHeartSvg
              onClick={handleSubmitHeart}
              className={style.iconHeartSvg}
            />
          </div>
          <div
            className={`${style.bestSellerItemsAdd}`}
            onClick={handleAddCart}
          >
            <h3>Add to Card</h3>
          </div>
        </div>
        <div className={`${style.bestSellerItemsSubTitle}`}>
          <div className={`${style.bestSellerItemsTitle}`}>
            <h1>{data.title}</h1>
          </div>
          <div className={`${style.bestSellerItemsTypeAndPrice}`}>
            <p>{data.type}</p>
            <div className={`${style.bestSellerItemsDiscount}`}>
              {!data.discount ? (
                <>
                  <h3
                    className={`${style.price}`}
                    style={{
                      textDecoration: "unset",
                      color: "#131118",
                    }}
                  >
                    ${data.price}
                  </h3>
                </>
              ) : (
                <>
                  <h3
                    className={`${style.price}`}
                    style={{ textDecoration: "line-through" }}
                  >
                    ${data.price}
                  </h3>
                  <h3 className={`${style.discount}`}>{data.discount}</h3>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProduct;
