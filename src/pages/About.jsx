export default function About() {
  return (
    <div className="w-full bg-[#FDFCFB] min-h-screen">
      {/* Section 1: Hero About - Tipografi Besar & Image Floating */}
      <section className="pt-44 pb-24 px-6 md:px-16 max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase tracking-[6px] text-amber-800 text-[10px] font-bold mb-6">
            The Story Behind
          </p>
          <h1 className="text-6xl md:text-8xl font-bold italic tracking-tighter leading-[0.9] text-stone-900 mb-8">
            Est. 1994 <br /> LuxStay.
          </h1>
          <p className="text-stone-500 max-w-md text-lg leading-relaxed italic">
            "Kami percaya bahwa kemewahan bukan hanya tentang apa yang Anda lihat, tapi tentang bagaimana Anda dilayani."
          </p>
        </div>

        {/* Elemen Interaktif: Image dengan Overlay & Frame */}
        <div className="relative group">
          <div className="absolute -inset-4 border border-stone-200 rounded-[2rem] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
          <img 
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070" 
            alt="Hotel Interior" 
            className="rounded-[2rem] shadow-2xl w-full h-[500px] object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* Section 2: Values - Geser ke Kanan (Gunakan pl- atau ml-) */}
      <section className="py-32 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-3 gap-20">
            {/* Box 1: Digeser sedikit ke kanan */}
            <div className="md:pl-10"> 
              <h3 className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-6">01. Service</h3>
              <p className="text-stone-300 leading-relaxed">Layanan personal 24/7 yang siap memenuhi setiap kebutuhan detail perjalanan Anda.</p>
            </div>
            {/* Box 2: Digeser lebih ke kanan */}
            <div className="md:pl-10">
              <h3 className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-6">02. Design</h3>
              <p className="text-stone-300 leading-relaxed">Arsitektur modern yang dipadukan dengan sentuhan lokal untuk kenyamanan maksimal.</p>
            </div>
            {/* Box 3: Digeser paling kanan */}
            <div className="md:pl-10">
              <h3 className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-6">03. Location</h3>
              <p className="text-stone-300 leading-relaxed">Terletak di titik strategis dengan pemandangan alam yang memanjakan mata.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Text - Geser Menggunakan pl-24 */}
      <section className="py-40 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="md:pl-32 border-l border-stone-200"> {/* Garis kiri & geser kanan */}
          <h2 className="text-4xl md:text-5xl font-medium italic text-stone-800 leading-tight max-w-4xl">
            "LuxStay provides elegant and unforgettable hotel experiences with modern luxury facilities, ensuring every guest feels like royalty from the moment they arrive."
          </h2>
          <div className="mt-12 flex items-center gap-6 group cursor-pointer">
            <div className="w-16 h-[1px] bg-stone-900 group-hover:w-24 transition-all duration-500"></div>
            <span className="text-xs font-bold uppercase tracking-widest">Our Vision</span>
          </div>
        </div>
      </section>

      {/* Footer Hitam Sesuai Screenshot Sebelumnya */}
      <div className="w-full h-1 bg-stone-100"></div>
    </div>
  );
}