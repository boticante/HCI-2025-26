"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  { title: "Events", path: "/events" },
  { title: "Reviews", path: "/reviews" },
  { title: "About us", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Login", path: "/login" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-center border-b border-gray-300 py-4 mb-6 bg-black/30 backdrop-blur-sm">
      <ul className="flex space-x-8 text-lg font-medium">
        {pages.map((page) => {
          const isActive = pathname === page.path;
          return (
            <li key={page.path}>
              <Link
                href={page.path}
                className={`transition-colors hover:text-blue-600 ${
                  isActive ? "text-blue-700 font-semibold underline" : "text-black-700"
                }`}
              >
                {page.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
