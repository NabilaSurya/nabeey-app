// components/SaleCard.jsx
export default function SaleCard({ icon, color, textCol, label, val, sub }) {
  return (
    <div className={`${color} p-5 rounded-3xl flex flex-col gap-3 transition-transform hover:scale-105 cursor-pointer`}>
      <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${textCol} text-xl shadow-sm`}>
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-black text-[#151D48]">{val}</h4>
        <p className="text-xs font-bold text-[#425166]">{label}</p>
        <p className={`text-[9px] font-medium ${textCol} mt-1`}>{sub}</p>
      </div>
    </div>
  );
}