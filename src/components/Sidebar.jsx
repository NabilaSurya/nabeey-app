import { 
  FiGrid, 
  FiLayers, 
  FiUsers, 
  FiInfo, 
  FiSettings, 
  FiLogOut, 
  FiBox 
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { to: "/", icon: <FiGrid />, label: "Dashboard" },
    { to: "/rooms", icon: <FiLayers />, label: "Our Rooms" },
    { to: "/customers", icon: <FiUsers />, label: "Customers" },
    { to: "/about", icon: <FiInfo />, label: "About Us" },
    { to: "/settings", icon: <FiSettings />, label: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <aside className="w-64 bg-white flex flex-col h-screen sticky top-0 z-50 shadow-sm border-r border-stone-50">
      <div className="p-6 flex flex-col h-full">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-[#5D5FEF] rounded-xl flex items-center justify-center text-white shadow-lg">
            <FiBox size={20} />
          </div>
          <h1 className="text-2xl font-bold text-[#151D48] tracking-tight">
            Luxe<span className="text-[#5D5FEF]">.</span>
          </h1>
        </div>

        {/* NAV */}
        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold text-sm ${
                location.pathname === item.to 
                ? "bg-[#5D5FEF] text-white shadow-lg" 
                : "text-[#737791] hover:bg-indigo-50 hover:text-[#5D5FEF]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="mb-6 px-2">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 text-[#737791] hover:text-red-500 font-semibold text-sm transition-colors w-full py-2 px-3 text-left"
          >
            <FiLogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* CARD PRO */}
        <div className="bg-[#5D5FEF] p-5 rounded-3xl text-center text-white relative overflow-hidden">
          <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
          <h4 className="font-bold text-sm mb-2 relative z-10">LuxStay Pro</h4>
          <p className="text-[10px] text-indigo-100 mb-4 relative z-10 leading-relaxed">
            Get access to all premium features
          </p>
          <button className="w-full bg-white text-[#5D5FEF] py-2.5 rounded-xl text-[11px] font-bold shadow-md hover:bg-indigo-50 transition-all relative z-10">
            Get Pro
          </button>
        </div>
      </div>
    </aside>
  );
}