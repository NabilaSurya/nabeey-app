import { useState, useEffect } from "react";
import { FiSearch, FiMail, FiPhone, FiMoreVertical, FiUserPlus, FiFilter } from "react-icons/fi";

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
];

export default function Customers() {
  const [filteredGuests, setFilteredGuests] = useState(customerData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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
    <div className="w-full bg-[#F5F5F7] min-h-screen animate-in fade-in duration-700 font-['Inter',_sans-serif]">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#151D48] tracking-tight leading-[1.2]">
            Guest Directory
          </h1>
          <p className="text-[#6B7280] text-[13px] mt-1">
            Monitoring <span className="font-bold text-[#5B5FEF]">{filteredGuests.length}</span> active guests in the system.
          </p>
        </div>
        <button className="flex items-center gap-3 bg-[#5B5FEF] text-white px-7 py-3.5 rounded-2xl font-semibold text-[14px] hover:bg-[#4a4ce0] transition-all shadow-lg shadow-indigo-100 active:scale-95">
          <FiUserPlus size={18} />
          <span>Add New Guest</span>
        </button>
      </header>

      {/* Toolbar: Search & Filter ala Dabang */}
      <div className="bg-white p-5 rounded-[28px] border border-[#F5F5F7] shadow-sm mb-8 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#5B5FEF]" size={18} />
          <input 
            type="text" 
            placeholder="Search by guest name or room details..." 
            className="w-full bg-[#F5F5F7] border-none pl-12 pr-6 py-3.5 rounded-2xl outline-none text-[13px] text-[#151D48] font-medium focus:ring-2 focus:ring-[#5B5FEF]/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto bg-[#F5F5F7] px-4 py-2 rounded-2xl">
          <FiFilter className="text-[#5B5FEF]" />
          <select 
            className="bg-transparent border-none text-[13px] font-bold text-[#6B7280] outline-none cursor-pointer pr-8"
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

      {/* Table Card */}
      <div className="bg-white rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#F5F5F7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FAFBFF]">
              <tr className="border-b border-[#F5F5F7]">
                <th className="px-8 py-5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Guest Information</th>
                <th className="px-8 py-5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Room Details</th>
                <th className="px-8 py-5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Stay Period</th>
                <th className="px-8 py-5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-right text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F7]">
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-[#F5F5F7]/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#BF83FF] font-bold text-xs uppercase">
                          {guest.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-[#151D48] group-hover:text-[#5B5FEF] transition-colors">{guest.name}</span>
                          <span className="text-[11px] text-[#6B7280] font-medium mt-0.5">{guest.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#151D48] font-semibold">{guest.room}</span>
                        <div className="flex gap-3 mt-1.5 text-[#6B7280]">
                          <FiMail size={14} className="hover:text-[#5B5FEF] cursor-pointer" />
                          <FiPhone size={14} className="hover:text-[#5B5FEF] cursor-pointer" />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-[#151D48]">{guest.checkIn} — {guest.checkOut}</span>
                        <span className="text-[11px] text-[#6B7280] mt-0.5">May 2026</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={guest.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2.5 bg-[#F5F5F7] text-[#6B7280] rounded-xl hover:bg-[#5B5FEF] hover:text-white transition-all">
                        <FiMoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-4">
                            <FiSearch size={24} className="text-[#6B7280]" />
                        </div>
                        <p className="text-[#6B7280] font-medium text-[15px]">No matching guests found.</p>
                        <button onClick={() => {setSearchQuery(""); setStatusFilter("All")}} className="mt-2 text-[#5B5FEF] font-bold text-sm">Clear Filters</button>
                    </div>
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

// Badge Component dengan warna Dabang
function StatusBadge({ status }) {
  const styles = {
    "In-House": "bg-[#DCFCE7] text-[#3CD856]",
    "Checking Out": "bg-[#FFF4DE] text-[#FF947A]",
    "Completed": "bg-[#F3E8FF] text-[#BF83FF]",
  };

  return (
    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-bold shadow-sm inline-block ${styles[status] || "bg-[#F5F5F7] text-[#6B7280]"}`}>
      {status}
    </span>
  );
}