import React, { useState, lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";

// 1. TERAPKAN REACT LAZY
// Komponen hanya di-load saat dibutuhkan
const GuestView = lazy(() => import("./components/GuestView"));
const AdminView = lazy(() => import("./components/AdminView"));

// Komponen Loading (Suspense Fallback)
const LoadingFallback = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
    <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"></div>
    <p className="text-slate-500 font-medium animate-pulse">Menyiapkan Layanan...</p>
  </div>
);

export default function MainPage() {
  const [role, setRole] = useState("guest");

  return (
    // 2. TERAPKAN MAINLAYOUT
    <MainLayout role={role} setRole={setRole}>
      
      {/* 3. TERAPKAN SUSPENSE */}
      {/* Menangani delay loading saat pindah dari Guest ke Admin */}
      <Suspense fallback={<LoadingFallback />}>
        {role === "guest" ? <GuestView /> : <AdminView />}
      </Suspense>

    </MainLayout>
  );
}