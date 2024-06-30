"use client";

import dynamic from "next/dynamic";
import Banner from "../components/banner/banner";
import Brand from "../components/brand/brand";
import BannerGroup from "../components/bannerGroup/bannerGroup";
// const TemplateProductView = dynamic(
//   () => import("../components/template-product-view/templateProductView"),
//   {
//     loading: () => <LoadingPage />,
//     ssr: false,
//   }
// );
const TemplateProductSlider = dynamic(
  () => import("../components/template-product-slider/templateProductSlider"),
  {
    loading: () => <LoadingComponent />,
    ssr: false,
  }
);
import RelatedProduct from "../components/relatedProduct/relatedProduct";
import TemplateProductView from "../components/template-product-view/templateProductView";
import LoadingComponent from "../components/loadingComponent/loadingComponent";

const Home = () => {
  return (
    <>
      {/* <Banner /> */}
      <Brand />
      <BannerGroup />
      {/* <TemplateProductView /> */}
      <TemplateProductSlider />
      {/* <RelatedProduct
        styleCustom={{ textAlign: "center", marginBottom: "35px" }}
      /> */}
    </>
  );
};

export default Home;
