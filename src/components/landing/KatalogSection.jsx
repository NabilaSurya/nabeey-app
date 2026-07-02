import { useState } from "react";
import {
  FiStar,
  FiMapPin,
  FiUsers,
  FiCheck,
  FiWifi,
  FiCoffee,
} from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// --- Mock Data Kamar Hotel ---
const roomsData = [
  {
    id: "RM-001",
    title: "Deluxe Ocean View",
    category: "Deluxe",
    location: "Lantai 3-5, Gedung Utama",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 124,
    price: 1200000,
    capacity: 2,
    size: "32 m²",
    bed: "King Size Bed",
    description:
      "Kamar Deluxe dengan pemandangan laut yang menakjubkan. Dilengkapi dengan balkon pribadi, TV layar datar 50 inci, dan kamar mandi marmer dengan bathtub.",
    facilities: [
      "AC & Pemanas",
      "Wi-Fi 100 Mbps",
      "TV Layar Datar 50\"",
      "Mini Bar",
      "Bathtub Marmer",
      "Balkon Pribadi",
    ],
  },
  {
    id: "RM-002",
    title: "Executive Suite",
    category: "Suite",
    location: "Lantai 8-10, Executive Wing",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviews: 89,
    price: 2500000,
    capacity: 3,
    size: "48 m²",
    bed: "Super King Size Bed",
    description:
      "Suite eksekutif dengan ruang tamu terpisah, akses ke Executive Lounge, dan pemandangan kota yang spektakuler. Termasuk butler service 24 jam.",
    facilities: [
      "Ruang Tamu Terpisah",
      "Butler Service",
      "Access Executive Lounge",
      "Wi-Fi 200 Mbps",
      "Espresso Machine",
      "Smart TV 65\"",
    ],
  },
  {
    id: "RM-003",
    title: "Superior Twin",
    category: "Superior",
    location: "Lantai 2-4, Gedung Utama",
    image:
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
    reviews: 203,
    price: 800000,
    capacity: 2,
    size: "28 m²",
    bed: "Twin Single Beds",
    description:
      "Kamar Superior dengan dua tempat tidur single yang nyaman. Cocok untuk kolega atau teman yang bepergian bersama. Dilengkapi fasilitas standar bintang 5.",
    facilities: [
      "AC & Pemanas",
      "Wi-Fi Gratis",
      "TV Layar Datar 40\"",
      "Kamar Mandi Shower",
      "Meja Kerja",
      "Coffee & Tea Maker",
    ],
  },
  {
    id: "RM-004",
    title: "Presidential Penthouse",
    category: "Penthouse",
    location: "Lantai 20, Penthouse Floor",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
    reviews: 48,
    price: 5500000,
    capacity: 4,
    size: "85 m²",
    bed: "Super King Size Bed + 2 Single",
    description:
      "Penthouse mewah di lantai tertinggi dengan pemandangan 360° kota. Dilengkapi kolam renang pribadi, ruang keluarga luas, dan dapur lengkap.",
    facilities: [
      "Kolam Renang Pribadi",
      "Ruang Keluarga",
      "Dapur Lengkap",
      "Private Chef",
      "Home Theater",
      "Terrace Luas",
    ],
  },
  {
    id: "RM-005",
    title: "Family Connecting Room",
    category: "Deluxe",
    location: "Lantai 6, Gedung Utama",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    reviews: 156,
    price: 2200000,
    capacity: 5,
    size: "56 m²",
    bed: "King Size + 2 Single Beds",
    description:
      "Dua kamar terhubung yang sempurna untuk keluarga. Terdapat pintu penghubung internal, ruang bermain anak mini, dan kamar mandi di setiap kamar.",
    facilities: [
      "2 Kamar Terhubung",
      "Ruang Bermain Anak",
      "2 Kamar Mandi",
      "Kulkas & Microwave",
      "Smart TV 2 Unit",
      "Wi-Fi 150 Mbps",
    ],
  },
  {
    id: "RM-006",
    title: "Garden Villa",
    category: "Villa",
    location: "Area Taman Resort",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviews: 112,
    price: 3500000,
    capacity: 4,
    size: "70 m²",
    bed: "King Size Bed + Sofa Bed",
    description:
      "Villa pribadi di tengah taman tropis yang asri. Dilengkapi kolam renang eksklusif, gazebo, dan area BBQ pribadi untuk pengalaman menginap tak terlupakan.",
    facilities: [
      "Kolam Renang Pribadi",
      "Gazebo & Garden",
      "Area BBQ",
      "Dapur Mini",
      "Parkir Mobil",
      "Wi-Fi 200 Mbps",
    ],
  },
  {
    id: "RM-007",
    title: "Standard Room",
    category: "Superior",
    location: "Lantai 1-2, Gedung Utama",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5,
    reviews: 312,
    price: 550000,
    capacity: 2,
    size: "24 m²",
    bed: "Queen Size Bed",
    description:
      "Kamar standar nyaman dengan harga terjangkau. Cocok untuk pelancong bisnis atau singgah sejenak. Fasilitas lengkap untuk kenyamanan Anda.",
    facilities: [
      "AC",
      "Wi-Fi Gratis",
      "TV Layar Datar 32\"",
      "Kamar Mandi Shower",
      "Meja Kerja",
      "Safety Box",
    ],
  },
  {
    id: "RM-008",
    title: "Honeymoon Suite",
    category: "Suite",
    location: "Lantai 12, Romantic Wing",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
    reviews: 76,
    price: 3200000,
    capacity: 2,
    size: "45 m²",
    bed: "King Size Bed + Canopy",
    description:
      "Suite romantis untuk momen spesial Anda. Dilengkapi kanopi eksklusif, bathtub untuk dua orang, dan layanan bunga segar serta cokelat setiap hari.",
    facilities: [
      "Canopy King Bed",
      "Bathtub for 2",
      "Bunga Segar Harian",
      "Spa Bath Set",
      "Smart TV 55\"",
      "Private Balcony",
    ],
  },
  {
    id: "RM-009",
    title: "Accessible Room",
    category: "Superior",
    location: "Lantai 1, Gedung Utama",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 34,
    price: 650000,
    capacity: 2,
    size: "30 m²",
    bed: "Queen Size Bed",
    description:
      "Kamar ramah difabel dengan akses kursi roda, pegangan di kamar mandi, dan tombol darurat. Setiap tamu berhak mendapatkan kenyamanan yang setara.",
    facilities: [
      "Akses Kursi Roda",
      "Handrail Kamar Mandi",
      "Tombol Darurat",
      "AC & Pemanas",
      "TV Layar Datar",
      "Wi-Fi Gratis",
    ],
  },
];

