import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const scrollToKatalog = () => {
    const el = document.getElementById("katalog");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full pt-24 pb-16">
        <div
          className={`max-w-2xl transition-all duration-1000 transform ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Hotel & Resort CRM Premium
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Lebih dari Sekadar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
              Tempat Menginap
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-5 text-base md:text-lg text-gray-200/90 leading-relaxed max-w-xl">
            Nikmati perpaduan sempurna antara kemewahan modern dan kenyamanan rumah
            di luxstay. Pesan kamar Anda sekarang dan nikmati layanan CRM eksklusif.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToKatalog}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5B5FEF] hover:bg-[#4a4ce0] text-white font-bold text-sm rounded-xl shadow-xl shadow-[#5B5FEF]/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Pesan Kamar Sekarang
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
            <button
              onClick={scrollToKatalog}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/25 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Lihat Kamar
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 flex items-center gap-8 text-white/80">
          <div>
            <p className="text-2xl font-black text-white">150+</p>
            <p className="text-xs font-medium mt-0.5">Kamar Premium</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div>
            <p className="text-2xl font-black text-white">5K+</p>
            <p className="text-xs font-medium mt-0.5">Tamu Puas</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div>
            <p className="text-2xl font-black text-white">4.8</p>
            <p className="text-xs font-medium mt-0.5">Rating Rata-rata</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/60 rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
