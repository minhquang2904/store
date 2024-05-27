const BtnAccount = (props: any) => {
  const { title, disabled, type, styleCustom, onClick } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        disabled ? "opacity-60" : "opacity-100"
      } border-solid bg-button border-[1px] text-white p-[16px] xsm:py-[11px] mt-[30px] w-full sm:py-[11px] text-[1.6em] xsm:text-btnMobile sm:text-btnTablet l:text-btnDesktop rounded-[16px] text-center cursor-pointer select-none hover:bg-opacity-90 duration-700 ${styleCustom}`}
      disabled={disabled}
    >
      {title ? `${title}` : <> {disabled ? "Submitting..." : "Submit"}</>}
    </button>
  );
};

export default BtnAccount;
