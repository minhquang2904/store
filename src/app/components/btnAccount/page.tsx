import style from "./btnAccount.module.scss";

export default function BtnAccount(props: { title: string }) {
  return <div className={`${style.btnLogin}`}>{props.title}</div>;
}
