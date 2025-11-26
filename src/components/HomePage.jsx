import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showFooter, setShowFooter] = useState(false);

  const photos = [
    "/photo_1.jpg",
    "/photo_2.jpg",
    "/photo_3.jpg",
    "/photo_4.jpg",
    "/photo_5.jpg",
    "/photo_6.jpg"
  ];

  const featuresData = [
    { icon: "💡", title: "Innovation", desc: "Transform ideas into reality with cutting-edge tools" },
    { icon: "🤝", title: "Community", desc: "Connect with Africa's top changemakers" },
    { icon: "📈", title: "Growth", desc: "Scale your ventures with proven frameworks" },
  ];

  const offers = [
    {
      title: "Incubation & Acceleration",
      description: "We support founders from idea to execution through mentorship, structured programs, and strategic resources.",
      icon: "🚀",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      link: "/programs",
    },
    {
      title: "Events",
      description: "We run workshops, bootcamps, and founder meetups to help innovators learn, connect, and grow.",
      icon: "📅",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      link: "/events",
    },
  ];

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show footer when scrolled near bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      // Show footer when user is within 200px of the bottom
      if (scrollHeight - scrollTop - clientHeight < 200) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans bg-white">
      <Navbar />

    
        
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-white">

        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {photos.map((photo, index) => (
            <div
              key={photo}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${photo})`,
                zIndex: currentPhoto === index ? 2 : 1,
                opacity: currentPhoto === index ? 1 : 0,
                transition: 'opacity 1s ease-in-out'
              }}
            />
          ))}

          {/* Darker Gradient Overlay Effect */}
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentPhoto === index ? "bg-white w-8" : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>

        {/* CENTERED HERO TEXT */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.5)"
            }}
          >
            Empowering Innovation for Real-World Impact
          </h1>

          <p
            className="text-lg md:text-xl lg:text-2xl text-white mb-10 max-w-4xl mx-auto font-light leading-relaxed"
            style={{
              textShadow: "0 2px 12px rgba(0,0,0,0.7)"
            }}
          >
            Transform your ideas into sustainable, scalable solutions with our global-standard innovation pipeline.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 justify-center">
            <a href="/about">
              <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More
              </button>
            </a>

            <a href="/subscription">
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Join Community
              </button>
            </a>
          </div>
        </div>
      </section>

        {/* WHAT WE OFFER SECTION */}
      <section className="py-24 px-6 bg-[#FFFEF9]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#306CEC] mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-[#306CEC]/70">
              Clear, structured pathways for founders to grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#306CEC]/80 to-transparent flex items-end p-8">
                    <span className="text-6xl">{offer.icon}</span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-3xl font-bold text-[#306CEC] mb-4">
                    {offer.title}
                  </h3>
                  <p className="text-[#306CEC]/70 text-lg mb-6">
                    {offer.description}
                  </p>
                  <a
                    href={offer.link}
                    className="inline-flex items-center text-[#306CEC] font-semibold hover:gap-3 gap-2 transition-all duration-300"
                  >
                    Learn More →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-[#FFFEF9]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#306CEC] mb-4">
              Why Choose Impact360
            </h2>
            <p className="text-xl text-[#306CEC]/70">
              Built for founders who want to make a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresData.map((item, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-[#306CEC] to-[#000000] text-[#FFFEF9] p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-6xl mb-6 relative z-10">{item.icon}</div>
                <h3 className="text-3xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-[#FFFEF9]/90 text-lg relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    

      {/* CALL TO ACTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#306CEC] to-[#1a4d99] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Join our community of innovators and changemakers today
            </p>
            <a href="/subscription">
              <button className="bg-white text-[#306CEC] px-12 py-5 rounded-full font-bold text-lg hover:bg-[#FFFEF9] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Get Started Now
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Add spacing before footer */}
      <div className="h-32 bg-[#FFFEF9]"></div>

      {/* FOOTER - Shows only when scrolled near bottom */}
     
        <Footer/>
      

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}