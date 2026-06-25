import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom"; // Tambah Navigate untuk mengarahkan rute kosong jika perlu
import LoadingSpinner from "../components/LoadingSpinner";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages (Lazy Loaded)
const Home = lazy(() => import("../pages/Home"));
const Rooms = lazy(() => import("../pages/Rooms"));
const Pengaduan = lazy(() => import("../pages/Pengaduan"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Customers = lazy(() => import("../pages/Customers"));
const Settings = lazy(() => import("../pages/Settings"));
const User = lazy(() => import("../pages/User"));

// Halaman-halaman Mandiri (BEBAS SIDEBAR)
const Member = lazy(() => import("../pages/Member")); // Ini untuk Admin/Dashboard utama member sebelumnya
const MemberLanding = lazy(() => import("../pages/member/MemberLanding")); // Halaman Baru untuk Portal Member Biasa
const Guest = lazy(() => import("../pages/guest/GuestPage"));

// Tambahan untuk Error & NotFound
const NotFound = lazy(() => import("../pages/NotFound"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const Loading = () => <LoadingSpinner />;

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
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
        path: "pengaduan",
        element: <Pengaduan />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "member",
        element: <Member />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    // SEJAJAR DI SINI: Bebas dari jeratan sidebar MainLayout!
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Guest />
      </Suspense>
    ),
  },
      {
        // Rute khusus user/customer member biasa -> /member/MemberLanding
        path: "MemberLanding",
        element: (
          <Suspense fallback={<Loading />}>
            <MemberLanding />
          </Suspense>
        ),
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