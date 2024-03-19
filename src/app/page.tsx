import MainLayout from "./pages/home/mainLayOut/mainLayOut";
import Banner from "./components/banner/banner";
import Brand from "./components/brand/brand";
import TemplateProductView from "./components/template-product-view/teamplateProdcutView";

export default function Home() {
  return (
    <MainLayout>
      <Banner />
      <Brand />
      <TemplateProductView />
    </MainLayout>
  );
}
