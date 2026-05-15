import { FiPieChart, FiShoppingBag, FiTag, FiUserPlus } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Mon', online: 12000, offline: 9000 },
  { name: 'Tue', online: 15000, offline: 11000 },
  { name: 'Wed', online: 18000, offline: 14000 },
  { name: 'Thu', online: 14000, offline: 10000 },
  { name: 'Fri', online: 11000, offline: 9500 },
  { name: 'Sat', online: 16000, offline: 13000 },
  { name: 'Sun', online: 19000, offline: 15000 },
];

export default function Home() {
  return (
    <div className="space-y-8 bg-[#FAFBFF] animate-in fade-in duration-700">
      
      {/* 4 Sales Cards Row */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold text-[#151D48]">Today's Sales</h3>
          <p className="text-sm text-[#737791] mt-1">Sales Summary</p>
        </div>
        
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <SaleCard icon={<FiPieChart />} color="bg-[#FFE2E5]" textCol="text-[#FA5A7D]" label="Total Sales" val="$1k" sub="+8% from yesterday" />
          <SaleCard icon={<FiShoppingBag />} color="bg-[#FFF4DE]" textCol="text-[#FF947A]" label="Total Order" val="300" sub="+5% from yesterday" />
          <SaleCard icon={<FiTag />} color="bg-[#DCFCE7]" textCol="text-[#3CD856]" label="Product Sold" val="5" sub="+1.2% from yesterday" />
          <SaleCard icon={<FiUserPlus />} color="bg-[#F3E8FF]" textCol="text-[#BF83FF]" label="New Customer" val="8" sub="0.5% from yesterday" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Total Revenue Graph */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-lg font-bold text-[#151D48] mb-8">Total Revenue</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F2F2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737791'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737791'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="online" fill="#0095FF" radius={[4, 4, 0, 0]} barSize={10} />
                <Bar dataKey="offline" fill="#00E096" radius={[4, 4, 0, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Satisfaction - Placeholder ala Figma */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
          <h3 className="text-lg font-bold text-[#151D48] mb-4">Customer Satisfaction</h3>
          <div className="h-48 bg-indigo-50/50 rounded-3xl border-2 border-dashed border-indigo-100 flex items-center justify-center">
             <p className="text-[#5D5FEF] font-bold">Chart Placeholder</p>
          </div>
          <div className="flex justify-around mt-6 pt-6 border-t border-stone-50">
            <div className="text-center">
              <p className="text-[10px] text-[#737791] uppercase">Last Month</p>
              <p className="font-bold text-[#151D48]">$3,004</p>
            </div>
            <div className="text-center border-l border-stone-100 pl-8">
              <p className="text-[10px] text-[#737791] uppercase">This Month</p>
              <p className="font-bold text-[#151D48]">$4,504</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaleCard({ icon, color, textCol, label, val, sub }) {
  return (
    <div className={`${color} p-5 rounded-3xl flex flex-col gap-3 transition-transform hover:scale-105 cursor-pointer`}>
      <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${textCol} text-xl shadow-sm`}>
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-black text-[#151D48]">{val}</h4>
        <p className="text-xs font-bold text-[#425166]">{label}</p>
        <p className={`text-[9px] font-medium ${textCol} mt-1`}>{sub}</p>
      </div>
    </div>
  );
}