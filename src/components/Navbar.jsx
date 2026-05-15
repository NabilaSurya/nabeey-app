import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="h-24 bg-[#FAFBFF] px-10 flex items-center justify-between sticky top-0 z-40">
      <h2 className="text-2xl font-bold text-[#151D48]">Dashboard</h2>

      {/* Search Bar Membulat */}
      <div className="relative w-96">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D5FEF]" />
        <input 
          type="text" 
          placeholder="Search here..." 
          className="w-full bg-[#F5F6FA] border-none pl-12 pr-6 py-3 rounded-2xl text-xs outline-none text-[#737791]"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-[#FFF9F1] px-4 py-2 rounded-xl border border-[#FFD9A1]">
            <span className="text-xs font-bold text-[#FF9209]">Eng (US)</span>
            <FiChevronDown className="text-[#FF9209]" />
        </div>

        <button className="p-3 bg-[#FFF0F0] text-[#FF5B5B] rounded-xl relative">
          <FiBell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#FFF0F0]"></span>
        </button>

        <div className="flex items-center gap-3">
          <img src="https://i.pravatar.cc/150?u=musfiq" className="w-10 h-10 rounded-xl object-cover" alt="user" />
          <div>
            <p className="text-sm font-bold text-[#151D48]">Musfiq</p>
            <p className="text-[10px] text-[#737791] font-medium">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
}