import { FaSearch, FaCrown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParam = new URLSearchParams(window.location.search);
    urlParam.set("searchTerm", searchTerm);
    const searchQuery = urlParam.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <FaCrown className="text-orange-500 text-2xl sm:text-3xl group-hover:text-orange-400 transition-colors" />
            <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-sm group-hover:bg-orange-500/30 transition-all"></div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-lg sm:text-xl tracking-wide">
              ROYAL
            </span>
            <span className="text-orange-500 text-[10px] sm:text-xs font-semibold tracking-[0.2em]">
              ESTATE
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="hidden sm:flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center px-4 py-2 transition-all duration-300 focus-within:bg-white/20 focus-within:border-orange-500"
        >
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent focus:outline-none w-40 md:w-64 text-white placeholder-gray-400 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="ml-2 text-gray-400 hover:text-orange-500 transition-colors">
            <FaSearch />
          </button>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-300 font-medium hover:text-orange-500 transition-colors duration-200 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            className="text-gray-300 font-medium hover:text-orange-500 transition-colors duration-200 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-orange-500 hover:border-orange-400 transition-colors shadow-md"
              />
            ) : (
              <span className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm">
                Sign In
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-slate-800 border-t border-slate-700 px-4 py-4 space-y-4">
          <form
            onSubmit={handleSubmit}
            className="flex bg-white/10 border border-white/20 rounded-full items-center px-4 py-2"
          >
            <input
              type="text"
              placeholder="Search properties..."
              className="bg-transparent focus:outline-none flex-1 text-white placeholder-gray-400 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="ml-2 text-gray-400 hover:text-orange-500">
              <FaSearch />
            </button>
          </form>
          <Link
            to="/"
            className="block text-gray-300 font-medium hover:text-orange-500 py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-gray-300 font-medium hover:text-orange-500 py-2"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/profile"
            className="block py-2"
            onClick={() => setMenuOpen(false)}
          >
            {currentUser ? (
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-orange-500"
                />
                <span className="text-gray-300">Profile</span>
              </div>
            ) : (
              <span className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium inline-block">
                Sign In
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
