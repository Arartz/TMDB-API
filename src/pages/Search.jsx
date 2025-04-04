import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchMovies, getImageUrl } from '../services/tmdb';
import { FiStar, FiSearch, FiCalendar } from 'react-icons/fi';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ q: query, page: newPage.toString() });
  };

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <FiSearch className="h-12 w-12 text-gray-400" />
        <p className="text-gray-400">Enter a search term to find movies</p>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-400">
          Page {page} of {totalPages}
        </p>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No movies found for your search.</p>
        </div>
      ) : (
        <>
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
                  <h2 className="text-lg font-semibold mb-1">{movie.title}</h2>
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
        </>
      )}
    </div>
  );
}

export default Search; 