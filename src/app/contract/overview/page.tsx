import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import OrderOverViewTable from "@/components/Tables/OrderOverview";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tổng quan đơn hàng" />

      <div className="flex flex-col gap-10">
        
        <OrderOverViewTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
