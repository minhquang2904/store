import Link from "next/link";
import Image from "next/image";

const SubTitleFooter = (props: any) => {
  const { title } = props;
  return (
    <Link
      href=""
      className="text-[1.4em] text-sub capitalize mb-[12px] font-medium hover:text-text"
    >
      {title}
    </Link>
  );
};

const TitleFooter = (props: any) => {
  const { title } = props;
  return (
    <h1 className="text-text text-[1.6em] font-semibold mb-[16px]">{title}</h1>
  );
};

const Footer = () => {
  return (
    <>
      <div className="l:mt-[180px] xsm:mt-[100px] sm:mt-[100px] px-pLayout l:pb-[90px] xsm:pb-[80px] sm:pb-[80px]">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-layout">
            <div className="flex flex-wrap gap-y-[16px]">
              <div className="xsm:mb-[20px] sm:mb-[20px] l:mb-[0] shrink-0 grow-0 l:basis-1/4 xsm:basis-[100%] sm:basis-[100%]">
                <div className="xsm:flex sm:flex l:block flex-col justify-center items-center">
                  <Link
                    href="#"
                    className="!relative max-w-[110px] h-full block"
                  >
                    <Image
                      src="/images/logo.svg"
                      className="!relative w-full h-full"
                      alt="LOGO"
                      fill
                      sizes="100vw"
                      priority={true}
                    />
                  </Link>
                  <p className="sm:max-w-[500px] my-[32px] mx-0 text-[#00000080] text-[1.6em] font-normal xsm:text-center sm:text-center l:text-left">
                    Lorem ipsum dolor sit amet, consectetusr adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                  <div className="flex">
                    <Link
                      href="#"
                      className="!relative block mr-[36px] hover:before:content-[''] hover:before:absolute hover:before:top-[-50%] hover:before:right-[50%] hover:before:translate-x-[50%] hover:before:w-[40px] hover:before:h-[40px] hover:before:rounded-half hover:before:bg-hover1"
                    >
                      <Image
                        src="/icons/icon.svg"
                        className="!relative w-full h-full"
                        alt="LOGO"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                    <Link
                      href="#"
                      className="!relative block mr-[36px] hover:before:content-[''] hover:before:absolute hover:before:top-[-50%] hover:before:right-[50%] hover:before:translate-x-[50%] hover:before:w-[40px] hover:before:h-[40px] hover:before:rounded-half hover:before:bg-hover1"
                    >
                      <Image
                        src="/icons/icon1.svg"
                        className="!relative w-full h-full"
                        alt="LOGO"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                    <Link
                      href="#"
                      className="!relative block mr-[36px] hover:before:content-[''] hover:before:absolute hover:before:top-[-50%] hover:before:right-[50%] hover:before:translate-x-[50%] hover:before:w-[40px] hover:before:h-[40px] hover:before:rounded-half hover:before:bg-hover1"
                    >
                      <Image
                        src="/icons/icon2.svg"
                        className="!relative w-full h-full"
                        alt="LOGO"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                    <Link
                      href="#"
                      className="!relative block mr-[36px] hover:before:content-[''] hover:before:absolute hover:before:top-[-50%] hover:before:right-[50%] hover:before:translate-x-[50%] hover:before:w-[40px] hover:before:h-[40px] hover:before:rounded-half hover:before:bg-hover1"
                    >
                      <Image
                        src="/icons/icon3.svg"
                        className="!relative w-full h-full"
                        alt="LOGO"
                        fill
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shrink-0 grow-0 l:basis-1/4 xsm:basis-[100%] sm:basis-[100%]">
                <div className="xsm:flex sm:flex l:block flex-col justify-center items-center">
                  <TitleFooter title="CATALOG" />
                  <div className="flex flex-col xsm:items-center sm:items-center l:items-start">
                    <SubTitleFooter title="Necklaces" />
                    <SubTitleFooter title="hoodies" />
                    <SubTitleFooter title="Jewelry Box" />
                    <SubTitleFooter title="t-shirt" />
                    <SubTitleFooter title="jacket" />
                  </div>
                </div>
              </div>
              <div className="shrink-0 grow-0 l:basis-1/4 xsm:basis-[100%] sm:basis-[100%]">
                <div className="xsm:flex sm:flex l:block flex-col justify-center items-center">
                  <TitleFooter title="About us" />
                  <div className="flex flex-col xsm:items-center sm:items-center l:items-start">
                    <SubTitleFooter title="Our Producers" />
                    <SubTitleFooter title="Sitemap" />
                    <SubTitleFooter title="FAQ" />
                    <SubTitleFooter title="About Us" />
                    <SubTitleFooter title="Terms & Conditions" />
                  </div>
                </div>
              </div>
              <div className="shrink-0 grow-0 l:basis-1/4 xsm:basis-[100%] sm:basis-[100%]">
                <div className="xsm:flex sm:flex l:block flex-col justify-center items-center">
                  <TitleFooter title="CUSTOMER SERVICES" />
                  <div className="flex flex-col xsm:items-center sm:items-center l:items-start">
                    <SubTitleFooter title="Contact Us" />
                    <SubTitleFooter title="Track Your Order" />
                    <SubTitleFooter title="Product Care & Repair" />
                    <SubTitleFooter title="Book an Appointment" />
                    <SubTitleFooter title="Shipping & Returns" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1e2832] pb-[16px]">
        <div className="l:flex justify-center items-center xsm:hidden px-pLayout">
          <div className="w-full max-w-layout py-[10px] px-0 flex justify-between">
            <h1 className="text-[1.6em] capitalize text-white">
              © 2022 Coral , Inc.
            </h1>
            <div
              className="flex items-center cursor-pointer !relative hover:opacity-80"
              onClick={() => window.scroll(0, 0)}
            >
              <h3 className="text-[1.6em] text-white capitalize tracking-[2px] mr-[10px] select-none">
                Scroll to top
              </h3>
              <Image
                src="/icons/arrowUp.svg"
                className="!relative !w-[20px] !h-[20px]"
                alt="LOGO"
                fill
                sizes="100vw"
                priority={true}
              />
            </div>
          </div>
        </div>
        <div className="l:flex justify-center items-center xsm:hidden px-pLayout">
          <h1 className="w-full max-w-layout px-0 flex justify-between text-white text-[1.6em]">
            This website was created as part of a graduation thesis and is not
            an actual e-commerce site. All products and information are for
            illustrative purposes only.
          </h1>
        </div>
      </div>
      <div className="iconScrollTop [&.active]:xsm:flex [&.active]:sm:flex [&.active]:l:hidden bg-[#1e2832] w-[40px] h-[40px] rounded-[50%] l:hidden justify-center items-center xsm:hidden sm:hidden fixed bottom-[80px] right-[16px]">
        <div
          className="w-full max-w-layout py-[10px] px-0 flex items-center justify-center cursor-pointer"
          onClick={() => window.scroll(0, 0)}
        >
          <div className="flex items-center cursor-pointer !relative hover:opacity-80">
            <Image
              src="/icons/arrowUp.svg"
              className="!relative !w-[20px] !h-[20px]"
              alt="LOGO"
              fill
              sizes="100vw"
              priority={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
