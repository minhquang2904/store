import Link from "next/link";
import Image from "next/image";
import MainLayout from "./pages/home/mainLayOut/mainLayOut";
import style from "./main.module.scss";

export default function Home() {
  return (
    <MainLayout>
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
          <div className={`${style.bannerRight}`}></div>
        </div>
      </div>
    </MainLayout>
  );
}
