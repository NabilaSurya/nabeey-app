import { useState, useEffect } from "react";
import { 
  FiCheckCircle, FiClock, FiAlertTriangle, FiMessageSquare, 
  FiSend, FiCornerUpLeft, FiActivity, FiFilter, FiUserCheck 
} from "react-icons/fi";

// Import Komponen Global (Aktif Digunakan & Sinkron Tema)
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";

// Database Log Komplain Masuk Real-Time
const initialComplaints = [
  { id: "TK-9021", guest: "Alexander Graham", room: "Room 304 (Oceanic Deluxe)", category: "Fasilitas", message: "AC di kamar mengeluarkan suara bising dan kurang dingin sejak sore.", time: "10 Mins Ago", status: "New", priority: "Medium" },
  { id: "TK-9022", guest: "Sarah Connor", room: "Room 501 (Royal Penthouse)", category: "Pelayanan", message: "Butler tidak mengantarkan handuk tambahan yang diminta sejak 2 jam lalu.", time: "25 Mins Ago", status: "In-Progress", priority: "High" },
  { id: "TK-9023", guest: "Bruce Wayne", room: "Villa 02 (Garden Villa)", category: "Sistem Pembayaran", message: "Terjadi double-charge deposit kartu kredit pada saat proses check-in.", time: "1 Hour Ago", status: "Resolved", priority: "High" },
  { id: "TK-9024", guest: "Diana Prince", room: "Room 412 (Sky Loft Penthouse)", category: "Fasilitas", message: "Koneksi Wi-Fi terputus total saat rapat kerja krusial via Zoom.", time: "2 Hours Ago", status: "In-Progress", priority: "Medium" },
];

