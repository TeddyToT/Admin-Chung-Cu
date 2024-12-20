"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import RoomTable from "@/components/Tables/RoomTable";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useState } from "react";


const ProductOverview = () => {
  const [filterStatus, setFilterStatus] = useState("all");
    const toggleStatus = (status: string) => {
      setFilterStatus((prevStatus) => (prevStatus === status ? "all" : status));
    };


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Quản lý phòng" />
      
      <div className="flex items-center justify-end gap-5 rounded-md p-2 mb-4 dark:bg-meta-4">
        <button
          onClick={() => toggleStatus("true")}
          className={`rounded px-3 py-1 font-medium shadow-card shadow-gray-400 
          hover:bg-slate-700 hover:text-white hover:shadow-card 
          dark:bg-cyan-950 dark:hover:bg-[#3d50e0] dark:hover:text-white ${
            filterStatus === "true"
              ? "bg-green-500 text-white"
              : "text-warning"
          }`}
        >
          Sẵn sàng
        </button>
        <button
          onClick={() => toggleStatus("false")}
          className={`rounded px-3 py-1 font-medium shadow-card shadow-gray-400 
          hover:bg-slate-700 hover:text-white hover:shadow-card 
          dark:bg-cyan-950 dark:hover:bg-[#3d50e0] dark:hover:text-white ${
            filterStatus === "false"
              ? "bg-orange-500 text-white"
              : "text-orange-500"
          }`}
        >
          Đã cho thuê
        </button>
      </div>
     
      <div className="flex flex-col gap-10">
        
        <RoomTable filterStatus={filterStatus}
          setFilterStatus={setFilterStatus} />
      </div>
    </DefaultLayout>
  );
};

export default ProductOverview;
