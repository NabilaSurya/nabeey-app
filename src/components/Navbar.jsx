import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-md border border-stone-200/40 px-6 py-2 rounded-full shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-stone-900 rounded-full flex items-center justify-center text-white text-[10px]">L</div>
          <h1 className="text-lg font-bold tracking-tighter">LuxStay<span className="text-amber-600">.</span></h1>
        </Link>
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[2px] font-bold text-stone-500">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/rooms" className="hover:text-black transition">Rooms</Link>
          <Link to="/about" className="hover:text-black transition">About</Link>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/auth/login" className="text-xs font-bold text-stone-600 hover:text-black">Sign In</Link>
          <Link to="/rooms" className="bg-stone-900 text-white px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-stone-800 transition">Book Now</Link>
        </div>
      </div>
    </nav>
  );
}