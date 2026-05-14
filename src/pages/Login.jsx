import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Ganti URL ini dengan API quiz kamu jika ada, ini contoh simulasi
      const response = await axios.post("https://reqres.in/api/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      setError("Email atau Password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tighter italic">Welcome Back</h1>
        <p className="text-stone-400 text-sm mt-2">Sign in to manage your luxury stay.</p>
      </div>

      {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input 
            type="email" 
            required
            className="peer w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-all bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Email Address
          </label>
        </div>
        
        <div className="relative">
          <input 
            type="password" 
            required
            className="peer w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-all bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
          />
          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Password
          </label>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg mt-4 text-[11px] uppercase tracking-[2px] disabled:bg-stone-400"
        >
          {loading ? "Processing..." : "Login to Account"}
        </button>
      </form>

      <p className="text-center mt-8 text-xs text-stone-500 uppercase tracking-widest">
        Don't have an account? <Link to="/auth/register" className="font-bold text-stone-900 underline">Register</Link>
      </p>
    </div>
  );
}