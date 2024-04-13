const IconArrowRight = (props: any) => {
  const { stroke } = props;
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 48 48"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m0 0h48v48h-48z" fill="#fff" fillOpacity=".01" />
      <g
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="m41.9999 24h-35.99998" />
        <path d="m30 12 12 12-12 12" />
      </g>
    </svg>
  );
};
export default IconArrowRight;
