import { useState, useEffect } from "react";
import { FiUserPlus, FiMail, FiPhone, FiMoreVertical, FiAward, FiGift, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

// Import Komponen Global (Sesuai dengan standarisasi komponen admin kamu)
import LoadingSpinner from "../components/LoadingSpinner";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

// Database Membership yang Berdiri Mandiri untuk Admin CRM
const initialMemberData = [
  { id: "LX-ALF-2026", name: "Alif Rahman", email: "alif@luxstay.com", phone: "+62 812-3456", room: "Oceanic Deluxe", status: "Terverifikasi", tier: "Gold", points: 1850, totalSpend: "Rp 12.400.000" },
  { id: "LX-SAR-2026", name: "Sarah Jenkins", email: "sarah.j@gmail.com", phone: "+62 855-9988", room: "Royal Penthouse", status: "Terverifikasi", tier: "Diamond", points: 4200, totalSpend: "Rp 48.500.000" },
  { id: "LX-BUD-2026", name: "Budi Santoso", email: "budi_s@yahoo.com", phone: "+62 811-0000", room: "Garden Villa", status: "Terverifikasi", tier: "Silver", points: 450, totalSpend: "Rp 4.200.000" },
  { id: "LX-REK-2026", name: "Reka Wijaya", email: "reka@outlook.com", phone: "+62 812-1122", room: "Standard Room", status: "Pending Approval", tier: "Gold", points: 0, totalSpend: "Rp 0" },
  { id: "LX-DEN-2026", name: "Denny Siregar", email: "denny.s@luxstay.com", phone: "+62 812-0001", room: "Deluxe Suite", status: "Pending Approval", tier: "Silver", points: 0, totalSpend: "Rp 0" },
];

export default function Member() {
  const [members, setMembers] = useState(initialMemberData);
  const [filteredMembers, setFilteredMembers] = useState(initialMemberData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All Tiers");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter Gabungan: Pencarian teks, filter status verifikasi, dan filter reward tier
  useEffect(() => {
    const result = members.filter((member) => {
      const matchSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || member.status === statusFilter;
      const matchTier = tierFilter === "All Tiers" || member.tier === tierFilter;
      
      return matchSearch && matchStatus && matchTier;
    });
    setFilteredMembers(result);
  }, [searchQuery, statusFilter, tierFilter, members]);

  // Fungsi utilitas pewarnaan label tingkatan membership CRM
  const getTierBadgeStyle = (tier) => {
    switch (tier) {
      case "Diamond":
        return "bg-slate-900 text-slate-100 border border-slate-700 shadow-xs";
      case "Platinum":
        return "bg-indigo-50 text-[#5B5FEF] border border-indigo-100";
      case "Gold":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      default:
        return "bg-stone-100 text-stone-600 border border-stone-200";
    }
  };

  // Aksi Admin: Menyetujui pendaftaran member baru langsung di tabel
  const handleApproveMember = (id) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: "Terverifikasi", points: 100 } : m));
    alert(`Member dengan ID ${id} berhasil disetujui dan diverifikasi!`);
  };

  // Perhitungan Data Insight Dashboard Admin
  const pendingCount = members.filter(m => m.status === "Pending Approval").length;
  const totalCirculatingPoints = members.reduce((acc, m) => acc + m.points, 0);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFBFF] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-7 p-6 md:p-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* ==================== ROW 1: HEADER CRM MEMBER ==================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionHeading title="Loyalty Member Management" subtitle={`Mengelola database ${filteredMembers.length} pengajuan & profil member loyalty.`} />
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button 
              onClick={() => alert("Membuka konfigurasi rules point reward...")}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-[#151D48] text-xs font-semibold py-2.5 px-4 rounded-xl border border-[#EDF2F7] shadow-xs transition-all duration-200"
            >
              <FiGift size={14} className="text-[#5B5FEF]" /> Points Config
            </button>
            <PrimaryButton icon={<FiUserPlus size={16} />} onClick={() => alert("Registrasi Member Baru via Backoffice Admin")}>
              Add New Member
            </PrimaryButton>
          </div>
        </div>

        {/* ==================== ROW 2: LOYALTY INSIGHT CARDS ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><FiUserPlus size={22} /></div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Butuh Persetujuan Admin</p>
              <h4 className={`text-base font-extrabold mt-0.5 ${pendingCount > 0 ? "text-amber-600 animate-pulse" : "text-[#151D48]"}`}>
                {pendingCount} Registrasi Baru
              </h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-indigo-50 text-[#5B5FEF] rounded-xl flex items-center justify-center"><FiAward size={22} /></div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Total Poin Member Beredar</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">{totalCirculatingPoints.toLocaleString()} PTS</h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><FiTrendingUp size={22} /></div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Rasio Konversi Akun Premium</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">84.5% Verified</h4>
            </div>
          </div>
        </div>

        {/* ==================== ROW 3: TOOLBAR FILTERS ==================== */}
        <div className="bg-white p-4 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] flex flex-col lg:flex-row gap-4 items-center border border-[#EDF2F7]">
          <div className="flex-1 w-full">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari berdasarkan nama member, kode unik ID, atau email..." />
          </div>
          <div className="flex flex-wrap w-full lg:w-auto items-center gap-3">
            {/* Filter Status Verifikasi */}
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#FAFBFF] border border-[#EDF2F7] text-xs font-semibold py-2.5 px-4 rounded-xl text-[#151D48] outline-none"
            >
              <option value="All">Semua Status</option>
              <option value="Terverifikasi">Terverifikasi</option>
              <option value="Pending Approval">Pending Approval</option>
            </select>

            {/* Filter Reward Tiers */}
            <select 
              value={tierFilter} 
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-[#FAFBFF] border border-[#EDF2F7] text-xs font-semibold py-2.5 px-4 rounded-xl text-[#151D48] outline-none"
            >
              <option value="All Tiers">All Reward Tiers</option>
              <option value="Diamond">Diamond Tier</option>
              <option value="Platinum">Platinum Tier</option>
              <option value="Gold">Gold Tier</option>
              <option value="Silver">Silver Tier</option>
            </select>
          </div>
        </div>

        {/* ==================== ROW 4: DATA TABLE WORKSPACE ==================== */}
        <div className="bg-white rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] overflow-hidden border border-[#EDF2F7]">
          {filteredMembers.length === 0 ? (
            <EmptyState message="Tidak ada database member yang cocok dengan parameter filter." onClear={() => { setSearchQuery(""); setStatusFilter("All"); setTierFilter("All Tiers"); }} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-white border-b border-[#F4F5F9]">
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Member Identity</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">CRM Reward Tier</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Loyalty Points & Spent</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Preferred Room / Kontak</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Status Verifikasi</th>
                    <th className="px-7 py-4.5 text-right text-[12px] font-bold text-[#737791] tracking-wider uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F5F9] text-sm">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-[#FAFBFF] transition-colors group">
                      
                      {/* Kolom 1: Profil & Identitas Member */}
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-xl font-bold text-sm flex items-center justify-center uppercase shadow-xs ${
                            member.status === "Pending Approval" ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-indigo-50 text-[#5B5FEF]"
                          }`}>
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#151D48] group-hover:text-[#5B5FEF] transition-colors duration-150">
                              {member.name}
                            </span>
                            <span className="text-[11px] text-[#737791] font-mono mt-0.5">{member.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Kolom 2: Tier Membership */}
                      <td className="px-7 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide ${getTierBadgeStyle(member.tier)}`}>
                          {member.tier} Member
                        </span>
                      </td>

                      {/* Kolom 3: Akumulasi Poin & Financial spent */}
                      <td className="px-7 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#151D48]">
                            {member.points.toLocaleString()} <span className="text-[10px] text-[#737791] font-medium">pts</span>
                          </span>
                          <span className="text-[11px] text-[#737791] mt-0.5">Spent: {member.totalSpend}</span>
                        </div>
                      </td>

                      {/* Kolom 4: Kontak & Pref Kamar */}
                      <td className="px-7 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-[#151D48] font-bold">{member.room}</span>
                          <div className="flex gap-3.5 mt-1.5 text-[#737791]">
                            <FiMail size={14} className="hover:text-[#5B5FEF] cursor-pointer transition-colors" onClick={() => alert(`Kirim penawaran eksklusif ke: ${member.email}`)} title={member.email} />
                            <FiPhone size={14} className="hover:text-[#5B5FEF] cursor-pointer transition-colors" title={member.phone} />
                          </div>
                        </div>
                      </td>

                      {/* Kolom 5: Status Kontrol Terintegrasi Component */}
                      <td className="px-7 py-4">
                        {member.status === "Terverifikasi" ? (
                          <StatusBadge status="Completed" text="Terverifikasi" />
                        ) : (
                          <StatusBadge status="In-House" text="Pending Approval" />
                        )}
                      </td>

                      {/* Kolom 6: Tombol Akselerasi Admin & Dropdown */}
                      <td className="px-7 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {member.status === "Pending Approval" && (
                            <button 
                              onClick={() => handleApproveMember(member.id)}
                              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-xs transition-all"
                            >
                              <FiCheckCircle size={13} /> Approve
                            </button>
                          )}
                          <button 
                            onClick={() => alert(`Membuka Preferensi Kamar & Riwayat CRM: ${member.name}`)}
                            className="p-2 bg-white text-[#737791] rounded-xl hover:bg-[#5B5FEF] hover:text-white border border-[#EDF2F7] hover:border-transparent transition-all duration-150 shadow-xs inline-flex items-center justify-center"
                          >
                            <FiMoreVertical size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}