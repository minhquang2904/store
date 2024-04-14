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
    }
    container.forEach((item: any, index: any) => {
      item.addEventListener("click", (e: any) => {
        checkMark[index].style.background == "rgb(19, 17, 24)"
          ? (checkMark[index].style.background = "transparent")
          : (checkMark[index].style.background = "rgb(19, 17, 24)");
      });
    });
  }, []);

  const handleCheckBox = (type: any) => {
    childParent(type);
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
                className={`${style.container}`}
                id={item.type}
                onClick={() => handleCheckBox(item.type)}
              >
                {/* <input type="checkbox" value={""} /> */}
                <span className={`${style.checkmark}`}></span>
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
                className={`${style.container}`}
                id={item.size}
                onClick={() => handleCheckBox(item.size)}
              >
                {/* <input type="checkbox" value={""} /> */}
                <span className={`${style.checkmark}`}></span>
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
