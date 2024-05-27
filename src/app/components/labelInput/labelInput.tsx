const LabelInput = (props: any) => {
  const { name, id, styleCustom } = props;
  return (
    <label
      htmlFor={id || name}
      className={`text-[1.4em] xsm:text-subMobile text-text font-[600] mb-[8px] capitalize block ${styleCustom}`}
    >
      {name}
    </label>
  );
};

export default LabelInput;
