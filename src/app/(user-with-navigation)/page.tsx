"use client";

import Banner from "../components/banner/banner";
import Brand from "../components/brand/brand";
import BannerGroup from "../components/bannerGroup/bannerGroup";
import TemplateProductView from "../components/template-product-view/templateProductView";
import TemplateProductSlider from "../components/template-product-slider/templateProductSlider";

const Home = () => {
  return (
    <>
      <Banner />
      <Brand />
      <BannerGroup />
      <TemplateProductView />
      <TemplateProductSlider />
    </>
  );
};

export default Home;
