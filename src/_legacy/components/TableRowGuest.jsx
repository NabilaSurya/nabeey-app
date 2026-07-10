// components/TableRowGuest.jsx
import { FiMail, FiPhone, FiMoreVertical } from "react-icons/fi";
import StatusBadge from "./StatusBadge";

export default function TableRowGuest({ guest }) {
  return (
    <tr className="hover:bg-[#F5F5F7]/30 transition-colors group border-b border-[#F5F5F7] last:border-none">
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#BF83FF] font-bold text-xs uppercase">
            {guest.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#151D48] group-hover:text-[#5B5FEF] transition-colors">{guest.name}</span>
            <span className="text-[11px] text-[#6B7280] font-medium mt-0.5">{guest.id}</span>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-col">
          <span className="text-[13px] text-[#151D48] font-semibold">{guest.room}</span>
          <div className="flex gap-3 mt-1.5 text-[#6B7280]">
            <FiMail size={14} className="hover:text-[#5B5FEF] cursor-pointer" />
            <FiPhone size={14} className="hover:text-[#5B5FEF] cursor-pointer" />
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-[#151D48]">{guest.checkIn} — {guest.checkOut}</span>
          <span className="text-[11px] text-[#6B7280] mt-0.5">May 2026</span>
        </div>
      </td>
      <td className="px-8 py-6">
        <StatusBadge status={guest.status} />
      </td>
      <td className="px-8 py-6 text-right">
        <button className="p-2.5 bg-[#F5F5F7] text-[#6B7280] rounded-xl hover:bg-[#5B5FEF] hover:text-white transition-all">
          <FiMoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}