import { useState, useEffect } from "react";
import { FiUserPlus, FiMail, FiPhone, FiMoreVertical } from "react-icons/fi";

// Import Komponen Global (Semua Terpasang Nyata & Sinkron Tema)
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import FilterSelect from "../components/FilterSelect";
import StatusBadge from "../components/StatusBadge";

const customerData = [
  { id: "C-001", name: "Alexander Graham", email: "alex@example.com", phone: "+62 812-3456", room: "Oceanic Deluxe", checkIn: "12 May", checkOut: "15 May", status: "In-House" },
  { id: "C-002", name: "Sarah Connor", email: "sarah@sky.net", phone: "+62 855-9988", room: "Royal Penthouse", checkIn: "14 May", checkOut: "20 May", status: "In-House" },
  { id: "C-003", name: "Bruce Wayne", email: "bruce@bat.com", phone: "+62 811-0000", room: "Garden Villa", checkIn: "10 May", checkOut: "14 May", status: "Checking Out" },
  { id: "C-004", name: "Diana Prince", email: "diana@themyscira.io", phone: "+62 812-1122", room: "Sky Loft Penthouse", checkIn: "13 May", checkOut: "16 May", status: "In-House" },
  { id: "C-010", name: "Arthur Curry", email: "aquaman@atlantis.com", phone: "+62 812-0001", room: "Oceanic Deluxe", checkIn: "10 May", checkOut: "20 May", status: "Completed" },
];

export default function Customers() {
  const [filteredGuests, setFilteredGuests] = useState(customerData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const result = customerData.filter((guest) => {
      const matchSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          guest.room.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || guest.status === statusFilter;
      return matchSearch && matchStatus;
    });
    setFilteredGuests(result);
  }, [searchQuery, statusFilter]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#F8F9FC] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-7 p-6 md:p-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionHeading title="Guest Directory" subtitle={`Monitoring ${filteredGuests.length} active guests in the system.`} />
          <PrimaryButton icon={<FiUserPlus size={18} />} onClick={() => alert("Add Guest")}>
            Add New Guest
          </PrimaryButton>
        </div>

        {/* Toolbar Filter */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_8px_24px_rgba(69,78,124,0.04)] flex flex-col lg:flex-row gap-4 items-center border border-[#EDF2F7]">
          <div className="flex-1 w-full">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by guest name or room details..." />
          </div>
          <div className="w-full lg:w-auto">
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={["All", "In-House", "Checking Out", "Completed"]} />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[1.5rem] shadow-[0px_8px_32px_rgba(69,78,124,0.03)] overflow-hidden border border-[#EDF2F7]">
          {filteredGuests.length === 0 ? (
            <EmptyState message="No matching guests found." onClear={() => { setSearchQuery(""); setStatusFilter("All"); }} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-white border-b border-[#F4F5F9]">
                    <th className="px-8 py-5 text-[13px] font-semibold text-[#737791] tracking-normal">Guest Information</th>
                    <th className="px-8 py-5 text-[13px] font-semibold text-[#737791] tracking-normal">Room Details</th>
                    <th className="px-8 py-5 text-[13px] font-semibold text-[#737791] tracking-normal">Current Status</th>
                    <th className="px-8 py-5 text-right text-[13px] font-semibold text-[#737791] tracking-normal">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F5F9]">
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-[#F8F9FC]/80 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[#F3E8FF] text-[#5B5FEF] font-bold text-sm flex items-center justify-center shadow-inner uppercase">
                            {guest.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-bold text-[#151D48] group-hover:text-[#5B5FEF] transition-colors duration-150">
                              {guest.name}
                            </span>
                            <span className="text-[12px] text-[#737791] font-medium mt-0.5">{guest.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col justify-center">
                          <span className="text-[14px] text-[#151D48] font-semibold">{guest.room}</span>
                          <div className="flex gap-4 mt-2 text-[#737791]">
                            <FiMail size={15} className="hover:text-[#5B5FEF] cursor-pointer transition-colors" title={guest.email} />
                            <FiPhone size={15} className="hover:text-[#5B5FEF] cursor-pointer transition-colors" title={guest.phone} />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={guest.status} />
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2.5 bg-white text-[#737791] rounded-xl hover:bg-[#5B5FEF] hover:text-white border border-[#E2E8F0] hover:border-transparent transition-all duration-150 shadow-sm inline-flex items-center justify-center">
                          <FiMoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}