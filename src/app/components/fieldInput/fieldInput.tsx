import { Field } from "formik";

const FieldInput = (props: any) => {
  const { type, name, styleCustom, placeholder, refer, autocomplete } = props;
  return (
    <Field
      autoComplete={autocomplete}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      innerRef={refer}
      className={`${styleCustom} xsm:text-subMobile sm:text-subTablet l:text-subDesktop w-full font-medium p-[16px] xsm:py-[10px] sm:py-[10px] text-[1.6em] border-solid border-button border-[1px] rounded-[12px] outline-none text-text hover:bg-[rgba(151,179,231,0.3)] duration-300 ease-out`}
    />
  );
};

export default FieldInput;
