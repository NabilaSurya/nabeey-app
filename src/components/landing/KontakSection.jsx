import { useState } from "react";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiAlertCircle } from "react-icons/fi";

export default function KontakSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:hello@luxstay.com?subject=${encodeURIComponent(
      `[Pengaduan] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Nama: ${formData.name}%0AEmail: ${formData.email}%0A%0APesan:%0A${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    setIsSubmitted(true);
  };

  return (
    <section
      id="kontak"
      className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <span className="inline-block text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-[#5B5FEF]/10 px-4 py-1.5 rounded-full mb-4">
              Hubungi Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Punya Keluhan atau{" "}
              <span className="text-[#5B5FEF]">Pertanyaan?</span>
            </h2>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              Tim customer service kami siap membantu Anda 24 jam. Silakan kirimkan
              pesan melalui form di samping atau hubungi kami langsung melalui kontak
              di bawah ini.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#5B5FEF]/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiMail className="text-[#5B5FEF]" size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">hello@luxstay.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#5B5FEF]/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiAlertCircle className="text-[#5B5FEF]" size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Jam Operasional</p>
                  <p className="text-sm text-gray-500">24 Jam / 7 Hari</p>
                </div>
              </div>
            </div>

            {/* Quick tips */}
            <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
              <p className="text-xs font-bold text-amber-800 mb-1">
                💡 Tips Pengaduan
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Sertakan nomor kamar atau ID reservasi agar kami bisa memproses
                keluhan Anda lebih cepat.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                  <FiSend className="text-emerald-600" size={28} />
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  Email Client Terbuka!
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-xs">
                  Silakan kirim email untuk mengirimkan pengaduan Anda. Klik tombol
                  di bawah jika ingin mengirim pengaduan lain.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 px-6 py-3 bg-[#5B5FEF] hover:bg-[#4a4ce0] text-white font-bold text-xs rounded-xl transition-all"
                >
                  Kirim Pengaduan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#5B5FEF] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#5B5FEF] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Subjek
                  </label>
                  <div className="relative">
                    <FiAlertCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Contoh: Komplain Kamar / Saran / Pertanyaan"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#5B5FEF] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Pesan / Keluhan
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3.5 top-3 text-gray-400" size={14} />
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tuliskan keluhan, saran, atau pertanyaan Anda di sini..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#5B5FEF] focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#5B5FEF] hover:bg-[#4a4ce0] text-white font-bold text-xs rounded-xl shadow-md shadow-[#5B5FEF]/20 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FiSend size={14} />
                  Kirim Pengaduan
                </button>

                <p className="text-[10px] text-gray-400 text-center">
                  * Pengaduan akan dikirim melalui email client Anda ke hello@luxstay.com
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
