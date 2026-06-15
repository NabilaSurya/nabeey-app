import { FiStar, FiMapPin, FiCheckCircle } from "react-icons/fi";

export default function RoomsSection() {
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
                    {prop.price}<span className="text-xs text-slate-400 font-medium"> / night</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button className="w-full bg-slate-900 hover:bg-[#5B5FEF] text-white text-xs font-bold py-3.5 rounded-xl transition duration-200">
                  Instantly Book via LuxeStay
                </button>
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
    </section>
  );
}