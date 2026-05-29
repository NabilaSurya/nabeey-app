// components/InputGroup.jsx
export default function InputGroup({ label, value, type = "text", placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 ml-1">{label}</label>
      <input 
        type={type} 
        defaultValue={value} 
        placeholder={placeholder}
        className="w-full bg-white border border-stone-200 p-3.5 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-900 transition-all duration-300 placeholder-stone-300" 
      />
    </div>
  );
}