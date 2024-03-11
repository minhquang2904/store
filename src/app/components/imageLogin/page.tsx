import style from "./imageLogin.module.scss";
import Image from "next/image";
import { Logo } from "../../data";

export default function ImageLogin(props: { src: string }) {
  return (
    <div className={style.formImage}>
      <Image src={Logo} className={style.logo} alt="LOGO" layout="fill" />
      <Image
        src={props.src}
        className={style.image}
        alt="IMAGE"
        layout="fill"
      />
    </div>
  );
}
