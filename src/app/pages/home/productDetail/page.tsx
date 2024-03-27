import style from "./productDetail.module.scss";
import MainLayout from "../mainLayOut/mainLayOut";
import TemplateProductDetail from "@/app/components/template-product-detail/templateProductDetail";
export default function ProductDetail() {
  return (
    <MainLayout>
      <TemplateProductDetail />
    </MainLayout>
  );
}
