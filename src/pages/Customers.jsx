import { useState, useEffect } from "react";
import { FiUserPlus, FiMail, FiPhone, FiMoreVertical, FiAward, FiGift, FiTrendingUp } from "react-icons/fi";

// Import Komponen Global (Semua Terpasang Nyata & Sinkron Tema)
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import FilterSelect from "../components/FilterSelect";
import StatusBadge from "../components/StatusBadge";

// Database Tamu yang Diperluas dengan Data CRM (Tier, Loyalty Points, & Total Spend)
const customerData = [
  { id: "C-001", name: "Alexander Graham", email: "alex@example.com", phone: "+62 812-3456", room: "Oceanic Deluxe", checkIn: "12 May", checkOut: "15 May", status: "In-House", tier: "Gold", points: 2450, totalSpend: "Rp 14.500.000" },
  { id: "C-002", name: "Sarah Connor", email: "sarah@sky.net", phone: "+62 855-9988", room: "Royal Penthouse", checkIn: "14 May", checkOut: "20 May", status: "In-House", tier: "Diamond", points: 8900, totalSpend: "Rp 62.000.000" },
  { id: "C-003", name: "Bruce Wayne", email: "bruce@bat.com", phone: "+62 811-0000", room: "Garden Villa", checkIn: "10 May", checkOut: "14 May", status: "Checking Out", tier: "Diamond", points: 12400, totalSpend: "Rp 94.500.000" },
  { id: "C-004", name: "Diana Prince", email: "diana@themyscira.io", phone: "+62 812-1122", room: "Sky Loft Penthouse", checkIn: "13 May", checkOut: "16 May", status: "In-House", tier: "Platinum", points: 5100, totalSpend: "Rp 38.200.000" },
  { id: "C-010", name: "Arthur Curry", email: "aquaman@atlantis.com", phone: "+62 812-0001", room: "Oceanic Deluxe", checkIn: "10 May", checkOut: "20 May", status: "Completed", tier: "Silver", points: 850, totalSpend: "Rp 5.400.000" },
];

