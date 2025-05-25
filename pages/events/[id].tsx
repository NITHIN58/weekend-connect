import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import RegistrationForm from '../../components/RegistrationForm';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${id}`);
      if (!response.ok) throw new Error('Failed to fetch event');
      const data = await response.json();
      setEvent(data);
    } catch (err) {
      setError('Failed to load event details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date not specified';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    fetchEvent(); // Refresh event data to update registration count
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-300">Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">{error || 'Event not found'}</p>
          <Link
            href="/events"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/events"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </Link>

        <div className="bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-800">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
              <p className="text-gray-300 text-lg">{formatDate(event.date)} at {event.time}</p>
            </div>

            {event.capacity && (
              <div className="mt-4 md:mt-0 bg-gray-800 px-4 py-2 rounded-lg">
                <p className="text-blue-400 font-semibold">
                  {event.registered_count || 0} / {event.capacity} spots filled
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-300">{event.location || 'Location not specified'}</span>
            </div>

            {event.category && (
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-gray-300">{event.category}</span>
              </div>
            )}
          </div>

          <div className="prose prose-lg prose-invert max-w-none mb-8">
            <p className="text-gray-300">{event.description}</p>
          </div>

          {!showRegistration && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowRegistration(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                disabled={event.capacity && event.registered_count >= event.capacity}
              >
                {event.capacity && event.registered_count >= event.capacity ? (
                  'Event is Full'
                ) : (
                  <>
                    Register Now
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {showRegistration && (
          <div className="mt-8">
            <RegistrationForm
              eventId={event.id}
              onSuccess={handleRegistrationSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
}