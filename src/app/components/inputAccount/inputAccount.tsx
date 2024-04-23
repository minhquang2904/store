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
      className={`${className} xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-button border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out`}
      onChange={onChange}
      style={style}
      ref={refer}
      autoComplete={autoComplete}
    />
  );
};

export default InputAccount;