export default function Customers() {
  const [filteredGuests, setFilteredGuests] = useState(customerData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All Tiers");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter gabungan: Pencarian teks, filter status kamar, dan filter tingkatan CRM Reward
  useEffect(() => {
    const result = customerData.filter((guest) => {
      const matchSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          guest.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guest.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || guest.status === statusFilter;
      const matchTier = tierFilter === "All Tiers" || guest.tier === tierFilter;
      
      return matchSearch && matchStatus && matchTier;
    });
    setFilteredGuests(result);
  }, [searchQuery, statusFilter, tierFilter]);

  // Fungsi utilitas untuk pewarnaan label tingkatan membership CRM
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFBFF] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-7 p-6 md:p-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* ==================== ROW 1: HEADER CRM ==================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionHeading title="Guest CRM & Loyalty Hub" subtitle={`Mengelola database dari ${filteredGuests.length} profil pelanggan premium terdaftar.`} />
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button 
              onClick={() => alert("Membuka katalog penukaran rewards hotel...")}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-[#151D48] text-xs font-semibold py-2.5 px-4 rounded-xl border border-[#EDF2F7] shadow-xs transition-all duration-200"
            >
              <FiGift size={14} className="text-[#5B5FEF]" /> Claim Rewards
            </button>
            <PrimaryButton icon={<FiUserPlus size={16} />} onClick={() => alert("Registrasi Member CRM Baru")}>
              Add New Member
            </PrimaryButton>
          </div>
        </div>

        {/* ==================== ROW 2: LOYALTY INSIGHT CARDS ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-indigo-50 text-[#5B5FEF] rounded-xl flex items-center justify-center"><FiAward size={22} /></div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Total Elite Tier Members</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">4 Guests Diamond/Platinum</h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><FiGift size={22} /></div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Circulating Loyalty Points</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">24,700 Points</h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><FiTrendingUp size={22} /></div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Average Customer Lifetime Value</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">Rp 42.920.000 / Tamu</h4>
            </div>
          </div>
        </div>

        {/* ==================== ROW 3: REWARD TOOLBAR FILTERS ==================== */}
        <div className="bg-white p-4 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] flex flex-col lg:flex-row gap-4 items-center border border-[#EDF2F7]">
          <div className="flex-1 w-full">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari nama member, ID unik, atau tipe kamar eksklusif..." />
          </div>
          <div className="flex flex-wrap w-full lg:w-auto items-center gap-3">
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={["All", "In-House", "Checking Out", "Completed"]} />
            {/* Filter khusus untuk menyaring jenjang tingkatan hadiah member */}
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

        {/* ==================== ROW 4: CUSTOMER CRM DATA TABLE ==================== */}
        <div className="bg-white rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] overflow-hidden border border-[#EDF2F7]">
          {filteredGuests.length === 0 ? (
            <EmptyState message="Tidak ada profil loyalitas member yang cocok dengan pencarian Anda." onClear={() => { setSearchQuery(""); setStatusFilter("All"); setTierFilter("All Tiers"); }} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-white border-b border-[#F4F5F9]">
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Guest Identity</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">CRM Reward Status</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Accumulated Points</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Room & Channels</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Room Status</th>
                    <th className="px-7 py-4.5 text-right text-[12px] font-bold text-[#737791] tracking-wider uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F5F9] text-sm">
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-[#FAFBFF] transition-colors group">
                      {/* Kolom 1: Profil & Identitas Tamu */}
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-[#5B5FEF] font-bold text-sm flex items-center justify-center uppercase shadow-xs">
                            {guest.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#151D48] group-hover:text-[#5B5FEF] transition-colors duration-150">
                              {guest.name}
                            </span>
                            <span className="text-[11px] text-[#737791] font-medium mt-0.5">{guest.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Kolom 2: Tier Hadiah CRM (Fitur Baru) */}
                      <td className="px-7 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide ${getTierBadgeStyle(guest.tier)}`}>
                          {guest.tier} Member
                        </span>
                      </td>

                      {/* Kolom 3: Poin dan Total Transaksi Keuangan Tamu (Fitur Baru) */}
                      <td className="px-7 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#151D48] flex items-center gap-1">
                            {guest.points.toLocaleString()} <span className="text-[10px] text-[#737791] font-medium">pts</span>
                          </span>
                          <span className="text-[11px] text-[#737791] mt-0.5">Value: {guest.totalSpend}</span>
                        </div>
                      </td>

                      {/* Kolom 4: Detail Kamar & Tombol Interaksi Cepat */}
                      <td className="px-7 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-[#151D48] font-bold">{guest.room}</span>
                          <div className="flex gap-3.5 mt-1.5 text-[#737791]">
                            <FiMail size={14} className="hover:text-[#5B5FEF] cursor-pointer transition-colors" onClick={() => alert(`Mengirim e-voucher penawaran khusus ke ${guest.email}`)} title={guest.email} />
                            <FiPhone size={14} className="hover:text-[#5B5FEF] cursor-pointer transition-colors" title={guest.phone} />
                          </div>
                        </div>
                      </td>

                      {/* Kolom 5: Status Badge */}
                      <td className="px-7 py-4">
                        <StatusBadge status={guest.status} />
                      </td>

                      {/* Kolom 6: Tombol Aksi Dropdown Menu */}
                      <td className="px-7 py-4 text-right">
                        <button 
                          onClick={() => alert(`Membuka berkas rekam jejak riwayat menginap & preferensi makanan ${guest.name}`)}
                          className="p-2 bg-white text-[#737791] rounded-xl hover:bg-[#5B5FEF] hover:text-white border border-[#EDF2F7] hover:border-transparent transition-all duration-150 shadow-xs inline-flex items-center justify-center"
                        >
                          <FiMoreVertical size={15} />
                        </button>
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