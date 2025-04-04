import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import GenreMovies from './pages/GenreMovies';
import { getGenres } from './services/tmdb';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [genres, setGenres] = useState([]);

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            genres={genres}
          />
          <main className="flex-1 p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/genre/:genreId" element={<GenreMovies />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App; 