function formatRupiah(angka) {
  return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function KatalogSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const categories = ["Semua", "Deluxe", "Suite", "Superior", "Penthouse", "Villa"];

  const filteredRooms =
    activeFilter === "Semua"
      ? roomsData
      : roomsData.filter((r) => r.category === activeFilter);

  return (
    <section
      id="katalog"
      className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-[#5B5FEF]/10 px-4 py-1.5 rounded-full mb-4">
            Koleksi Eksklusif
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Kamar & Suite Premium
          </h2>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Dari kamar Superior yang nyaman hingga Penthouse mewah, temukan
            pengalaman menginap terbaik yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-[#5B5FEF] text-white shadow-md shadow-[#5B5FEF]/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#5B5FEF] hover:text-[#5B5FEF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 font-medium">
              Tidak ada kamar dengan kategori ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function RoomCard({ room }) {
  const categoryColors = {
    Deluxe: "bg-blue-600",
    Suite: "bg-purple-600",
    Superior: "bg-emerald-600",
    Penthouse: "bg-amber-600",
    Villa: "bg-rose-600",
  };

  const categoryColorsLight = {
    Deluxe: "bg-blue-100 text-blue-700",
    Suite: "bg-purple-100 text-purple-700",
    Superior: "bg-emerald-100 text-emerald-700",
    Penthouse: "bg-amber-100 text-amber-700",
    Villa: "bg-rose-100 text-rose-700",
  };

  const badgeColor = categoryColors[room.category] || "bg-gray-600";
  const badgeLight = categoryColorsLight[room.category] || "bg-gray-100 text-gray-700";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge Kategori */}
        <div className="absolute top-4 left-4">
          <span
            className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm text-white ${badgeColor}`}
          >
            {room.category}
          </span>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <FiStar className="text-amber-400 fill-amber-400" size={12} />
          {room.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-1 text-xs text-gray-400 mb-1">
          <FiMapPin size={12} className="mt-0.5 shrink-0" />
          <span>{room.location}</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1">
          {room.title}
        </h3>

        {/* Info: Kapasitas & Ukuran */}
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FiUsers size={12} />
            {room.capacity} org
          </span>
          <span className="flex items-center gap-1">
            <FiCoffee size={12} />
            {room.size}
          </span>
          <span className="flex items-center gap-1">
            <FiWifi size={12} />
            {room.bed}
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-baseline gap-1">
          <span className="text-lg font-black text-gray-900">
            {formatRupiah(room.price)}
          </span>
          <span className="text-xs text-gray-400 font-medium">/ malam</span>
        </div>

        <div className="mt-auto pt-4">
          {/* Shadcn Dialog Trigger */}            <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full py-3 text-xs font-bold rounded-xl">
                Lihat Detail
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${badgeLight}`}
                  >
                    {room.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                    <FiStar className="fill-amber-400" size={14} />
                    {room.rating} ({room.reviews} ulasan)
                  </span>
                </div>
                <DialogTitle className="text-xl font-black text-gray-900">
                  {room.title}
                </DialogTitle>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <FiMapPin size={12} />
                  {room.location}
                </div>
              </DialogHeader>

              {/* Detail Image */}
              <div className="h-48 rounded-xl overflow-hidden bg-gray-100 -mx-4">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <DialogDescription className="text-sm text-gray-600 leading-relaxed">
                {room.description}
              </DialogDescription>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <FiUsers className="mx-auto text-[#5B5FEF] mb-1" size={16} />
                  <p className="text-[10px] text-gray-500 font-medium">Kapasitas</p>
                  <p className="text-xs font-bold text-gray-800">
                    {room.capacity} Orang
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <FiCoffee className="mx-auto text-[#5B5FEF] mb-1" size={16} />
                  <p className="text-[10px] text-gray-500 font-medium">Luas</p>
                  <p className="text-xs font-bold text-gray-800">{room.size}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <FiWifi className="mx-auto text-[#5B5FEF] mb-1" size={16} />
                  <p className="text-[10px] text-gray-500 font-medium">Tempat Tidur</p>
                  <p className="text-xs font-bold text-gray-800 truncate" title={room.bed}>
                    {room.bed}
                  </p>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Fasilitas Kamar:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {room.facilities.map((fac, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-xs text-gray-600"
                    >
                      <FiCheck className="text-emerald-500 shrink-0" size={12} />
                      {fac}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">
                    Harga per Malam
                  </p>
                  <p className="text-xl font-black text-gray-900">
                    {formatRupiah(room.price)}
                  </p>
                </div>
                <a
                  href="/auth/register"
                  className="inline-flex items-center px-5 py-3 bg-[#5B5FEF] hover:bg-[#4a4ce0] text-white text-xs font-bold rounded-xl shadow-md shadow-[#5B5FEF]/20 transition-all duration-200"
                >
                  Pesan Sekarang
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
