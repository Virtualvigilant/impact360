import React from "react";
import { motion } from "framer-motion";

// Icons
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document
      .getElementById(sectionId.toLowerCase().replace(/\s+/g, "-"));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.15 }}
      className="relative bg-gradient-to-br from-[#306CEC] via-[#4a7eec] to-[#306CEC] text-[#FFFEF9] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 md:w-64 md:h-64 bg-[#FFFEF9] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-64 md:h-64 bg-[#FFFEF9] rounded-full blur-3xl"></div>
      </div>

      <section id="contact" className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20">

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-16">

            {/* BRAND */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src="/logo4.png"
                    alt="Impact360 Logo"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </motion.div>
                <span className="text-2xl md:text-3xl font-bold">Impact360</span>
              </div>

              <p className="text-[#FFFEF9]/90 text-base md:text-lg leading-relaxed mb-6">
                Empowering Africa's next generation of innovators through programs,
                community, and real-world impact.
              </p>

              {/* CONTACT ICONS */}
              <div className="flex gap-4">
                {[
                  { icon: <Mail />, link: "mailto:info@impact360.com" },
                  { icon: <Phone />, link: "tel:+254123456789" },
                  { icon: <MapPin />, link: "#" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFFEF9] text-[#306CEC] flex items-center justify-center hover:bg-[#FFFEF9]/90 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.1, y: -3 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* QUICK LINKS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "About", "Programs", "Events", "Subscription"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-[#FFFEF9]/80 hover:text-[#FFFEF9] transition-colors"
                    >
                      {item}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* SOCIALS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <ul className="space-y-3">
                {[
                  { name: "Twitter", icon: <Twitter /> },
                  { name: "LinkedIn", icon: <Linkedin /> },
                  { name: "Instagram", icon: <Instagram /> },
                  { name: "Facebook", icon: <Facebook /> },
                ].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <a href="#" className="flex items-center gap-3 text-[#FFFEF9]/80 hover:text-[#FFFEF9]">
                      {item.icon} {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* NEWSLETTER */}
          <motion.div
            className="bg-[#FFFEF9]/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#FFFEF9]/20 mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
                <p className="text-[#FFFEF9]/80">
                  Join our community for updates on programs & events.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full bg-[#FFFEF9] text-[#306CEC] placeholder-[#306CEC]/50 focus:ring-2 focus:ring-[#FFFEF9]/50"
                />
                <motion.button
                  className="px-8 py-4 bg-[#FFFEF9] text-[#306CEC] rounded-full font-bold shadow-lg hover:bg-[#FFFEF9]/90"
                  whileHover={{ scale: 1.05 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* FOOTER BOTTOM */}
          <motion.div
            className="border-t border-[#FFFEF9]/20 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-[#FFFEF9] font-semibold text-lg mb-1">
                  © 2025 Impact360. All Rights Reserved.
                </p>
                <p className="text-[#FFFEF9]/70 text-sm">
                  Building Africa's Entrepreneurial Future
                </p>
              </div>

              <div className="flex gap-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="text-[#FFFEF9]/70 hover:text-[#FFFEF9]"
                    whileHover={{ y: -2 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              className="text-center mt-6 text-sm text-[#FFFEF9]/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              Made with ❤️ by Impact360
            </motion.div>
          </motion.div>

        </div>
      </section>
    </motion.footer>
  );
}
