import { useState } from "react";
import { 
  FiUser, FiBell, FiShield, FiGlobe, 
  FiCamera, FiCheck, FiSave, FiLogOut 
} from "react-icons/fi";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { name: "Profile", icon: <FiUser /> },
    { name: "Notifications", icon: <FiBell /> },
    { name: "Security", icon: <FiShield /> },
    { name: "Language", icon: <FiGlobe /> },
  ];

  return (
    <div className="w-full bg-[#FAFBFF] min-h-screen animate-in fade-in duration-700 font-['Inter',_sans-serif]">
      
      {/* Header Section ala Dabang */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#151D48] tracking-tight leading-[1.2]">
            Settings
          </h1>
          <p className="text-[#6B7280] text-[13px] mt-1">
            Configure your administrative profile and system preferences.
          </p>
        </div>
        
        <button 
          onClick={handleSave}
          className="flex items-center gap-3 bg-[#5B5FEF] text-white px-7 py-3.5 rounded-2xl font-semibold text-[14px] hover:bg-[#4a4ce0] transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          {isSaved ? <FiCheck size={18} /> : <FiSave size={18} />}
          <span>{isSaved ? "Changes Saved" : "Save Changes"}</span>
        </button>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Navigation Tabs (Left Side) */}
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-4 px-6 py-4 rounded-[20px] font-bold text-[14px] transition-all ${
                activeTab === tab.name 
                ? "bg-[#5B5FEF] text-white shadow-lg shadow-indigo-100" 
                : "text-[#737791] hover:bg-indigo-50 hover:text-[#5B5FEF]"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Content (Right Side) */}
        <div className="lg:col-span-3">
          
          {/* Section: Profile */}
          {activeTab === "Profile" && (
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#F5F5F7] space-y-10 animate-in fade-in duration-500">
              
              {/* Profile Upload ala Dabang */}
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="w-24 h-24 bg-[#F5F5F7] rounded-[2rem] overflow-hidden border-4 border-white shadow-md transition-transform group-hover:scale-105">
                    <img 
                      src="https://i.pravatar.cc/150?u=admin" 
                      alt="Admin" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-[#5B5FEF] text-white p-2.5 rounded-xl border-4 border-white shadow-lg hover:bg-[#4a4ce0] transition-all">
                    <FiCamera size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#151D48]">Administrator Photo</h3>
                  <p className="text-[12px] text-[#6B7280] mt-1 font-medium">PNG or JPG. Max size of 800kB</p>
                </div>
              </div>

              {/* Form Grid ala AuthLayout Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Display Name" value="Musfiq Admin" />
                <InputGroup label="Official Email" value="admin@luxstay.luxury" />
                <InputGroup label="Phone Number" value="+62 21 5550 998" />
                <InputGroup label="Hotel Branch" value="LuxStay - Bali Central" />
              </div>

              {/* Textarea Section */}
              <div className="pt-6 border-t border-[#F5F5F7]">
                <label className="text-[11px] uppercase font-bold tracking-widest text-[#6B7280] mb-3 block ml-1">Bio / Management Motto</label>
                <textarea 
                  className="w-full bg-[#F5F5F7] p-5 rounded-[24px] text-[14px] text-[#151D48] border-2 border-transparent outline-none focus:border-[#5B5FEF] focus:bg-white transition-all font-medium min-h-[120px] leading-relaxed"
                  defaultValue="Curating luxury experiences with a touch of heritage since 1994."
                />
              </div>
            </div>
          )}

          {/* Section: Notifications (Toggle Style) */}
          {activeTab === "Notifications" && (
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-[#F5F5F7] space-y-4 animate-in fade-in duration-500">
              <h2 className="text-[20px] font-bold text-[#151D48] mb-6">Notification Settings</h2>
              <ToggleRow title="Email Notifications" desc="Receive daily reports of hotel occupancy via email." active={true} />
              <ToggleRow title="New Booking Alerts" desc="Instant push notification for every new reservation." active={true} />
              <ToggleRow title="System Updates" desc="Get notified about new features and maintenance." active={false} />
            </div>
          )}

          {/* Section: Security */}
          {activeTab === "Security" && (
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-[#F5F5F7] space-y-8 animate-in fade-in duration-500">
              <div className="space-y-6">
                <h3 className="text-[16px] font-bold text-[#151D48]">Update Password</h3>
                <div className="grid gap-6 max-w-md">
                  <InputGroup label="Current Password" type="password" placeholder="••••••••" />
                  <InputGroup label="New Password" type="password" />
                </div>
              </div>
              <div className="pt-8 border-t border-[#F5F5F7] flex items-center justify-between">
                 <p className="text-[12px] text-[#6B7280] font-medium">Last password change was 3 months ago.</p>
                 <button className="flex items-center gap-2 text-[#EF4444] text-[12px] font-bold uppercase tracking-widest hover:underline transition-all">
                   <FiLogOut /> Log out from all devices
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components dengan Styling Dabang
function InputGroup({ label, value, type = "text", placeholder }) {
  return (
    <div className="space-y-2 group">
      <label className="text-[11px] uppercase font-bold tracking-widest text-[#6B7280] ml-1">{label}</label>
      <input 
        type={type} 
        defaultValue={value} 
        placeholder={placeholder}
        className="w-full bg-[#F5F5F7] border-2 border-transparent p-4 rounded-[20px] text-[14px] text-[#151D48] outline-none focus:border-[#5B5FEF] focus:bg-white transition-all font-medium shadow-sm" 
      />
    </div>
  );
}

function ToggleRow({ title, desc, active }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div className="flex justify-between items-center py-4 border-b border-[#F5F5F7] last:border-0 transition-all">
      <div className="max-w-md">
        <h4 className="text-[15px] font-bold text-[#151D48]">{title}</h4>
        <p className="text-[12px] text-[#6B7280] mt-1 font-medium">{desc}</p>
      </div>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-14 h-7 rounded-full transition-all relative ${isOn ? "bg-[#5B5FEF]" : "bg-[#F5F5F7] shadow-inner"}`}
      >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${isOn ? "left-8" : "left-1"}`} />
      </button>
    </div>
  );
}