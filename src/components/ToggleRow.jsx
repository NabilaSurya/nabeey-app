// components/ToggleRow.jsx
import { useState } from "react";

export default function ToggleRow({ title, desc, active }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div className="flex justify-between items-center py-5 border-b border-stone-100 last:border-0">
      <div className="max-w-md pr-4">
        <h4 className="text-sm font-semibold text-stone-800 tracking-tight">{title}</h4>
        <p className="text-xs text-stone-400 mt-1 leading-relaxed">{desc}</p>
      </div>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isOn ? "bg-stone-900" : "bg-stone-200"}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isOn ? "left-7" : "left-1"}`} />
      </button>
    </div>
  );
}