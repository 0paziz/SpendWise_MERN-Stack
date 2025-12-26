import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                SpendWise
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Home</Link>
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Features</a>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Dashboard</Link>
                <button 
                  onClick={logout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-6 space-y-4">
          <Link to="/" className="block text-gray-600 font-medium">Home</Link>
          <a href="#features" className="block text-gray-600 font-medium">Features</a>
          {user ? (
            <>
              <Link to="/dashboard" className="block text-gray-600 font-medium">Dashboard</Link>
              <button onClick={logout} className="block w-full text-left text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-600 font-medium">Login</Link>
              <Link to="/register" className="block w-full text-center bg-indigo-600 text-white px-6 py-2.5 rounded-full font-medium">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
