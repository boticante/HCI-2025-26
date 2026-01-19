"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

type ReviewModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ReviewModal({ open, onClose }: ReviewModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    // Focus the dialog panel for accessibility.
    queueMicrotask(() => panelRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reviewData = {
      name: formData.get("name"),
      title: formData.get("title"),
      rating: rating,
      review: formData.get("review"),
    };
    
    // Here you would normally send to backend
    console.log("Review submitted:", reviewData);
    
    // Reset form and close
    setRating(0);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-[92vw] max-w-2xl rounded-none bg-[#15202b] shadow-2xl ring-1 ring-white/10"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <h2 id={titleId} className="text-2xl font-bold text-white">
            Share your experience
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-none p-2 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5">
              {/* Your Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        className={`size-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "text-white/80"
                            : "text-white/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Your Review */}
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-white/80 mb-2">
                  Your review
                </label>
                <textarea
                  id="review"
                  name="review"
                  placeholder="Share the details of your experience..."
                  rows={6}
                  className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-none bg-white/10 hover:bg-white/15 px-4 py-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-none bg-green-700 hover:bg-green-600 px-4 py-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
