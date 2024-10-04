import {  BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx"; // Adjusted to match the naming convention
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import 'framer-motion';
import ApplicationForm from "./pages/ApplicationForm.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";


function App() {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    window.gtag('config', 'G-X50BHTH4DP', {
      page_path: location.pathname,
    });
  }, [location]);

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/application"
          element={
            <PrivateRoute>
              <ApplicationForm />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
