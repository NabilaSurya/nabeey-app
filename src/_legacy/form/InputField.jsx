export default function InputField({ label, name, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700 font-semibold">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`p-3 rounded-xl border 
        ${error ? "border-red-400" : "border-gray-300"}
        focus:ring-2 focus:ring-purple-400 outline-none transition`}
      />

      {error && (
        <div className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
}