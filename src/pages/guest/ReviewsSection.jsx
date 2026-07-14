import { useState } from "react";
import { FiStar, FiChevronRight, FiMessageCircle, FiThumbsUp, FiCalendar } from "react-icons/fi";

const reviewsData = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    location: "Singapore",
    room: "Presidential Penthouse",
    rating: 5,
    date: "March 2026",
    title: "Absolutely breathtaking experience!",
    review:
      "The Presidential Penthouse exceeded every expectation. The 360° city view at sunrise was magical. The private butler service was impeccable — they even remembered my favorite wine from my last stay. This is luxury redefined.",
    likes: 48,
  },
  {
    id: 2,
    name: "James Anderson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    location: "London, UK",
    room: "Garden Villa",
    rating: 5,
    date: "February 2026",
    title: "A private paradise hidden in the city",
    review:
      "Staying at the Garden Villa felt like having our own tropical retreat. The private pool, the lush garden, and the outdoor BBQ area made our family vacation unforgettable. The kids didn't want to leave!",
    likes: 32,
  },
  {
    id: 3,
    name: "Maya Putri",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    location: "Jakarta, Indonesia",
    room: "Honeymoon Suite",
    rating: 5,
    date: "January 2026",
    title: "Perfect honeymoon destination!",
    review:
      "The Honeymoon Suite was pure romance. The canopy bed with rose petals, the bathtub for two with city views, and the private balcony — every detail was thoughtfully designed for couples. We're already planning our anniversary trip back!",
    likes: 56,
  },
  {
    id: 4,
    name: "Michael Torres",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    location: "Sydney, Australia",
    room: "Deluxe Ocean View",
    rating: 4,
    date: "December 2025",
    title: "Stunning ocean views, world-class service",
    review:
      "Waking up to the sound of waves and the sight of the endless ocean was therapeutic. The room was spacious, the bed was incredibly comfortable, and the staff anticipated our every need. Minor suggestion: more variety in the breakfast menu.",
    likes: 27,
  },
  {
    id: 5,
    name: "Aisha Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    location: "Mumbai, India",
    room: "Executive Suite",
    rating: 5,
    date: "November 2025",
    title: "Business trip turned into a luxury getaway",
    review:
      "I booked the Executive Suite for a business trip, but the experience was anything but ordinary. The executive lounge access, the dedicated workspace with ocean views, and the 24/7 concierge made my work trip feel like a vacation.",
    likes: 41,
  },
  {
    id: 6,
    name: "Oliver Schmidt",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    location: "Berlin, Germany",
    room: "Superior Twin",
    rating: 4,
    date: "October 2025",
    title: "Great value for a premium experience",
    review:
      "The Superior Twin room was perfect for my colleague and me during the conference. Clean, modern, and well-equipped. The Wi-Fi was blazing fast, and the location was central to all major attractions. Will definitely return.",
    likes: 19,
  },
  {
    id: 7,
    name: "Yuki Tanaka",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    location: "Tokyo, Japan",
    room: "Royal Penthouse",
    rating: 5,
    date: "September 2025",
    title: "The pinnacle of luxury hospitality",
    review:
      "From the private elevator access to the personal chef who prepared an authentic Japanese-Italian fusion dinner, every moment at the Royal Penthouse was unforgettable. The attention to detail is what sets LuxStay apart from any hotel I've ever experienced.",
    likes: 63,
  },
  {
    id: 8,
    name: "Fatima Al-Rashid",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150&q=80",
    location: "Dubai, UAE",
    room: "Garden Villa",
    rating: 5,
    date: "August 2025",
    title: "Our family's second home",
    review:
      "We've stayed at the Garden Villa three times now, and it keeps getting better. The staff remembers our preferences, the kids' club is exceptional, and the private garden is perfect for family gatherings. This is our home away from home.",
    likes: 38,
  },
];

