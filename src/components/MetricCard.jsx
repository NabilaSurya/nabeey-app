// components/MetricCard.jsx
export default function MetricCard({ title, value, subtext, isDark }) {
  return (
    <div className={`rounded-2xl p-6 flex-1 border transition-all duration-500 hover:shadow-lg ${isDark ? "bg-stone-900 text-white border-stone-950" : "bg-white text-stone-800 border-stone-100 shadow-sm"}`}>
      <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-stone-400" : "text-stone-400"}`}>{title}</h3>
      <p className="text-4xl font-serif tracking-tight font-normal">{value}</p>
      <p className={`text-[10px] mt-4 tracking-wide ${isDark ? "text-stone-400" : "text-stone-400"}`}>{subtext}</p>
    </div>
  );
}