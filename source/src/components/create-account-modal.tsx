"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type CreateAccountModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function CreateAccountModal({ open, onClose, onSuccess }: CreateAccountModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    // Client-side validation with specific error messages
    if (!firstName?.trim()) {
      setError("First name is required");
      setLoading(false);
      return;
    }
    if (!lastName?.trim()) {
      setError("Last name is required");
      setLoading(false);
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // Sign up the user
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    if (onSuccess) {
      onSuccess();
    } else {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-[92vw] max-w-2xl rounded-none bg-[#15202b] shadow-2xl ring-1 ring-white/10 modal-panel-animate"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <h2 id={titleId} className="text-2xl font-bold text-white">
            Create an account
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-none p-2 text-white/70 hover:text-white focus:outline-none"
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
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
                autoComplete="given-name"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
                autoComplete="family-name"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
                autoComplete="email"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-none bg-white/10 px-4 py-3 font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {error && (
              <p className="mt-2 text-sm text-red-300 text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
