import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function FormCatering() {
  const [form, setForm] = useState({
    nama: "",
    jumlah: "",
    catatan: "",
    paket: "",
    metode: "",
  });

  const [error, setError] = useState({});
  const [valid, setValid] = useState(false);
  const [hasil, setHasil] = useState(null);

  const harga = {
    Hemat: 15000,
    Standar: 25000,
    Premium: 40000,
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValid(false);
    setHasil(null);
  };

  const handleValidasi = () => {
    let err = {};
    if (!form.nama) err.nama = "Nama wajib diisi";
    else if (!isNaN(form.nama)) err.nama = "Nama tidak boleh hanya angka";

    if (!form.jumlah || form.jumlah <= 0) err.jumlah = "Minimal 1 porsi";
    else if (isNaN(form.jumlah)) err.jumlah = "Harus angka";

    if (!form.catatan) err.catatan = "Berikan catatan pesanan";
    if (!form.paket) err.paket = "Pilih paket menu";
    if (!form.metode) err.metode = "Pilih metode bayar";

    setError(err);
    const isValid = Object.keys(err).length === 0;
    setValid(isValid);
  };

  const handleSubmit = () => {
    const total = form.jumlah * harga[form.paket];
    setHasil({
      total,
      paket: form.paket,
      jumlah: form.jumlah,
      metode: form.metode,
    });
  };

  return (
    /* BACKGROUND: Perpaduan Ungu, Biru, dan Pink yang estetik */
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br 
    from-indigo-100 via-purple-200 to-pink-100">
      
      {/* CARD UTAMA: Pakai efek Glassmorphism (agak transparan) agar warna background tembus sedikit */}
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-lg p-10 rounded-[3rem] 
      shadow-[0_30px_60px_-15px_rgba(107,33,168,0.2)] border border-white/50 relative overflow-hidden">
        
        {/* Dekorasi Aksen Cahaya di dalam kartu */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-300 
        rounded-full blur-[50px] opacity-40"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-300 
        rounded-full blur-[50px] opacity-40"></div>

        {/* HEADER */}
        <div className="text-center mb-10 relative">
          <h2 className="text-4xl text-purple-900 font-bold mb-2 drop-shadow-sm" 
          style={{ fontFamily: "Kunaroh" }}>
            🍱 Catering Nabey
          </h2>
          <p className="text-purple-500/70 text-[10px] font-black tracking-[0.2em] 
          uppercase">Pemesanan Online</p>
        </div>

        {/* FORM GRID */}
        <div className="space-y-5 relative">
          <InputField label="Nama Pemesan" name="nama" placeholder="Contoh: Jack Santoso" 
          value={form.nama} onChange={handleChange} error={error.nama}/>
          
          <div className="grid grid-cols-2 gap-5">
            <InputField label="Jumlah Porsi" name="jumlah" type="number" placeholder="0" 
            value={form.jumlah} onChange={handleChange} error={error.jumlah}/>
            <SelectField label="Pilih Paket" name="paket" value={form.paket} 
            onChange={handleChange} options={["Hemat", "Standar", "Premium"]} error={error.paket}/>
          </div>

          <SelectField label="Metode Bayar" name="metode" value={form.metode}
           onChange={handleChange} options={["Cash", "Transfer", "E-Wallet"]} error={error.metode}/>
          
          <InputField label="Catatan Khusus" name="catatan" placeholder="Contoh: Tanpa seledri, 
          pedas dikit" value={form.catatan} onChange={handleChange} error={error.catatan}/>
        </div>

        {/* ACTIONS */}
        <div className="mt-10 space-y-4">
          <button 
            onClick={handleValidasi} 
            className={`w-full p-4 rounded-2xl font-black transition-all transform 
              active:scale-95 shadow-[0_15px_30px_-5px_rgba(147,51,234,0.3)]
            ${valid ? "bg-purple-100 text-purple-400 cursor-not-allowed shadow-none" : 
              "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110"}`}
          >
            {valid ? "✓ TERVALIDASI" : "CEK PESANAN"}
          </button>

          {valid && (
            <button 
              onClick={handleSubmit} 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500
               text-white p-4 rounded-2xl font-black shadow-[0_15px_30px_-5px_rgba(16,185,129,0.3)] hover:brightness-110 hover:-translate-y-1 transition-all"
            >
              KONFIRMASI & BAYAR
            </button>
          )}
        </div>

        {/* OUTPUT: Struk dengan warna yang senada */}
        {hasil && (
          <div className="mt-8 bg-purple-50/50 rounded-[2rem] p-6 border-2 
          border-dashed border-purple-200 shadow-inner relative animate-in fade-in zoom-in duration-500">
            <div className="flex justify-between items-center mb-4 border-b
             border-purple-100 pb-3">
              <span className="text-[10px] font-bold text-purple-400 
              \tracking-widest uppercase">Ringkasan Tagihan</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-purple-900/70">
                <span>{hasil.paket} Menu x {hasil.jumlah}</span>
                <span className="font-bold text-purple-900 text-lg">Rp {hasil.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-purple-100">
                <span className="text-xs font-bold text-purple-400 uppercase">Total Bayar</span>
                <span className="text-3xl font-black text-purple-950 leading-none">Rp {hasil.total.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-center text-purple-400 mt-4 italic font-medium">Metode: {hasil.metode}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}