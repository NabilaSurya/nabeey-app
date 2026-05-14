import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages (Lazy Loaded)
const Home = lazy(() => import("../pages/Home"));
const Rooms = lazy(() => import("../pages/Rooms"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Customers = lazy(() => import("../pages/Customers"));
const Settings = lazy(() => import("../pages/Settings"));

// Tambahan untuk Error & NotFound
const NotFound = lazy(() => import("../pages/NotFound"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const Loading = () => <LoadingSpinner />;

const router = createBrowserRouter([
  {
    path: "/",
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
        path: "about",
        element: <About />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      // INI ADALAH NOT FOUND (404)
      // Jika user ngetik asal di dalam domain utama, halaman ini muncul
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