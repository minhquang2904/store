import Link from "next/link";
import Image from "next/image";
import style from "./bannerGroup.module.scss";

export default function BannerGroup() {
  const data = [
    { url: "/images/bannerGroup1.png", title: "women" },
    { url: "/images/bannerGroup2.jpg", title: "man" },
    { url: "/images/bannerGroup3.jpg", title: "bag" },
    { url: "/images/bannerGroup4.jpg", title: "shoes" },
  ];
  return (
    <div className={`${style.bannerGroup}`}>
      <div className={`${style.bannerGroupContainer}`}>
        <div className={`${style.bannerGroupList}`}>
          {data.map((item, index) => {
            return (
              <Link key={index} href="#" className={`${style.bannerGroupItem}`}>
                <Image
                  src={item.url}
                  className={style.image}
                  alt="LOGIN"
                  fill
                  sizes="(max-width: 648px),100vw"
                  priority={true}
                />
                <div className={`${style.overlay}`}>
                  <div className={`${style.overlayContainer}`}>
                    <h1>{item.title}</h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
