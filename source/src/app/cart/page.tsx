"use client";

import { Navigation } from "@/components/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { FaShoppingCart } from "react-icons/fa";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  const subtotal = getTotal();
  const serviceFee = items.length > 0 ? subtotal * 0.08 : 0;
  const total = subtotal + serviceFee;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#192734]">
      <Navigation />

      <section className="-mt-6 w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">

          {/* Grid Layout */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.4fr_.9fr] gap-8 items-start">
            {/* LEFT: Cart Items */}
            <div className="border border-white/10 bg-[#15202b] rounded-none shadow-2xl overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between gap-3 border-b border-white/10 bg-[#15202b]">
                <div className="flex items-center gap-3 font-extrabold text-white">
                  Tickets in your cart
                  <small className="font-semibold text-white/55 border border-white/10 px-2.5 py-1 rounded-none bg-white/5 text-xs">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </small>
                </div>
                {items.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-white/75 text-sm border border-white/10 px-3 py-2 rounded-none bg-white/5 hover:bg-white/10 hover:border-white/15 transition-colors"
                  >
                    Clear cart
                  </button>
                )}
              </div>

              <div className="px-5 py-4">
                {items.length === 0 ? (
                  <div className="py-12 text-center">
                    <FaShoppingCart className="w-16 h-16 mx-auto mb-4 text-white/20" />
                    <p className="text-white/75 text-lg font-semibold mb-2">Your cart is empty</p>
                    <p className="text-white/55 text-sm mb-6">Browse events and add tickets to your cart to checkout.</p>
                    <button
                      onClick={() => router.push("/events")}
                      className="inline-flex items-center justify-center gap-2 rounded-none bg-indigo-700 hover:bg-indigo-800 px-6 py-3 font-bold text-white transition-colors duration-150"
                    >
                      Browse events
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <path d="M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {items.map((item) => {
                      const eventDate = new Date(item.event.date);
                      const monthShort = eventDate.toLocaleDateString("en-US", { month: "short" });
                      const day = eventDate.getDate();
                      const year = eventDate.getFullYear();

                      return (
                        <article key={item.event.id} className="relative flex flex-col bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                          {/* Remove Button - Top Right */}
                          <button 
                            onClick={() => removeFromCart(item.event.id)}
                            className="absolute top-3 right-3 z-10 text-white/60 hover:text-white text-xl transition-colors"
                          >
                            ✕
                          </button>

                          {/* Main Event Row */}
                          <div className="flex flex-col sm:flex-row items-stretch">
                            {/* Date Box */}
                            <div className="hidden sm:flex sm:flex-col items-center justify-center bg-indigo-700 text-white p-6 w-24 gap-0">
                              <div className="text-center">
                                <div className="text-sm font-medium uppercase">{monthShort}</div>
                                <div className="text-3xl font-bold leading-tight">{day}</div>
                                <div className="text-xs opacity-90">{year}</div>
                              </div>
                              <div className="mt-3 pt-3 border-t border-white/30">
                                <div className="text-sm font-medium">{item.event.time}</div>
                              </div>
                            </div>

                            {/* Mobile Date Display */}
                            <div className="sm:hidden flex items-center justify-center bg-indigo-700 text-white px-4 py-3">
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div className="text-xs font-medium uppercase mb-1">{monthShort}</div>
                                  <div className="text-2xl font-bold leading-tight">{day}</div>
                                  <div className="text-xs text-white/75 mt-1">{year}</div>
                                </div>
                                <div className="h-10 w-px bg-white/30"></div>
                                <div className="text-sm font-medium">{item.event.time}</div>
                              </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex-1 p-6 flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="text-xs text-white font-semibold uppercase tracking-wide">
                                  {item.event.category}
                                </div>
                                <span className="text-xs text-white/60">{item.event.sport}</span>
                              </div>
                              <h3 className="text-lg font-bold text-white mb-2">{item.event.title}</h3>
                              <div className="flex items-start gap-2 text-sm text-white/60">
                                <svg className="w-4 h-4 mt-0.5 shrink-0 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{item.event.venue}</span>
                              </div>
                            </div>                            {/* Vertical Divider */}
                            <div className="hidden sm:block w-px bg-white/10"></div>

                            {/* Price and Actions */}
                            <div className="flex flex-col items-center justify-center gap-3 p-6 sm:p-4 sm:px-6 shrink-0">
                              <div className="text-center">
                                <div className="text-xs text-white/55 mb-1">
                                  Per ticket
                                </div>
                                <div className="text-2xl font-black text-white">€{(item.event.price * item.quantity).toFixed(2)}</div>
                                <div className="text-xs text-white/55 mt-1">
                                  {item.quantity > 1 ? `${item.quantity} × €${item.event.price.toFixed(2)}` : ''}
                                </div>
                              </div>

                              {/* Quantity Selector - matching events page */}
                              <div className="flex items-center gap-2 px-3 py-2 rounded-none border border-white/15 bg-white/5">
                                <button
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      updateQuantity(item.event.id, item.quantity - 1);
                                    }
                                  }}
                                  className="text-white hover:text-white/60 transition-colors text-lg font-semibold"
                                >
                                  −
                                </button>
                                <span className="text-white text-base font-semibold w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => {
                                    if (item.quantity < 10) {
                                      updateQuantity(item.event.id, item.quantity + 1);
                                    }
                                  }}
                                  className="text-white hover:text-white/60 transition-colors text-lg font-semibold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}

                {items.length > 0 && (
                  <div className="mt-3 text-white/75 text-xs">
                    Tickets are sent to your email and available in your account right after payment.
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Summary */}
            <aside className="border border-white/10 bg-[#15202b] rounded-none shadow-2xl overflow-hidden sticky top-32 self-start">
              <div className="px-5 py-4 flex items-center justify-between gap-3 border-b border-white/10 bg-[#15202b]">
                <div className="font-extrabold text-white">Order summary</div>
              </div>

              <div className="px-5 py-4">
                <div className="flex justify-between items-center py-2.5 text-white/75 text-sm">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 text-white/75 text-sm">
                  <span>Service fees</span>
                  <span>€{serviceFee.toFixed(2)}</span>
                </div>

                <div className="h-px bg-white/10 my-2"></div>

                <div className="flex justify-between items-center py-2.5 text-white text-sm">
                  <strong className="font-black">Total</strong>
                  <strong className="font-black">€{total.toFixed(2)}</strong>
                </div>

                {/* Checkout button */}
                <div className="mt-3.5">
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-none bg-indigo-700 hover:bg-indigo-800 px-6 py-3 font-bold text-white transition-colors duration-150">
                    Proceed to checkout
                  </button>
                </div>

                <div className="mt-3 text-white/55 text-xs text-center">
                  By checking out, you agree to our Terms & Refund Policy.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
