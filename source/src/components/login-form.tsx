"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateAccountModal } from "@components/create-account-modal";
import { createClient } from "@/lib/supabase/client";
import { useLoginModal } from "@/context/login-modal-context";

export function LoginForm() {
  const router = useRouter();
  const { closeLogin } = useLoginModal();
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email) || !password) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      closeLogin();
      router.refresh();
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-[#15202b] border border-white/10 rounded-none p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-white mb-6 text-center text-3xl font-bold">
            Sign In
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-none bg-white/10 px-4 py-3 font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>

          {error && (
            <p className="text-sm text-red-300 text-center">{error}</p>
          )}
        </form>

        <p className="mt-8 text-center text-sm text-white/70">
          New to TicketTaka?{" "}
          <button
            type="button"
            className="underline text-white hover:text-white/85"
            onClick={() => setCreateAccountOpen(true)}
          >
            Create an account
          </button>
        </p>
      </div>

      <CreateAccountModal
        open={createAccountOpen}
        onClose={() => setCreateAccountOpen(false)}
        onSuccess={() => {
          setCreateAccountOpen(false);
          closeLogin();
          router.refresh();
        }}
      />
    </>
  );
}
