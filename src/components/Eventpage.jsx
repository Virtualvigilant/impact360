import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Camera, Mic, Handshake, Lightbulb, Target, Globe, Rocket, Sparkles, MapPin, Users, MessageCircle, Network, ArrowDown } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FeaturedEventCard = ({ event, index, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* IMAGE SECTION */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative rounded-3xl overflow-hidden shadow-2xl group ${index % 2 === 1 ? "md:order-2" : ""}`}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-[#306CEC]/70 via-[#306CEC]/20 to-transparent' : 'bg-gradient-to-t from-[#306CEC]/70 via-[#306CEC]/20 to-transparent'}`}></div>

        {/* STATUS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6"
        >
          <div
            className={`${
              event.status === "Upcoming"
                ? "bg-gradient-to-r from-green-400 to-green-600"
                : "bg-gradient-to-r from-gray-400 to-gray-600"
            } text-white px-6 py-3 rounded-full font-bold shadow-2xl backdrop-blur-sm`}
          >
            {event.status}
          </div>
        </motion.div>

        {/* DATE */}
        {event.date && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 left-6"
          >
            <div className="bg-[#306CEC] text-[#FFFEF9] px-6 py-3 rounded-full font-bold shadow-2xl backdrop-blur-sm flex items-center gap-2">
              <Calendar className="w-5 h-5" strokeWidth={2} />
              {event.date}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* CONTENT SECTION */}
      <div className={index % 2 === 1 ? "md:order-1" : ""}>
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-block mb-4"
          >
            <span className={`font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-full ${
              darkMode
                ? 'text-[#306CEC] bg-[#306CEC]/20'
                : 'text-[#306CEC] bg-[#306CEC]/10'
            }`}>
              Featured Event
            </span>
          </motion.div>

          <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-6 ${
            darkMode
              ? 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF]'
              : 'bg-gradient-to-r from-[#306CEC] to-[#1a4d9e]'
          }`}>
            {event.title}
          </h2>

          <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{event.description}</p>

          {/* HIGHLIGHTS */}
          <div className={`space-y-4 mb-8 p-6 rounded-2xl border transition-colors duration-1000 ${
            darkMode
              ? 'bg-[#306CEC]/10 border-[#306CEC]/30'
              : 'bg-gradient-to-br from-[#306CEC]/5 to-transparent border-[#306CEC]/10'
          }`}>
            <h3 className="text-2xl font-bold flex items-center gap-2 text-[#306CEC]">
              <Sparkles className="w-6 h-6" strokeWidth={2} /> Key Highlights
            </h3>

            {event.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start space-x-3 group"
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform ${
                  darkMode
                    ? 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF]'
                    : 'bg-gradient-to-r from-[#306CEC] to-[#4A80FF]'
                }`}></div>
                <p className={`text-lg group-hover:transition-colors ${
                  darkMode
                    ? 'text-gray-400 group-hover:text-[#306CEC]'
                    : 'text-gray-700 group-hover:text-[#306CEC]'
                }`}>
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

/* --------------------------- Event Gallery Card --------------------------- */

