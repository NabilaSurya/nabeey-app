// components/PrimaryButton.jsx
export default function PrimaryButton({ children, onClick, icon, className = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`group flex items-center justify-center gap-2.5 bg-[#5B5FEF] text-white px-5 py-3 rounded-2xl font-bold text-[14px] transition-all duration-200 active:scale-95 shadow-[0px_6px_20px_rgba(91,95,239,0.2)] hover:bg-[#4A4DE6] hover:shadow-[0px_6px_20px_rgba(74,77,230,0.3)] ${className}`}
    >
      {icon && (
        <span className="text-white/90 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="tracking-normal normal-case">
        {children}
      </span>
    </button>
  );
}