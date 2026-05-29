// components/SearchBar.jsx
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ placeholder, value, onChange }) {
  return (
    <div className="relative flex-1 w-full group">
      <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors" size={16} />
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full bg-stone-50 border border-stone-200 pl-12 pr-6 py-3.5 rounded-xl outline-none text-sm text-stone-800 placeholder-stone-400 font-medium focus:bg-white focus:border-stone-400 transition-all duration-300"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}