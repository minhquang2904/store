const ContentTable = ({ title, styleCustom }: any) => {
  return (
    <td
      className={`font-normal px-[10px] py-[10px] text-text text-[1.6em] text-start capitalize ${styleCustom}`}
    >
      {title}
    </td>
  );
};

export default ContentTable;
