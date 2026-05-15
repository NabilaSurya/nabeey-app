import { 
  FiEdit3, 
  FiEye, 
  FiClock, 
  FiUsers, 
  FiMapPin, 
  FiAward, 
  FiCheckCircle, 
  FiActivity 
} from "react-icons/fi";

export default function About() {
  return (
    <div className="w-full bg-[#FAFBFF] min-h-screen animate-in fade-in duration-700 font-['Inter',_sans-serif]">
      
      {/* Header Section ala Dabang */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#151D48] tracking-tight leading-[1.2]">
            Brand Profile
          </h1>
          <p className="text-[#6B7280] text-[13px] mt-1">
            Management of hotel story, core values, and public information.
          </p>
        </div>
        
        <button className="flex items-center gap-3 bg-[#5B5FEF] text-white px-7 py-3.5 rounded-2xl font-semibold text-[14px] hover:bg-[#4a4ce0] transition-all shadow-lg shadow-indigo-100 active:scale-95">
          <FiEdit3 size={18} />
          <span>Edit Page Content</span>
        </button>
      </header>

      {/* Main Content Row */}
      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        
        {/* Card 1: The Story (Visual Hero) */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#F5F5F7] relative overflow-hidden group">
          <div className="relative z-10">
            <span className="bg-[#F3E8FF] text-[#BF83FF] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6 inline-block">
              Established 1994
            </span>
            <h2 className="text-[40px] font-bold text-[#151D48] mb-6 tracking-tight leading-[1.1]">
              LuxStay <br /> <span className="text-[#5B5FEF]">Heritage.</span>
            </h2>
            <p className="text-[#6B7280] max-w-lg text-[15px] leading-relaxed italic mb-8 border-l-4 border-[#5B5FEF] pl-6 font-medium">
              "Kami percaya bahwa kemewahan bukan hanya tentang apa yang Anda lihat, tapi tentang bagaimana Anda dilayani."
            </p>
            <div className="flex gap-3">
              <span className="px-5 py-2 bg-[#F5F5F7] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#737791]">Public Visible</span>
              <span className="px-5 py-2 bg-[#F5F5F7] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#737791]">Ver: 2.4.1</span>
            </div>
          </div>
          {/* Decorative Shape ala Dabang */}
          <div className="absolute top-0 right-0 w-64 h-full bg-[#FAFBFF] translate-x-20 -skew-x-12 group-hover:bg-[#F3E8FF]/30 transition-colors duration-700"></div>
        </div>

        {/* Card 2: Quick Metrics ala Dabang Cards */}
        <div className="flex flex-col gap-6">
          {/* Awards Card */}
          <div className="bg-[#5B5FEF] rounded-[32px] p-8 text-white flex-1 shadow-lg shadow-indigo-100 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <FiAward className="text-white mb-4" size={28} />
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-indigo-100 mb-1">Awards Won</h3>
            <p className="text-[42px] font-black leading-none">24+</p>
            <p className="text-[10px] text-indigo-200 uppercase mt-4 font-bold tracking-widest">Global Industry Excellence</p>
          </div>
          
          {/* Staff Card */}
          <div className="bg-white rounded-[32px] p-8 flex-1 shadow-sm border border-[#F5F5F7]">
            <div className="w-12 h-12 bg-[#F3E8FF] rounded-2xl flex items-center justify-center text-[#BF83FF] mb-4">
              <FiUsers size={24} />
            </div>
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">Global Staff</h3>
            <p className="text-[42px] font-black text-[#151D48] leading-none">450+</p>
            <p className="text-[10px] text-[#737791] uppercase mt-4 font-bold tracking-widest">Active Employees</p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { icon: <FiCheckCircle />, title: "Service", desc: "Layanan personal premium 24/7.", color: "bg-[#DCFCE7]", text: "text-[#3CD856]" },
          { icon: <FiActivity />, title: "Design", desc: "Arsitektur modern & sentuhan lokal.", color: "bg-[#FFF4DE]", text: "text-[#FF947A]" },
          { icon: <FiMapPin />, title: "Location", desc: "Titik strategis & kawasan premium.", color: "bg-[#FFE2E5]", text: "text-[#FA5A7D]" }
        ].map((val, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-[#F5F5F7] hover:border-[#5B5FEF] transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${val.color} ${val.text} rounded-2xl flex items-center justify-center text-2xl`}>
                {val.icon}
              </div>
              <FiEye className="text-[#6B7280] hover:text-[#5B5FEF] transition-colors cursor-pointer" size={20} />
            </div>
            <h3 className="text-[16px] font-bold text-[#151D48] uppercase tracking-wide mb-3">0{i+1}. {val.title}</h3>
            <p className="text-[#737791] text-[13px] leading-relaxed font-medium">{val.desc}</p>
          </div>
        ))}
      </div>

      {/* History Table ala Dabang Simple Table */}
      <div className="bg-white rounded-[32px] shadow-sm border border-[#F5F5F7] overflow-hidden mb-12">
        <div className="p-8 border-b border-[#F5F5F7] flex justify-between items-center bg-[#FAFBFF]">
           <h3 className="text-[14px] font-bold text-[#151D48] uppercase tracking-wide">Content Update History</h3>
           <FiClock className="text-[#6B7280]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-[11px] font-bold text-[#6B7280] uppercase tracking-widest border-b border-[#F5F5F7]">
                <th className="px-8 py-5">Editor Name</th>
                <th className="px-8 py-5">Updated Section</th>
                <th className="px-8 py-5">Date Modified</th>
                <th className="px-8 py-5">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F7]">
              {[
                { user: "Admin Sophia", sec: "Hero Section", date: "Today, 14:20", status: "Published" },
                { user: "Manager Lucas", sec: "Core Values", date: "Yesterday, 09:12", status: "Published" }
              ].map((log, i) => (
                <tr key={i} className="hover:bg-[#FAFBFF] transition-colors">
                   <td className="px-8 py-6 flex items-center gap-3">
                     <div className="w-8 h-8 bg-[#5B5FEF] text-white rounded-lg flex items-center justify-center text-[10px] font-bold">
                       {log.user.charAt(6)}
                     </div>
                     <span className="text-[13px] font-bold text-[#151D48]">{log.user}</span>
                   </td>
                   <td className="px-8 py-6 text-[13px] text-[#6B7280] font-medium">{log.sec}</td>
                   <td className="px-8 py-6 text-[13px] text-[#737791]">{log.date}</td>
                   <td className="px-8 py-6">
                      <span className="bg-[#DCFCE7] text-[#3CD856] px-4 py-1 rounded-xl text-[10px] font-bold uppercase">Live Now</span>
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