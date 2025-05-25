import React, { useState } from 'react';

const EventFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    location: '',
    category: ''
  });

  // Debounce function to prevent too many filter updates
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Debounced filter change handler
  const delayedUpdate = debounce((newFilters) => {
    onFilterChange(newFilters);
  }, 1000);

  // Handle individual filter changes
  const updateFilter = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    delayedUpdate(newFilters);
  };

  // Clear all filters
  const resetFilters = () => {
    const clearedFilters = {
      search: '',
      date: '',
      location: '',
      category: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Filter Events</h3>
        {(filters.search || filters.date || filters.location || filters.category) && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="date"
            value={filters.date}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            onChange={(e) => updateFilter('date', e.target.value)}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Location..."
            value={filters.location}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
            onChange={(e) => updateFilter('location', e.target.value)}
          />
        </div>

        <div className="relative">
          <select
            value={filters.category}
            className="w-full pl-4 pr-10 py-2.5 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
            onChange={(e) => updateFilter('category', e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="tech">Technology</option>
            <option value="business">Business</option>
            <option value="social">Social</option>
            <option value="education">Education</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.date || filters.location || filters.category) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.search && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-blue-300 border border-gray-700">
              Search: {filters.search}
              <button
                onClick={() => updateFilter('search', '')}
                className="ml-2 text-blue-300 hover:text-blue-200"
              >
                ×
              </button>
            </span>
          )}
          {filters.date && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-blue-300 border border-gray-700">
              Date: {new Date(filters.date).toLocaleDateString()}
              <button
                onClick={() => updateFilter('date', '')}
                className="ml-2 text-blue-300 hover:text-blue-200"
              >
                ×
              </button>
            </span>
          )}
          {filters.location && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-blue-300 border border-gray-700">
              Location: {filters.location}
              <button
                onClick={() => updateFilter('location', '')}
                className="ml-2 text-blue-300 hover:text-blue-200"
              >
                ×
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-blue-300 border border-gray-700">
              Category: {filters.category}
              <button
                onClick={() => updateFilter('category', '')}
                className="ml-2 text-blue-300 hover:text-blue-200"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default EventFilter;