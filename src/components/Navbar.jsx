import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";

export default function Header() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* 1. SEARCH BAR */}
      <div className="relative w-96 group">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
        <input 
          type="text" 
          placeholder="Search bookings, guests, or rooms..." 
          className="w-full bg-stone-50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-stone-100 transition-all outline-none"
        />
      </div>

      {/* 2. ACTIONS & PROFILE */}
      <div className="flex items-center gap-6">
        
        {/* Notifikasi */}
        <button className="relative p-2.5 bg-stone-50 rounded-xl text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all">
          <FiBell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Separator */}
        <div className="h-8 w-[1px] bg-stone-100 mx-2"></div>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-3 group">
          <div className="text-right hidden md:block">
            <p className="text-[13px] font-bold text-stone-900 leading-none">Nabila Putri</p>
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1">Super Admin</p>
          </div>
          
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-stone-50 group-hover:border-amber-200 transition-all">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <FiChevronDown className="text-stone-400 group-hover:text-stone-900 transition-colors" />
        </button>
      </div>
    </header>
  );
}