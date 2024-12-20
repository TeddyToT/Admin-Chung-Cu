"use client";
import React, { useState, useEffect,  } from "react";


interface OrderStatusOptionProps {
    onStatusChange: (category: string) => void;
  value: string;
}

const ProductStatusOption: React.FC<OrderStatusOptionProps> = ({ value, onStatusChange }) => {

  const [selectedOption, setSelectedOption] = useState<string>(value || ""); // Khởi tạo bằng giá trị từ props
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(!!value); // Đổi màu nếu có giá trị ban đầu

  
  useEffect(() => {
    setSelectedOption(value);
    setIsOptionSelected(!!value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    setIsOptionSelected(true);
    onStatusChange(newValue);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
      Chỉnh sửa Trạng thái
      </label>

      <div className="capitalize relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={handleChange}
          className={`capitalize relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Chọn trạng thái
          </option>
          
            <option
              
              value="true"
              className="text-body capitalize dark:text-bodydark"
            >
              Sẵn sàng
            </option>
            <option
              
              value="false"
              className="text-body capitalize dark:text-bodydark"
            >
              Cho thuê
            </option>
        
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ProductStatusOption;
