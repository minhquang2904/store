const LoadingComponent = ({ styleCustom }: any) => {
  return (
    <div
      className={`flex justify-center items-center px-pLayout min-h-[720px] ${styleCustom}`}
    >
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40 flex justify-center">
        <div className="border-[#ccc] h-[60px] w-[60px] animate-spin rounded-full border-4 border-t-button" />
      </div>
    </div>
  );
};

export default LoadingComponent;