function StarRating({ rating, size = "sm" }) {
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`${sizeClass} ${
            star <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-slate-200 fill-slate-100"
          } transition-colors`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, isExpanded, onToggle }) {
  const truncated =
    review.review.length > 150 ? review.review.slice(0, 150) + "..." : review.review;

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Colored top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#5B5FEF] via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex flex-col flex-1">
        {/* Header: Avatar + Name + Date */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-[#5B5FEF]/30 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 leading-tight">
                {review.name}
              </h4>
              <p className="text-[10px] font-semibold text-slate-400">{review.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
            <FiCalendar size={10} />
            {review.date}
          </div>
        </div>

        {/* Room Badge */}
        <div className="mb-3">
          <span className="inline-block text-[9px] font-bold text-[#5B5FEF] uppercase tracking-wider bg-[#5B5FEF]/5 px-2.5 py-1 rounded-lg border border-[#5B5FEF]/10">
            Stayed in: {review.room}
          </span>
        </div>

        {/* Star Rating */}
        <div className="mb-3">
          <StarRating rating={review.rating} />
        </div>

        {/* Review Title */}
        <h5 className="text-sm font-bold text-slate-800 mb-2 leading-snug">
          {review.title}
        </h5>

        {/* Review Text with Read More */}
        <div className="relative flex-1">
          <FiMessageCircle className="absolute -top-1 -left-1 text-[#5B5FEF]/10 w-8 h-8 -z-0 rotate-180" />
          <p className="text-xs text-slate-600 leading-relaxed relative z-10 pl-2">
            {isExpanded ? review.review : truncated}
          </p>
          {review.review.length > 150 && (
            <button
              onClick={onToggle}
              className="text-[11px] font-bold text-[#5B5FEF] hover:text-[#4834D4] mt-1.5 transition-colors pl-2"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Footer: Likes */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
            <FiThumbsUp size={12} className="text-[#5B5FEF]" />
            <span>{review.likes} found this helpful</span>
          </div>
          <div className="flex gap-1">
            {review.rating === 5 ? (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                ★ Exceptional
              </span>
            ) : (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                ★ Great
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(4);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const displayedReviews = reviewsData.slice(0, visibleCount);
  const hasMore = visibleCount < reviewsData.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, reviewsData.length));
  };

  // Aggregate stats
  const avgRating = (
    reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
  ).toFixed(1);
  const totalReviews = reviewsData.length;
  const fiveStarCount = reviewsData.filter((r) => r.rating === 5).length;
  const fourStarCount = reviewsData.filter((r) => r.rating === 4).length;

  return (
    <section
      id="reviews"
      className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-[#5B5FEF] text-xs font-bold uppercase tracking-widest bg-[#5B5FEF]/10 px-4 py-1.5 rounded-full mb-4">
            <FiStar className="fill-[#5B5FEF]" size={12} />
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FEF] to-purple-500">
              Guests Say
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-lg mx-auto">
            Real experiences from real travelers. Discover why thousands of guests
            choose LuxStay for their most memorable stays.
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          {/* Average Rating */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-black text-slate-900">{avgRating}</p>
              <StarRating rating={Math.round(Number(avgRating))} size="lg" />
              <p className="text-[11px] font-semibold text-slate-400 mt-1">
                {totalReviews} reviews
              </p>
            </div>
          </div>

          {/* Rating Bars */}
          <div className="flex-1 w-full space-y-1.5">
            {[5, 4].map((star) => {
              const count = star === 5 ? fiveStarCount : fourStarCount;
              const percentage = (count / totalReviews) * 100;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 w-8 text-right">
                    {star} ★
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center sm:text-right">
            <p className="text-xs font-bold text-slate-500">Overall Satisfaction</p>
            <p className="text-lg font-black text-emerald-600">96%</p>
            <p className="text-[10px] text-slate-400">Would recommend</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isExpanded={expandedIds.has(review.id)}
              onToggle={() => toggleExpand(review.id)}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-slate-200 hover:border-[#5B5FEF] hover:text-[#5B5FEF] text-slate-700 font-bold text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              Load More Reviews
              <FiChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </button>
            <p className="text-xs text-slate-400 mt-3 font-medium">
              Showing {displayedReviews.length} of {reviewsData.length} reviews
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
