import "./loadingModal.scss";
const LoadingModal = ({ title, loading, styleCustom, resultModal }: any) => {
  return (
    <div
      className={`bg-[transparent] fixed top-[0] left-[0] right-[0] flex justify-center duration-200 z-[1500] ${
        loading ? "translate-y-[15px]" : "translate-y-[-60px]"
      }`}
    >
      <div
        className={`bg-[#30B87B] shadow-md flex max-w-[200px] max-h-[40px] py-[16px] px-[20px] items-center justify-center rounded-[30px]  ${
          title == "Failed" && "!bg-secondary"
        } ${styleCustom}`}
      >
        {!resultModal && (
          <div className="lds-ring flex items-center select-none  mr-[14px]">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        <h1 className="text-white text-[1.4em] uppercase font-medium select-none line-clamp-1">
          {title || "Loading..."}
        </h1>
      </div>
    </div>
  );
};

export default LoadingModal;
