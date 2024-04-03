"use client";

import Link from "next/link";
import style from "./navbar.module.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function NavBar() {
  const searchInput: any = useRef(null);
  const [checkLogin, setCheckLogin] = useState(false);
  const router = useRouter();
  console.log(router);
  useEffect(() => {
    const mainLayout: any = document.querySelector(".mainLayout");
    const iconSearch: any = document.querySelector(".iconSearch");
    const itemSearch: any = document.querySelector(".itemSearch");
    const positionTopNav: any = document.querySelector(
      `.${style.headerContainer}`
    );

    const addStyleNav = () => {
      positionTopNav.offsetTop > 80
        ? (positionTopNav.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)")
        : (positionTopNav.style.boxShadow = "unset");
    };

    window.addEventListener("scroll", () => {
      addStyleNav();
    });

    iconSearch.addEventListener("click", (e: any) => {
      itemSearch.classList.add(style.showSearch);
      iconSearch.style.backgroundColor = "#e3e7f3";
      searchInput.current.focus();
      e.stopPropagation();
    });

    mainLayout.addEventListener("click", (e: any) => {
      iconSearch.style.backgroundColor = "unset";
      itemSearch.classList.remove(style.showSearch);
    });

    addStyleNav();
    return () => {
      window.addEventListener("scroll", () => {
        addStyleNav();
      });
      iconSearch.addEventListener("click", (e: any) => {
        itemSearch.classList.add(style.showSearch);
        searchInput.current.focus();
        e.stopPropagation();
      });
      mainLayout.addEventListener("click", (e: any) => {
        itemSearch.classList.remove(style.showSearch);
      });
    };
  }, []);
  const handleClick = (e: any) => {};

  useEffect(() => {
    const navigationItem = document.querySelectorAll(
      `.${style.navigationItem}`
    );
    const line: any = document.querySelector(`.${style.line}`);
    const navActive: any = document.querySelector(
      `.${style.navigationItem}.${style.active}`
    );

    line.style.left = navActive.offsetLeft + 13 + "px";
    line.style.width = navActive.offsetWidth - 26 + "px";

    navigationItem.forEach((item: any) => {
      item.onclick = () => {
        document
          .querySelector(`.${style.navigationItem}.${style.active}`)
          ?.classList.remove(`${style.active}`);
        item.classList.add(`${style.active}`);
        line.style.left = item.offsetLeft + 13 + "px";
        line.style.width = item.offsetWidth - 26 + "px";
      };
    });
  }, []);
  return (
    <div className={`${style.headerContainer}`}>
      <div className={`${style.navigationContainer}`}>
        <div className={`${style.navigation}`}>
          <div className={`${style.navigationLeft}`}>
            <Link href="/">
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
              <Link
                href="/"
                className={`${style.navigationItem} ${style.active}`}
              >
                home
              </Link>
              <Link
                href="/pages/home/shirt"
                className={`${style.navigationItem}`}
              >
                shirt
              </Link>
              <Link
                href="/pages/home/trousers"
                className={`${style.navigationItem}`}
              >
                trousers
              </Link>
              <Link
                href="/pages/home/bagShoes"
                className={`${style.navigationItem}`}
              >
                Bag & Shoes
              </Link>
              <div className={`${style.line}`}></div>
            </div>
          </div>
          <div className={`${style.navigationRight}`}>
            <div className={`${style.navigationUser}`}>
              <div className={`${style.navigationUserItem} iconSearch`}>
                <Image
                  src="/icons/search.svg"
                  className={style.logo}
                  alt="Search"
                  fill
                  sizes="100vw"
                  priority={true}
                />
                <div className={`${style.navigationUserItemSearch} itemSearch`}>
                  <input
                    ref={searchInput}
                    type="text"
                    placeholder="Search for clothes ,..."
                  />
                </div>
              </div>
              {checkLogin}
              <div className={`${style.navigationUserItem}`}>
                <Image
                  src="/icons/heart.svg"
                  className={style.logo}
                  alt="Heart"
                  fill
                  sizes="100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.navigationUserItem}`}>
                <Image
                  src="/icons/bag.svg"
                  className={style.logo}
                  alt="Bag"
                  fill
                  sizes="100vw"
                  priority={true}
                />
              </div>
              {checkLogin ? (
                <div className={`${style.navigationNameUser}`}>
                  <h3>Lương Minh Quang</h3>
                </div>
              ) : (
                <Link href="/pages/account/login">
                  <button>Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
