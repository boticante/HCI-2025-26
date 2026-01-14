"use client";

import { useState } from "react";
import { CreateAccountModal } from "@components/create-account-modal";
import { login } from "@/app/actions/auth";

export function LoginForm() {
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-[#15202b] border border-white/10 rounded-none p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-white mb-6 text-center text-3xl font-bold">
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-none bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

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
              required
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-none border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-none bg-white/10 px-4 py-3 font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
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
      />
    </>
  );
}
