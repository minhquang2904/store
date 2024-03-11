import style from "./imageLogin.module.scss";
import Image from "next/image";
import { ImageLogin1, Logo } from "../../data";

export default function ImageLogin() {
  return (
    <div className={style.formImage}>
      <Image src={Logo} className={style.logo} alt="LOGO" layout="fill" />
      <Image
        src={ImageLogin1}
        className={style.image}
        alt="IMAGE"
        layout="fill"
      />
    </div>
  );
}
