import { Navigation } from "@components/navigation";

export default function ReviewsPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#192734]">
      <Navigation />

      {/* All content between navbar and footer */}
      <section className="-mt-6 w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              What fans say
            </h1>
            <p className="mx-auto mt-8 text-base text-white/75 text-center">
              Real experiences from fans who discovered and attended live sports events through our platform.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
