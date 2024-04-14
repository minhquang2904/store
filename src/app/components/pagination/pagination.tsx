import Link from "next/link";
import style from "./pagination.module.scss";
import IconArrowLeft from "../iconArrowLeft/iconArrowLeft";
import IconArrowRight from "../iconArrowRight/iconArrowRight";

const Pagination = (props: any) => {
  return (
    <div className={`${style.pagination}`}>
      <div className={`${style.paginationIconLeft}`}>
        <IconArrowLeft stroke="#ACAAB2" />
      </div>
      <div className={`${style.paginationPage}`}>
        <ul>
          <Link href="/" className={`${style.active}`}>
            1
          </Link>
          <Link href="/">2</Link>
          <Link href="/">3</Link>
          <Link href="/">4</Link>
          <Link href="/">5</Link>
        </ul>
      </div>
      <div className={`${style.paginationIconRight}`}>
        <IconArrowRight stroke="#333237" />
      </div>
    </div>
  );
};

export default Pagination;
