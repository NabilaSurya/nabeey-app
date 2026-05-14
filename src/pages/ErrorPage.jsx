import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-stone-900 text-white text-center px-6">
      <h1 className="text-5xl font-bold italic mb-4 text-amber-500">Something went wrong.</h1>
      <p className="text-stone-400 mb-8 italic">
        {error.statusText || error.message || "An unexpected error has occurred."}
      </p>
      <Link 
        to="/" 
        className="border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-black transition uppercase text-[10px] tracking-widest font-bold"
      >
        Reload Page
      </Link>
    </div>
  );
}