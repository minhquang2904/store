import style from "./imageLogin.module.scss";
import Image from "next/image";
import { Logo } from "../../data";

export default function ImageLogin(props: { src: string }) {
  return (
    <div className={style.formImage}>
      <Image src={Logo} className={style.logo} alt="LOGO" fill sizes="100vw" />
      <Image src={props.src} className={style.image} alt="IMAGE" fill sizes="100vw" />
    </div>
  );
}
