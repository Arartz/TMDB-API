const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchNowPlayingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?language=en-US`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?language=en-US`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending movies');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?language=en-US&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch top rated movies');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const fetchMovieVideos = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?language=en-US`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie videos');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
}; 