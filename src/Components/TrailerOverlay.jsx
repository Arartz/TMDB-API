import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { getMovieTrailers } from '../services/tmdb';

function TrailerOverlay({ movieId, onClose }) {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        setLoading(true);
        const data = await getMovieTrailers(movieId);
        setTrailers(data);
        if (data.length === 0) {
          setError('No trailers available for this movie.');
        }
      } catch (err) {
        setError('Failed to load trailers. Please try again later.');
        console.error('Error fetching trailers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [movieId]);

  // Close overlay when clicking outside the content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden mt-16">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <FiX className="h-6 w-6" />
        </button>
        
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-white text-lg">{error}</p>
            </div>
          ) : trailers.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Movie Trailer</h2>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${trailers[0].key}?autoplay=1`}
                  title="Movie Trailer"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white text-lg">No trailers available for this movie.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrailerOverlay; 