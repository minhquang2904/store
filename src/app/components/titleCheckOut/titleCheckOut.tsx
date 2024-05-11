const TitleCheckOut = (props: any) => {
  const { title } = props;
  return (
    <h1 className="sm:text-[3.2em] xsm:text-[2.8em] font-medium capitalize text-text mb-[30px]">
      {title}
    </h1>
  );
};

export default TitleCheckOut;
