// components/SecondaryButton.jsx
export default function SecondaryButton({ children, onClick, icon }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-transparent text-stone-800 border border-stone-200 px-6 py-3.5 rounded-xl font-semibold text-xs tracking-widest uppercase hover:bg-stone-50 hover:border-stone-400 transition-all duration-300 active:scale-95"
    >
      {icon && <span className="text-stone-500">{icon}</span>}
      {children}
    </button>
  );
}