import Image from "next/image";

const NoItemCart = (props: any) => {
  const { styleCustom } = props;
  return (
    <div className="!relative flex justify-center items-center">
      <Image
        src="/images/no-item-cart.png"
        className={`${styleCustom} !relative max-w-[200px] w-full h-full`}
        alt="no-item-cart"
        fill
        sizes="(max-width: 253px) 100vw"
      />
    </div>
  );
};

export default NoItemCart;
