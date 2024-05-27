import style from "./loadingLists.module.scss";
const LoadingLists = () => {
  return (
    <div className="flex justify-center items-center h-[100px]">
      <svg viewBox="25 25 50 50" className={`${style.svg}`}>
        <circle r="20" cy="50" cx="50" className={`${style.circle}`}></circle>
      </svg>
    </div>
  );
};

export default LoadingLists;
