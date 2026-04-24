import { useState } from "react";
import GuestView from "./components/GuestView";
import AdminView from "./components/AdminView";

export default function MainPage() {
  const [role, setRole] = useState("guest");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR / SWITCHER */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-black text-slate-900 tracking-tight">
            Wellness<span className="text-sky-600">App</span>
          </div>

          <div className="bg-slate-100 p-1 rounded-2xl flex items-center shadow-inner">
            <button 
              onClick={() => setRole("guest")} 
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                role === "guest" 
                ? "bg-white text-slate-900 shadow-md" 
                : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Guest View
            </button>
            <button 
              onClick={() => setRole("admin")} 
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                role === "admin" 
                ? "bg-white text-slate-900 shadow-md" 
                : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Admin Panel
            </button>
          </div>
        </div>
      </nav>

      {/* TAMPILAN VIEW */}
      <main className="transition-opacity duration-500 ease-in-out">
        {role === "guest" ? <GuestView /> : <AdminView />}
      </main>
    </div>
  );
}