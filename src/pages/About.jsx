import { useState, useEffect } from "react";
import { FiEdit3, FiAward, FiUsers, FiCheckCircle, FiActivity, FiMapPin, FiEye, FiShield, FiHeart, FiBriefcase, FiCompass } from "react-icons/fi";

// Import Komponen Global (Aktif Digunakan & Sinkron Tema)
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Hero from "../components/Hero";
import MetricCard from "../components/MetricCard";
import ValueCard from "../components/ValueCard";
import ToggleRow from "../components/ToggleRow";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFBFF] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-7 p-6 md:p-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* ==================== ROW 1: HEADER LAYOUT ==================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#151D48]">Brand Profile</h1>
            <p className="text-xs text-[#737791]">Manage your hotel infrastructure identity, core values, and public global metrics.</p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button 
              onClick={() => alert("Redirecting to Live Preview Mode...")}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-[#151D48] text-xs font-semibold py-2.5 px-4 rounded-xl border border-[#EDF2F7] shadow-xs transition-all duration-200"
            >
              <FiEye size={14} /> View Live Site
            </button>
            <button 
              onClick={() => alert("Opening Content Editor Canvas...")}
              className="flex items-center gap-2 bg-[#5B5FEF] hover:bg-[#4a4de0] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all duration-200"
            >
              <FiEdit3 size={14} /> Edit Content
            </button>
          </div>
        </div>

        {/* ==================== ROW 2: HERO BANNER & METRICS ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Komponen Hero - LuxStay Heritage Premium Profile */}
          <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-2 shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] overflow-hidden flex flex-col justify-between">
            <Hero 
              title="LuxStay International Heritage" 
              subtitle="ESTABLISHED SINCE 1994 • ARCHIPELAGO LUXURY" 
              description="Selama lebih dari tiga dekade, LuxStay telah mendefinisikan ulang standar hospitalitas premium dengan memadukan keagungan arsitektur modern dan kehangatan budaya lokal. Kami percaya kemewahan sejati tidak hanya terletak pada fasilitas bintang lima yang kasat mata, melainkan pada ketulusan pelayanan personal yang mengakar di setiap lini operasional kami untuk menciptakan memori abadi."
            />
            {/* Tambahan metadata kecil di bawah hero untuk memperpadat konten */}
            <div className="p-4 bg-[#FAFBFF] rounded-xl border border-[#F4F5F9] m-3 mt-0 flex flex-wrap gap-6 text-[11px] text-[#737791]">
              <div><span className="font-bold text-[#151D48]">HQ Location:</span> Seminyak, Bali</div>
              <div><span className="font-bold text-[#151D48]">Legal Entity:</span> PT. LuxStay Heritage Tbk.</div>
              <div><span className="font-bold text-[#151D48]">Certification:</span> CHSE Certified Luxury Resort</div>
            </div>
          </div>

          {/* Kumpulan Komponen MetricCard (Diperbanyak jadi 3 baris agar seimbang dengan tinggi Hero) */}
          <div className="flex flex-col gap-4 justify-between">
            <MetricCard 
              title="Awards Won" 
              value="24 Global Titles" 
              subtext="Condé Nast Traveler Excellence & World Luxury Hotel Awards" 
              isPrimary={true} 
              icon={<FiAward size={22} />} 
            />
            <MetricCard 
              title="Global Staff" 
              value="450+ Active Members" 
              subtext="Certified professional hoteliers across 5 regional branches" 
              isPrimary={false} 
              icon={<FiUsers size={22} />} 
            />
            <MetricCard 
              title="Guest Satisfaction" 
              value="98.4% Rating" 
              subtext="Verified aggregate reviews from 50,000+ bookings" 
              isPrimary={false} 
              icon={<FiHeart className="text-[#FA5A7D]" size={22} />} 
            />
          </div>
        </div>

        {/* ==================== ROW 3: VALUE CARD GRID (FULL DETAIL) ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard 
            icon={<FiCheckCircle />} 
            title="Premium 24/7 Butler Service" 
            desc="Sistem koordinasi layanan kamar personal terenkripsi. Setiap tamu VIP didampingi oleh concierge berdedikasi tinggi untuk memenuhi seluruh kebutuhan logistik secara instan." 
            color="bg-[#DCFCE7]" 
            textCol="text-[#3CD856]" 
          />
          <ValueCard 
            icon={<FiActivity />} 
            title="Avant-Garde Architectural Concept" 
            desc="Integrasi tata ruang kelas dunia yang ramah lingkungan dengan sentuhan ornamen etnik lokal, menciptakan keseimbangan estetika yang mewah namun tetap bersahaja." 
            color="bg-[#FFF4DE]" 
            textCol="text-[#FF947A]" 
          />
          <ValueCard 
            icon={<FiMapPin />} 
            title="Highly Strategic Prime Locations" 
            desc="Seluruh properti resort LuxStay dibangun secara eksklusif di titik episentrum pariwisata premium dengan akses langsung ke pemandangan alam terbaik dan pusat distrik kota." 
            color="bg-[#FFE2E5]" 
            textCol="text-[#FA5A7D]" 
          />
        </div>

        {/* ==================== ROW 4: EXPANDED TOGGLE PROTOCOL LIST ==================== */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#151D48]">Brand Administrative Protocols</h3>
            <p className="text-[11px] text-[#737791]">Nyalakan opsi di bawah ini untuk memunculkan detail pilar layanan pada laman informasi publik.</p>
          </div>
          
          <div className="divide-y divide-[#F4F5F9] text-sm">
            <div className="pb-2">
              <ToggleRow 
                title="Ultra-Luxury Experience Module" 
                desc="Menampilkan segmen promosi fasilitas premium seperti Private Heliport access, Yacht rental charters, dan in-room Fine Dining di situs utama." 
                active={true}
              />
            </div>
            <div className="py-2">
              <ToggleRow 
                title="High-Tier Private Security Services" 
                desc="Mengaktifkan klausul transparansi protokol keamanan berlapis, CCTV pengawasan bertenaga AI, serta pengawalan pribadi opsional untuk tamu diplomatik." 
                active={true}
              />
            </div>
            <div className="py-2">
              <ToggleRow 
                title="Eco-Friendly Sustainability Manifesto" 
                desc="Mempublikasikan laporan reduksi emisi karbon berkala dan program perlindungan alam sekitar yang dikelola oleh yayasan internal LuxStay Foundation." 
                active={false}
              />
            </div>
            <div className="pt-2">
              <ToggleRow 
                title="Corporate & MICE Logistics Showcase" 
                desc="Membuka gerbang pemesanan digital untuk ballroom berkapasitas besar, ruang konferensi kedap suara tinggi, dan ruang perjamuan korporasi." 
                active={true}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}