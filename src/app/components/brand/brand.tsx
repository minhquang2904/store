import style from "./brand.module.scss";
import BrandList from "../brandList/brandList";

export default function Brand() {
  return (
    <div className="flex justify-center items-center  px-[15px]">
      <div className={`${style.brandContainer} overflow-hidden`}>
        <div className={`${style.marquee} flex overflow-hidden select-none`}>
          <BrandList />
          <BrandList />
        </div>
      </div>
    </div>
  );
}
