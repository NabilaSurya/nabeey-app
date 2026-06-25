import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useRef
  const emailRef = useRef(null);

  // useEffect
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    alert(error.message);
    return;
  }

  localStorage.setItem(
    "token",
    data.session.access_token
  );
  localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);


  alert("Login Berhasil!");
  navigate("/admin");
};

  return (
    <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_20px_60px_rgba(91,95,239,0.1)] border border-[#F5F5F7] animate-in fade-in zoom-in duration-700 font-['Inter',_sans-serif] w-full max-w-[500px]">
      
      {/* Header Login */}
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-[#5B5FEF] rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-[#5B5FEF]/30 rotate-6 hover:rotate-0 transition-all duration-500 group">
          <span className="font-bold text-3xl group-hover:scale-110 transition-transform">
            L.
          </span>
        </div>

        <h1 className="text-[32px] font-bold text-[#151D48] tracking-tight leading-[1.2]">
          Sign In
        </h1>

        <p className="text-[#6B7280] text-[14px] mt-3 font-medium leading-[150%]">
          Access the LuxStay hotel management system.
        </p>
      </div>

      <form className="space-y-7" onSubmit={handleLogin}>
        
        {/* Input Email */}
        <div className="space-y-3">
          <label className="text-[12px] uppercase tracking-[1.5px] font-bold text-[#6B7280] ml-1">
            Email Address
          </label>

          <div className="relative group">
            <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#5B5FEF] transition-colors text-lg" />

            <input
              ref={emailRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full bg-[#F5F5F7] border-2 border-transparent py-4.5 pl-14 pr-6 rounded-[2rem] outline-none focus:border-[#5B5FEF] focus:bg-white transition-all text-[14px] font-medium text-[#151D48] shadow-sm placeholder:text-[#6B7280]/50"
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-[12px] uppercase tracking-[1.5px] font-bold text-[#6B7280]">
              Password
            </label>

            <Link
              to="#"
              className="text-[11px] font-bold text-[#5B5FEF] hover:underline"
            >
              Forgot?
            </Link>
          </div>

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

        {/* Button Login */}
        <button
          type="submit"
          className="w-full bg-[#5B5FEF] text-white py-5 rounded-[2rem] font-bold text-[15px] hover:bg-[#4a4ce0] transition-all shadow-xl shadow-[#5B5FEF]/20 mt-6 flex items-center justify-center gap-3 group active:scale-[0.97]"
        >
          <span>Login Now</span>
          <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
        </button>
      </form>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-[#F5F5F7] text-center">
        <p className="text-[13px] font-medium text-[#6B7280]">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-bold text-[#5B5FEF] hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}