export default function About() {
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // State untuk menangani respons admin cepat
  const [activeTicket, setActiveTicket] = useState(null);
  const [adminReply, setAdminReply] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter Log Komplain
  const filteredComplaints = complaints.filter((item) => {
    const matchSearch = item.guest.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Aksi Update Status / Kirim Balasan
  const handleSendResponse = (e) => {
    e.preventDefault();
    if (!adminReply.trim()) return;

    setComplaints(prev => prev.map(t => 
      t.id === activeTicket ? { ...t, status: "Resolved" } : t
    ));

    alert(`Respon Helpdesk sukses dikirim ke tiket ${activeTicket}! Status tiket otomatis diubah menjadi Resolved.`);
    setAdminReply("");
    setActiveTicket(null);
  };

  // Pewarnaan Label Status Tiket Pengaduan
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "New": return "bg-red-50 text-red-600 border border-red-100";
      case "In-Progress": return "bg-amber-50 text-amber-600 border border-amber-100";
      case "Resolved": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  // Pewarnaan Prioritas Masalah
  const getPriorityStyle = (priority) => {
    return priority === "High" ? "text-red-500 font-bold" : "text-amber-500 font-semibold";
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFBFF] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      {/* Jarak atas diatur super rapat dengan pt-2 px-6 */}
      <div className="space-y-5 pt-2 px-6 pb-6 md:px-8 md:pb-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* ==================== ROW 1: TOP EXECUTIVE COUNTER (HELPDESK STATS) ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-[#EDF2F7] p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center"><FiAlertTriangle size={18} /></div>
            <div>
              <p className="text-[10px] text-[#737791] font-bold uppercase tracking-wider">Tiket Baru</p>
              <h4 className="text-base font-black text-[#151D48] mt-0.5">1 Antrean</h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><FiClock size={18} /></div>
            <div>
              <p className="text-[10px] text-[#737791] font-bold uppercase tracking-wider">Sedang Ditangani</p>
              <h4 className="text-base font-black text-[#151D48] mt-0.5">2 Kasus</h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><FiCheckCircle size={18} /></div>
            <div>
              <p className="text-[10px] text-[#737791] font-bold uppercase tracking-wider">Berhasil Selesai</p>
              <h4 className="text-base font-black text-[#151D48] mt-0.5">1 Kasus</h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 bg-indigo-50 text-[#5B5FEF] rounded-xl flex items-center justify-center"><FiActivity size={18} /></div>
            <div>
              <p className="text-[10px] text-[#737791] font-bold uppercase tracking-wider">Avg. Response Time</p>
              <h4 className="text-base font-black text-[#151D48] mt-0.5">14 Menit</h4>
            </div>
          </div>
        </div>

        {/* ==================== ROW 2: CONTROL FILTERS TOOLBAR ==================== */}
        <div className="bg-white p-4 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] flex flex-col md:flex-row gap-4 items-center border border-[#EDF2F7]">
          <div className="flex-1 w-full">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari ID tiket, nama tamu pelapor, atau nomor kamar..." />
          </div>
          <div className="w-full md:w-auto">
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={["All", "New", "In-Progress", "Resolved"]} />
          </div>
        </div>

        {/* ==================== ROW 3: TWO COLUMN GRID WORKSPACE ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* TABEL LIST PENGADUAN UTAMA (Makan 2 Kolom) */}
          <div className="lg:col-span-2 bg-white rounded-[1.5rem] border border-[#EDF2F7] overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-[#F4F5F9]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#737791]">Active Escalation Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-[#FAFBFF] border-b border-[#F4F5F9]">
                    <th className="px-6 py-3.5 text-[11px] font-bold text-[#737791] uppercase">Info Tiket</th>
                    <th className="px-6 py-3.5 text-[11px] font-bold text-[#737791] uppercase">Detail Deskripsi Keluhan</th>
                    <th className="px-6 py-3.5 text-[11px] font-bold text-[#737791] uppercase">Prioritas</th>
                    <th className="px-6 py-3.5 text-[11px] font-bold text-[#737791] uppercase">Status</th>
                    <th className="px-6 py-3.5 text-center text-[11px] font-bold text-[#737791] uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F5F9] text-xs">
                  {filteredComplaints.map((item) => (
                    <tr key={item.id} className={`hover:bg-[#FAFBFF] transition-colors ${activeTicket === item.id ? "bg-[#F5F6FA]" : ""}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#5B5FEF]">{item.id}</span>
                          <span className="font-extrabold text-[#151D48] mt-0.5">{item.guest}</span>
                          <span className="text-[10px] text-[#737791] mt-0.5">{item.room}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-slate-500 text-[10px] uppercase">Kategori: {item.category}</span>
                          <p className="text-[#151D48] font-medium leading-relaxed line-clamp-2">{item.message}</p>
                          <span className="text-[10px] text-stone-400 mt-1">{item.time}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${getPriorityStyle(item.priority)}`}>
                        {item.priority}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] ${getStatusBadgeStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.status !== "Resolved" ? (
                          <button 
                            onClick={() => { setActiveTicket(item.id); setAdminReply(""); }}
                            className="px-3 py-1.5 bg-[#F3E8FF] text-[#5B5FEF] hover:bg-[#5B5FEF] hover:text-white rounded-lg font-bold transition-all"
                          >
                            Tanggapi
                          </button>
                        ) : (
                          <span className="text-emerald-500 font-bold flex items-center justify-center gap-1"><FiUserCheck size={13} /> Clear</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PANEL TINDAKAN INTERAKTIF CONSOLE (Makan 1 Kolom) */}
          <div className="bg-white rounded-[1.5rem] p-5 border border-[#EDF2F7] shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#737791] mb-4">Response Action Center</h3>
            
            {activeTicket ? (
              <form onSubmit={handleSendResponse} className="space-y-4">
                <div className="bg-[#FAFBFF] p-3.5 rounded-xl border border-[#EDF2F7]">
                  <p className="text-[10px] font-bold text-[#737791] uppercase">Memproses Tiket Actif:</p>
                  <p className="text-xs font-extrabold text-[#5B5FEF] mt-0.5">{activeTicket}</p>
                  <p className="text-xs italic text-[#737791] mt-2 bg-white p-2.5 rounded-lg border border-[#F4F5F9] line-clamp-3">
                    "{complaints.find(c => c.id === activeTicket)?.message}"
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#151D48]">Instruksi Delegasi / Respon Tamu</label>
                  <textarea 
                    rows="4"
                    required
                    value={adminReply}
                    onChange={(e) => setAdminReply(e.target.value)}
                    placeholder="Tulis instruksi perbaikan untuk staf lapangan atau draf balasan resmi untuk tamu hotel..."
                    className="w-full bg-[#FAFBFF] border border-[#EDF2F7] focus:border-[#5B5FEF] p-3 rounded-xl text-xs outline-none text-[#151D48] transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-2 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setActiveTicket(null)}
                    className="px-3 py-2 bg-[#FFE2E5] text-[#FA5A7D] font-bold text-xs rounded-xl hover:opacity-90"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex items-center gap-1.5 bg-[#5B5FEF] hover:bg-[#4a4de0] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs transition-all"
                  >
                    <FiSend size={11} /> Submit & Close Ticket
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 px-4 text-center border-2 border-dashed border-[#EDF2F7] rounded-2xl flex flex-col items-center justify-center text-[#737791]">
                <FiMessageSquare size={32} className="text-stone-300 mb-2.5" />
                <p className="text-xs font-bold">Tidak ada tiket yang dipilih</p>
                <p className="text-[11px] text-[#737791] mt-1 max-w-[180px] mx-auto">Silakan klik tombol "Tanggapi" pada tabel log antrean komplain.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}