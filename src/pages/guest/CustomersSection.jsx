import { FiMapPin, FiStar, FiArrowRight, FiHeart } from "react-icons/fi";

export default function CustomersSection() {
  const popularLocations = [
    {
      id: "LOC-BALI",
      name: "Bali, Indonesia",
      description: "Tropical paradise with stunning private beaches and cultural heritage.",
      hotelCount: "14 Premium Hotels",
      rating: "4.9 (2.4k Reviews)",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
      tag: "Top Choice"
    },
    {
      id: "LOC-MLDV",
      name: "Maldives Archipelago",
      description: "Exclusive overwater villas surrounded by crystal clear lagoons.",
      hotelCount: "8 Luxury Resorts",
      rating: "5.0 (1.8k Reviews)",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
      tag: "Most Romantic"
    },
    {
      id: "LOC-TKY",
      name: "Tokyo, Japan",
      description: "Futuristic cityscapes combined with majestic luxury high-rise towers.",
      hotelCount: "12 Sky Hotels",
      rating: "4.8 (3.1k Reviews)",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
      tag: "Trending Now"
    }
  ];

  return (
    // UBAH ID DI SINI MENJADI destinations
    <section id="destinations" className="min-h-screen bg-white py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-[#5B5FEF]/10 px-3 py-1.5 rounded-lg">
              Explore Destinations
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-4 tracking-tight">
              Our Best Handpicked Locations
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-md">
              Discover hyper-personalized luxury stays at world-renowned locations curated by our elite network.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold text-[#5B5FEF] hover:text-[#4834D4] transition group">
            See All Destinations <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {popularLocations.map((loc) => (
            <div key={loc.id} className="group bg-slate-50/50 rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-64 w-full overflow-hidden relative bg-slate-100">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-4 left-4 text-[10px] font-black bg-white text-slate-900 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">{loc.tag}</span>
                  <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-700 hover:text-rose-500 transition shadow-sm">
                    <FiHeart size={16} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="flex items-center gap-1 text-xs text-amber-500 font-bold"><FiStar className="fill-amber-500" /> {loc.rating}</span>
                    <span className="text-xs font-semibold text-slate-400">{loc.hotelCount}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-1.5 mb-2"><FiMapPin className="text-[#5B5FEF]" size={18} /> {loc.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{loc.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a href="#rooms" className="w-full bg-white hover:bg-slate-900 border border-slate-200 hover:border-slate-900 text-slate-800 hover:text-white text-xs font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
                  Explore Hotels Here <FiArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}