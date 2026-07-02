import { FiCheck } from "react-icons/fi";
import { AuthProvider } from "../context/AuthContext";
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import KatalogSection from "../components/landing/KatalogSection";
import KontakSection from "../components/landing/KontakSection";
import FooterLanding from "../components/landing/FooterLanding";

export default function LandingPage() {
  return (
    <AuthProvider>
      <LandingPageContent />
    </AuthProvider>
  );
}

function LandingPageContent() {
  return (
    <div className="w-full min-h-screen bg-white antialiased selection:bg-[#5B5FEF]/20 selection:text-[#5B5FEF] scroll-smooth">
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Katalog Kamar */}
      <KatalogSection />

      {/* Tentang Kami */}
      <section
        id="tentang"
        className="py-20 md:py-28 bg-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <span className="inline-block text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-[#5B5FEF]/10 px-4 py-1.5 rounded-full mb-4">
                Tentang Kami
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                Hotel Premium dengan{" "}
                <span className="text-[#5B5FEF]">Layanan CRM Eksklusif</span>
              </h2>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                luxstay adalah platform CRM hotel premium yang menggabungkan
                kenyamanan menginap bintang 5 dengan sistem manajemen reservasi
                cerdas. Nikmati kemudahan pemesanan kamar, layanan butler 24 jam,
                dan pengalaman menginap yang tak terlupakan.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { number: "150+", label: "Kamar Premium" },
                  { number: "5+", label: "Tipe Kamar" },
                  { number: "5K+", label: "Tamu Puas" },
                  { number: "4.8", label: "Rating Rata-rata" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-black text-[#5B5FEF]">{stat.number}</p>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop"
                  alt="Hotel luxstay"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <FiCheck className="text-emerald-600" size={16} />
                  </div>
                  <span className="text-xs font-bold text-gray-900">
                    Terpercaya
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Terstandarisasi dengan sertifikasi hotel bintang 5 nasional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hubungi Kami / Pengaduan */}
      <KontakSection />

      {/* Footer */}
      <FooterLanding />
    </div>
  );
}
