"use client";
import { useState, useContext, useEffect, useCallback } from "react";
// import { Package } from "@/types/package";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Contexts } from "@/app/Contexts";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const ContractTable = ({ filterStatus, setFilterStatus }) => {
  const { orders, fetchOrders }: any = useContext(Contexts);
  // console.log(orders);
  const [searchInput, setSearchInput] = useState("");
  const [searchOrders, setSearchOrders] = useState([]);

  useEffect(() => {
    let filtered = orders;

    if (filterStatus !== "all") {
      filtered = orders.filter(
        (order) => order.state === filterStatus,
      );
    }

    const searchQuery = searchInput.trim().toLowerCase();
    const temp = filtered.filter((order) =>
      order._id.toLowerCase().includes(searchQuery),
    );

    setSearchOrders(temp);
  }, [searchInput, filterStatus, orders]);

  const itemsPerPage = 8; // Số mục mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(searchOrders.length / itemsPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0); // Cuộn lên đầu trang
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0); // Cuộn lên đầu trang
    }
  };

  const handlePageInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);

    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= totalPages) {
      setCurrentPage(inputValue);
    }
  };

  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    const sortedOrders = [...searchOrders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    return sortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, searchOrders]);

  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const getUser = (userID) => {
      fetch(`http://localhost:8081/v1/api/user/users/${userID}`)
        .then((res) => res.json())
        .then((data) => {
          setUserNames((prevState) => ({
            ...prevState,
            [userID]: data.name,
          }));
        })
        .catch((err) => {
          // console.error(err);
          setUserNames((prevState) => ({
            ...prevState,
            [userID]: "Failed to fetch user",
          }));
        });
    };

    // Iterate over user IDs and fetch the user names
    const userIDs = getPaginatedData().map((orderItem) => orderItem.user);
    userIDs.forEach(getUser); // Fetch user for each ID
  }, [getPaginatedData]);

  const handleDeleteOrder = (orderId: string) => {
    axios
      .delete(`http://localhost:8081/v1/api/user/orders/${orderId}`)
      .then((response) => {
        if (response.data.success == true) {
          toast.success("Xóa voucher thành công", {
            position: "top-right",
            autoClose: 2000,
          });
          fetchOrders();
        } else {
          toast.error("Xóa voucher thất bại", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Đã xảy ra lỗi khi xóa voucher", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };
  return (
    <div className=" relative overflow-hidden rounded-md border border-gray-400  bg-white pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className=" inset-0 flex justify-start">
        <div className=" w-full px-4 py-5 sm:block">
          <form action="#" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <SearchOutlinedIcon />
              </button>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Nhập mã hợp đồng...."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-11/12"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[175px] text-center px-4 py-4 font-medium text-black dark:text-white xl:pl-6">
                Mã hợp đồng
              </th>
              <th className="min-w-[175px]  px-4 py-4 font-medium text-black dark:text-white xl:pl-6">
                Người đặt
              </th>
              <th className="flex min-w-[400px] justify-center px-4 py-4 font-medium text-black dark:text-white">
                Phòng
              </th>

              <th className="min-w-[120px] px-4 py-4 text-center font-medium text-black dark:text-white">
                Trạng thái
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((orderItem, key) => (
              <tr
                className={key % 2 != 0 ? "bg-gray-50 dark:bg-gray-800" : ""}
                key={orderItem._id}
              >
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-6">
                  <h5 className="font-medium text-black dark:text-white">
                  {orderItem._id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-6">
                  <h5 className="font-medium text-black dark:text-white">
                    
                    {orderItem.name || "Guest"}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="text-black dark:text-white">
                    {orderItem.roomId ? (
                      <div className="flex flex-row">
                        <div className="flex w-3/4 flex-row items-center gap-2">
                        <Image
                          src={orderItem.roomId.images[0]}
                          alt="//"
                          width={60}
                          height={60}
                        />
                        <p className="text-ellipsis">
                          Phòng {orderItem.roomId.roomNumber} - Tầng{" "}
                          {orderItem.roomId.floor}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 w-1/4 text-sm">
                      <p className="text-ellipsis">
                          Giá: {orderItem.roomId.price.toLocaleString()}
                        </p>
                        <p className="text-ellipsis">
                          Số tháng: {orderItem.month}
                        </p>
                        </div>
                         </div>
                      
                    ) 
                    
                    : 
                    (
                      <p>cứu tôi</p>
                    )}
                  </div>
                  <p className="mt-3 text-right text-base font-semibold ">
                    Tổng cộng: {orderItem.total.toLocaleString()}{" "}
                  </p>
                </td>
                <td className=" border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 font-medium  capitalize ${
                      orderItem.state === "Done"
                        ? " text-success"
                        : orderItem.state === "Cancel"
                          ? " text-danger"
                          : orderItem.state === "shipping"
                            ? " text-zinc-500"
                            : orderItem.state === "doing"
                              ? " text-blue-500"
                              : orderItem.state === "confirmed"
                                ? " text-orange-500"
                                : orderItem.state === "Pending"
                                  ? " text-warning"
                                  : " text-danger"
                    }`}
                  >
                    {orderItem.state === "Done"
                      ? " Thành công"
                      : orderItem.state === "Cancel"
                        ? " Đã hủy"
                        : orderItem.state === "shipping"
                          ? " Đang vận chuyển"
                          : orderItem.state === "doing"
                            ? " Đang làm"
                            : orderItem.state === "confirmed"
                              ? " Đã xác nhận"
                              : orderItem.state === "Pending"
                                ? " Chờ xác nhận"
                                : " Đã hủy"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      href={`/contract/management/edit-contract/${orderItem._id}`}
                      className="hover:text-primary"
                    >
                      <ModeEditIcon />
                    </Link>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Bạn có chắc chắn muốn xóa hợp đồng này không?",
                          )
                        ) {
                          handleDeleteOrder(orderItem._id);
                        }
                      }}
                      className="hover:text-primary"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pf-3 flex justify-start pr-4 pt-8 md:justify-center lg:justify-center xl:justify-center ">
        <button
          className="hover:cursor-pointer hover:font-medium hover:text-sky-500"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="m-3">
          <input
            type="number"
            value={currentPage}
            onChange={(e) => handlePageInputChange(e)}
            min="1"
            max={totalPages}
            className=" w-16 rounded border text-center"
          />
          <span className="ml-1">of {totalPages} </span>
        </div>
        <button
          className="hover:cursor-pointer hover:font-medium hover:text-sky-500"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        {/* Thêm ô nhập số trang */}
      </div>
    </div>
  );
};

export default ContractTable;
