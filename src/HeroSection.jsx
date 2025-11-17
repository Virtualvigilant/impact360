import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Background color transition
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["#FFFEF9", "#306CEC"]
  );
  
  // Hero color transforms
  const heroTextColor = useTransform(scrollYProgress, [0, 0.5], ["#306CEC", "#FFFEF9"]);
  const heroDescriptionColor = useTransform(scrollYProgress, [0, 0.5], ["rgba(48, 108, 236, 0.8)", "rgba(255, 254, 249, 0.9)"]);
  
  // Detect scroll to hide navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">
      {/* NAVBAR - Ultra transparent and disappears on scroll */}
      <nav className={`w-full flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-transparent backdrop-blur-none border-b-0 py-2' : 'bg-[#FFFEF9]/60 backdrop-blur-sm border-b border-[#306CEC]/5 py-3'}`}>
        {/* Logo - Fades out on scroll */}
        <div className={`flex items-center gap-2 transition-all duration-500 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo2.png" 
              alt="Impact360 Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-[#306CEC]">Impact360</h1>
        </div>

        {/* Desktop Menu - Always visible */}
        <ul className="hidden md:flex gap-10 text-[#306CEC] font-semibold text-sm">
          {["Home", "About", "Programs", "Events", "Contact"].map((item) => (
            <li key={item} className="cursor-pointer hover:text-[#306CEC]/70 transition-all duration-300 relative group">
              <span>{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#306CEC] group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
          <li className="cursor-pointer hover:text-[#306CEC]/70 transition-all duration-300 relative group">
            <span>Join Community</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#306CEC] group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#306CEC] text-xl font-semibold"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-[#FFFEF9]/90 backdrop-blur-lg fixed top-12 left-0 right-0 py-4 px-8 space-y-3 text-[#306CEC] text-base font-semibold shadow-2xl border-b border-[#306CEC]/10 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="hover:text-[#306CEC]/70 transition cursor-pointer">Home</p>
          <p className="hover:text-[#306CEC]/70 transition cursor-pointer">About</p>
          <p className="hover:text-[#306CEC]/70 transition cursor-pointer">Programs</p>
          <p className="hover:text-[#306CEC]/70 transition cursor-pointer">Events</p>
          <p className="hover:text-[#306CEC]/70 transition cursor-pointer">Contact</p>
          <p className="hover:text-[#306CEC]/70 transition cursor-pointer">Join Community</p>
        </motion.div>
      )}

      {/* HERO SECTION */}
      <motion.section 
        style={{ backgroundColor }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full opacity-5"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#306CEC] to-transparent rounded-full blur-3xl" />
          </motion.div>
          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-5"
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-gradient-to-tl from-[#FFFEF9] to-transparent rounded-full blur-3xl" />
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto pr-6 pl-0">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  <motion.span 
                    className="block"
                    style={{ color: heroTextColor }}
                  >
                    Empowering
                  </motion.span>
                  <motion.span 
                    className="block"
                    style={{ color: heroTextColor }}
                  >
                    Innovation for
                  </motion.span>
                  <motion.span 
                    className="block"
                    style={{ color: heroTextColor }}
                  >
                    Real-World Impact
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl leading-relaxed"
                style={{ color: heroDescriptionColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Transform your ideas into sustainable, scalable solutions with our global-standard innovation pipeline.
              </motion.p>

              <motion.div
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  className="border-2 px-10 py-4 rounded-full font-bold text-lg hover:text-[#FFFEF9] transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    borderColor: heroTextColor,
                    color: heroTextColor
                  }}
                >
                  Learn More
                </motion.button>
                <motion.button
                  className="bg-[#306CEC] text-[#FFFEF9] px-10 py-4 rounded-full font-bold shadow-2xl text-lg relative overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Join Community</span>
                  <motion.div 
                    className="absolute inset-0 bg-[#000000]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[#FFFEF9] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    Join Community
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Interactive Logo Display */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Floating animated cards with logos */}
                <div className="relative h-[500px] flex items-center justify-center">
                  {/* Center large logo */}
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1, 0.8],
                      opacity: [0, 1, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.25, 0.5]
                    }}
                  >
                    <div className="w-64 h-64 bg-gradient-to-br from-[#306CEC]/10 to-transparent backdrop-blur-xl rounded-3xl shadow-2xl border border-[#306CEC]/20 flex items-center justify-center p-8">
                      <img 
                        src="/logo2.png" 
                        alt="Impact360 Logo" 
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </motion.div>

                  {/* Second logo variant */}
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0, 0, 0.8, 1, 0.8, 0, 0],
                      opacity: [0, 0, 0, 1, 0, 0, 0],
                      rotate: [0, 0, 0, -5, 0, 0, 0]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.25, 0.35, 0.5, 0.65, 0.75, 1]
                    }}
                  >
                    <div className="w-64 h-64 bg-[#000000] backdrop-blur-xl rounded-3xl shadow-2xl flex items-center justify-center p-8">
                      <img 
                        src="/logo3.png" 
                        alt="Impact360 White Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>

                  {/* Third logo variant */}
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0, 0, 0, 0, 0.8, 1, 0.8, 0],
                      opacity: [0, 0, 0, 0, 0, 1, 0, 0],
                      rotate: [0, 0, 0, 0, 0, 3, 0, 0]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.4, 0.5, 0.6, 0.65, 0.75, 0.85, 1]
                    }}
                  >
                    <div className="w-64 h-64 bg-[#306CEC] backdrop-blur-xl rounded-3xl shadow-2xl flex items-center justify-center p-8">
                      <img 
                        src="/logo4.png" 
                        alt="Impact360 White on Blue Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>

                  {/* Fourth logo variant */}
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0, 0, 0, 0, 0, 0, 0.8, 1],
                      opacity: [0, 0, 0, 0, 0, 0, 0, 1],
                      rotate: [0, 0, 0, 0, 0, 0, 0, -3]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 1]
                    }}
                  >
                    <div className="w-64 h-64 bg-[#FFFEF9] backdrop-blur-xl rounded-3xl shadow-2xl border border-[#306CEC]/20 flex items-center justify-center p-8">
                      <img 
                        src="/logo5.png" 
                        alt="Impact360 Black Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>

                  {/* Orbiting particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${i % 2 === 0 ? '#306CEC' : '#FFFEF9'}, transparent)`,
                        filter: 'blur(1px)'
                      }}
                      animate={{
                        x: [0, Math.cos((i * Math.PI) / 4) * 200, 0],
                        y: [0, Math.sin((i * Math.PI) / 4) * 200, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 15 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}