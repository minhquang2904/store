const InputAccount = (props: any) => {
  const {
    type,
    name,
    id,
    placeholder,
    value,
    onChange,
    className,
    style,
    refer,
    autoComplete,
  } = props;
  return (
    <input
      value={value}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`${className} w-full p-[16px] text-[1.6em] border-solid border-button border-[1px] rounded-[12px] outline-none text-text font-semibold hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out`}
      onChange={onChange}
      style={style}
      ref={refer}
      autoComplete={autoComplete}
    />
  );
};

export default InputAccount;
