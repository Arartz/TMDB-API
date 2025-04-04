import React from 'react'
import { Link } from 'react-router-dom'
import log_img from '../../assets/film-reel.png'

const Navbar = () => {
  return (
    <nav className="p-4 shadow-lg fixed w-full z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={log_img} 
              alt="Logo" 
              className="h-10 w-10 object-contain"
            />
            <Link to="/" className="text-2xl font-bold text-white">
              WarnerBros
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-grey-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/movies/now-playing"
              className="text-white hover:text-grey-500 transition-colors"
            >
              Now Playing
            </Link>
            <Link
              to="/movies/trending"
              className="text-white hover:text-grey-500 transition-colors"
            >
              Trending
            </Link>
            <Link
              to="/movies/popular"
              className="text-white hover:text-grey-500 transition-colors"
            >
              Popular
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar