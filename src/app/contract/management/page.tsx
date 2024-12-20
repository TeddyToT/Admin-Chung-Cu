"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import ContractTable from "@/components/Tables/ContractTable";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TablesPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const toggleStatus = (status: string) => {
    setFilterStatus((prevStatus) => (prevStatus === status ? "all" : status));
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Quản lý đơn hàng" />

      <div className="flex items-center justify-end gap-5 rounded-md p-2 mb-4 dark:bg-meta-4">
        <button
          onClick={() => toggleStatus("Pending")}
          className={`rounded px-3  py-1 font-medium text-warning  shadow-card 
        shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
        dark:bg-cyan-950  dark:hover:bg-[#3d50e0] dark:hover:text-white 
        ${
          filterStatus === "Pending"
            ? "bg-warning text-white"
            : "text-warning"
        }`} 
        >
          Chờ xác nhận
        </button>
        <button
          onClick={() => toggleStatus("Done")}
          className={`rounded px-3  py-1 font-medium text-success  shadow-card 
            shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
            dark:bg-cyan-950  dark:hover:bg-[#3d50e0] dark:hover:text-white 
            ${
              filterStatus === "Done"
                ? "bg-success text-white"
                : "text-success"
            }`} 
        >
          Đã xác nhận
        </button>
          <button 
          onClick={() => toggleStatus("Cancel")}
          className={`rounded px-3  py-1 font-medium text-red-500  shadow-card 
            shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
            dark:bg-cyan-950  dark:hover:bg-[#3d50e0] dark:hover:text-white 
            ${
              filterStatus === "Cancel"
                ? "bg-red-500 text-white"
                : "text-red-500"
            }`} >            
         Hủy
          </button>
      </div>
      <div className="flex flex-col gap-10">
        <ContractTable
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
