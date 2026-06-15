import { Link } from "react-router-dom";
import { FiArrowRight, FiUsers, FiAward, FiMessageSquare, FiTrendingUp } from "react-icons/fi";

export default function MemberSection() {
  return (
    <section
      id="community"
      className="min-h-[70vh] flex items-center bg-slate-950 text-white rounded-[40px] mx-8 my-16 shadow-2xl relative overflow-hidden scroll-mt-24 border border-slate-800"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5B5FEF]/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>

      <div className="max-w-5xl mx-auto px-8 py-20 relative z-10 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#5B5FEF] text-xs font-black uppercase tracking-widest bg-[#5B5FEF]/10 border border-[#5B5FEF]/20 px-4 py-2 rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            LuxeCRM Global Circle
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4 tracking-tight leading-[1.1]">
            Not Just a Stay. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FEF] via-[#6C5CE7] to-pink-500">
              It’s an Elite Community.
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Bergabunglah dengan jaringan traveler global kami. Bukan sekadar pesan kamar, di sini Anda bertukar cerita, mendapatkan akses ke event privat, dan menikmati benefit loyalty tier yang dipersonalisasi khusus untuk Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-[#5B5FEF]/20 text-[#5B5FEF] rounded-xl flex items-center justify-center text-lg font-bold mb-4">
              <FiMessageSquare />
            </div>
            <h3 className="font-bold text-base mb-2">Private Forum & Network</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Berinteraksi langsung dengan sesama penjelajah dunia, bagikan rekomendasi tempat tersembunyi, dan temukan koneksi baru.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center text-lg font-bold mb-4">
              <FiAward />
            </div>
            <h3 className="font-bold text-base mb-2">VIP Perks Lounge</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Mulai dari free airport transfer, akses lounge eksklusif, hingga complimentary spa yang tidak akan didapatkan oleh tamu biasa.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center text-lg font-bold mb-4">
              <FiTrendingUp />
            </div>
            <h3 className="font-bold text-base mb-2">Tier Level Rewards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Semakin sering Anda menginap, semakin tinggi level komunitas Anda (Silver, Gold, Platinum) dengan keistimewaan yang berlipat ganda.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-10 gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex -space-x-3 overflow-hidden">
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Member 1" />
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Member 2" />
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-950 object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Member 3" />
              <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-slate-950 bg-slate-800 text-xs font-bold text-[#5B5FEF]">
                +15k
              </div>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <FiUsers className="text-[#5B5FEF]" /> 15,420+ Travelers have joined the inner circle
            </p>
          </div>

          {/* PERUBAHAN RUTE DI SINI */}
          <Link 
            to="/MemberLanding" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#5B5FEF] hover:bg-[#4834D4] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg group"
          >
            Enter Community Hub
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}