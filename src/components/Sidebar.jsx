import { FiHome, FiUsers, FiSettings, FiLogOut, FiBox, FiInfo, FiLayers, FiChevronRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const MenuItem = ({ icon, label, to, active }) => (
  <Link 
    to={to || "#"}
    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
      active 
      ? "bg-stone-900 text-white shadow-xl shadow-stone-200" 
      : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
    }`}
  >
    <div className="flex items-center gap-4">
      <span className={`${active ? "text-amber-500" : "group-hover:text-stone-900 transition-colors"}`}>
        {icon}
      </span>
      <span className="text-[13px] font-bold tracking-wide">{label}</span>
    </div>
    {active && <FiChevronRight className="text-amber-500" size={14} />}
  </Link>
);

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 bg-[#FDFCFB] border-r border-stone-100 flex flex-col sticky top-0 h-screen z-50">
      {/* BRAND/LOGO */}
      <div className="p-10 flex flex-col h-full"> {/* Container utama dengan flex-col */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <FiBox size={20} />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-stone-900 uppercase">
            Luxe<span className="text-amber-600">.</span>
          </h1>
        </div>

        {/* SECTION 1: GENERAL */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[3px] font-black text-stone-300 mb-4 ml-4">General</p>
          <nav className="space-y-1">
            <MenuItem to="/" icon={<FiHome size={18} />} label="Dashboard" active={location.pathname === "/"} />
            <MenuItem to="/rooms" icon={<FiLayers size={18} />} label="Our Rooms" active={location.pathname === "/rooms"} />
            <MenuItem to="/customers" icon={<FiUsers size={18} />} label="Customers" active={location.pathname === "/customers"} />
            <MenuItem to="/about" icon={<FiInfo size={18} />} label="About Us" active={location.pathname === "/about"} />
          </nav>
        </div>

        {/* SECTION 2: SYSTEM */}
        <div className="mt-4 pt-6 border-t border-stone-100">
          <p className="text-[10px] uppercase tracking-[3px] font-black text-stone-300 mb-4 ml-4">System</p>
          <MenuItem to="/settings" icon={<FiSettings size={18} />} label="Settings" active={location.pathname === "/settings"} />
        </div>

        {/* FOOTER SIDEBAR - Masuk di dalam div p-10 agar rapi */}
        <div className="mt-auto pt-8">
          <button className="w-full flex items-center justify-center gap-3 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-stone-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 font-bold text-xs uppercase tracking-widest transition-all">
            <FiLogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div> {/* Penutup div p-10 */}
    </aside>
  );
}