import { useState, useEffect } from "react";
import { 
  FiEdit3, FiAward, FiUsers, FiCheckCircle, FiActivity, 
  FiMapPin, FiEye, FiHeart, FiMail, FiPhone, FiMessageSquare, FiSend 
} from "react-icons/fi";

// Import Komponen Global (Aktif Digunakan & Sinkron Tema)
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MetricCard from "../components/MetricCard";
import ValueCard from "../components/ValueCard";
import ToggleRow from "../components/ToggleRow";

export default function About() {
  const [loading, setLoading] = useState(true);
  
  // State untuk form komplain
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Fasilitas");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    if (!email || !message) {
      alert("Mohon isi email dan pesan komplain Anda.");
      return;
    }
    // Simulasi pengiriman data ke server / helpdesk
    alert(`Komplain berhasil dikirim!\nKategori: ${category}\nKami akan merespons ke ${email} dalam waktu maksimal 1x24 jam.`);
    setEmail("");
    setMessage("");
  };

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
          <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-2 shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] overflow-hidden flex flex-col justify-between">
            <Hero 
              title="LuxStay International Heritage" 
              subtitle="ESTABLISHED SINCE 1994 • ARCHIPELAGO LUXURY" 
              description="Selama lebih dari tiga dekade, LuxStay telah mendefinisikan ulang standar hospitalitas premium dengan memadukan keagungan arsitektur modern dan kehangatan budaya lokal. Kami percaya kemewahan sejati tidak hanya terletak pada fasilitas bintang lima yang kasat mata, melainkan pada ketulusan pelayanan personal yang mengakar di setiap lini operasional kami untuk menciptakan memori abadi."
            />
            <div className="p-4 bg-[#FAFBFF] rounded-xl border border-[#F4F5F9] m-3 mt-0 flex flex-wrap gap-6 text-[11px] text-[#737791]">
              <div><span className="font-bold text-[#151D48]">HQ Location:</span> Seminyak, Bali</div>
              <div><span className="font-bold text-[#151D48]">Legal Entity:</span> PT. LuxStay Heritage Tbk.</div>
              <div><span className="font-bold text-[#151D48]">Certification:</span> CHSE Certified Luxury Resort</div>
            </div>
          </div>

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

        {/* ==================== ROW 3: VALUE CARD GRID ==================== */}
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
              <ToggleRow title="Ultra-Luxury Experience Module" desc="Menampilkan segmen promosi fasilitas premium seperti Private Heliport access di situs utama." active={true} />
            </div>
            <div className="py-2">
              <ToggleRow title="High-Tier Private Security Services" desc="Mengaktifkan klausul transparansi protokol keamanan berlapis bertenaga AI." active={true} />
            </div>
            <div className="py-2">
              <ToggleRow title="Eco-Friendly Sustainability Manifesto" desc="Mempublikasikan laporan reduksi emisi karbon berkala oleh yayasan internal." active={false} />
            </div>
            <div className="pt-2">
              <ToggleRow title="Corporate & MICE Logistics Showcase" desc="Membuka gerbang pemesanan digital untuk ballroom berkapasitas besar." active={true} />
            </div>
          </div>
        </div>

        {/* ==================== ROW 5: NEW CONTACT & COMPLAINT FORM CHANNEL ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SISI KIRI: KARTU KONTAK UTAMA (2 Kolom di Layar Lebar) */}
          <div className="lg:col-span-1 bg-white rounded-[1.5rem] p-6 shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#151D48]">Escalation & Support Channel</h3>
                <p className="text-[11px] text-[#737791]">Hubungi pusat manajemen eksekutif jika kendala memerlukan penanganan manual segera.</p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Saluran Telepon */}
                <div className="flex items-center gap-4 p-3.5 bg-[#FAFBFF] rounded-2xl border border-[#F4F5F9]">
                  <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-[#5B5FEF]">
                    <FiPhone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#737791]">Hotline Priority</p>
                    <p className="text-xs font-bold text-[#151D48]">+62 (21) 8062-7100</p>
                  </div>
                </div>

                {/* Saluran Email */}
                <div className="flex items-center gap-4 p-3.5 bg-[#FAFBFF] rounded-2xl border border-[#F4F5F9]">
                  <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-[#5B5FEF]">
                    <FiMail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#737791]">Corporate Email</p>
                    <p className="text-xs font-bold text-[#151D48]">care@luxstayheritage.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3.5 bg-[#FFF9F1] rounded-xl border border-[#FFD9A1] text-[11px] text-[#FF9209] leading-relaxed">
              <strong>SLA Response:</strong> Email pengaduan melalui form di samping dipantau langsung oleh manajer operasional wilayah (Regional Operations General Manager).
            </div>
          </div>

          {/* SISI KANAN: FORMULIR PENGADUAN ELEKTRONIK (2 Kolom di Layar Lebar) */}
          <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7]">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[#151D48]">Guest Complaint & Escalation Form</h3>
              <p className="text-[11px] text-[#737791]">Isi formulir di bawah ini untuk melaporkan malfungsi pelayanan atau ketidaksesuaian fasilitas kamar.</p>
            </div>

            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#151D48]">Email Pelapor</label>
                  <input 
                    type="email"
                    placeholder="nama.tamu@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAFBFF] border border-[#EDF2F7] focus:border-[#5B5FEF] p-3 rounded-xl text-xs outline-none text-[#151D48] transition-all"
                  />
                </div>

                {/* Dropdown Kategori */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#151D48]">Kategori Masalah</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#FAFBFF] border border-[#EDF2F7] focus:border-[#5B5FEF] p-3 rounded-xl text-xs outline-none text-[#151D48] transition-all"
                  >
                    <option value="Fasilitas">Fasilitas & Kondisi Kamar</option>
                    <option value="Pelayanan">Pelayanan Staf / Butler</option>
                    <option value="Sistem Pembayaran">Sistem Pembayaran / Reservasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Textarea Detail Komplain */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#151D48]">Deskripsi Kronologi Kejadian</label>
                <textarea 
                  rows="3"
                  placeholder="Mohon sebutkan nomor kamar, waktu kejadian, dan detail keluhan Anda secara rinci..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FAFBFF] border border-[#EDF2F7] focus:border-[#5B5FEF] p-3 rounded-xl text-xs outline-none text-[#151D48] transition-all resize-none"
                ></textarea>
              </div>

              {/* Tombol Kirim */}
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#5B5FEF] hover:bg-[#4a4de0] text-white text-xs font-semibold py-2.5 px-5 rounded-xl shadow-xs transition-all duration-200"
                >
                  <FiSend size={12} /> Kirim Pengaduan
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}