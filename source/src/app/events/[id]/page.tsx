import { Navigation } from "../../../components/navigation";
import { getEventById, getAllEventIds } from "../../../lib/events";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all events (optional for better performance)
export async function generateStaticParams() {
  const ids = await getAllEventIds();
  return ids.slice(0, 20).map((id) => ({
    id: id.toString(),
  }));
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const eventId = parseInt(id, 10);

  if (isNaN(eventId)) {
    notFound();
  }

  const event = await getEventById(eventId);

  if (!event) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      <div className="w-full max-w-4xl px-6">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Events
        </Link>

        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded">
              {event.sport}
            </span>
            <div className="text-right">
              <p className="text-sm text-gray-600">Ticket Price</p>
              <p className="text-4xl font-bold text-green-600">
                €{event.price}
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-black">
            {event.title}
          </h1>

          {event.homeTeam && event.awayTeam && (
            <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-gray-50 rounded">
              <span className="text-2xl font-bold">{event.homeTeam}</span>
              <span className="text-3xl text-gray-400">vs</span>
              <span className="text-2xl font-bold">{event.awayTeam}</span>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Event Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold text-gray-700">Date</p>
                <p className="text-lg">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold text-gray-700">Venue</p>
                <p className="text-lg">{event.venue}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🏙️</span>
              <div>
                <p className="font-semibold text-gray-700">Location</p>
                <p className="text-lg">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🎫</span>
              <div>
                <p className="font-semibold text-gray-700">Category</p>
                <p className="text-lg capitalize">{event.category}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-3 text-black">
              About This Event
            </h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Purchase Section */}
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Attend?</h2>
          <p className="mb-6">
            Secure your tickets now and don't miss this exciting {event.sport}{" "}
            event!
          </p>
          <button className="w-full md:w-auto bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Purchase Tickets - €{event.price}
          </button>
        </div>

        {/* Navigation to Adjacent Events */}
        <div className="flex justify-between mt-8">
          {eventId > 1 && (
            <Link
              href={`/events/${eventId - 1}`}
              className="px-6 py-3 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              ← Previous Event
            </Link>
          )}
          {eventId < 100 && (
            <Link
              href={`/events/${eventId + 1}`}
              className="px-6 py-3 bg-gray-200 rounded hover:bg-gray-300 transition-colors ml-auto"
            >
              Next Event →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
