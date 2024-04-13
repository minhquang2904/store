import style from "./noItemCart.module.scss";
import Image from "next/image";

const NoItemCart = (props: any) => {
  const { styleCustom } = props;
  return (
    <div className={`${style.noItemCart}`}>
      <Image
        src="/images/no-item-cart.png"
        className={style.logo}
        alt="no-item-cart"
        fill
        sizes="(max-width: 253px) 100vw"
        style={styleCustom}
      />
    </div>
  );
};

export default NoItemCart;
