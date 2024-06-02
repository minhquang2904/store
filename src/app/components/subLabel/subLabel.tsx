const SubLabel = ({ title, styleCustom }: any) => {
  return (
    <div
      className={`mb-[12px] text-[1.3em] font-normal text-[#8d8c8c] ${styleCustom}`}
    >
      {title}
    </div>
  );
};

export default SubLabel;
