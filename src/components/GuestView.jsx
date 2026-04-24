import React, { useState } from "react";
import data from "../data/serviceData.json";

export default function GuestView() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [hargaRange, setHargaRange] = useState("");

  const listKategori = [...new Set(data.map((item) => item.kategori))];

  const filtered = data.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori ? item.kategori === kategori : true;
    let matchHarga = true;
    if (hargaRange === "murah") matchHarga = item.harga <= 60000;
    if (hargaRange === "mahal") matchHarga = item.harga > 60000;
    return matchSearch && matchKategori && matchHarga;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20">
      {/* HEADER ELEGAN */}
      <header className="relative py-24 px-6 bg-slate-900 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Curated <span className="text-sky-400">Wellness</span>
          </h1>
          <p className="text-slate-400 text-lg font-light tracking-wide">Pilih layanan terbaik untuk vibe terbaikmu.</p>
        </div>
      </header>

      {/* FILTER BAR - Glassmorphism style */}
      <div className="max-w-5xl mx-auto px-6 -mt-10">
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-4 rounded-3xl shadow-2xl 
        shadow-slate-200/50 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input 
            placeholder="Cari layanan..." 
            className="w-full p-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-2
             focus:ring-sky-500 transition"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select onChange={(e) => setKategori(e.target.value)} className="w-full p-4 rounded-2xl bg-white 
           border-slate-100 outline-none focus:ring-2 focus:ring-sky-500">
            <option value="">Semua Kategori</option>
            {listKategori.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select onChange={(e) => setHargaRange(e.target.value)} className="w-full p-4 rounded-2xl bg-white border
           border-slate-100 outline-none focus:ring-2 focus:ring-sky-500">
            <option value="">Semua Harga</option>
            <option value="murah">Ekonomis (≤ 60rb)</option>
            <option value="mahal">Premium (&gt; 60rb)</option>
          </select>
        </div>
      </div>

      {/* GRID LAYOUT - Modern Minimalist */}
      <main className="max-w-5xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="group bg-white rounded-3xl p-3 shadow-lg shadow-slate-100 hover:shadow-2xl
             hover:shadow-sky-100 transition-all duration-500">
              <div className="relative h-64 overflow-hidden rounded-2xl">
                <img src={item.gambar} className="w-full h-full object-cover group-hover:scale-105 transition-transform 
                duration-700" alt={item.nama} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] 
                font-bold uppercase tracking-widest text-slate-900">
                  {item.kategori}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-slate-900 mb-1">{item.nama}</h2>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-black text-sky-600">Rp {item.harga.toLocaleString()}</span>
                  <button className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-sm font-bold
                   hover:bg-sky-600 transition">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-medium">Layanan tidak ditemukan, coba cari yang lain.</div>
        )}
      </main>
    </div>
  );
}