import dynamic from "next/dynamic";
import LoadingPage from "../loadingPage";
import { Suspense } from "react";
import PagePayment from "@/app/components/pagePayment/pagePayment";
// const PagePayment = dynamic(
//   () => import("@/app/components/pagePayment/pagePayment"),
//   {
//     loading: () => <LoadingPage />,
//     ssr: false,
//   }
// );
const PayMent = () => {
  return <PagePayment />;
};
export default PayMent;
