export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 h-full flex flex-col justify-center px-16 text-white">
        <p className="uppercase tracking-[6px] mb-4">
          Luxury Resort
        </p>

        <h1 className="text-7xl font-bold leading-tight max-w-3xl">
          Sophisticated Vacation Hotel Experience
        </h1>

        <p className="mt-6 max-w-xl text-zinc-200 text-lg">
          Discover premium rooms, elegant interiors, and unforgettable stays.
        </p>

        <button className="mt-8 bg-white text-black px-8 py-4 rounded-full w-fit font-semibold hover:scale-105 transition">
          Book Now
        </button>
      </div>
    </section>
  );
}