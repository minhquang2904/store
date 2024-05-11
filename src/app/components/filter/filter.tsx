import { useEffect } from "react";
import Image from "next/image";
import CheckIcon from "../checkIcon/checkIcon";
import { type, size } from "@/app/data";

const TitleFilter = (props: any) => {
  const { title } = props;
  return (
    <h1 className="text-text text-[1.8em] capitalize mb-[8px] xsm:mb-[0] sm:mb-[0] font-semibold flex flex-col">
      {title}
    </h1>
  );
};

const Filter = (props: any) => {
  const { checkType, childParentType, childParentSize } = props;
  useEffect(() => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const container: any = $$(".container");
    const checkMark: any = $$(".checkmark");

    if (checkType) {
      ($(`#${checkType} > span`) as any).style.background = "rgb(19, 17, 24)";
      ($(`#${checkType} > span`) as any).setAttribute("checked", "active");
    }

    const checkBoxActive = (index: any) => {
      checkMark[index].style.background == "rgb(19, 17, 24)"
        ? (checkMark[index].style.background = "transparent")
        : (checkMark[index].style.background = "rgb(19, 17, 24)");
    };

    container.forEach((item: any, index: any) => {
      item.addEventListener("click", () => checkBoxActive(index));
    });

    return () => {
      container.forEach((item: any, index: any) => {
        item.removeEventListener("click", () => checkBoxActive(index));
      });
    };
  }, []);

  const getTag = (parent: any, child: any, index: any) => {
    return document
      .querySelectorAll(`.${parent}`)
      [index].querySelector(`.${child}`);
  };

  const setAndRemoveAttrType = (getAttr: any, element: any, type: any) => {
    if (getAttr == null) {
      element.setAttribute("checked", "active");
      childParentType(type, "active");
    }
    if (getAttr == "active") {
      element.removeAttribute("checked");
      childParentType(type, "");
    }
  };

  const setAndRemoveAttrSize = (getAttr: any, element: any, type: any) => {
    if (getAttr == null) {
      element.setAttribute("checked", "active");
      childParentSize(type, "active");
    }
    if (getAttr == "active") {
      element.removeAttribute("checked");
      childParentSize(type, "");
    }
  };

  const handleCheckBoxType = (index: any, type: any) => {
    const element: any = getTag("containerType", "checkmarkType", index);
    const getAttr = element.getAttribute("checked", "active");

    setAndRemoveAttrType(getAttr, element, type);
  };

  const handleCheckBoxSize = (index: any, type: any) => {
    const element: any = getTag("containerSize", "checkmarkSize", index);
    const getAttr = element.getAttribute("checked", "active");

    setAndRemoveAttrSize(getAttr, element, type);
  };

  const handleShowFilter = () => {
    document.querySelector(".filterIcon")?.classList.toggle("activeFilter");
  };

  return (
    <div className="w-full l:w-[30%] mr-[16px]">
      <div
        className="xsm:inline-flex sm:inline-flex l:hidden mb-[16px] bg-button items-center justify-center px-[20px] py-[8px] rounded-[10px]"
        onClick={handleShowFilter}
      >
        <svg
          width="20"
          height="20"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-white text-[2em] ml-[8px]">Filter</h1>
      </div>
      <div className="filterIcon duration-500 ease-in-out xsm:max-h-[0] sm:max-h-[0] l:!max-h-[100%] l:h-[100%] [&.activeFilter]:xsm:max-h-[800px] [&.activeFilter]:sm:max-h-[800px] overflow-hidden flex flex-col">
        <div className="mb-[16px] xsm:mb-[8px]">
          <TitleFilter title="product categories" />
          <div className="flex flex-col xsm:flex-row sm:flex-row flex-wrap">
            {type.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="container containerType xsm:w-[33.3333333%] sm:w-[20%] l:w-full xsm:pr-[8px] sm:pr-[8px] items-center relative select-none cursor-pointer py-[10px] l:pr-[0] pl-[35px]"
                  id={item.type}
                  onClick={() => handleCheckBoxType(index, item.type)}
                >
                  <span className="checkmark checkmarkType absolute inline-block top-2/4 left-[0] translate-y-[-50%] w-[22px] h-[22px] border-solid rounded-[6px] bg-transparent	border-[1px] border-button"></span>
                  <p className="text-text text-[1.6em] font-medium capitalize">
                    {item.type}
                  </p>
                  <CheckIcon />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-[16px] xsm:mb-[8px]">
          <TitleFilter title="Filter by size" />
          <div className="flex flex-col xsm:flex-row sm:flex-row flex-wrap">
            {size.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="container containerSize xsm:w-[33.3333333%] sm:w-[20%] l:w-full xsm:pr-[8px] sm:pr-[8px] items-center relative select-none cursor-pointer py-[10px] l:pr-[0] pl-[35px]"
                  id={item.size}
                  onClick={() => handleCheckBoxSize(index, item.size)}
                >
                  <span className="checkmark checkmarkSize  absolute inline-block top-2/4 left-[0] translate-y-[-50%] w-[22px] h-[22px] border-solid rounded-[6px] bg-transparent	border-[1px] border-button"></span>
                  <p
                    className="text-text text-[1.6em] font-medium capitalize"
                    style={{ textTransform: "uppercase" }}
                  >
                    {item.size}
                  </p>
                  <CheckIcon />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <TitleFilter title="Filter by price" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
