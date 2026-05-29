// components/SectionHeading.jsx
export default function SectionHeading({ title, subtitle, children }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 w-full border-b border-stone-100 pb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-normal text-stone-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-stone-400 text-xs uppercase tracking-widest mt-2">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-4 w-full md:w-auto">{children}</div>}
    </div>
  );
}