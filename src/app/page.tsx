import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Overview from "./overview/page";
import ProductOverview from "./room/overview/page";


export default function Home() {
  return (
    <>
      <ProductOverview/>
    </>
  );
}
