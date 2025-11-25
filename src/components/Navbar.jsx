import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, '-'));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, '-'));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50 py-3 bg-black/80 backdrop-blur-lg">
        <div className="flex items-center gap-2 transition-all duration-500">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo2.png" 
              alt="Impact360 Logo"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white drop-shadow-lg">Impact360</h1>
        </div>
        
        <ul className="hidden md:flex gap-10 font-semibold text-sm text-white drop-shadow-md">
          {["Home", "About", "Programs", "Events", "Contact"].map((item) => (
            <li 
              key={item} 
              onClick={() => scrollToSection(item)}
              className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md"
            >
              <span>{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
          <li 
            onClick={() => scrollToSection('Join Community')}
            className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md"
          >
            <span>Join Community</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>
        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-xl font-semibold drop-shadow-lg"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>
      
      {menuOpen && (
        <motion.div
          className="md:hidden bg-black/80 backdrop-blur-lg fixed top-12 left-0 right-0 py-4 px-8 space-y-3 text-white text-base font-semibold shadow-2xl z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {["Home", "About", "Programs", "Events", "Contact", "Join Community"].map((item) => (
            <p 
              key={item}
              onClick={() => scrollToSection(item)}
              className="hover:text-white/70 transition cursor-pointer"
            >
              {item}
            </p>
          ))}
        </motion.div>
      )}
    </>
  );
}