import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    // Cek apakah ada token di localStorage
    const token = localStorage.getItem("token");
    
    // Jika tidak ada token, paksa pindah ke halaman login
    if (!token) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div className="bg-[#FDFCFB] min-h-screen flex font-serif overflow-hidden">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-8 md:p-12 flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}