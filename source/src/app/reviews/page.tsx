"use client";

import { Navigation } from "@components/navigation";
import { ReviewModal } from "@components/review-modal";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import { contentfulClient } from "@/lib/contentful/client";
import type { Review } from "@/types/review";

const previousReviews: Review[] = [
  {
    id: "1",
    name: "Raphael",

    rating: 5,
    review:
      "Esta plataforma facilita muito minhas viagens — agora posso ver instantaneamente quais eventos esportivos locais estão acontecendo onde quer que eu esteja, com detalhes claros e compra de ingressos simples. Economiza muito tempo em comparação com ter que acessar vários sites.",
    date: "December 19, 2025",
    avatar: "/images/avatar1.png",
  },
  {
    id: "2",
    name: "Iva",

    rating: 5,
    review:
      "This app helps me find affordable sports events fast, and the clear pricing means no surprises at checkout. It's perfect for planning fun outings with friends without wasting time or money.",
    date: "December 19, 2025",
    avatar: "/images/avatar2.png",
  },
  {
    id: "3",
    name: "Mate",

    rating: 1,
    review:
      "Obožavan koliko je sve jednostavno — sve nadolazeće utakmice, datumi, lokacije i karte su mi na jednome mistu, bez ikakvog nepotrebnog nereda. Napokon mogu bez muke pratiti svoje lokalne ekipe, bez kompliciranih i zbrkanih stranica za karte.",
    date: "December 19, 2025",
    avatar: "/images/avatar3.png",
  },
];

const ReviewCard = ({ review }: { review: Review }) => {
  const initials = review.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const displayDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#15202b] border border-white/10 rounded-none p-8 shadow-2xl ring-1 ring-white/10 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-white/5">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white/80 text-lg font-semibold">
              {initials}
            </span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium">{review.name}</h4>
            <span className="text-xs text-white/60">{displayDate}</span>
          </div>
          <div className="flex gap-1 mt-1 text-white/80">
            {Array.from({ length: review.rating }).map((_, i) => (
              <FaStar key={i} className="size-4" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-white/75 text-sm leading-relaxed">"{review.review}"</p>
    </div>
  );
};

export default function ReviewsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [latestReviews, setLatestReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await contentfulClient.getEntries({
        content_type: "review",
        order: ["-sys.createdAt"] as any,
      });

      // Handle both flattened and locale-keyed field values
      const getString = (val: any) =>
        typeof val === "string" ? val : (val?.["en-US"] ?? "");
      const getNumber = (val: any) =>
        typeof val === "number" ? val : Number(val?.["en-US"] ?? 0);

      const reviews: Review[] = response.items.map((item: any) => ({
        id: item.sys.id,
        name: getString(item.fields?.name),
        rating: getNumber(item.fields?.rating),
        review: getString(item.fields?.review),
        date: getString(item.fields?.date) || item.sys.createdAt,
      }));

      setLatestReviews(reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSuccess = async (newReview: Review) => {
    // Add the new review immediately to the state (optimistic update)
    setLatestReviews((prev) => [newReview, ...prev]);
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#192734]">
      <Navigation />

      {/* Latest Reviews */}
      <section className="-mt-6 w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Latest reviews
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/75 text-center px-4">
              Real experiences from fans who discovered and attended live sports
              events through our platform.
            </p>
          </div>

          {isLoading && (
            <div className="mt-12 text-center text-white/60">
              <p>Loading reviews...</p>
            </div>
          )}

          {error && (
            <div className="mt-12 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {latestReviews.length === 0 && previousReviews.length === 0 ? (
                <div className="mt-12 text-center text-white/60">
                  <p>No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="mt-12 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                  {(showAll
                    ? [...latestReviews, ...previousReviews]
                    : [...latestReviews, ...previousReviews].slice(0, 3)
                  ).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </>
          )}

          {!isLoading &&
            !error &&
            latestReviews.length + previousReviews.length > 3 && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-none bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
                >
                  {showAll ? "Show less" : "Show all reviews"}
                </button>
              </div>
            )}

          {/* Share your experience CTA */}
          <div className="mt-14 px-6 py-10 md:px-10 md:py-12 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Share your experience
            </h3>
            <p className="mt-4 text-base text-white/75 max-w-2xl mx-auto px-4">
              Had a great time at an event? Leave a short review to help other
              fans decide.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    router.push("/login");
                    return;
                  }
                  setReviewModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-none bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Write a review
              </button>
            </div>
          </div>
        </div>
      </section>

      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSuccess={handleReviewSuccess}
      />
    </main>
  );
}
