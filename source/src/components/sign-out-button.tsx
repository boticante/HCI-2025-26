"use client";

import { useRouter } from "next/navigation";
import { signout } from "@/app/actions/auth";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className={className || "text-sm text-slate-700 hover:text-slate-900"}
    >
      SIGN OUT
    </button>
  );
}
