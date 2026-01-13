"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@components/footer";

export function FooterConditional() {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return <Footer />;
}
