export interface Event {
  id: string;
  title: string;
  sport: string;
  location?: string;
  date: string;
  time?: string;
  price: number;
  description?: string;
  venue: string;
  homeTeam?: string;
  awayTeam?: string;
  category: string;
}

export interface EventsResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
}
