import { Navigation } from "../../components/navigation";
import { getEvents } from "../../lib/events";
import type { Event } from "../../types/event";
import Link from "next/link";

interface EventsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 12;

  const { events, total, page } = await getEvents(currentPage, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-[#192734] pb-12">
      <Navigation />
      <div className="w-full max-w-7xl px-6">
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {events.map((event:Event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
                  {event.sport}
                </span>
                <span className="text-2xl font-bold text-green-600">
                  €{event.price}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-2 line-clamp-2 text-black">
                {event.title}
              </h2>

              {event.homeTeam && event.awayTeam && (
                <p className="text-gray-700 mb-2">
                  {event.homeTeam} vs {event.awayTeam}
                </p>
              )}

              <div className="space-y-1 text-sm text-gray-600">
                <p>📍 {event.venue}</p>
                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                <p>🏙️ {event.location}</p>
              </div>

              <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                {event.description}
              </p>

              <button className="mt-auto w-full bg-blue-600 text-black py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            {page > 1 && (
              <Link
                href={`/events?page=${page - 1}`}
                className="px-4 py-2 border rounded text-white hover:bg-gray-100 hover:text-slate-900"
              >
                Previous
              </Link>
            )}

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/events?page=${pageNum}`}
                    className={`px-4 py-2 border rounded ${
                      pageNum === page
                        ? "bg-blue-600 text-white"
                        : "text-white hover:bg-gray-100 hover:text-slate-900"
                    }`}
                  >
                    {pageNum}
                  </Link>
                )
              )}
            </div>

            {page < totalPages && (
              <Link
                href={`/events?page=${page + 1}`}
                className="px-4 py-2 border rounded text-white hover:bg-gray-100 hover:text-slate-900"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
