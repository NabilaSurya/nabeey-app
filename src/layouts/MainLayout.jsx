import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MainLayout() {
  const navigate = useNavigate();
  const { loading, isGuest, isMember } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (isGuest) {
      navigate("/auth/login");
    } else if (isMember) {
      // Member tidak punya akses ke halaman admin — arahkan ke dashboard member
      navigate("/MemberLanding");
    }
  }, [navigate, loading, isGuest, isMember]);

  // Selagi auth masih loading, tampilkan spinner
  if (loading) return <LoadingSpinner />;

  // Jangan render konten admin jika bukan admin (redirect akan terjadi) 
  if (isGuest || isMember) return null;

  return (
    <div className="bg-[#FAFBFF] min-h-screen flex font-sans overflow-hidden">
      {/* Sidebar Dabang Style - Tidak perlu kirim props activeMenu lagi */}
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar Dabang Style */}
        <Navbar />

        {/* Konten Utama yang bisa di-scroll */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-8 md:p-10 flex-1">
            {/* Halaman Home, Rooms, Customers, dll muncul di sini */}
            <Outlet />
          </div>

          {/* Footer Dashboard */}
          <Footer />
        </main>
      </div>
    </div>
  );
}