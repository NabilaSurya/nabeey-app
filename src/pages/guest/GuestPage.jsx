import GuestNavbar from "../../components/guest/GuestNavbar";
import DashboardSection from "./DashboardSection";
import RoomsSection from "./RoomsSection";
import CustomersSection from "./CustomersSection";
import AboutSection from "./AboutSection";
import MemberSection from "./MemberSection";
import SettingsSection from "./SettingsSection";

export default function GuestPage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-800 antialiased selection:bg-[#5B5FEF]/20 selection:text-[#5B5FEF] scroll-smooth">
      {/* Navbar di paling atas */}
      <GuestNavbar />
      
      {/* 1. Main Hero (Market) */}
      <DashboardSection />
      
      {/* 2. Daftar Kamar (Properties) */}
      <RoomsSection />
      
      {/* 3. Rekomendasi Lokasi Premium (Destinations) */}
      <CustomersSection />
      
      {/* 4. Riwayat Komplain Publik (Pusat Layanan) */}
      <AboutSection />
      
      {/* 5. Ajakan Komunitas */}
      <MemberSection />
      
      {/* 6. Settings Panel */}
      <SettingsSection />
    </div>
  );
}