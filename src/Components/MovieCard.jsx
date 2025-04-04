import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 transition-transform"
    >
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="text-gray-400">{movie.release_date.split('-')[0]}</span>
        </div>
        <p className="text-gray-300 mt-2 line-clamp-2">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard; 