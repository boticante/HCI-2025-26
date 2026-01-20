"use client";

import { Navigation } from "@components/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  const heroSlides = [
    {
      title: "Where passion\nmeets live action",
      highlight: "live action",
      body: "Action. Passion. Unforgettable. Discover events you'll actually remember.",
      cta: "Browse events",
    },
    {
      title: "Find your\nnext big match",
      highlight: "big match",
      body: "Fast. Simple. Reliable. Compare events and book in minutes.",
      cta: "See upcoming",
    },
    {
      title: "Your seat is closer\nthan you think",
      highlight: "closer",
      body: "Secure. Smooth. Stress-free. Get tickets and game-day details instantly.",
      cta: "Get your ticket",
    },
    {
      title: "Beyond the main stage.",
      highlight: "Beyond",
      body: "Hidden gems and must-see events waiting to be discovered.",
      cta: "Discover More",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Raphael",
      avatar: "/images/avatar1.png",
      rating: 5,
      comment:
        "Esta plataforma facilita muito minhas viagens — agora posso ver instantaneamente quais eventos esportivos locais estão acontecendo onde quer que eu esteja, com detalhes claros e compra de ingressos simples. Economiza muito tempo em comparação com ter que acessar vários sites.",
    },
    {
      id: 2,
      name: "Iva",
      avatar: "/images/avatar2.png",
      rating: 5,
      comment:
        "This app helps me find affordable sports events fast, and the clear pricing means no surprises at checkout. It’s perfect for planning fun outings with friends without wasting time or money.",
    },
    {
      id: 3,
      name: "Mate",
      avatar: "/images/avatar3.png",
      rating: 1,
      comment:
        "Obožavan koliko je sve jednostavno — sve nadolazeće utakmice, datumi, lokacije i karte su mi na jednome mistu, bez ikakvog nepotrebnog nereda. Napokon mogu bez muke pratiti svoje lokalne ekipe, bez kompliciranih i zbrkanih stranica za karte.",
    },
  ];

  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const [activeSlide, setActiveSlide] = useState(0);

  const renderTitleWithHighlight = (title: string, highlight: string) => {
    const lines = title.split('\n');
    return lines.map((line, lineIdx, arr) => {
      if (!highlight) {
        return (
          <span key={lineIdx}>
            {line}
            {lineIdx < arr.length - 1 && <br />}
          </span>
        );
      }
      const parts = line.split(new RegExp(`(${highlight})`, 'i'));
      return (
        <span key={lineIdx}>
          {parts.map((part, partIdx) =>
            part.toLowerCase() === highlight.toLowerCase() ?
              <span key={partIdx} className="text-indigo-700">{part}</span> :
              part
          )}
          {lineIdx < arr.length - 1 && <br />}
        </span>
      );
    });
  };

  const toggleReview = (id: number) => {
    setExpandedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="flex flex-col">
      <Navigation />

      <section 
        className="relative -mt-6 w-full min-h-screen bg-[#192734] flex items-start justify-center px-5 py-14 pt-32"
      >
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-[430px] bg-[#15202b] border border-white/10 shadow-2xl flex items-center justify-between gap-7 px-14 py-14">
            {/* Left: Title + Description */}
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tighter text-white leading-tight mb-5 max-w-2xl">
                {renderTitleWithHighlight(heroSlides[activeSlide].title, heroSlides[activeSlide].highlight)}
              </h1>
              <p className="text-base text-white/75 leading-relaxed max-w-lg">
                {heroSlides[activeSlide].body}
              </p>
            </div>

            {/* Right: Button */}
            <div className="flex-shrink-0 flex items-center justify-end min-w-56">
              <a
                href="/events"
                className="inline-flex items-center justify-center bg-indigo-700 hover:bg-indigo-800 px-6 py-3 font-bold text-white transition-colors duration-150 w-40 whitespace-nowrap"
              >
                {heroSlides[activeSlide].cta}
              </a>
            </div>

            {/* Bottom-Left: Pager */}
            <div className="absolute left-14 bottom-7 flex gap-3.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Show slide ${idx + 1}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-3 h-3 border transition-all duration-150 ${
                    activeSlide === idx
                      ? "bg-indigo-600 border-white/25 opacity-100"
                      : "bg-transparent border-white/35 opacity-55 hover:opacity-75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full min-h-screen bg-[#22303c]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Featured events</h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-white/75 text-center">Discover the most popular and upcoming sports events
            happening soon</p>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">What fans say</h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-white/75 text-center px-4">Real experiences from fans who discovered and attended live sports events through our platform.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-[#15202b] border border-white/10 rounded-none p-8 shadow-2xl ring-1 ring-white/10 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{t.name}</h4>
                    <div className="flex gap-1 mt-1 text-white/80">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <FaStar key={i} className="size-4" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop: full review */}
                <p className="hidden md:block text-white/75 text-sm leading-relaxed">
                  "{t.comment}"
                </p>

                {/* Mobile: truncated with button */}
                <div className="md:hidden">
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    "{expandedReviews.has(t.id)
                      ? t.comment
                      : `${t.comment.substring(0, 100)}...`}"
                  </p>
                  <button
                    onClick={() => toggleReview(t.id)}
                    className="w-full rounded-none bg-white/10 px-4 py-3 font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                  >
                    {expandedReviews.has(t.id) ? "Show Less" : "See Full Review"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 mb-12 text-center">
            <a
              href="/reviews"
              className="inline-flex items-center justify-center rounded-none bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
            >
              Browse all reviews
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}