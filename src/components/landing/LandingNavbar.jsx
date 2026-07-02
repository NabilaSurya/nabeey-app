import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#katalog" },
  { label: "Member", href: "/MemberLanding" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Hubungi Kami", href: "#kontak" },
];

// Cek apakah link eksternal (bukan anchor)
function isExternalLink(href) {
  return href.startsWith("/");
}

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <div className="w-9 h-9 bg-[#5B5FEF] rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#5B5FEF]/20">
            L
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            lux<span className="text-[#5B5FEF]">stay</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            isExternalLink(link.href) ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-semibold text-gray-600 hover:text-[#5B5FEF] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-gray-600 hover:text-[#5B5FEF] transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/auth/login"
            className="inline-flex items-center px-5 py-2.5 text-sm font-bold text-[#5B5FEF] border-2 border-[#5B5FEF] rounded-xl hover:bg-[#5B5FEF] hover:text-white transition-all duration-200"
          >
            Masuk
          </Link>
          <Link
            to="/auth/register"
            className="inline-flex items-center px-5 py-2.5 text-sm font-bold text-white bg-[#5B5FEF] rounded-xl hover:bg-[#4a4ce0] shadow-md shadow-[#5B5FEF]/20 transition-all duration-200"
          >
            Daftar
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-[#5B5FEF] transition-colors"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-3">
          {navLinks.map((link) =>
            isExternalLink(link.href) ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 text-sm font-bold text-gray-700 hover:text-[#5B5FEF] border-b border-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2.5 text-sm font-bold text-gray-700 hover:text-[#5B5FEF] border-b border-gray-50 transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
            <Link
              to="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 text-sm font-bold text-[#5B5FEF] border-2 border-[#5B5FEF] rounded-xl hover:bg-[#5B5FEF] hover:text-white transition-all"
            >
              Masuk
            </Link>
            <Link
              to="/auth/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 text-sm font-bold text-white bg-[#5B5FEF] rounded-xl hover:bg-[#4a4ce0] transition-all"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
