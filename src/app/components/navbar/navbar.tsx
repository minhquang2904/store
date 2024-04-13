"use client";

import Link from "next/link";
import style from "./navbar.module.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { login } from "@/app/data";

const NavBar = () => {
  const searchInput: any = useRef(null);
  const [checkLogin, setCheckLogin] = useState(login);
  const pathname = usePathname();

  const urlNavLink: any = ["/", "/shirt", "/trousers", "/bagShoes"];

  const colorIcon = "#e3e7f3";

  const checkNavActive = (url: string): string => {
    return pathname == `${url}`
      ? `${style.navigationItem} lineActive`
      : `${style.navigationItem}`;
  };

  useEffect(() => {
    const $ = document.querySelector.bind(document);

    const mainLayout: any = $(".mainLayout");
    const itemSearch: any = $(`.${style.navigationUserItemSearch}`);
    const cartContainer: any = $(`.${style.cartContainer}`);
    const positionTopNav: any = $(`.${style.headerContainer}`);

    const checkActiveIcon = (e: any) => {
      if (checkLogin && !cartContainer.contains(e.target)) {
        cartContainer?.classList.remove(style.active);
        (
          document.querySelector(`.${style.cartModal}`) as any
        ).style.backgroundColor = "unset";
      }
      if (!itemSearch.contains(e.target)) {
        itemSearch?.classList.remove(style.active);
        (
          document.querySelector(`.${style.navigationUserIconSearch}`) as any
        ).style.backgroundColor = "unset";
      }
    };

    mainLayout.addEventListener("click", checkActiveIcon);

    const addStyleNav = () => {
      positionTopNav.offsetTop > 80
        ? (positionTopNav.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)")
        : (positionTopNav.style.boxShadow = "unset");
    };

    window.addEventListener("scroll", addStyleNav);

    addStyleNav();
    return () => {
      window.addEventListener("scroll", () => {
        addStyleNav();
      });
      mainLayout.addEventListener("click", checkActiveIcon);
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
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const navigationItem = $$(`.${style.navigationItem}`);
    const line: any = $(`.${style.line}`);
    const navActive: any = $(`.${style.navigationItem}.lineActive`);

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

  const handleDeleteProduct = (e: any) => {
    e.preventDefault();
  };

  const handleShowCart = () => {
    document
      .querySelector(`.${style.cartContainer}`)
      ?.classList.toggle(style.active);
    (
      document.querySelector(`.${style.cartModal}`) as any
    ).style.backgroundColor = colorIcon;
  };

  const handleShowSearch = () => {
    document
      .querySelector(`.${style.navigationUserItemSearch}`)
      ?.classList.toggle(style.active);
    (
      document.querySelector(`.${style.navigationUserIconSearch}`) as any
    ).style.backgroundColor = colorIcon;
    searchInput.current.focus();
  };
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
              <div
                onClick={handleShowSearch}
                className={`${style.navigationUserItem} ${style.navigationUserIconSearch}`}
              >
                <Image
                  src="/icons/search.svg"
                  className={style.logo}
                  alt="Search"
                  fill
                  sizes="100vw"
                  priority={true}
                />
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`${style.navigationUserItemSearch}`}
                >
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
              {!checkLogin ? (
                <Link className={`${style.navigationUserItem}`} href="/login">
                  <Image
                    src="/icons/bag.svg"
                    className={style.logo}
                    alt="Bag"
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                </Link>
              ) : (
                <div
                  onClick={handleShowCart}
                  className={`${style.navigationUserItem} ${style.cartModal}`}
                >
                  <Image
                    src="/icons/bag.svg"
                    alt="Bag"
                    className={style.logo}
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                  <div
                    className={`${style.cartContainer}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h1 className={`${style.cartTitle}`}>
                      You have 3 items in your cart
                    </h1>
                    <ul>
                      <Link href="/productDetail">
                        <Image
                          src="/images/product2.png"
                          className={style.productImage}
                          alt="Bag"
                          fill
                          sizes="(max-width: 80px) 100vw"
                        />
                        <div className={`${style.cartInformation}`}>
                          <h2>Girls Pink Moana Printed Dress</h2>
                          <h3>1 x $80</h3>
                          <div className={`${style.cartInformationDelete}`}>
                            <h2>Size S</h2>
                            <div
                              className={`${style.cartInformationDeleteIcon}`}
                              onClick={handleDeleteProduct}
                            >
                              <Image
                                src="/icons/trash-can.svg"
                                className={style.trashDelete}
                                alt="Bag"
                                fill
                                sizes="(max-width: 22px) 100vw"
                                priority={true}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link href="/productDetail">
                        <Image
                          src="/images/product2.png"
                          className={style.productImage}
                          alt="Bag"
                          fill
                          sizes="(max-width: 80px) 100vw"
                        />
                        <div className={`${style.cartInformation}`}>
                          <h2>Girls Pink Moana Printed Dress</h2>
                          <h3>1 x $80</h3>
                          <div className={`${style.cartInformationDelete}`}>
                            <h2>Size S</h2>
                            <div
                              className={`${style.cartInformationDeleteIcon}`}
                              onClick={handleDeleteProduct}
                            >
                              <Image
                                src="/icons/trash-can.svg"
                                className={style.trashDelete}
                                alt="Bag"
                                fill
                                sizes="(max-width: 22px) 100vw"
                                priority={true}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link href="/productDetail">
                        <Image
                          src="/images/product2.png"
                          className={style.productImage}
                          alt="Bag"
                          fill
                          sizes="(max-width: 80px) 100vw"
                        />
                        <div className={`${style.cartInformation}`}>
                          <h2>Girls Pink Moana Printed Dress</h2>
                          <h3>1 x $80</h3>
                          <div className={`${style.cartInformationDelete}`}>
                            <h2>Size S</h2>
                            <div
                              className={`${style.cartInformationDeleteIcon}`}
                              onClick={handleDeleteProduct}
                            >
                              <Image
                                src="/icons/trash-can.svg"
                                className={style.trashDelete}
                                alt="Bag"
                                fill
                                sizes="(max-width: 22px) 100vw"
                                priority={true}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link href="/productDetail">
                        <Image
                          src="/images/product2.png"
                          className={style.productImage}
                          alt="Bag"
                          fill
                          sizes="(max-width: 80px) 100vw"
                        />
                        <div className={`${style.cartInformation}`}>
                          <h2>Girls Pink Moana Printed Dress</h2>
                          <h3>1 x $80</h3>
                          <div className={`${style.cartInformationDelete}`}>
                            <h2>Size S</h2>
                            <div
                              className={`${style.cartInformationDeleteIcon}`}
                              onClick={handleDeleteProduct}
                            >
                              <Image
                                src="/icons/trash-can.svg"
                                className={style.trashDelete}
                                alt="Bag"
                                fill
                                sizes="(max-width: 22px) 100vw"
                                priority={true}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </ul>
                    <div className={`${style.cartCheckout}`}>
                      <div className={`${style.cartCheckoutTitle}`}>
                        <h1>subtotal</h1>
                        <p>$200</p>
                      </div>
                      <Link
                        href="/cart"
                        className={`${style.cartCheckoutBtn} ${style.cartCheckoutBtnViewCart}`}
                      >
                        <button>View Cart</button>
                      </Link>
                      <Link
                        href="/"
                        className={`${style.cartCheckoutBtn} ${style.cartCheckoutBtnCheckout}`}
                      >
                        <button>Checkout</button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

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
