"use client";

import { Navigation } from "@/components/navigation";

export default function PurchaseHistoryPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#192734]">
      <Navigation />

      {/* All content between navbar and footer */}
      <section className="-mt-6 w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          {/* Page title */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Purchase History
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-white/75">
              View your past ticket purchases and event history.
            </p>
          </div>

          {/* Main content */}
          <div className="mt-12">
            <div className="border border-white/10 bg-[#22303c] p-8">
              <p className="text-white/60 text-center">No purchases yet</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
