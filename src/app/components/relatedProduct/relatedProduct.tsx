"use client";
import { data, login } from "@/app/data";
import CardProduct from "../cartProduct/cartProduct";
import TitleComponent from "../titleComponent/titleComponent";
import { useRecommendContext } from "@/app/context/RecommedContext";

const RelatedProduct = (props: any) => {
  const { styleCustom, data: related } = props;

  return (
    <>
      {related && (
        <div className="flex justify-center items-center px-pLayout mt-[32px]">
          <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
            <TitleComponent
              title="Related Products"
              styleCustom={styleCustom}
            />
            <div className="flex flex-wrap mx-mCard">
              {related?.map((item: any) => {
                return <CardProduct key={item._id} data={item} login={login} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedProduct;
