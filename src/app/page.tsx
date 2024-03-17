import Link from "next/link";
import Image from "next/image";
import MainLayout from "./pages/home/mainLayOut/mainLayOut";
import style from "./main.module.scss";
import Banner from "./components/banner/banner";

export default function Home() {
  return (
    <MainLayout>
      <Banner />
      <div className={`${style.brand}`}>
        <div className={`${style.brandContainer}`}>
          <div className={`${style.marquee}`}>
            <div className={`${style.brandList}`}>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-1.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-2.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-3.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-4.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-5.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
            </div>
            <div className={`${style.brandList}`}>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-1.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-2.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-3.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-4.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.brandItem}`}>
                <Image
                  src="/images/brand-5.png"
                  className={`${style.logo}`}
                  alt="Brand"
                  fill
                  sizes="(width: 200px) 100vw"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
