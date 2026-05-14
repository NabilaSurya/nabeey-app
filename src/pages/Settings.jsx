import { useState } from "react";
import { FiUser, FiBell, FiShield, FiGlobe, FiCamera, FiCheck } from "react-icons/fi";

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
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-stone-900 uppercase leading-none">
            System Configuration<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-400 text-sm font-serif italic mt-2">
            Fine-tune your administrative preferences and security.
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[2px] hover:bg-amber-900 transition-all flex items-center gap-2 shadow-xl shadow-stone-200"
        >
          {isSaved ? <><FiCheck /> Settings Saved</> : "Save Changes"}
        </button>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Navigation Tabs (Left Side) */}
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all ${
                activeTab === tab.name 
                ? "bg-white text-stone-900 shadow-sm border border-stone-100" 
                : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <span className={activeTab === tab.name ? "text-amber-600" : ""}>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Content (Right Side) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Section: Profile */}
          {activeTab === "Profile" && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-10 animate-in fade-in duration-500">
              
              {/* Profile Upload */}
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="w-24 h-24 bg-stone-100 rounded-3xl overflow-hidden border-4 border-white shadow-lg">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070" alt="Admin" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-stone-900 text-white p-2 rounded-xl border-4 border-white group-hover:bg-amber-600 transition-colors">
                    <FiCamera size={14} />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Administrator Photo</h3>
                  <p className="text-xs text-stone-400 mt-1">Allowed JPG, GIF or PNG. Max size of 800kB</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Display Name" value="LuxStay Admin" />
                <InputGroup label="Official Email" value="admin@luxstay.luxury" />
                <InputGroup label="Phone Number" value="+62 21 5550 998" />
                <InputGroup label="Hotel Branch" value="LuxStay - Bali Central" />
              </div>

              <div className="pt-6 border-t border-stone-50">
                <label className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-4 block">Bio / Signature</label>
                <textarea 
                  className="w-full bg-stone-50/50 p-5 rounded-2xl text-sm border-none outline-none focus:ring-2 focus:ring-stone-100 font-serif italic h-32"
                  defaultValue="Curating unforgettable experiences since 1994."
                />
              </div>
            </div>
          )}

          {/* Section: Notifications (Toggle Style) */}
          {activeTab === "Notifications" && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-6 animate-in fade-in duration-500">
              <ToggleRow title="Email Notifications" desc="Receive daily reports of hotel occupancy via email." active={true} />
              <ToggleRow title="New Booking Alerts" desc="Instant push notification for every new reservation." active={true} />
              <ToggleRow title="System Updates" desc="Get notified about new features and maintenance." active={false} />
            </div>
          )}

          {/* Section: Security */}
          {activeTab === "Security" && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-8 animate-in fade-in duration-500">
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-stone-900">Change Password</h3>
                <InputGroup label="Current Password" type="password" placeholder="••••••••" />
                <InputGroup label="New Password" type="password" />
              </div>
              <div className="pt-6 border-t border-stone-100">
                 <button className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline">
                   Log out from all other devices
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components untuk kerapian kode
function InputGroup({ label, value, type = "text", placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase font-black tracking-widest text-stone-400 ml-1">{label}</label>
      <input 
        type={type} 
        defaultValue={value} 
        placeholder={placeholder}
        className="w-full bg-stone-50/50 p-4 rounded-2xl text-sm border-none outline-none focus:ring-2 focus:ring-stone-100 font-medium transition-all" 
      />
    </div>
  );
}

function ToggleRow({ title, desc, active }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div className="flex justify-between items-center py-2">
      <div className="max-w-md">
        <h4 className="text-sm font-bold text-stone-900">{title}</h4>
        <p className="text-xs text-stone-400 mt-1">{desc}</p>
      </div>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-12 h-6 rounded-full transition-all relative ${isOn ? "bg-stone-900" : "bg-stone-200"}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isOn ? "left-7" : "left-1"}`} />
      </button>
    </div>
  );
}