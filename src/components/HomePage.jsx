import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const photos = [
    "/photo_1.jpg",
    "/photo_2.jpg",
    "/photo_3.jpg",
    "/photo_4.jpg",
    "/photo_5.jpg",
    "/photo_6.jpg"
  ];

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans">

      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo2.png" 
              alt="Impact360 Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white">Impact360</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-semibold text-sm text-white">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link to="/programs" className="hover:text-gray-300">Programs</Link></li>
          <li><Link to="/events" className="hover:text-gray-300">Events</Link></li>
          <li><Link to="/subscription" className="hover:text-gray-300">Join Community</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-black/80 fixed top-12 left-0 right-0 py-4 px-8 space-y-3 text-white text-base font-semibold z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/programs" onClick={() => setMenuOpen(false)}>Programs</Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to="/subscription" onClick={() => setMenuOpen(false)}>Join Community</Link>
        </motion.div>
      )}

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${photo})`,
                zIndex: currentPhoto === index ? 2 : 1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentPhoto === index ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentPhoto === index ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* CENTERED HERO TEXT */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empowering<br />Innovation for<br />Real-World Impact
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transform your ideas into sustainable, scalable solutions with our global-standard innovation pipeline.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/about">
              <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all">
                Learn More
              </button>
            </Link>

            <Link to="/subscription">
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all">
                Join Community
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
