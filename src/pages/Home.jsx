import { useState, useEffect } from "react";
import { FiPieChart, FiShoppingBag, FiTag, FiUserPlus, FiTrendingUp, FiStar, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Import Komponen Global 
import LoadingSpinner from "../components/LoadingSpinner";

// DATABASE UTAMA: Basis data riil tamu & member
const customerData = [
  { id: "C-001", name: "Alexander Graham", room: "Oceanic Deluxe", status: "In-House", tier: "Gold", points: 2450, spendValue: 14500000, color: "bg-amber-500", width: "65%" },
  { id: "C-002", name: "Sarah Connor", room: "Royal Penthouse", status: "In-House", tier: "Diamond", points: 8900, spendValue: 62000000, color: "bg-slate-900", width: "90%" },
  { id: "C-003", name: "Bruce Wayne", room: "Garden Villa", status: "Checking Out", tier: "Diamond", points: 12400, spendValue: 94500000, color: "bg-slate-900", width: "98%" },
  { id: "C-004", name: "Diana Prince", room: "Sky Loft Penthouse", status: "In-House", tier: "Platinum", points: 5100, spendValue: 38200000, color: "bg-[#5B5FEF]", width: "80%" },
  { id: "C-010", name: "Arthur Curry", room: "Oceanic Deluxe", status: "Completed", tier: "Silver", points: 850, spendValue: 5400000, color: "bg-[#3CD856]", width: "40%" },
];

// Data Grafik Batang Sesuai Template Asli (Online vs Offline Booking)
const revenueData = [
  { name: 'Mon', Online: 12000, Offline: 9000 },
  { name: 'Tue', Online: 15000, Offline: 11000 },
  { name: 'Wed', Online: 18000, Offline: 14000 },
  { name: 'Thu', Online: 14000, Offline: 10000 },
  { name: 'Fri', Online: 21000, Offline: 12500 },
  { name: 'Sat', Online: 25000, Offline: 18000 },
  { name: 'Sun', Online: 22000, Offline: 15000 },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Perhitungan Logis Otomatis Dashboard
  const totalRevenue = customerData.reduce((acc, curr) => acc + curr.spendValue, 0);
  const totalPoints = customerData.reduce((acc, curr) => acc + curr.points, 0);
  const activeGuests = customerData.filter(g => g.status === "In-House" || g.status === "Checking Out").length;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const formatRupiah = (num) => {
    return "Rp " + (num / 1000000).toFixed(1) + " M";
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFBFF] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-6 pt-2 px-6 pb-6 md:px-8 md:pb-8 animate-in fade-in duration-500 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* ==================== ROW 1: TOP SALE CARDS ==================== */}
        <div className="bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="p-2 bg-[#EF4444]/10 rounded-xl w-fit mb-2 text-[#FA5A7D]">
              <FiTrendingUp size={18} />
            </div>
            <h3 className="text-base font-bold text-[#151D48]">Today's Sales</h3>
            <p className="text-xs text-[#737791] mt-0.5">Sales summary</p>
          </div>
          
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <SaleCard icon={<FiPieChart />} color="bg-[#FFE2E5]" textCol="text-[#FA5A7D]" label="Total Gross Revenue" val={formatRupiah(totalRevenue)} sub="+8.2%" isUp={true} />
            <SaleCard icon={<FiShoppingBag />} color="bg-[#FFF4DE]" textCol="text-[#FF947A]" label="Active Bookings" val={`${activeGuests} Rooms`} sub="+5.4%" isUp={true} />
            <SaleCard icon={<FiTag />} color="bg-[#DCFCE7]" textCol="text-[#3CD856]" label="Loyalty Points" val={totalPoints.toLocaleString()} sub="+1.2%" isUp={true} />
            <SaleCard icon={<FiUserPlus />} color="bg-[#F3E8FF]" textCol="text-[#5B5FEF]" label="Total Customers" val={customerData.length.toString()} sub="+0.5%" isUp={true} />
          </div>
        </div>

        {/* ==================== ROW 2: REVENUE GRAPH (LEFT) & ROOM PREVIEW (RIGHT) ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* KIRI: Grafik Batang Ganda bawaan template asli */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] flex flex-col h-[320px]">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h3 className="text-sm font-bold text-[#151D48]">Total Revenue</h3>
              <div className="flex gap-3 text-[11px] font-medium text-[#737791]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#5B5FEF]"></span>Online</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#3CD856]"></span>Offline</span>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} barGap={6} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#F4F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#737791', fontWeight: 500}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#737791', fontWeight: 500}} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip cursor={{fill: '#F8F9FC', opacity: 0.4}} contentStyle={{ borderRadius: '10px', border: '1px solid #EDF2F7', fontSize: '11px' }} />
                  <Bar dataKey="Online" fill="#5B5FEF" radius={[4, 4, 0, 0]} barSize={14} />
                  <Bar dataKey="Offline" fill="#3CD856" radius={[4, 4, 0, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KANAN: Gambar pratinjau kamar paling banyak dipesan */}
          <div className="bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] flex flex-col justify-between h-[320px]">
            <div>
              <h3 className="text-sm font-bold text-[#151D48] mb-0.5">Top Favorite Room</h3>
              <p className="text-[11px] text-[#737791] mb-4">Most wanted choice from guest bookings</p>
            </div>
            
            <div className="bg-[#FAFBFF] p-4 rounded-xl border border-[#F4F5F9] flex flex-col justify-between h-full">
              <div className="w-full h-24 bg-slate-200 rounded-lg overflow-hidden relative mb-2">
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-bold text-[#FF947A] flex items-center gap-0.5">
                  <FiStar className="fill-current" /> 5.0
                </div>
                <div className="w-full h-full bg-linear-to-br from-[#5B5FEF]/20 to-[#3CD856]/20 flex items-center justify-center text-xs font-semibold text-[#737791]">
                  Garden Villa Preview Image
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#151D48]">Garden Villa</h4>
                <p className="text-[11px] text-[#737791]">Luxury Stay • Reserved by Bruce Wayne</p>
              </div>
              <div className="flex justify-between items-center border-t border-[#F4F5F9] pt-2 mt-2">
                <span className="text-xs font-bold text-[#5B5FEF]">Value: Rp 94.500.000</span>
                <span className="text-[10px] bg-[#DCFCE7] text-[#3CD856] px-2 py-0.5 rounded-full font-bold">In-House</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== ROW 3: CUSTOMER MEMBERSHIP TABLE (LEFT) & INDEX CIRCLE (RIGHT) ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* TABEL KIRI: Menampilkan data Banyaknya Member */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7]">
            <h3 className="text-sm font-bold text-[#151D48] mb-4">Active Guest Membership Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#EDF2F7] text-[11px] font-semibold text-[#737791]">
                    <th className="pb-2 w-[15%]">GUEST ID</th>
                    <th className="pb-2 w-[45%]">Customer Name</th>
                    <th className="pb-2 w-[25%]">Loyalty Progress</th>
                    <th className="pb-2 text-right w-[15%]">Tier Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F5F9] text-xs text-[#425166]">
                  {customerData.map((customer) => (
                    <tr key={customer.id} className="hover:bg-[#FAFBFF]/50 transition-colors">
                      <td className="py-2.5 font-medium text-[#737791]">{customer.id}</td>
                      <td className="py-2.5 font-semibold text-[#151D48]">{customer.name}</td>
                      <td className="py-2.5">
                        <div className="w-full bg-[#F4F5F9] h-1.5 rounded-full overflow-hidden">
                          <div className={`${customer.color} h-full rounded-full`} style={{ width: customer.width }}></div>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-bold text-[#151D48]">
                        <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 uppercase tracking-wide">
                          {customer.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LINGKARAN KANAN: Statistic Index asli bawaan template */}
          <div className="bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] flex flex-col justify-between h-[230px]">
            <div>
              <h3 className="text-sm font-bold text-[#151D48] mb-0.5">Statistic Index</h3>
              <p className="text-[11px] text-[#737791] mb-2">Quarterly target performance metrics</p>
            </div>
            
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="38" stroke="#F4F5F9" strokeWidth="8" fill="transparent" />
                  <circle cx="48" cy="48" r="38" stroke="#5B5FEF" strokeWidth="8" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 38} strokeDashoffset={2 * Math.PI * 38 * (1 - 75 / 100)} strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-lg font-extrabold text-[#151D48]">75%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#F4F5F9] pt-2.5 mt-2 flex justify-between text-center text-[11px]">
              <div>
                <p className="text-[#737791]">Target</p>
                <p className="font-bold text-[#151D48] mt-0.5">100%</p>
              </div>
              <div className="border-r border-[#EDF2F7]"></div>
              <div>
                <p className="text-[#737791]">Achieved</p>
                <p className="font-bold text-[#5B5FEF] mt-0.5">75%</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function SaleCard({ icon, color, textCol, label, val, sub, isUp }) {
  return (
    <div className={`${color} p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] border border-white/40`}>
      <div className="flex justify-between items-start w-full">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-base shadow-sm">
          <span className={textCol}>{icon}</span>
        </div>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 bg-white/60 ${isUp ? 'text-[#3CD856]' : 'text-[#FA5A7D]'}`}>
          {isUp ? <FiArrowUpRight /> : <FiArrowDownRight />} {sub}
        </span>
      </div>
      <div className="mt-3">
        <h4 className="text-xl font-extrabold text-[#151D48] tracking-tight">{val}</h4>
        <p className="text-xs font-semibold text-[#68778D] mt-0.5">{label}</p>
      </div>
    </div>
  );
}