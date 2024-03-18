import MainLayout from "./pages/home/mainLayOut/mainLayOut";
import Banner from "./components/banner/banner";
import Brand from "./components/brand/brand";
import BestSeller from "./components/bestSeller/bestSeller";

export default function Home() {
  return (
    <MainLayout>
      <Banner />
      <Brand />
      <BestSeller />
    </MainLayout>
  );
}
