import { Navigation } from "@components/navigation";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#192734]">
      <Navigation />

      {/* All content between navbar and footer */}
      <section className="-mt-6 w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          {/* HERO */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Bringing fans closer to the game
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-white/75">
              We make discovering, comparing, and attending live sports events
              simple — all in one place.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {/* MISSION */}
            <div className="border border-white/10 bg-[#22303c] p-8 text-center">
              <h2 className="text-xl font-medium text-white">Our mission</h2>
              <p className="mt-4 text-sm text-white/75 whitespace-nowrap overflow-x-auto flex justify-center">
                Create a single, user-friendly destination where sports fans can easily discover events, compare options, and purchase tickets with confidence.
              </p>
            </div>

            {/* WHAT WE DO */}
            <div className="border border-white/10 bg-[#22303c] p-8">
              <div className="text-center">
                <h2 className="text-xl font-medium text-white">What we do</h2>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white/75">Discover events</h3>
                  <p className="mt-2 text-sm text-white/75">
                    Browse a wide range of upcoming sports events including
                    football, basketball, and more — all in one place.
                  </p>
                </div>

                <div className="border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white/75">Compare & decide</h3>
                  <p className="mt-2 text-sm text-white/75">
                    Compare events by date, location, teams, and price to make
                    informed decisions quickly and easily.
                  </p>
                </div>

                <div className="border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white/75">Buy tickets</h3>
                  <p className="mt-2 text-sm text-white/75">
                    Purchase tickets securely and confidently through our trusted
                    platform.
                  </p>
                </div>
              </div>
            </div>

            {/* WHY CHOOSE US */}
            <div className="border border-white/10 bg-[#22303c] p-8 text-center">
              <h2 className="text-xl font-medium text-white">Why choose us</h2>
              <div className="mt-6 grid gap-4 text-sm text-white/75 sm:grid-cols-2">
                <div className="border border-white/10 bg-white/5 p-5">
                  <span>Centralized platform for all sports</span>
                </div>

                <div className="border border-white/10 bg-white/5 p-5">
                  <span>Detailed event information</span>
                </div>

                <div className="border border-white/10 bg-white/5 p-5">
                  <span>Easy-to-use filters and maps</span>
                </div>

                <div className="border border-white/10 bg-white/5 p-5">
                  <span>Secure ticket purchasing</span>
                </div>

                <div className="border border-white/10 bg-white/5 p-5">
                  <span>Designed for fans, tourists, and casual attendees</span>
                </div>

                <div className="border border-white/10 bg-white/5 p-5">
                  <span>
                    Personalized recommendations for your favorite sports and
                    teams.
                  </span>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="border border-white/10 bg-[#22303c] p-8 text-center">
                <div className="text-3xl font-extrabold tracking-tight text-white">
                  100+
                </div>
                <div className="mt-1 text-sm text-white/75">Events listed</div>
              </div>
              <div className="border border-white/10 bg-[#22303c] p-8 text-center">
                <div className="text-3xl font-extrabold tracking-tight text-white">
                  20+
                </div>
                <div className="mt-1 text-sm text-white/75">Sports covered</div>
              </div>
              <div className="border border-white/10 bg-[#22303c] p-8 text-center">
                <div className="text-3xl font-extrabold tracking-tight text-white">
                  10K+
                </div>
                <div className="mt-1 text-sm text-white/75">Happy fans</div>
              </div>
            </div>

            {/* CTA */}
            <div className="border border-white/10 bg-[#22303c] p-8 text-center">
              <h2 className="text-xl font-medium text-white">
                Ready to experience live sports?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75">
                Explore upcoming events and secure your tickets today.
              </p>
              <div className="mt-6">
                <Link
                  href="/events"
                  className="inline-flex h-10 items-center justify-center rounded-none bg-white/10 px-6 text-[15px] font-medium text-white transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Browse events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
