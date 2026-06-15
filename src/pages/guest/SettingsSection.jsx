import { FiShield, FiSliders, FiMessageCircle } from "react-icons/fi";

export default function SettingsSection() {
  return (
    <section id="settings" className="min-h-[40vh] bg-white border-t border-slate-100 py-12 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-between h-full">
        
        {/* Konten Atas */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-extrabold text-slate-800 text-xl flex items-center gap-2 mb-2">
              <FiShield className="text-[#5B5FEF]"/> Keamanan & Enkripsi Data Pelanggan
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Aplikasi demo CRM Luxstay patuh terhadap regulasi perlindungan data pribadi konsumen. Seluruh log riwayat transaksi, email subscription, dan password terenkripsi end-to-end.
            </p>
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-xl flex items-center gap-2 mb-2">
              <FiSliders className="text-purple-500"/> Manajemen Campaign & Gimmick
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Konfigurasi target pelacakan aktivitas durasi penggunaan aplikasi, penarikan data pemenang giveaway, hingga otomatisasi pengiriman SMS promo masal.
            </p>
          </div>
        </div>

        {/* Footer Hak Cipta */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© 2026 Luxstay CRM Platform — Hak Cipta Dilindungi.</p>
          <div className="flex gap-4 font-medium">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="text-slate-300">Post by Mutia Sari</span>
          </div>
        </div>
      </div>

      {/* ==========================================
          FLOATING WHATSAPP BUTTON (TOMBOL MELAYANG WA)
         ========================================== */}
      <a 
        href="https://wa.me/6281234567890?text=Halo%20Admin%20Luxstay,%20saya%20butuh%20bantuan%20terkait%20sistem%20CRM%20dan%20pemesanan%20kamar." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all transform hover:scale-110 z-50 flex items-center justify-center text-3xl group"
        title="Hubungi Admin via WhatsApp"
      >
        <FiMessageCircle />
        <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
          Chat CS WA Aktif
        </span>
      </a>

    </section>
  );
}