import { useState, useEffect } from "react";
import { FiPieChart, FiShoppingBag, FiTag, FiUserPlus } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Import Komponen Global 
import LoadingSpinner from "../components/LoadingSpinner";
import RoomCard from "../components/RoomCard"; 

const data = [
  { name: 'Mon', online: 12000, offline: 9000 },
  { name: 'Tue', online: 15000, offline: 11000 },
  { name: 'Wed', online: 18000, offline: 14000 },
  { name: 'Thu', online: 14000, offline: 10000 },
  { name: 'Fri', online: 11000, offline: 9500 },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#F8F9FC] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-7 p-6 md:p-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* Top Sale Cards Row */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_8px_32px_rgba(69,78,124,0.03)] border border-[#EDF2F7] grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-[#151D48]">Today's Sales</h3>
            <p className="text-[13px] text-[#737791] mt-1">Sales Summary</p>
          </div>
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <SaleCard icon={<FiPieChart />} color="bg-[#FFE2E5]" textCol="text-[#FA5A7D]" label="Total Sales" val="$1k" sub="+8% yesterday" />
            <SaleCard icon={<FiShoppingBag />} color="bg-[#FFF4DE]" textCol="text-[#FF947A]" label="Total Order" val="300" sub="+5% yesterday" />
            <SaleCard icon={<FiTag />} color="bg-[#DCFCE7]" textCol="text-[#3CD856]" label="Product Sold" val="5" sub="+1.2% yesterday" />
            <SaleCard icon={<FiUserPlus />} color="bg-[#F3E8FF]" textCol="text-[#5B5FEF]" label="New Customer" val="8" sub="0.5% yesterday" />
          </div>
        </div>

        {/* Graph & Room Component Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Total Revenue Graph Card */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[1.5rem] shadow-[0px_8px_32px_rgba(69,78,124,0.03)] border border-[#EDF2F7]">
            <h3 className="text-[16px] font-bold text-[#151D48] mb-6">Total Revenue</h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#F4F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737791', fontWeight: 500}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737791', fontWeight: 500}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="online" fill="#5B5FEF" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar dataKey="offline" fill="#3CD856" radius={[4, 4, 0, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Favorite Room Side Card */}
          <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_8px_32px_rgba(69,78,124,0.03)] border border-[#EDF2F7] flex flex-col justify-between">
            <h3 className="text-[16px] font-bold text-[#151D48] mb-4">Top Favorite Room</h3>
            <RoomCard 
              name="Presidential Penthouse" 
              type="Luxury Suite" 
              price="$550/night" 
              rating="4.9" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-komponen internal SaleCard Pastel Grid
function SaleCard({ icon, color, textCol, label, val, sub }) {
  return (
    <div className={`${color} p-5 rounded-2xl flex flex-col gap-3 transition-all duration-200 hover:scale-[1.03] shadow-sm`}>
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
        <span className={textCol}>{icon}</span>
      </div>
      <div>
        <h4 className="text-[20px] font-extrabold text-[#151D48] tracking-tight">{val}</h4>
        <p className="text-[13px] font-semibold text-[#425166] mt-0.5">{label}</p>
        <p className={`text-[10px] font-medium ${textCol} mt-1`}>{sub}</p>
      </div>
    </div>
  );
}