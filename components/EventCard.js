import React from 'react';
import Link from 'next/link';

const EventCard = ({ event }) => {
  const prettyDate = (dateStr) => {
    if (!dateStr) return 'Date not specified';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const showTime = (timeStr) => {
    if (!timeStr) return 'Time not specified';
    return timeStr;
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 border border-gray-800">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">{event.title}</h2>
        {event.capacity && (
          <div className="bg-gray-800 px-3 py-1 rounded-full">
            <p className="text-sm font-medium text-blue-400">
              {event.registered_count || 0} / {event.capacity} spots
            </p>
          </div>
        )}
      </div>
      
      <p className="text-gray-300 mb-6 line-clamp-2">{event.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-300">{prettyDate(event.date)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-300">{showTime(event.time)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-300">{event.location || 'Location not specified'}</span>
        </div>
        
        {event.category && (
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-gray-300">{event.category}</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Link 
          href={`/events/${event.id}`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          View Details
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;