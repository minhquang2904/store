import style from "./btnAccount.module.scss";

export default function BtnAccount(props: { title: string; onClick: any }) {
  return (
    <div className={`${style.btnLogin}`} onClick={props.onClick}>
      {props.title}
    </div>
  );
}
