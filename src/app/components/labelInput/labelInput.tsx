const LabelInput = (props: any) => {
  const { name } = props;
  return (
    <label
      htmlFor={name}
      className="text-[1.4em] xsm:text-subMobile text-text font-[600] mb-[8px] capitalize block"
    >
      {name}
    </label>
  );
};

export default LabelInput;
