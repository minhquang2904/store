import "./loading.scss";
const Loading = (props: any) => {
  return (
    <div className="z-[5000] fixed top-[0] bottom-[0] left-[0] right-[0] bg-[#fff] flex justify-center items-center">
      <div className="loader select-none">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loading;
