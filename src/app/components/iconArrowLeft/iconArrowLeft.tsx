const IconArrowLeft = (props: any) => {
  const { stroke } = props;
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.8"
      >
        <path d="m9.57 5.92993-6.07 6.06997 6.07 6.07" />
        <path d="m20.5 12h-16.82996" />
      </g>
    </svg>
  );
};

export default IconArrowLeft;
