import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx"; // Adjusted to match the naming convention
import Contact from "./pages/Contact.jsx";
import 'framer-motion';


function App() {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    window.gtag('config', 'G-X50BHTH4DP', {
      page_path: location.pathname,
    });
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
