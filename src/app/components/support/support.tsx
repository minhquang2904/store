import Image from "next/image";

const Support = () => {
  const data = [
    {
      url: "/icons/shippingbox.svg",
      title: "free shipping",
      desc: "Free shipping for order above $150 ",
    },
    {
      url: "/icons/usd-circle.svg",
      title: "money guarantee",
      desc: "Within 30 days for an exchange",
    },
    {
      url: "/icons/earphones.svg",
      title: "Online Support",
      desc: "24 hours a day, 7 days a week",
    },
    {
      url: "/icons/wallet.svg",
      title: "flexible payment",
      desc: "Pay with multiple credit cards",
    },
  ];
  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-100 sm:mt-80 xsm:mt-60">
        <div className="flex gap-y-[60px] flex-wrap">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="!relative l:w-[25%] sm:w-[50%] xsm:w-[100%] xsm:flex sm:flex l:block flex-col justify-center items-center"
              >
                <Image
                  src={item.url}
                  className="!relative max-w-[30px] max-h-[36px]"
                  alt="LOGIN"
                  fill
                  sizes="100vw"
                  priority={true}
                />
                <h3 className="text-[1.6em] text-text font-extrabold capitalize mx-0 mt-[12px] mb-[4px]">
                  {item.title}
                </h3>
                <p className="text-[1.4em] text-text font-medium">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Support;
