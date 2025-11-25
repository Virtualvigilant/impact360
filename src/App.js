import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import About from "./components/About.jsx"; 
import Programs from "./components/Programs.jsx"; 
import Eventpage from "./components/Eventpage.jsx"; 
import Subscription from "./components/Subscription.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/events" element={<Eventpage />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
}