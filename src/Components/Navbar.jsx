import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiX, FiUser } from 'react-icons/fi';

function Navbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="text-gray-300 hover:text-white"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <Link to="/" className="ml-4 text-xl font-bold text-white">
              MovieHub
            </Link>
          </div>
          <div className="flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
          </div>
          <div className="flex items-center">
            <button className="text-gray-300 hover:text-white">
              <FiUser className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 