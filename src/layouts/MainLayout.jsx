import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="bg-[#FDFCFB] min-h-screen font-serif">
      <Navbar />
      <div className="pt-20"> {/* Memberi ruang agar tidak tertutup Navbar absolute */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}