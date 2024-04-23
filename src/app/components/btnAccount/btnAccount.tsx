const BtnAccount = (props: any) => {
  const { title, onClick } = props;
  return (
    <div
      className="bg-button p-[16px] xsm:py-[11px] sm:py-[11px] text-[1.6em] xsm:text-btnMobile sm:text-btnTablet l:text-btnDesktop rounded-[12px] text-center cursor-pointer select-none hover:bg-opacity-90 duration-700"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default BtnAccount;
