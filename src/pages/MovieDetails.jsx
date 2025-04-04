import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getImageUrl, getBackdropUrl } from '../services/tmdb';
import { FiStar, FiClock, FiCalendar, FiPlay, FiFilm } from 'react-icons/fi';
import TrailerOverlay from '../components/TrailerOverlay';
import MoviePlayer from '../components/MoviePlayer';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showMovie, setShowMovie] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center p-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1 text-white">
                <FiStar className="h-5 w-5" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiClock className="h-5 w-5" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiCalendar className="h-5 w-5" />
                <span>{movie.release_date}</span>
              </div>
            </div>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster and Info */}
        <div className="md:col-span-1">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-900 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Production Companies</h3>
              <div className="space-y-2">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="text-gray-300">
                    {company.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cast and Similar Movies */}
        <div className="md:col-span-2 space-y-8">
          {/* Watch Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowTrailer(true)}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-lg font-semibold cursor-pointer"
            >
              <FiPlay className="h-6 w-6" />
              <span>Watch Trailer</span>
            </button>
            <button 
              onClick={() => setShowMovie(true)}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-semibold cursor-pointer"
            >
              <FiFilm className="h-6 w-6" />
              <span>Watch Movie</span>
            </button>
          </div>

          {/* Cast */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movie.credits.cast.slice(0, 8).map((actor) => (
                <div
                  key={actor.id}
                  className="bg-gray-900 rounded-lg overflow-hidden"
                >
                  <img
                    src={getImageUrl(actor.profile_path)}
                    alt={actor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold">{actor.name}</h3>
                    <p className="text-sm text-gray-400">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Movies */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movie.similar.results.slice(0, 4).map((similarMovie) => (
                <div
                  key={similarMovie.id}
                  className="group relative bg-gray-900 rounded-lg overflow-hidden"
                >
                  <img
                    src={getImageUrl(similarMovie.poster_path)}
                    alt={similarMovie.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-0 p-3">
                      <h3 className="text-sm font-semibold">{similarMovie.title}</h3>
                      <div className="flex items-center space-x-1 text-white text-sm">
                        <FiStar className="h-4 w-4" />
                        <span>{similarMovie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Overlay */}
      {showTrailer && (
        <TrailerOverlay 
          movieId={id} 
          onClose={() => setShowTrailer(false)} 
        />
      )}

      {/* Movie Player Overlay */}
      {showMovie && (
        <MoviePlayer 
          movieId={id} 
          onClose={() => setShowMovie(false)} 
        />
      )}
    </div>
  );
}

export default MovieDetails; 