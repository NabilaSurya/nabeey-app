import { useState, useEffect, useCallback } from "react";
import { 
  FiCheckCircle, FiXCircle, FiClock, FiDollarSign, 
  FiUser, FiFileText, FiRefreshCw, FiMail, FiPhone 
} from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import LoadingSpinner from "../../components/LoadingSpinner";
import SearchBar from "../../components/SearchBar";

export default function KonfirmasiBelanja() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [processingId, setProcessingId] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*, profiles:user_id(full_name)")
        .order("created_at", { ascending: false });

      // === LOGGING untuk debugging ===
      console.log("[KonfirmasiBelanja] Data dari database:", data);
      console.log("[KonfirmasiBelanja] Error dari database:", error);

      if (error) {
        // Error 401 = benar-benar tidak login (token expired/hilang)
        if (error.status === 401 || error.code === "PGRST301" || error.message?.includes("JWT")) {
          setFetchError("Sesi login telah berakhir. Silakan login ulang.");
          console.warn("[KonfirmasiBelanja] Tidak terautentikasi:", error);
          setTransactions([]);
          return;
        }
        
        // Error 403 = RLS / izin database (biasanya karena JOIN ke profiles)
        if (error.status === 403) {
          setFetchError(
            "Izin database tidak mencukupi. Kemungkinan RLS policy untuk tabel profiles belum ditambahkan. " +
            "Jalankan SQL migration yang berisi RLS policy untuk tabel profiles agar admin bisa membaca data member."
          );
          console.error("[KonfirmasiBelanja] RLS/Forbidden error:", error);
          setTransactions([]);
          return;
        }
        
        throw error;
      }

      console.log(`[KonfirmasiBelanja] ${data?.length || 0} transaksi berhasil diambil`);
      setTransactions(data || []);
    } catch (err) {
      console.error("[KonfirmasiBelanja] Gagal fetch transaksi:", err);
      setFetchError("Terjadi kesalahan saat mengambil data: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Helper: ambil nama customer (member atau guest)
  const getCustomerName = (tx) => {
    return tx.profiles?.full_name ?? tx.guest_name ?? "Unknown";
  };

  // Helper: ambil inisial avatar
  const getAvatarInitial = (tx) => {
    const name = tx.profiles?.full_name ?? tx.guest_name;
    return name?.charAt(0)?.toUpperCase() || "U";
  };

  // Helper: tentukan apakah ini transaksi guest
  const isGuestTransaction = (tx) => {
    return !tx.user_id;
  };

  // Filter logika (mendukung pencarian guest_name juga)
  useEffect(() => {
    const result = transactions.filter((tx) => {
      const customerName = getCustomerName(tx).toLowerCase();
      const invoice = (tx.invoice_number?.toLowerCase() || "");
      const query = searchQuery.toLowerCase();

      const matchSearch = customerName.includes(query) || invoice.includes(query);
      const matchStatus = statusFilter === "All" || tx.status === statusFilter;
      return matchSearch && matchStatus;
    });
    setFilteredTransactions(result);
  }, [searchQuery, statusFilter, transactions]);

  const handleApprove = async (transactionId, userId) => {
    setProcessingId(transactionId);
    try {
      // 1. Update status transaksi menjadi Approved
      const { error: txError } = await supabase
        .from("transactions")
        .update({ status: "Approved" })
        .eq("id", transactionId);

      if (txError) throw txError;

      // 2. Jika ini booking member, coba tambahkan poin (opsional — jangan blokir jika gagal)
      let pointsError = null;
      if (userId) {
        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("points")
            .eq("id", userId)
            .single();

          if (profile) {
            await supabase
              .from("profiles")
              .update({ points: (profile.points || 0) + 100 })
              .eq("id", userId);
          }
        } catch (innerErr) {
          pointsError = innerErr.message;
          console.warn("[Poin] Gagal update points:", innerErr.message);
        }
      }

      // Tampilkan notifikasi sesuai hasil
      if (pointsError) {
        alert(
          `✅ Booking disetujui! Tapi poin belum tersimpan.\n\n` +
          `Jalankan SQL ini di Supabase SQL Editor agar poin bisa berfungsi:\n\n` +
          `ALTER TABLE profiles ADD COLUMN points INTEGER DEFAULT 0;`
        );
      } else {
        alert("✅ Booking berhasil disetujui!");
      }

      // 3. Refresh data — selalu dijalankan
      await fetchTransactions();
    } catch (err) {
      console.error("[KonfirmasiBelanja] Gagal approve transaksi:", err);
      alert("Gagal memproses persetujuan: " + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (transactionId) => {
    setProcessingId(transactionId);
    try {
      const { error } = await supabase
        .from("transactions")
        .update({ status: "Rejected" })
        .eq("id", transactionId);

      if (error) throw error;

      await fetchTransactions();
      alert("✅ Transaksi ditolak.");
    } catch (err) {
      console.error("[KonfirmasiBelanja] Gagal reject transaksi:", err);
      alert("Gagal menolak transaksi: " + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const formatRupiah = (num) => {
    return "Rp " + Number(num).toLocaleString("id-ID");
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Approved": return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "Rejected": return "bg-red-50 text-red-600 border border-red-200";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFBFF] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-5 pt-2 px-6 pb-6 md:px-8 md:pb-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">

        {/* ==================== ROW 1: STAT CARDS ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
              <FiClock size={22} />
            </div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Menunggu Konfirmasi</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">
                {transactions.filter(t => t.status === "Pending").length} Transaksi
              </h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
              <FiCheckCircle size={22} />
            </div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Sudah Disetujui</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">
                {transactions.filter(t => t.status === "Approved").length} Transaksi
              </h4>
            </div>
          </div>
          <div className="bg-white border border-[#EDF2F7] p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 bg-indigo-50 text-[#5B5FEF] rounded-xl flex items-center justify-center">
              <FiDollarSign size={22} />
            </div>
            <div>
              <p className="text-[11px] text-[#737791] font-medium uppercase tracking-wider">Total Poin Tersalurkan</p>
              <h4 className="text-base font-extrabold text-[#151D48] mt-0.5">
                {transactions.filter(t => t.status === "Approved").reduce((acc, t) => acc + (t.estimated_points || 0), 0).toLocaleString()} PTS
              </h4>
            </div>
          </div>
        </div>

        {/* ==================== ROW: ERROR BANNER ==================== */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-5 rounded-2xl flex items-start gap-3">
            <FiXCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold">Gagal Memuat Data Transaksi</p>
              <p className="text-xs mt-1 text-red-700">{fetchError}</p>
              <button 
                onClick={fetchTransactions}
                className="mt-3 flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                <FiRefreshCw size={13} /> Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* ==================== ROW 2: FILTER TOOLBAR ==================== */}
        <div className="bg-white p-4 rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] flex flex-col lg:flex-row gap-4 items-center border border-[#EDF2F7]">
          <div className="flex-1 w-full">
            <SearchBar 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Cari nama member/guest atau nomor invoice..." 
            />
          </div>
          <div className="flex flex-wrap w-full lg:w-auto items-center gap-3">
            <div className="flex items-center gap-2 bg-[#FAFBFF] border border-[#EDF2F7] rounded-xl px-3 py-2">
              <FiRefreshCw 
                size={14} 
                className="text-[#737791] cursor-pointer hover:text-[#5B5FEF] transition-colors" 
                onClick={fetchTransactions}
                title="Refresh data"
              />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-semibold text-[#151D48] outline-none bg-transparent"
              >
                <option value="All">Semua Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* ==================== ROW 3: DATA TABLE ==================== */}
        <div className="bg-white rounded-[1.5rem] shadow-[0px_6px_20px_rgba(69,78,124,0.015)] overflow-hidden border border-[#EDF2F7]">
          {filteredTransactions.length === 0 ? (
            <div className="py-16 text-center text-[#737791]">
              <FiFileText size={40} className="mx-auto mb-3 text-stone-300" />
              <p className="text-sm font-bold">Tidak ada data transaksi</p>
              <p className="text-xs mt-1">Belum ada transaksi belanja dari member atau guest yang perlu dikonfirmasi.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-white border-b border-[#F4F5F9]">
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Nama Customer</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Invoice</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Total Belanja</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Poin Reward</th>
                    <th className="px-7 py-4.5 text-[12px] font-bold text-[#737791] tracking-wider uppercase">Status</th>
                    <th className="px-7 py-4.5 text-center text-[12px] font-bold text-[#737791] tracking-wider uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F5F9] text-sm">
                  {filteredTransactions.map((tx) => {
                    const customerName = getCustomerName(tx);
                    const avatarInitial = getAvatarInitial(tx);
                    const isGuest = isGuestTransaction(tx);

                    return (
                    <tr key={tx.id} className="hover:bg-[#FAFBFF] transition-colors group">
                      {/* Customer Identity */}
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-3.5">
                          {/* Avatar */}
                          <div className={`w-11 h-11 rounded-xl font-bold text-sm flex items-center justify-center uppercase shadow-xs ${
                            isGuest 
                              ? "bg-stone-100 text-stone-500" 
                              : "bg-indigo-50 text-[#5B5FEF]"
                          }`}>
                            {avatarInitial}
                          </div>

                          {/* Nama + Info */}
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#151D48] group-hover:text-[#5B5FEF] transition-colors duration-150">
                              {customerName}
                              {isGuest && (
                                <span className="ml-2 text-[10px] font-medium text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-md">
                                  GUEST
                                </span>
                              )}
                            </span>

                            {/* Subtitle: untuk member tampilkan user ID, untuk guest tampilkan email */}
                            <span className="text-[11px] text-[#737791] mt-0.5 flex items-center gap-1">
                              {isGuest ? (
                                <>
                                  <FiMail size={11} /> {tx.guest_email || "tanpa email"}
                                </>
                              ) : (
                                <>
                                  <FiUser size={11} /> ID: {tx.user_id?.substring(0, 8)}...
                                </>
                              )}
                            </span>

                            {/* Nomor HP guest (jika ada) */}
                            {isGuest && tx.guest_phone && (
                              <span className="text-[11px] text-[#737791] mt-0.5 flex items-center gap-1">
                                <FiPhone size={11} /> {tx.guest_phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Invoice Number */}
                      <td className="px-7 py-4">
                        <span className="text-xs font-mono font-bold text-[#5B5FEF] bg-indigo-50 px-3 py-1.5 rounded-lg">
                          {tx.invoice_number}
                        </span>
                      </td>

                      {/* Total Amount */}
                      <td className="px-7 py-4">
                        <span className="text-xs font-extrabold text-[#151D48]">
                          {formatRupiah(tx.total_amount)}
                        </span>
                      </td>

                      {/* Points Reward */}
                      <td className="px-7 py-4">
                        {isGuest ? (
                          <span className="text-xs text-stone-400 font-medium">-</span>
                        ) : (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                            100 Pts
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-7 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${getStatusBadgeStyle(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-7 py-4 text-center">
                        {tx.status === "Pending" ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleApprove(tx.id, tx.user_id, 100)}
                              disabled={processingId === tx.id}
                              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white text-[11px] font-bold py-2 px-4 rounded-xl shadow-xs transition-all"
                            >
                              <FiCheckCircle size={13} />
                              {processingId === tx.id ? "..." : "ACC"}
                            </button>
                            <button
                              onClick={() => handleReject(tx.id)}
                              disabled={processingId === tx.id}
                              className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-[11px] font-bold py-2 px-4 rounded-xl shadow-xs transition-all"
                            >
                              <FiXCircle size={13} />
                              Tolak
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#737791] font-bold">
                            {tx.status === "Approved" ? "✅ Selesai" : "❌ Ditolak"}
                          </span>
                        )}
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
