const SubTitleAccount = (props: any) => {
  const { title } = props;
  return (
    <p className="xsm:text-subMobile sm:text-subTablet l:text-subDesktop text-[1.6em] text-[#a4a1aa] font-normal inline-block hover:opacity-80 duration-300 ease-out">
      {title}
    </p>
  );
};

export default SubTitleAccount;
