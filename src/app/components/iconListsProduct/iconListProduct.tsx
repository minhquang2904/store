const IconListsProduct = (props: any) => {
  const { navBottom } = props;
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 14 14"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-[6px]"
    >
      <g
        stroke="currentColor"
        className={`[&.activeNavIconLists]:stroke-[#ee4266] ${
          navBottom ? "activeNavIconLists" : ""
        }`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m1 3c.27614 0 .5-.22386.5-.5s-.22386-.5-.5-.5c-.276142 0-.5.22386-.5.5s.223858.5.5.5z" />
        <path d="m4.5 2.5h9" />
        <path d="m1 7.5c.27614 0 .5-.22386.5-.5s-.22386-.5-.5-.5c-.276142 0-.5.22386-.5.5s.223858.5.5.5z" />
        <path d="m4.5 7h9" />
        <path d="m1 12c.27614 0 .5-.2239.5-.5s-.22386-.5-.5-.5c-.276142 0-.5.2239-.5.5s.223858.5.5.5z" />
        <path d="m4.5 11.5h9" />
      </g>
    </svg>
  );
};

export default IconListsProduct;
