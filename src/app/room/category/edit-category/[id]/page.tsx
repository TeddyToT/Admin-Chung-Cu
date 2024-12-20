"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePicker from "@/components/FormElements/DatePicker/DatePicker";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import router from "next/router";
import { Contexts } from "@/app/Contexts";
import axios from "axios";
const EditCategory = ({ params }: { params: { id: string } }) => {
    const { id } = params;

  const {fetchCategories}:any = useContext(Contexts)
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/v1/api/user/categories/` + id)
      .then((res) => {
        setCategoryName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!categoryName) {
    
      toast.warning("Yêu cầu nhập tên thể loại", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }

    fetch(`http://localhost:8081/v1/api/user/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,

        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success == false)
          {
            toast.error("Sửa thể loại sản phẩm thất bại", {
              position: "top-right",
              autoClose: 2000,
            });
          }
          else
          {
            console.log(data);
            fetchCategories()
            toast.success("Sửa thể loại sản phẩm thành công", {
              position: "top-right",
              autoClose: 2000,  // Đảm bảo toast tự động đóng sau 2 giây
            });
            router.push("/product/category"); // Chuyển hướng khi toast đóng
          }

    })
        .catch((err) => {
          console.error(err);
          toast.error("Sửa thể loại thất bại", {
            position: "top-right",
            autoClose: 2000,
          });
        });

      
  };

  return (
    <DefaultLayout>
      <Breadcrumb
  items={[
    { name: "Dashboard", href: "/" },
    { name: "Thể loại sản phẩm", href: "/product/category" },
    { name: "Sửa thể loại" }
  ]}
/>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tên thể loại
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Nhập tên thể loại"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
              onClick={handleSubmit}
               className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Sửa
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditCategory;
