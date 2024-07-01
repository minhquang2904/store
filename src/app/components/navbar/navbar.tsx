"use client";
import Link from "next/link";
import style from "./navbar.module.scss";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import NoItemCart from "../noItemCart/noItemCart";
import IconListsProduct from "../iconListsProduct/iconListProduct";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import { useCartContext } from "@/app/context/CartContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, setUser, setLoadingAuth } = useAuthContext();
  const { cart, setCart, triggerFetchCart } = useCartContext();

  const pathname = usePathname();
  const searchInput: any = useRef(null);
  const [navBottom, setNavBottom] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const { push } = useRouter();

  const urlNavLink: any = ["/", "/shirt", "/trousers", "/bagShoes"];

  const checkNavActive = (url: string): string => {
    return pathname == `${url}`
      ? `${style.navigationItem} lineActive`
      : `${style.navigationItem}`;
  };

  useEffect(() => {
    const $ = document.querySelector.bind(document);
    const positionTopNav: any = $(".headerContainer");
    const iconScrollTop: any = $(".iconScrollTop");

    const handleScrollTop = () => {
      positionTopNav.offsetTop > 80
        ? (positionTopNav.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)")
        : (positionTopNav.style.boxShadow = "unset");

      positionTopNav.offsetTop > 500
        ? iconScrollTop.classList.add("active")
        : iconScrollTop.classList.remove("active");
    };

    window.addEventListener("scroll", handleScrollTop);

    handleScrollTop();
    return () => window.removeEventListener("scroll", handleScrollTop);
  }, []);

  useEffect(() => {
    const $ = document.querySelector.bind(document);
    const mainLayout: any = $(".mainLayout");
    const cartContainer: any = $(`.${style.cartContainer}`);
    const userModal: any = $(`.${style.navigationNameUserModal}`);
    const cartIcon: any = $(".cartIcon");
    const profileName: any = $(".profileName");
    const profileIcon: any = $(".profileIcon");

    const checkActiveIcon = (e: any) => {
      const target = e.target;
      cartModal &&
        !cartContainer.contains(target) &&
        !cartIcon.contains(target) &&
        setCartModal(false);

      profileModal &&
        !userModal.contains(target) &&
        !profileName.contains(target) &&
        !profileIcon.contains(target) &&
        setProfileModal(false);
    };

    mainLayout.addEventListener("click", checkActiveIcon);

    return () => mainLayout.removeEventListener("click", checkActiveIcon);
  }, [cartModal, profileModal]);

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

    profileModal && setProfileModal(false);
    cartModal && setCartModal(false);
    setNavBottom(false);
    return () => {
      navigationItem.forEach((item: any) => {
        item.removeEventListener("click", handleClick);
      });
    };
  }, [pathname]);

  const handleSignOut = async () => {
    setLoadingAuth(true);
    try {
      const response = await fetch("/api/users/logout", { method: "POST" });
      const result = await response.json();
      const status = result.status;
      if (status === 200) {
        setUser(null);
        setCart(null);
        push("/");
      }
      setLoadingAuth(false);
    } catch (error) {
      console.error("Sign out failed!", error);
    }
  };

  const handleLoginClick = () => {
    push("/login");
  };
  const handleDeleteCartItem = (e: any, itemId: any) => {
    e.preventDefault();
    try {
      fetch(`/api/product/cart?id=${itemId}&userId=${cart?.userId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          const { message, status } = result;
          if (status === 200) {
            toast.success(message);
            triggerFetchCart();
          }
          if (status === 500) {
            toast.error(message);
          }
        });
    } catch (error) {
      console.error("There was a problem with deleting the cart item:", error);
    }
  };
  return (
    <>
      <div className="headerContainer min-h-80 flex justify-center items-center sticky top-[0] left-[0] right-[0] bg-primary z-20 l:px-pLayout xsm:px-pLayout sm:px-[15px]">
        <div className="flex w-full max-w-layout">
          <div className="h-20 mx-auto flex justify-between items-center w-full">
            <div className="flex items-center h-full">
              <Link href="/" className="!relative">
                <Image
                  src="/images/logo.svg"
                  className="!relative l:!max-w-[80%] xsm:!max-w-[60%] sm:!max-w-[70%]"
                  alt="LOGO"
                  fill
                  sizes="100vw"
                  priority={true}
                />
              </Link>
            </div>
            <div className="xsm:hidden sm:hidden l:flex">
              <div className="flex relative">
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
            <div className="xsm:block l:hidden !fixed bottom-[0] right-[0] left-[0] bg-button text-navMobile text-[1.6em] font-medium uppercase px-pLayout">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="py-[16px] flex shrink-0 grow-0 basis-2/4 !relative justify-center items-center"
                  >
                    <Image
                      src="/icons/home.svg"
                      className="!relative max-w-[20px] mr-[6px]"
                      alt="LOGO"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                    <h1>home</h1>
                  </Link>
                  <div
                    className="py-[16px] flex justify-center items-center shrink-0 grow-0 basis-2/4 navBottomList"
                    onClick={() => setNavBottom(!navBottom)}
                  >
                    <IconListsProduct navBottom={navBottom} />
                    <h1
                      className={`[&.activeNavLists]:text-[#ee4266] ${
                        navBottom ? "activeNavLists" : ""
                      }`}
                    >
                      Lists
                    </h1>
                  </div>
                </div>
                <div
                  className={`max-h-[0] overflow-hidden [&.activeNavBottom]:max-h-[400px] duration-300 [&.activeNavBottom]:ease-in ${
                    navBottom ? "activeNavBottom" : ""
                  }`}
                >
                  <div className="bg-[#222222] mb-[25px] mt-[10px] flex flex-col rounded-[4px] py-[6px]">
                    <Link href="/shirt" className="ml-[10px] py-[6px]">
                      shirt
                    </Link>
                    <Link href="/trousers" className="ml-[10px] py-[6px]">
                      trousers
                    </Link>
                    <Link href="/bagShoes" className="ml-[10px] py-[6px]">
                      Bag & Shoes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="cursor-pointer relative">
                  <div
                    onClick={() => {
                      setShowSearch(true);
                      setTimeout(() => {
                        searchInput.current.focus();
                      }, 100);
                    }}
                    className="!relative p-[10px] hover:bg-hover1 rounded-half"
                  >
                    <Image
                      src="/icons/search.svg"
                      className="!relative max-w-[24px]"
                      alt="Search"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                  </div>
                </div>
                {!user ? (
                  <div
                    className="hover:bg-hover1 cursor-pointer p-[10px] rounded-full relative"
                    onClick={handleLoginClick}
                  >
                    <Image
                      src="/icons/bag.svg"
                      className="!relative max-w-[22px]"
                      alt="Bag"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                  </div>
                ) : (
                  <>
                    <div className="pointer relative xsm:hidden sm:hidden l:flex">
                      <div
                        className="hover:bg-hover1 p-[10px] rounded-half !relative cursor-pointer cartIcon"
                        onClick={() => setCartModal(!cartModal)}
                      >
                        {cart && (
                          <div className="absolute top-[4px] right-[4px] z-50 bg-secondary text-white w-[16px] h-[16px] text-[1em] rounded-[50%] flex justify-center items-center">
                            <h1>{cart.items.length}</h1>
                          </div>
                        )}
                        <Image
                          src="/icons/bag.svg"
                          alt="Bag"
                          className="!relative max-w-[22px]"
                          fill
                          sizes="100vw"
                          priority={true}
                        />
                      </div>
                      {cartModal && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className={`${style.cartContainer} absolute top-[calc(100%+16.5px)] origin-top-right right-[0] w-[360px] rounded-sm bg-[#F3F4F4] cursor-default shadow-sm`}
                        >
                          <h1 className="w-full text-text text-base pl-[12px] mt-[16px] font-medium">
                            You have {cart?.items?.length || 0} items in your
                            cart
                          </h1>
                          <ul className="max-h-[312px] my-[16px] overflow-y-auto overscroll-y-contain">
                            {!cart ? (
                              <NoItemCart
                                className="max-w-[160px]"
                                title="No product"
                              />
                            ) : (
                              <>
                                {cart?.items
                                  ?.slice()
                                  ?.reverse()
                                  ?.map((item: any) => {
                                    return (
                                      <Link
                                        key={`${item._id} - ${item.productId._id}`}
                                        href={{
                                          pathname: "/productDetail",
                                          query: { id: item?.productId._id },
                                        }}
                                        className="p-[12px] !relative flex hover:bg-hover1 items-center"
                                      >
                                        <Image
                                          src={
                                            item.productId.files[0].url ||
                                            "/images/no-image.png"
                                          }
                                          className="!relative max-w-[80px] max-h-[80px] object-cover"
                                          alt="Bag"
                                          fill
                                          sizes="(max-width: 80px) 100vw"
                                        />
                                        <div className="flex flex-col justify-center ml-[16px] basis-full shrink grow-0">
                                          <h2 className="text-text text-[1.4em] font-medium capitalize">
                                            {item.productId.name}
                                          </h2>
                                          <h3 className="text-text text-[1.4em] my-[4px] font-bold flex gap-x-[4px]">
                                            <p>
                                              {item.quantity} x {item.price}
                                            </p>
                                            <p className="text-secondary">
                                              ({item.totalPriceItem})
                                            </p>
                                          </h3>
                                          <div className="flex justify-between items-center">
                                            <div className="text-text text-[1.4em] font-normal flex gap-x-[6px] items-center">
                                              <p className="h-full block">
                                                Size:
                                              </p>
                                              <p className="uppercase font-semibold h-full block">
                                                {item.size} - {item.color}
                                              </p>
                                            </div>
                                            <div
                                              className="!relative rounded-half"
                                              onClick={(e: any) =>
                                                handleDeleteCartItem(
                                                  e,
                                                  item._id
                                                )
                                              }
                                            >
                                              <Image
                                                src="/icons/trash-can.svg"
                                                className="!relative max-w-[24px] max-h-[24px]"
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
                          {cart && (
                            <div className="px-[12px]">
                              <div className="text-text flex justify-between font-semibold capitalize text-[1.4em] mb-[16px]">
                                <h1>subtotal</h1>
                                <p>{cart?.totalPrice || 0}</p>
                              </div>
                              <Link
                                href="/cart"
                                className="mt-[8px] mb-[16px] block"
                              >
                                <button className="hover:opacity-90 border-solid border-[1px] border-border inline-block text-[1.6em] bg-button px-[28px] py-[12px] rounded-sm  w-full font-medium text-white">
                                  Checkout
                                </button>
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <Link
                      className="p-[10px] rounded-half !relative cursor-pointer xsm:flex l:hidden"
                      href="/cart"
                    >
                      {cart && (
                        <div className="absolute top-[4px] right-[4px] z-50 bg-secondary text-white w-[16px] h-[16px] text-[1em] rounded-[50%] flex justify-center items-center">
                          <h1>{cart.items.length}</h1>
                        </div>
                      )}
                      <Image
                        src="/icons/bag.svg"
                        alt="Bag"
                        className="!relative max-w-[22px]"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                  </>
                )}

                {user ? (
                  <>
                    <div className="flex items-center relative">
                      <div className="h-full w-full ml-[10px] xsm:hidden sm:hidden l:flex">
                        <h3
                          className="cursor-pointer h-full w-full text-text text-[20px] flex shrink grow items-center profileName"
                          onClick={() => setProfileModal(!profileModal)}
                        >
                          {user?.email}
                        </h3>
                      </div>
                      <div className="xsm:block l:hidden !relative">
                        <Image
                          src="/icons/user.svg"
                          alt="Bag"
                          className="!relative max-w-[44px] p-[10px] pr-[0px] profileIcon"
                          fill
                          sizes="100vw"
                          priority={true}
                          onClick={() => setProfileModal(!profileModal)}
                        />
                      </div>
                      {profileModal && (
                        <div
                          className={`${style.navigationNameUserModal} origin-top-right absolute right-[0] top-[calc(100%+16.5px)] bg-white shadow-sm rounded-[12px] max-w-[400px] min-w-[200px] w-full`}
                        >
                          <div>
                            <div>
                              <Link
                                href="/profile"
                                className="hover:bg-hover1 flex items-center py-[12px] pl-[16px] pr-[16px]"
                              >
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
                                <h1 className="ml-[16px] text-text font-medium text-[1.6em]">
                                  My profile
                                </h1>
                              </Link>
                            </div>
                            <div className={`${style.navigationNameUserItem}`}>
                              <Link
                                href="/like"
                                className="hover:bg-hover1 flex items-center py-[12px] pl-[16px] pr-[16px]"
                              >
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

                                <h1 className="ml-[16px] text-text font-medium text-[1.6em]">
                                  Wish lists
                                </h1>
                              </Link>
                            </div>
                            <div
                              className={`${style.navigationNameUserItem} `}
                              onClick={handleSignOut}
                            >
                              <div className="hover:bg-hover1 flex items-center py-[12px] pl-[16px] pr-[16px] cursor-pointer">
                                <svg
                                  fill="none"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  width="22"
                                  xmlns="http://www.w3.org/2000/svg"
                                  stroke="#ee4266"
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
                                      fill="#ee4266"
                                      fillRule="evenodd"
                                    />
                                  </mask>
                                  <path
                                    clipRule="evenodd"
                                    d="m11.3192 22.0001h-4.88596c-2.444 0-4.433-1.989-4.433-4.435v-11.12898c0-2.446 1.989-4.436 4.433-4.436h4.87496c2.446 0 4.436 1.99 4.436 4.436v.932c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-.932c0-1.62-1.317-2.936-2.936-2.936h-4.87496c-1.617 0-2.933 1.316-2.933 2.936v11.12898c0 1.619 1.316 2.935 2.933 2.935h4.88596c1.612 0 2.925-1.312 2.925-2.924v-.943c0-.414.336-.75.75-.75s.75.336.75.75v.943c0 2.44-1.986 4.424-4.425 4.424z"
                                    fill="#ee4266"
                                    fillRule="evenodd"
                                  />
                                  <g mask="url(#a)">
                                    <path
                                      clipRule="evenodd"
                                      d="m21.7871 12.7501h-12.04101c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h12.04101c.414 0 .75.336.75.75s-.336.75-.75.75z"
                                      fill="#ee4266"
                                      fillRule="evenodd"
                                    />
                                  </g>
                                  <g mask="url(#b)">
                                    <path
                                      clipRule="evenodd"
                                      d="m18.8594 15.6661c-.192 0-.385-.073-.531-.221-.292-.294-.291-.768.002-1.06l2.394-2.385-2.394-2.38396c-.293-.292-.295-.766-.002-1.06.292-.294.766-.294 1.06-.002l2.928 2.91496c.142.14.221.332.221.531s-.079.391-.221.531l-2.928 2.916c-.146.146-.338.219-.529.219z"
                                      fill="#ee4266"
                                      fillRule="evenodd"
                                    />
                                  </g>
                                </svg>
                                <h1 className="ml-[16px] font-medium text-[1.6em] text-[#ee4266]">
                                  Sign out
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="ml-[10px] flex items-center justify-center"
                      onClick={handleLoginClick}
                    >
                      <button className="text-white bg-button hover:opacity-90 text-[1.6em] rounded-sm px-[26px] py-[10px]">
                        Login
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`l:px-[15px] xsm:px-[15px] sm:px-[15px] [&.activeSearch]:opacity-100 [&.activeSearch]:duration-300 [&.activeSearch]:visible invisible h-full flex opacity-0 top-[0] absolute right-[0] left-[0] origin-top-right z-10 bg-primary justify-center items-center ${
            showSearch ? "activeSearch" : ""
          }`}
        >
          <div className="!relative max-w-[1320px] w-full h-full flex items-center">
            <input
              ref={searchInput}
              type="text"
              placeholder="Search for clothes..."
              className="text-text xsm:text-[2em] sm:text-[2em] l:text-[3.4em] outline-none w-full inputSearch bg-primary	"
              contentEditable={true}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer ml-[16px] stroke-[#868995] hover:stroke-button duration-200 select-none"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => setShowSearch(false)}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(NavBar);
