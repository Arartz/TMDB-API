import axios from 'axios';

const API_KEY = '2b38cd82a5d6135c58d4e9d3b3ca5a24'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Movie endpoints
export const getTrendingMovies = async (timeWindow = 'week') => {
  const response = await tmdb.get(`/trending/movie/${timeWindow}`);
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos,similar',
    },
  });
  return response.data;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await tmdb.get('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc',
    },
  });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdb.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

// Genre endpoints
export const getGenres = async () => {
  const response = await tmdb.get('/genre/movie/list');
  return response.data.genres;
};

// Image helpers
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return 'https://via.placeholder.com/1920x1080?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Get movie trailers
export const getMovieTrailers = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer');
  } catch (error) {
    console.error('Error fetching movie trailers:', error);
    return [];
  }
}; 