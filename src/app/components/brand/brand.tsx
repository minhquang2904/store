import style from "./brand.module.scss";
import BrandList from "../brandList/brandList";

export default function Brand() {
  return (
    <div className={`${style.brand}`}>
      <div className={`${style.brandContainer}`}>
        <div className={`${style.marquee}`}>
          <BrandList />
          <BrandList />
        </div>
      </div>
    </div>
  );
}
