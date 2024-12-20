import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import ProductCategoryTable from "@/components/Tables/ProductCategoryTable";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";


const ProductCategory = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thể loại sản phẩm" />

      <Link
              href="/product/category/add-category"
              className="mb-3 inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-center font-normal text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Thêm thể loại
            </Link>
      <div className="flex flex-col gap-10">
        
        <ProductCategoryTable />    
      </div>
    </DefaultLayout>
  );
};

export default ProductCategory;
