import Image from "next/image";

const NoItemCart = (props: any) => {
  const { styleCustom, title } = props;
  return (
    <div className="!relative flex justify-center items-center flex-col my-[16px]">
      <Image
        src="/images/no-item-cart.png"
        className={`${styleCustom} !relative max-w-[200px] w-full h-full`}
        alt="no-item-cart"
        fill
        sizes="(max-width: 253px) 100vw"
      />
      <h1 className="text-text text-[1.6em] mt-[16px]">{title}</h1>
    </div>
  );
};

export default NoItemCart;
