import { useState } from "react";
import { FiUser, FiBell, FiShield, FiGlobe, FiCamera, FiCheck, FiSave, FiLogOut, FiLock, FiActivity, FiKey } from "react-icons/fi";

// Memanggil Komponen Global LuxStay
import InputGroup from "../components/InputGroup";
import ToggleRow from "../components/ToggleRow";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const tabs = [
    { name: "Profile", icon: <FiUser />, desc: "Identitas akun & detail role" },
    { name: "Security", icon: <FiShield />, desc: "Kata sandi & kunci akses" },
    { name: "Notifications", icon: <FiBell />, desc: "Log aktivitas & notifikasi" },
    { name: "Localization", icon: <FiGlobe />, desc: "Bahasa & zona waktu" },
  ];

  return (
    <div className="w-full font-['Inter',_sans-serif] antialiased text-[#151D48] animate-in fade-in duration-500">
      
      {/* ==================== ❌ ROW 1: JUDUL & SUBTITLE TELAH DIHAPUS ==================== */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* ==================== ROW 2: SIDE TAB NAVIGATION ==================== */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-left border transition-all duration-200 group ${
                activeTab === tab.name 
                  ? "bg-white text-[#5B5FEF] border-[#EDF2F7] shadow-[0px_8px_24px_rgba(69,78,124,0.03)] font-bold" 
                  : "text-[#737791] bg-transparent border-transparent hover:bg-white/60 hover:text-[#151D48]"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-200 ${
                activeTab === tab.name 
                  ? "bg-[#F3E8FF] text-[#5B5FEF]" 
                  : "bg-white text-[#737791] group-hover:bg-[#F4F5F9] border border-[#EDF2F7]"
              }`}>
                {tab.icon}
              </div>
              <div>
                <p className="text-sm tracking-tight text-inherit">{tab.name}</p>
                <p className="text-[10px] font-normal text-[#737791] mt-0.5 hidden lg:block">{tab.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ==================== ROW 3: MAIN CONTENT BOX PANEL ==================== */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* TAB 1: PROFILE MANAGEMENT */}
          {activeTab === "Profile" && (
            <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-6 animate-in fade-in duration-300">
              
              {/* Premium Admin Identity Card */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-[#FAFBFF] border border-[#F4F5F9] rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[#5B5FEF] pointer-events-none">
                  <FiUser size={120} />
                </div>
                
                <div className="relative group cursor-pointer">
                  <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-[#EDF2F7] p-1 shadow-xs transition-transform duration-300 group-hover:scale-[1.03]">
                    <img src="https://i.pravatar.cc/150?u=luxuryadmin" alt="Admin Avatar" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-[#5B5FEF] text-white p-2 rounded-lg border-2 border-white shadow-xs hover:bg-[#4a4de0] transition-all">
                    <FiCamera size={11} />
                  </button>
                </div>
                
                <div className="text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <h3 className="text-base font-bold text-[#151D48]">Musfiq Admin</h3>
                    <span className="bg-[#E8F9EE] text-[#3CD856] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Super Admin</span>
                  </div>
                  <p className="text-xs text-[#737791] mt-1">Mengelola hak akses penuh, konfigurasi kamar hotel, laporan keluhan, dan manajemen transaksi.</p>
                  <p className="text-[10px] text-[#A3AED0] mt-2 font-medium">Format: JPEG atau PNG. Maksimal ukuran 800 KB</p>
                </div>
              </div>

              {/* Form Input Akun Admin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <InputGroup label="Nama Lengkap Admin" value="Musfiq Admin" />
                <InputGroup label="Username Backoffice" value="musfiq_root" />
                <InputGroup label="Email Resmi Instansi" value="admin@luxstay.luxury" />
                <InputGroup label="Nomor Telepon Internal" value="+62 21 5550 998" />
              </div>

              {/* Tombol Simpan Terintegrasi Rapi */}
              <div className="flex justify-end pt-2">
                <button 
                  onClick={handleSave}
                  className={`flex items-center gap-2 text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs border transition-all duration-300 ${
                    isSaved 
                      ? "bg-[#DCFCE7] text-[#3CD856] border-[#3CD856]/20" 
                      : "bg-[#5B5FEF] hover:bg-[#4a4de0] text-white border-transparent"
                  }`}
                >
                  {isSaved ? <FiCheck className="animate-bounce" /> : <FiSave />}
                  {isSaved ? "Profil Berhasil Diperbarui" : "Simpan Perubahan Profil"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === "Security" && (
            <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-6 animate-in fade-in duration-300">
              <div className="grid gap-5 max-w-xl text-sm">
                <InputGroup label="Kata Sandi Admin Saat Ini" type="password" placeholder="••••••••" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputGroup label="Kata Sandi Baru" type="password" placeholder="••••••••" />
                  <InputGroup label="Konfirmasi Kata Sandi Baru" type="password" placeholder="••••••••" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#F4F5F9] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-xs">
                <p className="text-[#A3AED0] flex items-center gap-1.5"><FiLock /> Terakhir diubah: 3 bulan yang lalu.</p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-[#FA5A7D] font-bold uppercase tracking-wider hover:text-red-600 transition-colors">
                    <FiLogOut /> Keluarkan Sesi Lain
                  </button>
                  <button onClick={handleSave} className="bg-[#5B5FEF] text-white font-bold py-2 px-4 rounded-xl hover:bg-[#4a4de0] transition-all">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS & AUDIT LOG */}
          {activeTab === "Notifications" && (
            <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-4 animate-in fade-in duration-300">
              <div className="divide-y divide-[#F4F5F9] text-sm">
                <div className="pb-4"><ToggleRow title="Notifikasi Pengaduan Masuk" desc="Kirim pemberitahuan instan saat ada tamu mengirim keluhan baru di portal." active={true} /></div>
                <div className="py-4"><ToggleRow title="Laporan Reservasi Kamar" desc="Dapatkan rangkuman log harian okupansi kamar terjual ke email admin." active={true} /></div>
                <div className="pt-4"><ToggleRow title="Log Aktivitas Keamanan" desc="Beri peringatan jika ada upaya login mencurigakan ke sistem backoffice." active={false} /></div>
              </div>
            </div>
          )}

          {/* TAB 4: LOCALIZATION */}
          {activeTab === "Localization" && (
            <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl text-xs">
                <div>
                  <label className="text-[11px] uppercase font-bold tracking-wider text-[#737791] mb-2 block">Bahasa Dashboard</label>
                  <select className="w-full bg-[#FAFBFF] border border-[#EDF2F7] p-3 rounded-xl text-[#151D48] outline-hidden focus:border-[#5B5FEF] font-medium">
                    <option value="id">Bahasa Indonesia (ID)</option>
                    <option value="en">English (US)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase font-bold tracking-wider text-[#737791] mb-2 block">Format Mata Uang Default</label>
                  <select className="w-full bg-[#FAFBFF] border border-[#EDF2F7] p-3 rounded-xl text-[#151D48] outline-hidden focus:border-[#5B5FEF] font-medium">
                    <option value="idr">IDR (Rp) - Rupiah</option>
                    <option value="usd">USD ($) - Dollar</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="bg-[#5B5FEF] text-white text-xs font-bold py-2.5 px-5 rounded-xl hover:bg-[#4a4de0] transition-all">
                  Simpan Regional
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}