import { useState, useEffect } from "react";
import { FiSearch, FiMail, FiPhone, FiMoreVertical, FiFilter, FiUserPlus } from "react-icons/fi";

const customerData = [
  { id: "C-001", name: "Alexander Graham", email: "alex@example.com", phone: "+62 812-3456", room: "Oceanic Deluxe", checkIn: "12 May", checkOut: "15 May", status: "In-House" },
  { id: "C-002", name: "Sarah Connor", email: "sarah@sky.net", phone: "+62 855-9988", room: "Royal Penthouse", checkIn: "14 May", checkOut: "20 May", status: "In-House" },
  { id: "C-003", name: "Bruce Wayne", email: "bruce@bat.com", phone: "+62 811-0000", room: "Garden Villa", checkIn: "10 May", checkOut: "14 May", status: "Checking Out" },
  { id: "C-004", name: "Diana Prince", email: "diana@themyscira.io", phone: "+62 812-1122", room: "Sky Loft Penthouse", checkIn: "13 May", checkOut: "16 May", status: "In-House" },
  { id: "C-005", name: "Tony Stark", email: "tony@stark.com", phone: "+62 813-3000", room: "Presidential Suite", checkIn: "11 May", checkOut: "14 May", status: "Checking Out" },
  { id: "C-006", name: "Natasha Romanoff", email: "nat@widow.ru", phone: "+62 877-4455", room: "Modern Heritage", checkIn: "14 May", checkOut: "17 May", status: "In-House" },
  { id: "C-007", name: "Wanda Maximoff", email: "wanda@vision.com", phone: "+62 899-2233", room: "Oceanic Deluxe", checkIn: "12 May", checkOut: "18 May", status: "In-House" },
  { id: "C-008", name: "Steve Rogers", email: "cap@america.us", phone: "+62 812-1945", room: "Classic Suite", checkIn: "09 May", checkOut: "13 May", status: "Completed" },
  { id: "C-009", name: "Peter Parker", email: "peter@dailybugle.com", phone: "+62 852-7788", room: "Minimalist Loft", checkIn: "14 May", checkOut: "15 May", status: "In-House" },
  { id: "C-010", name: "Arthur Curry", email: "aquaman@atlantis.com", phone: "+62 812-0001", room: "Oceanic Deluxe", checkIn: "10 May", checkOut: "20 May", status: "In-House" },
  { id: "C-011", name: "Clark Kent", email: "clark@dailyplanet.com", phone: "+62 811-9999", room: "Sky Loft Penthouse", checkIn: "13 May", checkOut: "15 May", status: "In-House" },
  { id: "C-012", name: "Barry Allen", email: "flash@central.com", phone: "+62 812-3344", room: "Modern Heritage", checkIn: "14 May", checkOut: "14 May", status: "Checking Out" },
  { id: "C-013", name: "Hal Jordan", email: "green@lantern.com", phone: "+62 856-1122", room: "Royal Penthouse", checkIn: "11 May", checkOut: "16 May", status: "In-House" },
  { id: "C-014", name: "Victor Stone", email: "cyborg@star.labs", phone: "+62 812-8888", room: "Presidential Suite", checkIn: "08 May", checkOut: "12 May", status: "Completed" },
  { id: "C-015", name: "Stephen Strange", email: "doctor@sanctum.com", phone: "+62 813-6677", room: "Garden Villa", checkIn: "12 May", checkOut: "14 May", status: "Checking Out" },
  { id: "C-016", name: "T'Challa", email: "king@wakanda.af", phone: "+62 811-1234", room: "Royal Penthouse", checkIn: "10 May", checkOut: "20 May", status: "In-House" },
  { id: "C-017", name: "Scott Lang", email: "ant@pym.com", phone: "+62 812-5544", room: "Minimalist Loft", checkIn: "14 May", checkOut: "17 May", status: "In-House" },
  { id: "C-018", name: "Carol Danvers", email: "marvel@kree.com", phone: "+62 877-9900", room: "Sky Loft Penthouse", checkIn: "07 May", checkOut: "12 May", status: "Completed" },
  { id: "C-019", name: "Matt Murdock", email: "daredevil@law.com", phone: "+62 852-1111", room: "Modern Heritage", checkIn: "13 May", checkOut: "15 May", status: "In-House" },
  { id: "C-020", name: "Logan Howlett", email: "wolverine@x.com", phone: "+62 812-6666", room: "Garden Villa", checkIn: "11 May", checkOut: "19 May", status: "In-House" },
];

export default function Customers() {
  const [filteredGuests, setFilteredGuests] = useState(customerData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Logika Live Search & Filter
  useEffect(() => {
    const result = customerData.filter((guest) => {
      const matchSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          guest.room.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || guest.status === statusFilter;
      return matchSearch && matchStatus;
    });
    setFilteredGuests(result);
  }, [searchQuery, statusFilter]);

  return (
    <div className="w-full animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-stone-900 uppercase">Guest Directory.</h1>
          <p className="text-stone-400 text-sm italic font-serif mt-1">Monitoring {filteredGuests.length} active guests and their stay duration.</p>
        </div>
        <button className="flex items-center gap-3 bg-stone-900 text-white px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-900 transition-all shadow-xl shadow-stone-200">
          <FiUserPlus size={16} />
          <span>Add New Guest</span>
        </button>
      </header>

      {/* Toolbar Search & Filter */}
      <div className="bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300" />
          <input 
            type="text" 
            placeholder="Search by guest name or room..." 
            className="w-full bg-stone-50/50 pl-12 pr-6 py-3.5 rounded-2xl outline-none text-xs focus:ring-2 focus:ring-stone-100 transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <FiFilter className="text-stone-300 ml-2" />
          <select 
            className="bg-stone-50/50 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-500 outline-none cursor-pointer hover:bg-stone-100 transition-all border-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="In-House">In-House</option>
            <option value="Checking Out">Checking Out</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Guest Table Area */}
      <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50/50 text-[10px] uppercase tracking-widest text-stone-400 font-black">
              <tr className="border-b border-stone-100">
                <th className="px-8 py-6">Guest Details</th>
                <th className="px-8 py-6">Room Type</th>
                <th className="px-8 py-6">Stay Period</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-stone-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors">{guest.name}</span>
                        <span className="text-[10px] text-stone-400 font-mono tracking-tighter mt-1">{guest.id}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-stone-600 font-bold tracking-tight">{guest.room}</span>
                        <div className="flex gap-3 mt-1 text-stone-300">
                          <FiMail size={12} className="hover:text-stone-900 cursor-pointer" title={guest.email} />
                          <FiPhone size={12} className="hover:text-stone-900 cursor-pointer" title={guest.phone} />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-stone-900">{guest.checkIn} — {guest.checkOut}</span>
                        <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-0.5">May 2026</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-block border ${
                        guest.status === 'In-House' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        guest.status === 'Checking Out' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-stone-100 text-stone-400 border-stone-200'
                      }`}>
                        {guest.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 hover:bg-stone-100 rounded-xl transition-all text-stone-300 hover:text-stone-900">
                        <FiMoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <p className="text-stone-400 font-serif italic text-lg">No guests found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}