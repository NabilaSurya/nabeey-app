import React from "react";
import { FiInbox } from "react-icons/fi";

export default function EmptyState({ message, onClear }) {
  return (
    <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-stone-50 flex flex-col items-center justify-center text-center max-w-xl mx-auto my-10 animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 text-3xl mb-4">
        <FiInbox />
      </div>
      <h3 className="text-lg font-bold text-[#151D48]">Data Tidak Ditemukan</h3>
      <p className="text-sm text-[#737791] mt-1 max-w-xs">{message || "Maaf, data yang kamu cari tidak ada."}</p>
      
      {onClear && (
        <button 
          onClick={onClear} 
          className="mt-5 bg-[#0095FF] text-white px-6 py-2.5 rounded-xl font-semibold text-xs hover:bg-blue-600 transition-all shadow-sm"
        >
          Reset Filter
        </button>
      )}
    </div>
  );
}