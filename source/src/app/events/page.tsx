"use client";

import { Navigation } from "../../components/navigation";
import { useState, useEffect, useRef } from "react";
import { sampleEvents } from "./sampleEvents";

const ITEMS_PER_PAGE = 10;

export default function EventsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('date-asc');
  const [searchInput, setSearchInput] = useState<string>('');
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const sports = ["Basketball", "Football", "Futsal", "Handball", "Volleyball", "Water polo"];
  const cities = ["Dugopolje","Kaštela", "Klis", "Solin", "Split", "Trogir"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
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

  const toggleFilter = (type: 'sport' | 'city' | 'month', value: string) => {
    if (type === 'sport') {
      setSelectedSports(prev => 
        prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
      );
    } else if (type === 'city') {
      setSelectedCities(prev => 
        prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
      );
    } else {
      setSelectedMonths(prev => 
        prev.includes(value) ? prev.filter(m => m !== value) : [...prev, value]
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

  const activeFiltersCount = selectedSports.length + selectedCities.length + selectedMonths.length;

  // Filter events based on selected filters
  const filteredEvents = sampleEvents.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.toLocaleDateString('en-US', { month: 'long' });
    
    // Extract city from venue format: "Stadium - City, Croatia"
    const venueParts = event.venue.split(',');
    const cityPart = venueParts[0]?.split('-')[1]?.trim() || '';
    
    const matchesSport = selectedSports.length === 0 || selectedSports.includes(event.sport);
    const matchesCity = selectedCities.length === 0 || selectedCities.includes(cityPart);
    const matchesMonth = selectedMonths.length === 0 || selectedMonths.includes(eventMonth);
    
    // Search filter: match team names by starting letters
    let matchesSearch = true;
    if (searchInput.trim()) {
      const searchTerms = searchInput.toLowerCase().trim().split(/\s+/);
      const titleWords = event.title.toLowerCase().split(/\s+/);
      
      // Check if any search term matches the start of any word in the title
      matchesSearch = searchTerms.some(searchTerm => 
        titleWords.some(word => word.startsWith(searchTerm))
      );
    }
    
    return matchesSport && matchesCity && matchesMonth && matchesSearch;
  });

  // Sort events based on selected sort option
  const sortedAndFilteredEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
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
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Upcoming events
            </h1>
          </div>

          {/* Search and Filter Bar */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full sm:w-[130px] flex items-center justify-center gap-2 px-6 py-3 rounded-none border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
              >
                Sort
              </button>

              {/* Sort Dropdown Menu */}
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#15202b] border border-white/15 rounded-none shadow-2xl ring-1 ring-white/10 z-50">
                  <div className="py-1">
                    {[
                      { value: 'date-asc', label: 'Date (Earliest first)' },
                      { value: 'date-desc', label: 'Date (Latest first)' },
                      { value: 'price-asc', label: 'Price (Low to High)' },
                      { value: 'price-desc', label: 'Price (High to Low)' },
                      { value: 'name-asc', label: 'Name (A-Z)' },
                      { value: 'name-desc', label: 'Name (Z-A)' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          if (!option.value.startsWith('price-')) {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          sortBy === option.value
                            ? 'bg-white/10 text-white'
                            : 'text-white/90 hover:bg-white/5'
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
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8B1538] text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Filter Dropdown Panel */}
              {isFilterOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-[#15202b] border border-white/15 rounded-none shadow-2xl ring-1 ring-white/10 z-50">
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-6 relative">
                      <h3 className="text-lg font-semibold text-white">Filter Events</h3>
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-indigo-400 hover:text-indigo-300 absolute right-0"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* 3 Column Grid */}
                    <div className="grid grid-cols-3 gap-6">
                      {/* Sport Filter */}
                      <div>
                        <h4 className="text-sm font-medium text-white/75 mb-3">Sport</h4>
                        <div className="space-y-2">
                          {sports.map((sport) => (
                            <label key={sport} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedSports.includes(sport)}
                                onChange={() => toggleFilter('sport', sport)}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span className="text-white/90 group-hover:text-white text-sm">{sport}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* City Filter */}
                      <div>
                        <h4 className="text-sm font-medium text-white/75 mb-3">City</h4>
                        <div className="space-y-2">
                          {cities.map((city) => (
                            <label key={city} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedCities.includes(city)}
                                onChange={() => toggleFilter('city', city)}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span className="text-white/90 group-hover:text-white text-sm">{city}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Month Filter */}
                      <div>
                        <h4 className="text-sm font-medium text-white/75 mb-3">Month</h4>
                        <div className="space-y-2">
                          {months.map((month) => (
                            <label key={month} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={selectedMonths.includes(month)}
                                onChange={() => toggleFilter('month', month)}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span className="text-white/90 group-hover:text-white text-sm">{month}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Events List */}
          <div className="mt-16 max-w-5xl mx-auto space-y-4">
            {paginatedEvents.map((event) => {
              const eventDate = new Date(event.date);
              const monthShort = eventDate.toLocaleDateString('en-US', { month: 'short' });
              const day = eventDate.getDate();
              const year = eventDate.getFullYear();

              return (
                <div 
                  key={event.id} 
                  className="flex flex-col sm:flex-row items-stretch bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                >
                  {/* Date Box */}
                  <div className="flex sm:flex-col items-center sm:items-center justify-center bg-[#8B1538] text-white p-4 sm:p-6 sm:w-24 gap-3 sm:gap-0">
                    <div className="text-center">
                      <div className="text-sm font-medium uppercase">{monthShort}</div>
                      <div className="text-3xl font-bold leading-tight">{day}</div>
                      <div className="text-xs opacity-90">{year}</div>
                    </div>
                    <div className="sm:mt-3 sm:pt-3 sm:border-t border-white/30">
                      <div className="text-sm font-medium">{event.time}</div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="text-xs text-white font-semibold mb-2 uppercase tracking-wide">
                      {event.category}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {event.venue}
                    </p>
                  </div>

                  {/* Buy Tickets Button */}
                  <div className="flex items-center justify-center p-6 sm:p-4">
                    <button className="w-full sm:w-auto bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-none transition-colors whitespace-nowrap">
                      BUY TICKETS
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 max-w-5xl mx-auto flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-none border border-white/15 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-none border transition-colors ${
                      currentPage === page
                        ? 'bg-white/12 text-white border-white/15'
                        : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
