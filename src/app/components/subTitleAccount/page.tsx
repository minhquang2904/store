import style from "./subTitleAccount.module.scss";

export default function SubTitleAccount(props: { title: string }) {
  return <p className={style.subTitle}>{props.title}</p>;
}
