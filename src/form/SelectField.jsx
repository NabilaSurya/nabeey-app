export default function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700 font-semibold">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`p-3 rounded-xl border 
        ${error ? "border-red-400" : "border-gray-300"}
        focus:ring-2 focus:ring-purple-400`}
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i}>{opt}</option>
        ))}
      </select>

      {error && (
        <div className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
}