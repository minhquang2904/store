const ShowError = (props: any) => {
  const { style, error } = props;
  return (
    <p
      className="text-[red] text-[1.3em] mt-[2px] font-medium h-[13px] invisible"
      style={style}
    >
      {error}
    </p>
  );
};

export default ShowError;
