// pages/Register.jsx
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 font-serif">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tighter italic">Create Account</h1>
        <p className="text-stone-400 text-sm mt-2">Join LuxStay for exclusive vacation experiences.</p>
      </div>

      <form className="space-y-6">
        {/* Input Name */}
        <div className="relative">
          <input 
            type="text" 
            placeholder=" " 
            className="peer w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-all placeholder-transparent bg-transparent" 
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Full Name
          </label>
        </div>

        {/* Input Email */}
        <div className="relative">
          <input 
            type="email" 
            placeholder=" " 
            className="peer w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-all placeholder-transparent bg-transparent" 
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Email Address
          </label>
        </div>
        
        {/* Input Password */}
        <div className="relative">
          <input 
            type="password" 
            placeholder=" " 
            className="peer w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-all placeholder-transparent bg-transparent" 
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Password
          </label>
        </div>

        <button className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg mt-4 text-[11px] uppercase tracking-[2px]">
          Create Account
        </button>
      </form>

      <p className="text-center mt-8 text-xs text-stone-500 uppercase tracking-wider">
        Already have an account? <Link to="/auth/login" className="font-bold text-stone-900 underline">Sign In</Link>
      </p>
    </div>
  );
}