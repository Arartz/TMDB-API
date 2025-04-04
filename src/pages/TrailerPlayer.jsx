import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieVideos } from '../services/tmdbService';

const TrailerPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieAndTrailer = async () => {
      try {
        setLoading(true);
        const [movieData, videosData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieVideos(id)
        ]);

        setMovie(movieData);

        // Find the official trailer
        const trailer = videosData.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          throw new Error('No trailer found');
        }

        setError(null);
      } catch (err) {
        setError('Failed to load trailer');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovieAndTrailer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading trailer...</div>
      </div>
    );
  }

  if (error || !movie || !trailerKey) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error || 'Trailer not available'}</div>
        <button
          onClick={() => navigate(-1)}
          className="ml-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          ← Back to Movie
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-xl text-gray-300">{movie.tagline}</p>
        </div>

        <div className="max-w-2xl mx-auto relative pb-[40%] h-0 overflow-hidden rounded-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-300">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default TrailerPlayer; 