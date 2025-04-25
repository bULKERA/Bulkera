import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-6">
      <div className={`container mx-auto transition-all duration-300 ${
        isScrolled ? 'translate-y-0' : 'translate-y-2'
      }`}>
        <div className={`bg-gray-900/60 backdrop-blur-sm rounded-2xl transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-black/10' : ''
        }`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-[#8C73DE] flex items-center">
                BULKERA
              </Link>
              
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors">
                  Home
                </Link>
                <Link to="/products" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors">
                  Products
                </Link>
                <Link to="/about" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors">
                  About
                </Link>
                <Link to="/contact" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors">
                  Contact
                </Link>
              </nav>
              
              <div className="hidden md:flex items-center space-x-4">
                <button className="p-2 text-gray-200 hover:text-[#8C73DE] transition-colors">
                  <Search size={20} />
                </button>
                
                {isAuthenticated ? (
                  <div className="relative group">
                    <button className="flex items-center space-x-1 p-2 text-gray-200 hover:text-[#8C73DE] transition-colors">
                      <User size={20} />
                      <span className="text-sm">{user?.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800/50 hover:text-[#8C73DE]"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="p-2 text-gray-200 hover:text-[#8C73DE] transition-colors">
                    <User size={20} />
                  </Link>
                )}
                
                <Link to="/cart" className="p-2 text-gray-200 hover:text-[#8C73DE] transition-colors relative">
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#8C73DE] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
              
              <div className="flex md:hidden items-center space-x-4">
                <Link to="/cart" className="p-2 text-gray-200 hover:text-[#8C73DE] transition-colors relative">
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#8C73DE] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-200 hover:text-[#8C73DE] transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-700/50">
              <div className="px-4 py-2">
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 bg-gray-800/50 border border-gray-700/50 rounded-l text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8C73DE] placeholder-gray-400"
                  />
                  <button className="bg-[#8C73DE] text-white p-2 rounded-r hover:bg-[#7A62CD] transition-colors">
                    <Search size={20} />
                  </button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <Link to="/" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors py-2">
                    Home
                  </Link>
                  <Link to="/products" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors py-2">
                    Products
                  </Link>
                  <Link to="/about" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors py-2">
                    About
                  </Link>
                  <Link to="/contact" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors py-2">
                    Contact
                  </Link>
                  
                  {isAuthenticated ? (
                    <>
                      <div className="font-medium text-gray-200 py-2">
                        Signed in as {user?.name}
                      </div>
                      <button 
                        onClick={logout}
                        className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors py-2 text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="font-medium text-gray-200 hover:text-[#8C73DE] transition-colors py-2">
                      Login / Register
                    </Link>
                  )}
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;