import { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit3, FiTrash2, FiEye, FiCheckCircle, FiXCircle } from "react-icons/fi";

const roomsData = [
  { id: 1, title: "Oceanic Deluxe", price: 120, category: "Suite", status: "Available", stock: 5, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070" },
  { id: 2, title: "Modern Heritage Suite", price: 250, category: "Suite", status: "Booked", stock: 0, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070" },
  { id: 3, title: "Royal Penthouse", price: 400, category: "Penthouse", status: "Available", stock: 2, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080" },
  { id: 4, title: "Garden Escape Villa", price: 300, category: "Villa", status: "Maintenance", stock: 1, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070" },
  { id: 5, title: "Presidential Luxury Suite", price: 550, category: "Suite", status: "Available", stock: 1, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070" },
  { id: 6, title: "Sky Loft Penthouse", price: 280, category: "Penthouse", status: "Available", stock: 3, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070" },
];

export default function Rooms() {
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Logika Filter & Search Otomatis
  useEffect(() => {
    const filtered = roomsData.filter((room) => {
      const matchSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "All" || room.category === activeCategory;
      return matchSearch && matchCategory;
    });
    setFilteredRooms(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-stone-900 uppercase leading-none">
            Room Inventory<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-400 text-sm font-medium mt-2 font-serif italic">
            Manage your property listings, pricing, and availability.
          </p>
        </div>
        
        <button className="flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[2px] hover:bg-amber-900 transition-all shadow-xl shadow-stone-200 active:scale-95">
          <FiPlus size={16} />
          <span>Add New Room</span>
        </button>
      </header>

      {/* Toolbar: Search & Category Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
        {/* Search Bar */}
        <div className="relative w-full lg:max-w-md">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or category..." 
            className="w-full bg-white border border-stone-100 pl-14 pr-6 py-4 rounded-2xl outline-none text-sm focus:ring-2 focus:ring-stone-100 transition-all shadow-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
          {["All", "Suite", "Villa", "Penthouse"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all border ${
                activeCategory === cat 
                ? "bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-200" 
                : "bg-white text-stone-400 border-stone-100 hover:border-stone-900 hover:text-stone-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <div key={room.id} className="group bg-white rounded-[2.5rem] border border-stone-100 overflow-hidden hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500">
            {/* Image Wrap */}
            <div className="relative h-60 overflow-hidden">
              <img src={room.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={room.title} />
              <div className="absolute top-5 left-5">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border ${
                  room.status === "Available" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                  room.status === "Booked" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                  "bg-red-500/10 text-red-500 border-red-500/20"
                }`}>
                  {room.status}
                </span>
              </div>
            </div>

            {/* Content Detail */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-300 font-black mb-1">{room.category}</p>
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight">{room.title}</h3>
                </div>
                <div className="text-right">
                    <p className="text-lg font-black text-stone-900">${room.price}</p>
                    <p className="text-[9px] text-stone-400 uppercase font-bold">per night</p>
                </div>
              </div>

              {/* Stock/Units Status */}
              <div className="flex items-center gap-3 mb-8">
                 <div className="flex-1 h-1.5 bg-stone-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${room.stock > 0 ? "bg-stone-900" : "bg-stone-200"}`} 
                      style={{ width: `${(room.stock / 5) * 100}%` }}
                    ></div>
                 </div>
                 <span className="text-[10px] font-black text-stone-400 uppercase">{room.stock} Units</span>
              </div>

              {/* Admin Actions Bar */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-stone-50 text-stone-900 rounded-2xl hover:bg-stone-900 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest border border-stone-100 shadow-sm active:scale-95">
                  <FiEdit3 size={14} /> Edit Room
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-stone-50 text-stone-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all border border-stone-100 active:scale-95">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-stone-200">
          <FiXCircle className="mx-auto text-stone-200 mb-4" size={48} />
          <h3 className="text-xl font-serif italic text-stone-400 mb-2">No rooms match your filter.</h3>
          <button 
            onClick={() => {setSearchQuery(""); setActiveCategory("All")}}
            className="text-stone-900 font-bold underline text-[10px] uppercase tracking-widest"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}