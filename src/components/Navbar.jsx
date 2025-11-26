import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section on homepage or show QR
  const handleJoinCommunity = () => {
    setMenuOpen(false);
    setShowQR(true);
  };

  return (
    <>
      {/* WhatsApp QR Code Modal */}
      {showQR && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowQR(false)}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Join Our Community</h2>
              <p className="text-gray-600">Scan the QR code to join our WhatsApp community</p>
              <div className="bg-gray-100 p-8 rounded-2xl flex items-center justify-center">
                <img 
                  src="/whatsapp-qr.png" 
                  alt="WhatsApp QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-sm text-gray-500">Or click below to join directly</p>
              <a
                href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all duration-300"
              >
                Open WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* NAVBAR - Matches Home Page Style */}
      <nav className="w-full flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo2.png" 
              alt="Impact360 Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white">Impact360</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-semibold text-sm text-white">
          <li>
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/programs" className="hover:text-gray-300 transition-colors">
              Programs
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-gray-300 transition-colors">
              Events
            </Link>
          </li>
          <li>
            <Link to="/campaign" className="hover:text-gray-300 transition-colors">
              Campaign
            </Link>
          </li>
          <li>
            <Link to="/subscription" className="hover:text-gray-300 transition-colors">
              Subscription
            </Link>
          </li>
          <li>
            <button 
              onClick={handleJoinCommunity}
              className="hover:text-gray-300 transition-colors"
            >
              Join Community
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-black/90 backdrop-blur-lg fixed top-16 left-0 right-0 py-4 px-8 space-y-3 text-white text-base font-semibold shadow-2xl z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-gray-300 transition cursor-pointer">Home</p>
          </Link>
          
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-gray-300 transition cursor-pointer">About</p>
          </Link>

          <Link to="/programs" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-gray-300 transition cursor-pointer">Programs</p>
          </Link>

          <Link to="/events" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-gray-300 transition cursor-pointer">Events</p>
          </Link>

          <Link to="/subscription" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-gray-300 transition cursor-pointer">Subscription</p>
          </Link>

          <button 
            onClick={handleJoinCommunity}
            className="hover:text-gray-300 transition cursor-pointer w-full text-left"
          >
            Join Community
          </button>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;