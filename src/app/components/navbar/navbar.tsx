"use client";

import Link from "next/link";
import style from "./navbar.module.scss";
import Image from "next/image";
import { useEffect } from "react";

export default function NavBar() {
  useEffect(() => {
    const mainLayout = document.querySelector(".mainLayout");
    console.log(mainLayout);
    const iconSearch = document.querySelector(".iconSearch");
    const itemSearch = document.querySelector(".itemSearch");
    iconSearch?.addEventListener("click", (e) => {
      itemSearch?.classList.add(style.showSearch);
      e.stopPropagation();
    });
    mainLayout?.addEventListener("click", (e) => {
      itemSearch?.classList.remove(style.showSearch);
    });
  });
  const handleClick = (e: any) => {
    console.log("");
  };
  return (
    <div className={`${style.mainContainer}`}>
      <div className={`${style.navigationContainer}`}>
        <div className={`${style.navigation}`}>
          <div className={`${style.navigationLeft}`}>
            <Link href="">
              <Image
                src="/images/logo.svg"
                className={style.logo}
                alt="LOGO"
                fill
                sizes="100vw"
                priority={true}
              />
            </Link>
          </div>
          <div className={`${style.navigationCenter}`}>
            <div className={`${style.navigationList}`}>
              <div className={`${style.navigationItem}`}>Home</div>
              <div className={`${style.navigationItem}`}>Shop</div>
              <div className={`${style.navigationItem}`}>Blog</div>
              <div className={`${style.navigationItem}`}>Contact Us</div>
            </div>
          </div>
          <div className={`${style.navigationRight}`}>
            <div className={`${style.navigationUser}`}>
              <div className={`${style.navigationUserItem} iconSearch`}>
                <Image
                  src="/icons/search.svg"
                  className={style.logo}
                  alt="LOGO"
                  fill
                  sizes="100vw"
                  priority={true}
                />
                <div className={`${style.navigationUserItemSearch} itemSearch`}>
                  <input type="text" placeholder="Search" />
                </div>
              </div>
              <div className={`${style.navigationUserItem}`}>
                <Image
                  src="/icons/heart.svg"
                  className={style.logo}
                  alt="LOGO"
                  fill
                  sizes="100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.navigationUserItem}`}>
                <Image
                  src="/icons/bag.svg"
                  className={style.logo}
                  alt="LOGO"
                  fill
                  sizes="100vw"
                  priority={true}
                />
              </div>
              <Link href="/pages/account/login">
                <button>Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
