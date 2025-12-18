import { Event, EventsResponse } from "../types/event";

type NextFetchRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

// Sports categories for random assignment
const sports = ["Football", "Basketball", "Tennis", "Volleyball", "Handball"];
const locations = [
  "Zagreb",
  "Split",
  "Rijeka",
  "Osijek",
  "Zadar",
  "Pula",
  "Dubrovnik",
];

// Helper function to generate realistic event data from JSONPlaceholder posts
function transformPostToEvent(post: any): Event {
  const sportIndex = post.id % sports.length;
  const locationIndex = post.id % locations.length;
  const sport = sports[sportIndex];
  const location = locations[locationIndex];

  // Generate date between now and 6 months from now
  const daysFromNow = (post.id * 7) % 180;
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + daysFromNow);

  return {
    id: post.id,
    title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
    sport,
    location,
    date: eventDate.toISOString().split("T")[0],
    price: Math.floor(Math.random() * 150) + 20,
    description: post.body,
    venue: `${location} ${sport} Arena`,
    homeTeam: sport === "Football" || sport === "Basketball" ? `${location} FC` : undefined,
    awayTeam: sport === "Football" || sport === "Basketball" ? `${sports[(sportIndex + 1) % sports.length]} United` : undefined,
    category: sport.toLowerCase(),
  };
}

/**
 * Fetch all events with pagination
 */
export async function getEvents(
  page: number = 1,
  limit: number = 12
): Promise<EventsResponse> {
  try {
    const start = (page - 1) * limit;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`,
      {
        // Next.js 15+ caching strategy
        next: { revalidate: 3600 }, // Revalidate every hour
      } as NextFetchRequestInit
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const posts = await response.json();
    const events = posts.map(transformPostToEvent);

    // JSONPlaceholder has 100 posts
    const total = 100;

    return {
      events,
      total,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

/**
 * Fetch a single event by ID
 */
export async function getEventById(id: number): Promise<Event | null> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        next: { revalidate: 3600 },
      } as NextFetchRequestInit
    );

    if (!response.ok) {
      return null;
    }

    const post = await response.json();
    return transformPostToEvent(post);
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return null;
  }
}

/**
 * Get all event IDs for static generation
 */
export async function getAllEventIds(): Promise<number[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    return posts.map((post: any) => post.id);
  } catch (error) {
    console.error("Error fetching event IDs:", error);
    return [];
  }
}
