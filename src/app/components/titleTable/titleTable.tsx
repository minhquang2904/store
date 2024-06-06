const TitleTable = ({ title, styleCustom }: any) => {
  return (
    <th
      className={`p-[10px] text-text text-[1.6em] font-medium text-start capitalize border-b border-[#515d6d] ${styleCustom}`}
    >
      {title}
    </th>
  );
};

export default TitleTable;
