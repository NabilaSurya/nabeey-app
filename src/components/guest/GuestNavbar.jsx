import { useState, useEffect } from "react";
import { FiGrid, FiActivity, FiMapPin, FiUsers, FiChevronRight, FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

export default function GuestNavbar() {
  const { isMember, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

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
            {isMember ? "MEMBER" : "GUEST"}
          </span>
        </div>

        {/* MENU NAVIGASI (DESKTOP) */}
        <div className="hidden md:flex gap-6 text-sm font-bold text-slate-600">
          <a href="#dashboard" onClick={(e) => handleScrollToSection(e, "dashboard")} className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors">
            <FiGrid size={16} /> Home
          </a>
          <a href="#rooms" onClick={(e) => handleScrollToSection(e, "rooms")} className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors">
            <FiActivity size={16} /> Rooms
          </a>
          <a href="#destinations" onClick={(e) => handleScrollToSection(e, "destinations")} className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors">
            <FiMapPin size={16} /> About
          </a>

          {isMember ? (
            <>
              <Link to="/MemberLanding" className="flex items-center gap-1.5 text-[#5B5FEF] hover:text-[#4834D4] transition-colors">
                <FiUser size={16} /> Member
              </Link>
              <button onClick={async () => { await signOut(); navigate("/"); }} className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 transition-colors">
                <FiLogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login" className="inline-flex items-center gap-1 bg-[#5B5FEF] hover:bg-[#4834D4] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md">
              Login <FiChevronRight />
            </Link>
          )}
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
          <a href="#dashboard" onClick={(e) => handleScrollToSection(e, "dashboard")} className="flex items-center gap-3 py-2 border-b border-slate-50"><FiGrid size={18} /> Home</a>
          <a href="#rooms" onClick={(e) => handleScrollToSection(e, "rooms")} className="flex items-center gap-3 py-2 border-b border-slate-50"><FiActivity size={18} /> Rooms</a>
          <a href="#destinations" onClick={(e) => handleScrollToSection(e, "destinations")} className="flex items-center gap-3 py-2 border-b border-slate-50"><FiMapPin size={18} /> About</a>
          {isMember ? (
            <>
              <Link to="/MemberLanding" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 border-b border-slate-50 text-[#5B5FEF]"><FiUser size={18} /> Member</Link>
              <button onClick={async () => { await signOut(); setIsOpen(false); navigate("/"); }} className="w-full mt-2 text-center bg-rose-600 text-white text-xs font-bold py-3.5 rounded-xl block">Logout</button>
            </>
          ) : (
            <Link to="/auth/login" onClick={() => setIsOpen(false)} className="w-full mt-2 text-center bg-[#5B5FEF] text-white text-xs font-bold py-3.5 rounded-xl block">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}