const EventGalleryCard = ({ image, title, category, delay = 0, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -10 }}
    className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl group cursor-pointer"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <div className={`absolute inset-0 flex flex-col justify-end p-6 group-hover:transition-all duration-500 ${
      darkMode
        ? 'bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-[#306CEC]/90'
        : 'bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-[#306CEC]/90'
    }`}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className={`backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold inline-block w-fit mb-2 shadow-lg ${
          darkMode
            ? 'bg-[#306CEC]/90 text-white'
            : 'bg-white/90 text-[#306CEC]'
        }`}
      >
        {category}
      </motion.div>
      <h3 className="text-[#FFFEF9] text-xl font-bold group-hover:scale-105 transition-transform origin-left">{title}</h3>
    </div>
  </motion.div>
);

/* ---------------------------- Main Events Page --------------------------- */

export default function EventsPage() {
  const { darkMode } = useDarkMode();

  const featuredEvents = [
    {
      title: "Round Xchange",
      status: "Upcoming",
      date: "Febuary 7th 2026",
      description:
        "The premier networking and knowledge-sharing event connecting founders, investors, and ecosystem players. Round Xchange brings together the brightest minds in African entrepreneurship for a day of insights, connections, and opportunities.",
      highlights: [
        "Connect with leading investors and venture capitalists",
        "Pitch sessions with live feedback from experienced entrepreneurs",
        "Roundtable discussions on scaling, fundraising, and market expansion",
        "Networking sessions with 200+ founders and ecosystem players",
        "Expert panels on current trends in African tech and innovation"
      ],
      speakers: ["Industry Leaders", "Successful Founders", "Top Investors", "Policy Makers"],
      image: "/events/round-xchange.png",
      cta: "Register for Round Xchange"
    },
    {
      title: "Beyond Capital",
      status: "Past Event",
      description:
        "An intensive deep-dive into alternative funding strategies and capital creation for African startups. Learn how to build sustainable businesses without traditional venture capital.",
      highlights: [
        "Bootstrapping strategies from successful founders",
        "Alternative funding methods: grants, competitions, crowdfunding",
        "Revenue model design and optimization",
        "Strategic partnerships for growth",
        "Financial modeling and unit economics"
      ],
      speakers: ["Self-funded Entrepreneurs", "Financial Advisors", "Grant Experts", "Strategic Investors"],
      image: "/events/beyond-capital.jpg"
    },
     {
      title: "Beyond Now",
      status: "Past Event",
      description:
        "A transformative event focused on the future of entrepreneurship in the age of artificial intelligence. Explore how AI is reshaping industries and creating new opportunities for African founders.",
      highlights: [
         "AI applications for African startups",
        "Building AI-powered products on a budget",
        "Ethical AI considerations and responsible innovation",
        "Real-world case studies from AI startups",
        "Hands-on workshops with AI tools and frameworks"
      ],
      speakers: ["Self-funded Entrepreneurs", "Financial Advisors", "Grant Experts", "Strategic Investors"],
      image: "/events/beyond-now.png"
    }
  ];

  const eventGallery = [
    {
      image: "/gallery/workshop-1.jpg",
      title: "Workshop Session",
      category: "Beyond Capital"
    },
    {
      image: "/gallery/panel-1.jpg",
      title: "Open mic",
      category: "Beyond Capital"
    },
    {
      image: "/gallery/networking-1.png",
      title: "Networking Break",
      category: "Beyond Capital"
    }
   
  ];

  const expectations = [
    {
      Icon: Mic,
      title: "Expert Speakers",
      description: "Learn from successful entrepreneurs across Africa and beyond."
    },
    {
      Icon: Handshake,
      title: "Networking Opportunities",
      description: "Meet founders, investors, mentors, and ecosystem leaders."
    },
    {
      Icon: Lightbulb,
      title: "Actionable Insights",
      description: "Gain practical tools and frameworks you can apply instantly."
    },
    {
      Icon: Target,
      title: "Interactive Sessions",
      description: "Workshops, roundtables, and deep-dive Q&A sessions."
    },
    {
      Icon: Globe,
      title: "Decentralized Access",
      description: "Participate in person or virtually from different counties."
    },
    {
      Icon: Rocket,
      title: "Growth Opportunities",
      description: "Funding, partnerships, and scaling frameworks."
    }
  ];

  // --- Speakers Section State ---
  const speakerImages = [
    "/events/Timothy.jpeg",
    "/events/Deborah.jpeg",
    "/events/geofrey.jpeg",
    "/events/Gilbert.jpeg" 
  ];
  const [currentSpeaker, setCurrentSpeaker] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeaker(prev => (prev + 1) % speakerImages.length);
    }, 10000); // Slowed down to 10 seconds
    return () => clearInterval(interval);
  }, [speakerImages.length]);

  return (
    <div
      className={`font-sans transition-colors duration-1000 min-h-screen ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`}
      style={darkMode ? { backgroundColor: '#000000' } : {}}
    >
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative min-h-[140vh] flex items-center justify-center px-6 pt-12 pb-32"
        style={{
          backgroundImage: `url('/events/Roadshow-event.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-0" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6 text-white font-extrabold drop-shadow-lg"
            style={{ fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif", textTransform: "uppercase" }}
          >
           Impact360 Roadshow
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 text-gray-300"
            style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
          >
            Join us for a transformative journey connecting founders, investors, and changemakers across Africa. Discover new opportunities, build lasting partnerships, and shape the future of innovation.
          </motion.p>
        </div>
        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-8 h-8 text-white opacity-70" />
          </motion.div>
        </div>
      </section>

      {/* WHY SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
        }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <h2
              style={{
                fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
                textTransform: "uppercase",
                color: '#306CEC',
                fontWeight: 700,
                // @ts-ignore
                '--tw-text-opacity': '1',
              }}
              className="text-2xl md:text-4xl font-bold mb-4"
            >
              Why the Decentralization Roadshow?
            </h2>
            <p className="text-lg mb-4" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              Most innovation conversations, capital, and infrastructure remain concentrated in major cities. Yet talent, ideas, and real problems exist everywhere.
            </p>
            <ul className="space-y-3 text-base md:text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              <li className="flex items-center gap-2"><Network className="w-5 h-5 text-[#306CEC]" /> Bring opportunity closer to founders outside capital cities</li>
              <li className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-[#306CEC]" /> Surface local solutions built within real local contexts</li>
              <li className="flex items-center gap-2"><Users className="w-5 h-5 text-[#306CEC]" /> Connect regional founders to networks, knowledge, and capital</li>
              <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#306CEC]" /> Strengthen grassroots ecosystems town by town</li>
            </ul>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="flex justify-center">
            <img src="/events/map.png" alt="Roadshow Map" className="rounded-2xl shadow-xl w-full max-w-md" />
          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIAL SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-12 px-4 md:px-0 bg-gradient-to-r from-[#306CEC]/10 to-[#4A80FF]/10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="italic text-xl md:text-2xl text-gray-700 dark:text-gray-200" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            “The Impact360 Roadshow brought real opportunities to our town. It’s more than an event—it's a movement for local founders.”
          </blockquote>
          <div className="mt-4 text-[#306CEC] font-bold" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            — Local Founder, Nakuru
          </div>
        </div>
      </motion.section>

      {/* WHAT HAPPENS SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
        }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-[#306CEC]"
            style={{
              fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
              textTransform: "uppercase"
            }}
          >
            What Happens at Each Roadshow Stop
          </h2>
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center gap-4 items-stretch">
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="rounded-2xl shadow p-8 flex flex-col gap-4 mx-auto items-start text-left h-full justify-center">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-7 h-7 text-[#306CEC]" />
                <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>Founder conversations & ecosystem dialogues</span>
              </div>
              <div className="flex items-center gap-3">
                <Lightbulb className="w-7 h-7 text-[#306CEC]" />
                <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>Entrepreneurship & innovation sessions</span>
              </div>
              <div className="flex items-center gap-3">
                <Network className="w-7 h-7 text-[#306CEC]" />
                <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>Technology as an enabler for local solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-7 h-7 text-[#306CEC]" />
                <span className="font-bold text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>Community, partner, and stakeholder engagement</span>
              </div>
              <div className="italic text-sm mt-2 text-gray-500 dark:text-gray-400" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
                (Session formats may vary by town to reflect local context.)
              </div>
            </motion.div>
            <div className="flex justify-center items-center h-full w-full">
              <Lightbulb className="w-40 h-40 text-[#306CEC] drop-shadow-xl" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* TOWNS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-[#306CEC]"
            style={{
              fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
              textTransform: "uppercase"
            }}
          >
            Planned Roadshow Towns
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            { [
              {
                name: "Nairobi",
                img: "/events/Nairobi.jpg",
                desc: "Kenya's capital, a vibrant tech and innovation hub."
              },
              {
                name: "Nakuru",
                img: "/events/Nakuru.jpg",
                desc: "A fast-growing city with a dynamic youth ecosystem."
              },
              {
                name: "Eldoret",
                img: "/events/Eldoret.jpg",
                desc: "Known for its enterprising spirit and startups."
              },
              {
                name: "Kisumu",
                img: "/events/Kisumu.jpg",
                desc: "A lakeside city with a rising innovation scene."
              },
              {
                name: "Mombasa",
                img: "/events/Mombasa.jpg",
                desc: "Coastal city blending trade, tourism, and tech."
              },
              {
                name: "Arusha",
                img: "/events/Arusha.jpg",
                desc: "Tanzania's gateway to East African entrepreneurship."
              },
              {
                name: "Kigali",
                img: "/events/Kigali.jpg",
                desc: "Rwanda's capital, a model for smart city growth."
              }
            ].map((town, idx) => (
              <motion.div
                key={town.name}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #306CEC33" }}
                className="relative rounded-2xl shadow-lg overflow-hidden group transition-all cursor-pointer"
                style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={town.img}
                    alt={town.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#306CEC] text-white rounded-full p-2 shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="p-6 pt-4 flex flex-col items-start">
                  <div className="font-bold text-xl mb-2 text-[#306CEC] group-hover:text-[#4A80FF] transition-colors" style={{ fontFamily: "'League Spartan', Arial, sans-serif", textTransform: "uppercase" }}>
                    {town.name}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-base">{town.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-base mt-8 text-gray-600 dark:text-gray-400" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            Additional towns may be added as partnerships and logistics are confirmed.
          </p>
        </div>
      </motion.section>

      {/* WHO IT'S FOR SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
        }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-[#306CEC]"
            style={{
              fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
              textTransform: "uppercase"
            }}
          >
            Who It’s For
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            { [
              { label: "Founders & early‑stage entrepreneurs", icon: Users },
              { label: "Students & young innovators", icon: Lightbulb },
              { label: "SME builders", icon: Network },
              { label: "Ecosystem enablers, hubs, leaders", icon: MessageCircle },
              { label: "Partners for decentralization impact", icon: MapPin }
            ].map(({ label, icon: Icon }, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #306CEC33" }}
                className="rounded-2xl shadow p-6 flex flex-col items-center gap-3 transition-all cursor-pointer"
              >
                <Icon className="w-10 h-10 text-[#306CEC]" />
                <span className="font-bold text-lg text-center" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GET INVOLVED SECTION */}
      <motion.section
        id="get-involved"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-4 md:px-0 transition-colors"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-[#306CEC]"
            style={{
              fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif",
              textTransform: "uppercase"
            }}
          >
            Get Involved
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            Want to help shape the future of entrepreneurship across Africa? There are many ways to get involved with the Impact360 Roadshow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 8px 32px #306CEC33" }}
              className="rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#306CEC]/10"
            >
              <MessageCircle className="w-8 h-8 text-[#306CEC]" />
              <div className="font-bold text-lg text-[#306CEC]">Partner & Collaborate</div>
              <div className="text-gray-700 dark:text-gray-300 text-base text-center">
                Join as a sponsor, ecosystem partner, or local champion to co-create impact in your region.
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 8px 32px #306CEC33" }}
              className="rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#306CEC]/10"
            >
              <MapPin className="w-8 h-8 text-[#306CEC]" />
              <div className="font-bold text-lg text-[#306CEC]">Host a Stop</div>
              <div className="text-gray-700 dark:text-gray-300 text-base text-center">
                Bring the Roadshow to your town, hub, or campus. Help us activate new communities.
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 8px 32px #306CEC33" }}
              className="rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#306CEC]/10"
            >
              <Users className="w-8 h-8 text-[#306CEC]" />
              <div className="font-bold text-lg text-[#306CEC]">Volunteer & Support</div>
              <div className="text-gray-700 dark:text-gray-300 text-base text-center">
                Help with logistics, outreach, or content. Be part of the team making decentralization real.
              </div>
            </motion.div>
          </div>
          <div className="bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white rounded-xl px-6 py-4 font-bold text-lg flex items-center gap-2 justify-center mb-4"
            style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            <span role="img" aria-label="mail">📩</span>
            Interested in hosting, partnering, or supporting a roadshow stop?
          </div>
          <div className="text-base text-gray-700 dark:text-gray-300 mb-6" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
            Reach out to the Impact360 team to start the conversation.
          </div>
          
        </div>
      </motion.section>

      {/* SPEAKERS SECTION */}
      <section className="py-20 px-4 md:px-0 transition-colors">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Slideshow */}
          <div className="relative w-full h-96 flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
            {speakerImages.map((img, idx) => (
              <div
                key={img}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: currentSpeaker === idx ? 1 : 0,
                  zIndex: currentSpeaker === idx ? 2 : 1,
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* fallback placeholder */}
                <img
                  src={img}
                  alt={`Speaker ${idx + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ opacity: 0 }}
                  onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=Speaker"; }}
                />
              </div>
            ))}
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {speakerImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSpeaker(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSpeaker === idx ? "bg-[#306CEC] w-8" : "bg-[#306CEC]/40 w-2"}`}
                  style={{ outline: "none", border: "none" }}
                  tabIndex={-1}
                  aria-label={`Go to speaker ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Right: Speaker Info */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-[#306CEC]" style={{ fontFamily: "'League Spartan', 'DM Sans', Arial, sans-serif", textTransform: "uppercase" }}>
              Meet the Speakers
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              Our events feature a diverse lineup of visionary founders, investors, industry leaders, and ecosystem builders from across Africa and beyond.
            </p>
            <ul className="list-disc pl-6 mb-4 text-base text-gray-700 dark:text-gray-300" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              <li>Serial entrepreneurs and startup founders</li>
              <li>Top venture capitalists and angel investors</li>
              <li>Innovation ecosystem leaders and hub managers</li>
              <li>Policy makers and thought leaders</li>
              <li>Technical experts and product builders</li>
            </ul>
            <div className="font-bold text-[#306CEC] text-lg" style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
              Get inspired by real stories, actionable insights, and authentic connections.
            </div>
          </div>
        </div>
      </section>

      {/* Floating Contact Button */}
      {/* 
      <a
        href="mailto:hello@impact360.africa"
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#306CEC] to-[#4A80FF] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
      >
        Contact Us
      </a>
      */}

      <Footer />
    </div>
  );
}

/* Add this to the bottom of the file or in your CSS:
.custom-blue-important {
  color: #306CEC !important;
}
*/