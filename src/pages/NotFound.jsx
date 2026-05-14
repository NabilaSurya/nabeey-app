import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#FDFCFB] text-center px-6">
      <p className="text-amber-800 uppercase tracking-[10px] font-bold text-xs mb-4">Error 404</p>
      <h1 className="text-7xl md:text-9xl font-bold italic text-stone-900 tracking-tighter mb-8">Lost in Paradise.</h1>
      <p className="text-stone-500 max-w-md mb-10 leading-relaxed italic">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan ke lokasi lain.
      </p>
      <Link 
        to="/" 
        className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-stone-700 transition shadow-xl"
      >
        Back to Home
      </Link>
    </div>
  );
}