"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState, useCallback, useContext, useEffect } from "react";
import Image from "next/image";
import OrderStatusOption from "@/components/SelectGroup/OrderStatusOption";
import { Contexts } from "@/app/Contexts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

// import { usePathname } from "next/navigation";
const EditOrder = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

  const [user, setUser] = useState({});
  const [contract, setContract] = useState({});
  const [room, setRoom] = useState({});
  const [state, setState] = useState<string>("");
  const [currentState, setCurrentState] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const [deliveryStatus, setDeliveryStatus] = useState<string>("");
  const [currentDeliveryStatus, setCurrentDeliveryStatus] = useState<string>("");

    
    const calculateSubtotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0); // 
    };
  const { fetchOrders }: any = useContext(Contexts);
  const router = useRouter();
  function convertDateFormat(date: string): string {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }
  function convertToDate(date: string): Date {
    const [day, month, year] = date.split("/");
    return new Date(`${year}-${month}-${day}`);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8081/v1/api/getContractById/` + id)
      .then((res) => {
        setUser(res.data.userId);
        setContract(res.data);
        setRoom(res.data.roomId);
        setState(res.data.state);
        setCurrentState(res.data.state);
        setCreatedAt(res.data.createdAt);
        setUpdatedAt(res.data.updatedAt);


      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  const handleEditSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8081/v1/api/updateContract`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        state: state,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);

          if (data.success == false)
          {
            toast.error(data.message, {
              position: "top-right",
              autoClose: 5000,
            });
          }
          else {
            fetchOrders()
          toast.success("Cập nhật trạng thái hợp đồng thành công", {
            position: "top-right",
            autoClose: 2000,  // Đảm bảo toast tự động đóng sau 2 giây

          });
          router.push("/contract/management"); // Chuyển hướng khi toast đóng
          }
  })
      .catch((err) => {
        console.error(err);

      });
  };




  //   console.log(discountValue);

  const handleStatusChange = (selectedStatus: string) => {
    setState(selectedStatus);
    setIsEditVisible(true);
    console.log("Status đã chọn:", selectedStatus); // Xử lý giá trị tại đây
  };
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full">
        <Breadcrumb
          items={[
            { name: "Dashboard", href: "/" },
            { name: "Quản lý hợp đồng", href: "/contract/management" },
            { name: "Chỉnh sửa hợp đồng" },
          ]}
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Thông tin hợp đồng #{contract._id}
                </h3>
              </div>
              <div className="p-7">
                <div>
                  <div className="mb-4 text-black dark:text-white">

                      
                        <div
                          className="flex flex-row justify-between border-b-2 py-2"
                        >
                          <div className="flex flex-col">
                          <div className="flex basis-3/4 flex-row items-center gap-6">
                            {room.images && (
                              <Image
                                src={room.images[0]}
                                alt=""
                                width={100}
                                height={100}
                              />
                            )}
                            
                            <div className="flex flex-col text-sm w-full gap-2">
                            <p className="text-ellipsis">Phòng số: {room.roomNumber} - Tầng: {room.floor}</p>
                              <p className="text-ellipsis">Diện tích: {room.size} m<span className="align-super text-xs">2</span></p>
                            <p className="text-ellipsis">Số giường: {room.bedRoom}</p>
                            <p className="text-ellipsis">Số phòng vệ sinh: {room.restRoom}</p>
                            </div>
                            
                          </div>
                          </div>
                          <div className="flex flex-col items-start gap-2 text-sm basis-1/6 ">
                            <div className="flex flex-row justify-between w-full">
                            <p className="capitalize">Diện tích: </p>
                            <p className="capitalize">{room.size}</p>
                              </div>
                              <div className="flex flex-row justify-between w-full">
                            <p className="capitalize">Số tháng: </p>
                            <p className="capitalize">{contract.month}</p>
                              </div>
                              <div className="flex flex-row justify-between w-full">
                            <p className="capitalize">Giá: </p>
                            <p className="capitalize">{room.price}</p>
                              </div>
        
                          </div>
                        </div>
                      

                  </div>

                  <div className="mb-5.5 flex w-full flex-row justify-between "> 
                    <label className=" flex font-medium text-black dark:text-white w-1/2 ">
                      Tiền cọc đã trả
                    </label>
                    <div className="flex w-1/2 place-items-center justify-end ">
                      
                        <p className="text-gray-500 dark:text-white">
                          {(contract.month * room.price).toLocaleString()} VNĐ
                        </p>  
                    </div>
                  </div>
                 
                  <div className="mb-5.5 flex w-full flex-row justify-between "> 
                    <label className=" flex font-black text-black dark:text-white w-1/2 ">
                      Tổng cộng
                    </label>
                    <div className="flex w-1/2 place-items-center justify-end ">
                      
                        <p className="text-gray-500 font-black dark:text-white">
                          {contract.total?.toLocaleString()} VNĐ
                        </p>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className=" mb-4.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                Thông tin người thuê
                </h3>
              </div>
            
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Họ tên
                      </label>
                      <div
                        className="relative flex w-full flex-row
                      gap-2 rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5  focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                      >
                        {/* <PermIdentityOutlinedIcon /> */}

                        <p className="text-black dark:text-white">
                        {contract.name?contract.name:"Incognito"}
                        </p>
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Số điện thoại
                      </label>
                      <p className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                      {contract.phone?contract.phone:"No Phone"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5.5 w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email
                    </label>
                    <p className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                      {contract.email?contract.email:"No Address"}
                    </p>
                  </div>
                  
                </form>
              </div>
            </div>
            <div className="mb-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Trạng thái hợp đồng
                </h3>
              </div>
            
              <div className="p-7">

                  <div className="mb-5.5 w-full">
                    <label className=" mb-3 block text-sm font-medium text-black dark:text-white">
                    Trạng thái hợp đồng hiện tại
                    </label>
                    <p className="capitalize w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                    {currentState === "Done"
                        ? "Trong thời gian hợp đồng"
                        : currentState === "Pending"
                          ? "Chờ xác nhận"
                          : currentState === "Cancel"
                            ? "Hủy"
                            : currentState === "doing"
                              ? "doing"
                              : currentState === "confirmed"
                                ? "confirmed"
                                : currentState === "pending"
                                  ? "pending"
                                   : currentState === "systemCancel"
                                   ?"system Cancel"
                                    : " customer Cancel"}
                    </p>
                  </div>
                  <div className="mb-4.5">
                <OrderStatusOption value={currentState} onStatusChange={handleStatusChange} />
              </div>
              {isEditVisible && (
                  <button
                    className="mt-4 rounded w-full bg-primary px-6 py-2 text-white hover:brightness-125"
                    onClick={handleEditSubmit}
                  >
                    Cập nhật
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditOrder;
