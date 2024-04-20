const SubTitleAccount = (props: any) => {
  const { title } = props;
  return (
    <p className="text-[1.6em] text-[#a4a1aa] font-normal mb-[30px] inline-block hover:opacity-80 duration-300 ease-out">
      {title}
    </p>
  );
};

export default SubTitleAccount;
