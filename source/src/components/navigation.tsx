"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const navItems = ["HOME", "EVENTS", "ABOUT US", "CONTACT", "REVIEWS"];

const pathMap: Record<string, string> = {
  HOME: "/",
  EVENTS: "/events",
  "ABOUT US": "/about",
  CONTACT: "/contact",
  REVIEWS: "/reviews",
  SIGNIN: "/login",
};

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCurrentPageName = () => {
    for (const [name, path] of Object.entries(pathMap)) {
      if (pathname === path) return name;
    }
    return "HOME";
  };

  const currentPage = getCurrentPageName();

  const handleNavigate = (item: string) => {
    const path = pathMap[item];
    if (path) {
      router.push(path);
      setMobileMenuOpen(false);
    }
  };

  return (
	<nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white mb-6">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavigate("HOME")}
            className="text-2xl text-indigo-700"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            TICKET-TAKA
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                className={`text-sm transition-colors ${
                  currentPage === item
                    ? "text-indigo-700 border-b-2 border-indigo-700 pb-1"
                    : "text-slate-700 hover:text-indigo-700"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={() => handleNavigate("SIGNIN")}
              className="text-sm text-slate-700 hover:text-indigo-700 transition-colors px-6 py-2 border border-slate-300 rounded-md hover:border-indigo-700"
            >
              LOGIN
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-indigo-700"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                className={`text-sm text-left py-2 transition-colors ${
                  currentPage === item
                    ? "text-indigo-700"
                    : "text-slate-700 hover:text-indigo-700"
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => handleNavigate("SIGNIN")}
              className="text-sm text-left py-2 text-slate-700 hover:text-indigo-700 transition-colors"
            >
              LOGIN
            </button>
          </nav>
        )}
      </div>
    </nav>
  );
}
