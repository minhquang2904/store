import "./loading.scss";
const Loading = (props: any) => {
  return (
    <div className="fixed top-[0] bottom-[0] left-[0] right-[0] bg-[rgba(0,0,0,0.48)] z-50 flex justify-center items-center">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loading;
