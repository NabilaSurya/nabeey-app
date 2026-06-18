import { useState, useEffect } from "react";
import { 
  FiGrid, FiActivity, FiMapPin, FiUsers, FiMessageSquare, 
  FiChevronRight, FiMenu, FiX, FiCheckCircle, FiUser, FiMail, 
  FiGift, FiCreditCard, FiAward, FiLogOut, FiHome, FiSliders, FiPhone,
  FiSearch, FiFilter, FiInfo
} from "react-icons/fi";

export default function Member() {
  // Authentication & Subscription States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  
  // Navbar States
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Active View State (home, rewards, profile)
  const [activeView, setActiveView] = useState("home");

  // Custom Toast Notification State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Dynamic Member Data
  const [member, setMember] = useState({
    name: "Guest User",
    email: "guest@luxstay.com",
    phone: "+62 812-3456-7890",
    status: "Gold Member",
    points: 1850,
    totalBooking: 3,
    preferredRoom: "Luxury Ocean Suite Villa"
  });

  // Filter & Search States untuk Tabel Pesanan
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Data Riwayat Pesanan Interaktif
  const [bookings, setBookings] = useState([
    { id: "LX-901", room: "Luxury Ocean Suite Villa", date: "12 June 2026", cost: "$240", status: "In-House" },
    { id: "LX-502", room: "Deluxe Family Mountain View", date: "28 February 2026", cost: "$140", status: "Completed" },
    { id: "LX-110", room: "Presidential Skyline Penthouse", date: "05 January 2026", cost: "$550", status: "Completed" },
  ]);

  // Edit Profile Form States
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editRoom, setEditRoom] = useState("");

  // List of Redeemable Rewards
  const rewardsList = [
    { id: 1, title: "1 Free Night - Ocean Suite", cost: 1500, description: "Tukarkan 1500 poin untuk menginap gratis 1 malam di kamar Ocean Suite premium.", icon: <FiAward className="text-amber-600" size={24} /> },
    { id: 2, title: "Luxury Spa Treatment Package", cost: 500, description: "Nikmati perawatan tubuh & pijat aromaterapi gratis selama 90 menit di Luxe Spa.", icon: <FiActivity className="text-indigo-600" size={24} /> },
    { id: 3, title: "Complimentary Premium Breakfast (2 Pax)", cost: 200, description: "Sarapan prasmanan kontinental mewah gratis untuk 2 orang di restoran utama resort.", icon: <FiGift className="text-rose-600" size={24} /> },
    { id: 4, title: "Free Airport Luxury Transfer", cost: 350, description: "Layanan jemput & antar bandara menggunakan armada Alphard/Vellfire premium gratis.", icon: <FiMapPin className="text-emerald-600" size={24} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper trigger custom toast
  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    
    const formattedEmail = inputEmail || `${inputName.toLowerCase().replace(/\s+/g, "")}@luxstay.com`;
    setMember((prev) => ({
      ...prev,
      name: inputName,
      email: formattedEmail,
    }));
    
    setEditName(inputName);
    setEditEmail(formattedEmail);
    setEditPhone(member.phone);
    setEditRoom(member.preferredRoom);
    
    setIsLoggedIn(true);
    showNotification(`Selamat datang kembali, ${inputName}! Silakan verifikasi paket Anda.`, "success");
  };

  const handleActivateSubscription = () => {
    setIsSubscribed(true);
    setActiveView("home");
    showNotification("Keanggotaan Gold Privilege Anda telah aktif!", "success");
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsSubscribed(false);
    setInputName("");
    setInputEmail("");
    setActiveView("home");
    showNotification("Anda telah keluar dari akun.", "info");
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMember(prev => ({
      ...prev,
      name: editName,
      email: editEmail,
      phone: editPhone,
      preferredRoom: editRoom
    }));
    showNotification("Profil keanggotaan Anda berhasil diperbarui!", "success");
    setActiveView("home");
  };

  const handleRedeemReward = (reward) => {
    if (member.points < reward.cost) {
      showNotification("Maaf, poin Anda tidak mencukupi untuk klaim reward ini.", "error");
      return;
    }

    setMember(prev => ({ ...prev, points: prev.points - reward.cost }));
    showNotification(`Sukses klaim "${reward.title}"! Kode voucher dikirim ke ${member.email}`, "success");
  };

  // Interaktivitas: Mengubah status booking langsung dari tabel
  const toggleBookingStatus = (id) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        const nextStatus = b.status === "In-House" ? "Completed" : "In-House";
        return { ...nextStatus, status: nextStatus };
      }
      return b;
    }));
    showNotification("Status reservasi berhasil disimulasikan berubah.", "info");
  };

  // Filter & Search Logic
  const filteredBookings = bookings.filter(b => {
    const matchSearch = b.room.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = statusFilter === "All" || b.status === statusFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased relative">
      
      {/* INTERNAL CUSTOM TOAST COMPONENT */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl transition-all border animate-slideUp bg-white ${
          toast.type === "success" ? "border-emerald-200 text-emerald-900" : 
          toast.type === "error" ? "border-rose-200 text-rose-900" : "border-indigo-200 text-indigo-900"
        }`}>
          <FiInfo size={18} className={toast.type === "success" ? "text-emerald-600" : toast.type === "error" ? "text-rose-600" : "text-indigo-600"} />
          <p className="text-xs font-bold">{toast.message}</p>
        </div>
      )}

      {/* ==================================================================
        1. DYNAMIC MEMBER NAVBAR (Hanya muncul jika SUDAH LOGIN)
        ================================================================== */}
      {isLoggedIn && (
        <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md py-4 border-b border-slate-200/60" 
            : "bg-white py-5 border-b border-slate-100"
        }`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 w-full">
            
            {/* BRAND LOGO */}
            <div className="flex items-center gap-1.5 select-none cursor-pointer" onClick={() => setActiveView("home")}>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                Luxe<span className="text-[#5B5FEF]">Stay</span>
              </span>
              <span className="text-[9px] font-extrabold bg-[#5B5FEF]/10 text-[#5B5FEF] px-2 py-0.5 rounded-full uppercase tracking-widest">
                {!isSubscribed ? "PENDING" : "MEMBER"}
              </span>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="hidden md:flex gap-6 text-sm font-bold text-slate-600">
              {isSubscribed && (
                <>
                  <button 
                    onClick={() => setActiveView("home")} 
                    className={`flex items-center gap-1.5 transition-colors ${activeView === "home" ? "text-[#5B5FEF]" : "hover:text-[#5B5FEF]"}`}
                  >
                    <FiHome size={16} /> Home Dashboard
                  </button>
                  <button 
                    onClick={() => setActiveView("rewards")} 
                    className={`flex items-center gap-1.5 transition-colors ${activeView === "rewards" ? "text-[#5B5FEF]" : "hover:text-[#5B5FEF]"}`}
                  >
                    <FiGift size={16} /> Tukar Rewards
                  </button>
                  <button 
                    onClick={() => setActiveView("profile")} 
                    className={`flex items-center gap-1.5 transition-colors ${activeView === "profile" ? "text-[#5B5FEF]" : "hover:text-[#5B5FEF]"}`}
                  >
                    <FiUser size={16} /> Edit Profil
                  </button>
                </>
              )}
            </div>

            {/* PROFILE WIDGET & SIGN OUT */}
            <div className="hidden md:flex items-center gap-4">
              {isSubscribed ? (
                <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  <div 
                    onClick={() => setActiveView("profile")} 
                    className="w-8 h-8 rounded-lg bg-[#5B5FEF] text-white font-black flex items-center justify-center text-xs cursor-pointer hover:scale-105 transition-transform"
                    title="Edit Profil"
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-slate-900 leading-none">{member.name}</p>
                    <p className="text-[9px] font-black text-amber-700 mt-1">{member.points.toLocaleString()} PTS</p>
                  </div>
                  <button 
                    onClick={handleSignOut} 
                    className="ml-2 p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Sign Out"
                  >
                    <FiLogOut size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleSignOut} 
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md flex items-center gap-1"
                >
                  <FiLogOut size={14} /> Keluar
                </button>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 hover:text-[#5B5FEF] focus:outline-none">
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* MOBILE DROPDOWN */}
          <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}`}>
            <div className="flex flex-col px-6 py-6 gap-4 text-sm font-bold text-slate-600">
              {isSubscribed ? (
                <>
                  <button onClick={() => { setActiveView("home"); setIsOpen(false); }} className="flex items-center gap-3 py-2 border-b border-slate-100 text-slate-900"><FiHome size={18} /> Home Dashboard</button>
                  <button onClick={() => { setActiveView("rewards"); setIsOpen(false); }} className="flex items-center gap-3 py-2 border-b border-slate-100 text-slate-900"><FiGift size={18} /> Tukar Rewards</button>
                  <button onClick={() => { setActiveView("profile"); setIsOpen(false); }} className="flex items-center gap-3 py-2 border-b border-slate-100 text-slate-900"><FiUser size={18} /> Edit Profil</button>
                  <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full mt-2 text-center bg-rose-600 text-white text-xs font-bold py-3.5 rounded-xl block">Sign Out</button>
                </>
              ) : (
                <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full text-center bg-rose-600 text-white text-xs font-bold py-3.5 rounded-xl block">Keluar</button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* ==================================================================
        2. MAIN CONTENT AREA 
        ================================================================== */}
      <div className={`${isLoggedIn ? "pt-32" : "pt-12"} pb-24 max-w-7xl mx-auto px-6 md:px-8 w-full`}>
        
        {/* KONDISI 1: BELUM LOGIN (Tanpa Navbar Atas) */}
        {!isLoggedIn && (
          <div className="min-h-[85vh] flex items-center justify-center py-12">
            <div className="w-full max-w-md bg-white rounded-[24px] border border-slate-200 shadow-xl p-8 transition-all">
              <div className="text-center mb-8">
                <span className="text-[#5B5FEF] text-[10px] font-black uppercase tracking-widest bg-[#5B5FEF]/10 px-3 py-1.5 rounded-lg">
                  LuxeStay Exclusive Portal
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-4 tracking-tight">Unlock Member Portal</h2>
                <p className="text-xs text-slate-500 mt-1">Silakan masuk dengan akun Anda untuk mengelola poin rewards & akomodasi.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan nama Anda..."
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#5B5FEF] focus:bg-white transition-all text-slate-900 font-bold"
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
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#5B5FEF] focus:bg-white transition-all text-slate-900 font-bold"
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

        {/* KONDISI 2: LOGIN TAPI BELUM BERLANGGANAN */}
        {isLoggedIn && !isSubscribed && (
          <div className="min-h-[65vh] flex items-center justify-center py-6">
            <div className="w-full max-w-xl bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 md:p-10 text-center">
              <span className="inline-flex items-center gap-1.5 text-amber-800 text-[10px] font-black uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-lg">
                <FiAward size={12} /> Subscription Plan Required
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-4 tracking-tight">Halo, {member.name}! 👋</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Akun terdaftar, namun Anda memerlukan langganan paket **Gold Tier active** untuk mengakses dashboard reward & pesanan.</p>

              <div className="my-8 p-6 rounded-2xl border-2 border-[#5B5FEF] bg-slate-50 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#5B5FEF] text-white font-black text-[9px] px-4 py-1 rounded-bl-xl tracking-wider">RECOMMENDED</div>
                <h3 className="text-base font-black text-slate-900">LuxeStay Gold Privilege</h3>
                <p className="text-xs text-slate-500 mt-1">Akses eksklusif penuh ke layanan hospitality resort kami.</p>
                
                <div className="my-4 border-t border-slate-200 pt-4 space-y-2.5">
                  {["Diskon Kamar Flat 15% untuk Semua Ruangan", "Fasilitas Penukaran Poin dengan Kamar Gratis", "Prioritas Jalur Check-In Tanpa Antre"].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <span className="text-[#5B5FEF]">✔</span> {benefit}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end mt-6 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] block font-black text-slate-400 uppercase tracking-wider">Biaya Keanggotaan</span>
                    <span className="text-2xl font-black text-slate-900">$19<span className="text-xs text-slate-500 font-bold">/bulan</span></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleActivateSubscription}
                  className="w-full bg-[#5B5FEF] hover:bg-[#4834D4] text-white font-bold text-xs py-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <FiCreditCard size={14} /> Aktifkan Keanggotaan Sekarang
                </button>
                <button 
                  onClick={handleActivateSubscription}
                  className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors py-1"
                >
                  Skip Dulu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* KONDISI 3: SUDAH MASUK & AKTIF BERLANGGANAN (DASHBOARD UTUH) */}
        {isLoggedIn && isSubscribed && (
          <div className="space-y-12">
            
            {/* VIEW A: HOME DASHBOARD */}
            {activeView === "home" && (
              <div className="space-y-10">
                <div className="text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-[#5B5FEF]/10 px-3 py-1.5 rounded-lg">
                      👑 {member.status} Account Active
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">Selamat Datang Kembali, {member.name}</h2>
                    <p className="text-sm text-slate-500 mt-1">ID Anggota Loyalty: <span className="font-mono text-slate-700 font-bold">LX-{member.name.substring(0,3).toUpperCase()}-2026</span></p>
                  </div>
                  <button 
                    onClick={() => setActiveView("rewards")}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs py-3 px-5 rounded-xl shadow-md self-center md:self-auto hover:scale-105 transition-transform"
                  >
                    <FiGift size={14} /> Ambil Hadiah Poin ({member.points} PTS)
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* CARD LOYALTY DENGAN TEKS HITAM / GELAP SESUAI INSTRUKSI */}
                    <div className="relative h-56 w-full rounded-[24px] overflow-hidden bg-slate-100 p-8 text-slate-900 shadow-md flex flex-col justify-between border-2 border-slate-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[9px] font-black tracking-widest text-indigo-600 uppercase">Premium Privilege Access</p>
                          <h3 className="text-lg font-black tracking-tight text-slate-900 mt-0.5">LuxeStay Loyalty Card</h3>
                        </div>
                        <div className="text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded-md tracking-wider">GOLD TIER</div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-slate-500 font-mono font-bold">Registered Name</p>
                          <p className="text-sm font-black text-slate-900 tracking-wide">{member.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-slate-500 uppercase tracking-wider font-black">Points Balance</p>
                          <p className="text-2xl font-black text-indigo-600">{member.points.toLocaleString()} PTS</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Next Tier Target: Platinum</span>
                        <span className="text-xs font-black text-[#5B5FEF]">75% Completed</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-[#5B5FEF] h-full rounded-full w-[75%]" />
                      </div>
                      <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">Selesaikan beberapa reservasi malam lagi untuk membuka diskon kamar flat 20%.</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <h4 className="text-2xl font-black text-slate-900">{bookings.length}</h4>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mt-1">Total Pesanan</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <h4 className="text-2xl font-black text-emerald-600">Active</h4>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mt-1">Rate Guarantee</p>
                      </div>
                    </div>

                    {/* BANNER PROMO TEKS HITAM */}
                    <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-[24px] flex flex-col justify-between h-full">
                      <div>
                        <span className="bg-amber-200 text-amber-900 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest w-fit block mb-2">Claim Offer</span>
                        <h4 className="text-sm font-black text-slate-900 leading-snug">Voucher Diskon Akhir Pekan</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">Potongan harga eksklusif 15% otomatis aktif untuk stay berikutnya.</p>
                      </div>
                      <button 
                        onClick={() => showNotification("Kupon promo berhasil disinkronkan ke akun Anda!", "success")}
                        className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-xl text-center shadow-sm"
                      >
                        Ambil Kupon Promo
                      </button>
                    </div>
                  </div>
                </div>

                {/* LOG DATA PESANAN INTERAKTIF (DENGAN PENCARIAN & FILTER) */}
                <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider text-[#5B5FEF]">
                      Daftar & Riwayat Reservasi Kamar
                    </h3>
                    
                    {/* Alat Filter Interaktif */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                          type="text"
                          placeholder="Cari ID / Kamar..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-[#5B5FEF]"
                        />
                      </div>
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none text-slate-700"
                      >
                        <option value="All">Semua Status</option>
                        <option value="In-House">In-House</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((item) => (
                        <div key={item.id} className="py-4 flex justify-between items-center group hover:bg-slate-50 px-3 rounded-xl transition">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-slate-400">{item.id}</span>
                              <span className="text-sm font-black text-slate-900 block">{item.room}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Status interaktif yang dapat diklik untuk berganti */}
                            <button 
                              onClick={() => toggleBookingStatus(item.id)}
                              title="Klik untuk simulasi ubah status"
                              className={`text-[10px] font-black px-2.5 py-1 rounded-lg border transition ${
                                item.status === 'In-House' 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                              }`}
                            >
                              ● {item.status}
                            </button>
                            <span className="text-xs font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl">{item.cost}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-6 font-bold">Tidak ada data pesanan yang cocok.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: TUKAR REWARDS */}
            {activeView === "rewards" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ambil Hadiah Poin Loyalty</h2>
                    <p className="text-sm text-slate-500 mt-1">Konversikan akumulasi poin LuxeStay Anda menjadi penawaran free stay atau bonus resort.</p>
                  </div>
                  <div className="bg-amber-100 text-amber-900 px-4 py-2 rounded-2xl border border-amber-300 text-center">
                    <span className="text-[10px] uppercase font-black tracking-wider block text-slate-500">Sisa Poin Kamu</span>
                    <span className="text-lg font-black">{member.points.toLocaleString()} PTS</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {rewardsList.map((reward) => (
                    <div key={reward.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">{reward.icon}</div>
                          <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-black px-3 py-1 rounded-xl">{reward.cost} PTS</span>
                        </div>
                        <h3 className="text-base font-black text-slate-900">{reward.title}</h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{reward.description}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-bold">Klaim Instant</span>
                        <button 
                          onClick={() => handleRedeemReward(reward)}
                          disabled={member.points < reward.cost}
                          className={`text-xs font-black py-2.5 px-4 rounded-xl transition-all ${
                            member.points >= reward.cost 
                              ? "bg-slate-900 hover:bg-[#5B5FEF] text-white shadow-md" 
                              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                          }`}
                        >
                          {member.points >= reward.cost ? "Tukarkan Poin" : "Poin Tidak Cukup"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW C: EDIT PROFIL */}
            {activeView === "profile" && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Edit Profil Keanggotaan</h2>
                  <p className="text-xs text-slate-400 mt-1">Perbarui identitas profil resmi keanggotaan Anda di sini.</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Nama Lengkap</label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Email Kontak</label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="email" required value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Nomor Handphone</label>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input type="text" required value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Kamar Favorit</label>
                      <select value={editRoom} onChange={(e) => setEditRoom(e.target.value)} className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none text-slate-900">
                        <option value="Luxury Ocean Suite Villa">Luxury Ocean Suite Villa</option>
                        <option value="Deluxe Family Mountain View">Deluxe Family Mountain View</option>
                        <option value="Presidential Skyline Penthouse">Presidential Skyline Penthouse</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button type="button" onClick={() => setActiveView("home")} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition">Batal</button>
                    <button type="submit" className="bg-[#5B5FEF] hover:bg-[#4834D4] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition">Simpan Perubahan</button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
}