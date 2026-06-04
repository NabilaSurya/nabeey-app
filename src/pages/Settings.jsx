import { useState, useEffect } from "react";
import { FiUser, FiBell, FiShield, FiGlobe, FiCamera, FiCheck, FiSave, FiLogOut, FiLock, FiGlobe as FiLanguageIcon } from "react-icons/fi";

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
    { name: "Profile", icon: <FiUser />, desc: "Admin identity & contact" },
    { name: "Notifications", icon: <FiBell />, desc: "Alerts & reporting logs" },
    { name: "Security", icon: <FiShield />, desc: "Password & global access" },
    { name: "Language", icon: <FiGlobe />, desc: "Regional localization" },
  ];

  return (
    <div className="w-full bg-[#FAFBFF] min-h-screen font-['Inter',_sans-serif] antialiased text-[#151D48] p-6 md:p-8 animate-in fade-in duration-500">
      
      {/* ==================== ROW 1: HEADER SECTION ==================== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#151D48]">System Settings</h1>
          <p className="text-xs text-[#737791]">Configure core system protocols and administrative preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs border transition-all duration-300 ${
            isSaved 
              ? "bg-[#DCFCE7] text-[#3CD856] border-[#3CD856]/20" 
              : "bg-[#5B5FEF] hover:bg-[#4a4de0] text-white border-transparent"
          }`}
        >
          {isSaved ? <FiCheck className="animate-bounce" /> : <FiSave />}
          {isSaved ? "Changes Applied Successfully" : "Apply Global Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* ==================== ROW 2: SIDE TAB NAVIGATION ==================== */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left border transition-all duration-200 group ${
                activeTab === tab.name 
                  ? "bg-white text-[#5B5FEF] border-[#EDF2F7] shadow-[0px_8px_24px_rgba(69,78,124,0.03)] font-bold" 
                  : "text-[#737791] bg-transparent border-transparent hover:bg-white/60 hover:text-[#151D48]"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-200 ${
                activeTab === tab.name 
                  ? "bg-[#F3E8FF] text-[#5B5FEF]" 
                  : "bg-white text-[#737791] group-hover:bg-[#F4F5F9] border border-[#EDF2F7]"
              }`}>
                {tab.icon}
              </div>
              <div>
                <p className="text-sm tracking-tight text-inherit">{tab.name}</p>
                <p className="text-[10px] font-normal text-[#737791] mt-0.5 hidden lg:block">{tab.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ==================== ROW 3: MAIN CONTENT BOX PANEL ==================== */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: PROFILE MANAGEMENT */}
          {activeTab === "Profile" && (
            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-8 animate-in fade-in duration-300">
              
              {/* Premium Admin Identity Card */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-[#FAFBFF] border border-[#F4F5F9] rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[#5B5FEF] pointer-events-none">
                  <FiUser size={120} />
                </div>
                
                <div className="relative group cursor-pointer">
                  <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-[#EDF2F7] p-1 shadow-xs transition-transform duration-300 group-hover:scale-[1.03]">
                    <img src="https://i.pravatar.cc/150?u=luxuryadmin" alt="Admin Avatar" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-[#5B5FEF] text-white p-2 rounded-lg border-2 border-white shadow-xs hover:bg-[#4a4de0] transition-all">
                    <FiCamera size={11} />
                  </button>
                </div>
                
                <div className="text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <h3 className="text-base font-bold text-[#151D48]">System Administrator</h3>
                    <span className="bg-[#E8F9EE] text-[#3CD856] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Master Root</span>
                  </div>
                  <p className="text-xs text-[#737791] mt-1">Supervise global logistics, branch distribution, and secure checkouts.</p>
                  <p className="text-[10px] text-[#A3AED0] mt-2 font-medium">JPEG or PNG. Max legal limit 800 KB</p>
                </div>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                <InputGroup label="Full Representative Name" value="Musfiq Admin" className="focus:border-[#5B5FEF]" />
                <InputGroup label="Official Secure Email" value="admin@luxstay.luxury" />
                <InputGroup label="Phone Verification" value="+62 21 5550 998" />
                <InputGroup label="Assigned Hotel Branch" value="LuxStay - Bali Central" />
              </div>

              {/* Statement Motto Textarea */}
              <div className="pt-5 border-t border-[#F4F5F9]">
                <label className="text-[11px] uppercase font-bold tracking-wider text-[#737791] mb-2 block">Management Motto / System Statement</label>
                <textarea 
                  className="w-full bg-[#FAFBFF] border border-[#EDF2F7] p-3.5 rounded-xl text-xs text-[#425166] outline-hidden focus:border-[#5B5FEF] focus:bg-white transition-all duration-200 min-h-[90px] leading-relaxed"
                  defaultValue="Curating luxury experiences with a touch of heritage since 1994."
                />
              </div>
            </div>
          )}

          {/* TAB 2: NOTIFICATIONS */}
          {activeTab === "Notifications" && (
            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-4 animate-in fade-in duration-300">
              <div className="mb-4">
                <h2 className="text-base font-bold text-[#151D48]">Alert Configurations</h2>
                <p className="text-xs text-[#737791]">Manage automated broadcast triggers and dashboard hooks.</p>
              </div>
              <div className="divide-y divide-[#F4F5F9] text-sm">
                <div className="pb-4"><ToggleRow title="Automated Occupancy Logs" desc="Send a daily system audit graph summarizing check-in distributions directly to inbox." active={true} /></div>
                <div className="py-4"><ToggleRow title="Live Booking Push Notifications" desc="Trigger instant chime sound and toaster pop-up immediately upon room checkout completion." active={true} /></div>
                <div className="pt-4"><ToggleRow title="System Maintenance Broadcasts" desc="Receive urgent notifications regarding deployment updates and core server maintenance schedules." active={false} /></div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === "Security" && (
            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-base font-bold text-[#151D48]">Account Credentials</h2>
                <p className="text-xs text-[#737791]">Configure master server keys and secure hash protections.</p>
              </div>
              
              <div className="grid gap-5 max-w-md">
                <InputGroup label="Current Master Password" type="password" placeholder="••••••••" />
                <InputGroup label="Set Brand New Secure Password" type="password" placeholder="••••••••" />
              </div>
              
              <div className="pt-6 border-t border-[#F4F5F9] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-xs">
                <p className="text-[#A3AED0] flex items-center gap-1.5"><FiLock /> Dynamic security token updated 3 months ago.</p>
                <button className="flex items-center gap-2 text-[#FA5A7D] font-bold uppercase tracking-wider hover:text-red-600 transition-colors">
                  <FiLogOut /> Kill other active sessions
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: LANGUAGE (BARU: DIMUNCULKAN SECARA ESTETIK) */}
          {activeTab === "Language" && (
            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] border border-[#EDF2F7] space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-base font-bold text-[#151D48]">Localization & Region</h2>
                <p className="text-xs text-[#737791]">Set the primary system language display and localized pricing format.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl text-xs">
                <div>
                  <label className="text-[11px] uppercase font-bold tracking-wider text-[#737791] mb-2 block">System Language</label>
                  <select className="w-full bg-[#FAFBFF] border border-[#EDF2F7] p-3 rounded-xl text-[#151D48] outline-hidden focus:border-[#5B5FEF] font-medium">
                    <option value="en">English (US) - Standard Master</option>
                    <option value="id">Bahasa Indonesia (ID) - Localized</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase font-bold tracking-wider text-[#737791] mb-2 block">Default Currency Display</label>
                  <select className="w-full bg-[#FAFBFF] border border-[#EDF2F7] p-3 rounded-xl text-[#151D48] outline-hidden focus:border-[#5B5FEF] font-medium">
                    <option value="usd">USD ($) - Global Benchmark</option>
                    <option value="idr">IDR (Rp) - Rupiah Localization</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}