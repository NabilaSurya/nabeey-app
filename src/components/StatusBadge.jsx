// components/StatusBadge.jsx
export default function StatusBadge({ status }) {
  const styles = {
    "In-House": "bg-[#DCFCE7] text-[#3CD856]",
    "Available": "bg-[#DCFCE7] text-[#3CD856]",
    "Checking Out": "bg-[#FFF4DE] text-[#FF947A]",
    "Maintenance": "bg-[#FFF4DE] text-[#FF947A]",
    "Completed": "bg-[#F3E8FF] text-[#BF83FF]",
  };

  return (
    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-bold shadow-sm inline-block ${styles[status] || "bg-[#F5F5F7] text-[#6B7280]"}`}>
      {status}
    </span>
  );
}