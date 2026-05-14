import { useState } from "react";
import { 
  FiTrendingUp, FiUsers, FiDollarSign, FiShoppingBag, 
  FiMoreHorizontal, FiArrowUpRight, FiSearch 
} from "react-icons/fi";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";

// Data untuk Grafik (Simulasi data bulanan)
const chartData = [
  { name: "Jan", revenue: 4000, bookings: 240 },
  { name: "Feb", revenue: 3000, bookings: 198 },
  { name: "Mar", revenue: 5000, bookings: 300 },
  { name: "Apr", revenue: 4500, bookings: 280 },
  { name: "May", revenue: 6000, bookings: 390 },
  { name: "Jun", revenue: 5500, bookings: 320 },
];

// Data Reservasi Terbaru
const recentBookings = [
  { id: "#1244", customer: "Sophia Wright", room: "Oceanic Deluxe", date: "14 May 2026", status: "Confirmed", amount: "$120" },
  { id: "#1245", customer: "James Miller", room: "Royal Penthouse", date: "14 May 2026", status: "Pending", amount: "$400" },
  { id: "#1246", customer: "Olivia Brown", room: "Modern Heritage", date: "13 May 2026", status: "Confirmed", amount: "$250" },
  { id: "#1247", customer: "Lucas Smith", room: "Garden Villa", date: "12 May 2026", status: "Cancelled", amount: "$300" },
];

export default function Home() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-stone-900 uppercase">
            Analytics Overview<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-400 text-sm font-medium mt-1 font-serif italic">
            Monitoring hotel performance and guest activity.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" />
            <input type="text" placeholder="Search report..." className="bg-white border border-stone-100 py-3 pl-10 pr-4 rounded-xl text-xs outline-none focus:ring-2 focus:ring-stone-100 transition-all w-64" />
          </div>
          <button className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-900 transition-all">
            Export Report
          </button>
        </div>
      </div>

      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <MiniStatCard label="Total Revenue" value="$42,850" icon={<FiDollarSign />} trend="+12.5%" />
        <MiniStatCard label="Total Bookings" value="754" icon={<FiShoppingBag />} trend="+5.2%" />
        <MiniStatCard label="Active Guests" value="128" icon={<FiUsers />} trend="+18.4%" />
        <MiniStatCard label="Occupancy" value="84%" icon={<FiTrendingUp />} trend="+2.1%" />
      </div>

      {/* Baris Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Grafik Pendapatan */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-stone-900">Revenue Performance</h3>
            <select className="text-[10px] font-bold text-stone-400 uppercase bg-transparent outline-none cursor-pointer">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#78350f" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#78350f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a8a29e'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a8a29e'}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#78350f" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Bookings (Bar) */}
        <div className="bg-stone-900 p-8 rounded-[2.5rem] shadow-2xl text-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-amber-500">Booking Frequency</h3>
            <FiMoreHorizontal className="text-stone-500" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#292524" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#78716c'}} dy={10} />
                <Tooltip cursor={{fill: '#1c1917'}} contentStyle={{backgroundColor: '#1c1917', border: 'none', borderRadius: '8px'}} />
                <Bar dataKey="bookings" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabel Reservasi Terbaru */}
      <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-stone-50 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-stone-900">Recent Reservations</h3>
          <button className="text-[10px] font-bold text-amber-800 uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-400 font-black">
              <tr>
                <th className="px-8 py-4">Booking ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Room</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {recentBookings.map((booking, i) => (
                <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-8 py-5 text-xs font-bold text-stone-900">{booking.id}</td>
                  <td className="px-8 py-5 text-xs text-stone-600 font-serif italic">{booking.customer}</td>
                  <td className="px-8 py-5 text-xs text-stone-600">{booking.room}</td>
                  <td className="px-8 py-5 text-xs text-stone-400">{booking.date}</td>
                  <td className="px-8 py-5 text-xs font-bold text-stone-900">{booking.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] uppercase font-black px-3 py-1 rounded-full tracking-widest ${
                      booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                      booking.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Komponen Kecil untuk Statistik (MiniStatCard)
function MiniStatCard({ label, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:translate-y-[-4px] transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-stone-50 rounded-xl text-stone-900 group-hover:bg-amber-900 group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
        <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
          <FiArrowUpRight /> {trend}
        </span>
      </div>
      <p className="text-[9px] uppercase tracking-[2px] font-black text-stone-300 mb-1">{label}</p>
      <h3 className="text-2xl font-black text-stone-900">{value}</h3>
    </div>
  );
}