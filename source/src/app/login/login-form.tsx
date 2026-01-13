"use client";

import { useState } from "react";
import { CreateAccountModal } from "@components/create-account-modal";

export function LoginForm() {
  const [createAccountOpen, setCreateAccountOpen] = useState(false);

  return (
    <>
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-lg p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-slate-900 mb-6 text-center text-3xl font-bold">
            Sign in
          </h1>
        </div>

        <div className="space-y-4">
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
            />
          </div>

          <button
            type="button"
            className="w-full rounded-md bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
            onClick={() => {
              // TODO: wire up real sign-in
            }}
          >
            Continue
          </button>
        </div>

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
