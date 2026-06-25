import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { 
  FiUserPlus, 
  FiMail, 
  FiMoreVertical, 
  FiAward, 
  FiTrendingUp, 
  FiTrash2 
} from "react-icons/fi";

// Import Komponen Global (Pastikan path ini sesuai di proyek Anda)
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

export default function User() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter logika untuk Pencarian dan Filter Role
  useEffect(() => {
    const result = users.filter((user) => {
      const matchSearch = 
        (user.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
        (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (user.id?.toLowerCase() || "").includes(searchQuery.toLowerCase());
      
      const matchRole = roleFilter === "All" || user.role === roleFilter;
      
      return matchSearch && matchRole;
    });
    setFilteredUsers(result);
  }, [searchQuery, roleFilter, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus user ini?");
    if (!konfirmasi) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      alert("User berhasil dihapus");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-slate-900 text-slate-100 border border-slate-700 shadow-xs";
      case "manager":
        return "bg-indigo-50 text-[#5B5FEF] border border-indigo-100";
      case "editor":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      default:
        return "bg-stone-100 text-stone-600 border border-stone-200";
    }
  };

  // Statistik Dinamis berdasarkan data Supabase
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role?.toLowerCase() === "admin").length;
  const nonAdminCount = totalUsers - adminCount;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFBFF] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-5 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto p-4">
        
        {/* ==================== ROW 1: INSIGHT CARDS ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-indigo-50 text-[#5B5FEF] rounded-xl flex items-center justify-center">
              <FiUserPlus size={22} />
            </div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Total Pengguna</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">
                {totalUsers} Pengguna Aktif
              </h4>
            </div>
          </div>
          
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
              <FiAward size={22} />
            </div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Administrator</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">
                {adminCount} Akun Admin
              </h4>
            </div>
          </div>

          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
              <FiTrendingUp size={22} />
            </div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Staff / Member</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">
                {nonAdminCount} Pengguna Biasa
              </h4>
            </div>
          </div>
        </div>

        {/* ==================== ROW 2: TOOLBAR FILTERS ==================== */}
        <div className="bg-white p-4 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] flex flex-col lg:flex-row gap-4 items-center border border-[#EDF2F7]">
          <div className="flex-1 w-full">
            <SearchBar 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Cari berdasarkan nama, email, atau ID user..." 
            />
          </div>
          <div className="flex flex-wrap w-full lg:w-auto items-center gap-3">
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#FAFBFF] border border-[#EDF2F7] text-xs font-semibold py-2.5 px-4 rounded-xl text-[#151D48] outline-none cursor-pointer"
            >
              <option value="All">Semua Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Editor">Editor</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        {/* ==================== ROW 3: DATA TABLE WORKSPACE ==================== */}
        <div className="bg-white rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] overflow-hidden border border-[#EDF2F7]">
          {filteredUsers.length === 0 ? (
            <EmptyState 
              message="Tidak ada data pengguna yang cocok dengan parameter filter." 
              onClear={() => { setSearchQuery(""); setRoleFilter("All"); }} 
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-white border-b border-[#F4F5F9]">
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">User Identity</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Email Address</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">System Role</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Status</th>
                    <th className="px-7 py-4.5 text-right text-[12px] font-bold text-[#737791] tracking-wider uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F5F9] text-sm">
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id || index} className="hover:bg-[#FAFBFF] transition-colors group">
                      
                      {/* User Identity Column */}
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-xl font-bold text-sm flex items-center justify-center uppercase shadow-xs bg-indigo-50 text-[#5B5FEF]">
                            {user.full_name ? user.full_name.charAt(0) : "U"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#151D48] group-hover:text-[#5B5FEF] transition-colors duration-150">
                              {user.full_name || "No Name"}
                            </span>
                            <span className="text-[11px] text-[#737791] font-mono mt-0.5">
                              ID: {user.id ? user.id.substring(0, 8) : index + 1}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email Column */}
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-2 text-xs text-[#151D48]">
                          <FiMail className="text-[#737791]" size={14} />
                          <span>{user.email}</span>
                        </div>
                      </td>

                      {/* Role Column */}
                      <td className="px-7 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase ${getRoleBadgeStyle(user.role)}`}>
                          {user.role || "User"}
                        </span>
                      </td>

                      {/* Status Column */}
                      <td className="px-7 py-4">
                        <StatusBadge status="Completed" text="Terverifikasi" />
                      </td>

                      {/* Actions Column */}
                      <td className="px-7 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Tombol Hapus / Delete Action */}
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="p-2 bg-white text-red-500 rounded-xl hover:bg-red-50 hover:text-red-700 border border-[#EDF2F7] transition-all duration-150 shadow-xs inline-flex items-center justify-center"
                            title="Hapus Pengguna"
                          >
                            <FiTrash2 size={15} />
                          </button>
                          
                          <button 
                            onClick={() => alert(`Membuka Detail Pengguna: ${user.full_name}`)}
                            className="p-2 bg-white text-[#737791] rounded-xl hover:bg-[#5B5FEF] hover:text-white border border-[#EDF2F7] hover:border-transparent transition-all duration-150 shadow-xs inline-flex items-center justify-center"
                          >
                            <FiMoreVertical size={15} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}