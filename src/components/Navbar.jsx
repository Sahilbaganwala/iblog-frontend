import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for Auth & UI
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  // Sync Auth State on Route Change (Better than setInterval)
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
    setIsDropdownOpen(false);   // Close dropdown on navigation
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ============================
  // SWEET ALERT LOGOUT
  // ============================
  const handleLogout = () => {
    setIsDropdownOpen(false); // Close menu first

    Swal.fire({
      title: 'Are you sure?',
      text: "You will need to login again to access your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EAB308', // Yellow-500
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform Logout
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser({});
        
        // Success Message
        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );
        
        navigate("/login");
      }
    });
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-yellow-600 font-bold"
      : "text-gray-600 hover:text-yellow-500 font-medium transition-colors";

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* =======================
            1. LOGO
        ======================= */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:rotate-6 transition-transform">
            i
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Blog
          </span>
        </Link>

        {/* =======================
            2. DESKTOP MENU
        ======================= */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/categories" className={isActive("/categories")}>Category</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact</Link>
          <Link to="/privacy" className={isActive("/privacy")}>Privacy</Link>
        </div>

        {/* =======================
            3. RIGHT SECTION (Search + Auth)
        ======================= */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar (Hidden on small mobile) */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:bg-white transition-all">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-32 lg:w-48 placeholder-gray-500"
            />
          </div>

          {/* Auth State */}
          {token ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar Trigger */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold shadow-md border-2 border-white ring-2 ring-gray-100 hover:ring-yellow-400 transition-all">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition">
                      👤 My Profile
                    </Link>
                    <Link to="/edit-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition">
                      ⚙️ Edit Settings
                    </Link>
                    
                    <div className="border-t border-gray-100 mt-1"></div>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* =======================
          4. MOBILE MENU DRAWER
      ======================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-inner"
          >
            <div className="flex flex-col p-4 space-y-2">
              <Link to="/" className="px-4 py-3 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 font-medium text-gray-700">Home</Link>
              <Link to="/categories" className="px-4 py-3 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 font-medium text-gray-700">Categories</Link>
              <Link to="/contact" className="px-4 py-3 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 font-medium text-gray-700">Contact Us</Link>
              <Link to="/privacy" className="px-4 py-3 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 font-medium text-gray-700">Privacy Policy</Link>
              
              {/* Mobile Search */}
              <div className="pt-2">
                 <input 
                   type="text" 
                   placeholder="Search blogs..." 
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white outline-none"
                 />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}