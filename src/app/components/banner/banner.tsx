import style from "./banner.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <div className={`${style.banner}`}>
      <div className={`${style.bannerContainer}`}>
        <div className={`${style.bannerLeft}`}>
          <div className={`${style.bannerLeftTitle}`}>
            <h1> Collections </h1>
          </div>
          <div className={`${style.bannerLeftDescription}`}>
            <p>
              You can explore ans shop many differnt collection from various
              barands here.
            </p>
          </div>
          <div className={`${style.bannerLeftButton}`}>
            <Link href="#">
              <button>Shop Now</button>
              <Image
                src="/icons/arrowRight.svg"
                className={`${style.icon} dark:invert`}
                alt="Arrow"
                fill
                sizes="100vw"
                priority={true}
              />
            </Link>
          </div>
        </div>
        <div className={`${style.bannerRight}`}>
          <div className={`${style.bannerRightImage}`}>
            <Image
              src="/images/picture2.png"
              className={`${style.picture}`}
              alt="Picture"
              fill
              sizes="(max-width: 542px) 100vw"
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
