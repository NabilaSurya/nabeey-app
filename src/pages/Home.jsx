import { useState, useEffect } from "react";
import { FiPieChart, FiShoppingBag, FiTag, FiUserPlus, FiArrowUpRight, FiArrowDownRight, FiTrendingUp, FiDownload, FiStar } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Import Komponen Global 
import LoadingSpinner from "../components/LoadingSpinner";

// Data Grafik Revenue
const revenueData = [
  { name: 'Mon', Online: 12000, Offline: 9000 },
  { name: 'Tue', Online: 15000, Offline: 11000 },
  { name: 'Wed', Online: 18000, Offline: 14000 },
  { name: 'Thu', Online: 14000, Offline: 10000 },
  { name: 'Fri', Online: 21000, Offline: 12500 },
  { name: 'Sat', Online: 25000, Offline: 18000 },
  { name: 'Sun', Online: 22000, Offline: 15000 },
];

// Data Tabel Kamar Terpopuler
const topProducts = [
  { id: "#01", name: "Presidential Penthouse", sales: 124, progress: "bg-[#5B5FEF]", width: "85%" },
  { id: "#02", name: "Deluxe Ocean View", sales: 98, progress: "bg-[#3CD856]", width: "70%" },
  { id: "#03", name: "Executive Suite Room", sales: 74, progress: "bg-[#FF947A]", width: "55%" },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFBFF] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-6 p-6 md:p-8 animate-in fade-in duration-500 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* ==================== ROW 1: HEADER ==================== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#151D48]">Sales Dashboard</h1>
            <p className="text-xs text-[#737791]">Real-time insight into your accommodation sales performance.</p>
          </div>
          <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-[#151D48] text-xs font-semibold py-2 px-3.5 rounded-xl border border-[#EDF2F7] shadow-sm transition-all duration-200">
            <FiDownload /> Export Report
          </button>
        </div>

        {/* ==================== ROW 2: TOP SAlE CARDS ==================== */}
        <div className="bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-1 flex flex-col justify-center">
            <div className="p-2 bg-[#EF4444]/10 rounded-xl w-fit mb-2 text-[#FA5A7D]">
              <FiTrendingUp size={18} />
            </div>
            <h3 className="text-base font-bold text-[#151D48]">Today's Sales</h3>
            <p className="text-xs text-[#737791] mt-0.5">Sales summary</p>
          </div>
          
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <SaleCard icon={<FiPieChart />} color="bg-[#FFE2E5]" textCol="text-[#FA5A7D]" label="Total Revenue" val="$3,450" sub="+8.2%" isUp={true} />
            <SaleCard icon={<FiShoppingBag />} color="bg-[#FFF4DE]" textCol="text-[#FF947A]" label="Total Bookings" val="382" sub="+5.4%" isUp={true} />
            <SaleCard icon={<FiTag />} color="bg-[#DCFCE7]" textCol="text-[#3CD856]" label="Rooms Sold" val="24" sub="-1.2%" isUp={false} />
            <SaleCard icon={<FiUserPlus />} color="bg-[#F3E8FF]" textCol="text-[#5B5FEF]" label="New Customers" val="12" sub="+0.5%" isUp={true} />
          </div>
        </div>

        {/* ==================== ROW 3: REVENUE GRAPH & TOP FAVORITE ROOM ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Total Revenue Graph Card */}
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
                  <Tooltip 
                    cursor={{fill: '#F8F9FC', opacity: 0.4}} 
                    contentStyle={{ borderRadius: '10px', border: '1px solid #EDF2F7', fontSize: '11px' }}
                  />
                  <Bar dataKey="Online" fill="#5B5FEF" radius={[4, 4, 0, 0]} barSize={14} />
                  <Bar dataKey="Offline" fill="#3CD856" radius={[4, 4, 0, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Favorite Room Side Card (Desain langsung dimunculkan di sini biar ga kosong) */}
          <div className="bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] flex flex-col justify-between h-[320px]">
            <div>
              <h3 className="text-sm font-bold text-[#151D48] mb-0.5">Top Favorite Room</h3>
              <p className="text-[11px] text-[#737791] mb-4">Most wanted choice this week</p>
            </div>
            
            {/* Tampilan Visual Kamar Pengganti Kotak Putih Kosong Anda */}
            <div className="bg-[#FAFBFF] p-4 rounded-xl border border-[#F4F5F9] flex flex-col justify-between h-full">
              <div className="w-full h-24 bg-slate-200 rounded-lg overflow-hidden relative mb-2">
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-bold text-[#FF947A] flex items-center gap-0.5">
                  <FiStar className="fill-current" /> 4.9
                </div>
                <div className="w-full h-full bg-linear-to-br from-[#5B5FEF]/20 to-[#3CD856]/20 flex items-center justify-center text-xs font-semibold text-[#737791]">
                  Room Preview Image
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#151D48]">Presidential Penthouse</h4>
                <p className="text-[11px] text-[#737791]">Luxury Suite • 1,200 sqft</p>
              </div>
              <div className="flex justify-between items-center border-t border-[#F4F5F9] pt-2 mt-2">
                <span className="text-xs font-bold text-[#5B5FEF]">$550<span className="text-[10px] text-[#737791] font-normal">/night</span></span>
                <span className="text-[10px] bg-[#DCFCE7] text-[#3CD856] px-2 py-0.5 rounded-full font-bold">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== ROW 4: TOP PERFORMING & CUSTOMER SATISFACTION ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Performing Rooms Table */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7]">
            <h3 className="text-sm font-bold text-[#151D48] mb-4">Top Performing Rooms</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#EDF2F7] text-[11px] font-semibold text-[#737791]">
                    <th className="pb-2 w-[10%]">ID</th>
                    <th className="pb-2 w-[50%]">Room Name</th>
                    <th className="pb-2 w-[25%]">Popularity</th>
                    <th className="pb-2 text-right w-[15%]">Sales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F5F9] text-xs text-[#425166]">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAFBFF]/50 transition-colors">
                      <td className="py-2.5 font-medium text-[#737791]">{product.id}</td>
                      <td className="py-2.5 font-semibold text-[#151D48]">{product.name}</td>
                      <td className="py-2.5">
                        <div className="w-full bg-[#F4F5F9] h-1.5 rounded-full overflow-hidden">
                          <div className={`${product.progress} h-full rounded-full`} style={{ width: product.width }}></div>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-bold text-[#151D48]">{product.sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Satisfaction Progress Ring */}
          <div className="bg-white p-5 rounded-2xl shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] flex flex-col justify-between h-[230px]">
            <div>
              <h3 className="text-sm font-bold text-[#151D48] mb-0.5">Customer Satisfaction</h3>
              <p className="text-[11px] text-[#737791] mb-2">Guest reviews & services</p>
            </div>
            
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="38" stroke="#F4F5F9" strokeWidth="8" fill="transparent" />
                  <circle cx="48" cy="48" r="38" stroke="#5B5FEF" strokeWidth="8" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 38} strokeDashoffset={2 * Math.PI * 38 * (1 - 0.85)} strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-lg font-extrabold text-[#151D48]">85%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#F4F5F9] pt-2.5 mt-2 flex justify-between text-center text-[11px]">
              <div>
                <p className="text-[#737791]">Last Month</p>
                <p className="font-bold text-[#151D48] mt-0.5">78%</p>
              </div>
              <div className="border-r border-[#EDF2F7]"></div>
              <div>
                <p className="text-[#737791]">This Month</p>
                <p className="font-bold text-[#5B5FEF] mt-0.5">85%</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Sub-komponen SaleCard Pastel Grid
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