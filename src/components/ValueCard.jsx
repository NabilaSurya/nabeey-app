import React from "react";

// Pastikan ada kata 'export default' di depan function
export default function ValueCard({ icon, title, description, color, textCol }) {
  return (
    <div className={`${color || "bg-white"} p-6 rounded-[2rem] shadow-sm flex flex-col gap-3 border border-stone-50 transition-all hover:scale-105`}>
      {icon && (
        <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center ${textCol || "text-[#5B5FEF]"} text-2xl shadow-sm`}>
          {icon}
        </div>
      )}
      <div>
        <h4 className="text-lg font-bold text-[#151D48]">{title || "Card Title"}</h4>
        <p className="text-xs text-[#737791] mt-1 leading-relaxed">{description || "Card description goes here."}</p>
      </div>
    </div>
  );
}