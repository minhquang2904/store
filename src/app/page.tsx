import MainLayout from "./pages/home/mainLayOut/mainLayOut";
import Banner from "./components/banner/banner";
import Brand from "./components/brand/brand";
import BannerGroup from "./components/bannerGroup/bannerGroup";
import TemplateProductView from "./components/template-product-view/templateProductView";
import Support from "./components/support/support";

export default function Home() {
  return (
    <MainLayout>
      <Banner />
      <Brand />
      <BannerGroup />
      <TemplateProductView />
      <Support />
    </MainLayout>
  );
}
