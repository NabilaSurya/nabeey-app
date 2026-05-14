import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages (Lazy Loaded)
const Home = lazy(() => import("../pages/Home"));
const Rooms = lazy(() => import("../pages/Rooms"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

// Tambahan untuk Error & NotFound
const NotFound = lazy(() => import("../pages/NotFound"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

// Komponen Loading yang lebih "LuxStay"
const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#FDFCFB]">
      <div className="w-10 h-10 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
      <p className="mt-4 text-xs uppercase tracking-[4px] text-stone-400 font-bold">LuxStay</p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
    // 1. Menangani Error System (misal: API putus atau crash)
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "about",
        element: <About />,
      },
      // 2. Menangani Halaman Tidak Ditemukan (404) di dalam MainLayout
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;