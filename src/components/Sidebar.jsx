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

  // Menyisipkan ikon-ikon yang pas dengan gambar di image_5a2cb0.png
  const menuItems = [
    { to: "/", icon: <FiGrid />, label: "Dashboard" },
    { to: "/rooms", icon: <FiLayers />, label: "Our Rooms" },
    { to: "/customers", icon: <FiUsers />, label: "Customers" },
    { to: "/about", icon: <FiInfo />, label: "About Us" },
    { to: "/member", icon: <FiUsers />, label: "Member" },
    { to: "/settings", icon: <FiSettings />, label: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <aside className="w-64 bg-white flex flex-col h-screen sticky top-0 z-50 border-r border-[#EDF2F7]">
      <div className="p-6 flex flex-col h-full justify-between">
        
        {/* BAGIAN ATAS: LOGO & NAV MENU (Digabung dalam satu div agar nempel rapat) */}
        <div className="space-y-6">
          
          {/* LOGO LUXE */}
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 bg-[#5B5FEF] rounded-xl flex items-center justify-center text-white shadow-[0px_4px_12px_rgba(91,95,239,0.25)]">
              <FiBox size={20} />
            </div>
            <h1 className="text-2xl font-bold text-[#151D48] tracking-tight">
              Luxe<span className="text-[#5B5FEF]">.</span>
            </h1>
          </div>

          {/* NAV MENU (Jarak antar menu disesuaikan persis seperti image_5a2cb0.png) */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.to || (item.to === "/about" && location.pathname === "/about-us") || (item.to === "/rooms" && location.pathname === "/our-rooms");
              
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 font-semibold text-sm ${
                    isActive 
                      ? "bg-[#5B5FEF] text-white shadow-[0px_8px_20px_rgba(91,95,239,0.3)]" 
                      : "text-[#737791] hover:bg-[#FAFBFF] hover:text-[#5B5FEF]"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BAGIAN BAWAH: LOGOUT & CARD PRO (Otomatis berkumpul rapi di area bawah kontainer) */}
        <div className="space-y-5">
          {/* LOGOUT */}
          <div className="px-2 border-t border-[#F4F5F9] pt-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 text-[#737791] hover:text-red-500 font-semibold text-sm transition-colors w-full py-2 px-3 text-left rounded-xl hover:bg-red-50/40"
            >
              <FiLogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>

          {/* CARD PRO */}
          <div className="bg-[#5B5FEF] p-5 rounded-3xl text-center text-white relative overflow-hidden shadow-[0px_6px_20px_rgba(91,95,239,0.15)]">
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
            <h4 className="font-bold text-sm mb-1.5 relative z-10">LuxStay Pro</h4>
            <p className="text-[10px] text-indigo-100 mb-3.5 relative z-10 leading-relaxed">
              Get access to all premium features
            </p>
            <button className="w-full bg-white text-[#5B5FEF] py-2.5 rounded-xl text-[11px] font-bold shadow-xs hover:bg-slate-50 transition-all relative z-10">
              Get Pro
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}