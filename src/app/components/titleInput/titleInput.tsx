const TitleInput = (props: any) => {
  const { title } = props;
  return (
    <label
      htmlFor={title}
      className="text-[1.4em] xsm:text-subMobile text-text font-[600] mb-[5px] capitalize"
    >
      {title}
    </label>
  );
};

export default TitleInput;
