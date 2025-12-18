import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Event Not Found</h2>
      <p className="text-gray-600 mb-8">
        The event you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/events"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Events
      </Link>
    </div>
  );
}
