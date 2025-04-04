import React, { useState, useEffect } from 'react';
import { fetchNowPlayingMovies } from '../services/tmdbService';
import MovieCard from '../components/MovieCard';

function Cardmovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchNowPlayingMovies(page);
        setMovies(data.results);
        setError(null);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Now Playing Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Cardmovies;