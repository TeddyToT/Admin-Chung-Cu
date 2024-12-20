import flatpickr from "flatpickr";
import { useEffect, useRef } from "react";

interface DatePickerProps {
  title: string;
  value: string; // Thêm prop nhận giá trị khởi tạo
  onDateChange: (selectedDate: string) => void; // Callback khi ngày thay đổi
}

const DatePicker: React.FC<DatePickerProps> = ({ title, value, onDateChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const fp = flatpickr(inputRef.current, {
      mode: "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "d/m/Y",
      defaultDate: value, // Set giá trị khởi tạo
      onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
          onDateChange(selectedDates[0].toLocaleDateString("en-GB"));
        }
      },
    });

    // Cleanup để tránh trùng lặp khi prop `value` thay đổi
    return () => fp.destroy();
  }, [value, onDateChange]);

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {title}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder="dd/mm/yyyy"
          data-class="flatpickr-right"
        />
        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.0002 12.8249C8.83145 12.8249 8.69082 12.7687 8.5502 12.6562L2.08145 6.2999C1.82832 6.04678 1.82832 5.65303 2.08145 5.3999C2.33457 5.14678 2.72832 5.14678 2.98145 5.3999L9.0002 11.278L15.0189 5.34365C15.2721 5.09053 15.6658 5.09053 15.9189 5.34365C16.1721 5.59678 16.1721 5.99053 15.9189 6.24365L9.45019 12.5999C9.30957 12.7405 9.16895 12.8249 9.0002 12.8249Z"
              fill="#64748B"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
