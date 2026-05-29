import { useState, useEffect } from "react";
import { FiPlus, FiEdit3, FiTrash2, FiMoreVertical } from "react-icons/fi";

// Import Komponen Global 
import LoadingSpinner from "../components/LoadingSpinner"; 
import Footer from "../components/Footer"; 
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

const roomsData = [
  { id: 1, title: "Oceanic Deluxe", price: 120, category: "Suite", status: "Available", stock: 5, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070" },
  { id: 2, title: "Modern Heritage Suite", price: 250, category: "Suite", status: "Maintenance", stock: 0, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070" },
  { id: 3, title: "Royal Penthouse", price: 400, category: "Penthouse", status: "Available", stock: 2, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080" },
  { id: 4, title: "Garden Escape Villa", price: 300, category: "Villa", status: "Maintenance", stock: 1, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070" },
  { id: 5, title: "Presidential Luxury Suite", price: 550, category: "Suite", status: "Available", stock: 1, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070" },
  { id: 6, title: "Sky Loft Penthouse", price: 280, category: "Penthouse", status: "Available", stock: 3, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070" },
];

export default function Rooms() {
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const filterOptions = [
    { value: "All", label: "All Properties" },
    { value: "Suite", label: "Luxury Suites" },
    { value: "Villa", label: "Private Villas" },
    { value: "Penthouse", label: "Penthouses" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = roomsData.filter((room) => {
      const matchSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "All" || room.category === activeCategory;
      return matchSearch && matchCategory;
    });
    setFilteredRooms(filtered);
  }, [searchQuery, activeCategory]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#F8F9FC] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-7 p-6 md:p-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* Header Utama Menggunakan PrimaryButton Ungu Baru */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionHeading title="Room Inventory" subtitle="Manage property types, seasonal pricing, and instant allocations." />
          <PrimaryButton icon={<FiPlus size={18} />} onClick={() => alert("Add Room")}>
            Add New Room
          </PrimaryButton>
        </div>

        {/* Toolbar Filter */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_8px_24px_rgba(69,78,124,0.04)] flex flex-col sm:flex-row gap-4 items-center w-full border border-[#EDF2F7]">
          <SearchBar placeholder="Search room name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <FilterSelect value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} options={filterOptions} />
        </div>

        {/* Tampilan Grid Kamar */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-[1.5rem] p-5 shadow-[0px_8px_32px_rgba(69,78,124,0.03)] border border-[#EDF2F7] group hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between">
                
                <div>
                  <div className="relative h-52 rounded-2xl overflow-hidden mb-5 shadow-sm">
                    <img src={room.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={room.title} />
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={room.status} />
                    </div>
                  </div>

                  <div className="px-1 pb-2">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[11px] font-bold text-[#5B5FEF] uppercase tracking-wide block mb-1">{room.category}</span>
                        <h3 className="text-[16px] font-bold text-[#151D48] tracking-tight leading-snug">{room.title}</h3>
                      </div>
                      <button className="text-[#737791] hover:text-[#151D48] transition-colors p-1"><FiMoreVertical size={18} /></button>
                    </div>

                    <div className="flex items-center justify-between py-3.5 border-y border-[#F4F5F9] mb-5">
                      <div>
                        <p className="text-[11px] font-medium text-[#737791] uppercase">Rate / Night</p>
                        <p className="text-[18px] font-extrabold text-[#151D48] mt-0.5">${room.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-medium text-[#737791] uppercase">Allotted Stock</p>
                        <p className="text-[13px] font-bold text-[#425166] mt-1">{room.stock} Units</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi Bawah */}
                <div className="flex gap-3 px-1">
                  <button className="flex-1 bg-[#F3E8FF] text-[#5B5FEF] py-3 rounded-xl font-bold text-[12px] hover:bg-[#5B5FEF] hover:text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
                    <FiEdit3 size={14} /> Edit Room
                  </button>
                  <button className="px-4.5 bg-[#FFE2E5] text-[#FA5A7D] rounded-xl hover:bg-[#FA5A7D] hover:text-white transition-all duration-200 flex items-center justify-center shadow-sm">
                    <FiTrash2 size={15} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No luxury suites match your active filters." onClear={() => { setSearchQuery(""); setActiveCategory("All"); }} />
        )}

      </div>
      <Footer />
    </div>
  );
}