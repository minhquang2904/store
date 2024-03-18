import Link from "next/link";
import Image from "next/image";
import MainLayout from "./pages/home/mainLayOut/mainLayOut";
import style from "./main.module.scss";
import Banner from "./components/banner/banner";
import Brand from "./components/brand/brand";

export default function Home() {
  return (
    <MainLayout>
      <Banner />
      <Brand />
    </MainLayout>
  );
}
