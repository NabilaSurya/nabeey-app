import { useEffect, useState } from "react";
import { FiStar, FiShield, FiTrendingUp, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function DashboardSection() {
  // State untuk angka berjalan
  const [rating, setRating] = useState(0.0);
  const [bookings, setBookings] = useState(0);
  
  // State untuk Slider Gambar Besar
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
      title: "The Pinnacle of Sophistication",
      tagline: "LuxeStay Exclusive Resort & Spa"
    },
    {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      title: "Where Luxury Meets Nature",
      tagline: "Ocean View Villa & Private Pools"
    }
  ];

  useEffect(() => {
    // Animasi Angka Berjalan (Counter Up)
    let rStart = 0;
    const rTimer = setInterval(() => {
      rStart += 0.1;
      if (rStart >= 4.9) { setRating(4.9); clearInterval(rTimer); }
      else { setRating(parseFloat(rStart.toFixed(1))); }
    }, 30);

    let bStart = 0;
    const bTimer = setInterval(() => {
      bStart += 3;
      if (bStart >= 150) { setBookings(150); clearInterval(bTimer); }
      else { setBookings(bStart); }
    }, 20);

    // Auto-play Slider Besar
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => {
      clearInterval(rTimer);
      clearInterval(bTimer);
      clearInterval(slideTimer);
    };
  }, [slides.length]);

  return (
    // 🛠️ PENYESUAIAN: Mengurangi pt-28 menjadi pt-20 agar konten terangkat naik ke viewport utama
    <section id="dashboard" className="min-h-screen bg-white pt-20 pb-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        
        {/* 1. VISUAL UTAMA: SLIDER GAMBAR BESAR */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 group mb-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-85 visible" : "opacity-0 invisible"
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                  index === currentSlide ? "scale-105" : "scale-100"
                }`}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                <span className="text-amber-400 text-xs font-black uppercase tracking-widest mb-2 block animate-fadeIn">
                  {slide.tagline}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl">
                  {slide.title}
                </h1>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* 🛠️ 2. DATA STATISTIK BERJALAN (DIPINDAHKAN KE ATAS PENJELASAN) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Kotak Rating */}
          <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100/80 shadow-xs">
            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center text-lg">
              <FiStar className="fill-amber-500" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">{rating.toFixed(1)} / 5.0</h4>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">Rating Kepuasan Tamu</p>
            </div>
          </div>

          {/* Kotak Total Bookings */}
          <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100/80 shadow-xs">
            <div className="w-10 h-10 bg-indigo-50 text-[#5B5FEF] rounded-xl flex items-center justify-center text-lg">
              <FiTrendingUp />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">{bookings}k+ Bookings</h4>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">Malam Terverifikasi</p>
            </div>
          </div>

          {/* Kotak Sertifikasi */}
          <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100/80 shadow-xs">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-lg">
              <FiShield />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                100% Verified
              </h4>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">Privasi & Keamanan Data</p>
            </div>
          </div>

        </div>

        {/* 3. PENJELASAN LUXESTAY */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <span className="text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md">
              About LuxeStay
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3 leading-tight">
              A New Era of <br />Luxury Hospitality.
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col gap-6">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              Welcome to <span className="text-slate-900 font-bold">LuxeStay</span>, where world-class comfort meets curated holiday experiences. Kami berkomitmen menyuguhkan lebih dari sekadar tempat menginap—kami merancang ruang di mana setiap detail pelayanan dipersonalisasi khusus demi kenyamanan premium Anda.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Dari pemesanan kamar yang seamless, jaminan tarif eksklusif anggota, hingga layanan concierge 24 jam penuh. Jelajahi berbagai properti bintang lima pilihan kami dan mulailah merajut memori indah yang tak terlupakan bersama keluarga serta komunitas global kami.
            </p>
            <div className="pt-2">
              <a href="#rooms" className="inline-flex bg-[#5B5FEF] hover:bg-[#4834D4] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/15 transition-all transform hover:-translate-y-0.5">
                Book Your Premium Stay Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}