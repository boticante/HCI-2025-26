"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { SignOutButton } from "./sign-out-button";

const navItems = [
  { key: "HOME", label: "Home" },
  { key: "EVENTS", label: "Events" },
  { key: "REVIEWS", label: "Reviews" },
  { key: "ABOUT US", label: "About Us" },
  { key: "CONTACT", label: "Contact" },
] as const;

const pathMap: Record<string, string> = {
  HOME: "/",
  EVENTS: "/events",
  "ABOUT US": "/about",
  CONTACT: "/contact",
  REVIEWS: "/reviews",
  SIGNIN: "/login",
};

const navItemClass =
  "inline-flex h-10 items-center px-4 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white";

const navItemActiveClass = "bg-white/12 text-white";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCurrentPageName = () => {
    for (const [name, path] of Object.entries(pathMap)) {
      if (path === "/" && pathname === "/") return name;
      if (path !== "/" && (pathname === path || pathname.startsWith(`${path}/`))) return name;
    }
    return "HOME";
  };

  const currentPage = getCurrentPageName();
  const showAccount = loading || Boolean(user);

  const handleNavigate = (item: string) => {
    const path = pathMap[item];
    if (path) {
      router.push(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#15202b] mb-6">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={() => handleNavigate("HOME")}
            className="inline-flex flex-col items-center gap-1.5 py-1"
          >
            <img 
              src="/images/logo.png" 
              alt="Ticket-taka logo" 
              className="h-12 w-auto"
            />
            <span className="text-base font-semibold tracking-tight text-white">
              Ticket-taka
            </span>
          </button>

          <nav className="hidden lg:flex flex-1 items-center justify-center gap-10">
            {navItems.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-10">
                <button
                  onClick={() => handleNavigate(key)}
                  className={`${navItemClass} ${
                    currentPage === key ? navItemActiveClass : ""
                  }`}
                >
                  {label}
                </button>
                {key === "CONTACT" && showAccount && (
                  <button className={navItemClass} type="button">
                    My Account
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            {showAccount ? (
              <SignOutButton className={navItemClass} />
            ) : (
              <button
                onClick={() => handleNavigate("SIGNIN")}
                className={`${navItemClass} ${
                  currentPage === "SIGNIN" ? navItemActiveClass : ""
                }`}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/85 hover:text-white"
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
            {navItems.map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-3">
                <button
                  onClick={() => handleNavigate(key)}
                  className={`${navItemClass} justify-start ${
                    currentPage === key ? navItemActiveClass : ""
                  }`}
                >
                  {label}
                </button>
                {key === "CONTACT" && showAccount && (
                  <button className={`${navItemClass} justify-start`} type="button">
                    My Account
                  </button>
                )}
              </div>
            ))}
            {showAccount ? (
              <SignOutButton className={`${navItemClass} justify-start`} />
            ) : (
              <button
                onClick={() => handleNavigate("SIGNIN")}
                className={`${navItemClass} justify-start ${
                  currentPage === "SIGNIN" ? navItemActiveClass : ""
                }`}
              >
                Sign In
              </button>
            )}
          </nav>
        )}
      </div>
    </nav>
  );
}
