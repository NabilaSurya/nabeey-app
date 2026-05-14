import { FiEdit3, FiEye, FiClock, FiUsers, FiMapPin, FiAward } from "react-icons/fi";

export default function About() {
  return (
    <div className="w-full animate-in fade-in duration-1000">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-stone-900 uppercase leading-none">
            Brand Profile<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-400 text-sm font-medium mt-2 font-serif italic">
            Management of hotel story, core values, and public information.
          </p>
        </div>
        
        <button className="flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[2px] hover:bg-amber-900 transition-all shadow-xl shadow-stone-200">
          <FiEdit3 size={16} />
          <span>Edit Page Content</span>
        </button>
      </header>

      {/* Main Content: Info Management */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        
        {/* Card 1: The Story (Visual) */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-stone-100 p-10 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="uppercase tracking-[6px] text-amber-800 text-[10px] font-black mb-6">Established 1994</p>
            <h2 className="text-5xl font-bold italic text-stone-900 mb-6 tracking-tighter leading-tight">
              LuxStay <br /> Heritage.
            </h2>
            <p className="text-stone-500 max-w-lg text-base leading-relaxed italic mb-8">
              "Kami percaya bahwa kemewahan bukan hanya tentang apa yang Anda lihat, tapi tentang bagaimana Anda dilayani."
            </p>
            <div className="flex gap-4">
              <span className="px-5 py-2 bg-stone-50 rounded-full text-[9px] font-black uppercase tracking-widest text-stone-400">Public Visible</span>
              <span className="px-5 py-2 bg-stone-50 rounded-full text-[9px] font-black uppercase tracking-widest text-stone-400 font-serif italic">Rev: 2.4.1</span>
            </div>
          </div>
          {/* Dekorasi Background */}
          <div className="absolute top-0 right-0 w-64 h-full bg-stone-50 translate-x-20 -skew-x-12 group-hover:bg-amber-50 transition-colors duration-700"></div>
        </div>

        {/* Card 2: Quick Metrics */}
        <div className="flex flex-col gap-6">
          <div className="bg-stone-900 rounded-[2.5rem] p-8 text-white flex-1">
            <FiAward className="text-amber-500 mb-4" size={24} />
            <h3 className="text-sm font-black uppercase tracking-widest mb-1">Awards Won</h3>
            <p className="text-4xl font-bold">24+</p>
            <p className="text-[10px] text-stone-500 uppercase mt-4 tracking-widest font-black italic">Industry Excellence</p>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-stone-100 p-8 flex-1">
            <FiUsers className="text-stone-300 mb-4" size={24} />
            <h3 className="text-sm font-black uppercase tracking-widest mb-1">Global Staff</h3>
            <p className="text-4xl font-bold text-stone-900">450+</p>
            <p className="text-[10px] text-stone-400 uppercase mt-4 tracking-widest font-black italic">Active Employees</p>
          </div>
        </div>
      </div>

      {/* Section: Core Values Editor Style */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { icon: <FiCheckCircle className="text-emerald-500" />, title: "Service", desc: "Layanan personal 24/7." },
          { icon: <FiActivity className="text-amber-500" />, title: "Design", desc: "Arsitektur modern & lokal." },
          { icon: <FiMapPin className="text-blue-500" />, title: "Location", desc: "Titik strategis & premium." }
        ].map((val, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-stone-100 hover:border-stone-900 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center">
                {val.icon}
              </div>
              <FiEye className="text-stone-200 group-hover:text-stone-900 transition-colors cursor-pointer" size={18} />
            </div>
            <h3 className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-2">0{i+1}. {val.title}</h3>
            <p className="text-stone-400 text-sm leading-relaxed">{val.desc}</p>
          </div>
        ))}
      </div>

      {/* History Log Table */}
      <div className="bg-white rounded-[2.5rem] border border-stone-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-stone-50 flex justify-between items-center">
           <h3 className="text-sm font-black uppercase tracking-widest text-stone-900">Content Update History</h3>
           <FiClock className="text-stone-300" />
        </div>
        <table className="w-full text-left">
           <thead className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-400 font-black">
              <tr>
                 <th className="px-8 py-4">Editor</th>
                 <th className="px-8 py-4">Section</th>
                 <th className="px-8 py-4">Date</th>
                 <th className="px-8 py-4">Status</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-stone-50">
              {[
                { user: "Admin Sophia", sec: "Hero Section", date: "Today, 14:20", status: "Published" },
                { user: "Manager Lucas", sec: "Core Values", date: "Yesterday, 09:12", status: "Published" }
              ].map((log, i) => (
                <tr key={i} className="text-xs">
                   <td className="px-8 py-5 font-bold text-stone-900">{log.user}</td>
                   <td className="px-8 py-5 text-stone-500 italic font-serif">{log.sec}</td>
                   <td className="px-8 py-5 text-stone-400">{log.date}</td>
                   <td className="px-8 py-5">
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Live</span>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}

// Tambahan icon imports jika belum ada di file sebelumnya
import { FiCheckCircle, FiActivity } from "react-icons/fi";