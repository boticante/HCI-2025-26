"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef, Fragment } from "react";
import { useUser } from "@/context/user-context";
import { useCart } from "@/context/cart-context";
import { SignOutButton } from "./sign-out-button";
import { FaShoppingCart } from "react-icons/fa";

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
  const { items } = useCart();
  const navRef = useRef<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prevPathnameRef = useRef<string | null>(null);

  // Track pathname changes
  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCurrentPageName = () => {
    for (const [name, path] of Object.entries(pathMap)) {
      if (path === "/" && pathname === "/") return name;
      if (
        path !== "/" &&
        (pathname === path || pathname.startsWith(`${path}/`))
      )
        return name;
    }
    return null;
  };

  const currentPage = getCurrentPageName();
  const showAccount = Boolean(user);
  const isOnAccountPage = pathname === "/my-tickets";
  const isOnCartPage = pathname === "/cart";

  const handleNavigate = (item: string) => {
    const path = pathMap[item];
    if (path) {
      router.push(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#15202b] mb-6">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={() => router.push("/")}
            className="inline-flex flex-col items-center gap-1.5 py-1 hover:opacity-80 transition-opacity"
            aria-label="Go to homepage"
          >
            <img
              src="/images/logo.png"
              alt="Ticket-taka logo"
              className="h-12 w-auto"
              loading="lazy"
              decoding="async"
            />
            <span className="text-base font-semibold tracking-tight text-white">
              Ticket-taka
            </span>
          </button>

          <nav
            className="hidden lg:flex flex-1 items-center justify-center gap-10"
            aria-label="Primary"
          >
            {navItems.map(({ key, label }) => (
              <Fragment key={key}>
                <button
                  onClick={() => handleNavigate(key)}
                  className={`${navItemClass} ${
                    currentPage === key ? navItemActiveClass : ""
                  }`}
                  aria-current={currentPage === key ? "page" : undefined}
                >
                  {label}
                </button>
                {showAccount && key === "CONTACT" && (
                  <button
                    className={`${navItemClass} ${
                      isOnAccountPage ? navItemActiveClass : ""
                    }`}
                    type="button"
                    onClick={() => router.push("/my-tickets")}
                  >
                    My Tickets
                  </button>
                )}
              </Fragment>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {loading ? (
              <div className="h-10 w-20" />
            ) : showAccount ? (
              <>
                <button
                  className={`${navItemClass} flex items-center gap-3 ${
                    isOnCartPage ? navItemActiveClass : ""
                  }`}
                  type="button"
                  onClick={() => router.push("/cart")}
                >
                  <FaShoppingCart className={`size-4 ${
                    items.length > 0 ? "text-indigo-600" : ""
                  }`} />
                  Cart
                </button>
                <SignOutButton className={navItemClass} />
              </>
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
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
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
          <nav
            id="primary-navigation"
            className="lg:hidden mt-4 pb-4 flex flex-col gap-4 dropdown-animate"
            aria-label="Primary"
          >
            {navItems.map(({ key, label }) => (
              <Fragment key={key}>
                <button
                  onClick={() => handleNavigate(key)}
                  className={`${navItemClass} justify-start ${
                    currentPage === key ? navItemActiveClass : ""
                  }`}
                  aria-current={currentPage === key ? "page" : undefined}
                >
                  {label}
                </button>
                {showAccount && key === "CONTACT" && (
                  <button
                    className={`${navItemClass} justify-start ${
                      isOnAccountPage ? navItemActiveClass : ""
                    }`}
                    type="button"
                    onClick={() => {
                      router.push("/my-tickets");
                      setMobileMenuOpen(false);
                    }}
                  >
                    My Tickets
                  </button>
                )}
              </Fragment>
            ))}
            {loading ? (
              <div className="h-10 w-20" />
            ) : showAccount ? (
              <div className="flex flex-col gap-3">
                <button
                  className={`${navItemClass} justify-start flex items-center gap-3 ${
                    isOnCartPage ? navItemActiveClass : ""
                  }`}
                  type="button"
                  onClick={() => {
                    router.push("/cart");
                    setMobileMenuOpen(false);
                  }}
                >
                  <FaShoppingCart className={`size-4 ${
                    items.length > 0 ? "text-indigo-600" : ""
                  }`} />
                  Cart
                </button>
                <SignOutButton className={`${navItemClass} justify-start`} />
              </div>
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
