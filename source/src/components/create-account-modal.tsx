"use client";

import { useEffect, useId, useRef, useState } from "react";
import { signup } from "@/app/actions/auth";

type CreateAccountModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateAccountModal({ open, onClose }: CreateAccountModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    // Focus the dialog panel for accessibility.
    queueMicrotask(() => panelRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Success - the redirect will happen automatically
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-[92vw] max-w-2xl rounded-xl bg-white shadow-2xl ring-1 ring-black/10"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200">
          <h2 id={titleId} className="text-2xl font-bold text-slate-900">
            Create account
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                autoComplete="given-name"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                autoComplete="family-name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                autoComplete="email"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password *"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                autoComplete="new-password"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-md bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
