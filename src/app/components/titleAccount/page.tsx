import style from "./titleAccount.module.scss";

export default function TitleAccount(props: { title: string }) {
  return <h3 className={style.title}>{props.title}</h3>;
}
