import { useState, useEffect } from 'react';
import { FiX, FiPlay, FiPause, FiMaximize, FiMinimize } from 'react-icons/fi';
import { getMovieDetails, getImageUrl } from '../services/tmdb';

function MoviePlayer({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
        // Simulate movie duration (in seconds)
        setDuration(data.runtime * 60);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  // Simulate video progress
  useEffect(() => {
    if (!isPlaying || loading) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        setProgress((newTime / duration) * 100);
        
        if (newTime >= duration) {
          clearInterval(interval);
          setIsPlaying(false);
          return duration;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration, loading]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Close overlay when clicking outside the content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-lg overflow-hidden mt-16">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <FiX className="h-6 w-6" />
        </button>
        
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : movie ? (
          <div className="h-full flex flex-col">
            {/* Movie Poster as Placeholder */}
            <div className="relative flex-1 bg-gray-900">
              <img
                src={getImageUrl(movie.backdrop_path)}
                alt={movie.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                  <p className="text-gray-300">This is a simulation. In a real app, this would play the full movie.</p>
                </div>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="bg-gray-900 p-4">
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 h-1 rounded-full mb-4">
                <div 
                  className="bg-white h-1 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {isPlaying ? <FiPause className="h-6 w-6" /> : <FiPlay className="h-6 w-6" />}
                  </button>
                  <div className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
                
                <button 
                  onClick={toggleFullscreen}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isFullscreen ? <FiMinimize className="h-6 w-6" /> : <FiMaximize className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-white text-lg">Movie not found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviePlayer; 