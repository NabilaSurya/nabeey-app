import { useState } from "react";
import { FiUser, FiBell, FiShield, FiGlobe, FiCamera, FiCheck, FiSave, FiLogOut } from "react-icons/fi";

// Memanggil Komponen Global LuxStay
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import InputGroup from "../components/InputGroup";
import ToggleRow from "../components/ToggleRow";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const tabs = [
    { name: "Profile", icon: <FiUser /> },
    { name: "Notifications", icon: <FiBell /> },
    { name: "Security", icon: <FiShield /> },
    { name: "Language", icon: <FiGlobe /> },
  ];

  return (
    <div className="w-full bg-[#FDFCFB] min-h-screen animate-in fade-in duration-700">
      
      {/* Header Atas */}
      <SectionHeading title="System Settings" subtitle="Configure system protocols and administrative preferences.">
        <PrimaryButton onClick={handleSave} icon={isSaved ? <FiCheck size={14} /> : <FiSave size={14} />}>
          {isSaved ? "Saved Successfully" : "Apply Changes"}
        </PrimaryButton>
      </SectionHeading>

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Tab Navigasi Samping */}
        <div className="flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === tab.name 
                ? "bg-stone-900 text-white shadow-sm" 
                : "text-stone-400 hover:bg-stone-50 hover:text-stone-800"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Konten Utama Box Panel */}
        <div className="lg:col-span-3">
          
          {/* TAB PANEL 1: PROFILE MANAGEMENT */}
          {activeTab === "Profile" && (
            <div className="bg-white p-8 rounded-2xl border border-stone-100 space-y-10 animate-in fade-in duration-300">
              
              {/* Foto Profil */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-20 h-20 bg-stone-50 rounded-xl overflow-hidden border border-stone-200 transition-transform duration-300 group-hover:scale-102">
                    <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-stone-900 text-white p-2 rounded-lg border-2 border-white hover:bg-stone-800 transition-all">
                    <FiCamera size={12} />
                  </button>
                </div>
                <div>
                  <h3 className="text-base font-serif text-stone-800">System Administrator</h3>
                  <p className="text-xs text-stone-400 mt-1 font-light">Max safe size upload of 800kB (PNG/JPG)</p>
                </div>
              </div>

              {/* Form Input Terintegrasi dengan Komponen InputGroup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Representative Name" value="Musfiq Admin" />
                <InputGroup label="Official Secure Email" value="admin@luxstay.luxury" />
                <InputGroup label="Phone Verification" value="+62 21 5550 998" />
                <InputGroup label="Assigned Hotel Branch" value="LuxStay - Bali Central" />
              </div>

              {/* Input Catatan (Bio) */}
              <div className="pt-6 border-t border-stone-100">
                <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-3 block ml-1">Management Motto / Statement</label>
                <textarea 
                  className="w-full bg-white border border-stone-200 p-4 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-900 transition-all duration-300 min-h-[100px] leading-relaxed"
                  defaultValue="Curating luxury experiences with a touch of heritage since 1994."
                />
              </div>
            </div>
          )}

          {/* TAB PANEL 2: NOTIFICATIONS TOGGLE PANEL */}
          {activeTab === "Notifications" && (
            <div className="bg-white p-8 rounded-2xl border border-stone-100 space-y-2 animate-in fade-in duration-300">
              <h2 className="text-lg font-serif text-stone-800 mb-6">Alert Configurations</h2>
              <ToggleRow title="Automated Occupancy Logs" desc="Kirim email rekap harian tingkat hunian hotel secara terjadwal." active={true} />
              <ToggleRow title="Live Booking Push Notifications" desc="Nyalakan bunyi alert instan setiap kali ada reservasi baru masuk." active={true} />
              <ToggleRow title="System Maintenance Broadcasts" desc="Dapatkan info pembaruan fitur dashboard dan jadwal downtime." active={false} />
            </div>
          )}

          {/* TAB PANEL 3: SECURITY */}
          {activeTab === "Security" && (
            <div className="bg-white p-8 rounded-2xl border border-stone-100 space-y-8 animate-in fade-in duration-300">
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-wider text-stone-400 font-bold">Update Master Account Credentials</h3>
                <div className="grid gap-6 max-w-sm">
                  <InputGroup label="Current Account Password" type="password" placeholder="••••••••" />
                  <InputGroup label="Set Brand New Password" type="password" />
                </div>
              </div>
              <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                 <p className="text-xs text-stone-400">Security Note: Password was modified 3 months ago.</p>
                 <button className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-widest hover:underline transition-all">
                   <FiLogOut /> Terminate other active sessions
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}