import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "6281234567890"; // Ganti dengan nomor WhatsApp Anda
const WHATSAPP_MESSAGE = "Halo LuxStay! Saya ingin bertanya tentang reservasi kamar.";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    // Munculkan setelah scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Tampilkan tooltip setelah 3 detik
    const tooltipTimer = setTimeout(() => {
      if (window.scrollY > 200) {
        setIsTooltipVisible(true);
        setTimeout(() => setIsTooltipVisible(false), 5000);
      }
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {/* Tooltip */}
      <div
        className={`bg-white border border-emerald-200 shadow-lg rounded-2xl px-5 py-3 transition-all duration-500 ${
          isTooltipVisible && isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-lg">💬</span>
          <div>
            <p className="text-[11px] font-black text-emerald-900 leading-tight">
              Ada pertanyaan?
            </p>
            <p className="text-[10px] font-semibold text-emerald-600 leading-tight">
              Chat via WhatsApp sekarang!
            </p>
          </div>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-white border-r border-b border-emerald-200 rotate-45" />
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-xl shadow-emerald-500/30 transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-75 pointer-events-none"
        } ${
          isHovered
            ? "shadow-emerald-500/50 scale-110 -translate-y-1"
            : "hover:shadow-emerald-500/50 hover:scale-110 hover:-translate-y-1"
        }`}
        aria-label="Chat via WhatsApp"
      >
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30 group-hover:opacity-50" />
        
        {/* Ring pulse */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-300/40 group-hover:border-emerald-300/70 transition-all" />

        {/* WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 md:w-8 md:h-8 relative z-10 drop-shadow-sm"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>
    </div>
  );
}
