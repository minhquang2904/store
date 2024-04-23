const TitleInput = (props: any) => {
  const { title } = props;
  return (
    <h4 className="text-[1.4em] xsm:text-subMobile text-text font-[600] mb-[5px] capitalize">
      {title}
    </h4>
  );
};

export default TitleInput;
