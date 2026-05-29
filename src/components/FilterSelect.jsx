// components/FilterSelect.jsx
import { FiFilter } from "react-icons/fi";

export default function FilterSelect({ value, onChange, options = [] }) {
  return (
    <div className="flex items-center gap-3 w-full lg:w-auto bg-[#F5F5F7] px-4 py-2 rounded-2xl">
      <FiFilter className="text-[#5D5FEF]" />
      <select 
        className="bg-transparent border-none text-[13px] font-bold text-[#6B7280] outline-none cursor-pointer pr-8"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}