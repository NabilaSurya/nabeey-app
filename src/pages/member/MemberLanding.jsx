import { useState, useEffect } from "react";
import { 
  FiGrid, FiActivity, FiMapPin, FiUsers, FiMessageSquare, 
  FiChevronRight, FiMenu, FiX, FiCheckCircle, FiUser, FiMail, FiGift, FiCreditCard, FiAward 
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Member() {
  // Authentication & Subscription States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  
  // Navbar States
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic Member Data
  const [member, setMember] = useState({
    name: "Guest User",
    email: "guest@luxstay.com",
    status: "Gold Member",
    points: 1850,
    totalBooking: 16,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    
    setMember((prev) => ({
      ...prev,
      name: inputName,
      email: inputEmail || `${inputName.toLowerCase().replace(/\s+/g, "")}@luxstay.com`,
    }));
    setIsLoggedIn(true);
  };

  const handleActivateSubscription = () => {
    setIsSubscribed(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsSubscribed(false);
    setInputName("");
    setInputEmail("");
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-700 font-sans antialiased">
      
      {/* ================= NAVBAR (GUEST STYLE) ================= */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md py-4 border-b border-slate-100" 
          : "bg-white/80 backdrop-blur-sm py-5 border-b border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 w-full">
          
          {/* BRAND LOGO */}
          <div className="flex items-center gap-1.5 select-none">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Luxe<span className="text-[#5B5FEF]">Stay</span>
            </span>
            <span className="text-[9px] font-extrabold bg-[#5B5FEF]/10 text-[#5B5FEF] px-2 py-0.5 rounded-full uppercase tracking-widest">
              {!isLoggedIn ? "GUEST" : !isSubscribed ? "PENDING" : "MEMBER"}
            </span>
          </div>

          {/* MENU NAVIGASI */}
          <div className="hidden md:flex gap-6 text-sm font-bold text-slate-600">
            <a href="#market" className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors"><FiGrid size={16} /> Market</a>
            <a href="#properties" className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors"><FiActivity size={16} /> Properties</a>
            <a href="#destinations" className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors"><FiMapPin size={16} /> Destinations</a>
            <a href="#community" className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors"><FiUsers size={16} /> Community</a>
            <a href="#services" className="flex items-center gap-1.5 hover:text-[#5B5FEF] transition-colors"><FiMessageSquare size={16} /> Pusat Layanan</a>
          </div>

          {/* BUTTON ACTION DYNAMIC */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button 
                onClick={handleSignOut} 
                className="inline-flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5"
              >
                Sign Out
              </button>
            ) : (
              <div className="text-xs font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                Authentication Required
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 hover:text-[#5B5FEF] focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-8 w-full">
        
        {/* KONDISI 1: BELUM MASUKKAN DATA / LOGIN */}
        {!isLoggedIn && (
          <div className="min-h-[60vh] flex items-center justify-center py-12 animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-[24px] border border-slate-100 shadow-sm p-8 transition-all hover:shadow-md">
              <div className="text-center mb-8">
                <span className="text-[#5B5FEF] text-[10px] font-black uppercase tracking-widest bg-[#5B5FEF]/10 px-3 py-1.5 rounded-lg">
                  Exclusive Access
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-4 tracking-tight">Unlock Member Portal</h2>
                <p className="text-xs text-slate-400 mt-1">Silakan masuk untuk memeriksa atau mengaktifkan paket keanggotaan Anda.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan nama Anda..."
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs focus:outline-none focus:border-[#5B5FEF] focus:bg-white transition-all text-slate-800 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Alamat Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email"
                      placeholder="name@luxstay.com"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs focus:outline-none focus:border-[#5B5FEF] focus:bg-white transition-all text-slate-800 font-bold"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#5B5FEF] hover:bg-[#4834D4] text-white font-bold text-xs py-4 rounded-xl transition duration-200 shadow-md transform hover:-translate-y-0.5"
                >
                  Continue to Verification
                </button>
              </form>
            </div>
          </div>
        )}

        {/* KONDISI 2: SUDAH MASUKKAN DATA TAPI BELUM BERLANGGANAN (GATEWAY SCREEN) */}
        {isLoggedIn && !isSubscribed && (
          <div className="min-h-[65vh] flex items-center justify-center py-6 animate-fadeIn">
            <div className="w-full max-w-xl bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 md:p-10 text-center">
              <span className="inline-flex items-center gap-1.5 text-amber-600 text-[10px] font-black uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-lg">
                <FiAward size={12} /> Subscription Plan Required
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-4 tracking-tight">Halo, {member.name}! 👋</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Akun Anda terdaftar, namun Anda memerlukan langganan **Gold Tier active** untuk mengakses diskon & benefits.</p>

              {/* CARD PREMIUM OFFER */}
              <div className="my-8 p-6 rounded-2xl border-2 border-[#5B5FEF] bg-gradient-to-b from-[#5B5FEF]/5 to-transparent text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#5B5FEF] text-white font-black text-[9px] px-4 py-1 rounded-bl-xl tracking-wider">RECOMMENDED</div>
                <h3 className="text-base font-black text-slate-900">LuxeStay Gold Privilege</h3>
                <p className="text-xs text-slate-400 mt-1">Akses tak terbatas ke seluruh layanan eksklusif resort kami.</p>
                
                <div className="my-4 border-t border-slate-100 pt-4 space-y-2.5">
                  {["Diskon Kamar Flat 15% untuk Semua Ruangan", "Fasilitas Penukaran Poin dengan Kamar Gratis", "Prioritas Jalur Check-In Tanpa Antre"].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <span className="text-[#5B5FEF]">✔</span> {benefit}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end mt-6 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] block font-black text-slate-400 uppercase tracking-wider">Biaya Keanggotaan</span>
                    <span className="text-2xl font-black text-slate-900">$19<span className="text-xs text-slate-400 font-bold">/bulan</span></span>
                  </div>
                </div>
              </div>

              {/* TOMBOL AKTIVASI LANGGANAN */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleActivateSubscription}
                  className="w-full bg-[#5B5FEF] hover:bg-[#4834D4] text-white font-bold text-xs py-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <FiCreditCard size={14} /> Aktifkan Keanggotaan Sekarang
                </button>
                <button 
                  onClick={handleSignOut}
                  className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors py-1"
                >
                  Gunakan Akun Lain
                </button>
              </div>
            </div>
          </div>
        )}

        {/* KONDISI 3: SUDAH MASUK & SUDAH BERLANGGANAN (DASHBOARD MEMBER UTUH) */}
        {isLoggedIn && isSubscribed && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* WELCOME BANNER HEADLINE */}
            <div className="text-center md:text-left">
              <span className="text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-[#5B5FEF]/10 px-3 py-1.5 rounded-lg">
                👑 {member.status} Account Active
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">Welcome Back, {member.name}</h2>
              <p className="text-sm text-slate-400 mt-1">ID Anggota Terverifikasi: <span className="font-mono text-slate-600 font-bold">LX-{member.name.substring(0,3).toUpperCase()}-2026</span></p>
            </div>

            {/* SECTIONS GRID UTAMA */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* KARTU MEMBER DIGITAL */}
              <div className="lg:col-span-2 space-y-6">
                <div className="relative h-56 w-full rounded-[24px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 text-white shadow-lg flex flex-col justify-between border border-slate-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] font-black tracking-widest text-indigo-300 uppercase">Premium Privilege Access</p>
                      <h3 className="text-lg font-black tracking-tight text-white mt-0.5">LuxeStay Loyalty Card</h3>
                    </div>
                    <div className="text-xs font-black bg-amber-500 text-white px-2.5 py-1 rounded-md tracking-wider">GOLD TIER</div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono">Registered Name</p>
                      <p className="text-sm font-bold text-slate-200 tracking-wide">{member.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Points Balance</p>
                      <p className="text-xl font-black text-amber-400">{member.points.toLocaleString()} PTS</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Next Tier Target: Platinum</span>
                    <span className="text-xs font-bold text-[#5B5FEF]">75% Completed</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#5B5FEF] to-indigo-600 h-full rounded-full w-[75%]" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">Selesaikan 4 reservasi malam lagi untuk membuka diskon kamar flat 20% dan fasilitas gratis jemput bandara.</p>
                </div>
              </div>

              {/* SISI KANAN: STATS & INTERACTIVE BANNER VOUCHER */}
              <div className="flex flex-col justify-between gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <h4 className="text-2xl font-black text-slate-900">{member.totalBooking}</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mt-1">Total Stays</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <h4 className="text-2xl font-black text-emerald-600">Active</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mt-1">Rate Guarantee</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/60 p-6 rounded-[24px] flex flex-col justify-between h-full">
                  <div>
                    <span className="bg-[#5B5FEF] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest w-fit block mb-2">Claim Offer</span>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">Ambil Voucher Diskon Akhir Pekan Anda</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">Potongan harga langsung 15% berlaku di seluruh jaringan properti LuxeStay.</p>
                  </div>
                  <button 
                    onClick={() => alert("Selamat! Voucher diskon 15% berhasil ditambahkan ke akun Anda.")}
                    className="w-full mt-4 bg-slate-900 hover:bg-[#5B5FEF] text-white text-xs font-bold py-3.5 rounded-xl transition duration-200 text-center flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FiGift size={14} /> Ambil Reward Voucher
                  </button>
                </div>
              </div>

            </div>

            {/* TAB MANAGEMENT DETAILS */}
            <Tabs defaultValue="profile" className="w-full space-y-6">
              <TabsList className="bg-slate-200/50 p-1 rounded-xl inline-flex w-full md:w-auto shadow-inner">
                <TabsTrigger value="profile" className="rounded-lg px-6 py-2.5 text-xs font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#5B5FEF] data-[state=active]:shadow-sm transition-all">
                  Detail Akun Profil
                </TabsTrigger>
                <TabsTrigger value="history" className="rounded-lg px-6 py-2.5 text-xs font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#5B5FEF] data-[state=active]:shadow-sm transition-all">
                  Riwayat Transaksi Kamar
                </TabsTrigger>
                <TabsTrigger value="membership" className="rounded-lg px-6 py-2.5 text-xs font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#5B5FEF] data-[state=active]:shadow-sm transition-all">
                  Keuntungan Keanggotaan
                </TabsTrigger>
              </TabsList>

              {/* TABS CONTENT PROFILE */}
              <TabsContent value="profile" className="focus-visible:outline-none">
                <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm">
                  <h3 className="text-xs font-black text-slate-900 mb-5 uppercase tracking-wider text-[#5B5FEF]">Personal Information Records</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Nama Sesuai ID</span>
                      <span className="text-xs font-bold text-slate-700 block mt-0.5">{member.name}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Kontak Email Resmi</span>
                      <span className="text-xs font-bold text-slate-700 block mt-0.5">{member.email}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Status Berlangganan</span>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                        <FiCheckCircle /> Autopay Aktif
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TABS CONTENT HISTORY */}
              <TabsContent value="history" className="focus-visible:outline-none">
                <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm">
                  <h3 className="text-xs font-black text-slate-900 mb-4 uppercase tracking-wider text-[#5B5FEF]">Recent Booking Log</h3>
                  <div className="divide-y divide-slate-100">
                    {[
                      { room: "Luxury Ocean Suite Villa", date: "12 January 2026", cost: "$240" },
                      { room: "Deluxe Family Mountain View", date: "28 February 2026", cost: "$140" },
                      { room: "Presidential Skyline Penthouse", date: "20 April 2026", cost: "$550" },
                    ].map((item, idx) => (
                      <div key={idx} className="py-4 flex justify-between items-center first:pt-1 last:pb-1 group hover:bg-slate-50 px-3 -mx-3 rounded-xl transition">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block group-hover:text-[#5B5FEF] transition">{item.room}</span>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{item.date}</span>
                        </div>
                        <span className="text-xs font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* TABS CONTENT BENEFITS */}
              <TabsContent value="membership" className="focus-visible:outline-none">
                <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">Rincian Hak Istimewa Gold Member</h3>
                    <p className="text-xs text-slate-400 mt-1">Gabungan keuntungan fasilitas eksklusif serta aturan pengumpulan poin transparannya.</p>
                  </div>

                  <Dialog>
                    <DialogTrigger className="inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-[#5B5FEF] text-white text-xs font-bold px-5 py-3.5 transition shadow-sm">
                      Buka Semua Benefit Gold <FiChevronRight className="ml-1" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-3xl border-slate-100 bg-white p-6">
                      <DialogHeader>
                        <DialogTitle className="text-sm font-black text-slate-900 tracking-tight">
                          Gold Membership Full Benefits & Rules
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 gap-1 mt-4 max-h-[60vh] overflow-y-auto pr-1">
                        {[
                          "Diskon Kamar Flat 15% di Semua Jaringan LuxeStay", 
                          "Gratis Upgrade Kelas Kamar (Tergantung Ketersediaan)", 
                          "Akses Reservasi Jalur Prioritas Khusus VIP", 
                          "Gratis Breakfast Mewah untuk 2 Pax Setiap Hari", 
                          "Akses Fleksibel Early Check-In & Late Check-Out",
                          "Akumulasi Poin Otomatis dari Transaksi Pemesanan & Layanan Tambahan Resort",
                          "Masa Aktif Poin Selama 12 Bulan Sejak Aktivitas Terakhir Anda"
                        ].map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-none">
                            <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[9px] font-bold mt-0.5 shrink-0">✓</div>
                            <span className="font-bold text-xs text-slate-600 leading-normal">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* ACCORDION FAQ */}
                <div className="mt-6 bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 text-[#5B5FEF]">Frequently Asked Questions</h4>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-slate-100">
                      <AccordionTrigger className="text-xs font-bold text-slate-700 hover:text-[#5B5FEF] transition-colors py-4 focus:no-underline">
                        Bagaimana cara anggota mengumpulkan poin rewards?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-slate-400 leading-relaxed pb-4 font-medium">
                        Poin akan otomatis ditambahkan setiap kali Anda melakukan transaksi pemesanan kamar atau layanan tambahan di properti LuxeStay.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-slate-100">
                      <AccordionTrigger className="text-xs font-bold text-slate-700 hover:text-[#5B5FEF] transition-colors py-4 focus:no-underline">
                        Apakah poin rewards bisa hangus kedaluwarsa?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-slate-400 leading-relaxed pb-4 font-medium">
                        Poin rewards Anda akan tetap aktif selama terdapat aktivitas pemesanan kamar minimal satu kali dalam kurun waktu 12 bulan.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>

          </div>
        )}
      </div>

    </div>
  );
}