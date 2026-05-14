import { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";

export default function Rooms() {
  // 1. DATA MASTER (Anggap hasil fetch API)
  const allRooms = [
    { title: "Oceanic Deluxe", price: 120, category: "Suite", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070" },
    { title: "Modern Heritage Suite with City View", price: 250, category: "Suite", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070" },
    { title: "Royal Penthouse", price: 400, category: "Penthouse", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080" },
    { title: "Garden Escape Villa", price: 300, category: "Villa", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070" },
    { title: "Presidential Luxury Suite", price: 550, category: "Suite", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070" },
    { title: "Sky Loft Penthouse", price: 280, category: "Penthouse", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070" },
  ];

  // 2. STATE UNTUK FILTER & SEARCH
  const [filteredRooms, setFilteredRooms] = useState(allRooms);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // 3. LOGIKA FILTER & SEARCH (LIVE)
  useEffect(() => {
    const filtered = allRooms.filter((room) => {
      const matchSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "All" || room.category === activeCategory;
      return matchSearch && matchCategory;
    });
    setFilteredRooms(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full bg-[#FDFCFB] min-h-screen">
      {/* Header Section */}
      <section className="pt-44 pb-20 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-stone-200 pb-12">
          <div className="max-w-2xl w-full">
            <p className="uppercase tracking-[6px] text-amber-800 text-[10px] font-bold mb-4">
              Our Collection
            </p>
            <h1 className="text-6xl md:text-8xl font-bold italic tracking-tighter leading-none text-stone-900 mb-8">
              Rooms & <br /> Suites
            </h1>
            
            {/* SEARCH BOX */}
            <div className="max-w-md relative">
              <input 
                type="text"
                placeholder="Search by room name..."
                className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 outline-none transition-all placeholder:italic"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-0 top-3 text-stone-400">🔍</span>
            </div>
          </div>

          <div className="md:text-right w-full md:w-auto">
            <p className="text-stone-500 max-w-xs text-sm leading-relaxed mb-6 italic ml-auto">
              "Pick your sanctuary. From minimalist suites to extravagant royal penthouses."
            </p>
            
            {/* CATEGORY FILTER */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-end">
              {["All", "Suite", "Villa", "Penthouse"].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full border text-[10px] uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? "bg-stone-900 text-white border-stone-900" 
                    : "border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Rooms */}
      <section className="px-6 md:px-16 pb-32 max-w-[1440px] mx-auto">
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {filteredRooms.map((room, i) => (
              <div key={i} className="flex flex-col h-full group">
                <div className="flex-grow">
                  <RoomCard {...room} />
                </div>
                <div className="mt-auto pt-6 border-t border-stone-100">
                  <div className="flex gap-4 text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">
                    <span>45 m²</span>
                    <span className="text-stone-200">•</span>
                    <span>City View</span>
                    <span className="text-stone-200">•</span>
                    <span>King Bed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl italic text-stone-400 font-serif">No rooms found for "{searchQuery}"</h3>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
              className="mt-4 text-stone-900 underline text-xs font-bold uppercase tracking-widest"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-white py-32 px-6 text-center border-t border-stone-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold italic text-stone-900 mb-6 tracking-tight">
            Need a custom arrangement?
          </h2>
          <p className="text-stone-500 mb-12 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Contact our concierge for personalized services, from airport <br className="hidden md:block" /> pickups to private dinner arrangements.
          </p>
          
          <div className="flex justify-center">
            <button className="bg-[#1A1A1A] text-white px-12 py-5 rounded-full font-bold uppercase text-[11px] tracking-[3px] shadow-2xl shadow-stone-400 hover:bg-black hover:scale-105 transition-all duration-300">
              Contact Concierge
            </button>
          </div>
        </div>
      </section>
      
      <div className="w-full h-20 bg-black"></div>
    </div>
  );
}