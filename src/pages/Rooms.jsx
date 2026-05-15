import { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit3, FiTrash2, FiMoreVertical } from "react-icons/fi";

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

  useEffect(() => {
    const filtered = roomsData.filter((room) => {
      const matchSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "All" || room.category === activeCategory;
      return matchSearch && matchCategory;
    });
    setFilteredRooms(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full bg-[#F5F5F7] min-h-screen animate-in fade-in duration-700 font-['Inter',_sans-serif]">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#151D48] tracking-tight leading-[1.2]">
            Room Inventory
          </h1>
          <p className="text-[#6B7280] text-[13px] mt-1 leading-[1.5]">
            Manage your property listings, pricing, and availability.
          </p>
        </div>
        
        <button className="flex items-center gap-3 bg-[#5B5FEF] text-white px-7 py-3.5 rounded-2xl font-semibold text-[14px] hover:bg-[#4a4ce0] transition-all shadow-lg shadow-indigo-100 active:scale-95">
          <FiPlus size={18} />
          <span>Add New Room</span>
        </button>
      </header>

      {/* Toolbar: Search & Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Search Input */}
        <div className="relative lg:col-span-1 group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#5B5FEF]" size={18} />
          <input 
            type="text" 
            placeholder="Search rooms..." 
            className="w-full bg-white border-none pl-14 pr-6 py-4 rounded-[20px] outline-none text-[13px] text-[#151D48] font-medium shadow-sm focus:ring-2 focus:ring-[#5B5FEF]/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Tabs */}
        <div className="lg:col-span-2 flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {["All", "Suite", "Villa", "Penthouse"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3.5 rounded-[18px] text-[13px] font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? "bg-[#5B5FEF] text-white shadow-md shadow-indigo-100" 
                : "bg-white text-[#6B7280] hover:bg-white hover:text-[#5B5FEF] shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-[32px] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#F5F5F7] group hover:-translate-y-2 transition-all duration-500">
            {/* Image Wrap */}
            <div className="relative h-56 rounded-[24px] overflow-hidden mb-6">
              <img src={room.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={room.title} />
              <div className="absolute top-4 right-4">
                <StatusBadge status={room.status} />
              </div>
            </div>

            {/* Room Content */}
            <div className="px-2 pb-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[11px] font-bold text-[#BF83FF] uppercase tracking-wider mb-1 block">
                    {room.category}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#151D48] leading-[1.3]">{room.title}</h3>
                </div>
                <button className="text-[#6B7280] hover:text-[#5B5FEF]">
                  <FiMoreVertical size={20} />
                </button>
              </div>

              <div className="flex items-center justify-between py-4 border-y border-[#F5F5F7] mb-6">
                <div>
                    <p className="text-[11px] text-[#6B7280] font-medium uppercase">Price</p>
                    <p className="text-[20px] font-bold text-[#151D48]">${room.price}<span className="text-[12px] text-[#6B7280] font-normal">/night</span></p>
                </div>
                <div className="text-right">
                    <p className="text-[11px] text-[#6B7280] font-medium uppercase">Stock</p>
                    <p className="text-[14px] font-bold text-[#151D48]">{room.stock} Units</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-[#F3E8FF] text-[#BF83FF] py-3 rounded-2xl font-bold text-[13px] hover:bg-[#BF83FF] hover:text-white transition-all flex items-center justify-center gap-2">
                  <FiEdit3 size={16} /> Edit
                </button>
                <button className="p-3 bg-[#FFE2E5] text-[#FA5A7D] rounded-2xl hover:bg-[#FA5A7D] hover:text-white transition-all">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-component untuk Badge Status Warna-warni ala Dabang
function StatusBadge({ status }) {
  const styles = {
    Available: "bg-[#DCFCE7] text-[#3CD856]",
    Booked: "bg-[#FFF4DE] text-[#FF947A]",
    Maintenance: "bg-[#FFE2E5] text-[#FA5A7D]",
  };

  return (
    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-bold shadow-sm ${styles[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
}