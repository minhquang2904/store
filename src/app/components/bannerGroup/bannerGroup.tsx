import Link from "next/link";
import Image from "next/image";

export default function BannerGroup() {
  return (
    <div className="px-pLayout flex justify-center items-center">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <div className="grid sm:grid-cols-4 xsm:grid-cols-2 sm:grid-rows-[324px_324px] xsm:grid-rows-[200px_200px] gap-[15px]">
          <Link
            href={`/sub-categories?sub-categories=polo&page=1`}
            className="group sm:row-start-1 sm:col-start-1 sm:row-end-3 sm:col-end-3 !relative"
          >
            <Image
              src="/images/bannerGroup1.jpg"
              className="!relative object-cover"
              alt="LOGIN"
              fill
              sizes="(max-width: 648px),100vw"
              priority={true}
            />
            <div className="group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center absolute top-[0] left-[0] right-[0] bottom-[0] opacity-0">
              <div>
                <h1 className="uppercase l:text-[4em] sm:text-[3.4em] xsm:text-[2.6em] tracking-[10px] text-white">
                  POLO
                </h1>
              </div>
            </div>
          </Link>
          <Link
            href={`/sub-categories?sub-categories=jeans&page=1`}
            className="group sm:row-start-1 sm:col-start-3 sm:row-end-2 sm:col-end-5 !relative"
          >
            <Image
              src="/images/bannerGroup2.jpg"
              className="!relative object-cover object-right-top"
              alt="LOGIN"
              fill
              sizes="(max-width: 648px),100vw"
              priority={true}
            />
            <div className="group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center absolute top-[0] left-[0] right-[0] bottom-[0] opacity-0">
              <div>
                <h1 className="uppercase l:text-[4em] sm:text-[3.4em] xsm:text-[2.6em] tracking-[10px] text-white">
                  Jeans
                </h1>
              </div>
            </div>
          </Link>
          <Link
            href={`/sub-categories?sub-categories=t-shirt&page=1`}
            className="group sm:row-start-2 sm:col-start-3 sm:row-end-3 sm:col-end-4 !relative"
          >
            <Image
              src="/images/bannerGroup3.jpg"
              className="!relative object-cover"
              alt="LOGIN"
              fill
              sizes="(max-width: 648px),100vw"
              priority={true}
            />
            <div className="group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center absolute top-[0] left-[0] right-[0] bottom-[0] opacity-0">
              <div>
                <h1 className="uppercase l:text-[4em] sm:text-[3.4em] xsm:text-[2.6em] tracking-[10px] text-white">
                  T-shirt
                </h1>
              </div>
            </div>
          </Link>
          <Link
            href={`/sub-categories?sub-categories=shorts&page=1`}
            className="group sm:row-start-2 sm:col-start-4 sm:row-end-3 sm:col-end-5 !relative"
          >
            <Image
              src="/images/bannerGroup4.jpg"
              className="!relative object-cover"
              alt="LOGIN"
              fill
              sizes="(max-width: 648px),100vw"
              priority={true}
            />
            <div className="group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center absolute top-[0] left-[0] right-[0] bottom-[0] opacity-0">
              <div>
                <h1 className="uppercase l:text-[4em] sm:text-[3.4em] xsm:text-[2.6em] tracking-[10px] text-white">
                  shorts
                </h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
