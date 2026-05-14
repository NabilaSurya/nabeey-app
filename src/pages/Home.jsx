import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import RoomCard from "../components/RoomCard";

// 1. DATA JSON (Anggap ini data dari API)
const roomsData = [
  { id: 1, title: "Oceanic Deluxe", price: 120, type: "Deluxe", guests: "2", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070" },
  { id: 2, title: "Modern Heritage Suite", price: 250, type: "Suite", guests: "4", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070" },
  { id: 3, title: "Royal Penthouse", price: 400, type: "Penthouse", guests: "6", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080" },
  { id: 4, title: "Garden Escape Villa", price: 300, type: "Villa", guests: "4", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070" },
  { id: 5, title: "Presidential Luxury", price: 550, type: "Suite", guests: "6", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070" },
  { id: 6, title: "Minimalist Sky Loft", price: 280, type: "Deluxe", guests: "2", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070" },
];

export default function Home() {
  // 2. STATE
  const [filteredRooms, setFilteredRooms] = useState(roomsData); // Awalnya tampilkan semua
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterGuests, setFilterGuests] = useState("All");

  // 3. LOGIKA FILTER (Otomatis jalan tiap ada perubahan state)
  useEffect(() => {
    const result = roomsData.filter((room) => {
      const matchSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === "All" || room.type === filterType;
      const matchGuests = filterGuests === "All" || room.guests === filterGuests;

      return matchSearch && matchType && matchGuests;
    });

    setFilteredRooms(result);
  }, [searchQuery, filterType, filterGuests]); // Dependencies: Search, Tipe, & Tamu

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      <Hero />

      {/* Booking Bar / Filter Section */}
      <section className="relative z-20 px-6 -mt-20 max-w-[1440px] mx-auto">
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-100 grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
          
          {/* SEARCH */}
          <div>
            <label className="block text-[11px] uppercase tracking-[3px] font-bold text-stone-400 mb-3 ml-1">Search Room</label>
            <input 
              type="text" 
              placeholder="e.g. Heritage..."
              className="w-full bg-stone-50 p-4 rounded-2xl border-none text-sm focus:ring-2 focus:ring-stone-200 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* GUESTS FILTER */}
          <div>
            <label className="block text-[11px] uppercase tracking-[3px] font-bold text-stone-400 mb-3 ml-1">Guests</label>
            <select 
              className="w-full bg-stone-50 p-4 rounded-2xl border-none text-sm cursor-pointer focus:ring-2 focus:ring-stone-200"
              value={filterGuests}
              onChange={(e) => setFilterGuests(e.target.value)}
            >
              <option value="All">Any Guests</option>
              <option value="2">2 Persons</option>
              <option value="4">4 Persons</option>
              <option value="6">6 Persons</option>
            </select>
          </div>

          {/* TYPE FILTER */}
          <div>
            <label className="block text-[11px] uppercase tracking-[3px] font-bold text-stone-400 mb-3 ml-1">Room Type</label>
            <select 
              className="w-full bg-stone-50 p-4 rounded-2xl border-none text-sm cursor-pointer focus:ring-2 focus:ring-stone-200"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>

          {/* STATUS INDIKATOR */}
          <div className="text-center md:text-right pb-4 px-2">
            <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Status</p>
            <p className="text-sm font-serif italic text-stone-900">
              {filteredRooms.length} Rooms Found
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-6 md:px-16 py-32 max-w-[1440px] mx-auto">
        <div className="mb-16">
          <p className="uppercase tracking-[6px] text-amber-800 text-xs font-bold mb-4">Sophisticated Choice</p>
          <h2 className="text-5xl md:text-7xl font-bold italic tracking-tighter text-stone-900 leading-tight">
            {searchQuery ? `Results for "${searchQuery}"` : "Our Finest Suites"}
          </h2>
        </div>

        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-stone-50 rounded-[3rem] border border-dashed border-stone-200">
            <h3 className="text-2xl font-serif italic text-stone-400">No rooms match your criteria.</h3>
            <button 
              onClick={() => {setSearchQuery(""); setFilterType("All"); setFilterGuests("All");}}
              className="mt-6 text-stone-900 font-bold underline underline-offset-8 uppercase text-[10px] tracking-widest"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}