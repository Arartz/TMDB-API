import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies, getImageUrl, getBackdropUrl } from '../services/tmdb';
import { FiStar, FiPlay, FiCalendar, FiFilm } from 'react-icons/fi';
import TrailerOverlay from '../components/TrailerOverlay';
import MoviePlayer from '../components/MoviePlayer';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showMovie, setShowMovie] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleWatchTrailer = (e, movieId) => {
    e.preventDefault(); // Prevent navigation to movie details
    e.stopPropagation(); // Prevent event bubbling
    setSelectedMovieId(movieId);
  };

  const handleWatchMovie = (e, movieId) => {
    e.preventDefault(); // Prevent navigation to movie details
    e.stopPropagation(); // Prevent event bubbling
    setSelectedMovieId(movieId);
    setShowMovie(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const featuredMovie = trendingMovies[0];

  return (
    <div className="space-y-8">
      {/* Featured Movie */}
      <div className="relative h-[70vh] rounded-xl overflow-hidden">
        <img
          src={getImageUrl(trendingMovies[0]?.backdrop_path)}
          alt={trendingMovies[0]?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
          <div className="absolute bottom-0 p-8">
            <h1 className="text-4xl font-bold mb-4">{trendingMovies[0]?.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1 text-white">
                <FiStar className="h-5 w-5" />
                <span>{trendingMovies[0]?.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300">
                <FiCalendar className="h-5 w-5" />
                <span>{trendingMovies[0]?.release_date}</span>
              </div>
            </div>
            <p className="text-gray-300 max-w-2xl mb-6">{trendingMovies[0]?.overview}</p>
            <div className="flex space-x-4">
              <Link
                to={`/movie/${trendingMovies[0]?.id}`}
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                View Details
              </Link>
              <button
                onClick={(e) => handleWatchTrailer(e, trendingMovies[0]?.id)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <FiPlay className="h-5 w-5" />
                <span>Watch Trailer</span>
              </button>
              <button
                onClick={(e) => handleWatchMovie(e, trendingMovies[0]?.id)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <FiFilm className="h-5 w-5" />
                <span>Watch Movie</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Movies */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Trending Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingMovies.slice(1).map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 truncate">{movie.title}</h2>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 text-white">
                    <FiStar className="h-4 w-4" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <FiCalendar className="h-4 w-4" />
                    <span>{movie.release_date}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={(e) => handleWatchTrailer(e, movie.id)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <FiPlay className="h-4 w-4" />
                    <span>Trailer</span>
                  </button>
                  <button 
                    onClick={(e) => handleWatchMovie(e, movie.id)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <FiFilm className="h-4 w-4" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trailer Overlay */}
      {selectedMovieId && !showMovie && (
        <TrailerOverlay 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}

      {/* Movie Player Overlay */}
      {showMovie && selectedMovieId && (
        <MoviePlayer 
          movieId={selectedMovieId} 
          onClose={() => {
            setShowMovie(false);
            setSelectedMovieId(null);
          }} 
        />
      )}
    </div>
  );
}

export default Home; 