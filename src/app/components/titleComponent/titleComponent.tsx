const TitleComponent = (props: any) => {
  const { title } = props;
  return (
    <h1 className="l:text-[4.6em] sm:text-[4em] xsm:text-[3.2em] font-medium capitalize text-center text-text">
      {title}
    </h1>
  );
};

export default TitleComponent;
