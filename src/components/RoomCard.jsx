// components/RoomCard.jsx
export default function RoomCard({ image, title, price }) {
  return (
    <div className="group cursor-pointer bg-white rounded-[2rem] p-4 border border-stone-100 hover:shadow-2xl hover:shadow-stone-200 transition-all duration-500">
      <div className="overflow-hidden rounded-[1.5rem] aspect-[4/5]">
        <img 
          src={image} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      <div className="mt-6 px-2 pb-2">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-stone-800 tracking-tight">{title}</h2>
          <span className="bg-stone-100 px-3 py-1 rounded-lg text-sm font-bold text-stone-600">${price}</span>
        </div>
        <p className="text-stone-500 mt-2 text-sm leading-relaxed">
          Experience world-class service and elegant interiors for your dream vacation.
        </p>
        <button className="w-full mt-6 py-3 border border-stone-200 rounded-xl font-semibold group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300 uppercase text-xs tracking-widest">
          View Details
        </button>
      </div>
    </div>
  );
}