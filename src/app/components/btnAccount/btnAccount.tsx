const BtnAccount = (props: any) => {
  const { title, disabled, type } = props;
  return (
    <button
      type={type}
      className="bg-button text-white p-[16px] xsm:py-[11px] mt-[30px] w-full sm:py-[11px] text-[1.6em] xsm:text-btnMobile sm:text-btnTablet l:text-btnDesktop rounded-[12px] text-center cursor-pointer select-none hover:bg-opacity-90 duration-700"
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default BtnAccount;
