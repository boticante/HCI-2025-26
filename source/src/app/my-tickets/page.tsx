"use client";

import { Navigation } from "@/components/navigation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/context/user-context";
import { createClient } from "@/lib/supabase/client";
import { FaChevronDown } from "react-icons/fa";
import QRCode from "qrcode";

interface PurchasedTicket {
  id: string;
  purchased_at: string;
  quantity: number;
  ticket_type: string;
  event_id: string;
  event_title: string;
  event_sport: string;
  event_venue: string;
  event_date: string;
  event_time: string | null;
  event_price: number;
  event_category: string;
}

export default function MyTicketsPage() {
  const { user } = useUser();
  const supabaseRef = useRef(createClient());
  const [tickets, setTickets] = useState<PurchasedTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});
  const [openedTickets, setOpenedTickets] = useState<string[]>([]);
  const [revealedTickets, setRevealedTickets] = useState<string[]>([]);
  const [mobileQrTicketId, setMobileQrTicketId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const loadTickets = async () => {
      if (!user) {
        setTickets([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setLoadError(null);

      const { data, error } = await supabaseRef.current
        .from("tickets")
        .select("*")
        .eq("user_id", user.id)
        .order("event_date", { ascending: true });

      if (error) {
        setLoadError("Unable to load tickets. Please try again.");
        setIsLoading(false);
        return;
      }

      setTickets((data ?? []) as PurchasedTicket[]);
      setIsLoading(false);
    };

    loadTickets();
  }, [user]);

  useEffect(() => {
    const buildQrCodes = async () => {
      const entries = await Promise.all(
        tickets.map(async (ticket) => {
          const payload = `ticket:${ticket.id}`;
          const dataUrl = await QRCode.toDataURL(payload, {
            width: 160,
            margin: 1,
          });
          return [ticket.id, dataUrl] as const;
        }),
      );

      setQrCodes(Object.fromEntries(entries));
    };

    if (tickets.length > 0) {
      void buildQrCodes();
    } else {
      setQrCodes({});
    }
  }, [tickets]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const toggleTicketQr = (ticketId: string) => {
    // On mobile, only open the full-screen overlay (no dropdown)
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setMobileQrTicketId(ticketId);
      return;
    }

    // On desktop/tablet, toggle dropdown and reset blur when closing
    setOpenedTickets((prev) => {
      const isOpen = prev.includes(ticketId);
      if (isOpen) {
        setRevealedTickets((prevRevealed) =>
          prevRevealed.filter((id) => id !== ticketId),
        );
        return prev.filter((id) => id !== ticketId);
      }

      return [...prev, ticketId];
    });
  };

  const revealQrForTicket = (ticketId: string) => {
    setRevealedTickets((prev) =>
      prev.includes(ticketId) ? prev : [...prev, ticketId],
    );
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#192734]">
      <Navigation />

      {/* All content between navbar and footer */}
      <section className="-mt-6 w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          {/* Page title */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              My tickets
            </h1>
          </div>

          {/* Main content */}
          <div className="mt-12 relative">
            {/* Mobile full-screen QR overlay */}
            {mobileQrTicketId && qrCodes[mobileQrTicketId] && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm sm:hidden">
                <div className="bg-[#15202b] border border-white/15 px-6 py-6 rounded-none flex flex-col items-center gap-4 max-w-xs w-[85%]">
                  <div className="text-xs text-white/70 text-center">
                    Scan at entry. QR is unique to this ticket.
                  </div>
                  <img
                    src={qrCodes[mobileQrTicketId]}
                    alt="Ticket QR code"
                    className="h-60 w-60 border border-white/10 bg-white p-3"
                  />
                  <button
                    type="button"
                    onClick={() => setMobileQrTicketId(null)}
                    className="mt-1 px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {isLoading ? null : loadError ? (
              <div className="border border-white/10 bg-[#22303c] p-8">
                <p className="text-red-300 text-center">{loadError}</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="border border-white/10 bg-[#22303c] p-8">
                <p className="text-white/60 text-center">No purchases yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {tickets.map((ticket) => {
                  const eventDate = new Date(ticket.event_date);
                  const monthShort = eventDate.toLocaleDateString("en-US", {
                    month: "short",
                  });
                  const day = eventDate.getDate();
                  const year = eventDate.getFullYear();

                  const timeLabel = ticket.event_time ?? "Time TBA";

                  return (
                    <article
                      key={ticket.id}
                      className="flex flex-col bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                    >
                      {/* Main Row - mirrors Events page */}
                      <div className="flex flex-col sm:flex-row items-stretch">
                        {/* Date Box */}
                        <div className="hidden sm:flex sm:flex-col items-center justify-center bg-indigo-700 text-white p-6 w-24 gap-0">
                          <div className="text-center">
                            <div className="text-sm font-medium uppercase">
                              {monthShort}
                            </div>
                            <div className="text-3xl font-bold leading-tight">
                              {day}
                            </div>
                            <div className="text-xs opacity-90">{year}</div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-white/30">
                            <div className="text-sm font-medium">
                              {timeLabel}
                            </div>
                          </div>
                        </div>

                        {/* Mobile Date Display */}
                        <div className="sm:hidden flex items-center justify-center bg-indigo-700 text-white px-4 py-3">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-xs font-medium uppercase mb-1">
                                {monthShort}
                              </div>
                              <div className="text-2xl font-bold leading-tight">
                                {day}
                              </div>
                              <div className="text-xs text-white/75 mt-1">
                                {year}
                              </div>
                            </div>
                            <div className="h-10 w-px bg-white/30"></div>
                            <div className="text-sm font-medium">{timeLabel}</div>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 p-6 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-xs text-white font-semibold uppercase tracking-wide">
                              {ticket.event_category}
                            </div>
                            <span className="text-xs text-white/60">
                              {ticket.event_sport}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1">
                            {ticket.event_title}
                          </h3>
                          <div className="flex items-start gap-2 text-sm text-white/60">
                            <svg
                              className="w-4 h-4 mt-0.5 shrink-0 text-white/40"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>{ticket.event_venue}</span>
                          </div>
                        </div>

                        {/* Right Section: quantity, purchase date + Show QR code button */}
                        <div className="flex items-center justify-center sm:justify-end gap-4 p-6 sm:p-4 shrink-0">
                          <div className="flex flex-col items-center mr-1 text-center">
                            <div className="text-xs text-white/60">Tickets</div>
                            <div className="text-2xl font-black text-white">
                              {ticket.quantity}
                            </div>
                            <div className="text-[11px] text-white/60 mt-1">
                              Purchased {formatDate(ticket.purchased_at)} at{" "}
                              {formatTime(ticket.purchased_at)}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleTicketQr(ticket.id)}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-indigo-700 hover:bg-indigo-800 text-white font-bold transition-colors whitespace-nowrap text-sm"
                          >
                            Show QR code
                            <FaChevronDown
                              className={`hidden sm:inline-block size-4 transition-transform ${
                                openedTickets.includes(ticket.id)
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Expanded QR Section - desktop/tablet dropdown */}
                      {qrCodes[ticket.id] &&
                        openedTickets.includes(ticket.id) && (
                          <div className="border-t border-white/10 dropdown-animate hidden sm:block">
                            <div className="p-5 flex flex-col gap-4 items-center justify-center">
                              <div className="text-xs text-white/60 text-center">
                                Scan at entry. QR is unique to this ticket.
                              </div>
                              <div className="relative">
                                <img
                                  src={qrCodes[ticket.id]}
                                  alt="Ticket QR code"
                                  className={`h-40 w-40 border border-white/10 bg-white p-3 transition-filter duration-200 ${
                                    revealedTickets.includes(ticket.id)
                                      ? ""
                                      : "blur-md"
                                  }`}
                                />
                                {!revealedTickets.includes(ticket.id) && (
                                  <button
                                    type="button"
                                    onClick={() => revealQrForTicket(ticket.id)}
                                    className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tracking-wide uppercase text-white/90"
                                  >
                                    <span className="px-4 py-2 bg-black/70 border border-white/40 rounded-none">
                                      Click to reveal
                                    </span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
