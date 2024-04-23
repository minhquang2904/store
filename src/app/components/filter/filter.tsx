import { useEffect } from "react";
import CheckIcon from "../checkIcon/checkIcon";
import { type, size } from "@/app/data";

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

  return (
    <div className="grow-0 shrink basis-[30%]">
      <div className="mb-[32px]">
        <h1 className="text-text text-[1.8em] capitalize mb-[16px] font-semibold flex flex-col">
          product categories
        </h1>
        <div>
          {type.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="container containerType block items-center relative select-none cursor-pointer py-[10px] pr-0 pl-[35px]"
                id={item.type}
                onClick={() => handleCheckBoxType(index, item.type)}
              >
                <span className="checkmark checkmarkType absolute inline-block top-2/4 left-0 translate-y-[-50%] w-[22px] h-[22px] border-solid rounded-[6px] bg-transparent	border-[1px] border-button"></span>
                <p className="text-text text-[1.6em] font-medium capitalize">
                  {item.type}
                </p>
                <CheckIcon />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-text text-[1.8em] capitalize mb-[16px] font-semibold flex flex-col">
          Filter by price
        </h1>
      </div>
      <div>
        <h1 className="text-text text-[1.8em] capitalize mb-[16px] font-semibold flex flex-col">
          Filter by size
        </h1>
        <div>
          {size.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="container containerSize block items-center relative select-none cursor-pointer py-[10px] pr-0 pl-[35px]"
                id={item.size}
                onClick={() => handleCheckBoxSize(index, item.size)}
              >
                <span className="checkmark checkmarkSize  absolute inline-block top-2/4 left-0 translate-y-[-50%] w-[22px] h-[22px] border-solid rounded-[6px] bg-transparent	border-[1px] border-button"></span>
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
    </div>
  );
};

export default Filter;
