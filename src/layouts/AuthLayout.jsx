import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8F7F4] font-serif">
      <div className="hidden lg:block w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Interior"
        />
        <div className="absolute inset-0 bg-stone-900/20" />
        <div className="absolute bottom-12 left-12 text-white z-10">
          <h2 className="text-4xl font-bold italic">LuxStay.</h2>
          <p className="text-stone-200 mt-2 tracking-widest uppercase text-xs">Exclusivity in every stay.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}