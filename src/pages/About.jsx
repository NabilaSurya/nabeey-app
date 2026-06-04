import { useState, useEffect } from "react";
import { FiEdit3, FiAward, FiUsers, FiCheckCircle, FiActivity, FiMapPin, FiEye } from "react-icons/fi";

// Import Komponen Global (Aktif Digunakan & Sinkron Tema)
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Hero from "../components/Hero";
import MetricCard from "../components/MetricCard";
import ValueCard from "../components/ValueCard";
import ToggleRow from "../components/ToggleRow";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#F8F9FC] font-['Inter',_sans-serif] antialiased text-[#151D48]">
      <div className="space-y-7 p-6 md:p-8 animate-in fade-in duration-700 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* Header Layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionHeading title="Brand Profile" subtitle="Hotel identity management" />
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <SecondaryButton icon={<FiEye size={16} />} onClick={() => alert("Preview Mode")}>
              View Live Site
            </SecondaryButton>
            <PrimaryButton icon={<FiEdit3 size={16} />} onClick={() => alert("Edit Mode")}>
              Edit Content
            </PrimaryButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Komponen Hero - Dabang Card Floating Style */}
          <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-2 shadow-[0px_8px_32px_rgba(69,78,124,0.03)] border border-[#EDF2F7] overflow-hidden">
            <Hero 
              title="LuxStay Heritage" 
              subtitle="Established 1994" 
              description="Kami percaya bahwa kemewahan bukan hanya tentang apa yang Anda lihat, tapi tentang bagaimana Anda dilayani dengan ketulusan hati."
            />
          </div>

          {/* Kumpulan Komponen MetricCard */}
          <div className="flex flex-col gap-6 justify-between">
            <MetricCard title="Awards Won" value="24+" subtext="Global Industry Excellence" isPrimary={true} icon={<FiAward size={24} />} />
            <MetricCard title="Global Staff" value="450+" subtext="Active Employees" isPrimary={false} icon={<FiUsers size={22} />} />
          </div>
        </div>

        {/* Komponen ValueCard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard icon={<FiCheckCircle />} title="Premium Service" desc="Layanan personal premium 24/7." color="bg-[#DCFCE7]" textCol="text-[#3CD856]" />
          <ValueCard icon={<FiActivity />} title="Modern Design" desc="Arsitektur kelas dunia & budaya lokal." color="bg-[#FFF4DE]" textCol="text-[#FF947A]" />
          <ValueCard icon={<FiMapPin />} title="Strategic Location" desc="Terletak di jantung kota premium." color="bg-[#FFE2E5]" textCol="text-[#FA5A7D]" />
        </div>

        {/* Toggle List Container */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-[0px_8px_32px_rgba(69,78,124,0.03)] border border-[#EDF2F7]">
          <ToggleRow title="Luxury Experience" />
          <ToggleRow title="Private Services" />
        </div>

      </div>
    </div>
  );
}