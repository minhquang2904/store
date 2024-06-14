const LoadingTable = () => {
  return (
    <div className="absolute top-[0] bottom-[0] left-[0] right-[0] flex items-center justify-center">
      <div className="flex-col gap-[20px] w-full flex items-center justify-center">
        <div className="w-[60px] h-[60px] border-[4px] text-button text-4xl animate-spin border-[#D1D5DB] flex items-center justify-center border-t-button rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingTable;
