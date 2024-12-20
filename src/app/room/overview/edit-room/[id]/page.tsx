"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectCategoryOption from "@/components/SelectGroup/SelectOption";
import ProductStatusOption from "@/components/SelectGroup/ProductStockOption";
import { useState, useRef, useContext, useEffect } from "react";
import { Contexts } from "@/app/Contexts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";

interface PriceItem {
  size: string;
  price: number;
}

const EditProduct = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [isLoading, setIsLoading] = useState(false);

    const [roomNumber, setRoomNumber] = useState(Number);
    const [floor, setFloor] = useState(Number);
    const [price, setPrice] = useState(Number);
    const [size, setSize] = useState(Number);
    const [bedRoom, setBedRoom] = useState(Number);
    const [restRoom, setRestRoom] = useState(Number);
    const [des, setDes] = useState("");
    const [currentStatus, setCurrentStatus] = useState(Boolean);
    const [status, setStatus] = useState(String);
 
  const [discount, setDiscount] = useState(0);
  const {fetchRooms}:any = useContext(Contexts)
  const router = useRouter();
  
  useEffect(() => {
    axios
      .get(`http://localhost:8081/v1/api/getRoom/` + id)
      .then((res) => {
        setRoomNumber(res.data.roomNumber);
        setFloor(res.data.floor);
        setPrice(res.data.price);
        setSize(res.data.size);
        setBedRoom(res.data.bedRoom);
        setRestRoom(res.data.restRoom);
        setDes(res.data.description);
        setCurrentStatus(res.data.isAvailable);
        setStatus(res.data.isAvailable);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

 


  const handleStatusChange = (selectedType: string) => {
    setStatus(selectedType);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!price || price <= 0) {
      toast.warning("Yêu cầu nhập giá phòng > 0", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!bedRoom || bedRoom <= 0) {
    
      toast.warning("Yêu cầu nhập giá số giường > 0", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }

    if (!restRoom || restRoom <= 0) {
    
      toast.warning("Yêu cầu nhập giá số phòng vệ sinh > 0", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!des) {
      toast.warning("Yêu cầu nhập mô tả phòng", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (des.length > 40) {
      toast.warning("Yêu cầu nhập mô tả phòng dưới 40 kí tự", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
  
    axios
      .put("http://localhost:8081/v1/api/updateRoom", {
        id: id,
        roomNumber: roomNumber,
        price: price.toString(),
        bedRoom: bedRoom.toString(),
        restRoom: restRoom.toString(),
        description: des,
        isAvailable: status,

      })
      .then((res) => {
        if (res.data.success == false)
        {
          toast.error(`Không thành công: ${res.data.message}`, {
            position: "top-right",
            autoClose: 1500
          })
          setIsLoading(false)

          return;
        }
        toast.success("Sửa thông tin phòng thành công", {
          position: "top-right",
          autoClose: 2000,

        })
        setIsLoading(false)
        fetchRooms()
        router.push("/room/overview")
        console.log('Response:', res.data);
      })
      .catch((err) => {
        setIsLoading(false)

        console.log("Error:", err.response ? err.response.data : err.message);
      })
      // .finally(() => {
        

        
        
      // });
  };
  
 
  
  return (
    <DefaultLayout>
       {isLoading && <Loader/>}
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/" },
          { name: "Tổng quan phòng", href: "/room/overview" },
          { name: "Sửa thông tin phòng" },
        ]}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                 Tên phòng
                </label>
                <p
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  Phòng số {roomNumber} - Tầng {floor}
                </p>
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mô tả
                </label>
                <input
                  type="text"
                  value={des}
                  disabled={!currentStatus} 
                  onChange={(e) => setDes(e.target.value)}
                  placeholder="Enter product description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Số giường
                </label>
                <input
                  type="number"
                  value={bedRoom}
                  disabled={!currentStatus} 
                  onChange={(e) => setBedRoom(e.target.value)}
                  placeholder="Enter product description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Số phòng vệ sinh
                </label>
                <input
                  type="number"
                  value={restRoom}
                  disabled={!currentStatus} 
                  onChange={(e) => setRestRoom(e.target.value)}
                  placeholder="Enter product description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Diện tích (m2)
                </label>
                <input
                  type="number"
                  value={size}
                  disabled 
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Enter product description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>


              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Giá phòng (VNĐ)
                </label>
                <input
                  type="number"
                  value={price}
                  disabled={!currentStatus} 
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter product description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Trạng thái phòng hiện tại
                </label>
                <p
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  {currentStatus?"Sẵn sàng":"Đã cho thuê"}
                </p>
              </div>

              <ProductStatusOption value={status}  onStatusChange={handleStatusChange}/>
              
             
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

export default EditProduct;
