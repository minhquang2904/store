import style from "./showErrow.module.scss";

export default function ShowError(props: { style: any; error: any }) {
  return (
    <p className={`${style.error}`} style={props.style}>
      {props.error}
    </p>
  );
}
