const TitlePageAmin = ({ title, styleCustom }: any) => {
  return (
    <h1
      className={`text-text text-[1.4em] uppercase font-medium py-[10px] mb-[16px] ${styleCustom}`}
    >
      {title}
    </h1>
  );
};

export default TitlePageAmin;
