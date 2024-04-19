const BtnAccount = (props: any) => {
  const { title, onClick } = props;
  return (
    <div
      className="bg-button p-[16px] text-[1.6em] rounded-[12px] text-center cursor-pointer select-none hover:bg-opacity-90 duration-700"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default BtnAccount;
