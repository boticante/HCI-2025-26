"use client";

import { Navigation } from "@components/navigation";
import { useState, useEffect, useRef } from "react";
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
      highlight: "is closer",
      body: "Secure. Smooth. Stress-free. Get tickets and game-day details instantly.",
      cta: "Get your ticket",
    },
    {
      title: "Beyond\nthe main stage.",
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
  const rotationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRotation = () => {
    if (rotationRef.current) clearInterval(rotationRef.current);
    rotationRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
  };

  // Auto-rotate slides every 10 seconds
  useEffect(() => {
    startRotation();
    return () => {
      if (rotationRef.current) clearInterval(rotationRef.current);
    };
  }, [heroSlides.length]);

  const handleSelectSlide = (idx: number) => {
    setActiveSlide(idx);
    startRotation();
  };

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
        className="relative -mt-6 w-full bg-[#192734] flex items-start justify-center px-5 py-10 pt-28 lg:py-14 lg:pt-32 lg:min-h-screen"
      >
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center gap-4">
          {/* Left Arrow Button - Desktop Only */}
          <button
            onClick={() => handleSelectSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)}
            className="hidden lg:flex items-center justify-center w-12 h-12 bg-[#15202b] hover:bg-[#1a2733] border border-white/10 hover:border-white/20 text-white transition-all shrink-0"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-full max-w-5xl min-h-[430px] lg:h-[430px] bg-[#15202b] border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between gap-6 lg:gap-7 px-6 py-10 lg:px-14 lg:py-14">
            {/* Title + Description */}
            <div key={activeSlide} className="max-w-3xl text-center lg:text-left w-full lg:w-auto animate-fade-in">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tighter text-white leading-tight mb-4 lg:mb-5 max-w-2xl mx-auto lg:mx-0">
                {renderTitleWithHighlight(heroSlides[activeSlide].title, heroSlides[activeSlide].highlight)}
              </h1>
            </div>

            {/* Button */}
            <div key={`btn-${activeSlide}`} className="flex-shrink-0 flex items-center justify-center lg:justify-end w-full lg:w-auto lg:min-w-56 mt-2 lg:mt-0 animate-fade-in">
              <a
                href="/events"
                className="inline-flex items-center justify-center bg-indigo-700 hover:bg-indigo-800 px-6 py-3 font-bold text-white transition-colors duration-150 w-40 whitespace-nowrap"
              >
                {heroSlides[activeSlide].cta}
              </a>
            </div>

            {/* Bottom-Left: Pager */}
            <div className="absolute left-6 lg:left-14 bottom-6 lg:bottom-7 flex gap-3.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Show slide ${idx + 1}`}
                  onClick={() => handleSelectSlide(idx)}
                  className={`w-3 h-3 border transition-all duration-150 ${
                    activeSlide === idx
                      ? "bg-indigo-600 border-white/25 opacity-100"
                      : "bg-transparent border-white/35 opacity-55 hover:opacity-75"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Arrow Button - Desktop Only */}
          <button
            onClick={() => handleSelectSlide((activeSlide + 1) % heroSlides.length)}
            className="hidden lg:flex items-center justify-center w-12 h-12 bg-[#15202b] hover:bg-[#1a2733] border border-white/10 hover:border-white/20 text-white transition-all shrink-0"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
      <section className="w-full bg-[#22303c] flex items-center justify-center py-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          <div
            className="relative w-full overflow-hidden border border-white/10 shadow-2xl bg-[#15202b]"
          >
            <div className="relative p-10 md:p-12 lg:p-14 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-7 items-start">
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Get tickets. Fast.
                  </h2>
                  <p className="text-base text-white/75 max-w-2xl mx-auto lg:mx-0">
                    Discover events and buy tickets instantly.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
                  <a
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 rounded-none bg-indigo-700 hover:bg-indigo-800 px-6 py-3 font-bold text-white transition-colors duration-150"
                  >
                    Browse events
                  </a>
                  <a
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-none border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-white/15 hover:border-white/25"
                  >
                    How it works
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="rgba(255,255,255,.9)" strokeWidth="2" />
                      <path d="M12 8v5" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 16h.01" stroke="rgba(255,255,255,.9)" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" role="list">
                {[{
                  icon: "→",
                  title: "Instant tickets",
                  body: "Checkout is fast and your tickets arrive instantly on your phone — no printing, no waiting, no stress.",
                }, {
                  icon: "✓",
                  title: "Safe & secure",
                  body: "Secure checkout and clear order details so you always know what you’re buying and who it’s from.",
                }, {
                  icon: "—",
                  title: "No hidden fees",
                  body: "Transparent totals up front. What you see is what you pay — no surprise fees at the last step.",
                }, {
                  icon: "○",
                  title: "Discover more",
                  body: "Find hidden gems and must-see events you might miss elsewhere, curated to match your interests.",
                }].map((card) => (
                  <article
                    key={card.title}
                    className="relative overflow-hidden rounded-none border border-white/10 bg-[#22303c] p-5 transition-transform duration-150 hover:-translate-y-0.5 hover:border-white/20 flex flex-col"
                    role="listitem"
                  >
                    <div className="mb-3">
                      <div className="font-semibold text-white text-center md:text-left">
                        {card.title}
                      </div>
                    </div>
                    <p className="text-sm text-white/75 leading-relaxed w-full">{card.body}</p>
                  </article>
                ))}
              </div>
            </div>
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

                <p className="text-white/75 text-sm leading-relaxed">
                  "{t.comment}"
                </p>
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