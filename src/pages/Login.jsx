import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "123456"
    ) {
      alert("Login berhasil!");
      navigate("/");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tighter italic">
          Welcome Back
        </h1>

        <p className="text-stone-400 text-sm mt-2">
          Sign in to manage your bookings.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="relative">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-all placeholder-transparent bg-transparent"
          />

          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Email Address
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-all placeholder-transparent bg-transparent"
          />

          <label className="absolute left-0 -top-3.5 text-stone-400 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-900">
            Password
          </label>
        </div>

        <button className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg mt-4 text-xs uppercase tracking-widest">
          Login
        </button>
      </form>

      <p className="text-center mt-8 text-xs text-stone-500">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="font-bold text-stone-900 underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}