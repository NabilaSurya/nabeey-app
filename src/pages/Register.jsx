import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";

import { supabase } from "../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  // useState
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useRef untuk Auto Focus pada input pertama (Full Name)
  const nameRef = useRef(null);

  // useEffect
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // REGISTER USER KE AUTH SUPABASE
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("SIGNUP DATA:", data);

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.user) {
        alert("User gagal dibuat");
        return;
      }

      // INSERT KE TABEL PROFILES
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id,
            full_name: fullName,
            email: email,
            role: "user",
          },
        ])
        .select();

      console.log("PROFILE DATA:", profileData);
      console.log("PROFILE ERROR:", profileError);

      if (profileError) {
        alert(profileError.message);
        return;
      }

      alert("Registrasi berhasil!");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_20px_60px_rgba(91,95,239,0.1)] border border-[#F5F5F7] animate-in fade-in zoom-in duration-700 font-['Inter',_sans-serif] w-full max-w-[500px]">
      
      {/* Header Register */}
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-[#5B5FEF] rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-[#5B5FEF]/30 -rotate-6 hover:rotate-0 transition-all duration-500 group">
          <span className="font-bold text-3xl group-hover:scale-110 transition-transform">
            R.
          </span>
        </div>

        <h1 className="text-[32px] font-bold text-[#151D48] tracking-tight leading-[1.2]">
          Create Account
        </h1>

        <p className="text-[#6B7280] text-[14px] mt-3 font-medium leading-[150%]">
          Join the LuxStay hotel management ecosystem.
        </p>
      </div>

      <form className="space-y-7" onSubmit={handleRegister}>
        
        {/* Input Full Name */}
        <div className="space-y-3">
          <label className="text-[12px] uppercase tracking-[1.5px] font-bold text-[#6B7280] ml-1">
            Full Name
          </label>
          <div className="relative group">
            <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#5B5FEF] transition-colors text-lg" />
            <input
              ref={nameRef}
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-[#F5F5F7] border-2 border-transparent py-4.5 pl-14 pr-6 rounded-[2rem] outline-none focus:border-[#5B5FEF] focus:bg-white transition-all text-[14px] font-medium text-[#151D48] shadow-sm placeholder:text-[#6B7280]/50"
            />
          </div>
        </div>

        {/* Input Email */}
        <div className="space-y-3">
          <label className="text-[12px] uppercase tracking-[1.5px] font-bold text-[#6B7280] ml-1">
            Email Address
          </label>
          <div className="relative group">
            <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#5B5FEF] transition-colors text-lg" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-[#F5F5F7] border-2 border-transparent py-4.5 pl-14 pr-6 rounded-[2rem] outline-none focus:border-[#5B5FEF] focus:bg-white transition-all text-[14px] font-medium text-[#151D48] shadow-sm placeholder:text-[#6B7280]/50"
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="space-y-3">
          <label className="text-[12px] uppercase tracking-[1.5px] font-bold text-[#6B7280] ml-1">
            Password
          </label>
          <div className="relative group">
            <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#5B5FEF] transition-colors text-lg" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F5F5F7] border-2 border-transparent py-4.5 pl-14 pr-6 rounded-[2rem] outline-none focus:border-[#5B5FEF] focus:bg-white transition-all text-[14px] font-medium text-[#151D48] shadow-sm placeholder:text-[#6B7280]/50"
            />
          </div>
        </div>

        {/* Button Register */}
        <button
          type="submit"
          className="w-full bg-[#5B5FEF] text-white py-5 rounded-[2rem] font-bold text-[15px] hover:bg-[#4a4ce0] transition-all shadow-xl shadow-[#5B5FEF]/20 mt-6 flex items-center justify-center gap-3 group active:scale-[0.97]"
        >
          <span>Register Now</span>
          <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
        </button>
      </form>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-[#F5F5F7] text-center">
        <p className="text-[13px] font-medium text-[#6B7280]">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-bold text-[#5B5FEF] hover:underline ml-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}