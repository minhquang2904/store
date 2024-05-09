const TitleComponent = (props: any) => {
  const { title, styleCustom } = props;
  return (
    <h1
      className="l:text-[4em] sm:text-[3.6em] xsm:text-[3.2em] font-normal capitalize text-center text-text"
      style={styleCustom}
    >
      {title}
    </h1>
  );
};

export default TitleComponent;
