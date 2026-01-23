"use client";

import { Navigation } from "../../components/navigation";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import { FaHeart, FaChevronDown, FaShoppingCart } from "react-icons/fa";
import { sampleEvents } from "./sampleEvents";

const ITEMS_PER_PAGE = 10;

export default function EventsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [openedTickets, setOpenedTickets] = useState<string[]>([]);
  const [ticketQuantity, setTicketQuantity] = useState<Record<string, number>>(
    {},
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("date-asc");
  const [searchInput, setSearchInput] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const sports = [
    "Basketball",
    "Football",
    "Futsal",
    "Handball",
    "Volleyball",
    "Water polo",
  ];
  const orderedSports = [
    "Basketball",
    "Handball",
    "Football",
    "Volleyball",
    "Futsal",
    "Water polo",
  ];
  const orderedCities = [
    "Dugopolje",
    "Split",
    "Kaštela",
    "Solin",
    "Klis",
    "Trogir",
  ];
  const cities = ["Dugopolje", "Kaštela", "Klis", "Solin", "Split", "Trogir"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    if (isFilterOpen || isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen, isSortOpen]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const toggleFilter = (type: "sport" | "city" | "month", value: string) => {
    if (type === "sport") {
      setSelectedSports((prev) =>
        prev.includes(value)
          ? prev.filter((s) => s !== value)
          : [...prev, value],
      );
    } else if (type === "city") {
      setSelectedCities((prev) =>
        prev.includes(value)
          ? prev.filter((c) => c !== value)
          : [...prev, value],
      );
    } else {
      setSelectedMonths((prev) =>
        prev.includes(value)
          ? prev.filter((m) => m !== value)
          : [...prev, value],
      );
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedSports([]);
    setSelectedCities([]);
    setSelectedMonths([]);
    setCurrentPage(1);
  };

  const activeFiltersCount =
    selectedSports.length + selectedCities.length + selectedMonths.length;

  const toggleFavorite = (eventId: string) => {
    setFavorites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  const toggleTickets = (eventId: string) => {
    setOpenedTickets((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  // Filter events based on selected filters
  const filteredEvents = sampleEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.toLocaleDateString("en-US", {
      month: "short",
    });

    // Extract city from venue format: "Stadium - City, Croatia"
    const venueParts = event.venue.split(",");
    const cityPart = venueParts[0]?.split("-")[1]?.trim() || "";

    const matchesSport =
      selectedSports.length === 0 || selectedSports.includes(event.sport);
    const matchesCity =
      selectedCities.length === 0 || selectedCities.includes(cityPart);
    const matchesMonth =
      selectedMonths.length === 0 || selectedMonths.includes(eventMonth);

    // Search filter: match team names by starting letters
    let matchesSearch = true;
    if (searchInput.trim()) {
      const searchTerms = searchInput.toLowerCase().trim().split(/\s+/);
      const titleWords = event.title.toLowerCase().split(/\s+/);

      // Check if any search term matches the start of any word in the title
      matchesSearch = searchTerms.some((searchTerm) =>
        titleWords.some((word) => word.startsWith(searchTerm)),
      );
    }

    // Show favorites filter
    const matchesFavorites = !showFavorites || favorites.includes(event.id);

    return (
      matchesSport &&
      matchesCity &&
      matchesMonth &&
      matchesSearch &&
      matchesFavorites
    );
  });

  // Sort events based on selected sort option
  const sortedAndFilteredEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedAndFilteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedEvents = sortedAndFilteredEvents.slice(startIndex, endIndex);

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#192734]">
      <Navigation />

      {/* All content between navbar and footer */}
      <section className="-mt-6 w-full bg-[#192734]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-14">

          {/* Mobile header */}
          <div className="mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-white">Upcoming events</h1>
            <p className="text-sm text-white/70 mt-1">
              Showing {paginatedEvents.length} of {sortedAndFilteredEvents.length} events
            </p>
          </div>

          {/* Mobile search/sort/filter (revert to original) */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto lg:hidden">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search teams..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-none border border-white/15 bg-white/5 pl-11 pr-4 py-3 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* Sort Button */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSortOpen((prev) => !prev);
                }}
                className="w-full sm:w-[130px] flex items-center justify-center gap-2 px-6 py-3 rounded-none border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                Sort
              </button>

              {/* Sort Dropdown Menu */}
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#15202b] border border-white/15 rounded-none shadow-2xl ring-1 ring-white/10 z-50 dropdown-animate">
                  <div className="py-1">
                    {[
                      { value: "date-asc", label: "Date (Earliest first)" },
                      { value: "date-desc", label: "Date (Latest first)" },
                      { value: "price-asc", label: "Price (Low to High)" },
                      { value: "price-desc", label: "Price (High to Low)" },
                      { value: "name-asc", label: "Name (A-Z)" },
                      { value: "name-desc", label: "Name (Z-A)" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          sortBy === option.value
                            ? "bg-white/10 text-white"
                            : "text-white/90 hover:bg-white/5"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Button */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full sm:w-[130px] flex items-center justify-center gap-2 px-6 py-3 rounded-none border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors relative"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-700 text-white text-xs px-2 py-0.5 rounded-full min-w-5 text-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Filter Dropdown Panel */}
              {isFilterOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[600px] max-w-[90vw] bg-[#15202b] border border-white/15 rounded-none shadow-2xl ring-1 ring-white/10 z-50 dropdown-animate">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-xs text-white/60 hover:text-white"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* Show Favorites Filter */}
                    {user && (
                      <div className="mb-4 pb-4 border-b border-white/10">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showFavorites}
                            onChange={() => setShowFavorites(!showFavorites)}
                            className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-white/85 text-xs">
                            Show Favorites
                          </span>
                        </label>
                      </div>
                    )}

                    {/* Filter Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Sport Filter */}
                      <div>
                        <h4 className="text-xs font-semibold text-white/70 mb-2 uppercase">
                          Sport
                        </h4>
                        <div className="space-y-1.5">
                          {orderedSports.map((sport) => (
                            <label
                              key={sport}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSports.includes(sport)}
                                onChange={() => toggleFilter("sport", sport)}
                                className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span className="text-white/80 text-xs">
                                {sport}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* City Filter */}
                      <div>
                        <h4 className="text-xs font-semibold text-white/70 mb-2 uppercase">
                          City
                        </h4>
                        <div className="space-y-1.5">
                          {orderedCities.map((city) => (
                            <label
                              key={city}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedCities.includes(city)}
                                onChange={() => toggleFilter("city", city)}
                                className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span className="text-white/80 text-xs">
                                {city}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Month Filter */}
                      <div>
                        <h4 className="text-xs font-semibold text-white/70 mb-2 uppercase">
                          Month
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            {months.slice(0, 6).map((month) => (
                              <label
                                key={month}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedMonths.includes(month)}
                                  onChange={() => toggleFilter("month", month)}
                                  className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                                />
                                <span className="text-white/80 text-xs">
                                  {month}
                                </span>
                              </label>
                            ))}
                          </div>
                          <div className="space-y-1.5">
                            {months.slice(6, 12).map((month) => (
                              <label
                                key={month}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedMonths.includes(month)}
                                  onChange={() => toggleFilter("month", month)}
                                  className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                                />
                                <span className="text-white/80 text-xs">
                                  {month}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Filters + Events */}
          <div className="mt-12 flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 xl:w-80 bg-[#15202b] border border-white/10 rounded-none p-5 shadow-2xl space-y-5 sticky top-32 self-start">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold text-sm">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-white/70 hover:text-white font-semibold"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-white/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search teams..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full rounded-none border border-white/15 bg-white/5 pl-9 pr-3 py-2.5 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </div>

              <div className="relative" ref={sortRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSortOpen((prev) => !prev);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-none border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                  Sort
                </button>

                {isSortOpen && (
                  <div className="absolute left-0 right-0 mt-2 w-full bg-[#15202b] border border-white/15 rounded-none shadow-2xl ring-1 ring-white/10 z-50 dropdown-animate">
                    <div className="py-1">
                      {[
                        { value: "date-asc", label: "Date (Earliest first)" },
                        { value: "date-desc", label: "Date (Latest first)" },
                        { value: "price-asc", label: "Price (Low to High)" },
                        { value: "price-desc", label: "Price (High to Low)" },
                        { value: "name-asc", label: "Name (A-Z)" },
                        { value: "name-desc", label: "Name (Z-A)" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === option.value
                              ? "bg-white/10 text-white"
                              : "text-white/90 hover:bg-white/5"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {user && (
                <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFavorites}
                    onChange={() => setShowFavorites(!showFavorites)}
                    className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  />
                  Show favorites
                </label>
              )}

              <div className="space-y-2">
                <p className="text-xs font-semibold text-white/60 uppercase">Sport</p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {orderedSports.map((sport) => (
                    <label
                      key={sport}
                      className="flex items-center gap-2 text-xs text-white/80 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSports.includes(sport)}
                        onChange={() => toggleFilter("sport", sport)}
                        className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                      />
                      {sport}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-white/60 uppercase">City</p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {orderedCities.map((city) => (
                    <label
                      key={city}
                      className="flex items-center gap-2 text-xs text-white/80 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() => toggleFilter("city", city)}
                        className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                      />
                      {city}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-white/60 uppercase">Month</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    {months.slice(0, 6).map((month) => (
                      <label
                        key={month}
                        className="flex items-center gap-2 text-xs text-white/80 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedMonths.includes(month)}
                          onChange={() => toggleFilter("month", month)}
                          className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        />
                        {month}
                      </label>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {months.slice(6, 12).map((month) => (
                      <label
                        key={month}
                        className="flex items-center gap-2 text-xs text-white/80 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedMonths.includes(month)}
                          onChange={() => toggleFilter("month", month)}
                          className="w-3 h-3 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        />
                        {month}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="hidden lg:block w-full max-w-5xl mx-auto mb-6">
                <h1 className="text-3xl font-bold text-white">All Events</h1>
                <p className="text-sm text-white/70 mt-1">
                  Showing {paginatedEvents.length} of {sortedAndFilteredEvents.length} events
                </p>
              </div>
              <div className="space-y-8 w-full max-w-5xl mx-auto">
                {paginatedEvents.map((event) => {
              const eventDate = new Date(event.date);
              const monthShort = eventDate.toLocaleDateString("en-US", {
                month: "short",
              });
              const day = eventDate.getDate();
              const year = eventDate.getFullYear();

              return (
                <div
                  key={event.id}
                  className={`flex flex-col bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden`}
                >
                  {/* Main Event Row */}
                  <div className="flex flex-col sm:flex-row items-stretch">
                    {/* Date Box */}
                    <div className="hidden sm:flex sm:flex-col items-center justify-center bg-indigo-700 text-white p-6 w-24 gap-0">
                      <div className="text-center">
                        <div className="text-sm font-medium uppercase">
                          {monthShort}
                        </div>
                        <div className="text-3xl font-bold leading-tight">
                          {day}
                        </div>
                        <div className="text-xs opacity-90">{year}</div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/30">
                        <div className="text-sm font-medium">{event.time}</div>
                      </div>
                    </div>

                    {/* Mobile Date Display */}
                    <div className="sm:hidden flex items-center justify-center bg-indigo-700 text-white px-4 py-3">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-xs font-medium uppercase mb-1">
                            {monthShort}
                          </div>
                          <div className="text-2xl font-bold leading-tight">
                            {day}
                          </div>
                          <div className="text-xs text-white/75 mt-1">
                            {year}
                          </div>
                        </div>
                        <div className="h-10 w-px bg-white/30"></div>
                        <div className="text-sm font-medium">
                          {event.time}
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-xs text-white font-semibold uppercase tracking-wide">
                          {event.category}
                        </div>
                        <span className="text-xs text-white/60">
                          {event.sport}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-start gap-2 text-sm text-white/60">
                        <svg
                          className="w-4 h-4 mt-0.5 shrink-0 text-white/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    {/* Heart and Tickets Section - Stays Fixed */}
                    <div className="flex items-center justify-center sm:justify-end gap-4 p-6 sm:p-4 shrink-0">
                      {user && (
                        <button
                          onClick={() => toggleFavorite(event.id)}
                          className="p-1 shrink-0"
                          type="button"
                        >
                          <FaHeart
                            className={`size-5 transition-colors ${
                              favorites.includes(event.id)
                                ? "text-white/80"
                                : "text-white/20 hover:text-white/50"
                            }`}
                          />
                        </button>
                      )}
                      <button
                        onClick={() => toggleTickets(event.id)}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-indigo-700 hover:bg-indigo-800 text-white font-bold transition-colors whitespace-nowrap"
                      >
                        See tickets
                        <FaChevronDown
                          className={`size-4 transition-transform ${
                            openedTickets.includes(event.id) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Tickets Section */}
                  {openedTickets.includes(event.id) && (
                    <div className="border-t border-white/10 dropdown-animate">
                      <div className="p-4">
                        {/* Compact Ticket Option */}
                        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                          {/* Price & Purchase */}
                          <div className="flex items-center gap-3 sm:gap-4">
                            {/* Price */}
                            <div className="text-center">
                              <p className="text-white/60 text-xs mb-0.5">
                                Per ticket
                              </p>
                              <p className="text-white text-xl font-bold">
                                €{event.price}
                              </p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2 px-3 py-2 rounded-none border border-white/15 bg-white/5">
                              <button
                                onClick={() => {
                                  const current = ticketQuantity[event.id] || 1;
                                  if (current > 1) {
                                    setTicketQuantity({
                                      ...ticketQuantity,
                                      [event.id]: current - 1,
                                    });
                                  }
                                }}
                                className="text-white hover:text-white/60 transition-colors text-lg font-semibold"
                              >
                                −
                              </button>
                              <span className="text-white text-base font-semibold w-6 text-center">
                                {ticketQuantity[event.id] || 1}
                              </span>
                              <button
                                onClick={() => {
                                  const current = ticketQuantity[event.id] || 1;
                                  if (current < 10) {
                                    setTicketQuantity({
                                      ...ticketQuantity,
                                      [event.id]: current + 1,
                                    });
                                  }
                                }}
                                className="text-white hover:text-white/60 transition-colors text-lg font-semibold"
                              >
                                +
                              </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                              onClick={() => {
                                if (!user) {
                                  router.push("/login");
                                  return;
                                }
                              }}
                              className="flex items-center gap-2 px-6 py-2 rounded-none border border-white/15 bg-white/10 text-white hover:bg-white/15 hover:border-white/25 text-sm font-semibold transition-colors whitespace-nowrap"
                            >
                              <FaShoppingCart className="size-4" />
                              ADD TO CART
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 max-w-7xl mx-auto px-6 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-none border border-white/15 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-none border transition-colors ${
                        currentPage === page
                          ? "bg-white/12 text-white border-white/15"
                          : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-none border border-white/15 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
