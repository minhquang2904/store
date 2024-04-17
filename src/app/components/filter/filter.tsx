import { useEffect } from "react";
import style from "./filter.module.scss";
import CheckIcon from "../checkIcon/checkIcon";
import { type, size } from "@/app/data";

const Filter = (props: any) => {
  const { checkType, childParent } = props;
  useEffect(() => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const container: any = $$(`.${style.container}`);
    const checkMark: any = $$(`.${style.checkmark}`);

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

  const setAndRemoveAttr = (getAttr: any, element: any, type: any) => {
    if (getAttr == null) {
      element.setAttribute("checked", "active");
      childParent(type, "active");
    }
    if (getAttr == "active") {
      element.removeAttribute("checked");
      childParent(type, "");
    }
  };

  const handleCheckBoxType = (index: any, type: any) => {
    const element: any = getTag("containerType", "checkmarkType", index);
    const getAttr = element.getAttribute("checked", "active");

    setAndRemoveAttr(getAttr, element, type);
  };

  const handleCheckBoxSize = (index: any, type: any) => {
    const element: any = getTag("containerSize", "checkmarkSize", index);
    const getAttr = element.getAttribute("checked", "active");

    setAndRemoveAttr(getAttr, element, type);
  };

  return (
    <div className={`${style.filterContentLeft}`}>
      <div className={`${style.filterContentFilter}`}>
        <h1 className={`${style.filterContentProductTitle}`}>
          product categories
        </h1>
        <div className={`${style.filterContentFilterCheckBox}`}>
          {type.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className={`${style.container} containerType`}
                id={item.type}
                onClick={() => handleCheckBoxType(index, item.type)}
              >
                <span className={`${style.checkmark} checkmarkType`}></span>
                <p>{item.type}</p>
                <CheckIcon />
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${style.filterContentFilter}`}>
        <h1 className={`${style.filterContentProductTitle}`}>
          Filter by price
        </h1>
      </div>
      <div className={`${style.filterContentFilter}`}>
        <h1 className={`${style.filterContentProductTitle}`}>Filter by size</h1>
        <div className={`${style.filterContentFilterCheckBox}`}>
          {size.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className={`${style.container} containerSize`}
                id={item.size}
                onClick={() => handleCheckBoxSize(index, item.size)}
              >
                <span className={`${style.checkmark} checkmarkSize`}></span>
                <p style={{ textTransform: "uppercase" }}>{item.size}</p>
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
