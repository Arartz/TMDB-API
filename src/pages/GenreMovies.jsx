import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getMoviesByGenre, getGenres, getImageUrl } from '../services/tmdb';
import { FiStar, FiCalendar } from 'react-icons/fi';

function GenreMovies() {
  const { genreId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesAndGenre = async () => {
      try {
        const [moviesData, genresData] = await Promise.all([
          getMoviesByGenre(genreId, page),
          getGenres(),
        ]);
        
        setMovies(moviesData.results);
        setTotalPages(moviesData.total_pages);
        const genre = genresData.find((g) => g.id === parseInt(genreId));
        setGenreName(genre ? genre.name : '');
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndGenre();
  }, [genreId, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{genreName} Movies</h1>
        <p className="text-gray-400">
          Page {page} of {totalPages}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition-transform duration-200"
          >
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1 truncate">{movie.title}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <FiStar className="h-4 w-4" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  <FiCalendar className="h-4 w-4" />
                  <span>{movie.release_date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GenreMovies; 