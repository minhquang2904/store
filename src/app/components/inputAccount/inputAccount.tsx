import style from "./inputAccount.module.scss";

export default function InputAccount(props: {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: any;
  onChange: any;
  className: string;
  style: any;
  refer: any;
}) {
  return (
    <input
      value={props.value}
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      className={`${style.inputAccount} ${props.className}`}
      onChange={props.onChange}
      style={props.style}
      ref={props.refer}
    />
  );
}
