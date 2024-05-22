const LabelInput = (props: any) => {
  const { name, id } = props;
  return (
    <label
      htmlFor={id || name}
      className="text-[1.4em] xsm:text-subMobile text-text font-[600] mb-[8px] capitalize block"
    >
      {name}
    </label>
  );
};

export default LabelInput;
