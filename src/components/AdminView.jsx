import React, { useState } from "react";
import data from "../data/serviceData.json";

export default function AdminView() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [hargaRange, setHargaRange] = useState("");

  // Mendapatkan daftar kategori unik
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
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* HEADER & CONTROLS */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard Admin</h1>
        <p className="text-slate-500 text-sm mb-6">Kelola dan pantau seluruh data layanan</p>
        
        {/* FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <input
            placeholder="Cari nama layanan..."
            className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-400"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
            onChange={(e) => setKategori(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {listKategori.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select 
            className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
            onChange={(e) => setHargaRange(e.target.value)}
          >
            <option value="">Semua Harga</option>
            <option value="murah">Ekonomis (&le; 60rb)</option>
            <option value="mahal">Premium (&gt; 60rb)</option>
          </select>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Nama Layanan</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4 text-right">Harga</th>
                <th className="px-6 py-4">Kota</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors text-sm">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.nama}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="bg-slate-100 px-2 py-1 rounded-md text-[10px] font-bold text-slate-600">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-900 font-bold">
                      Rp {item.harga.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.lokasi.kota}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold
                       hover:bg-sky-600 transition">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">
                    Tidak ada layanan ditemukan dengan kriteria tersebut.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* FOOTER TABLE */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 font-medium">
          Total data: {filtered.length} layanan ditampilkan
        </div>
      </div>
    </div>
  );
}