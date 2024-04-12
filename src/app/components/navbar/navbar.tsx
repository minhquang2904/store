"use client";

import Link from "next/link";
import style from "./navbar.module.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { login } from "@/app/data";
interface pageProps {
  params: { slug: string };
}
const NavBar = () => {
  const searchInput: any = useRef(null);
  const [checkLogin, setCheckLogin] = useState(login);
  const pathname = usePathname();

  const urlNavLink: any = ["/", "/shirt", "/trousers", "/bagShoes"];

  const checkNavActive = (url: string): string => {
    return pathname == `${url}`
      ? `${style.navigationItem} lineActive`
      : `${style.navigationItem}`;
  };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        searchInput.current.focus();
        e.stopPropagation();
      });
      mainLayout.addEventListener("click", (e: any) => {
        itemSearch.classList.remove(style.showSearch);
      });
    };
  }, []);

  const lineActive = (target: any, navActive: any, width: any) => {
    const sizeWidth = width;
    const sizeLeft = sizeWidth / 2;
    if (navActive) {
      target.style.left = navActive?.offsetLeft + sizeLeft + "px";
      target.style.width = navActive?.offsetWidth - sizeWidth + "px";
    } else {
      target.style.left = 0 + "px";
      target.style.width = 0 + "px";
    }
  };

  useEffect(() => {
    const navigationItem = document.querySelectorAll(
      `.${style.navigationItem}`
    );
    const line: any = document.querySelector(`.${style.line}`);
    const navActive: any = document.querySelector(
      `.${style.navigationItem}.lineActive`
    );

    lineActive(line, navActive, 26);
    navActive && navActive.classList.add(`${style.active}`);

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains(style.navigationItem)) {
        target.classList.add(`${style.active}`);
        lineActive(line, target, 26);
      }
    };

    navigationItem.forEach((item: any) => {
      item.addEventListener("click", handleClick);
    });

    if (!urlNavLink.includes(pathname)) {
      lineActive(line, navActive, 0);
    }
    return () => {
      navigationItem.forEach((item: any) => {
        item.removeEventListener("click", handleClick);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = (e: any) => {};

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
              <Link href="/" className={checkNavActive("/")}>
                home
              </Link>
              <Link href="/shirt" className={checkNavActive("/shirt")}>
                shirt
              </Link>
              <Link href="/trousers" className={checkNavActive("/trousers")}>
                trousers
              </Link>
              <Link href="/bagShoes" className={checkNavActive("/bagShoes")}>
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
              <Link
                className={`${style.navigationUserItem}`}
                href={checkLogin ? "/like" : "/login"}
              >
                <Image
                  src="/icons/heart.svg"
                  className={style.logo}
                  alt="Heart"
                  fill
                  sizes="100vw"
                  priority={true}
                />
              </Link>
              <Link
                className={`${style.navigationUserItem}`}
                href={checkLogin ? "/cart" : "/login"}
              >
                <Image
                  src="/icons/bag.svg"
                  className={style.logo}
                  alt="Bag"
                  fill
                  sizes="100vw"
                  priority={true}
                />
              </Link>
              {checkLogin ? (
                <div className={`${style.navigationNameUser}`}>
                  <h3>Lương Minh Quang</h3>
                </div>
              ) : (
                <Link href="/login">
                  <button>Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
