import { Link, useLocation } from 'react-router-dom';
import { FiX, FiHome, FiTrendingUp } from 'react-icons/fi';

function Sidebar({ isOpen, onClose, genres }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <FiHome className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/trending"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                location.pathname === '/trending'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <FiTrendingUp className="h-5 w-5" />
              <span>Trending</span>
            </Link>

            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Genres
              </h3>
              <div className="space-y-1">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    className={`block p-2 rounded-lg transition-colors ${
                      location.pathname === `/genre/${genre.id}`
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar; 