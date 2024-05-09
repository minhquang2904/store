const CheckIcon = (props: any) => {
  const { styleCustom } = props;
  return (
    <div
      className="absolute top-[50%] left-[0] translate-y-[-50%] h-[22px] w-[22px] flex justify-center items-center"
      style={styleCustom}
    >
      <svg
        width="18"
        height="18"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 13L9 17L19 7"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CheckIcon;
