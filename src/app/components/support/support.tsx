import Image from "next/image";
import style from "./support.module.scss";

export default function Support() {
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
    <div className={`${style.support}`}>
      <div className={`${style.supportContainer}`}>
        <div className={`${style.supportList}`}>
          {data.map((item, index) => {
            return (
              <div key={index} className={`${style.supportItem}`}>
                <Image
                  src={item.url}
                  className={style.image}
                  alt="LOGIN"
                  fill
                  sizes="100vw"
                  priority={true}
                />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
