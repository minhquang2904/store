import { useEffect } from "react";
import CheckIcon from "../checkIcon/checkIcon";
import { type, size } from "@/app/data";
const TitleFilter = (props: any) => {
  const { title } = props;
  return (
    <h1 className="text-text text-[1.8em] capitalize mb-[8px] font-semibold flex flex-col">
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
        className="text-text text-[2.8em] xsm:block sm:block l:hidden mb-[16px]"
        onClick={handleShowFilter}
      >
        Filter
      </div>
      <div className="filterIcon duration-500 ease-in-out xsm:max-h-[0] sm:max-h-[0] l:max-h-[100%] l:h-[100%] [&.activeFilter]:xsm:max-h-[500px] [&.activeFilter]:sm:max-h-[500px] overflow-hidden flex sm:flex-row l:flex-col flex-wrap sm:gap-x-[60px] xsm:gap-x-[60px]">
        <div className="mb-[32px]">
          <TitleFilter title="product categories" />
          <div>
            {type.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="container containerType block items-center relative select-none cursor-pointer py-[10px] pr-[0] pl-[35px]"
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
        <div className="mb-[32px]">
          <TitleFilter title="Filter by size" />
          <div>
            {size.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="container containerSize block items-center relative select-none cursor-pointer py-[10px] pr-[0] pl-[35px]"
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
