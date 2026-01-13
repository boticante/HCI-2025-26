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
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-lg p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-slate-900 mb-6 text-center text-3xl font-bold">
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
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
              className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
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
              className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-700">
          New to TicketTaka?{" "}
          <button
            type="button"
            className="underline"
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
