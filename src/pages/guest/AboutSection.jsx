import { useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiStar, FiSend, FiMail, FiUser, FiMessageSquare } from "react-icons/fi";

export default function ServicesSection() {
  // State untuk form pengaduan
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Data Log interaksi bawaan
  const interactions = [
    {
      id: "TK-402",
      type: "Komplain Fasilitas",
      user: "Rian Hidayat",
      desc: "AC kamar bocor halus di kamar Suite 204. Butuh perbaikan cepat.",
      status: "Selesai",
      date: "14 Jun 2026",
      adminNote: "Teknisi sudah memperbaiki pipa pembuangan AC, aman.",
      rating: 4
    },
    {
      id: "TK-399",
      type: "Bantuan Finansial",
      user: "Budi Santoso",
      desc: "Salah kirim nominal pembayaran tiket upgrade kamar Deluxe.",
      status: "Diproses",
      date: "15 Jun 2026",
      adminNote: "Sedang menunggu approval berkas refund dari finance.",
      rating: null
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.complaint) {
      setIsSubmitted(true);
      // Reset form setelah beberapa detik
      setTimeout(() => {
        setFormData({ name: "", email: "", complaint: "" });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section id="services" className="min-h-screen bg-white py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* HEADER UTAMA SEKSI */}
        <div className="mb-12">
          <span className="text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md">
            Pusat Layanan
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-2">
            Pusat Bantuan & Log Komplain Pelanggan
          </h2>
          <p className="text-sm text-slate-500">
            Kirim pengaduan Anda secara instan atau pantau status penyelesaian tiket di bawah.
          </p>
        </div>

        {/* LAYOUT GRID: KIRI FORM PENGADUAN, KANAN DAFTAR LOG KADUAN */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* KOLOM FORM PENGADUAN CEPAT (YANG DITULIS TADI) */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl shadow-sm lg:sticky lg:top-24">
            <div className="mb-6">
              <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
                <FiMail className="text-[#5B5FEF]" /> Form Pengaduan Cepat
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tulis kendala Anda, tim CRM kami akan langsung memprosesnya.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex flex-col items-center text-center gap-2 animate-fadeIn">
                <FiCheckCircle size={28} className="text-emerald-500" />
                <div>
                  <p className="font-bold">Pengaduan Berhasil Dikirim!</p>
                  <p className="text-slate-500 mt-0.5">Tiket baru telah dibuat, cek email Anda secara berkala.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Input Nama */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                    <FiUser size={12} /> Nama Lengkap
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Fajar Ramadhan"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#5B5FEF] transition-colors"
                  />
                </div>

                {/* Input Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                    <FiMail size={12} /> Alamat Email Kamu
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="fajar@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#5B5FEF] transition-colors"
                  />
                </div>

                {/* Input Isi Komplain */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                    <FiMessageSquare size={12} /> Isi Keluhan / Pengaduan
                  </label>
                  <textarea 
                    rows="4"
                    required
                    placeholder="Tuliskan detail keluhan atau fasilitas kamar yang bermasalah di sini..."
                    value={formData.complaint}
                    onChange={(e) => setFormData({...formData, complaint: e.target.value})}
                    className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#5B5FEF] transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Tombol Submit */}
                <button 
                  type="submit" 
                  className="w-full bg-[#5B5FEF] hover:bg-[#4834D4] text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  <FiSend size={14} /> Kirim Pengaduan
                </button>
              </form>
            )}
          </div>

          {/* KOLOM LOG RIWAYAT KOMPLAIN (KANAN - AMBIL 2 SPAN) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider pl-1">
              Live Tracker Tiket Keluhan
            </h3>
            
            {interactions.map((item) => (
              <div key={item.id} className="border border-slate-100 p-6 rounded-2xl bg-slate-50 shadow-sm relative">
                
                {/* Bagian Atas Tiket */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.id}
                    </span>
                    <h3 className="font-bold text-slate-800 text-base mt-1">{item.type}</h3>
                    <p className="text-xs text-indigo-600 font-semibold">
                      Oleh: {item.user} · <span className="text-slate-400 font-normal">{item.date}</span>
                    </p>
                  </div>
                  
                  {/* Status Kaduan */}
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status === 'Selesai' ? <FiCheckCircle /> : <FiAlertCircle />} {item.status}
                  </span>
                </div>

                {/* Isi Pengaduan Tamu */}
                <p className="text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100 mb-4 italic">
                  "{item.desc}"
                </p>

                {/* Balasan / Catatan Admin */}
                <div className="bg-indigo-50/50 border border-indigo-100/60 p-3 rounded-xl text-xs text-slate-700">
                  <span className="font-bold text-[#5B5FEF] uppercase tracking-wider block mb-1">
                    Catatan Internal Admin:
                  </span>
                  {item.adminNote}
                </div>

                {/* Review Bintang Kepuasan */}
                {item.rating && (
                  <div className="flex gap-1 items-center mt-3 text-amber-400 text-sm">
                    <span className="text-xs text-slate-400 mr-1 font-medium">Rating Feedback:</span>
                    {[...Array(item.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-current"/>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}