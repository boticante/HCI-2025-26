"use client";

import { Navigation } from "@components/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Home() {
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

      <section className="-mt-6 w-full min-h-screen bg-[#192734] flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 -mt-12">
          <div className="grid gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Where passion<br /> meets 
                <span className="text-indigo-700"> live action</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-base lg:text-lg text-white/75 lg:mx-0 leading-relaxed">
                Action. Passion. Unforgettable.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/events"
                  className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-base font-semibold text-white w-full sm:w-auto"
                >
                  Browse Events
                </a>
              </div>
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
            <p className="mx-auto mt-8 max-w-2xl text-base text-white/75 text-center">Real experiences from fans who discovered and attended live sports events through our platform.</p>
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