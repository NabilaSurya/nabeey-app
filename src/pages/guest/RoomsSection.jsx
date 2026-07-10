import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiStar, FiMapPin, FiCheckCircle, FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

export default function RoomsSection() {
  const navigate = useNavigate();
  const { user, isMember, getDiscountedPrice } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [bookingModal, setBookingModal] = useState(null); // { prop } or null
  const [bookingForm, setBookingForm] = useState({ guest_name: "", guest_email: "", guest_phone: "", check_in: "", check_out: "" });

  // DATA KAMAR / PROPERTI YANG SUDAH DIPERBANYAK (6 PILIHAN PREMIUM)
  const propertiesData = [
    { 
      id: "ROOM-DELUXE", 
      name: "The Grand Deluxe Family Suite", 
      location: "Bali Private Coast, Indonesia",
      price: "$149", 
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80",
      tag: "Most Popular",
      rating: "4.9"
    },
    { 
      id: "ROOM-SUITE", 
      name: "Executive Ocean Luxury Penthouse", 
      location: "Crystal Lagoon, Maldives",
      price: "$299", 
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=500&q=80",
      tag: "Best View",
      rating: "5.0"
    },
    { 
      id: "ROOM-TOWER", 
      name: "Metropolitan Sky High Tower", 
      location: "Shinjuku, Tokyo",
      price: "$450", 
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=500&q=80",
      tag: "Selling Fast",
      rating: "4.8"
    },
    { 
      id: "ROOM-ALPS", 
      name: "Alpine Luxury Snow Chalet", 
      location: "Zermatt, Switzerland",
      price: "$520", 
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80",
      tag: "Winter Special",
      rating: "4.9"
    },
    { 
      id: "ROOM-DESERT", 
      name: "Al Maha Royal Desert Oasis", 
      location: "Dubai, United Arab Emirates",
      price: "$680", 
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=80",
      tag: "Top Premium",
      rating: "5.0"
    },
    { 
      id: "ROOM-VILLA", 
      name: "Mediterranean Cliffside Sanctuary", 
      location: "Santorini, Greece",
      price: "$380", 
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
      tag: "Romantic Getaway",
      rating: "4.7"
    }
  ];

  // Format harga diskon untuk member
  const formatDiscountedPrice = (price) => {
    const priceInUSD = parseInt(price.replace("$", ""));
    const discounted = getDiscountedPrice(priceInUSD);
    return "$" + discounted;
  };

  // Fungsi Checkout untuk Guest (non-login)
  const handleGuestBooking = async (e) => {
    e.preventDefault();
    if (!bookingModal) return;
    const prop = bookingModal;
    setCheckoutLoading(prop.id);
    try {
      const invoiceNum = "INV-" + Date.now().toString().slice(-6);
      const priceInUSD = parseInt(prop.price.replace("$", ""));
      const totalAmount = priceInUSD * 16000;
      const estimatedPoints = 0; // Guest tidak dapat poin

      const { error } = await supabase.from("transactions").insert({
        user_id: null,
        invoice_number: invoiceNum,
        total_amount: totalAmount,
        estimated_points: estimatedPoints,
        status: "Pending",
        guest_name: bookingForm.guest_name,
        guest_email: bookingForm.guest_email,
        guest_phone: bookingForm.guest_phone,
        check_in: bookingForm.check_in,
        check_out: bookingForm.check_out,
      });

      if (error) throw error;

      alert(`✅ Booking berhasil!\n\nInvoice: ${invoiceNum}\nNama: ${bookingForm.guest_name}\n\nMenunggu konfirmasi admin.`);
      setBookingModal(null);
      setBookingForm({ guest_name: "", guest_email: "", guest_phone: "", check_in: "", check_out: "" });
    } catch (err) {
      console.error("Gagal booking:", err);
      alert("Gagal memproses booking: " + err.message);
    } finally {
      setCheckoutLoading(null);
    }
  };

  // Fungsi Checkout untuk Member
  const handleCheckout = async (prop) => {
    setCheckoutLoading(prop.id);
    try {
      // Generate invoice number
      const invoiceNum = "INV-" + Date.now().toString().slice(-6);
      // Convert price string like "$149" to number in IDR (simulasi: $1 = Rp 16.000)
      const priceInUSD = parseInt(prop.price.replace("$", ""));
      const totalAmount = priceInUSD * 16000;
      // Estimasi poin: setiap Rp 10.000 = 1 poin
      const estimatedPoints = Math.floor(totalAmount / 10000);

      const { error } = await supabase.from("transactions").insert({
        user_id: user.id,
        invoice_number: invoiceNum,
        total_amount: totalAmount,
        estimated_points: estimatedPoints,
        status: "Pending",
      });

      if (error) throw error;

      // Redirect member ke portal member setelah sukses checkout
      navigate("/MemberLanding");
    } catch (err) {
      console.error("Gagal checkout:", err);
      alert("Gagal memproses checkout: " + err.message);
    } finally {
      setCheckoutLoading(null);
    }
  };

  // DATA ULASAN TAMU YANG SUDAH DIPERBANYAK (4 REVIEWS)
  const reviewsData = [
    {
      name: "Sarah Jenkins",
      role: "Verified Club Member",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      comment: "Booking through LuxeStay portal was incredibly fast. The system recognized my anniversary and we got a complimentary champagne bottle and a suite upgrade! Outstanding service.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Frequent Traveler",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      comment: "The Best Rate Guarantee is real. I managed to save $120 on my Maldives trip compared to other major booking platforms. Will definitely book here again.",
      rating: 5
    },
    {
      name: "Amara Diop",
      role: "Elite Tier Member",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      comment: "Layanan concierge 24 jam mereka sangat responsif saat saya butuh transportasi mendadak di Tokyo. Pengalaman menginap bintang lima yang sesungguhnya.",
      rating: 5
    },
    {
      name: "David Backham",
      role: "Luxury Explorer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      comment: "Proses check-in tanpa ribet dan kebersihan kamar di Dubai Oasis kemarin sangat luar biasa. Semua fasilitas yang tertulis di web sesuai dengan aslinya.",
      rating: 4
    }
  ];

  return (
    <section id="rooms" className="min-h-screen bg-slate-50/70 py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-8 w-full">
        
        {/* HEADLINE SECTIONS */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-[#5B5FEF]/10 px-3 py-1.5 rounded-lg">
            Our Signature Spaces
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-3">Find Your Perfect Sanctuary</h2>
          <p className="text-sm text-slate-400 mt-1">Immerse yourself in world-class architecture and bespoke hospitality experiences.</p>
        </div>

        {/* CARDS GRID HARGA PRODUCT (GRID NYA SEKARANG MENYESUAIKAN SEIRING DATA BERTAMBAH) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {propertiesData.map((prop) => (
            <div key={prop.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100/60 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
              <div>
                <div className="h-56 w-full overflow-hidden relative bg-slate-100">
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 text-[10px] font-black bg-[#5B5FEF] text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {prop.tag}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <FiStar className="fill-amber-500" /> {prop.rating}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{prop.id}</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-800 mb-1 line-clamp-1">{prop.name}</h3>
                  <p className="text-xs text-slate-400 font-medium mb-4 flex items-center gap-1">
                    <FiMapPin /> {prop.location}
                  </p>
                  
                  <div className="text-2xl font-black text-slate-900">
                    {isMember ? formatDiscountedPrice(prop.price) : prop.price}<span className="text-xs text-slate-400 font-medium"> / night</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                {isMember ? (
                  <button
                    onClick={() => handleCheckout(prop)}
                    disabled={checkoutLoading === prop.id}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-xs font-bold py-3.5 rounded-xl transition duration-200 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart size={14} />
                    {checkoutLoading === prop.id ? "Memproses..." : "Checkout / Beli Sekarang"}
                  </button>
                ) : (
                  <button 
                    onClick={() => setBookingModal(prop)}
                    className="w-full bg-slate-900 hover:bg-[#5B5FEF] text-white text-xs font-bold py-3.5 rounded-xl transition duration-200"
                  >
                    Instantly Book via LuxeStay
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SOCIAL PROOF: REVIEWS SECTION */}
        <div className="border-t border-slate-200/60 pt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-black text-slate-900">Loved by Thousands of Guests</h3>
            <p className="text-sm text-slate-400 mt-1">Here is what our global community members say about their LuxeStay experiences.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reviewsData.map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                        {review.name} <FiCheckCircle className="text-blue-500 text-xs fill-blue-500/10" />
                      </h4>
                      <p className="text-[11px] text-slate-400">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(review.rating)].map((_, idx) => (
                      <FiStar key={idx} className="fill-amber-500 text-xs" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ==================== BOOKING MODAL UNTUK GUEST ==================== */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setBookingModal(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900">Booking Kamar</h3>
              <button onClick={() => setBookingModal(null)} className="text-slate-400 hover:text-slate-700 text-xl">&times;</button>
            </div>
            
            <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm font-bold text-slate-900">{bookingModal.name}</p>
              <p className="text-xs text-slate-500 mt-1">{bookingModal.location}</p>
              <p className="text-sm font-black text-[#5B5FEF] mt-2">{bookingModal.price} / night</p>
            </div>

            <form onSubmit={handleGuestBooking} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">Nama Lengkap</label>
                <input type="text" required value={bookingForm.guest_name} onChange={(e) => setBookingForm(f => ({ ...f, guest_name: e.target.value }))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#5B5FEF]" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">Email</label>
                  <input type="email" required value={bookingForm.guest_email} onChange={(e) => setBookingForm(f => ({ ...f, guest_email: e.target.value }))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#5B5FEF]" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">No. HP</label>
                  <input type="tel" required value={bookingForm.guest_phone} onChange={(e) => setBookingForm(f => ({ ...f, guest_phone: e.target.value }))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#5B5FEF]" placeholder="+62 812..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">Check In</label>
                  <input type="date" required value={bookingForm.check_in} onChange={(e) => setBookingForm(f => ({ ...f, check_in: e.target.value }))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#5B5FEF]" />
                </div>
                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">Check Out</label>
                  <input type="date" required value={bookingForm.check_out} onChange={(e) => setBookingForm(f => ({ ...f, check_out: e.target.value }))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#5B5FEF]" />
                </div>
              </div>
              <button type="submit" disabled={checkoutLoading === bookingModal.id} className="w-full bg-[#5B5FEF] hover:bg-[#4834D4] disabled:bg-indigo-300 text-white font-bold py-3.5 rounded-xl transition-all text-sm">
                {checkoutLoading === bookingModal.id ? "Memproses..." : "Konfirmasi Booking"}
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}