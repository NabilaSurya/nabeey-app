import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiYoutube, FiLinkedin } from "react-icons/fi";

export default function FooterLanding() {
  const socialLinks = [
    { icon: <FiInstagram />, href: "#", label: "Instagram" },
    { icon: <FiTwitter />, href: "#", label: "Twitter" },
    { icon: <FiYoutube />, href: "#", label: "Youtube" },
    { icon: <FiLinkedin />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer id="kontak" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#5B5FEF] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                L
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                lux<span className="text-[#5B5FEF]">stay</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Platform CRM hotel terpercaya yang menghadirkan pengalaman menginap
              mewah dengan layanan prima dan kemudahan reservasi berbasis teknologi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {["Home", "Rooms", "Tentang Kami", "Hubungi Kami"].map(
                (item) => {
                  const anchorMap = {
                    "Home": "#home",
                    "Rooms": "#katalog",
                    "Tentang Kami": "#tentang",
                    "Hubungi Kami": "#kontak",
                  };
                  return (
                    <li key={item}>
                      <a
                        href={anchorMap[item]}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Layanan
            </h4>
            <ul className="space-y-3">
              {["Reservasi Kamar", "Hotel & Akomodasi", "Wedding & Event", "Laundry & Dry Clean"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Ikuti Kami
            </h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-[#5B5FEF] rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Email:{" "}
              <a
                href="mailto:hello@luxstay.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                hello@luxstay.com
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Telp:{" "}
              <span className="text-gray-400">+62 21 5550 999</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} luxstay. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
