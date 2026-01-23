"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/user-context";
import { SignOutButton } from "./sign-out-button";
import { FaChevronDown, FaShoppingCart } from "react-icons/fa";

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
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const prevPathnameRef = useRef<string | null>(null);

  // Track pathname changes
  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);

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
  const isOnAccountPage = pathname === "/purchase-history";
  const isOnCartPage = pathname === "/cart";

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
            onClick={scrollToTop}
            className="inline-flex flex-col items-center gap-1.5 py-1 hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
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
                  <div className="relative">
                    <button
                      onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                      className={`${navItemClass} flex items-center gap-2 ${
                        isOnAccountPage ? navItemActiveClass : ""
                      }`}
                      type="button"
                    >
                      My Account
                      <FaChevronDown
                        className={`size-3 transition-transform ${
                          accountMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {accountMenuOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#15202b] border border-white/10 rounded-none shadow-lg z-50 dropdown-animate">
                        <button
                          onClick={() => {
                            router.push("/purchase-history");
                            setAccountMenuOpen(false);
                          }}
                          className="text-center px-4 py-2.5 text-white/85 hover:bg-white/10 hover:text-white transition-colors text-[15px] block w-full"
                        >
                          Purchase history
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
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
                  <FaShoppingCart className="size-4" />
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
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4 dropdown-animate">
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
                  <div>
                    <button
                      onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                      className={`${navItemClass} justify-start flex items-center gap-2 ${
                        isOnAccountPage ? navItemActiveClass : ""
                      }`}
                      type="button"
                    >
                      My Account
                      <FaChevronDown
                        className={`size-3 transition-transform ${
                          accountMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {accountMenuOpen && (
                      <div className="mt-2 ml-4 flex flex-col gap-2 bg-white/5 border border-white/10 rounded-none whitespace-nowrap dropdown-animate">
                        <button
                          onClick={() => {
                            router.push("/purchase-history");
                            setAccountMenuOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          className="text-center px-4 py-2.5 text-white/85 hover:bg-white/10 hover:text-white transition-colors text-[15px] block w-full"
                        >
                          Purchase history
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
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
                  <FaShoppingCart className="size-4" />
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
