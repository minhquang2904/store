import style from "./brand.module.scss";
import BrandList from "../brandList/brandList";

export default function Brand() {
  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="overflow-hidden w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <div className={`${style.marquee} flex overflow-hidden select-none`}>
          <BrandList />
          <BrandList />
        </div>
      </div>
    </div>
  );
}
