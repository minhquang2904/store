import { data, login } from "@/app/data";
import CardProduct from "../cardProductLike/cardProductLike";
import TitleComponent from "../titleComponent/titleComponent";
import { useState } from "react";

const RelatedProduct = (props: any) => {
  const { styleCustom } = props;
  const [dataList, setData] = useState(data);

  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitleComponent title="Related Products" styleCustom={styleCustom} />
        <div className="flex flex-wrap mx-mCard">
          {dataList.slice(0, 4).map((item: any) => {
            return <CardProduct key={item.id} data={item} login={login} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
