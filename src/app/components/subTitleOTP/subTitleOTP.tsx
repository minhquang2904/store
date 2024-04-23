const SubTitleOtp = (props: any) => {
  const { title } = props;
  return (
    <p className="text-[1.6em] xsm:text-subMobile sm:text-subTablet l:text-subDesktop text-[#a4a1aa] font-normal mb-[20px] inline-block">
      {title}
    </p>
  );
};

export default SubTitleOtp;
