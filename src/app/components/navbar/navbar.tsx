import Link from "next/link";
import style from "./navbar.module.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { login, data } from "@/app/data";
import NoItemCart from "../noItemCart/noItemCart";

const NavBar = () => {
  const searchInput: any = useRef(null);
  const [checkLogin, setCheckLogin] = useState(login);
  const [dataList, setDataList] = useState(data);
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
    const userModal: any = $(`.${style.navigationNameUserModal}`);

    const checkActiveIcon = (e: any) => {
      if (checkLogin && !cartContainer.contains(e.target)) {
        cartContainer?.classList.remove(style.active);
        ($(`.${style.cartModal}`) as any).style.backgroundColor = "unset";
      }
      if (checkLogin && !userModal.contains(e.target)) {
        userModal?.classList.remove(style.active);
      }
      if (!itemSearch.contains(e.target)) {
        itemSearch?.classList.remove(style.active);
        ($(`.${style.navigationUserIconSearch}`) as any).style.backgroundColor =
          "unset";
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
    cc;
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

  const ToggleShowActive = (className: any) => {
    document.querySelector(`.${className}`)?.classList.toggle(style.active);
  };

  const BgColorActive = (className: any) => {
    (document.querySelector(`.${className}`) as any).style.backgroundColor =
      colorIcon;
  };

  const handleShowSearch = () => {
    ToggleShowActive(style.navigationUserItemSearch);
    BgColorActive(style.navigationUserIconSearch);
    searchInput.current.focus();
  };

  const handleShowCart = () => {
    ToggleShowActive(style.cartContainer);
    BgColorActive(style.cartModal);
  };

  const handleShowProfile = () => {
    ToggleShowActive(style.navigationNameUserModal);
  };

  const handleDeleteProduct = (e: any) => {
    e.preventDefault();
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
                      {dataList.length <= 0 ? (
                        <NoItemCart styleCustom={{ maxWidth: "180px" }} />
                      ) : (
                        <>
                          {dataList.map((item: any) => {
                            return (
                              <Link key={item.id} href="/productDetail">
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
                                  <div
                                    className={`${style.cartInformationDelete}`}
                                  >
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
                            );
                          })}
                        </>
                      )}
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
                  <h3 onClick={handleShowProfile}>Lương Minh Quang</h3>
                  <div className={`${style.navigationNameUserModal}`}>
                    <div className={`${style.navigationNameUserContainer}`}>
                      <div className={`${style.navigationNameUserItem}`}>
                        <Link href="/profile">
                          <svg
                            height="20"
                            viewBox="0 0 32 32"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m16 8a5 5 0 1 0 5 5 5 5 0 0 0 -5-5zm0 8a3 3 0 1 1 3-3 3.0034 3.0034 0 0 1 -3 3z" />
                            <path d="m16 2a14 14 0 1 0 14 14 14.0158 14.0158 0 0 0 -14-14zm-6 24.3765v-1.3765a3.0033 3.0033 0 0 1 3-3h6a3.0033 3.0033 0 0 1 3 3v1.3765a11.8989 11.8989 0 0 1 -12 0zm13.9925-1.4507a5.0016 5.0016 0 0 0 -4.9925-4.9258h-6a5.0016 5.0016 0 0 0 -4.9925 4.9258 12 12 0 1 1 15.985 0z" />
                            <path d="m0 0h32v32h-32z" fill="none" />
                          </svg>
                          <h1>My profile</h1>
                        </Link>
                      </div>
                      <div className={`${style.navigationNameUserItem}`}>
                        <Link href="/like">
                          <svg
                            width="20"
                            height="20"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"
                              stroke="#131118"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <h1>Wish lists</h1>
                        </Link>
                      </div>
                      <div
                        className={`${style.navigationNameUserItem} ${style.navigationNameUserItemLogout}`}
                      >
                        <Link href="">
                          <svg
                            fill="none"
                            height="22"
                            viewBox="0 0 24 24"
                            width="22"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <mask
                              id="a"
                              height="2"
                              maskUnits="userSpaceOnUse"
                              width="15"
                              x="8"
                              y="11"
                            >
                              <path
                                clipRule="evenodd"
                                d="m8.99609 11.2501h13.54091v1.5h-13.54091z"
                                fill="#fff"
                                fillRule="evenodd"
                              />
                            </mask>
                            <mask
                              id="b"
                              height="8"
                              maskUnits="userSpaceOnUse"
                              width="5"
                              x="18"
                              y="8"
                            >
                              <path
                                clipRule="evenodd"
                                d="m18.1096 8.33539h4.4274v7.33071h-4.4274z"
                                fill="#fff"
                                fillRule="evenodd"
                              />
                            </mask>
                            <path
                              clipRule="evenodd"
                              d="m11.3192 22.0001h-4.88596c-2.444 0-4.433-1.989-4.433-4.435v-11.12898c0-2.446 1.989-4.436 4.433-4.436h4.87496c2.446 0 4.436 1.99 4.436 4.436v.932c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-.932c0-1.62-1.317-2.936-2.936-2.936h-4.87496c-1.617 0-2.933 1.316-2.933 2.936v11.12898c0 1.619 1.316 2.935 2.933 2.935h4.88596c1.612 0 2.925-1.312 2.925-2.924v-.943c0-.414.336-.75.75-.75s.75.336.75.75v.943c0 2.44-1.986 4.424-4.425 4.424z"
                              fill="#FF6F61"
                              fillRule="evenodd"
                            />
                            <g mask="url(#a)">
                              <path
                                clipRule="evenodd"
                                d="m21.7871 12.7501h-12.04101c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h12.04101c.414 0 .75.336.75.75s-.336.75-.75.75z"
                                fill="#FF6F61"
                                fillRule="evenodd"
                              />
                            </g>
                            <g mask="url(#b)">
                              <path
                                clipRule="evenodd"
                                d="m18.8594 15.6661c-.192 0-.385-.073-.531-.221-.292-.294-.291-.768.002-1.06l2.394-2.385-2.394-2.38396c-.293-.292-.295-.766-.002-1.06.292-.294.766-.294 1.06-.002l2.928 2.91496c.142.14.221.332.221.531s-.079.391-.221.531l-2.928 2.916c-.146.146-.338.219-.529.219z"
                                fill="#FF6F61"
                                fillRule="evenodd"
                              />
                            </g>
                          </svg>
                          <h1>Sign out</h1>
                        </Link>
                      </div>
                    </div>
                  </div>
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
