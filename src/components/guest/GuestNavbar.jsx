import { useState, useEffect } from "react";
import { FiGrid, FiActivity, FiMapPin, FiUsers, FiMessageSquare, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom"; // Tambahkan ini untuk deteksi rute

export default function GuestNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation(); // Mendapatkan rute aktif saat ini
  const navigate = useNavigate(); // Untuk berpindah halaman jika di luar home

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll otomatis saat kembali dari halaman lain
  useEffect(() => {
    if ((location.pathname === "/guest" || location.pathname === "/") && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300); // Beri jeda sedikit agar komponen halaman guest selesai dimuat
    }
  }, [location]);

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    
    // Cek apakah user sedang TIDAK berada di halaman utama (/guest atau /)
    if (location.pathname !== "/guest" && location.pathname !== "/") {
      // Alihkan kembali ke halaman utama bawa ID section di hash-nya
      navigate(`/guest#${id}`);
      setIsOpen(false);
    } else {
      // Jika sudah di halaman utama, langsung scroll halus
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/90 backdrop-blur-md shadow-md py-4 border-b border-slate-100" 
        : "bg-white/80 backdrop-blur-sm py-5 border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 w-full">
        
        {/* BRAND LOGO */}
        <div className="flex items-center gap-1.5 select-none">
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            Luxe<span className="text-[#5B5FEF]">Stay</span>
          </span>
          <span className="text-[9px] font-extrabold bg-[#5B5FEF]/10 text-[#5B5FEF] px-2 py-0.5 rounded-full uppercase tracking-widest">
            GUEST
          </span>
        </div>

        {/* MENU NAVIGASI (DESKTOP) */}
        <div className="hidden md:flex gap-6 text-sm font-bold text-slate-600">
          <a href="#dashboard" onClick={(e) => handleScrollToSection(e, "dashboard")} className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors">
            <FiGrid size={16} /> Market
          </a>
          <a href="#rooms" onClick={(e) => handleScrollToSection(e, "rooms")} className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors">
            <FiActivity size={16} /> Properties
          </a>
          <a href="#destinations" onClick={(e) => handleScrollToSection(e, "destinations")} className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors">
            <FiMapPin size={16} /> Destinations
          </a>
          <a href="#community" onClick={(e) => handleScrollToSection(e, "community")} className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors">
            <FiUsers size={16} /> Community
          </a>
          <a href="#services" onClick={(e) => handleScrollToSection(e, "services")} className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors">
            <FiMessageSquare size={16} /> Pusat Layanan
          </a>
        </div>

        {/* BUTTON ACTION */}
        <div className="hidden md:block">
          <a href="/auth/login" className="inline-flex items-center gap-1 bg-[#5B5FEF] hover:bg-[#4834D4] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5">
            Start Booking <FiChevronRight />
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 hover:text-[#5B5FEF] focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}`}>
        <div className="flex flex-col px-6 py-6 gap-4 text-sm font-bold text-slate-600">
          <a href="#dashboard" onClick={(e) => handleScrollToSection(e, "dashboard")} className="flex items-center gap-3 py-2 border-b border-slate-50"><FiGrid size={18} /> Market</a>
          <a href="#rooms" onClick={(e) => handleScrollToSection(e, "rooms")} className="flex items-center gap-3 py-2 border-b border-slate-50"><FiActivity size={18} /> Properties</a>
          <a href="#destinations" onClick={(e) => handleScrollToSection(e, "destinations")} className="flex items-center gap-3 py-2 border-b border-slate-50"><FiMapPin size={18} /> Destinations</a>
          <a href="#community" onClick={(e) => handleScrollToSection(e, "community")} className="flex items-center gap-3 py-2 border-b border-slate-50"><FiUsers size={18} /> Community</a>
          <a href="#services" onClick={(e) => handleScrollToSection(e, "services")} className="flex items-center gap-3 py-2 border-b border-slate-50"><FiMessageSquare size={18} /> Pusat Layanan</a>
          <a href="/auth/login" className="w-full mt-2 text-center bg-[#5B5FEF] text-white text-xs font-bold py-3.5 rounded-xl block">Start Booking</a>
        </div>
      </div>
    </nav>
  );
}