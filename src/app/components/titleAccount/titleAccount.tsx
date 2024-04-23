const TitleAccount = (props: any) => {
  const { title } = props;
  return (
    <h3 className="text-[3em] text-text font-bold xsm:text-titleMobile sm:text-titleTablet l:text-titleDesktop">
      {title}
    </h3>
  );
};

export default TitleAccount;
