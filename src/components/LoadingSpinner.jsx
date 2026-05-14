export default function LoadingSpinner() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#FDFCFB]">
      {/* Container Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Lingkaran Luar (Static) */}
        <div className="w-16 h-16 border-2 border-stone-100 rounded-full"></div>
        
        {/* Lingkaran Berputar (Animated) */}
        <div className="absolute w-16 h-16 border-t-2 border-amber-800 rounded-full animate-spin"></div>
        
        {/* Logo Inisial di Tengah */}
        <div className="absolute text-stone-900 font-serif italic text-xl font-bold">
          L
        </div>
      </div>

      {/* Teks Loading */}
      <div className="mt-8 text-center">
        <h2 className="text-stone-900 font-serif italic text-lg tracking-widest animate-pulse">
          LuxStay
        </h2>
        <p className="text-[10px] uppercase tracking-[4px] text-stone-400 mt-2">
          Preparing your experience
        </p>
      </div>
    </div>
  );
}