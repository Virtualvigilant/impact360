import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HomePage() {
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
  const heroCommunityTitleColor = useTransform(scrollYProgress, [0, 0.5], ["rgba(48, 108, 236, 0.8)", "rgba(255, 254, 249, 0.8)"]);
  const communityCardBackground = useTransform(scrollYProgress, [0, 0.5], ["rgba(48, 108, 236, 0.08)", "rgba(255, 254, 249, 0.08)"]);
  
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

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
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
                  className="border-2 px-10 py-4 rounded-full font-bold text-lg hover:bg-[#306CEC] hover:text-[#FFFEF9] transition-all duration-300"
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

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {[
                  { number: "500+", label: "Startups" },
                  { number: "50+", label: "Programs" },
                  { number: "10k+", label: "Community" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 
                      className="text-3xl md:text-4xl font-bold"
                      style={{ color: heroTextColor }}
                    >
                      {stat.number}
                    </h3>
                    <p 
                      className="text-sm opacity-70"
                      style={{ color: heroTextColor }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Logo Carousel */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-lg mx-auto aspect-square">
                {/* Animated logo transitions */}
                <motion.div className="absolute inset-0 flex items-center justify-center">
                  {/* Logo 1 - Blue on transparent */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-12"
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: [1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img 
                      src="/logo2.png" 
                      alt="Impact360 Blue Logo" 
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </motion.div>

                  {/* Logo 2 - White on Black */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-[#000000] p-12"
                    style={{ borderRadius: '20%' }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img 
                      src="/logo3.png" 
                      alt="Impact360 White Logo" 
                      className="w-full h-full object-contain"
                    />
                  </motion.div>

                  {/* Logo 3 - White on Blue */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-[#306CEC] p-12"
                    style={{ borderRadius: '20%' }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img 
                      src="/logo4.png" 
                      alt="Impact360 White on Blue Logo" 
                      className="w-full h-full object-contain"
                    />
                  </motion.div>

                  {/* Logo 4 - Black on Cream */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-[#FFFEF9] p-12"
                    style={{ borderRadius: '20%' }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img 
                      src="/logo5.png" 
                      alt="Impact360 Black Logo" 
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </motion.div>

                {/* Decorative rings */}
                <motion.div
                  className="absolute inset-0 border-4 border-[#306CEC]/20 rounded-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 border-2 border-[#306CEC]/10 rounded-full pointer-events-none"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>

          {/* Community Section */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-semibold mb-8"
              style={{ color: heroCommunityTitleColor }}
            >
              Trusted by Innovators Across Africa
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm border border-[#306CEC]/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: communityCardBackground
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.span 
                      className="text-5xl opacity-30"
                      style={{ color: heroTextColor }}
                    >
                      👥
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <section className="min-h-screen bg-[#FFFEF9] text-[#306CEC] py-24 px-8 md:px-20 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#306CEC]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#306CEC]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-6xl mx-auto"
        >
          <motion.div 
            className="inline-block mb-8"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 rounded-full bg-[#306CEC] flex items-center justify-center shadow-xl">
              <span className="text-5xl">🚀</span>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-[#306CEC]">
            About Impact360
          </h2>

          <motion.p
            className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed text-[#306CEC]/80 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Impact360 is a growth and innovation company shaping Africa's entrepreneurial landscape through structure, community, and execution. We empower founders, startups, and changemakers to move from ideas to scalable ventures by providing the systems, knowledge, and support they need to build and grow.
          </motion.p>
          
          <motion.p
            className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed font-bold text-[#000000]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            At Impact360, we believe real impact happens when ideas meet discipline, collaboration, and the right environment to thrive.
          </motion.p>

          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { icon: "💡", title: "Innovation", desc: "Transform ideas into reality with cutting-edge tools" },
              { icon: "🤝", title: "Community", desc: "Connect with Africa's top changemakers" },
              { icon: "📈", title: "Growth", desc: "Scale your ventures with proven frameworks" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#306CEC] text-[#FFFEF9] p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[#000000]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="text-6xl mb-6 relative z-10">{item.icon}</div>
                <h3 className="text-3xl font-bold text-[#FFFEF9] mb-3 relative z-10">{item.title}</h3>
                <p className="text-[#FFFEF9]/90 text-lg relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-[#FFFEF9]/90 bg-[#306CEC] border-t border-[#FFFEF9]/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFFEF9] rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/logo4.png" 
                  alt="Impact360 Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-[#FFFEF9]">Impact360</span>
            </div>
          </motion.div>
          <p className="text-[#FFFEF9] font-semibold text-lg">
            © 2025 Impact360. All Rights Reserved.
          </p>
          <p className="mt-2 text-sm text-[#FFFEF9]/70">Building Africa's Entrepreneurial Future 🚀</p>
        </div>
      </footer>
    </div>
  );
}