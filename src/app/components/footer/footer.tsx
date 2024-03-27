"use client";

import Link from "next/link";
import Image from "next/image";
import style from "./footer.module.scss";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scroll(0, 0);
  };
  return (
    <div className={`${style.footer}`}>
      <div className={`${style.footerHeader}`}>
        <div className={`${style.footerContainer}`}>
          <div className={`${style.footerList}`}>
            <div className={`${style.footerItem} ${style.footerItemLogo}`}>
              <div className={`${style.footerLogo}`}>
                <Link href="#">
                  <Image
                    src="/images/logo.svg"
                    className={style.logo}
                    alt="LOGO"
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                </Link>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
                <div className={`${style.iconList}`}>
                  <Link href="#">
                    <Image
                      src="/icons/icon.svg"
                      className={style.icon}
                      alt="LOGO"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                  </Link>
                  <Link href="#">
                    <Image
                      src="/icons/icon1.svg"
                      className={style.icon}
                      alt="LOGO"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                  </Link>
                  <Link href="#">
                    <Image
                      src="/icons/icon2.svg"
                      className={style.icon}
                      alt="LOGO"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                  </Link>
                  <Link href="#">
                    <Image
                      src="/icons/icon3.svg"
                      className={style.icon}
                      alt="LOGO"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`${style.footerItem} ${style.footerItemInformation}`}
            >
              <div className={`${style.footerInformation}`}>
                <h1>CATALOG</h1>
                <div className={`${style.footerInformationList}`}>
                  <Link href="">Necklaces</Link>
                  <Link href="">hoodies</Link>
                  <Link href="">Jewelry Box</Link>
                  <Link href="">t-shirt</Link>
                  <Link href="">jacket</Link>
                </div>
              </div>
            </div>
            <div
              className={`${style.footerItem} ${style.footerItemInformation}`}
            >
              <div className={`${style.footerInformation}`}>
                <h1>ABOUT US</h1>
                <div className={`${style.footerInformationList}`}>
                  <Link href="">Our Producers</Link>
                  <Link href="">Sitemap</Link>
                  <Link href="">FAQ</Link>
                  <Link href="">About Us</Link>
                  <Link href="">Terms & Conditions</Link>
                </div>
              </div>
            </div>
            <div
              className={`${style.footerItem} ${style.footerItemInformation}`}
            >
              <div className={`${style.footerInformation}`}>
                <h1>CUSTOMER SERVICES</h1>
                <div className={`${style.footerInformationList}`}>
                  <Link href="">Contact Us</Link>
                  <Link href="">Track Your Order</Link>
                  <Link href="">Product Care & Repair</Link>
                  <Link href="">Book an Appointment</Link>
                  <Link href="">Shipping & Returns</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.footerCopyRight}`}>
        <div className={`${style.footerCopyRightContainer}`}>
          <h1> © 2022 Coral , Inc.</h1>
          <div
            className={`${style.footerScrollToTop}`}
            onClick={handleScrollToTop}
          >
            <h3>Scroll to top</h3>
            <Image
              src="/icons/arrowUp.svg"
              className={style.icon}
              alt="LOGO"
              fill
              sizes="100vw"
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
