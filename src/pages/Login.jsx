import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi sederhana untuk Quiz
    if (email === "admin@gmail.com" && password === "123456") {
      // 1. SIMPAN TOKEN (Ini kunci agar tidak mental balik ke login)
      localStorage.setItem("token", "luxstay_secret_token_123");
      
      // 2. PINDAH KE DASHBOARD
      alert("Login Berhasil! Selamat Datang di LuxStay Admin.");
      navigate("/");
    } else {
      alert("Email atau password salah! Gunakan admin@gmail.com / 123456");
    }
  };

  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 animate-in fade-in zoom-in duration-500">
      <div className="mb-10 text-center">
        <div className="w-12 h-12 bg-stone-900 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white shadow-lg">
          <span className="font-black text-xl">L</span>
        </div>
        <h1 className="text-3xl font-bold text-stone-900 tracking-tighter italic">
          Welcome Back
        </h1>
        <p className="text-stone-400 text-sm mt-2 font-serif italic">
          Sign in to manage your luxury property.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleLogin}>
        <div className="relative">
          <input
            type="email"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full border-b border-stone-200 py-3 focus:border-stone-900 outline-none transition-all placeholder-transparent bg-transparent text-sm"
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-[2px] font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Email Address
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder=" "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full border-b border-stone-200 py-3 focus:border-stone-900 outline-none transition-all placeholder-transparent bg-transparent text-sm"
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-[2px] font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Password
          </label>
        </div>

        <button 
          type="submit"
          className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold hover:bg-amber-900 transition-all shadow-xl shadow-stone-100 mt-4 text-[10px] uppercase tracking-[3px] active:scale-95"
        >
          Sign In
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-stone-50 text-center">
        <p className="text-xs text-stone-400">
          New to management?{" "}
          <Link to="/auth/register" className="font-bold text-stone-900 underline underline-offset-4">
            Request Access
          </Link>
        </p>
      </div>
    </div>
  );
}