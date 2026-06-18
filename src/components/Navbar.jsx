import { useLocation } from "react-router-dom"; // membaca URL aktif
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation(); // Ambil data lokasi path saat ini
  const path = location.pathname;

  // 🗺️ Mapping Judul otomatis menggunakan .endsWith() agar aman dari prefiks /admin
  const getPageTitle = () => {
    if (path === "/" || path === "/admin" || path.endsWith("/dashboard")) {
      return "Dashboard";
    } else if (path.endsWith("/rooms") || path.endsWith("/our-rooms")) {
      return "Our Rooms";
    } else if (path.endsWith("/customers")) {
      return "Customers";
    } else if (path.endsWith("/about") || path.endsWith("/about-us")) {
      return "About Us";
    } else if (path.endsWith("/member")) {
      return "Member";
    } else if (path.endsWith("/settings")) {
      return "Settings";
    } else {
      return "Dashboard"; // Judul default
    }
  };

  return (
    <nav className="h-16 bg-white px-8 flex items-center justify-between sticky top-0 z-40 border-b border-[#EDF2F7] shadow-xs">
      
      {/* 🔮 JUDUL DINAMIS: Otomatis berubah sinkron mengikuti halaman menu saat ini */}
      <h2 className="text-xl font-bold text-[#151D48] min-w-[200px]">
        {getPageTitle()}
      </h2>

      {/* Search Bar Membulat */}
      <div className="relative w-96">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B5FEF]" />
        <input 
          type="text" 
          placeholder="Search here..." 
          className="w-full bg-[#F5F6FA] border-none pl-12 pr-6 py-2 rounded-xl text-xs outline-none text-[#737791]"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <div className="flex items-center gap-2 bg-[#FFF9F1] px-3 py-1.5 rounded-xl border border-[#FFD9A1] cursor-pointer">
          <span className="text-xs font-bold text-[#FF9209]">Eng (US)</span>
          <FiChevronDown className="text-[#FF9209]" />
        </div>

        {/* Notification Bell */}
        <button className="p-2.5 bg-[#FFF0F0] text-[#FF5B5B] rounded-xl relative hover:opacity-90 transition-opacity">
          <FiBell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#FFF0F0]"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-[#EDF2F7] pl-5">
          <img src="https://i.pravatar.cc/150?u=musfiq" className="w-9 h-9 rounded-xl object-cover" alt="user" />
          <div>
            <p className="text-xs font-bold text-[#151D48]">Musfiq</p>
            <p className="text-[10px] text-[#737791] font-medium">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
}